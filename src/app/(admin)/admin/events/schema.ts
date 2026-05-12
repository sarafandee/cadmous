import { z } from 'zod'

import { LOCALES, STATUSES } from '@/db/schema/content'

const translation = z.object({
  title: z.string().trim().max(200),
  description: z.string().trim().max(20000),
  machineTranslated: z.boolean(),
})

export const eventFormSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .min(1, 'Slug is required')
      .max(80)
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, hyphens'),
    startDate: z
      .string()
      .min(1, 'Start date is required')
      .refine((s) => !Number.isNaN(Date.parse(s)), 'Invalid date'),
    endDate: z.string().optional().refine(
      (s) => !s || !Number.isNaN(Date.parse(s)),
      'Invalid date',
    ),
    location: z.string().trim().max(200).optional().or(z.literal('')),
    status: z.enum(STATUSES),
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
    if (data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
      ctx.addIssue({
        path: ['endDate'],
        code: z.ZodIssueCode.custom,
        message: 'End date must be after start date',
      })
    }
  })

export type EventFormValues = z.infer<typeof eventFormSchema>
