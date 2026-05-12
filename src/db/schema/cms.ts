import { sql } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const updatedAt = () =>
  integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => new Date())
    .notNull()

// Single key/value table — localized keys carry a locale, shared keys use ''.
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
