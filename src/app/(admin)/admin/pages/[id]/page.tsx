import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { db } from '@/db/client'
import { pages } from '@/db/schema/cms'
import { LOCALES } from '@/db/schema/content'
import { requireAdmin } from '@/lib/admin/require-admin'
import { parseBlocksOrEmpty } from '@/lib/blocks/schema'

import { PageForm } from '../_components/PageForm'
import type { PageFormValues } from '../schema'

export const metadata = { title: 'Edit page' }

type Args = { params: Promise<{ id: string }> }

export default async function EditPagePage({ params }: Args) {
  const { id } = await params
  await requireAdmin()

  const page = await db.query.pages.findFirst({
    where: eq(pages.id, id),
    with: { translations: true },
  })
  if (!page) notFound()

  const map = Object.fromEntries(page.translations.map((t) => [t.locale, t]))
  const empty = { title: '', lede: '', blocks: [], machineTranslated: false }

  const initial: PageFormValues = {
    slug: page.slug,
    imageUrl: page.imageUrl ?? '',
    status: page.status,
    translations: LOCALES.reduce(
      (acc, l) => {
        const t = map[l]
        acc[l] = t
          ? {
              title: t.title,
              lede: t.lede,
              blocks: parseBlocksOrEmpty(t.blocks),
              machineTranslated: t.machineTranslated,
            }
          : { ...empty }
        return acc
      },
      {} as PageFormValues['translations'],
    ),
  }

  return (
    <main>
      <p className="text-xs">
        <Link href="/admin/pages" className="text-zinc-500 hover:underline">
          ← Pages
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Edit page</h1>
      <p className="mt-1 text-sm text-zinc-500 font-mono">{page.slug}</p>
      <div className="mt-8">
        <PageForm mode="edit" id={page.id} initial={initial} />
      </div>
    </main>
  )
}
