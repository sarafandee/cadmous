'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

type Item = { href: string; label: string }
type Group = { label?: string; items: Item[] }

const GROUPS: Group[] = [
  {
    items: [{ href: '/admin', label: 'Dashboard' }],
  },
  {
    label: 'Content',
    items: [
      { href: '/admin/news', label: 'News' },
      { href: '/admin/events', label: 'Events' },
      { href: '/admin/announcements', label: 'Announcements' },
      { href: '/admin/media', label: 'Media' },
    ],
  },
  {
    label: 'Inbox',
    items: [
      { href: '/admin/submissions/contact', label: 'Contact' },
      { href: '/admin/submissions/applications', label: 'Applications' },
    ],
  },
]

function isActive(pathname: string, href: string) {
  if (href === '/admin') return pathname === '/admin'
  return pathname === href || pathname.startsWith(href + '/')
}

export function Sidebar() {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-5">
      {GROUPS.map((g, gi) => (
        <div key={gi} className="flex flex-col gap-1">
          {g.label && (
            <div className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
              {g.label}
            </div>
          )}
          {g.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive(pathname, item.href)
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}
