import Navbar from '@/components/layout/navbar'
import { ReactQueryProvider } from '@/components/providers/react-query-provider'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'
import './globals.css'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Goals App',
  description: 'A Goals App to manage your weekly acitivities.',
  icons: {
    icon: '/icon.svg',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${font.className} flex min-h-screen flex-col bg-zinc-950 text-zinc-50 antialiased`}
      >
        <ReactQueryProvider>
          <SessionProvider>
            <Navbar />
            {children}
          </SessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
