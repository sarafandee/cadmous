import { asc } from 'drizzle-orm'

import { db } from '@/db/client'
import { siteSettings } from '@/db/schema/cms'
import { requireAdmin } from '@/lib/admin/require-admin'

import { SettingsForm } from './SettingsForm'

export const metadata = { title: 'Settings' }

export default async function SettingsPage() {
  await requireAdmin()
  const rows = await db
    .select({ key: siteSettings.key, locale: siteSettings.locale, value: siteSettings.value })
    .from(siteSettings)
    .orderBy(asc(siteSettings.key), asc(siteSettings.locale))

  return (
    <main>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        Site
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Site settings</h1>
      <p className="mt-1 max-w-prose text-sm text-zinc-500">
        Key/value pairs used across the public site (contact info, social links, etc.).
        Localized keys carry a value per locale; shared keys (locale = empty) are the same
        in all locales.
      </p>
      <div className="mt-8">
        <SettingsForm initial={rows} />
      </div>
    </main>
  )
}
