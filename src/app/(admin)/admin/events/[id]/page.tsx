import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { db } from '@/db/client'
import { LOCALES, events } from '@/db/schema/content'
import { requireAdmin } from '@/lib/admin/require-admin'

import { EventForm } from '../_components/EventForm'
import type { EventFormValues } from '../schema'

export const metadata = { title: 'Edit event' }

type Args = { params: Promise<{ id: string }> }

export default async function EditEventPage({ params }: Args) {
  const { id } = await params
  await requireAdmin()

  const event = await db.query.events.findFirst({
    where: eq(events.id, id),
    with: { translations: true },
  })
  if (!event) notFound()

  const translationsMap = Object.fromEntries(event.translations.map((t) => [t.locale, t]))
  const empty = { title: '', description: '', machineTranslated: false }
  const initial: EventFormValues = {
    slug: event.slug,
    startDate: event.startDate.toISOString().slice(0, 16),
    endDate: event.endDate ? event.endDate.toISOString().slice(0, 16) : '',
    location: event.location ?? '',
    status: event.status,
    translations: LOCALES.reduce(
      (acc, l) => {
        const t = translationsMap[l]
        acc[l] = t
          ? {
              title: t.title,
              description: t.description,
              machineTranslated: t.machineTranslated,
            }
          : { ...empty }
        return acc
      },
      {} as EventFormValues['translations'],
    ),
  }

  return (
    <main>
      <p className="text-xs">
        <Link href="/admin/events" className="text-zinc-500 hover:underline">← Events</Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Edit event</h1>
      <p className="mt-1 text-sm text-zinc-500 font-mono">{event.slug}</p>
      <div className="mt-8">
        <EventForm mode="edit" id={event.id} initial={initial} />
      </div>
    </main>
  )
}
