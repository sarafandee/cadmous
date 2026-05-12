import { db } from '../src/db/client'
import { siteSettings } from '../src/db/schema/cms'

const SETTINGS: { key: string; locale: string; value: string }[] = [
  { key: 'contact.email', locale: '', value: 'info@cadmous.edu.lb' },
  { key: 'contact.phone', locale: '', value: '+961 7 380 391' },
  { key: 'contact.fax', locale: '', value: '+961 7 380 267' },
  { key: 'contact.address', locale: 'en', value: 'Jwar al Nakhel, Tyre, Lebanon' },
  { key: 'contact.address', locale: 'fr', value: 'Jouar el-Nakhel, Tyr, Liban' },
  { key: 'contact.address', locale: 'ar', value: 'جوار النخل، صور، لبنان' },
  { key: 'social.facebook', locale: '', value: 'https://www.facebook.com/CadmousCollegeTyre/' },
]

async function main() {
  for (const s of SETTINGS) {
    await db
      .insert(siteSettings)
      .values(s)
      .onConflictDoUpdate({
        target: [siteSettings.key, siteSettings.locale],
        set: { value: s.value },
      })
  }
  console.log(`Seeded ${SETTINGS.length} site_settings rows.`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
