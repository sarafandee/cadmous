import {
  CTABanner,
  InfoGrid,
  Lorem,
  PageHeader,
  ProseTwoCol,
  Section,
  SectionHead,
} from '@/components/CadmousUI'

type DivisionPageProps = {
  locale: string
  title: string
  lede?: string
  image: string
  imageAlt?: string
  items: { title: string; body: string }[]
  labels: {
    bcDivisions: string
    eyebrow: string
    sectionTitle: string
    ctaTitle: string
    ctaBody: string
    ctaPrimary: string
    ctaSecondary: string
  }
}

export function DivisionPage(props: DivisionPageProps) {
  const { locale, title, lede, image, imageAlt, items, labels } = props
  return (
    <>
      <PageHeader
        locale={locale}
        title={title}
        breadcrumb={[{ label: labels.bcDivisions }, { label: title }]}
        lede={lede}
      />
      <Section>
        <ProseTwoCol image={image} imageAlt={imageAlt} body={<Lorem paras={4} locale={locale} />} />
      </Section>
      <Section alt>
        <SectionHead eyebrow={labels.eyebrow} title={labels.sectionTitle} />
        <InfoGrid items={items} cols={2} />
      </Section>
      <CTABanner
        title={labels.ctaTitle}
        body={labels.ctaBody}
        primary={{ href: `/${locale}/requirements`, label: labels.ctaPrimary }}
        secondary={{ href: `/${locale}/contact`, label: labels.ctaSecondary }}
      />
    </>
  )
}
