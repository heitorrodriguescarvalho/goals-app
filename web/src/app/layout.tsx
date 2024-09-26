import Navbar from '@/components/home/navbar'
import AuthProvider from '@/components/providers/auth-provider'
import { ReactQueryProvider } from '@/components/providers/react-query-provider'
import type { Metadata } from 'next'
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${font.className} bg-zinc-950 text-zinc-50 antialiased`}
      >
        <Navbar />
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
