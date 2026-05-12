import Database from 'better-sqlite3'
import { desc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import path from 'node:path'
import { beforeAll, describe, expect, it } from 'vitest'

import { applications, contactSubmissions } from '../src/db/schema/submissions'

let db: ReturnType<typeof drizzle>
let sqlite: Database.Database

beforeAll(() => {
  const dbPath = process.env.DATABASE_URL!.replace(/^file:/, '')
  sqlite = new Database(dbPath)
  db = drizzle(sqlite)
  migrate(db, {
    migrationsFolder: path.resolve(__dirname, '../drizzle/migrations'),
  })
})

describe('submissions schema', () => {
  it('persists and reads a contact submission', async () => {
    await db.insert(contactSubmissions).values({
      name: 'Jane Visitor',
      email: 'jane@example.com',
      phone: '+961-1-000-000',
      message: 'Question about KG2 admissions.',
      locale: 'en',
      ipHash: 'hash-test',
      userAgent: 'vitest/1.0',
    })

    const rows = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.email, 'jane@example.com'))
    expect(rows).toHaveLength(1)
    expect(rows[0].name).toBe('Jane Visitor')
    expect(rows[0].readAt).toBeNull()
    expect(rows[0].archivedAt).toBeNull()
    expect(rows[0].createdAt).toBeInstanceOf(Date)
  })

  it('persists and reads an application with JSON payload', async () => {
    const payload = {
      studentFirstName: 'Test',
      studentFamilyName: 'Student',
      gradeApplying: 'Grade 7',
      guardian1PersonalEmail: 'parent@example.com',
      guardian1Mobile: '+961-1-111-111',
    }

    const inserted = await db
      .insert(applications)
      .values({
        payload: JSON.stringify(payload),
        studentName: 'Test Student',
        studentGrade: 'Grade 7',
        guardianEmail: payload.guardian1PersonalEmail,
        guardianPhone: payload.guardian1Mobile,
        applicantLocale: 'en',
        appLang: 'fr',
      })
      .returning({ id: applications.id })

    const found = await db
      .select()
      .from(applications)
      .where(eq(applications.id, inserted[0].id))
      .orderBy(desc(applications.createdAt))

    expect(found).toHaveLength(1)
    expect(found[0].studentName).toBe('Test Student')
    expect(found[0].appLang).toBe('fr')
    expect(JSON.parse(found[0].payload)).toMatchObject({
      studentFirstName: 'Test',
      studentFamilyName: 'Student',
    })
  })
})
