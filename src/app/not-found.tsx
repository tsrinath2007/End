import Link from 'next/link'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-10 h-10 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-[#1e2d3d] mb-2">Page not found</h1>
        <p className="text-slate-500 mb-8">The page you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-block bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
