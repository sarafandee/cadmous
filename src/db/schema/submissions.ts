import { sql } from 'drizzle-orm'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const id = () =>
  text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())

const createdAt = () =>
  integer('created_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull()

export const contactSubmissions = sqliteTable(
  'contact_submissions',
  {
    id: id(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    message: text('message').notNull(),
    locale: text('locale').notNull().default('en'),
    ipHash: text('ip_hash'),
    userAgent: text('user_agent'),
    createdAt: createdAt(),
    readAt: integer('read_at', { mode: 'timestamp_ms' }),
    archivedAt: integer('archived_at', { mode: 'timestamp_ms' }),
  },
  (t) => [
    index('contact_created_idx').on(t.createdAt),
    index('contact_read_idx').on(t.readAt),
    index('contact_archived_idx').on(t.archivedAt),
  ],
)

export const applications = sqliteTable(
  'applications',
  {
    id: id(),
    payload: text('payload').notNull(),
    studentName: text('student_name').notNull(),
    studentGrade: text('student_grade').notNull(),
    guardianEmail: text('guardian_email'),
    guardianPhone: text('guardian_phone'),
    applicantLocale: text('applicant_locale').notNull().default('en'),
    appLang: text('app_lang').notNull().default('en'),
    ipHash: text('ip_hash'),
    userAgent: text('user_agent'),
    createdAt: createdAt(),
    readAt: integer('read_at', { mode: 'timestamp_ms' }),
    archivedAt: integer('archived_at', { mode: 'timestamp_ms' }),
  },
  (t) => [
    index('applications_created_idx').on(t.createdAt),
    index('applications_read_idx').on(t.readAt),
    index('applications_archived_idx').on(t.archivedAt),
  ],
)
