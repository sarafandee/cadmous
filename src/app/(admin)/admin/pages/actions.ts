'use server'

import { and, eq, ne } from 'drizzle-orm'
import { revalidatePath, updateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/db/client'
import { pageTranslations, pages } from '@/db/schema/cms'
import { LOCALES } from '@/db/schema/content'
import type { Locale } from '@/db/schema/content'
import { writeAudit } from '@/lib/admin/audit'
import { requireAdmin } from '@/lib/admin/require-admin'
import type { Block } from '@/lib/blocks/schema'
import { CURRENT_BLOCK_SCHEMA_VERSION, blockArraySchema } from '@/lib/blocks/schema'
import { PAGES_CACHE_TAG } from '@/lib/content/pages'
import { translateField } from '@/lib/translate'

import { pageFormSchema, type PageFormValues } from './schema'

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> }

function revalidateAll(slug: string) {
  updateTag(PAGES_CACHE_TAG)
  revalidatePath(`/${slug}`)
  for (const l of LOCALES) {
    if (l === 'en') continue
    revalidatePath(`/${l}/${slug}`)
  }
}

async function ensureSlugUnique(slug: string, excludeId?: string) {
  const existing = await db
    .select({ id: pages.id })
    .from(pages)
    .where(
      excludeId
        ? and(eq(pages.slug, slug), ne(pages.id, excludeId))
        : eq(pages.slug, slug),
    )
    .limit(1)
  return existing.length === 0
}

export async function createPageAction(values: PageFormValues): Promise<ActionResult> {
  const session = await requireAdmin()
  const parsed = pageFormSchema.safeParse(values)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Validation failed',
      fieldErrors: Object.fromEntries(parsed.error.issues.map((i) => [i.path.join('.'), i.message])),
    }
  }
  const v = parsed.data

  if (!(await ensureSlugUnique(v.slug))) {
    return {
      ok: false,
      error: 'Slug already taken',
      fieldErrors: { slug: 'Slug already taken' },
    }
  }

  const inserted = await db
    .insert(pages)
    .values({
      slug: v.slug,
      imageUrl: v.imageUrl || null,
      status: v.status,
    })
    .returning({ id: pages.id })

  const id = inserted[0].id

  await db.insert(pageTranslations).values(
    LOCALES.map((l) => ({
      pageId: id,
      locale: l,
      title: v.translations[l].title,
      lede: v.translations[l].lede,
      blocks: JSON.stringify(v.translations[l].blocks),
      schemaVersion: CURRENT_BLOCK_SCHEMA_VERSION,
      machineTranslated: v.translations[l].machineTranslated,
    })),
  )

  await writeAudit({
    userId: session.user.id,
    action: 'create',
    entityType: 'page',
    entityId: id,
    diff: { slug: v.slug, status: v.status },
  })

  revalidateAll(v.slug)
  redirect(`/admin/pages/${id}`)
}

export async function updatePageAction(
  id: string,
  values: PageFormValues,
): Promise<ActionResult> {
  const session = await requireAdmin()
  const parsed = pageFormSchema.safeParse(values)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Validation failed',
      fieldErrors: Object.fromEntries(parsed.error.issues.map((i) => [i.path.join('.'), i.message])),
    }
  }
  const v = parsed.data

  const current = await db.query.pages.findFirst({ where: eq(pages.id, id) })
  if (!current) return { ok: false, error: 'Not found' }

  if (v.slug !== current.slug && !(await ensureSlugUnique(v.slug, id))) {
    return {
      ok: false,
      error: 'Slug already taken',
      fieldErrors: { slug: 'Slug already taken' },
    }
  }

  await db
    .update(pages)
    .set({ slug: v.slug, imageUrl: v.imageUrl || null, status: v.status })
    .where(eq(pages.id, id))

  for (const l of LOCALES) {
    const t = v.translations[l]
    await db
      .insert(pageTranslations)
      .values({
        pageId: id,
        locale: l,
        title: t.title,
        lede: t.lede,
        blocks: JSON.stringify(t.blocks),
        schemaVersion: CURRENT_BLOCK_SCHEMA_VERSION,
        machineTranslated: t.machineTranslated,
      })
      .onConflictDoUpdate({
        target: [pageTranslations.pageId, pageTranslations.locale],
        set: {
          title: t.title,
          lede: t.lede,
          blocks: JSON.stringify(t.blocks),
          schemaVersion: CURRENT_BLOCK_SCHEMA_VERSION,
          machineTranslated: t.machineTranslated,
        },
      })
  }

  await writeAudit({
    userId: session.user.id,
    action: current.status === v.status ? 'update' : v.status === 'published' ? 'publish' : 'unpublish',
    entityType: 'page',
    entityId: id,
    diff: { slug: v.slug, status: v.status, previousStatus: current.status },
  })

  revalidateAll(v.slug)
  if (current.slug !== v.slug) revalidateAll(current.slug)
  return { ok: true }
}

