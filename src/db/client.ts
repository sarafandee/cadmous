import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { mkdirSync } from 'node:fs'
import path from 'node:path'

import * as schema from './schema'

const DEFAULT_DB_PATH = path.resolve(process.cwd(), 'data/cadmous.db')

function resolveDbPath(): string {
  const url = process.env.DATABASE_URL
  if (!url) return DEFAULT_DB_PATH
  if (url === ':memory:') return ':memory:'
  return url.startsWith('file:') ? url.slice('file:'.length) : url
}

const dbPath = resolveDbPath()

if (dbPath !== ':memory:') {
  mkdirSync(path.dirname(dbPath), { recursive: true })
}

const sqlite = new Database(dbPath)
sqlite.pragma('journal_mode = WAL')
sqlite.pragma('foreign_keys = ON')

export const db = drizzle(sqlite, { schema })
export { sqlite }
