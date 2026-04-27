'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Bookmark, LogOut, BookOpen, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import PaperCard from '@/components/PaperCard'
import type { Paper } from '@/lib/supabase/types'
import Link from 'next/link'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [bookmarkedPapers, setBookmarkedPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any
    db.auth.getUser().then(async ({ data }: { data: { user: SupabaseUser | null } }) => {
      if (!data.user) {
        router.push('/auth')
        return
      }
      setUser(data.user)

      // Fetch bookmarks joined with paper data
      const { data: bookmarks } = await db
        .from('bookmarks')
        .select('paper_id, papers(*)')
        .eq('user_id', data.user.id)
        .order('created_at', { ascending: false })

      if (bookmarks) {
        const papers = (bookmarks as { papers: Paper }[])
          .map((b) => b.papers)
          .filter(Boolean)
        setBookmarkedPapers(papers)
      }
      setLoading(false)
    })
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 flex justify-center">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-sm mb-8 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center">
            <User className="w-7 h-7 text-teal-700" />
          </div>
          <div>
            <p className="font-bold text-[#1e2d3d] text-lg">{user?.email}</p>
            <p className="text-sm text-slate-500">Student Account</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm text-rose-500 hover:text-rose-700 font-medium border border-rose-200 px-4 py-2 rounded-xl hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Bookmarks */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Bookmark className="w-5 h-5 text-teal-600" />
          <h2 className="text-lg font-bold text-[#1e2d3d]">Bookmarked Papers</h2>
          <span className="ml-1 bg-teal-100 text-teal-700 text-xs font-semibold px-2 py-0.5 rounded-full">
            {bookmarkedPapers.length}
          </span>
        </div>

        {bookmarkedPapers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedPapers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E4DC]">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No bookmarks yet</p>
            <p className="text-sm text-slate-400 mt-1">Save papers to find them here easily.</p>
            <Link
              href="/explore"
              className="inline-block mt-4 bg-teal-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors"
            >
              Browse Papers
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
