import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { PageHeader, Section } from '@/components/CadmousUI'
import { getNewsBySlug } from '@/lib/content/news'

type Args = {
  params: Promise<{ locale: string; slug: string }>
}

const BC: Record<string, { more: string; news: string }> = {
  en: { more: 'More', news: 'News' },
  fr: { more: 'Plus', news: 'Actualités' },
  ar: { more: 'المزيد', news: 'الأخبار' },
}

export default async function NewsDetailPage({ params }: Args) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = await getNewsBySlug(locale, slug)
  if (!post) notFound()
  const bc = BC[locale] || BC.en

  const dateFmt = new Date(post.publishedAt).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <PageHeader
        locale={locale}
        title={post.title}
        breadcrumb={[
          { label: bc.more },
          { label: bc.news, href: `/${locale}/news` },
          { label: post.title },
        ]}
        lede={post.summary}
      />
      <Section>
        <article className="mx-auto max-w-3xl">
          <div className="mb-6 text-[12px] tracking-[0.06em] text-white/40">{dateFmt}</div>
          {post.image && (
            <div className="mb-8 overflow-hidden rounded-[6px] border border-white/10">
              <img src={post.image} alt="" className="w-full" />
            </div>
          )}
          {post.body && (
            <div className="whitespace-pre-line text-[17px] leading-[1.75] text-white/70">
              {post.body}
            </div>
          )}
        </article>
      </Section>
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getNewsBySlug(locale, slug)
  return {
    title: post ? `${post.title} | Cadmous College` : 'Not Found',
  }
}
