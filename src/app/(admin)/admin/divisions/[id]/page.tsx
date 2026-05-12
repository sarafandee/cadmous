import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { z } from 'zod'

import { db } from '@/db/client'
import { divisions } from '@/db/schema/cms'
import { LOCALES } from '@/db/schema/content'
import { requireAdmin } from '@/lib/admin/require-admin'

import { DivisionForm } from '../_components/DivisionForm'
import type { DivisionFormValues } from '../schema'

const itemsSchema = z.array(z.object({ title: z.string(), body: z.string() }))

export const metadata = { title: 'Edit division' }

type Args = { params: Promise<{ id: string }> }

export default async function EditDivisionPage({ params }: Args) {
  const { id } = await params
  await requireAdmin()

  const division = await db.query.divisions.findFirst({
    where: eq(divisions.id, id),
    with: { translations: true },
  })
  if (!division) notFound()

  const map = Object.fromEntries(division.translations.map((t) => [t.locale, t]))
  const empty = { title: '', lede: '', items: [], machineTranslated: false }

  const initial: DivisionFormValues = {
    slug: division.slug,
    position: division.position,
    imageUrl: division.imageUrl ?? '',
    imageAlt: division.imageAlt ?? '',
    status: division.status,
    translations: LOCALES.reduce(
      (acc, l) => {
        const t = map[l]
        if (!t) {
          acc[l] = { ...empty }
        } else {
          const parsedItems = itemsSchema.safeParse(JSON.parse(t.items || '[]'))
          acc[l] = {
            title: t.title,
            lede: t.lede,
            items: parsedItems.success ? parsedItems.data : [],
            machineTranslated: t.machineTranslated,
          }
        }
        return acc
      },
      {} as DivisionFormValues['translations'],
    ),
  }

  return (
    <main>
      <p className="text-xs">
        <Link href="/admin/divisions" className="text-zinc-500 hover:underline">
          ← Divisions
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{division.slug}</h1>
      <div className="mt-8">
        <DivisionForm id={division.id} initial={initial} />
      </div>
    </main>
  )
}
