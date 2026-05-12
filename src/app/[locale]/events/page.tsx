import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { PageHeader, Section } from '@/components/CadmousUI'
import { getAllEvents } from '@/lib/content/events'

type Args = { params: Promise<{ locale: string }> }

const T: Record<string, { title: string; bcMore: string; bcThis: string; lede: string }> = {
  en: {
    title: 'Events',
    bcMore: 'More',
    bcThis: 'Events',
    lede: 'Open days, talks, performances, and life on campus.',
  },
  fr: {
    title: 'Événements',
    bcMore: 'Plus',
    bcThis: 'Événements',
    lede: 'Portes ouvertes, conférences, spectacles et vie de campus.',
  },
  ar: {
    title: 'الفعاليات',
    bcMore: 'المزيد',
    bcThis: 'الفعاليات',
    lede: 'أيام مفتوحة ومحاضرات وعروض وحياة في الحرم.',
  },
}

export default async function EventsPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en
  const events = await getAllEvents(locale)

  return (
    <>
      <PageHeader
        locale={locale}
        title={t.title}
        breadcrumb={[{ label: t.bcMore }, { label: t.bcThis }]}
        lede={t.lede}
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => {
            const d = new Date(e.startDate)
            return (
              <Link
                key={e.slug}
                href={`/${locale}/events/${e.slug}`}
                className="group flex flex-col overflow-hidden rounded-[6px] border border-white/10 bg-navy-800 transition hover:-translate-y-0.5 hover:border-white/20"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-navy-700">
                  {e.image && <img src={e.image} alt="" className="h-full w-full object-cover" />}
                  <div className="absolute left-[14px] top-[14px] min-w-[56px] rounded-[4px] bg-crimson-500 px-3 py-2 text-center text-white">
                    <div className="text-[22px] font-bold leading-none tracking-[-0.02em]">
                      {String(d.getDate()).padStart(2, '0')}
                    </div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
                      {d.toLocaleDateString(locale, { month: 'short' })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-[22px] pt-5 pb-6">
                  <h4 className="mb-3 text-[17px] font-semibold leading-[1.3] text-white">
                    {e.title}
                  </h4>
                  <div className="mb-4 flex flex-1 flex-col gap-2 text-[12.5px] text-white/70">
                    {e.location && <div>{e.location}</div>}
                    <div>
                      {d.toLocaleString(locale, {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </Section>
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = T[locale] || T.en
  return { title: `${t.title} | Cadmous College` }
}
