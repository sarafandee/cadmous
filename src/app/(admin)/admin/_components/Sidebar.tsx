'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/news', label: 'News' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/announcements', label: 'Announcements' },
  { href: '/admin/media', label: 'Media' },
] as const

export function Sidebar() {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active =
          item.href === '/admin'
            ? pathname === '/admin'
            : pathname === item.href || pathname.startsWith(item.href + '/')
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
