import Link from 'next/link'
import { Download, BookmarkPlus, Calendar, Layers } from 'lucide-react'
import type { Paper } from '@/lib/supabase/types'
import { cn, formatDownloadCount, branchColor, examTypeBadge } from '@/lib/utils'

interface PaperCardProps {
  paper: Paper
  className?: string
}

export default function PaperCard({ paper, className }: PaperCardProps) {
  return (
    <Link
      href={`/paper/${paper.slug}`}
      className={cn(
        'group block bg-white rounded-2xl border border-[#E8E4DC] p-5 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-200',
        className
      )}
    >
      {/* Header badges */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap gap-1.5">
          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', branchColor(paper.branch))}>
            {paper.branch}
          </span>
          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', examTypeBadge(paper.exam_type))}>
            {paper.exam_type}
          </span>
        </div>
      </div>

      {/* Subject name */}
      <h3 className="font-semibold text-[#1e2d3d] text-base leading-snug mb-2 group-hover:text-teal-700 transition-colors line-clamp-2">
        {paper.subject}
      </h3>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-slate-500 mt-auto">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {paper.year}
        </span>
        <span className="flex items-center gap-1">
          <Layers className="w-3 h-3" />
          Sem {paper.semester}
        </span>
        <span className="flex items-center gap-1 ml-auto">
          <Download className="w-3 h-3" />
          {formatDownloadCount(paper.download_count)}
        </span>
      </div>
    </Link>
  )
}
