import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

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
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
