'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BookOpen, Menu, X, User, LogOut, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any
    db.auth.getUser().then(({ data }: { data: { user: import('@supabase/supabase-js').User | null } }) => {
      setUser(data.user)
      if (data.user) {
        db
          .from('profiles')
          .select('is_admin')
          .eq('id', data.user.id)
          .single()
          .then(({ data: profile }: { data: { is_admin: boolean } | null }) => {
            setIsAdmin(profile?.is_admin ?? false)
          })
      }
    })

    const { data: listener } = db.auth.onAuthStateChange((_event: unknown, session: { user: import('@supabase/supabase-js').User } | null) => {
      setUser(session?.user ?? null)
      if (!session?.user) setIsAdmin(false)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setDropdownOpen(false)
    router.push('/')
    router.refresh()
  }

  const navLinks = [
    { href: '/browse', label: 'Browse' },
    { href: '/explore', label: 'Search' },
    ...(isAdmin ? [{ href: '/admin', label: 'Admin' }] : []),
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#1e2d3d]">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            PaperVault
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-teal-600'
                    : 'text-slate-600 hover:text-teal-600'
                )}
              >
                {link.label === 'Admin' && <Shield className="inline w-3 h-3 mr-1" />}
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-teal-700" />
                  </div>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-lg border border-[#E8E4DC] py-1 z-50">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-[#FAF7F2]"
                    >
                      <User className="w-4 h-4" /> My Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-[#FAF7F2] w-full"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className="bg-teal-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-slate-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#E8E4DC] bg-[#FAF7F2] px-4 pb-4 pt-2 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 hover:text-teal-600 py-2"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/profile" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-slate-700 hover:text-teal-600 py-2">
                My Profile
              </Link>
              <button onClick={handleSignOut} className="block text-sm font-medium text-rose-600 py-2">
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/auth" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-teal-600 py-2">
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
