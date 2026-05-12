import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { DivisionPage } from '@/components/CadmousUI/DivisionPage'
import { getDivisionBySlug } from '@/lib/content/divisions'

import { divisionLabels } from '../_division-labels'

const SLUG = 'secondary-lebanese'

type Args = { params: Promise<{ locale: string }> }

export default async function Page({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const d = await getDivisionBySlug(locale, SLUG)
  if (!d) notFound()

  return (
    <DivisionPage
      locale={locale}
      title={d.title}
      lede={d.lede}
      image={d.imageUrl ?? ''}
      imageAlt={d.imageAlt ?? d.title}
      items={d.items}
      labels={divisionLabels(locale, d.title)}
    />
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const d = await getDivisionBySlug(locale, SLUG)
  return { title: d ? `${d.title} | Cadmous College` : 'Not found' }
}
