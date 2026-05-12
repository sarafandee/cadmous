import 'server-only'

import type { Locale } from '@/i18n/routing'

const DEFAULT_MODEL = 'google/gemini-2.5-flash-lite'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

function model(): string {
  return process.env.OPENROUTER_MODEL?.trim() || DEFAULT_MODEL
}

function apiKey(): string {
  const key = process.env.OPENROUTER_API_KEY
  if (!key) {
    throw new Error(
      'OPENROUTER_API_KEY is not set — admin translation requires it. Set it in .env or in your deployment env.',
    )
  }
  return key
}

const LANG_NAMES: Record<Locale, string> = {
  en: 'English',
  ar: 'Modern Standard Arabic',
  fr: 'French',
}

const SYSTEM_PROMPT = `You translate marketing copy for Cadmous College, an IB World School in Tyre, Lebanon serving students from Kindergarten through Grade 12.

Audience: prospective and current school families.
Voice: warm, professional, confident; not boastful.
Constraints:
- Preserve every paragraph break and existing markdown structure.
- Keep proper nouns (Cadmous, IB, Tyre, Lebanon, Jwar Al-Nakhl) untranslated.
- Do not invent facts; if a sentence contains a number, repeat it verbatim.
- For Arabic, use Modern Standard Arabic — formal but readable.
- For French, use European French; titles use sentence case unless they are proper nouns.
- Output ONLY the translation, no preface, no commentary, no quotation marks.`

export type TranslateFieldInput = {
  text: string
  from: Locale
  to: Locale
  context?: string
}

type ChatResponse = {
  choices?: { message?: { content?: string } }[]
  error?: { message?: string }
}

export async function translateField({
  text,
  from,
  to,
  context,
}: TranslateFieldInput): Promise<string> {
  if (!text.trim()) return ''
  if (from === to) return text

  const userPrompt =
    `Translate the following text from ${LANG_NAMES[from]} to ${LANG_NAMES[to]}.` +
    (context ? `\n\nContext: ${context}` : '') +
    `\n\nText:\n${text}`

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://cadmous.offplate.ai',
      'X-Title': 'Cadmous Admin',
    },
    body: JSON.stringify({
      model: model(),
      max_tokens: Math.max(1024, Math.ceil(text.length * 2)),
      temperature: 0.2,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`OpenRouter ${res.status}: ${body.slice(0, 500)}`)
  }

  const data = (await res.json()) as ChatResponse
  if (data.error) {
    throw new Error(`OpenRouter error: ${data.error.message ?? 'unknown'}`)
  }
  return (data.choices?.[0]?.message?.content ?? '').trim()
}

export type TranslateFieldsInput = {
  fields: Record<string, string>
  from: Locale
  to: Locale
  context?: string
}

export async function translateFields({
  fields,
  from,
  to,
  context,
}: TranslateFieldsInput): Promise<Record<string, string>> {
  const entries = Object.entries(fields)
  const results = await Promise.all(
    entries.map(async ([key, value]) => {
      const translated = await translateField({ text: value, from, to, context })
      return [key, translated] as const
    }),
  )
  return Object.fromEntries(results)
}
