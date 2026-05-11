import Link from 'next/link'
import type { ReactNode } from 'react'

export function PageHeader({
  title,
  breadcrumb,
  lede,
  locale,
}: {
  title: string
  breadcrumb?: { label: string; href?: string }[]
  lede?: string
  locale: string
}) {
  const homeLabel = locale === 'ar' ? 'الرئيسية' : locale === 'fr' ? 'Accueil' : 'Home'
  return (
    <header className="relative border-b border-white/10 bg-navy-900 px-[clamp(20px,4vw,48px)] pt-20 pb-14">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(1200px 400px at 80% 0%, rgba(197,64,64,0.10), transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-[1240px]">
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="mb-5 flex flex-wrap items-center gap-2 text-xs tracking-[0.06em] text-white/40">
            <Link href={`/${locale}`} className="hover:text-white">
              {homeLabel}
            </Link>
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-white/40">/</span>
                {b.href ? (
                  <Link href={b.href} className="hover:text-white">
                    {b.label}
                  </Link>
                ) : (
                  <span>{b.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-[clamp(40px,5.5vw,64px)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
          {title}
        </h1>
        {lede && (
          <p className="mt-5 max-w-[60ch] text-[19px] leading-[1.55] text-white">{lede}</p>
        )}
      </div>
    </header>
  )
}

export function Section({
  children,
  alt,
  className = '',
}: {
  children: ReactNode
  alt?: boolean
  className?: string
}) {
  return (
    <section
      className={`px-[clamp(20px,4vw,48px)] py-20 ${alt ? 'bg-navy-800' : 'bg-navy-900'} ${className}`}
    >
      <div className="mx-auto max-w-[1240px]">{children}</div>
    </section>
  )
}

export function SectionHead({
  eyebrow,
  title,
  link,
}: {
  eyebrow?: string
  title?: string
  link?: { href: string; label: string }
}) {
  return (
    <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
      <div>
        {eyebrow && (
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson-400">
            {eyebrow}
          </div>
        )}
        {title && (
          <h2 className="max-w-[22ch] text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
            {title}
          </h2>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="text-[13px] font-semibold text-crimson-400 hover:text-crimson-500"
        >
          {link.label} →
        </Link>
      )}
    </div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson-400">
      {children}
    </div>
  )
}

export function Lorem({ paras = 3, locale = 'en' }: { paras?: number; locale?: string }) {
  const text: Record<string, string> = {
    en: '[Placeholder paragraph — replace with real copy from cadmous.edu.lb.] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    fr: '[Paragraphe à remplacer par le contenu vérifié de l’école.] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ar: '[نص بديل — سيتم استبداله بمحتوى موثّق من المدرسة.] لوريم إيبسوم دولور سيت أميت، كونسيكتيتور أديبا يسكينج إيليت، سيد دو إيوسمود تيمبور إنكايديديونتيوت.',
  }
  const t = text[locale] || text.en
  return (
    <>
      {Array.from({ length: paras }).map((_, i) => (
        <p key={i} className="mb-4 text-white/70">
          {t}
        </p>
      ))}
    </>
  )
}

export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-[6px] border border-white/10 bg-navy-800 p-6 transition hover:border-white/20 ${className}`}
    >
      {children}
    </div>
  )
}

export function ProseTwoCol({
  body,
  image,
  imageAlt,
  reverse,
}: {
  body: ReactNode
  image?: string
  imageAlt?: string
  reverse?: boolean
}) {
  return (
    <div
      className={`grid items-start gap-12 ${image ? 'lg:grid-cols-[1.2fr_1fr]' : ''}`}
    >
      <div className={reverse ? 'lg:order-2' : ''}>
        <div className="text-[16px] leading-[1.75] text-white/70">{body}</div>
      </div>
      {image && (
        <div
          className={`aspect-[4/5] overflow-hidden rounded-[6px] border border-white/10 ${
            reverse ? 'lg:order-1' : ''
          }`}
        >
          <img src={image} alt={imageAlt || ''} className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  )
}

export function InfoGrid({
  items,
  cols,
}: {
  items: { eyebrow?: string; title: string; body: string }[]
  cols?: number
}) {
  const gridClass = cols === 3 ? 'md:grid-cols-3' : cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
  return (
    <div className={`grid gap-4 ${gridClass}`}>
      {items.map((it, i) => (
        <Card key={i}>
          {it.eyebrow && (
            <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson-400">
              {it.eyebrow}
            </div>
          )}
          <h3 className="mb-2.5 text-[20px] font-bold leading-[1.25] text-white">
            {it.title}
          </h3>
          <p className="m-0 text-sm text-white/70">{it.body}</p>
        </Card>
      ))}
    </div>
  )
}

export function StatStrip({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid overflow-hidden rounded-[6px] border border-white/10 bg-white/10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((s, i) => (
        <div key={i} className="bg-navy-800 px-6 py-7">
          <div className="text-[40px] font-bold leading-none tracking-[-0.02em] text-white">
            {s.value}
          </div>
          <div className="mt-1.5 text-xs uppercase tracking-[0.12em] text-white/40">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export function Timeline({
  items,
}: {
  items: { year: string; title: string; body: string }[]
}) {
  return (
    <div className="flex flex-col">
      {items.map((it, i, arr) => (
        <div
          key={i}
          className={`grid items-start gap-8 py-6 lg:grid-cols-[120px_1fr] ${
            i < arr.length - 1 ? 'border-b border-white/10' : ''
          }`}
        >
          <div className="text-[22px] font-bold tracking-[-0.01em] text-crimson-400">
            {it.year}
          </div>
          <div>
            <h3 className="mb-2 text-[20px] font-bold leading-[1.25] text-white">
              {it.title}
            </h3>
            <p className="m-0 text-[14.5px] text-white/70">{it.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col gap-px overflow-hidden rounded-[6px] border border-white/10 bg-white/10">
      {items.map((it, i) => (
        <details
          key={i}
          className="group bg-navy-900 open:bg-navy-800"
          {...(i === 0 ? { open: true } : {})}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-semibold text-white">
            <span>{it.q}</span>
            <span className="text-[22px] leading-none text-crimson-400 transition group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="max-w-[72ch] px-6 pb-5 text-[14.5px] leading-[1.65] text-white/70">
            {it.a}
          </div>
        </details>
      ))}
    </div>
  )
}

export function ProcessSteps({
  items,
  stepLabel = 'STEP',
}: {
  items: { title: string; body: string }[]
  stepLabel?: string
}) {
  return (
    <div className={`grid gap-4 ${items.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
      {items.map((s, i) => (
        <Card key={i}>
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-crimson-400">
            {stepLabel} {String(i + 1).padStart(2, '0')}
          </div>
          <h3 className="mb-2 text-[20px] font-bold leading-[1.25] text-white">{s.title}</h3>
          <p className="m-0 text-sm text-white/70">{s.body}</p>
        </Card>
      ))}
    </div>
  )
}

export function CTABanner({
  title,
  body,
  primary,
  secondary,
}: {
  title: string
  body?: string
  primary?: { href: string; label: string }
  secondary?: { href: string; label: string }
}) {
  return (
    <section className="border-t border-b border-white/10 bg-gradient-to-br from-navy-700 to-navy-900 px-[clamp(20px,4vw,48px)] py-16">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="mb-3 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
            {title}
          </h2>
          {body && <p className="m-0 max-w-[55ch] text-[16.5px] text-white/70">{body}</p>}
        </div>
        <div className="flex flex-wrap justify-end gap-3">
          {primary && (
            <Link
              href={primary.href}
              className="inline-flex items-center gap-2 rounded-[4px] border border-crimson-500 bg-crimson-500 px-[18px] py-[10px] text-[13px] font-semibold tracking-[0.02em] text-white transition hover:border-crimson-400 hover:bg-crimson-400"
            >
              {primary.label}
            </Link>
          )}
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-2 rounded-[4px] border border-white/20 px-[18px] py-[10px] text-[13px] font-semibold tracking-[0.02em] text-white transition hover:border-white/40 hover:bg-white/5"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export function ContactBlock({
  labels,
  values,
}: {
  labels: { address: string; phone: string; email: string; hours: string }
  values: { address: string; phone: string; email: string; hours: string }
}) {
  return (
    <Card className="p-7">
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 text-sm">
        <div className="text-white/40">{labels.address}</div>
        <div className="text-white">{values.address}</div>
        <div className="text-white/40">{labels.phone}</div>
        <div className="text-white">{values.phone}</div>
        <div className="text-white/40">{labels.email}</div>
        <div className="text-white">{values.email}</div>
        <div className="text-white/40">{labels.hours}</div>
        <div className="text-white">{values.hours}</div>
      </div>
    </Card>
  )
}
