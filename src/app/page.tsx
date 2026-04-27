'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, ArrowRight, BookOpen, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { yearGroup, YEAR_INFO } from '@/lib/mit-data'
import type { Paper } from '@/lib/supabase/types'

type YearStats = {
  count: number
  branches: Set<string>
}

export default function HomePage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [yearStats, setYearStats] = useState<Record<number, YearStats>>({
    1: { count: 0, branches: new Set() },
    2: { count: 0, branches: new Set() },
    3: { count: 0, branches: new Set() },
  })
  const [totalPapers, setTotalPapers] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any).from('papers').select('semester, branch')
      if (data) {
        setTotalPapers((data as Paper[]).length)
        const stats: Record<number, YearStats> = {
          1: { count: 0, branches: new Set() },
          2: { count: 0, branches: new Set() },
          3: { count: 0, branches: new Set() },
        }
        ;(data as { semester: number; branch: string }[]).forEach((p) => {
          const yg = yearGroup(p.semester)
          if (yg >= 1 && yg <= 3) {
            stats[yg].count++
            stats[yg].branches.add(p.branch)
          }
        })
        setYearStats(stats)
      }
      setLoading(false)
    }
    load()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/explore?q=${encodeURIComponent(query.trim())}`)
    else router.push('/browse')
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-2xl mx-auto px-4 pt-16 pb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1e2d3d] leading-tight tracking-tight mb-4">
          Every past paper,<br />
          <span className="text-teal-600">up to year 3.</span>
        </h1>
        <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Mid-sem and end-sem question papers for all branches at MIT Bengaluru —
          organised by year, semester, and subject.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-2xl shadow-md border border-[#E8E4DC] overflow-hidden max-w-lg mx-auto mb-4">
          <Search className="ml-4 w-4 h-4 text-slate-400 flex-shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects, codes..."
            className="flex-1 px-3 py-3.5 text-sm outline-none bg-transparent text-[#1e2d3d] placeholder-slate-400"
          />
          <button type="submit" className="m-1.5 bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors">
            Search
          </button>
        </form>
        <Link href="/browse" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
          Or search across all papers →
        </Link>
      </section>

      {/* Year cards — primary navigation */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((yg) => {
            const info = YEAR_INFO[yg]
            const stats = yearStats[yg]
            return (
              <Link
                key={yg}
                href={`/browse/${yg}`}
                className="group relative bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-200 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-[3rem] opacity-60 group-hover:opacity-100 transition-opacity" />
                <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-2">{info.sems}</p>
                <h2 className="text-2xl font-extrabold text-[#1e2d3d] mb-1">{info.label}</h2>
                <p className="text-xs text-slate-400 font-medium mb-4">{info.branches}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600">
                    {loading ? '—' : `${stats.count} papers`}
                  </span>
                  <ChevronRight className="w-4 h-4 text-teal-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick stats */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] px-6 py-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-[#1e2d3d]">
              {loading ? '—' : totalPapers} papers total
            </span>
          </div>
          <Link href="/explore" className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
            Advanced search & filters <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Credits */}
        <p className="text-center text-xs text-slate-400 mt-8">
          Papers sourced from{' '}
          <a href="https://github.com/Magniquick/mit-question-bank" target="_blank" rel="noopener" className="hover:text-teal-600 underline">
            mit-question-bank
          </a>
          {' '}· Independent student project · Not affiliated with MAHE
        </p>
      </section>
    </div>
  )
}
