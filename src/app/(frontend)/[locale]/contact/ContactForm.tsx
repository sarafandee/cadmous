'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { submitContactForm, type ContactResult } from './actions'

export function ContactForm() {
  const t = useTranslations('contact')
  const [result, setResult] = useState<ContactResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    const res = await submitContactForm(formData)
    setResult(res)
    setIsSubmitting(false)
  }

  if (result?.success) {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-green-800">
        {t('success')}
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {result && !result.success && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {result.error}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium">{t('name')} *</label>
        <input
          name="name"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">{t('email')} *</label>
        <input
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">{t('phone')}</label>
        <input
          name="phone"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">{t('message')} *</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Honeypot - hidden from users */}
      <div className="hidden" aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-blue-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50"
      >
        {isSubmitting ? '...' : t('send')}
      </button>
    </form>
  )
}
