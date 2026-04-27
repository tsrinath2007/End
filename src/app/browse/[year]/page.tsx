'use client'
import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { yearGroup, YEAR_INFO } from '@/lib/mit-data'
import type { Branch } from '@/lib/supabase/types'
import { branchColor, cn } from '@/lib/utils'

const BRANCH_INFO: Record<string, { label: string; desc: string }> = {
  CSE:   { label: 'CSE',  desc: 'Computer Science & Engineering' },
  ECE:   { label: 'ECE',  desc: 'Electronics & Communication' },
  EEE:   { label: 'EEE',  desc: 'Electrical & Electronics' },
  MECH:  { label: 'MECH', desc: 'Mechanical Engineering' },
  CIVIL: { label: 'CIVIL',desc: 'Civil Engineering' },
  IT:    { label: 'IT',   desc: 'Information Technology' },
}

export default function BrowseYearPage() {
  const params = useParams()
  const yg = Number(params.year)

  const [branches, setBranches] = useState<{ branch: Branch; count: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (![1, 2, 3].includes(yg)) { notFound(); return }
    const semRange = [yg * 2 - 1, yg * 2]

    async function load() {
      const supabase = createClient()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any)
        .from('papers')
        .select('branch')
        .in('semester', semRange)
      if (data) {
        const counts: Record<string, number> = {}
        ;(data as { branch: string }[]).forEach((p) => {
          counts[p.branch] = (counts[p.branch] ?? 0) + 1
        })
        setBranches(
          Object.entries(counts)
            .map(([branch, count]) => ({ branch: branch as Branch, count }))
            .sort((a, b) => b.count - a.count)
        )
      }
      setLoading(false)
    }
    load()
  }, [yg])

  if (![1, 2, 3].includes(yg)) return null
  const info = YEAR_INFO[yg]

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-8">
        <Link href="/" className="hover:text-teal-600"><Home className="w-3 h-3" /></Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/browse" className="hover:text-teal-600">Browse</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">{info.label}</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#1e2d3d] mb-1">{info.label}</h1>
      <p className="text-slate-500 text-sm mb-8">{info.sems} · {info.branches}</p>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-[#F0EDE8] animate-pulse" />
          ))}
        </div>
      ) : branches.length === 0 ? (
        <p className="text-slate-400 text-sm py-8 text-center">No papers found for this year yet.</p>
      ) : (
        <div className="space-y-3">
          {branches.map(({ branch, count }) => {
            const bi = BRANCH_INFO[branch] ?? { label: branch, desc: branch }
            return (
              <Link
                key={branch}
                href={`/browse/${yg}/${branch.toLowerCase()}`}
                className="group flex items-center justify-between bg-white rounded-2xl border border-[#E8E4DC] px-6 py-5 shadow-sm hover:shadow-md hover:border-teal-200 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full border', branchColor(branch))}>
                    {bi.label}
                  </span>
                  <p className="text-sm text-slate-600">{bi.desc}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400 font-medium">{count} papers</span>
                  <ChevronRight className="w-4 h-4 text-teal-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
