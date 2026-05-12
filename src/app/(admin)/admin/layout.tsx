import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'

import { Toaster } from '@/components/ui/sonner'
import { auth } from '@/lib/auth'
import { SignOutButton } from './_components/SignOutButton'
import { Sidebar } from './_components/Sidebar'

export const metadata: Metadata = {
  title: {
    default: 'Admin | Cadmous',
    template: '%s | Cadmous Admin',
  },
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() })
  const isLoggedIn = !!session?.user && session.user.role === 'admin'

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded bg-zinc-900 text-[12px] font-bold text-white">
              C
            </span>
            <span className="text-sm font-semibold tracking-tight">Cadmous Admin</span>
          </Link>
          {isLoggedIn && (
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span>{session.user.email}</span>
              <SignOutButton />
            </div>
          )}
        </div>
      </header>

      {isLoggedIn ? (
        <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">
          <aside className="hidden w-52 shrink-0 md:block">
            <Sidebar />
          </aside>
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      ) : (
        children
      )}

      <Toaster richColors closeButton position="top-right" />
    </div>
  )
}
