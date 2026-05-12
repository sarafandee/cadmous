import { and, count, isNull } from 'drizzle-orm'
import Link from 'next/link'

import { db } from '@/db/client'
import { announcements, events, media, newsPosts } from '@/db/schema/content'
import { applications, contactSubmissions } from '@/db/schema/submissions'
import { requireAdmin } from '@/lib/admin/require-admin'

async function counts() {
  const [n, e, a, m, contactUnread, applicationUnread] = await Promise.all([
    db.select({ c: count() }).from(newsPosts),
    db.select({ c: count() }).from(events),
    db.select({ c: count() }).from(announcements),
    db.select({ c: count() }).from(media),
    db
      .select({ c: count() })
      .from(contactSubmissions)
      .where(and(isNull(contactSubmissions.readAt), isNull(contactSubmissions.archivedAt))),
    db
      .select({ c: count() })
      .from(applications)
      .where(and(isNull(applications.readAt), isNull(applications.archivedAt))),
  ])
  return {
    news: n[0]?.c ?? 0,
    events: e[0]?.c ?? 0,
    announcements: a[0]?.c ?? 0,
    media: m[0]?.c ?? 0,
    contactUnread: contactUnread[0]?.c ?? 0,
    applicationUnread: applicationUnread[0]?.c ?? 0,
  }
}

export default async function AdminDashboard() {
  const session = await requireAdmin()
  const c = await counts()

  return (
    <main>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        Dashboard
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        Welcome, {session.user.name || session.user.email}
      </h1>

      <h2 className="mt-10 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Content
      </h2>
      <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="News posts" value={c.news} href="/admin/news" />
        <Stat label="Events" value={c.events} href="/admin/events" />
        <Stat label="Announcements" value={c.announcements} href="/admin/announcements" />
        <Stat label="Media items" value={c.media} href="/admin/media" />
      </dl>

      <h2 className="mt-10 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Inbox
      </h2>
      <dl className="mt-3 grid gap-3 sm:grid-cols-2">
        <Stat
          label="Unread contact"
          value={c.contactUnread}
          href="/admin/submissions/contact"
          accent={c.contactUnread > 0}
        />
        <Stat
          label="Unread applications"
          value={c.applicationUnread}
          href="/admin/submissions/applications"
          accent={c.applicationUnread > 0}
        />
      </dl>
    </main>
  )
}

function Stat({
  label,
  value,
  href,
  accent,
}: {
  label: string
  value: number
  href: string
  accent?: boolean
}) {
  return (
    <Link
      href={href}
      className={
        'rounded-lg border p-5 transition-colors ' +
        (accent
          ? 'border-amber-200 bg-amber-50 hover:bg-amber-100'
          : 'border-zinc-200 bg-white hover:bg-zinc-50')
      }
    >
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </div>
      <div className="mt-1.5 text-2xl font-semibold tabular-nums">{value}</div>
    </Link>
  )
}
