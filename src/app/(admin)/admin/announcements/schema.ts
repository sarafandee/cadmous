import { z } from 'zod'

import { LOCALES, SEVERITIES, STATUSES } from '@/db/schema/content'

const translation = z.object({
  title: z.string().trim().max(200),
  body: z.string().trim().max(5000),
  machineTranslated: z.boolean(),
})

export const announcementFormSchema = z
  .object({
    severity: z.enum(SEVERITIES),
    status: z.enum(STATUSES),
    startsAt: z.string().optional().refine(
      (s) => !s || !Number.isNaN(Date.parse(s)),
      'Invalid date',
    ),
    endsAt: z.string().optional().refine(
      (s) => !s || !Number.isNaN(Date.parse(s)),
      'Invalid date',
    ),
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
    if (data.startsAt && data.endsAt && new Date(data.endsAt) < new Date(data.startsAt)) {
      ctx.addIssue({
        path: ['endsAt'],
        code: z.ZodIssueCode.custom,
        message: 'End must be after start',
      })
    }
  })

export type AnnouncementFormValues = z.infer<typeof announcementFormSchema>
