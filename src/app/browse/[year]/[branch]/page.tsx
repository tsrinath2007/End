'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home, FileText } from 'lucide-react'
import { YEAR_INFO, CYCLES, getCycleForBranch, subjectSlug } from '@/lib/mit-data'
import { cn } from '@/lib/utils'

function CycleSubjectGrid({ cycle }: { cycle: 'physics' | 'chemistry' }) {
  const def = CYCLES[cycle]
  const yg = 1

  return (
    <>
      {/* End-Sem section */}
      <div className="mb-10">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">End-Sem</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {def.subjects.map(({ code, name, common }) => (
            <Link
              key={`${name}-end`}
              href={`/browse/${yg}/${cycle}-cycle/end-sem/${subjectSlug(name)}`}
              className={cn(
                'group bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-all text-center',
                common
                  ? 'border-amber-200 hover:border-amber-300'
                  : cycle === 'physics'
                    ? 'border-[#E8E4DC] hover:border-blue-200'
                    : 'border-[#E8E4DC] hover:border-emerald-200'
              )}
            >
              <p className={cn(
                'text-lg font-extrabold mb-1',
                common ? 'text-amber-600' : cycle === 'physics' ? 'text-blue-600' : 'text-emerald-700'
              )}>
                {code}
              </p>
              <p className="text-[11px] text-slate-500 leading-tight line-clamp-2 mb-2">{name}</p>
              {common && (
                <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-full font-semibold">
                  Common
                </span>
              )}
              {!common && (
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
                  <FileText className="w-3 h-3" />
                  <span>Papers</span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Mid-Sem section */}
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Mid-Sem</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {def.subjects.map(({ code, name, common }) => (
            <Link
              key={`${name}-mid`}
              href={`/browse/${yg}/${cycle}-cycle/mid-sem/${subjectSlug(name)}`}
              className={cn(
                'group bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-all text-center',
                common
                  ? 'border-amber-200 hover:border-amber-300'
                  : cycle === 'physics'
                    ? 'border-[#E8E4DC] hover:border-blue-200'
                    : 'border-[#E8E4DC] hover:border-emerald-200'
              )}
            >
              <p className={cn(
                'text-lg font-extrabold mb-1',
                common ? 'text-amber-600' : cycle === 'physics' ? 'text-blue-600' : 'text-emerald-700'
              )}>
                {code}
              </p>
              <p className="text-[11px] text-slate-500 leading-tight line-clamp-2 mb-2">{name}</p>
              {common && (
                <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-full font-semibold">
                  Common
                </span>
              )}
              {!common && (
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
                  <FileText className="w-3 h-3" />
                  <span>Papers</span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default function BrowseBranchPage() {
  const params = useParams()
  const yg = Number(params.year)
  const branchParam = params.branch as string
  const cycle = getCycleForBranch(branchParam)
  const info = YEAR_INFO[yg]

  const cycleLabel = cycle ? CYCLES[cycle].label : branchParam.toUpperCase()

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-8 flex-wrap">
        <Link href="/" className="hover:text-teal-600"><Home className="w-3 h-3" /></Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/browse" className="hover:text-teal-600">Browse</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/browse/${yg}`} className="hover:text-teal-600">{info?.label}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">{cycleLabel}</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#1e2d3d] mb-1">{cycleLabel}</h1>
      <p className="text-slate-500 text-sm mb-8">
        {info?.label} · {info?.sems} · Select a subject and exam type
      </p>

      {cycle ? (
        <CycleSubjectGrid cycle={cycle} />
      ) : (
        <p className="text-slate-400 text-sm">No subjects found.</p>
      )}
    </div>
  )
}
