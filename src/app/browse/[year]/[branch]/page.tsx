'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home, FileText } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { yearGroup, YEAR_INFO, getSubjectCode } from '@/lib/mit-data'
import type { ExamType } from '@/lib/supabase/types'

type SubjectEntry = {
  subject: string
  code: string
  count: number
}

export default function BrowseBranchPage() {
  const params = useParams()
  const yg = Number(params.year)
  const branch = (params.branch as string).toUpperCase()

  const [endSem, setEndSem] = useState<SubjectEntry[]>([])
  const [midSem, setMidSem] = useState<SubjectEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const semRange = [yg * 2 - 1, yg * 2]

    async function load() {
      const supabase = createClient()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any)
        .from('papers')
        .select('subject, exam_type')
        .eq('branch', branch)
        .in('semester', semRange)

      if (data) {
        const byTypeSubject: Record<ExamType, Record<string, number>> = {
          'End-Sem': {},
          'Mid-Sem': {},
        }
        ;(data as { subject: string; exam_type: ExamType }[]).forEach((p) => {
          const et = p.exam_type as ExamType
          byTypeSubject[et][p.subject] = (byTypeSubject[et][p.subject] ?? 0) + 1
        })

        const toEntries = (map: Record<string, number>): SubjectEntry[] =>
          Object.entries(map)
            .map(([subject, count]) => ({ subject, code: getSubjectCode(subject), count }))
            .sort((a, b) => a.subject.localeCompare(b.subject))

        setEndSem(toEntries(byTypeSubject['End-Sem']))
        setMidSem(toEntries(byTypeSubject['Mid-Sem']))
      }
      setLoading(false)
    }
    load()
  }, [yg, branch])

  const info = YEAR_INFO[yg]

  const SubjectGrid = ({ subjects, examType }: { subjects: SubjectEntry[]; examType: ExamType }) => (
    <div className="mb-10">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">{examType}</h2>
      {subjects.length === 0 ? (
        <p className="text-slate-400 text-sm">No papers yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {subjects.map(({ subject, code, count }) => {
            const et = examType.toLowerCase().replace('-', '-')
            const slug = subject.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            return (
              <Link
                key={`${subject}-${examType}`}
                href={`/browse/${yg}/${branch.toLowerCase()}/${et}/${slug}`}
                className="group bg-white rounded-xl border border-[#E8E4DC] p-4 shadow-sm hover:shadow-md hover:border-teal-200 transition-all text-center"
              >
                <p className="text-lg font-extrabold text-teal-700 mb-1 group-hover:text-teal-800">{code}</p>
                <p className="text-[11px] text-slate-500 leading-tight line-clamp-2 mb-2">{subject}</p>
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
                  <FileText className="w-3 h-3" />
                  <span>{count}</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )

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
        <span className="text-slate-700 font-medium">{branch}</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#1e2d3d] mb-1">
        {branch} · {info?.label}
      </h1>
      <p className="text-slate-500 text-sm mb-8">{info?.sems} question papers</p>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-[#F0EDE8] animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <SubjectGrid subjects={endSem} examType="End-Sem" />
          <SubjectGrid subjects={midSem} examType="Mid-Sem" />
        </>
      )}
    </div>
  )
}
