'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Download, Bookmark, BookmarkCheck, Calendar, Layers, Tag, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import PaperCard from '@/components/PaperCard'
import { createClient } from '@/lib/supabase/client'
import type { Paper } from '@/lib/supabase/types'
import { cn, branchColor, examTypeBadge } from '@/lib/utils'

export default function PaperDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [paper, setPaper] = useState<Paper | null>(null)
  const [related, setRelated] = useState<Paper[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [downloadCount, setDownloadCount] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)
  const [bookmarkLoading, setBookmarkLoading] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = supabase as any

      // Fetch the paper by slug
      const { data: paperData, error } = await db
        .from('papers')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error || !paperData) {
        setNotFound(true)
        setLoading(false)
        return
      }

      const p = paperData as Paper
      setPaper(p)
      setDownloadCount(p.download_count)

      // Fetch related papers (same subject, different id)
      const { data: relatedData } = await db
        .from('papers')
        .select('*')
        .eq('subject', p.subject)
        .neq('id', p.id)
        .limit(3)
      if (relatedData) setRelated(relatedData as Paper[])

      // Check auth & bookmark status
      const { data: authData } = await db.auth.getUser()
      if (authData?.user) {
        setUserId(authData.user.id)
        const { data: bm } = await db
          .from('bookmarks')
          .select('id')
          .eq('user_id', authData.user.id)
          .eq('paper_id', p.id)
          .single()
        setBookmarked(!!bm)
      }

      setLoading(false)
    }
    load()
  }, [slug])

  const handleDownload = async () => {
    if (!paper) return
    setDownloadCount((c) => c + 1)

    // Increment in DB (best-effort)
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from('papers')
      .update({ download_count: downloadCount + 1 })
      .eq('id', paper.id)

    const a = document.createElement('a')
    a.href = paper.pdf_url
    a.target = '_blank'
    a.rel = 'noopener'
    a.click()
  }

  const handleBookmark = async () => {
    if (!paper) return
    if (!userId) { window.location.href = '/auth'; return }
    setBookmarkLoading(true)
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any
    if (bookmarked) {
      await db.from('bookmarks').delete().eq('user_id', userId).eq('paper_id', paper.id)
      setBookmarked(false)
    } else {
      await db.from('bookmarks').insert({ user_id: userId, paper_id: paper.id })
      setBookmarked(true)
    }
    setBookmarkLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
      </div>
    )
  }

  if (notFound || !paper) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-4xl mb-4">📄</p>
        <h1 className="text-xl font-bold text-[#1e2d3d] mb-2">Paper not found</h1>
        <Link href="/explore" className="text-teal-600 hover:text-teal-700 text-sm font-medium">← Back to Explore</Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/explore" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Explore
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PDF preview */}
        <div className="lg:col-span-2">
          <div className="w-full bg-slate-100 rounded-2xl overflow-hidden border border-[#E8E4DC]">
            <iframe
              src={`${paper.pdf_url}#toolbar=0`}
              className="w-full h-[600px]"
              title="PDF Preview"
            />
          </div>
        </div>

        {/* Metadata sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-sm">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full border', branchColor(paper.branch))}>
                {paper.branch}
              </span>
              <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full border', examTypeBadge(paper.exam_type))}>
                {paper.exam_type}
              </span>
            </div>

            <h1 className="text-xl font-bold text-[#1e2d3d] mb-4 leading-snug">{paper.subject}</h1>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-600">
                <Calendar className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <span className="font-medium">Year:</span>
                <span>{paper.year}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Layers className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <span className="font-medium">Semester:</span>
                <span>{paper.semester}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Tag className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <span className="font-medium">Exam Type:</span>
                <span>{paper.exam_type}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Download className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <span className="font-medium">Downloads:</span>
                <span>{downloadCount.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-teal-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={handleBookmark}
                disabled={bookmarkLoading}
                className={cn(
                  'w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm border transition-colors',
                  bookmarked
                    ? 'bg-teal-50 text-teal-700 border-teal-200'
                    : 'bg-white text-slate-600 border-[#E8E4DC] hover:border-teal-300 hover:text-teal-700'
                )}
              >
                {bookmarkLoading
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : bookmarked
                    ? <><BookmarkCheck className="w-4 h-4" /> Bookmarked</>
                    : <><Bookmark className="w-4 h-4" /> Bookmark</>
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related papers */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold text-[#1e2d3d] mb-4">Related Papers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((p) => (
              <PaperCard key={p.id} paper={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
