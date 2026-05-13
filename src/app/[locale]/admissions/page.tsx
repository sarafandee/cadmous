import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

type Args = {
  params: Promise<{ locale: string }>
}

export default async function AdmissionsPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const appLang = locale === 'ar' || locale === 'fr' || locale === 'en' ? locale : 'en'
  redirect(`/${locale}/application/${appLang}`)
}
