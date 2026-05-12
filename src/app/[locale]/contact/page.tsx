import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { getSettings } from '@/lib/content/settings'
import { ContactForm } from './ContactForm'

type Args = {
  params: Promise<{ locale: string }>
}

const COPY = {
  en: {
    title: 'Contact Us',
    subtitle:
      'We welcome your inquiries. Please fill out the form below and we will get back to you shortly.',
    address: 'Address',
    phone: 'Phone',
    fax: 'Fax',
    email: 'Email',
    follow: 'Follow us',
    addressFallback: 'Cadmous College, Lebanon',
  },
  fr: {
    title: 'Contactez-nous',
    subtitle:
      'Nous accueillons vos demandes. Veuillez remplir le formulaire ci-dessous et nous vous répondrons rapidement.',
    address: 'Adresse',
    phone: 'Téléphone',
    fax: 'Fax',
    email: 'E-mail',
    follow: 'Suivez-nous',
    addressFallback: 'Collège Cadmous, Liban',
  },
  ar: {
    title: 'اتصل بنا',
    subtitle: 'نرحب باستفساراتكم. يرجى ملء النموذج أدناه وسنتواصل معكم في أقرب وقت.',
    address: 'العنوان',
    phone: 'الهاتف',
    fax: 'الفاكس',
    email: 'البريد الإلكتروني',
    follow: 'تابعونا',
    addressFallback: 'مدرسة قدموس، لبنان',
  },
} as const

export default async function ContactPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = COPY[locale as keyof typeof COPY] ?? COPY.en
  const settings = await getSettings(locale)
  const address = settings['contact.address'] || t.addressFallback
  const phone = settings['contact.phone']
  const fax = settings['contact.fax']
  const email = settings['contact.email']
  const facebook = settings['social.facebook']
  const instagram = settings['social.instagram']

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-4xl font-bold">{t.title}</h1>
        <p className="mb-8 text-gray-600">{t.subtitle}</p>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-semibold">{t.address}</h3>
              <p className="text-gray-600">{address}</p>
            </div>

            {phone && (
              <div>
                <h3 className="mb-2 font-semibold">{t.phone}</h3>
                <p className="text-gray-600" dir="ltr">
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-blue-700">
                    {phone}
                  </a>
                </p>
              </div>
            )}

            {fax && (
              <div>
                <h3 className="mb-2 font-semibold">{t.fax}</h3>
                <p className="text-gray-600" dir="ltr">
                  {fax}
                </p>
              </div>
            )}

            {email && (
              <div>
                <h3 className="mb-2 font-semibold">{t.email}</h3>
                <p className="text-gray-600">
                  <a href={`mailto:${email}`} className="hover:text-blue-700">
                    {email}
                  </a>
                </p>
              </div>
            )}

            {(facebook || instagram) && (
              <div>
                <h3 className="mb-2 font-semibold">{t.follow}</h3>
                <div className="flex gap-4 text-gray-600">
                  {facebook && (
                    <a
                      href={facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-700"
                    >
                      Facebook
                    </a>
                  )}
                  {instagram && (
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-700"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = COPY[locale as keyof typeof COPY] ?? COPY.en
  return { title: t.title }
}
