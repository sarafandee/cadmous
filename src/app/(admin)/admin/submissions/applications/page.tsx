import { desc, isNotNull, isNull } from 'drizzle-orm'
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
import { applications } from '@/db/schema/submissions'
import { requireAdmin } from '@/lib/admin/require-admin'

import { RowActions } from '../_components/RowActions'

export const metadata = { title: 'Applications' }

type Args = { searchParams: Promise<{ archived?: string }> }

export default async function ApplicationsInboxPage({ searchParams }: Args) {
  await requireAdmin()
  const sp = await searchParams
  const showArchived = sp.archived === '1'

  const rows = await db
    .select()
    .from(applications)
    .where(showArchived ? isNotNull(applications.archivedAt) : isNull(applications.archivedAt))
    .orderBy(desc(applications.createdAt))
    .limit(500)

  return (
    <main>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Admissions
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Applications</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2 text-xs">
            <Link
              href="/admin/submissions/applications"
              className={
                !showArchived
                  ? 'rounded bg-zinc-900 px-2.5 py-1.5 font-medium text-white'
                  : 'rounded px-2.5 py-1.5 font-medium text-zinc-600 hover:bg-zinc-100'
              }
            >
              Active
            </Link>
            <Link
              href="/admin/submissions/applications?archived=1"
              className={
                showArchived
                  ? 'rounded bg-zinc-900 px-2.5 py-1.5 font-medium text-white'
                  : 'rounded px-2.5 py-1.5 font-medium text-zinc-600 hover:bg-zinc-100'
              }
            >
              Archived
            </Link>
          </div>
          <Button asChild variant="outline" size="sm">
            <a href={`/admin/api/submissions/applications.csv${showArchived ? '?archived=1' : ''}`}>
              Export CSV
            </a>
          </Button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead className="w-[12%]">Grade</TableHead>
              <TableHead className="w-[22%]">Guardian</TableHead>
              <TableHead className="w-[14%]">Received</TableHead>
              <TableHead className="w-[20%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-sm text-zinc-500">
                  {showArchived ? 'No archived applications.' : 'No applications yet.'}
                </TableCell>
              </TableRow>
            )}
            {rows.map((r) => {
              const isRead = !!r.readAt
              return (
                <TableRow key={r.id} className={isRead ? undefined : 'bg-amber-50/50'}>
                  <TableCell>
                    <Link
                      href={`/admin/submissions/applications/${r.id}`}
                      className="block hover:underline"
                    >
                      <div className={isRead ? 'font-medium' : 'font-semibold'}>
                        {r.studentName}
                      </div>
                      <div className="text-xs text-zinc-500 font-mono">{r.appLang}</div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-zinc-700">{r.studentGrade}</TableCell>
                  <TableCell className="text-sm text-zinc-700">
                    <div className="truncate">{r.guardianEmail ?? '—'}</div>
                    <div className="text-xs text-zinc-500">{r.guardianPhone ?? '—'}</div>
                  </TableCell>
                  <TableCell className="text-xs text-zinc-500">
                    {r.createdAt.toISOString().slice(0, 16).replace('T', ' ')}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <RowActions
                        kind="application"
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
