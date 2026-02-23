import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PolicyBrief Mastery',
  description: 'Self-directed learning for policy brief writing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#fdfbf7] text-gray-900 min-h-screen`}
      suppressHydrationWarning>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 mt-12 py-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
    <span className="font-semibold text-teal-800">
      Policy<span className="text-teal-600">Brief</span>Mastery
    </span>
    <span>Self-directed learning for Tanzanian researchers</span>
    <div className="flex gap-4">
      <Link href="/dashboard" className="hover:text-teal-700 transition-colors">Dashboard</Link>
      <Link href="/courses" className="hover:text-teal-700 transition-colors">Courses</Link>
      <Link href="/builder" className="hover:text-teal-700 transition-colors">Brief Builder</Link>
    </div>
  </div>
</footer>
      </body>
    </html>
  )
}
