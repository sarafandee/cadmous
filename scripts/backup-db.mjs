#!/usr/bin/env node
/**
 * SQLite backup. Uses the SQLITE_ONLINE_BACKUP API (better-sqlite3's
 * `.backup()` method) — safe to run while the app is writing.
 *
 * Usage:
 *   node scripts/backup-db.mjs              # writes data/backups/YYYY-MM-DD-HHMM.db
 *   node scripts/backup-db.mjs path/to/out.db
 *
 * Rotates: keeps the 14 most recent backups in the default location.
 */

import Database from 'better-sqlite3'
import { mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import path from 'node:path'

const DB_URL = process.env.DATABASE_URL ?? 'file:./data/cadmous.db'
const SRC_PATH = DB_URL.startsWith('file:') ? DB_URL.slice('file:'.length) : DB_URL

const BACKUP_DIR = path.resolve(process.cwd(), 'data/backups')
const KEEP = 14

const explicit = process.argv[2]
const targetPath = (() => {
  if (explicit) return path.resolve(explicit)
  const now = new Date()
  const stamp =
    [now.getFullYear(), pad(now.getMonth() + 1), pad(now.getDate())].join('-') +
    '-' +
    [pad(now.getHours()), pad(now.getMinutes())].join('')
  mkdirSync(BACKUP_DIR, { recursive: true })
  return path.join(BACKUP_DIR, `${stamp}.db`)
})()

function pad(n) {
  return String(n).padStart(2, '0')
}

async function main() {
  const src = new Database(SRC_PATH, { readonly: true, fileMustExist: true })
  await src.backup(targetPath)
  src.close()
  const stat = statSync(targetPath)
  console.log(`Backed up ${SRC_PATH} → ${targetPath} (${Math.round(stat.size / 1024)} KB)`)

  if (!explicit) rotate(BACKUP_DIR, KEEP)
}

function rotate(dir, keep) {
  const files = readdirSync(dir)
    .filter((f) => f.endsWith('.db'))
    .map((f) => ({ name: f, mtime: statSync(path.join(dir, f)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime)
  const stale = files.slice(keep)
  for (const f of stale) {
    rmSync(path.join(dir, f.name))
  }
  if (stale.length > 0) {
    console.log(`Rotated ${stale.length} older backup(s).`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
