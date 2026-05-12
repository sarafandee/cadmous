import { and, desc, isNotNull, isNull } from 'drizzle-orm'
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
import { contactSubmissions } from '@/db/schema/submissions'
import { requireAdmin } from '@/lib/admin/require-admin'

import { RowActions } from '../_components/RowActions'

export const metadata = { title: 'Contact submissions' }

type Args = { searchParams: Promise<{ archived?: string }> }

export default async function ContactInboxPage({ searchParams }: Args) {
  await requireAdmin()
  const sp = await searchParams
  const showArchived = sp.archived === '1'

  const rows = await db
    .select()
    .from(contactSubmissions)
    .where(showArchived ? isNotNull(contactSubmissions.archivedAt) : isNull(contactSubmissions.archivedAt))
    .orderBy(desc(contactSubmissions.createdAt))
    .limit(200)

  return (
    <main>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Inbox
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Contact submissions</h1>
        </div>
        <div className="flex gap-2 text-xs">
          <Link
            href="/admin/submissions/contact"
            className={
              !showArchived
                ? 'rounded bg-zinc-900 px-2.5 py-1.5 font-medium text-white'
                : 'rounded px-2.5 py-1.5 font-medium text-zinc-600 hover:bg-zinc-100'
            }
          >
            Active
          </Link>
          <Link
            href="/admin/submissions/contact?archived=1"
            className={
              showArchived
                ? 'rounded bg-zinc-900 px-2.5 py-1.5 font-medium text-white'
                : 'rounded px-2.5 py-1.5 font-medium text-zinc-600 hover:bg-zinc-100'
            }
          >
            Archived
          </Link>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[28%]">From</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="w-[14%]">Received</TableHead>
              <TableHead className="w-[20%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-sm text-zinc-500">
                  {showArchived ? 'No archived submissions.' : 'Inbox is empty.'}
                </TableCell>
              </TableRow>
            )}
            {rows.map((r) => {
              const isRead = !!r.readAt
              return (
                <TableRow key={r.id} className={isRead ? undefined : 'bg-amber-50/50'}>
                  <TableCell>
                    <Link
                      href={`/admin/submissions/contact/${r.id}`}
                      className="block hover:underline"
                    >
                      <div className={isRead ? 'font-medium' : 'font-semibold'}>{r.name}</div>
                      <div className="text-xs text-zinc-500">{r.email}</div>
                    </Link>
                  </TableCell>
                  <TableCell className="max-w-xl truncate text-sm text-zinc-700">
                    {r.message}
                  </TableCell>
                  <TableCell className="text-xs text-zinc-500">
                    {r.createdAt.toISOString().slice(0, 16).replace('T', ' ')}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <RowActions
                        kind="contact"
                        id={r.id}
                        isRead={isRead}
                        isArchived={!!r.archivedAt}
                      />
                    </div>
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
