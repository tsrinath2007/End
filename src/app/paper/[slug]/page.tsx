'use client'
import { useState, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import { Download, Bookmark, BookmarkCheck, Calendar, Layers, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { seedPapers } from '@/lib/seed-data'
import PaperCard from '@/components/PaperCard'
import { createClient } from '@/lib/supabase/client'
import type { Paper } from '@/lib/supabase/types'
import { cn, branchColor, examTypeBadge } from '@/lib/utils'

const allPapers: Paper[] = seedPapers.map((p, i) => ({
  ...p,
  id: String(i + 1),
  created_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
  updated_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
}))

function PDFViewer({ url }: { url: string }) {
  return (
    <div className="w-full bg-slate-100 rounded-2xl overflow-hidden border border-[#E8E4DC]">
      <iframe
        src={`${url}#toolbar=0`}
        className="w-full h-[600px]"
        title="PDF Preview"
      />
    </div>
  )
}

export default function PaperDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const paper = allPapers.find((p) => p.slug === slug)

  const [bookmarked, setBookmarked] = useState(false)
  const [downloadCount, setDownloadCount] = useState(paper?.download_count ?? 0)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any
    db.auth.getUser().then(({ data }: { data: { user: { id: string } | null } }) => {
      setUserId(data.user?.id ?? null)
      if (data.user && paper) {
        db
          .from('bookmarks')
          .select('id')
          .eq('user_id', data.user.id)
          .eq('paper_id', paper.id)
          .single()
          .then(({ data: bm }: { data: unknown }) => setBookmarked(!!bm))
      }
    })
  }, [paper])

  if (!paper) {
    notFound()
    return null
  }

  const related = allPapers.filter(
    (p) => p.subject === paper.subject && p.id !== paper.id
  ).slice(0, 3)

  const handleDownload = async () => {
    setDownloadCount((c) => c + 1)
    const a = document.createElement('a')
    a.href = paper.pdf_url
    a.download = `${paper.slug}.pdf`
    a.target = '_blank'
    a.rel = 'noopener'
    a.click()
  }

  const handleBookmark = async () => {
    if (!userId) {
      window.location.href = '/auth'
      return
    }
    setLoading(true)
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
    setLoading(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back */}
      <Link href="/explore" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Explore
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: PDF preview */}
        <div className="lg:col-span-2">
          <PDFViewer url={paper.pdf_url} />
        </div>

        {/* Right: Metadata */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-sm">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full border', branchColor(paper.branch))}>
                {paper.branch}
              </span>
              <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full border', examTypeBadge(paper.exam_type))}>
                {paper.exam_type}
              </span>
            </div>

            <h1 className="text-xl font-bold text-[#1e2d3d] mb-4 leading-snug">{paper.subject}</h1>

            {/* Meta grid */}
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

            {/* Actions */}
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
                disabled={loading}
                className={cn(
                  'w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm border transition-colors',
                  bookmarked
                    ? 'bg-teal-50 text-teal-700 border-teal-200'
                    : 'bg-white text-slate-600 border-[#E8E4DC] hover:border-teal-300 hover:text-teal-700'
                )}
              >
                {bookmarked ? (
                  <><BookmarkCheck className="w-4 h-4" /> Bookmarked</>
                ) : (
                  <><Bookmark className="w-4 h-4" /> Bookmark</>
                )}
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
