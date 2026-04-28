'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff, BookOpen, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    // Verify user arrived here via a valid reset link (they should have a session)
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(supabase as any).auth.getUser().then(({ data }: { data: { user: unknown } }) => {
      if (data.user) setHasSession(true)
      else router.push('/auth')
    })
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/'), 2500)
    }
  }

  if (!hasSession) return null

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#1e2d3d]">Set new password</h1>
          <p className="text-slate-500 text-sm mt-1">Choose a strong password for your account</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-sm p-8">
          {success ? (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <p className="font-semibold text-[#1e2d3d] mb-1">Password updated!</p>
              <p className="text-sm text-slate-500">Redirecting you to the home page…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  New Password
                </label>
                <div className="flex items-center border border-[#E8E4DC] rounded-xl px-3 gap-2 focus-within:border-teal-400 transition-colors">
                  <Lock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Min. 6 characters"
                    className="flex-1 py-2.5 text-sm outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Confirm Password
                </label>
                <div className="flex items-center border border-[#E8E4DC] rounded-xl px-3 gap-2 focus-within:border-teal-400 transition-colors">
                  <Lock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    placeholder="Repeat your password"
                    className="flex-1 py-2.5 text-sm outline-none bg-transparent"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5 text-sm text-rose-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-teal-700 disabled:opacity-60 transition-colors"
              >
                {loading ? 'Updating…' : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
