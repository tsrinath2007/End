'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home, Construction, FlaskConical, Atom } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { YEAR_INFO, CYCLES } from '@/lib/mit-data'

export default function BrowseYearPage() {
  const params = useParams()
  const yg = Number(params.year)
  const info = YEAR_INFO[yg]

  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (yg === 1) {
      async function load() {
        const supabase = createClient()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data } = await (supabase as any)
          .from('papers')
          .select('subject')
          .in('semester', [1, 2])
        if (data) {
          const physSubjects = new Set(CYCLES.physics.subjects.map((s) => s.name))
          const chemSubjects = new Set(CYCLES.chemistry.subjects.map((s) => s.name))
          let phys = 0, chem = 0
          ;(data as { subject: string }[]).forEach(({ subject }) => {
            if (physSubjects.has(subject)) phys++
            if (chemSubjects.has(subject)) chem++
          })
          setCounts({ physics: phys, chemistry: chem })
        }
        setLoading(false)
      }
      load()
    } else {
      setLoading(false)
    }
  }, [yg])

  if (!info) return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <p className="text-slate-400">Year not found.</p>
      <Link href="/browse" className="text-teal-600 text-sm hover:underline mt-4 block">← Browse</Link>
    </div>
  )

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
      <p className="text-slate-500 text-sm mb-8">{info.sems}</p>

      {/* Year 1 — show cycle cards */}
      {yg === 1 && (
        <div className="space-y-3">
          {/* Physics Cycle */}
          <Link
            href="/browse/1/physics-cycle"
            className="group flex items-center justify-between bg-white rounded-2xl border border-[#E8E4DC] px-6 py-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Atom className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-[#1e2d3d]">Physics Cycle</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  APE · FME · FE · OOPS · CM-II · ENG
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400 font-medium">
                {loading ? '—' : `${counts.physics ?? 0} papers`}
              </span>
              <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Chemistry Cycle */}
          <Link
            href="/browse/1/chemistry-cycle"
            className="group flex items-center justify-between bg-white rounded-2xl border border-[#E8E4DC] px-6 py-5 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-[#1e2d3d]">Chemistry Cycle</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  ACE · EMSB · FEE · OOPS · CM-II · EVS
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400 font-medium">
                {loading ? '—' : `${counts.chemistry ?? 0} papers`}
              </span>
              <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Common subjects note */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-800 mt-2">
            <span className="font-semibold">OOPS</span> and <span className="font-semibold">CM-II</span> are common to both cycles.
          </div>
        </div>
      )}

      {/* Year 2 / 3 / 4 — Under Update */}
      {yg !== 1 && (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4">
            <Construction className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-lg font-bold text-[#1e2d3d] mb-2">Under Update</h2>
          <p className="text-slate-500 text-sm max-w-xs">
            Papers for {info.label} ({info.sems}) are being added. Check back soon.
          </p>
          <div className="mt-4 bg-[#1e2d3d] text-white text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Under Update by SES
          </div>
          <Link href="/browse" className="mt-8 text-sm text-teal-600 hover:text-teal-700 font-medium">
            ← Back to Browse
          </Link>
        </div>
      )}
    </div>
  )
}
