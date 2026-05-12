import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { db } from '@/db/client'
import { LOCALES, announcements } from '@/db/schema/content'
import { requireAdmin } from '@/lib/admin/require-admin'

import { AnnouncementForm } from '../_components/AnnouncementForm'
import type { AnnouncementFormValues } from '../schema'

export const metadata = { title: 'Edit announcement' }

type Args = { params: Promise<{ id: string }> }

export default async function EditAnnouncementPage({ params }: Args) {
  const { id } = await params
  await requireAdmin()

  const a = await db.query.announcements.findFirst({
    where: eq(announcements.id, id),
    with: { translations: true },
  })
  if (!a) notFound()

  const translationsMap = Object.fromEntries(a.translations.map((t) => [t.locale, t]))
  const empty = { title: '', body: '', machineTranslated: false }
  const initial: AnnouncementFormValues = {
    severity: a.severity,
    status: a.status,
    startsAt: a.startsAt ? a.startsAt.toISOString().slice(0, 16) : '',
    endsAt: a.endsAt ? a.endsAt.toISOString().slice(0, 16) : '',
    translations: LOCALES.reduce(
      (acc, l) => {
        const t = translationsMap[l]
        acc[l] = t
          ? { title: t.title, body: t.body, machineTranslated: t.machineTranslated }
          : { ...empty }
        return acc
      },
      {} as AnnouncementFormValues['translations'],
    ),
  }

  return (
    <main>
      <p className="text-xs">
        <Link href="/admin/announcements" className="text-zinc-500 hover:underline">← Announcements</Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Edit announcement</h1>
      <div className="mt-8">
        <AnnouncementForm mode="edit" id={a.id} initial={initial} />
      </div>
    </main>
  )
}
