'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, BookOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { yearGroup, YEAR_INFO } from '@/lib/mit-data'

export default function BrowsePage() {
  const [counts, setCounts] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any).from('papers').select('semester')
      if (data) {
        const c: Record<number, number> = { 1: 0, 2: 0, 3: 0 }
        ;(data as { semester: number }[]).forEach((p) => {
          const yg = yearGroup(p.semester)
          if (yg >= 1 && yg <= 3) c[yg]++
        })
        setCounts(c)
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-[#1e2d3d] mb-2">Browse papers</h1>
      <p className="text-slate-500 text-sm mb-8">Search directly or start with a year.</p>

      <div className="space-y-3">
        {[1, 2, 3].map((yg) => {
          const info = YEAR_INFO[yg]
          return (
            <Link
              key={yg}
              href={`/browse/${yg}`}
              className="group flex items-center justify-between bg-white rounded-2xl border border-[#E8E4DC] px-6 py-5 shadow-sm hover:shadow-md hover:border-teal-200 transition-all"
            >
              <div>
                <p className="font-bold text-[#1e2d3d] text-lg">{info.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{info.sems} · {info.branches}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400 font-medium">
                  {loading ? '—' : `${counts[yg]} papers`}
                </span>
                <ChevronRight className="w-4 h-4 text-teal-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 bg-teal-50 border border-teal-100 rounded-2xl px-5 py-4 flex items-start gap-3">
        <BookOpen className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-teal-800">
          Can&apos;t find your paper?{' '}
          <Link href="/explore" className="font-semibold underline hover:text-teal-600">
            Try the full search with filters.
          </Link>
        </p>
      </div>
    </div>
  )
}
