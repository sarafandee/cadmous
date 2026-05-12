import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { mkdirSync } from 'node:fs'
import path from 'node:path'

const dbUrl = process.env.DATABASE_URL ?? 'file:./data/cadmous.db'
const dbPath = dbUrl.startsWith('file:') ? dbUrl.slice('file:'.length) : dbUrl

if (dbPath !== ':memory:') {
  mkdirSync(path.dirname(dbPath), { recursive: true })
}

const sqlite = new Database(dbPath)
const db = drizzle(sqlite)

const migrationsFolder = path.resolve(process.cwd(), 'drizzle/migrations')

console.log(`Applying migrations from ${migrationsFolder} → ${dbPath}`)
migrate(db, { migrationsFolder })
console.log('Migrations complete.')

sqlite.close()
