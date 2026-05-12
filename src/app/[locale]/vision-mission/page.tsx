import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { getPageBySlug } from '@/lib/content/pages'

import { renderBlockPage } from '../_block-page'

const SLUG = 'vision-mission'

type Args = { params: Promise<{ locale: string }> }

export default async function Page({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  return renderBlockPage({ slug: SLUG, locale })
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const p = await getPageBySlug(locale, SLUG)
  return { title: p ? `${p.title} | Cadmous College` : 'Not found' }
}