export async function deletePageAction(id: string): Promise<ActionResult> {
  const session = await requireAdmin()
  const current = await db.query.pages.findFirst({ where: eq(pages.id, id) })
  if (!current) return { ok: false, error: 'Not found' }
  await db.delete(pages).where(eq(pages.id, id))
  await writeAudit({
    userId: session.user.id,
    action: 'delete',
    entityType: 'page',
    entityId: id,
    diff: { slug: current.slug },
  })
  revalidateAll(current.slug)
  redirect('/admin/pages')
}

/**
 * Translate a page's content (title + lede + every block's user-facing text)
 * from one locale to another. Returns the projected block array. Keeps block
 * structure intact; only translates strings.
 */
export async function translatePageAction(input: {
  from: Locale
  to: Locale
  title: string
  lede: string
  blocks: Block[]
}): Promise<
  | { ok: true; title: string; lede: string; blocks: Block[] }
  | { ok: false; error: string }
> {
  await requireAdmin()
  try {
    const parsedBlocks = blockArraySchema.safeParse(input.blocks)
    if (!parsedBlocks.success) {
      return { ok: false, error: 'Invalid blocks' }
    }
    const blocks = parsedBlocks.data

    const [title, lede, translatedBlocks] = await Promise.all([
      translateField({ text: input.title, from: input.from, to: input.to, context: 'Page title' }),
      translateField({ text: input.lede, from: input.from, to: input.to, context: 'Page lede (intro)' }),
      Promise.all(blocks.map((b) => translateBlock(b, input.from, input.to))),
    ])

    return { ok: true, title, lede, blocks: translatedBlocks }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Translation failed' }
  }
}

async function translateBlock(block: Block, from: Locale, to: Locale): Promise<Block> {
  switch (block.type) {
    case 'heading':
      return { ...block, text: await translateField({ text: block.text, from, to, context: 'Section heading' }) }
    case 'paragraph':
      return { ...block, markdown: await translateField({ text: block.markdown, from, to, context: 'Body paragraph' }) }
    case 'list': {
      const items = await Promise.all(
        block.items.map((i) => translateField({ text: i, from, to, context: 'List item' })),
      )
      return { ...block, items }
    }
    case 'quote':
      return {
        ...block,
        markdown: await translateField({ text: block.markdown, from, to, context: 'Pull quote' }),
        attribution: block.attribution,
      }
    case 'stat':
      return {
        ...block,
        label: await translateField({ text: block.label, from, to, context: 'Stat label' }),
      }
    case 'stat-grid': {
      const items = await Promise.all(
        block.items.map(async (i) => ({
          value: i.value,
          label: await translateField({ text: i.label, from, to, context: 'Stat label' }),
        })),
      )
      return { ...block, items }
    }
    case 'info-grid': {
      const items = await Promise.all(
        block.items.map(async (i) => ({
          title: await translateField({ text: i.title, from, to, context: 'Card title' }),
          body: await translateField({ text: i.body, from, to, context: 'Card body' }),
          eyebrow: i.eyebrow,
        })),
      )
      return { ...block, items }
    }
    case 'image':
      return {
        ...block,
        alt: block.alt
          ? await translateField({ text: block.alt, from, to, context: 'Image alt text' })
          : undefined,
        caption: block.caption
          ? await translateField({ text: block.caption, from, to, context: 'Image caption' })
          : undefined,
      }
    case 'cta':
      return {
        ...block,
        title: await translateField({ text: block.title, from, to, context: 'Call-to-action title' }),
        body: block.body
          ? await translateField({ text: block.body, from, to, context: 'Call-to-action body' })
          : undefined,
        primaryLabel: block.primaryLabel
          ? await translateField({ text: block.primaryLabel, from, to, context: 'Button label' })
          : undefined,
        secondaryLabel: block.secondaryLabel
          ? await translateField({ text: block.secondaryLabel, from, to, context: 'Button label' })
          : undefined,
      }
  }
}
