import { notFound } from 'next/navigation'

import { PageHeader } from '@/components/CadmousUI'
import { asLocale } from '@/lib/content/_internal/locale'
import { getPageBySlug } from '@/lib/content/pages'
import { BlockRenderer } from '@/lib/blocks/render'

const BREADCRUMB_ABOUT: Record<'en' | 'ar' | 'fr', string> = {
  en: 'About Us',
  fr: 'À propos',
  ar: 'من نحن',
}

type Props = { slug: string; locale: string }

export async function renderBlockPage({ slug, locale }: Props) {
  const page = await getPageBySlug(locale, slug)
  if (!page) notFound()
  const bcLabel = BREADCRUMB_ABOUT[asLocale(locale)]

  return (
    <>
      <PageHeader
        locale={locale}
        title={page.title}
        breadcrumb={[{ label: bcLabel }, { label: page.title }]}
        lede={page.lede || undefined}
      />
      <BlockRenderer blocks={page.blocks} />
    </>
  )
}
