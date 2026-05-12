import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll } from 'vitest'

let tempDir: string

beforeAll(() => {
  tempDir = mkdtempSync(path.join(tmpdir(), 'cadmous-test-'))
  process.env.DATABASE_URL = `file:${path.join(tempDir, 'test.db')}`
  process.env.BETTER_AUTH_SECRET ??= 'test-secret-' + 'x'.repeat(32)
  process.env.BETTER_AUTH_URL ??= 'http://localhost:3000'
})

afterAll(() => {
  if (tempDir) rmSync(tempDir, { recursive: true, force: true })
})
