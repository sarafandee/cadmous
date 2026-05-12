import { z } from 'zod'

import { LOCALES, STATUSES } from '@/db/schema/content'
import { blockArraySchema } from '@/lib/blocks/schema'

const translation = z.object({
  title: z.string().trim().max(200),
  lede: z.string().trim().max(500),
  blocks: blockArraySchema,
  machineTranslated: z.boolean(),
})

export const pageFormSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .min(1)
      .max(80)
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, hyphens'),
    imageUrl: z.string().trim().max(2000).optional().or(z.literal('')),
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

export type PageFormValues = z.infer<typeof pageFormSchema>
