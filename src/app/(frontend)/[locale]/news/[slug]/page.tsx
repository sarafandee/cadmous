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

export default async function NewsDetailPage({ params }: Args) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = await queryPostBySlug({ slug, locale: getPayloadLocale(locale) })

  if (!post) notFound()

  return (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      {post.heroImage && typeof post.heroImage === 'object' && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <Media resource={post.heroImage} />
        </div>
      )}

      <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>

      {post.publishedAt && (
        <time className="mb-8 block text-gray-500">
          {formatDateTime(post.publishedAt)}
        </time>
      )}

      {post.content && <RichText data={post.content} />}
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await queryPostBySlug({ slug, locale: getPayloadLocale(locale) })
  return {
    title: post ? `${post.title} | Cadmous College` : 'Not Found',
  }
}

const queryPostBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    locale: locale as any,
    limit: 1,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})
