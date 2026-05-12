import { z } from 'zod'

/**
 * Versioned block content used by /admin/pages. Storage is JSON in
 * page_translations.blocks. Treat `text(...).$type<Block[]>()` on the column
 * as a TS cast — always parse with `blockArraySchema` at the repository
 * boundary.
 *
 * When you change the shape, bump CURRENT_BLOCK_SCHEMA_VERSION and add a
 * migrator in `migrate.ts` next to this file. Don't migrate in SQL.
 */

export const CURRENT_BLOCK_SCHEMA_VERSION = 1

const headingBlock = z.object({
  type: z.literal('heading'),
  level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  text: z.string().max(300),
})

const paragraphBlock = z.object({
  type: z.literal('paragraph'),
  markdown: z.string().max(5000),
})

const listBlock = z.object({
  type: z.literal('list'),
  ordered: z.boolean(),
  items: z.array(z.string().max(300)).max(40),
})

const quoteBlock = z.object({
  type: z.literal('quote'),
  markdown: z.string().max(2000),
  attribution: z.string().max(200).optional(),
})

const statBlock = z.object({
  type: z.literal('stat'),
  value: z.string().max(40),
  label: z.string().max(80),
})

const statGridBlock = z.object({
  type: z.literal('stat-grid'),
  items: z
    .array(z.object({ value: z.string().max(40), label: z.string().max(80) }))
    .min(1)
    .max(8),
})

const infoGridBlock = z.object({
  type: z.literal('info-grid'),
  cols: z.union([z.literal(2), z.literal(3)]).optional(),
  items: z
    .array(
      z.object({
        title: z.string().max(200),
        body: z.string().max(1000),
        eyebrow: z.string().max(80).optional(),
      }),
    )
    .min(1)
    .max(12),
})

const imageBlock = z.object({
  type: z.literal('image'),
  src: z.string().max(2000),
  alt: z.string().max(280).optional(),
  caption: z.string().max(300).optional(),
})

const ctaBlock = z.object({
  type: z.literal('cta'),
  title: z.string().max(200),
  body: z.string().max(500).optional(),
  primaryLabel: z.string().max(40).optional(),
  primaryHref: z.string().max(500).optional(),
  secondaryLabel: z.string().max(40).optional(),
  secondaryHref: z.string().max(500).optional(),
})

export const blockSchema = z.discriminatedUnion('type', [
  headingBlock,
  paragraphBlock,
  listBlock,
  quoteBlock,
  statBlock,
  statGridBlock,
  infoGridBlock,
  imageBlock,
  ctaBlock,
])

export type Block = z.infer<typeof blockSchema>
export type BlockType = Block['type']

export const blockArraySchema = z.array(blockSchema).max(200)

export function parseBlocksOrEmpty(json: string | null | undefined): Block[] {
  if (!json) return []
  try {
    const parsed = blockArraySchema.safeParse(JSON.parse(json))
    return parsed.success ? parsed.data : []
  } catch {
    return []
  }
}

export const BLOCK_TYPES: BlockType[] = [
  'heading',
  'paragraph',
  'list',
  'quote',
  'stat',
  'stat-grid',
  'info-grid',
  'image',
  'cta',
]

export function emptyBlock(type: BlockType): Block {
  switch (type) {
    case 'heading':
      return { type, level: 2, text: '' }
    case 'paragraph':
      return { type, markdown: '' }
    case 'list':
      return { type, ordered: false, items: [''] }
    case 'quote':
      return { type, markdown: '' }
    case 'stat':
      return { type, value: '', label: '' }
    case 'stat-grid':
      return { type, items: [{ value: '', label: '' }] }
    case 'info-grid':
      return { type, items: [{ title: '', body: '' }] }
    case 'image':
      return { type, src: '' }
    case 'cta':
      return { type, title: '' }
  }
}
