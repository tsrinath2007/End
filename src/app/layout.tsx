import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import ErrorBoundary from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'PaperVault — Question Paper Archive',
  description: 'Find your paper. Ace your exam.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF7F2] text-[#1e2d3d] antialiased">
        <ErrorBoundary>
          <Navbar />
          <main>{children}</main>
        </ErrorBoundary>
      </body>
    </html>
  )
}
