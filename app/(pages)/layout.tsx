import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/sonner'

import '../globals.css'

export const metadata: Metadata = {
  title: 'Puroo - AI Writing Teacher',
  description:
    'Puroo is an AI English Writing platform that helps you write English essays and papers.',
  icons: {
    icon: '/puroo-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
