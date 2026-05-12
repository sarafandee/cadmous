import { relations, sql } from 'drizzle-orm'
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'

import { user } from './auth'

export const LOCALES = ['en', 'ar', 'fr'] as const
export type Locale = (typeof LOCALES)[number]
export const STATUSES = ['draft', 'published'] as const
export type Status = (typeof STATUSES)[number]
export const SEVERITIES = ['info', 'warning', 'critical'] as const
export type Severity = (typeof SEVERITIES)[number]

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

// ──────────────── news ────────────────

export const newsPosts = sqliteTable(
  'news_posts',
  {
    id: id(),
    slug: text('slug').notNull(),
    publishedAt: integer('published_at', { mode: 'timestamp_ms' }).notNull(),
    /** @deprecated unused; superseded by imagePath. Kept for back-compat of migration 0001. */
    imageMediaId: text('image_media_id'),
    imagePath: text('image_path'),
    status: text('status', { enum: STATUSES }).notNull().default('draft'),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [uniqueIndex('news_slug_idx').on(t.slug)],
)

export const newsTranslations = sqliteTable(
  'news_translations',
  {
    postId: text('post_id')
      .notNull()
      .references(() => newsPosts.id, { onDelete: 'cascade' }),
    locale: text('locale', { enum: LOCALES }).notNull(),
    title: text('title').notNull(),
    summary: text('summary').notNull().default(''),
    body: text('body').notNull().default(''),
    machineTranslated: integer('machine_translated', { mode: 'boolean' })
      .notNull()
      .default(false),
    updatedAt: updatedAt(),
  },
  (t) => [primaryKey({ columns: [t.postId, t.locale] })],
)

// ──────────────── events ────────────────

export const events = sqliteTable(
  'events',
  {
    id: id(),
    slug: text('slug').notNull(),
    startDate: integer('start_date', { mode: 'timestamp_ms' }).notNull(),
    endDate: integer('end_date', { mode: 'timestamp_ms' }),
    location: text('location'),
    /** @deprecated unused; superseded by imagePath. */
    imageMediaId: text('image_media_id'),
    imagePath: text('image_path'),
    status: text('status', { enum: STATUSES }).notNull().default('draft'),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [uniqueIndex('events_slug_idx').on(t.slug)],
)

export const eventTranslations = sqliteTable(
  'event_translations',
  {
    eventId: text('event_id')
      .notNull()
      .references(() => events.id, { onDelete: 'cascade' }),
    locale: text('locale', { enum: LOCALES }).notNull(),
    title: text('title').notNull(),
    description: text('description').notNull().default(''),
    machineTranslated: integer('machine_translated', { mode: 'boolean' })
      .notNull()
      .default(false),
    updatedAt: updatedAt(),
  },
  (t) => [primaryKey({ columns: [t.eventId, t.locale] })],
)

// ──────────────── announcements ────────────────

export const announcements = sqliteTable('announcements', {
  id: id(),
  severity: text('severity', { enum: SEVERITIES }).notNull().default('info'),
  status: text('status', { enum: STATUSES }).notNull().default('draft'),
  startsAt: integer('starts_at', { mode: 'timestamp_ms' }),
  endsAt: integer('ends_at', { mode: 'timestamp_ms' }),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
})

export const announcementTranslations = sqliteTable(
  'announcement_translations',
  {
    announcementId: text('announcement_id')
      .notNull()
      .references(() => announcements.id, { onDelete: 'cascade' }),
    locale: text('locale', { enum: LOCALES }).notNull(),
    title: text('title').notNull(),
    body: text('body').notNull().default(''),
    machineTranslated: integer('machine_translated', { mode: 'boolean' })
      .notNull()
      .default(false),
    updatedAt: updatedAt(),
  },
  (t) => [primaryKey({ columns: [t.announcementId, t.locale] })],
)

// ──────────────── media ────────────────

export const media = sqliteTable(
  'media',
  {
    id: id(),
    path: text('path').notNull(),
    mime: text('mime').notNull(),
    size: integer('size').notNull(),
    width: integer('width'),
    height: integer('height'),
    uploadedBy: text('uploaded_by').references(() => user.id, {
      onDelete: 'set null',
    }),
    altEn: text('alt_en').notNull().default(''),
    altAr: text('alt_ar').notNull().default(''),
    altFr: text('alt_fr').notNull().default(''),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex('media_path_idx').on(t.path)],
)

// ──────────────── audit log ────────────────

export const auditLog = sqliteTable(
  'audit_log',
  {
    id: id(),
    userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
    action: text('action', { enum: ['create', 'update', 'delete', 'publish', 'unpublish'] as const }).notNull(),
    entityType: text('entity_type').notNull(),
    entityId: text('entity_id').notNull(),
    diff: text('diff'),
    createdAt: createdAt(),
  },
  (t) => [index('audit_log_entity_idx').on(t.entityType, t.entityId)],
)

// ──────────────── relations ────────────────

export const newsRelations = relations(newsPosts, ({ many }) => ({
  translations: many(newsTranslations),
}))

export const newsTranslationsRelations = relations(newsTranslations, ({ one }) => ({
  post: one(newsPosts, {
    fields: [newsTranslations.postId],
    references: [newsPosts.id],
  }),
}))

export const eventsRelations = relations(events, ({ many }) => ({
  translations: many(eventTranslations),
}))

export const eventTranslationsRelations = relations(eventTranslations, ({ one }) => ({
  event: one(events, {
    fields: [eventTranslations.eventId],
    references: [events.id],
  }),
}))

export const announcementsRelations = relations(announcements, ({ many }) => ({
  translations: many(announcementTranslations),
}))

export const announcementTranslationsRelations = relations(
  announcementTranslations,
  ({ one }) => ({
    announcement: one(announcements, {
      fields: [announcementTranslations.announcementId],
      references: [announcements.id],
    }),
  }),
)
