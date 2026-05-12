import { eq } from 'drizzle-orm'
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

import { db } from '../src/db/client'
import { user } from '../src/db/schema/auth'
import { auth } from '../src/lib/auth'

async function prompt(question: string, secret = false): Promise<string> {
  const rl = createInterface({ input, output, terminal: true })
  try {
    if (!secret) return (await rl.question(question)).trim()

    output.write(question)
    return await new Promise<string>((resolve) => {
      let value = ''
      const onData = (chunk: Buffer) => {
        const str = chunk.toString('utf8')
        for (const ch of str) {
          if (ch === '\n' || ch === '\r') {
            input.off('data', onData)
            input.setRawMode?.(false)
            output.write('\n')
            resolve(value)
            return
          }
          if (ch === '') process.exit(130)
          if (ch === '') value = value.slice(0, -1)
          else value += ch
        }
      }
      input.setRawMode?.(true)
      input.resume()
      input.on('data', onData)
    })
  } finally {
    rl.close()
  }
}

async function main() {
  const envEmail = process.env.ADMIN_EMAIL
  const isTTY = !!input.isTTY

  // Container/non-interactive: require env vars; skip silently if absent
  // so that wiring this into docker-entrypoint.sh is safe.
  if (!isTTY && (!envEmail || !process.env.ADMIN_PASSWORD)) {
    console.log('[seed-admin] ADMIN_EMAIL/ADMIN_PASSWORD not set; skipping.')
    return
  }

  const email = envEmail ?? (await prompt('Admin email: '))
  if (!email) throw new Error('Email required')

  const existing = await db.select().from(user).where(eq(user.email, email)).limit(1)
  if (existing.length > 0) {
    const current = existing[0]
    console.log(`User ${email} already exists (role=${current.role ?? 'user'}).`)
    if (current.role !== 'admin') {
      await db.update(user).set({ role: 'admin' }).where(eq(user.id, current.id))
      console.log(`Promoted ${email} to admin.`)
    }
    return
  }

  const name = process.env.ADMIN_NAME ?? (await prompt('Display name: ')) ?? email
  const password =
    process.env.ADMIN_PASSWORD ?? (await prompt('Password (min 8 chars): ', true))
  if (!password || password.length < 8) throw new Error('Password must be at least 8 chars')

  const created = await auth.api.createUser({
    body: {
      email,
      password,
      name,
      role: 'admin',
    },
  })

  console.log(`Created admin: ${created.user.email} (id=${created.user.id})`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
