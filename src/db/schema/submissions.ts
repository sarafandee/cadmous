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

export const applicationDocuments = sqliteTable(
  'application_documents',
  {
    id: id(),
    // Draft id is the UUID the wizard generates on mount; uploads
    // happen before the application row exists, so they're keyed by
    // draftId. submitApplication links rows to the new application_id.
    draftId: text('draft_id').notNull(),
    applicationId: text('application_id').references(() => applications.id, {
      onDelete: 'cascade',
    }),
    kind: text('kind').notNull(),
    originalName: text('original_name').notNull(),
    storedPath: text('stored_path').notNull(),
    mime: text('mime').notNull(),
    size: integer('size').notNull(),
    ipHash: text('ip_hash'),
    createdAt: createdAt(),
  },
  (t) => [
    index('app_docs_draft_idx').on(t.draftId),
    index('app_docs_application_idx').on(t.applicationId),
  ],
)
