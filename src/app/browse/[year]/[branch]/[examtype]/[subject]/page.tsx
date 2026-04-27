'use client'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home, Download, ExternalLink, Bookmark, BookmarkCheck, Loader2, X, FileText, Eye } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { YEAR_INFO, CYCLES, getCycleForBranch, getSubjectCode, subjectSlug as toSlug } from '@/lib/mit-data'
import type { Paper } from '@/lib/supabase/types'
import { cn, examTypeBadge, branchColor } from '@/lib/utils'

function PDFPreviewPanel({
  paper,
  onClose,
}: {
  paper: Paper
  onClose: () => void
}) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)
  // Google Docs viewer reliably renders any public PDF in an iframe
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(paper.pdf_url)}&embedded=true`

  return (
    <div className="mb-8 bg-white rounded-2xl border border-teal-200 shadow-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E8E4DC] bg-[#FAF7F2]">
        <FileText className="w-4 h-4 text-teal-600 flex-shrink-0" />
        <p className="text-sm font-semibold text-[#1e2d3d] flex-1 truncate">{paper.title}</p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={paper.pdf_url}
            download
            target="_blank"
            rel="noopener"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 border border-[#E8E4DC] px-3 py-1.5 rounded-lg hover:border-teal-300 hover:text-teal-700 transition-colors bg-white"
          >
            <Download className="w-3.5 h-3.5" /> Download
          </a>
          <a
            href={paper.pdf_url}
            target="_blank"
            rel="noopener"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 border border-[#E8E4DC] px-3 py-1.5 rounded-lg hover:border-teal-300 hover:text-teal-700 transition-colors bg-white"
          >
            <ExternalLink className="w-3.5 h-3.5" /> New tab
          </a>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-[#F0EDE8] transition-colors"
            aria-label="Close preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile action buttons */}
      <div className="flex sm:hidden gap-2 px-4 py-2 border-b border-[#E8E4DC] bg-[#FAF7F2]">
        <a
          href={paper.pdf_url}
          download
          target="_blank"
          rel="noopener"
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 border border-[#E8E4DC] px-3 py-2 rounded-lg hover:border-teal-300 hover:text-teal-700 bg-white"
        >
          <Download className="w-3.5 h-3.5" /> Download
        </a>
        <a
          href={paper.pdf_url}
          target="_blank"
          rel="noopener"
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 border border-[#E8E4DC] px-3 py-2 rounded-lg hover:border-teal-300 hover:text-teal-700 bg-white"
        >
          <ExternalLink className="w-3.5 h-3.5" /> New tab
        </a>
      </div>

      {/* PDF iframe */}
      <div className="relative bg-slate-100" style={{ height: '72vh' }}>
        {!loaded && !errored && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-7 h-7 animate-spin text-teal-500" />
            <p className="text-sm">Loading preview…</p>
          </div>
        )}
        {errored && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-slate-400 px-4 text-center">
            <p className="text-4xl">📄</p>
            <p className="text-sm font-medium text-slate-600">Preview unavailable</p>
            <p className="text-xs text-slate-400">The PDF couldn&apos;t load in the viewer.</p>
            <a
              href={paper.pdf_url}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-1.5 bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Open directly
            </a>
          </div>
        )}
        <iframe
          src={viewerUrl}
          className={cn('w-full h-full border-0 transition-opacity duration-300', loaded ? 'opacity-100' : 'opacity-0')}
          title={paper.title}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          allow="fullscreen"
        />
      </div>
    </div>
  )
}

export default function SubjectPapersPage() {
  const params = useParams()
  const yg = Number(params.year)
  const branchParam = params.branch as string
  const examTypeRaw = params.examtype as string
  const subjectSlugParam = params.subject as string

  const examType = examTypeRaw === 'end-sem' ? 'End-Sem' : 'Mid-Sem'
  const cycle = getCycleForBranch(branchParam)

  // Find the human-readable subject name from cycle definition
  const cycleSubjectName = cycle
    ? CYCLES[cycle].subjects.find((s) => toSlug(s.name) === subjectSlugParam)?.name ?? ''
    : ''

  const [papers, setPapers] = useState<Paper[]>([])
  const [subject, setSubject] = useState(cycleSubjectName)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({})
  const [previewPaper, setPreviewPaper] = useState<Paper | null>(null)

  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const semRange = [yg * 2 - 1, yg * 2]

    async function load() {
      const supabase = createClient()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = supabase as any

      const { data: authData } = await db.auth.getUser()
      const uid = authData?.user?.id ?? null
      setUserId(uid)

      let query = db
        .from('papers')
        .select('*')
        .eq('exam_type', examType)
        .in('semester', semRange)
        .order('year', { ascending: false })

      // For cycle-based routes, filter by subject name; otherwise filter by branch
      if (!cycle) {
        query = query.eq('branch', branchParam.toUpperCase())
      }

      const { data } = await query

      if (data) {
        const matched = (data as Paper[]).filter((p) => {
          const s = toSlug(p.subject)
          return s === subjectSlugParam
        })
        setPapers(matched)
        if (matched.length > 0) setSubject(matched[0].subject)

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
  }, [yg, branchParam, cycle, examType, subjectSlugParam])

  const handleOpen = (paper: Paper) => {
    setPreviewPaper(paper)
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

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
        <Link href={`/browse/${yg}/${branchParam}`} className="hover:text-teal-600">
          {cycle ? CYCLES[cycle].label : branchParam.toUpperCase()}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">{code}</span>
      </nav>

      {/* Subject header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className={cn('text-2xl font-extrabold', cycle === 'physics' ? 'text-blue-600' : cycle === 'chemistry' ? 'text-emerald-700' : 'text-teal-700')}>
            {code}
          </span>
          {cycle ? (
            <span className={cn(
              'text-xs font-semibold px-2 py-0.5 rounded-full border',
              cycle === 'physics'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            )}>
              {CYCLES[cycle].label}
            </span>
          ) : (
            <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', branchColor(branchParam))}>
              {branchParam.toUpperCase()}
            </span>
          )}
          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', examTypeBadge(examType))}>
            {examType}
          </span>
        </div>
        <h1 className="text-lg font-semibold text-[#1e2d3d]">{subject || '...'}</h1>
        <p className="text-sm text-slate-400 mt-0.5">{info?.label} · {info?.sems}</p>
      </div>

      {/* PDF Preview Panel — anchored here */}
      <div ref={previewRef}>
        {previewPaper && (
          <PDFPreviewPanel paper={previewPaper} onClose={() => setPreviewPaper(null)} />
        )}
      </div>

      {/* Paper list */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-teal-600 animate-spin" />
        </div>
      ) : papers.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-slate-500 font-medium">No papers found for this subject.</p>
          <Link href={`/browse/${yg}/${branchParam}`} className="mt-3 text-sm text-teal-600 hover:text-teal-700 font-medium block">
            ← Back to {cycle ? CYCLES[cycle].label : branchParam.toUpperCase()} subjects
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-slate-400 font-medium mb-4">
            {papers.length} paper{papers.length !== 1 ? 's' : ''} available
          </p>
          {papers.map((paper) => (
            <div
              key={paper.id}
              className={cn(
                'bg-white rounded-2xl border p-5 shadow-sm transition-all',
                previewPaper?.id === paper.id
                  ? 'border-teal-300 ring-1 ring-teal-200'
                  : 'border-[#E8E4DC] hover:border-teal-100 hover:shadow-md'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1e2d3d] text-sm leading-snug mb-2">{paper.title}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
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
                    className="p-2 rounded-xl border border-[#E8E4DC] text-slate-400 hover:text-teal-600 hover:border-teal-200 transition-colors bg-white"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpen(paper)}
                    className={cn(
                      'flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors',
                      previewPaper?.id === paper.id
                        ? 'bg-teal-700 text-white'
                        : 'bg-teal-600 text-white hover:bg-teal-700'
                    )}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {previewPaper?.id === paper.id ? 'Viewing' : 'Open'}
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
