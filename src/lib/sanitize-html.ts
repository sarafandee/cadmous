import DOMPurify from 'isomorphic-dompurify'

const ALLOWED_TAGS = [
  'p',
  'br',
  'strong',
  'em',
  'u',
  's',
  'h2',
  'h3',
  'h4',
  'blockquote',
  'ul',
  'ol',
  'li',
  'a',
  'code',
]

const ALLOWED_ATTR = ['href', 'target', 'rel']

export function sanitizeRichText(html: string): string {
  if (!html) return ''
  const cleaned = DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|\/)/i,
  })
  // Empty editors render as "<p></p>" — collapse to '' so .notNull().default('') stays clean.
  const stripped = cleaned.replace(/<p>\s*<\/p>/g, '').trim()
  return stripped
}

/**
 * Collapse rich-text HTML to a single line of plain text for tight UI
 * contexts (announcement strip, list previews). Block-level tags become
 * spaces so adjacent words don't fuse.
 */
export function htmlToPlain(html: string): string {
  if (!html) return ''
  const noBlocks = html.replace(/<\/(p|h2|h3|h4|li|blockquote|ul|ol)>/gi, '$& ')
  const noTags = noBlocks.replace(/<[^>]+>/g, '')
  return noTags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}
