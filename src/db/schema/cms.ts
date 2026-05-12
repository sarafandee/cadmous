import { relations, sql } from 'drizzle-orm'
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'

import { LOCALES, STATUSES } from './content'

const id = () =>
  text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())

const createdAt = () =>
  integer('created_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull()

const updatedAt = () =>
  integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => new Date())
    .notNull()

// ──────────────── divisions (typed shape) ────────────────

export const divisions = sqliteTable(
  'divisions',
  {
    id: id(),
    slug: text('slug').notNull(),
    position: integer('position').notNull().default(0),
    imageUrl: text('image_url'),
    imageAlt: text('image_alt'),
    status: text('status', { enum: STATUSES }).notNull().default('published'),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [uniqueIndex('divisions_slug_idx').on(t.slug)],
)

export const divisionTranslations = sqliteTable(
  'division_translations',
  {
    divisionId: text('division_id')
      .notNull()
      .references(() => divisions.id, { onDelete: 'cascade' }),
    locale: text('locale', { enum: LOCALES }).notNull(),
    title: text('title').notNull(),
    lede: text('lede').notNull().default(''),
    /** JSON: { title: string, body: string }[] */
    items: text('items').notNull().default('[]'),
    machineTranslated: integer('machine_translated', { mode: 'boolean' })
      .notNull()
      .default(false),
    updatedAt: updatedAt(),
  },
  (t) => [primaryKey({ columns: [t.divisionId, t.locale] })],
)

// ──────────────── pages (block-based) ────────────────

export const pages = sqliteTable(
  'pages',
  {
    id: id(),
    slug: text('slug').notNull(),
    imageUrl: text('image_url'),
    status: text('status', { enum: STATUSES }).notNull().default('published'),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [uniqueIndex('pages_slug_idx').on(t.slug)],
)

export const pageTranslations = sqliteTable(
  'page_translations',
  {
    pageId: text('page_id')
      .notNull()
      .references(() => pages.id, { onDelete: 'cascade' }),
    locale: text('locale', { enum: LOCALES }).notNull(),
    title: text('title').notNull(),
    lede: text('lede').notNull().default(''),
    /** JSON: Block[] (see src/lib/blocks/schema.ts) */
    blocks: text('blocks').notNull().default('[]'),
    schemaVersion: integer('schema_version').notNull().default(1),
    machineTranslated: integer('machine_translated', { mode: 'boolean' })
      .notNull()
      .default(false),
    updatedAt: updatedAt(),
  },
  (t) => [primaryKey({ columns: [t.pageId, t.locale] })],
)

// ──────────────── site settings ────────────────
// Single table for both localized (locale set) and non-localized (locale = '').

export const siteSettings = sqliteTable(
  'site_settings',
  {
    key: text('key').notNull(),
    locale: text('locale').notNull().default(''),
    value: text('value').notNull().default(''),
    updatedAt: updatedAt(),
  },
  (t) => [primaryKey({ columns: [t.key, t.locale] })],
)

// ──────────────── relations ────────────────

export const divisionsRelations = relations(divisions, ({ many }) => ({
  translations: many(divisionTranslations),
}))

export const divisionTranslationsRelations = relations(
  divisionTranslations,
  ({ one }) => ({
    division: one(divisions, {
      fields: [divisionTranslations.divisionId],
      references: [divisions.id],
    }),
  }),
)

export const pagesRelations = relations(pages, ({ many }) => ({
  translations: many(pageTranslations),
}))

export const pageTranslationsRelations = relations(pageTranslations, ({ one }) => ({
  page: one(pages, {
    fields: [pageTranslations.pageId],
    references: [pages.id],
  }),
}))
