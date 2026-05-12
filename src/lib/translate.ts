import 'server-only'

import Anthropic from '@anthropic-ai/sdk'

import type { Locale } from '@/i18n/routing'

const MODEL = 'claude-haiku-4-5-20251001'

let _client: Anthropic | null = null
function client(): Anthropic {
  if (_client) return _client
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error(
      'ANTHROPIC_API_KEY is not set — admin translation requires it. Set it in .env or in your deployment env.',
    )
  }
  _client = new Anthropic({ apiKey })
  return _client
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

  const response = await client().messages.create({
    model: MODEL,
    max_tokens: Math.max(1024, Math.ceil(text.length * 2)),
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [{ role: 'user', content: userPrompt }],
  })

  const block = response.content.find((c) => c.type === 'text')
  return block?.type === 'text' ? block.text.trim() : ''
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
