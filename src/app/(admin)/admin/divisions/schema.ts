import { z } from 'zod'

import { LOCALES, STATUSES } from '@/db/schema/content'

const item = z.object({
  title: z.string().trim().min(1).max(200),
  body: z.string().trim().min(1).max(1000),
})

const translation = z.object({
  title: z.string().trim().max(200),
  lede: z.string().trim().max(500),
  items: z.array(item).max(12),
  machineTranslated: z.boolean(),
})

export const divisionFormSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .min(1)
      .max(80)
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, hyphens'),
    position: z.number().int().nonnegative().max(999),
    imageUrl: z.string().trim().max(2000).optional().or(z.literal('')),
    imageAlt: z.string().trim().max(280).optional().or(z.literal('')),
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
  })

export type DivisionFormValues = z.infer<typeof divisionFormSchema>
