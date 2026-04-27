'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home, Download, ExternalLink, Bookmark, BookmarkCheck, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { YEAR_INFO, getSubjectCode } from '@/lib/mit-data'
import type { Paper } from '@/lib/supabase/types'
import { cn, examTypeBadge, branchColor } from '@/lib/utils'

export default function SubjectPapersPage() {
  const params = useParams()
  const yg = Number(params.year)
  const branch = (params.branch as string).toUpperCase()
  const examTypeRaw = params.examtype as string
  const subjectSlug = params.subject as string

  const examType = examTypeRaw === 'end-sem' ? 'End-Sem' : 'Mid-Sem'

  const [papers, setPapers] = useState<Paper[]>([])
  const [subject, setSubject] = useState('')
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const semRange = [yg * 2 - 1, yg * 2]

    async function load() {
      const supabase = createClient()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = supabase as any

      const { data: authData } = await db.auth.getUser()
      const uid = authData?.user?.id ?? null
      setUserId(uid)

      // Fetch all papers for this branch/year/examtype, then match subject slug
      const { data } = await db
        .from('papers')
        .select('*')
        .eq('branch', branch)
        .eq('exam_type', examType)
        .in('semester', semRange)
        .order('year', { ascending: false })

      if (data) {
        // Match subject by slug
        const matched = (data as Paper[]).filter((p) => {
          const s = p.subject.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
          return s === subjectSlug
        })
        setPapers(matched)
        if (matched.length > 0) setSubject(matched[0].subject)

        // Check bookmarks
        if (uid && matched.length > 0) {
          const ids = matched.map((p) => p.id)
          const { data: bms } = await db
            .from('bookmarks')
            .select('paper_id')
            .eq('user_id', uid)
            .in('paper_id', ids)
          if (bms) {
            const bSet: Record<string, boolean> = {}
            ;(bms as { paper_id: string }[]).forEach((b) => { bSet[b.paper_id] = true })
            setBookmarked(bSet)
          }
        }
      }
      setLoading(false)
    }
    load()
  }, [yg, branch, examType, subjectSlug])

  const handleDownload = async (paper: Paper) => {
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from('papers')
      .update({ download_count: paper.download_count + 1 })
      .eq('id', paper.id)

    setPapers((prev) =>
      prev.map((p) => p.id === paper.id ? { ...p, download_count: p.download_count + 1 } : p)
    )

    window.open(paper.pdf_url, '_blank', 'noopener')
  }

  const handleBookmark = async (paper: Paper) => {
    if (!userId) { window.location.href = '/auth'; return }
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any
    if (bookmarked[paper.id]) {
      await db.from('bookmarks').delete().eq('user_id', userId).eq('paper_id', paper.id)
      setBookmarked((prev) => { const n = { ...prev }; delete n[paper.id]; return n })
    } else {
      await db.from('bookmarks').insert({ user_id: userId, paper_id: paper.id })
      setBookmarked((prev) => ({ ...prev, [paper.id]: true }))
    }
  }

  const info = YEAR_INFO[yg]
  const code = subject ? getSubjectCode(subject) : '...'

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-8 flex-wrap">
        <Link href="/" className="hover:text-teal-600"><Home className="w-3 h-3" /></Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/browse" className="hover:text-teal-600">Browse</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/browse/${yg}`} className="hover:text-teal-600">{info?.label}</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/browse/${yg}/${branch.toLowerCase()}`} className="hover:text-teal-600">{branch}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">{code}</span>
      </nav>

      <div className="flex items-start gap-3 mb-8">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-2xl font-extrabold text-teal-700">{code}</span>
            <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', branchColor(branch))}>
              {branch}
            </span>
            <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', examTypeBadge(examType))}>
              {examType}
            </span>
          </div>
          <h1 className="text-lg font-semibold text-[#1e2d3d]">{subject || '...'}</h1>
          <p className="text-sm text-slate-400 mt-0.5">{info?.label} · {info?.sems}</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-teal-600 animate-spin" />
        </div>
      ) : papers.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-slate-500 font-medium">No papers found for this subject.</p>
          <Link href={`/browse/${yg}/${branch.toLowerCase()}`} className="mt-3 text-sm text-teal-600 hover:text-teal-700 font-medium block">
            ← Back to {branch} subjects
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-slate-400 font-medium mb-4">{papers.length} paper{papers.length !== 1 ? 's' : ''} available</p>
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white rounded-2xl border border-[#E8E4DC] p-5 shadow-sm hover:shadow-md hover:border-teal-100 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1e2d3d] text-sm leading-snug mb-1">{paper.title}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>Sem {paper.semester}</span>
                    <span>·</span>
                    <span>{paper.year}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <Download className="w-3 h-3" />
                      {paper.download_count}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleBookmark(paper)}
                    className={cn(
                      'p-2 rounded-xl border transition-colors',
                      bookmarked[paper.id]
                        ? 'bg-teal-50 border-teal-200 text-teal-600'
                        : 'bg-white border-[#E8E4DC] text-slate-400 hover:text-teal-600 hover:border-teal-200'
                    )}
                    title={bookmarked[paper.id] ? 'Remove bookmark' : 'Bookmark'}
                  >
                    {bookmarked[paper.id]
                      ? <BookmarkCheck className="w-4 h-4" />
                      : <Bookmark className="w-4 h-4" />
                    }
                  </button>
                  <button
                    onClick={() => handleDownload(paper)}
                    className="flex items-center gap-1.5 bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
