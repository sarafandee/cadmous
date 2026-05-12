'use server'

import { revalidatePath, updateTag } from 'next/cache'
import { z } from 'zod'

import { db } from '@/db/client'
import { siteSettings } from '@/db/schema/cms'
import { LOCALES } from '@/db/schema/content'
import { writeAudit } from '@/lib/admin/audit'
import { requireAdmin } from '@/lib/admin/require-admin'
import { SETTINGS_CACHE_TAG } from '@/lib/content/settings'

const entrySchema = z.object({
  key: z.string().trim().min(1).max(80),
  locale: z.string().max(5),
  value: z.string().max(2000),
})

const inputSchema = z.object({ entries: z.array(entrySchema).max(200) })

export type SettingsValues = z.infer<typeof inputSchema>

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string }

export async function saveSettingsAction(values: SettingsValues): Promise<ActionResult> {
  const session = await requireAdmin()
  const parsed = inputSchema.safeParse(values)
  if (!parsed.success) return { ok: false, error: 'Validation failed' }

  for (const entry of parsed.data.entries) {
    await db
      .insert(siteSettings)
      .values(entry)
      .onConflictDoUpdate({
        target: [siteSettings.key, siteSettings.locale],
        set: { value: entry.value },
      })
  }

  await writeAudit({
    userId: session.user.id,
    action: 'update',
    entityType: 'settings',
    entityId: 'all',
  })

  updateTag(SETTINGS_CACHE_TAG)
  revalidatePath('/')
  for (const l of LOCALES) {
    if (l === 'en') continue
    revalidatePath(`/${l}`)
  }
  return { ok: true }
}

export async function addSettingAction({
  key,
  isLocalized,
}: {
  key: string
  isLocalized: boolean
}): Promise<ActionResult> {
  await requireAdmin()
  const trimmed = key.trim().toLowerCase().replace(/[^a-z0-9.\-_]/g, '')
  if (!trimmed) return { ok: false, error: 'Invalid key' }

  if (isLocalized) {
    for (const l of LOCALES) {
      await db
        .insert(siteSettings)
        .values({ key: trimmed, locale: l, value: '' })
        .onConflictDoNothing()
    }
  } else {
    await db
      .insert(siteSettings)
      .values({ key: trimmed, locale: '', value: '' })
      .onConflictDoNothing()
  }

  updateTag(SETTINGS_CACHE_TAG)
  revalidatePath('/admin/settings')
  return { ok: true }
}

export async function deleteSettingKeyAction(key: string): Promise<ActionResult> {
  await requireAdmin()
  const { eq } = await import('drizzle-orm')
  await db.delete(siteSettings).where(eq(siteSettings.key, key))
  updateTag(SETTINGS_CACHE_TAG)
  revalidatePath('/admin/settings')
  return { ok: true }
}
