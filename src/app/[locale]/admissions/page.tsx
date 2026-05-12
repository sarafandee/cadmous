import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ApplicationWizard } from '@/components/ApplicationWizard'

type Args = {
  params: Promise<{ locale: string }>
}

export default async function AdmissionsPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-4xl font-bold">
          {locale === 'ar' ? 'القبول' : locale === 'fr' ? 'Admissions' : 'Admissions'}
        </h1>
        <p className="mb-8 text-gray-600">
          {locale === 'ar'
            ? 'قم بتعبئة النموذج التالي للتقدم إلى مدرسة قدموس'
            : locale === 'fr'
              ? 'Remplissez le formulaire suivant pour postuler au Collège Cadmous'
              : 'Fill out the form below to apply to Cadmous College'}
        </p>
        <ApplicationWizard locale={locale} />
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    ar: 'القبول | مدرسة قدموس',
    en: 'Admissions | Cadmous College',
    fr: 'Admissions | Collège Cadmous',
  }

  return {
    title: titles[locale] || titles.en,
  }
}
