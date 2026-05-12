import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ContactForm } from './ContactForm'

type Args = {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const titles: Record<string, string> = {
    ar: 'اتصل بنا',
    en: 'Contact Us',
    fr: 'Contactez-nous',
  }

  const subtitles: Record<string, string> = {
    ar: 'نرحب باستفساراتكم. يرجى ملء النموذج أدناه وسنتواصل معكم في أقرب وقت.',
    en: 'We welcome your inquiries. Please fill out the form below and we will get back to you shortly.',
    fr: 'Nous accueillons vos demandes. Veuillez remplir le formulaire ci-dessous et nous vous répondrons rapidement.',
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-4xl font-bold">{titles[locale] || titles.en}</h1>
        <p className="mb-8 text-gray-600">{subtitles[locale] || subtitles.en}</p>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-semibold">
                {locale === 'ar' ? 'العنوان' : locale === 'fr' ? 'Adresse' : 'Address'}
              </h3>
              <p className="text-gray-600">Cadmous College, Lebanon</p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">
                {locale === 'ar' ? 'الهاتف' : locale === 'fr' ? 'Téléphone' : 'Phone'}
              </h3>
              <p className="text-gray-600" dir="ltr">+961 X XXX XXX</p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">
                {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </h3>
              <p className="text-gray-600">info@cadmous.edu.lb</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    ar: 'اتصل بنا | مدرسة قدموس',
    en: 'Contact Us | Cadmous College',
    fr: 'Contactez-nous | Collège Cadmous',
  }
  return { title: titles[locale] || titles.en }
}
