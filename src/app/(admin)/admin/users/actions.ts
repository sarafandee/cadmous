'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { z } from 'zod'

import { auth } from '@/lib/auth'
import { requireAdmin } from '@/lib/admin/require-admin'
import { writeAudit } from '@/lib/admin/audit'

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> }

const createSchema = z.object({
  email: z.string().email(),
  name: z.string().trim().min(1).max(120),
  password: z.string().min(8).max(200),
  role: z.enum(['admin', 'user']),
})

export type CreateUserValues = z.infer<typeof createSchema>

export async function createUserAction(values: CreateUserValues): Promise<ActionResult> {
  const session = await requireAdmin()
  const parsed = createSchema.safeParse(values)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Validation failed',
      fieldErrors: Object.fromEntries(parsed.error.issues.map((i) => [i.path.join('.'), i.message])),
    }
  }

  try {
    const result = await auth.api.createUser({
      body: parsed.data,
      headers: await headers(),
    })
    await writeAudit({
      userId: session.user.id,
      action: 'create',
      entityType: 'user',
      entityId: result.user.id,
      diff: { email: parsed.data.email, role: parsed.data.role },
    })
    revalidatePath('/admin/users')
    return { ok: true }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Create failed'
    return { ok: false, error: msg }
  }
}

export async function setUserRoleAction(
  userId: string,
  role: 'admin' | 'user',
): Promise<ActionResult> {
  const session = await requireAdmin()
  if (userId === session.user.id) {
    return { ok: false, error: "You can't change your own role." }
  }
  try {
    await auth.api.setRole({
      body: { userId, role },
      headers: await headers(),
    })
    await writeAudit({
      userId: session.user.id,
      action: 'update',
      entityType: 'user',
      entityId: userId,
      diff: { role },
    })
    revalidatePath('/admin/users')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed' }
  }
}

export async function banUserAction(userId: string): Promise<ActionResult> {
  const session = await requireAdmin()
  if (userId === session.user.id) {
    return { ok: false, error: "You can't ban yourself." }
  }
  try {
    await auth.api.banUser({
      body: { userId },
      headers: await headers(),
    })
    await writeAudit({
      userId: session.user.id,
      action: 'update',
      entityType: 'user',
      entityId: userId,
      diff: { banned: true },
    })
    revalidatePath('/admin/users')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed' }
  }
}

export async function unbanUserAction(userId: string): Promise<ActionResult> {
  const session = await requireAdmin()
  try {
    await auth.api.unbanUser({
      body: { userId },
      headers: await headers(),
    })
    await writeAudit({
      userId: session.user.id,
      action: 'update',
      entityType: 'user',
      entityId: userId,
      diff: { banned: false },
    })
    revalidatePath('/admin/users')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed' }
  }
}
