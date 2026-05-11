'use client'

import { useState } from 'react'

type Lang = 'en' | 'fr' | 'ar'

const LABELS: Record<Lang, Record<string, string>> = {
  en: {
    note: '[This form is a visual placeholder. Wire to backend to enable submissions.]',
    student: 'Student name',
    dob: 'Date of birth',
    grade: 'Grade applying for',
    parent: 'Parent / guardian name',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    prevSchool: 'Previous school',
    notes: 'Additional notes',
    submit: 'Submit application',
    submitted: 'Thank you. Our admissions team will be in touch shortly.',
  },
  fr: {
    note: '[Ce formulaire est un espace réservé visuel.]',
    student: "Nom de l'élève",
    dob: 'Date de naissance',
    grade: 'Niveau scolaire',
    parent: 'Nom du parent / tuteur',
    phone: 'Téléphone',
    email: 'Email',
    address: 'Adresse',
    prevSchool: 'École précédente',
    notes: 'Remarques',
    submit: 'Soumettre la demande',
    submitted: "Merci. Notre équipe d'admission reviendra vers vous prochainement.",
  },
  ar: {
    note: '[هذا النموذج مكان مؤقت بصري فقط.]',
    student: 'اسم الطالب',
    dob: 'تاريخ الميلاد',
    grade: 'الصف المتقدم إليه',
    parent: 'اسم ولي الأمر',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    address: 'العنوان',
    prevSchool: 'المدرسة السابقة',
    notes: 'ملاحظات',
    submit: 'إرسال الطلب',
    submitted: 'شكرًا لكم. سيتواصل فريق القبول معكم قريبًا.',
  },
}

const GRADES = [
  'KG1', 'KG2', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
  'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
]

const fieldClass =
  'mt-1.5 rounded-[4px] border border-white/10 bg-navy-800 px-[14px] py-[11px] text-[15px] text-white outline-none transition placeholder:text-white/30 focus:border-crimson-400'

const labelClass =
  'flex flex-col gap-0 text-[12px] font-semibold uppercase tracking-[0.04em] text-white/70'

export function ApplicationForm({ lang }: { lang: Lang }) {
  const t = LABELS[lang]
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div dir={dir} className="rounded-[6px] border border-crimson-400 bg-crimson-500/10 p-6 text-white">
        {t.submitted}
      </div>
    )
  }

  return (
    <form
      dir={dir}
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
      className="grid max-w-[760px] grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <p className="col-span-full m-0 text-[13px] text-white/40">{t.note}</p>

      <label className={labelClass}>
        <span>{t.student}</span>
        <input type="text" required className={fieldClass} />
      </label>
      <label className={labelClass}>
        <span>{t.dob}</span>
        <input type="date" required className={fieldClass} />
      </label>
      <label className={labelClass}>
        <span>{t.grade}</span>
        <select className={fieldClass} defaultValue="">
          <option value="" disabled />
          {GRADES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </label>
      <label className={labelClass}>
        <span>{t.prevSchool}</span>
        <input type="text" className={fieldClass} />
      </label>
      <label className={`${labelClass} sm:col-span-2`}>
        <span>{t.parent}</span>
        <input type="text" required className={fieldClass} />
      </label>
      <label className={labelClass}>
        <span>{t.phone}</span>
        <input type="tel" required className={fieldClass} />
      </label>
      <label className={labelClass}>
        <span>{t.email}</span>
        <input type="email" required className={fieldClass} />
      </label>
      <label className={`${labelClass} sm:col-span-2`}>
        <span>{t.address}</span>
        <input type="text" className={fieldClass} />
      </label>
      <label className={`${labelClass} sm:col-span-2`}>
        <span>{t.notes}</span>
        <textarea className={`${fieldClass} min-h-[110px] resize-y`} />
      </label>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-[4px] border border-crimson-500 bg-crimson-500 px-[18px] py-[10px] text-[13px] font-semibold tracking-[0.02em] text-white transition hover:border-crimson-400 hover:bg-crimson-400"
        >
          {t.submit}
        </button>
      </div>
    </form>
  )
}
