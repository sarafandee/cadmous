import { z } from 'zod'

import { LOCALES, STATUSES } from '@/db/schema/content'

const translation = z.object({
  title: z.string().trim().max(200),
  summary: z.string().trim().max(500),
  body: z.string().trim().max(20000),
  machineTranslated: z.boolean(),
})

export const newsFormSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .min(1, 'Slug is required')
      .max(80)
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, hyphens'),
    publishedAt: z
      .string()
      .min(1, 'Publish date is required')
      .refine((s) => !Number.isNaN(Date.parse(s)), 'Invalid date'),
    status: z.enum(STATUSES),
    imagePath: z.string().trim().optional().or(z.literal('')),
    translations: z.object(
      LOCALES.reduce(
        (acc, l) => ({ ...acc, [l]: translation }),
        {} as Record<(typeof LOCALES)[number], typeof translation>,
      ),
    ),
  })
  .superRefine((data, ctx) => {
    if (!data.translations.en.title.trim()) {
      ctx.addIssue({
        path: ['translations', 'en', 'title'],
        code: z.ZodIssueCode.custom,
        message: 'English title is required',
      })
    }
  })

export type NewsFormValues = z.infer<typeof newsFormSchema>
