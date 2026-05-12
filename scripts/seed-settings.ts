import { db } from '../src/db/client'
import { siteSettings } from '../src/db/schema/cms'

// Bump SEED_VERSION when you change SETTINGS and want the seeder to re-upsert
// into existing rows on the next deploy. Stored in site_settings under key
// `seed.settings.version`.
const SEED_VERSION = 1
const SEED_KEY = 'seed.settings.version'

const SETTINGS: { key: string; locale: string; value: string }[] = [
  { key: 'contact.email', locale: '', value: 'info@cadmous.edu.lb' },
  { key: 'contact.phone', locale: '', value: '+961 7 380 391' },
  { key: 'contact.fax', locale: '', value: '+961 7 380 267' },
  { key: 'contact.address', locale: 'en', value: 'Jwar al Nakhel, Tyre, Lebanon' },
  { key: 'contact.address', locale: 'fr', value: 'Jouar el-Nakhel, Tyr, Liban' },
  { key: 'contact.address', locale: 'ar', value: 'جوار النخل، صور، لبنان' },
  { key: 'social.facebook', locale: '', value: 'https://www.facebook.com/CadmousCollegeTyre/' },
  { key: 'social.instagram', locale: '', value: 'https://www.instagram.com/cadmous_college/' },
]

async function getStoredVersion(): Promise<number> {
  const row = await db.query.siteSettings.findFirst({
    where: (s, { and, eq }) => and(eq(s.key, SEED_KEY), eq(s.locale, '')),
  })
  if (!row) return 0
  const v = parseInt(row.value, 10)
  return Number.isFinite(v) ? v : 0
}

async function setStoredVersion(v: number) {
  await db
    .insert(siteSettings)
    .values({ key: SEED_KEY, locale: '', value: String(v) })
    .onConflictDoUpdate({
      target: [siteSettings.key, siteSettings.locale],
      set: { value: String(v) },
    })
}

async function main() {
  const args = new Set(process.argv.slice(2))
  const stored = await getStoredVersion()
  if (args.has('--if-stale')) {
    if (stored >= SEED_VERSION) {
      console.log(
        `[seed-settings] stored=${stored} >= SEED_VERSION=${SEED_VERSION}; skipping.`,
      )
      return
    }
  }

  for (const s of SETTINGS) {
    await db
      .insert(siteSettings)
      .values(s)
      .onConflictDoUpdate({
        target: [siteSettings.key, siteSettings.locale],
        set: { value: s.value },
      })
  }
  await setStoredVersion(SEED_VERSION)
  console.log(`Seeded ${SETTINGS.length} site_settings rows (version ${SEED_VERSION}).`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
