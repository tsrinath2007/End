'use client'
import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import Fuse from 'fuse.js'
import PaperCard from '@/components/PaperCard'
import { seedPapers } from '@/lib/seed-data'
import type { Paper, Branch, ExamType } from '@/lib/supabase/types'
import { cn } from '@/lib/utils'

const allPapers: Paper[] = seedPapers.map((p, i) => ({
  ...p,
  id: String(i + 1),
  created_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
  updated_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
}))

const branches: Branch[] = ['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT']
const semesters = [1, 2, 3, 4, 5, 6, 7, 8] as const
const years = [2021, 2022, 2023, 2024]
const examTypes: ExamType[] = ['Mid-Sem', 'End-Sem']
type SortOption = 'newest' | 'downloads' | 'az'

const fuse = new Fuse(allPapers, {
  keys: ['subject', 'branch', 'exam_type', 'title'],
  threshold: 0.3,
  includeScore: true,
})

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 rounded-full text-xs font-semibold border transition-all',
        active
          ? 'bg-teal-600 text-white border-teal-600'
          : 'bg-white text-slate-600 border-[#E8E4DC] hover:border-teal-300 hover:text-teal-700'
      )}
    >
      {label}
    </button>
  )
}

function ExploreContent() {
  const searchParams = useSearchParams()
  const initialQ = searchParams.get('q') ?? ''
  const initialSubject = searchParams.get('subject') ?? ''
  const initialSort = (searchParams.get('sort') ?? 'newest') as SortOption

  const [query, setQuery] = useState(initialQ)
  const [selectedBranches, setSelectedBranches] = useState<Branch[]>([])
  const [selectedSemesters, setSelectedSemesters] = useState<number[]>([])
  const [selectedYears, setSelectedYears] = useState<number[]>([])
  const [selectedExamTypes, setSelectedExamTypes] = useState<ExamType[]>([])
  const [sortBy, setSortBy] = useState<SortOption>(initialSort)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function toggle<T>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]
  }

  const filtered = useMemo(() => {
    let results = allPapers

    if (initialSubject) {
      results = results.filter((p) =>
        p.subject.toLowerCase().includes(initialSubject.toLowerCase())
      )
    }

    if (query.trim()) {
      results = fuse
        .search(query.trim())
        .map((r) => r.item)
    }

    if (selectedBranches.length)
      results = results.filter((p) => selectedBranches.includes(p.branch))
    if (selectedSemesters.length)
      results = results.filter((p) => selectedSemesters.includes(p.semester))
    if (selectedYears.length)
      results = results.filter((p) => selectedYears.includes(p.year))
    if (selectedExamTypes.length)
      results = results.filter((p) => selectedExamTypes.includes(p.exam_type))

    if (sortBy === 'downloads') results = [...results].sort((a, b) => b.download_count - a.download_count)
    else if (sortBy === 'az') results = [...results].sort((a, b) => a.subject.localeCompare(b.subject))
    else results = [...results].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return results
  }, [query, selectedBranches, selectedSemesters, selectedYears, selectedExamTypes, sortBy, initialSubject])

  const clearAll = () => {
    setQuery('')
    setSelectedBranches([])
    setSelectedSemesters([])
    setSelectedYears([])
    setSelectedExamTypes([])
  }

  const hasFilters =
    selectedBranches.length || selectedSemesters.length || selectedYears.length || selectedExamTypes.length

  const Sidebar = () => (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5 space-y-6">
        {hasFilters ? (
          <button onClick={clearAll} className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-700 font-medium">
            <X className="w-3 h-3" /> Clear all filters
          </button>
        ) : null}

        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Branch</p>
          <div className="flex flex-wrap gap-2">
            {branches.map((b) => (
              <FilterChip key={b} label={b} active={selectedBranches.includes(b)} onClick={() => setSelectedBranches(toggle(selectedBranches, b))} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Year</p>
          <div className="flex flex-wrap gap-2">
            {years.map((y) => (
              <FilterChip key={y} label={String(y)} active={selectedYears.includes(y)} onClick={() => setSelectedYears(toggle(selectedYears, y))} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Semester</p>
          <div className="flex flex-wrap gap-2">
            {semesters.map((s) => (
              <FilterChip key={s} label={`Sem ${s}`} active={selectedSemesters.includes(s)} onClick={() => setSelectedSemesters(toggle(selectedSemesters, s))} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Exam Type</p>
          <div className="flex flex-wrap gap-2">
            {examTypes.map((e) => (
              <FilterChip key={e} label={e} active={selectedExamTypes.includes(e)} onClick={() => setSelectedExamTypes(toggle(selectedExamTypes, e))} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#1e2d3d] mb-6">Explore Papers</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Search + sort bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 flex items-center bg-white rounded-xl border border-[#E8E4DC] px-3 py-2.5 gap-2 shadow-sm">
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search papers..."
                className="flex-1 text-sm outline-none bg-transparent text-[#1e2d3d] placeholder-slate-400"
              />
              {query && (
                <button onClick={() => setQuery('')}>
                  <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                </button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex items-center gap-2 bg-white rounded-xl border border-[#E8E4DC] px-3 py-2.5 text-sm font-medium text-slate-600"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white rounded-xl border border-[#E8E4DC] px-3 py-2.5 text-sm font-medium text-slate-600 outline-none cursor-pointer shadow-sm"
            >
              <option value="newest">Newest</option>
              <option value="downloads">Most Downloaded</option>
              <option value="az">A–Z</option>
            </select>
          </div>

          {/* Mobile sidebar */}
          {sidebarOpen && (
            <div className="lg:hidden mb-6">
              <Sidebar />
            </div>
          )}

          {/* Results count */}
          <p className="text-sm text-slate-500 mb-4">
            {filtered.length} paper{filtered.length !== 1 ? 's' : ''} found
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-slate-600 font-medium">No papers match your filters</p>
              <button onClick={clearAll} className="mt-3 text-sm text-teal-600 hover:text-teal-700 font-medium">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ExplorePage() {
  return (
    <Suspense>
      <ExploreContent />
    </Suspense>
  )
}
