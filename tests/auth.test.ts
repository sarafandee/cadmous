import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('better-auth + drizzle integration', () => {
  it('runs migrations and signs in an admin user', async () => {
    // Migrations apply against the per-test temp DB created in setup.ts.
    const dbPath = process.env.DATABASE_URL!.replace(/^file:/, '')
    const sqlite = new Database(dbPath)
    const db = drizzle(sqlite)
    migrate(db, {
      migrationsFolder: path.resolve(__dirname, '../drizzle/migrations'),
    })
    sqlite.close()

    // Importing auth lazily so it reads the test DATABASE_URL set in setup.ts.
    const { auth } = await import('@/lib/auth')

    const created = await auth.api.createUser({
      body: {
        email: 'admin@test.local',
        password: 'correct-horse-battery-staple',
        name: 'Admin',
        role: 'admin',
      },
    })
    expect(created.user.email).toBe('admin@test.local')
    expect(created.user.role).toBe('admin')

    const ok = await auth.api.signInEmail({
      body: {
        email: 'admin@test.local',
        password: 'correct-horse-battery-staple',
      },
    })
    expect(ok.user.email).toBe('admin@test.local')

    await expect(
      auth.api.signInEmail({
        body: {
          email: 'admin@test.local',
          password: 'wrong-password',
        },
      }),
    ).rejects.toThrow()
  })
})
