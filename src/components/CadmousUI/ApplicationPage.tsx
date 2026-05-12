import { ApplicationForm } from '@/components/CadmousUI/ApplicationForm'
import { Card, Eyebrow, PageHeader, Section } from '@/components/CadmousUI'
import { Link } from '@/i18n/navigation'

type Lang = 'en' | 'fr' | 'ar'

type Labels = {
  bcAdmissions: string
  bcThis: string
  helpEyebrow: string
  helpBody: string
  helpCta: string
  otherLangs: string
}

const LANG_LINK_LABEL: Record<Lang, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
}

export function ApplicationPageShell({
  locale,
  lang,
  title,
  labels,
}: {
  locale: string
  lang: Lang
  title: string
  labels: Labels
}) {
  return (
    <>
      <PageHeader
        locale={locale}
        title={title}
        breadcrumb={[{ label: labels.bcAdmissions, href: '/requirements' }, { label: labels.bcThis }]}
      />
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_320px]">
          <ApplicationForm lang={lang} />
          <Card className="lg:sticky lg:top-24 p-7">
            <Eyebrow>{labels.helpEyebrow}</Eyebrow>
            <p className="mb-3 text-sm text-white/70">{labels.helpBody}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-[4px] border border-white/20 px-[18px] py-[10px] text-[13px] font-semibold tracking-[0.02em] text-white transition hover:border-white/40 hover:bg-white/5"
            >
              {labels.helpCta}
            </Link>
            <hr className="my-6 border-0 border-t border-white/10" />
            <Eyebrow>{labels.otherLangs}</Eyebrow>
            <div className="mt-2 flex flex-wrap gap-2">
              {(['en', 'fr', 'ar'] as Lang[]).map((l) => (
                <Link
                  key={l}
                  href={`/application/${l}`}
                  className={`rounded-[4px] border px-3 py-1.5 text-xs font-semibold transition ${
                    l === lang
                      ? 'border-crimson-400 bg-crimson-500/15 text-crimson-400'
                      : 'border-white/20 text-white hover:border-white/40 hover:bg-white/5'
                  }`}
                >
                  {LANG_LINK_LABEL[l]}
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </Section>
    </>
  )
}
