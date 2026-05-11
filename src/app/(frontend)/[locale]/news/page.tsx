export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { PageHeader, Section, SectionHead } from '@/components/CadmousUI'
import { getAllNews } from '@/data/news'

type Args = { params: Promise<{ locale: string }> }

const T: Record<string, {
  title: string
  bcMore: string
  bcThis: string
  featured: string
  moreEyebrow: string
  moreTitle: string
}> = {
  en: {
    title: 'News',
    bcMore: 'More',
    bcThis: 'News',
    featured: 'Featured',
    moreEyebrow: 'More news',
    moreTitle: 'From across the school.',
  },
  fr: {
    title: 'Actualités',
    bcMore: 'Plus',
    bcThis: 'Actualités',
    featured: 'À la une',
    moreEyebrow: 'Plus d’actualités',
    moreTitle: "Toute l'école.",
  },
  ar: {
    title: 'الأخبار',
    bcMore: 'المزيد',
    bcThis: 'الأخبار',
    featured: 'منشور بارز',
    moreEyebrow: 'مزيد من الأخبار',
    moreTitle: 'من كل أقسام المدرسة.',
  },
}

export default async function NewsPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en
  const posts = getAllNews(locale)

  const featured = posts[0]
  const rest = posts.slice(1)

  const dateFmt = (iso: string) =>
    new Date(iso).toLocaleDateString(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })

  return (
    <>
      <PageHeader
        locale={locale}
        title={t.title}
        breadcrumb={[{ label: t.bcMore }, { label: t.bcThis }]}
      />
      {featured && (
        <Section>
          <Link
            href={`/${locale}/news/${featured.slug}`}
            className="grid items-stretch overflow-hidden rounded-[6px] border border-white/10 bg-navy-800 transition hover:border-white/20 lg:grid-cols-[1.4fr_1fr]"
          >
            <div className="aspect-[16/10] overflow-hidden bg-navy-700">
              {featured.image && (
                <img src={featured.image} alt="" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="flex flex-col justify-center p-9">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson-400">
                {t.featured}
              </div>
              <h2 className="mb-3 text-[clamp(24px,2.6vw,32px)] font-bold leading-[1.2] tracking-[-0.02em] text-white">
                {featured.title}
              </h2>
              <div className="mb-3 text-[12px] tracking-[0.06em] text-white/40">
                {dateFmt(featured.publishedAt)}
              </div>
              <p className="m-0 text-white/70">{featured.summary}</p>
            </div>
          </Link>
        </Section>
      )}
      <Section alt>
        <SectionHead eyebrow={t.moreEyebrow} title={t.moreTitle} />
        <div className="flex flex-col gap-px overflow-hidden rounded-[6px] border border-white/10 bg-white/10">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/news/${p.slug}`}
              className="grid grid-cols-[1fr_auto] items-center gap-4 bg-navy-900 px-6 py-6 transition hover:bg-navy-800"
            >
              <div>
                <div className="text-[16px] font-semibold leading-[1.35] text-white">
                  {p.title}
                </div>
                <div className="mt-1.5 text-[13.5px] text-white/70">{p.summary}</div>
              </div>
              <div className="whitespace-nowrap text-[12px] tracking-[0.04em] text-white/40">
                {dateFmt(p.publishedAt)}
              </div>
            </Link>
          ))}
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
