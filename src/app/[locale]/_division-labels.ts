import { asLocale } from '@/lib/content/_internal/locale'

const LABELS = {
  en: {
    bcDivisions: 'Divisions',
    eyebrow: 'What we offer',
    sectionTitleTemplate: 'Curriculum & life in {title}.',
    ctaTitleTemplate: 'Apply to {title}.',
    ctaBody:
      "Admissions are rolling. Reach out and we'll guide you through the next steps.",
    ctaPrimary: 'Admissions',
    ctaSecondary: 'Contact us',
  },
  fr: {
    bcDivisions: 'Divisions',
    eyebrow: 'Ce que nous offrons',
    sectionTitleTemplate: 'Programme et vie en {title}.',
    ctaTitleTemplate: 'Postuler à {title}.',
    ctaBody: 'Les admissions sont continues. Contactez-nous et nous vous guiderons.',
    ctaPrimary: 'Admissions',
    ctaSecondary: 'Nous contacter',
  },
  ar: {
    bcDivisions: 'الأقسام',
    eyebrow: 'ما نقدّمه',
    sectionTitleTemplate: 'المنهج والحياة في {title}.',
    ctaTitleTemplate: 'قدّم إلى {title}.',
    ctaBody: 'القبول مفتوح طوال السنة. تواصل معنا وسنرشدك للخطوات التالية.',
    ctaPrimary: 'القبول',
    ctaSecondary: 'تواصل معنا',
  },
} as const

export function divisionLabels(locale: string, title: string) {
  const l = LABELS[asLocale(locale)]
  return {
    bcDivisions: l.bcDivisions,
    eyebrow: l.eyebrow,
    sectionTitle: l.sectionTitleTemplate.replace('{title}', title),
    ctaTitle: l.ctaTitleTemplate.replace('{title}', title),
    ctaBody: l.ctaBody,
    ctaPrimary: l.ctaPrimary,
    ctaSecondary: l.ctaSecondary,
  }
}
