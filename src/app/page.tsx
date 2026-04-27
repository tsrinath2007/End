'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, Download, BookOpen, Layers, ArrowRight, TrendingUp } from 'lucide-react'
import PaperCard from '@/components/PaperCard'
import { seedPapers, subjectTiles } from '@/lib/seed-data'
import type { Paper } from '@/lib/supabase/types'

const fakePapers: Paper[] = seedPapers.map((p, i) => ({
  ...p,
  id: String(i + 1),
  created_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
  updated_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
}))

const recentPapers = fakePapers.slice(0, 6)
const totalSubjects = new Set(fakePapers.map((p) => p.subject)).size
const totalBranches = new Set(fakePapers.map((p) => p.branch)).size

export default function HomePage() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/explore?q=${encodeURIComponent(query.trim())}`)
    else router.push('/explore')
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-[#F0FDF4] to-[#FAF7F2] py-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-100/40 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <TrendingUp className="w-3 h-3" />
            {fakePapers.reduce((a, p) => a + p.download_count, 0).toLocaleString()}+ downloads this semester
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1e2d3d] leading-tight mb-4">
            Find your paper.
            <span className="text-teal-600 block">Ace your exam.</span>
          </h1>
          <p className="text-slate-500 text-lg mb-8 max-w-xl mx-auto">
            Browse, preview, and download past question papers across all branches and semesters — free, always.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-2xl shadow-lg border border-[#E8E4DC] overflow-hidden max-w-xl mx-auto">
            <Search className="ml-4 w-5 h-5 text-slate-400 flex-shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by subject, branch, exam type..."
              className="flex-1 px-3 py-4 text-sm outline-none bg-transparent text-[#1e2d3d] placeholder-slate-400"
            />
            <button
              type="submit"
              className="m-1.5 bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-y border-[#E8E4DC]">
        <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1e2d3d]">{fakePapers.length}+</p>
              <p className="text-xs text-slate-500 font-medium">Total Papers</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-[#E8E4DC]" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Layers className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1e2d3d]">{totalSubjects}</p>
              <p className="text-xs text-slate-500 font-medium">Subjects</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-[#E8E4DC]" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
              <Download className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1e2d3d]">{totalBranches}</p>
              <p className="text-xs text-slate-500 font-medium">Branches</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subject tiles */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#1e2d3d]">Browse by Subject</h2>
          <Link href="/explore" className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {subjectTiles.map((tile) => (
            <Link
              key={tile.name}
              href={`/explore?subject=${encodeURIComponent(tile.name)}`}
              className="group bg-white rounded-2xl border border-[#E8E4DC] p-4 text-center hover:border-teal-200 hover:shadow-md transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tile.color} mx-auto mb-3 flex items-center justify-center text-white text-xl shadow-sm group-hover:scale-105 transition-transform`}>
                {tile.icon}
              </div>
              <p className="text-xs font-semibold text-[#1e2d3d] leading-tight">{tile.name}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{tile.branch}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent papers */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#1e2d3d]">Recently Added</h2>
          <Link href="/explore?sort=newest" className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
            See all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentPapers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      </section>
    </div>
  )
}
