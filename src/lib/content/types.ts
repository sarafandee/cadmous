import type { Locale } from '@/i18n/routing'

export type NewsPost = {
  slug: string
  title: string
  publishedAt: string
  summary: string
  body?: string
  category?: string
  image?: string
}

export type SchoolEvent = {
  slug: string
  title: string
  startDate: string
  endDate?: string
  location?: string
  description?: string
  image?: string
}

export type LocalizedContent<T> = Record<Locale, T[]>
