import { asc } from 'drizzle-orm'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { db } from '@/db/client'
import { LOCALES, events } from '@/db/schema/content'
import { requireAdmin } from '@/lib/admin/require-admin'

export const metadata = { title: 'Events' }

export default async function EventsListPage() {
  await requireAdmin()
  const rows = await db.query.events.findMany({
    orderBy: [asc(events.startDate)],
    with: { translations: { columns: { locale: true, title: true } } },
  })

  return (
    <main>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Content</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Events</h1>
        </div>
        <Button asChild>
          <Link href="/admin/events/new">New event</Link>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="w-[18%]">Slug</TableHead>
              <TableHead className="w-[18%]">Start</TableHead>
              <TableHead className="w-[10%]">Status</TableHead>
              <TableHead className="w-[10%]">Locales</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-sm text-zinc-500">
                  No events yet — <Link className="underline" href="/admin/events/new">create one</Link>.
                </TableCell>
              </TableRow>
            )}
            {rows.map((r) => {
              const titles = Object.fromEntries(r.translations.map((t) => [t.locale, t.title]))
              return (
                <TableRow key={r.id}>
                  <TableCell>
                    <Link href={`/admin/events/${r.id}`} className="font-medium text-zinc-900 hover:underline">
                      {titles.en || titles.ar || titles.fr || '(untitled)'}
                    </Link>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-zinc-500">{r.slug}</TableCell>
                  <TableCell className="text-sm text-zinc-600">
                    {r.startDate.toISOString().slice(0, 16).replace('T', ' ')}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={r.status} />
                  </TableCell>
                  <TableCell className="text-xs">
                    {LOCALES.map((l) => (
                      <span
                        key={l}
                        className={
                          titles[l]
                            ? 'me-1 rounded bg-emerald-100 px-1.5 py-0.5 font-mono text-emerald-900'
                            : 'me-1 rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-zinc-400'
                        }
                      >
                        {l.toUpperCase()}
                      </span>
                    ))}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}

function StatusBadge({ status }: { status: 'draft' | 'published' }) {
  if (status === 'published') {
    return (
      <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-900">
        Published
      </span>
    )
  }
  return (
    <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700">
      Draft
    </span>
  )
}
