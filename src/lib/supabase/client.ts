'use client'
import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export function createClient() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('PaperVault: Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.')
    // Return a dummy client that won't crash the app
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder-key'
    )
  }
  return createBrowserClient(SUPABASE_URL, SUPABASE_KEY)
}
