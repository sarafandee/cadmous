import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { PageHeader, Section } from '@/components/CadmousUI'
import { getEventBySlug } from '@/lib/content/events'

type Args = {
  params: Promise<{ locale: string; slug: string }>
}

const BC: Record<string, { more: string; events: string }> = {
  en: { more: 'More', events: 'Events' },
  fr: { more: 'Plus', events: 'Événements' },
  ar: { more: 'المزيد', events: 'الفعاليات' },
}

export default async function EventDetailPage({ params }: Args) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const event = await getEventBySlug(locale, slug)
  if (!event) notFound()

  const bc = BC[locale] || BC.en

  const d = new Date(event.startDate)
  const dateLong = d.toLocaleString(locale, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <>
      <PageHeader
        locale={locale}
        title={event.title}
        breadcrumb={[
          { label: bc.events, href: '/events' },
          { label: event.title },
        ]}
        lede={event.description}
      />
      <Section>
        <article className="mx-auto max-w-3xl">
          {event.image && (
            <div className="mb-8 overflow-hidden rounded-[6px] border border-white/10">
              <img src={event.image} alt="" className="w-full" />
            </div>
          )}
          <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-[15px]">
            <div className="text-white/40">{locale === 'ar' ? 'الموعد' : locale === 'fr' ? 'Date' : 'Date'}</div>
            <div className="text-white">{dateLong}</div>
            {event.location && (
              <>
                <div className="text-white/40">{locale === 'ar' ? 'المكان' : 'Location'}</div>
                <div className="text-white">{event.location}</div>
              </>
            )}
          </div>
        </article>
      </Section>
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  const event = await getEventBySlug(locale, slug)
  return {
    title: event ? `${event.title} | Cadmous College` : 'Not Found',
  }
}
