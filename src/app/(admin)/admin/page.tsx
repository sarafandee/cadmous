import { count } from 'drizzle-orm'

import { db } from '@/db/client'
import { announcements, events, media, newsPosts } from '@/db/schema/content'
import { requireAdmin } from '@/lib/admin/require-admin'

async function counts() {
  const [n, e, a, m] = await Promise.all([
    db.select({ c: count() }).from(newsPosts),
    db.select({ c: count() }).from(events),
    db.select({ c: count() }).from(announcements),
    db.select({ c: count() }).from(media),
  ])
  return {
    news: n[0]?.c ?? 0,
    events: e[0]?.c ?? 0,
    announcements: a[0]?.c ?? 0,
    media: m[0]?.c ?? 0,
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

      <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="News posts" value={c.news} />
        <Stat label="Events" value={c.events} />
        <Stat label="Announcements" value={c.announcements} />
        <Stat label="Media items" value={c.media} />
      </dl>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </div>
      <div className="mt-1.5 text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  )
}
