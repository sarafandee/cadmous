import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { db } from '@/db/client'
import { contactSubmissions } from '@/db/schema/submissions'
import { requireAdmin } from '@/lib/admin/require-admin'

import { RowActions } from '../../_components/RowActions'

export const metadata = { title: 'Contact submission' }

type Args = { params: Promise<{ id: string }> }

export default async function ContactSubmissionPage({ params }: Args) {
  await requireAdmin()
  const { id } = await params
  const row = await db.query.contactSubmissions.findFirst({
    where: eq(contactSubmissions.id, id),
  })
  if (!row) notFound()

  return (
    <main>
      <p className="text-xs">
        <Link href="/admin/submissions/contact" className="text-zinc-500 hover:underline">
          ← Contact inbox
        </Link>
      </p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight">{row.name}</h1>
        <RowActions
          kind="contact"
          id={row.id}
          isRead={!!row.readAt}
          isArchived={!!row.archivedAt}
        />
      </div>
      <p className="mt-1 text-sm text-zinc-500">
        {row.email}
        {row.phone ? ` · ${row.phone}` : ''}
      </p>

      <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-[auto_1fr]">
        <dt className="text-zinc-500">Received</dt>
        <dd>{row.createdAt.toISOString().replace('T', ' ').slice(0, 19)} UTC</dd>
        <dt className="text-zinc-500">Locale</dt>
        <dd className="font-mono text-xs">{row.locale}</dd>
        <dt className="text-zinc-500">IP (hashed)</dt>
        <dd className="font-mono text-xs text-zinc-500">{row.ipHash ?? '—'}</dd>
        <dt className="text-zinc-500">User agent</dt>
        <dd className="text-xs text-zinc-500">{row.userAgent ?? '—'}</dd>
      </dl>

      <h2 className="mt-8 text-sm font-semibold text-zinc-700">Message</h2>
      <div className="mt-2 whitespace-pre-line rounded-lg border border-zinc-200 bg-white p-6 text-sm leading-relaxed">
        {row.message}
      </div>
    </main>
  )
}
