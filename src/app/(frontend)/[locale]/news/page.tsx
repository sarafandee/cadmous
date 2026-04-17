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

export default async function NewsPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const payload = await getPayload({ config: configPromise })
  const payloadLocale = getPayloadLocale(locale)

  const posts = await payload.find({
    collection: 'posts',
    locale: payloadLocale as any,
    limit: 20,
    sort: '-publishedAt',
    where: {
      _status: { equals: 'published' },
    },
  })

  const titles: Record<string, string> = {
    ar: 'الأخبار',
    en: 'News',
    fr: 'Actualités',
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">{titles[locale] || titles.en}</h1>

      {posts.docs.length === 0 ? (
        <p className="text-gray-500">
          {locale === 'ar' ? 'لا توجد أخبار حالياً' : locale === 'fr' ? 'Aucune actualité pour le moment' : 'No news articles yet'}
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.docs.map((post) => (
            <Link
              key={post.id}
              href={`/${locale}/news/${post.slug}`}
              className="group overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-lg"
            >
              {post.heroImage && typeof post.heroImage === 'object' && (
                <div className="aspect-video overflow-hidden">
                  <Media resource={post.heroImage} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </div>
              )}
              <div className="p-5">
                <h2 className="mb-2 text-xl font-semibold group-hover:text-blue-900">
                  {post.title}
                </h2>
                {post.publishedAt && (
                  <time className="text-sm text-gray-500">
                    {formatDateTime(post.publishedAt)}
                  </time>
                )}
              </div>
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
    ar: 'الأخبار | مدرسة قدموس',
    en: 'News | Cadmous College',
    fr: 'Actualités | Collège Cadmous',
  }
  return { title: titles[locale] || titles.en }
}
