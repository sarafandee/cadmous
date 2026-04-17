export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { getPayloadLocale } from '@/i18n/payload-locale'
import { formatDateTime } from '@/utilities/formatDateTime'
import { Media } from '@/components/Media'

type Args = {
  params: Promise<{ locale: string }>
}

export default async function EventsPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const payload = await getPayload({ config: configPromise })
  const payloadLocale = getPayloadLocale(locale)

  const events = await payload.find({
    collection: 'events',
    locale: payloadLocale as any,
    limit: 20,
    sort: '-startDate',
    where: {
      _status: { equals: 'published' },
    },
  })

  const titles: Record<string, string> = {
    ar: 'الفعاليات',
    en: 'Events',
    fr: 'Événements',
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">{titles[locale] || titles.en}</h1>

      {events.docs.length === 0 ? (
        <p className="text-gray-500">
          {locale === 'ar' ? 'لا توجد فعاليات حالياً' : locale === 'fr' ? 'Aucun événement pour le moment' : 'No events yet'}
        </p>
      ) : (
        <div className="space-y-6">
          {events.docs.map((event) => (
            <Link
              key={event.id}
              href={`/${locale}/events/${event.slug}`}
              className="group flex gap-6 rounded-lg border border-gray-200 p-5 transition-shadow hover:shadow-lg"
            >
              {/* Date badge */}
              <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-blue-900 px-4 py-3 text-white">
                <span className="text-2xl font-bold">
                  {new Date(event.startDate).getDate()}
                </span>
                <span className="text-xs uppercase">
                  {new Date(event.startDate).toLocaleDateString(locale, { month: 'short' })}
                </span>
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold group-hover:text-blue-900">
                  {event.title}
                </h2>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                  <span>{formatDateTime(event.startDate)}</span>
                  {event.location && <span>📍 {event.location}</span>}
                </div>
              </div>

              {event.image && typeof event.image === 'object' && (
                <div className="hidden w-40 shrink-0 overflow-hidden rounded-lg md:block">
                  <Media resource={event.image} className="h-full w-full object-cover" />
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    ar: 'الفعاليات | مدرسة قدموس',
    en: 'Events | Cadmous College',
    fr: 'Événements | Collège Cadmous',
  }
  return { title: titles[locale] || titles.en }
}
