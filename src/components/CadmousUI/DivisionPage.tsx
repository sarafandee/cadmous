import { CTABanner, PageHeader, Section } from '@/components/CadmousUI'

export type DivisionBlock = string | { items: string[] }

export type DivisionPageProps = {
  locale: string
  title: string
  head?: {
    name: string
    role: string
    image: string
  }
  body: DivisionBlock[]
  labels: {
    bcDivisions: string
    ctaTitle: string
    ctaBody: string
    ctaPrimary: string
    ctaSecondary: string
  }
}

export function DivisionPage(props: DivisionPageProps) {
  const { locale, title, head, body, labels } = props
  return (
    <>
      <PageHeader
        locale={locale}
        title={title}
        breadcrumb={[{ label: labels.bcDivisions, href: '/divisions' }, { label: title }]}
      />
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_320px]">
          <div className="text-[16px] leading-[1.75] text-white/70">
            {body.map((block, i) =>
              typeof block === 'string' ? (
                <p key={i} className="mb-5">
                  {block}
                </p>
              ) : (
                <ul key={i} className="mb-5 ms-6 list-disc">
                  {block.items.map((item, j) => (
                    <li key={j} className="mb-1.5">
                      {item}
                    </li>
                  ))}
                </ul>
              ),
            )}
          </div>
          {head && (
            <aside className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-[6px] border border-white/10 bg-navy-800">
                <div className="aspect-square">
                  <img
                    src={head.image}
                    alt={head.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson-400">
                    {head.role}
                  </div>
                  <div className="mt-1.5 text-[18px] font-bold leading-tight text-white">
                    {head.name}
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </Section>
      <CTABanner
        title={labels.ctaTitle}
        body={labels.ctaBody}
        primary={{ href: '/requirements', label: labels.ctaPrimary }}
        secondary={{ href: '/contact', label: labels.ctaSecondary }}
      />
    </>
  )
}
