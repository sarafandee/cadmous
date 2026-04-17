export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { getPayloadLocale } from '@/i18n/payload-locale'
import { formatDateTime } from '@/utilities/formatDateTime'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

type Args = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function EventDetailPage({ params }: Args) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const event = await queryEventBySlug({ slug, locale: getPayloadLocale(locale) })

  if (!event) notFound()

  const addToCalendarLabels: Record<string, string> = {
    ar: 'أضف إلى التقويم',
    en: 'Add to Calendar',
    fr: 'Ajouter au calendrier',
  }

  // Generate iCal data
  const startDate = new Date(event.startDate)
  const endDate = event.endDate ? new Date(event.endDate) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000)
  const icalDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

  const googleCalendarUrl = `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${icalDate(startDate)}/${icalDate(endDate)}${event.location ? `&location=${encodeURIComponent(event.location)}` : ''}`

  return (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      {event.image && typeof event.image === 'object' && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <Media resource={event.image} />
        </div>
      )}

      <h1 className="mb-4 text-4xl font-bold">{event.title}</h1>

      <div className="mb-8 flex flex-wrap items-center gap-4 text-gray-600">
        <span>{formatDateTime(event.startDate)}</span>
        {event.endDate && (
          <>
            <span>→</span>
            <span>{formatDateTime(event.endDate)}</span>
          </>
        )}
        {event.location && <span>📍 {event.location}</span>}
      </div>

      {/* Add to Calendar */}
      <div className="mb-8 flex gap-3">
        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          📅 {addToCalendarLabels[locale] || addToCalendarLabels.en} (Google)
        </a>
      </div>

      {event.description && <RichText data={event.description} />}
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  const event = await queryEventBySlug({ slug, locale: getPayloadLocale(locale) })
  return {
    title: event ? `${event.title} | Cadmous College` : 'Not Found',
  }
}

const queryEventBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'events',
    locale: locale as any,
    limit: 1,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})
