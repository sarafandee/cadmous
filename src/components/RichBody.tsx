import { cn } from '@/lib/utils'

const HTML_TAG = /<\/?[a-z][^>]*>/i

/**
 * Renders admin-authored body content. Treats legacy plain-text bodies
 * (preserved \n line breaks) and new TipTap HTML bodies uniformly. HTML
 * has already been sanitized server-side by sanitizeRichText.
 */
export function RichBody({
  html,
  className,
}: {
  html: string
  className?: string
}) {
  if (!html) return null

  const isHtml = HTML_TAG.test(html)

  if (isHtml) {
    return (
      <div
        className={cn(
          'prose prose-invert max-w-none',
          'prose-headings:text-white prose-headings:font-semibold',
          'prose-p:text-white/70 prose-li:text-white/70 prose-strong:text-white',
          'prose-a:text-crimson-400 prose-a:underline hover:prose-a:text-crimson-500',
          'prose-blockquote:border-l-crimson-500 prose-blockquote:text-white/60',
          className,
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return <div className={cn('whitespace-pre-line', className)}>{html}</div>
}
