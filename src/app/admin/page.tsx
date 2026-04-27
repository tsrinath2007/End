'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Trash2, Edit3, Plus, X, Check, Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { seedPapers } from '@/lib/seed-data'
import type { Paper, Branch, ExamType, Semester } from '@/lib/supabase/types'
import { cn, branchColor, examTypeBadge } from '@/lib/utils'

const initialPapers: Paper[] = seedPapers.map((p, i) => ({
  ...p,
  id: String(i + 1),
  created_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
  updated_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
}))

const BRANCHES: Branch[] = ['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT']
const EXAM_TYPES: ExamType[] = ['Mid-Sem', 'End-Sem']
const SEMESTERS: Semester[] = [1, 2, 3, 4, 5, 6, 7, 8]

interface PaperForm {
  subject: string
  branch: Branch
  year: number
  semester: Semester
  exam_type: ExamType
  file: File | null
}

const emptyForm = (): PaperForm => ({
  subject: '',
  branch: 'CSE',
  year: new Date().getFullYear(),
  semester: 1,
  exam_type: 'End-Sem',
  file: null,
})

export default function AdminPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)
  const [papers, setPapers] = useState<Paper[]>(initialPapers)
  const [showUpload, setShowUpload] = useState(false)
  const [form, setForm] = useState<PaperForm>(emptyForm())
  const [uploading, setUploading] = useState(false)
  const [toast, setToast] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any
    db.auth.getUser().then(async ({ data }: { data: { user: { id: string } | null } }) => {
      if (!data.user) { router.push('/auth'); return }
      const { data: profileData } = await db
        .from('profiles')
        .select('is_admin')
        .eq('id', data.user.id)
        .single()
      const profile = profileData as { is_admin: boolean } | null
      if (!profile?.is_admin) { router.push('/'); return }
      setAuthorized(true)
      setChecking(false)
    })
  }, [router])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.subject.trim() || !form.file) return
    setUploading(true)

    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any
    const fileName = `${Date.now()}-${form.file.name}`
    const { data: upload, error: uploadError } = await db.storage
      .from('papers')
      .upload(fileName, form.file)

    if (uploadError) {
      showToast('Upload failed: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = db.storage.from('papers').getPublicUrl(upload.path)
    const slug = `${form.subject.toLowerCase().replace(/\s+/g, '-')}-${form.exam_type.toLowerCase().replace('-', '')}-${form.year}-${form.branch.toLowerCase()}-s${form.semester}`

    const { data: paper, error: dbError } = await db
      .from('papers')
      .insert({
        title: `${form.subject} - ${form.exam_type} ${form.year}`,
        subject: form.subject,
        branch: form.branch,
        year: form.year,
        semester: form.semester,
        exam_type: form.exam_type,
        pdf_url: publicUrl,
        slug,
        download_count: 0,
      })
      .select()
      .single()

    if (dbError) {
      showToast('DB error: ' + dbError.message)
    } else if (paper) {
      setPapers((prev) => [paper as Paper, ...prev])
      showToast('Paper uploaded successfully!')
      setShowUpload(false)
      setForm(emptyForm())
    }
    setUploading(false)
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('papers').delete().eq('id', id)
    if (!error) {
      setPapers((prev) => prev.filter((p) => p.id !== id))
      showToast('Paper deleted.')
    }
    setDeleteId(null)
  }

  if (checking) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!authorized) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 bg-[#1e2d3d] text-white px-4 py-3 rounded-xl shadow-lg text-sm z-50 flex items-center gap-2">
          <Check className="w-4 h-4 text-teal-400" /> {toast}
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-[#1e2d3d] mb-2">Delete this paper?</h3>
            <p className="text-sm text-slate-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 rounded-xl border border-[#E8E4DC] text-sm font-medium text-slate-600 hover:bg-[#FAF7F2]">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1e2d3d]">Admin Panel</h1>
            <p className="text-sm text-slate-500">{papers.length} papers in archive</p>
          </div>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors"
        >
          {showUpload ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showUpload ? 'Cancel' : 'Upload Paper'}
        </button>
      </div>

      {/* Upload form */}
      {showUpload && (
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-sm mb-8">
          <h2 className="font-bold text-[#1e2d3d] mb-5 flex items-center gap-2">
            <Upload className="w-4 h-4 text-teal-600" /> New Paper
          </h2>
          <form onSubmit={handleUpload} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Subject Name *</label>
              <input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
                placeholder="e.g. Data Structures and Algorithms"
                className="w-full border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Branch *</label>
              <select value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value as Branch })} className="w-full border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400 bg-white">
                {BRANCHES.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Year *</label>
              <input type="number" value={form.year} min={2000} max={2030} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} className="w-full border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Semester *</label>
              <select value={form.semester} onChange={(e) => setForm({ ...form, semester: Number(e.target.value) as Semester })} className="w-full border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400 bg-white">
                {SEMESTERS.map((s) => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Exam Type *</label>
              <select value={form.exam_type} onChange={(e) => setForm({ ...form, exam_type: e.target.value as ExamType })} className="w-full border border-[#E8E4DC] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400 bg-white">
                {EXAM_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">PDF File *</label>
              <div
                onClick={() => fileRef.current?.click()}
                className={cn(
                  'border-2 border-dashed rounded-xl px-4 py-6 text-center cursor-pointer transition-colors',
                  form.file ? 'border-teal-400 bg-teal-50' : 'border-[#E8E4DC] hover:border-teal-300'
                )}
              >
                <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={(e) => setForm({ ...form, file: e.target.files?.[0] ?? null })} />
                {form.file ? (
                  <p className="text-sm text-teal-700 font-medium">{form.file.name}</p>
                ) : (
                  <p className="text-sm text-slate-400">Click to select PDF file</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <button type="submit" disabled={uploading} className="bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 disabled:opacity-60 transition-colors">
                {uploading ? 'Uploading...' : 'Upload Paper'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Papers table */}
      <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E8E4DC] bg-[#FAF7F2]">
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wide">Subject</th>
                <th className="text-left px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wide">Branch</th>
                <th className="text-left px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden sm:table-cell">Year</th>
                <th className="text-left px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden md:table-cell">Sem</th>
                <th className="text-left px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden lg:table-cell">Type</th>
                <th className="text-right px-4 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden lg:table-cell">DL</th>
                <th className="text-right px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E4DC]">
              {papers.map((paper) => (
                <tr key={paper.id} className="hover:bg-[#FAF7F2] transition-colors group">
                  <td className="px-5 py-3.5 font-medium text-[#1e2d3d] max-w-[200px] truncate">{paper.subject}</td>
                  <td className="px-4 py-3.5">
                    <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', branchColor(paper.branch))}>
                      {paper.branch}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 hidden sm:table-cell">{paper.year}</td>
                  <td className="px-4 py-3.5 text-slate-600 hidden md:table-cell">{paper.semester}</td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', examTypeBadge(paper.exam_type))}>
                      {paper.exam_type}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 text-right hidden lg:table-cell">{paper.download_count}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => setDeleteId(paper.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
