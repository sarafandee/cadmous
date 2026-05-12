import type { Metadata } from 'next'

import { cn } from '@/lib/utils'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'

import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    default: 'Cadmous College | IB World School',
    template: '%s | Cadmous College',
  },
  description: 'Cadmous College — IB World School in Tyre, Lebanon.',
  openGraph: {
    type: 'website',
    siteName: 'Cadmous College',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@cadmouscollege',
  },
}
