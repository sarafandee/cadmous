import { asc } from 'drizzle-orm'
import Link from 'next/link'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { db } from '@/db/client'
import { divisions } from '@/db/schema/cms'
import { LOCALES } from '@/db/schema/content'
import { requireAdmin } from '@/lib/admin/require-admin'

export const metadata = { title: 'Divisions' }

export default async function DivisionsListPage() {
  await requireAdmin()
  const rows = await db.query.divisions.findMany({
    orderBy: [asc(divisions.position), asc(divisions.slug)],
    with: { translations: { columns: { locale: true, title: true } } },
  })

  return (
    <main>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        CMS
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Divisions</h1>

      <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="w-[24%]">Slug</TableHead>
              <TableHead className="w-[10%]">Status</TableHead>
              <TableHead className="w-[14%]">Locales</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => {
              const titles = Object.fromEntries(r.translations.map((t) => [t.locale, t.title]))
              return (
                <TableRow key={r.id}>
                  <TableCell>
                    <Link
                      href={`/admin/divisions/${r.id}`}
                      className="font-medium text-zinc-900 hover:underline"
                    >
                      {titles.en || titles.ar || titles.fr || '(untitled)'}
                    </Link>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-zinc-500">{r.slug}</TableCell>
                  <TableCell>
                    <span
                      className={
                        r.status === 'published'
                          ? 'rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-900'
                          : 'rounded bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700'
                      }
                    >
                      {r.status}
                    </span>
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
