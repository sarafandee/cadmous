import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { db } from '@/db/client'
import { LOCALES, newsPosts } from '@/db/schema/content'
import { requireAdmin } from '@/lib/admin/require-admin'

import { NewsForm } from '../_components/NewsForm'
import type { NewsFormValues } from '../schema'

export const metadata = { title: 'Edit post' }

type Args = { params: Promise<{ id: string }> }

export default async function EditNewsPage({ params }: Args) {
  const { id } = await params
  await requireAdmin()

  const post = await db.query.newsPosts.findFirst({
    where: eq(newsPosts.id, id),
    with: { translations: true },
  })
  if (!post) notFound()

  const translationsMap = Object.fromEntries(
    post.translations.map((t) => [t.locale, t]),
  )
  const empty = { title: '', summary: '', body: '', machineTranslated: false }
  const initial: NewsFormValues = {
    slug: post.slug,
    publishedAt: post.publishedAt.toISOString().slice(0, 16),
    status: post.status,
    imagePath: '',
    translations: LOCALES.reduce(
      (acc, l) => {
        const t = translationsMap[l]
        acc[l] = t
          ? {
              title: t.title,
              summary: t.summary,
              body: t.body,
              machineTranslated: t.machineTranslated,
            }
          : { ...empty }
        return acc
      },
      {} as NewsFormValues['translations'],
    ),
  }

  return (
    <main>
      <p className="text-xs">
        <Link href="/admin/news" className="text-zinc-500 hover:underline">
          ← News
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Edit post</h1>
      <p className="mt-1 text-sm text-zinc-500 font-mono">{post.slug}</p>
      <div className="mt-8">
        <NewsForm mode="edit" id={post.id} initial={initial} />
      </div>
    </main>
  )
}
