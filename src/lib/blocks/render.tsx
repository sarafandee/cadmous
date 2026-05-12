import React from 'react'

import {
  CTABanner,
  Card,
  InfoGrid,
  Section,
  StatStrip,
} from '@/components/CadmousUI'

import type { Block } from './schema'

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <RenderBlock key={i} block={block} />
      ))}
    </>
  )
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'heading':
      return <Heading block={block} />
    case 'paragraph':
      return <Paragraph block={block} />
    case 'list':
      return <List block={block} />
    case 'quote':
      return <Quote block={block} />
    case 'stat':
      return <Stat block={block} />
    case 'stat-grid':
      return <StatGrid block={block} />
    case 'info-grid':
      return <InfoGridBlock block={block} />
    case 'image':
      return <ImageBlock block={block} />
    case 'cta':
      return <CTA block={block} />
  }
}

function Heading({ block }: { block: Extract<Block, { type: 'heading' }> }) {
  const Tag = (`h${block.level}` as 'h1' | 'h2' | 'h3') as keyof React.JSX.IntrinsicElements
  const sizes = {
    1: 'text-[clamp(32px,4vw,48px)] font-bold leading-[1.1] tracking-[-0.02em]',
    2: 'text-[clamp(24px,3vw,32px)] font-bold leading-[1.2] tracking-[-0.02em]',
    3: 'text-xl font-semibold tracking-tight',
  } as const
  return (
    <Section>
      {React.createElement(Tag, { className: `text-white ${sizes[block.level]}` }, block.text)}
    </Section>
  )
}

function inlineMarkdown(md: string) {
  // Minimal: **bold**, *italic*, [text](url). No HTML; angle brackets escaped.
  const escaped = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const html = escaped
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g,
      '<a class="underline text-crimson-400 hover:text-crimson-500" href="$1">$1-text</a>',
    )
    .replace(/\$1-text/g, (_m, _p1, _o, src) => {
      const m = src.match(/\[([^\]]+)\]/)
      return m ? m[1] : ''
    })
  return html
}

function Paragraph({ block }: { block: Extract<Block, { type: 'paragraph' }> }) {
  const paras = block.markdown.split(/\n{2,}/).filter((p) => p.trim().length > 0)
  return (
    <Section>
      <div className="mx-auto max-w-prose text-[16.5px] leading-[1.75] text-white/75">
        {paras.map((p, i) => (
          <p
            key={i}
            className="mb-4 last:mb-0"
            dangerouslySetInnerHTML={{ __html: inlineMarkdown(p) }}
          />
        ))}
      </div>
    </Section>
  )
}

function List({ block }: { block: Extract<Block, { type: 'list' }> }) {
  const Tag = block.ordered ? 'ol' : 'ul'
  return (
    <Section>
      <Tag
        className={`mx-auto max-w-prose ${
          block.ordered ? 'list-decimal' : 'list-disc'
        } ps-6 text-[16.5px] leading-[1.75] text-white/75`}
      >
        {block.items.map((item, i) => (
          <li key={i} className="mb-2">
            {item}
          </li>
        ))}
      </Tag>
    </Section>
  )
}

function Quote({ block }: { block: Extract<Block, { type: 'quote' }> }) {
  return (
    <Section alt>
      <blockquote className="mx-auto max-w-3xl border-s-2 border-crimson-400 ps-6 text-[20px] leading-[1.55] text-white/85">
        <span dangerouslySetInnerHTML={{ __html: inlineMarkdown(block.markdown) }} />
        {block.attribution && (
          <footer className="mt-4 text-sm text-white/50">— {block.attribution}</footer>
        )}
      </blockquote>
    </Section>
  )
}

function Stat({ block }: { block: Extract<Block, { type: 'stat' }> }) {
  return (
    <Section>
      <StatStrip items={[{ value: block.value, label: block.label }]} />
    </Section>
  )
}

function StatGrid({ block }: { block: Extract<Block, { type: 'stat-grid' }> }) {
  return (
    <Section>
      <StatStrip items={block.items} />
    </Section>
  )
}

function InfoGridBlock({ block }: { block: Extract<Block, { type: 'info-grid' }> }) {
  return (
    <Section alt>
      <InfoGrid items={block.items} cols={block.cols} />
    </Section>
  )
}

function ImageBlock({ block }: { block: Extract<Block, { type: 'image' }> }) {
  if (!block.src) return null
  return (
    <Section>
      <figure className="mx-auto max-w-4xl overflow-hidden rounded-[6px] border border-white/10">
        <img src={block.src} alt={block.alt ?? ''} className="w-full" />
        {block.caption && (
          <figcaption className="bg-navy-800 px-4 py-3 text-center text-sm text-white/60">
            {block.caption}
          </figcaption>
        )}
      </figure>
    </Section>
  )
}

function CTA({ block }: { block: Extract<Block, { type: 'cta' }> }) {
  const primary = block.primaryLabel && block.primaryHref
    ? { href: block.primaryHref, label: block.primaryLabel }
    : undefined
  const secondary = block.secondaryLabel && block.secondaryHref
    ? { href: block.secondaryHref, label: block.secondaryLabel }
    : undefined
  return <CTABanner title={block.title} body={block.body} primary={primary} secondary={secondary} />
}

// Re-export Card so callers can compose if needed
export { Card }
