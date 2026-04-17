import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getPayloadLocale } from '@/i18n/payload-locale'
import { formatDateTime } from '@/utilities/formatDateTime'
import type { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'

type Args = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const payloadLocale = getPayloadLocale(locale)

  const payload = await getPayload({ config: configPromise })

  // Fetch latest news and events
  const [newsResult, eventsResult] = await Promise.all([
    payload.find({
      collection: 'posts',
      locale: payloadLocale as any,
      limit: 3,
      sort: '-publishedAt',
      where: { _status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'events',
      locale: payloadLocale as any,
      limit: 3,
      sort: '-startDate',
      where: { _status: { equals: 'published' } },
    }),
  ])

  const t: Record<string, Record<string, string>> = {
    ar: {
      heroTitle: 'مدرسة قدموس',
      heroSub: 'مدرسة البكالوريا الدولية',
      heroDesc: 'نرحب بكم في مدرسة قدموس، حيث نلتزم بتقديم تعليم عالمي المستوى يعدّ طلابنا لمستقبل مشرق.',
      applyNow: 'قدّم الآن',
      learnMore: 'اعرف المزيد',
      latestNews: 'آخر الأخبار',
      upcomingEvents: 'الفعاليات القادمة',
      viewAll: 'عرض الكل',
      readMore: 'اقرأ المزيد',
      yearsLabel: 'سنوات من التميز',
      studentsLabel: 'طالب وطالبة',
      programsLabel: 'برنامج أكاديمي',
      staffLabel: 'عضو في الهيئة التعليمية',
    },
    en: {
      heroTitle: 'Cadmous College',
      heroSub: 'IB World School',
      heroDesc: 'Welcome to Cadmous College, where we are committed to providing world-class education that prepares students for a bright future.',
      applyNow: 'Apply Now',
      learnMore: 'Learn More',
      latestNews: 'Latest News',
      upcomingEvents: 'Upcoming Events',
      viewAll: 'View All',
      readMore: 'Read More',
      yearsLabel: 'Years of Excellence',
      studentsLabel: 'Students',
      programsLabel: 'Academic Programs',
      staffLabel: 'Faculty Members',
    },
    fr: {
      heroTitle: 'Collège Cadmous',
      heroSub: "École du monde de l'IB",
      heroDesc: 'Bienvenue au Collège Cadmous, où nous nous engageons à offrir une éducation de classe mondiale.',
      applyNow: 'Postuler',
      learnMore: 'En savoir plus',
      latestNews: 'Dernières actualités',
      upcomingEvents: 'Événements à venir',
      viewAll: 'Voir tout',
      readMore: 'Lire la suite',
      yearsLabel: "Années d'excellence",
      studentsLabel: 'Élèves',
      programsLabel: 'Programmes académiques',
      staffLabel: 'Membres du corps enseignant',
    },
  }

  const l = t[locale] || t.en

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy-900 py-24 text-white lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 to-navy-900/90" />
        <div className="container relative mx-auto px-4 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            {l.heroSub}
          </p>
          <h1 className="mb-6 text-5xl font-bold lg:text-6xl">{l.heroTitle}</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-navy-200">
            {l.heroDesc}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href={`/${locale}/admissions`}
              className="rounded-md bg-gold-500 px-8 py-3 font-semibold text-navy-900 transition-colors hover:bg-gold-400"
            >
              {l.applyNow}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="rounded-md border-2 border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              {l.learnMore}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-gray-100 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: '45+', label: l.yearsLabel },
              { value: '1200+', label: l.studentsLabel },
              { value: '6', label: l.programsLabel },
              { value: '120+', label: l.staffLabel },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-navy-800 lg:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm font-medium uppercase tracking-wide text-gray-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-navy-800">{l.latestNews}</h2>
            <Link
              href={`/${locale}/news`}
              className="text-sm font-medium text-navy-600 hover:text-navy-800"
            >
              {l.viewAll} →
            </Link>
          </div>

          {newsResult.docs.length === 0 ? (
            <p className="text-gray-500">
              {locale === 'ar' ? 'لا توجد أخبار حالياً' : 'No news yet'}
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {newsResult.docs.map((post) => (
                <Link
                  key={post.id}
                  href={`/${locale}/news/${post.slug}`}
                  className="group rounded-lg border border-gray-200 p-5 transition-shadow hover:shadow-md"
                >
                  <h3 className="mb-2 text-lg font-semibold text-navy-800 group-hover:text-navy-600">
                    {post.title}
                  </h3>
                  {post.publishedAt && (
                    <time className="text-sm text-gray-400">
                      {formatDateTime(post.publishedAt)}
                    </time>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-navy-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-navy-800">{l.upcomingEvents}</h2>
            <Link
              href={`/${locale}/events`}
              className="text-sm font-medium text-navy-600 hover:text-navy-800"
            >
              {l.viewAll} →
            </Link>
          </div>

          {eventsResult.docs.length === 0 ? (
            <p className="text-gray-500">
              {locale === 'ar' ? 'لا توجد فعاليات حالياً' : 'No events yet'}
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {eventsResult.docs.map((event) => (
                <Link
                  key={event.id}
                  href={`/${locale}/events/${event.slug}`}
                  className="group rounded-lg bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-800 text-white">
                      <span className="text-lg font-bold">
                        {new Date(event.startDate).getDate()}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-medium uppercase text-gray-500">
                        {new Date(event.startDate).toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-navy-800 group-hover:text-navy-600">
                    {event.title}
                  </h3>
                  {event.location && (
                    <p className="mt-1 text-sm text-gray-500">📍 {event.location}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            {locale === 'ar'
              ? 'انضم إلى عائلة قدموس'
              : locale === 'fr'
                ? 'Rejoignez la famille Cadmous'
                : 'Join the Cadmous Family'}
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-navy-200">
            {locale === 'ar'
              ? 'نرحب بطلباتكم للانضمام إلى مجتمعنا التعليمي المتميز.'
              : locale === 'fr'
                ? "Nous accueillons vos candidatures pour rejoindre notre communauté éducative d'excellence."
                : 'We welcome your applications to join our distinguished educational community.'}
          </p>
          <Link
            href={`/${locale}/admissions`}
            className="inline-block rounded-md bg-gold-500 px-8 py-3 font-semibold text-navy-900 transition-colors hover:bg-gold-400"
          >
            {l.applyNow}
          </Link>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    ar: 'مدرسة قدموس | مدرسة البكالوريا الدولية',
    en: 'Cadmous College | IB World School',
    fr: "Collège Cadmous | École du monde de l'IB",
  }
  return {
    title: titles[locale] || titles.en,
    description: locale === 'ar'
      ? 'مدرسة قدموس - مدرسة البكالوريا الدولية في لبنان'
      : 'Cadmous College - IB World School in Lebanon',
  }
}
