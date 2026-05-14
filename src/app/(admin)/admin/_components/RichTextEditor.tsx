'use client'

import Link from '@tiptap/extension-link'
import { EditorContent, useEditor, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Undo2,
} from 'lucide-react'
import { useEffect } from 'react'

import { cn } from '@/lib/utils'

type Props = {
  value: string
  onChange: (html: string) => void
  dir?: 'ltr' | 'rtl'
  placeholder?: string
  minHeight?: number
  className?: string
}

export function RichTextEditor({
  value,
  onChange,
  dir = 'ltr',
  minHeight = 240,
  className,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: false,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: 'noopener noreferrer nofollow', target: '_blank' },
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        dir,
        class: cn(
          'prose prose-sm max-w-none focus:outline-none',
          'prose-headings:font-semibold prose-h2:text-xl prose-h3:text-lg prose-h4:text-base',
          'prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0',
          'prose-a:text-blue-700 prose-a:underline',
          'prose-blockquote:border-l-4 prose-blockquote:border-zinc-300 prose-blockquote:pl-3 prose-blockquote:text-zinc-700',
        ),
        style: `min-height: ${minHeight}px;`,
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML()
      // Tiptap emits "<p></p>" for an empty doc — bubble '' up so the field is truly empty.
      onChange(html === '<p></p>' ? '' : html)
    },
    immediatelyRender: false,
  })

  // Keep editor in sync if defaultValues change (e.g. translate-from-EN fills the field).
  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    const incoming = value || ''
    if (incoming !== current && incoming !== '<p></p>') {
      editor.commands.setContent(incoming, { emitUpdate: false })
    }
  }, [value, editor])

  if (!editor) {
    return (
      <div
        className={cn('rounded-md border border-input bg-white p-3 text-sm text-zinc-400', className)}
        style={{ minHeight }}
      >
        Loading editor…
      </div>
    )
  }

  return (
    <div className={cn('overflow-hidden rounded-md border border-input bg-white', className)}>
      <Toolbar editor={editor} />
      <div className="px-3 py-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-zinc-200 bg-zinc-50 px-1.5 py-1">
      <ToolButton
        label="Bold"
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-4" />
      </ToolButton>
      <ToolButton
        label="Italic"
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </ToolButton>
      <ToolButton
        label="Strikethrough"
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-4" />
      </ToolButton>
      <Divider />
      <ToolButton
        label="Heading 2"
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="size-4" />
      </ToolButton>
      <ToolButton
        label="Heading 3"
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="size-4" />
      </ToolButton>
      <Divider />
      <ToolButton
        label="Bulleted list"
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-4" />
      </ToolButton>
      <ToolButton
        label="Numbered list"
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </ToolButton>
      <ToolButton
        label="Quote"
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="size-4" />
      </ToolButton>
      <Divider />
      <ToolButton
        label={editor.isActive('link') ? 'Edit / remove link' : 'Add link'}
        active={editor.isActive('link')}
        onClick={() => {
          const current = editor.getAttributes('link').href as string | undefined
          const next = window.prompt('Link URL (leave empty to remove)', current ?? 'https://')
          if (next === null) return
          if (next === '' || next === 'https://') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
          }
          editor.chain().focus().extendMarkRange('link').setLink({ href: next }).run()
        }}
      >
        <LinkIcon className="size-4" />
      </ToolButton>
      <Divider />
      <ToolButton
        label="Undo"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 className="size-4" />
      </ToolButton>
      <ToolButton
        label="Redo"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 className="size-4" />
      </ToolButton>
    </div>
  )
}

function ToolButton({
  children,
  onClick,
  active,
  disabled,
  label,
}: {
  children: React.ReactNode
  onClick: () => void
  active?: boolean
  disabled?: boolean
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-7 w-7 items-center justify-center rounded text-zinc-600 transition-colors',
        'hover:bg-zinc-200 hover:text-zinc-900',
        'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent',
        active && 'bg-zinc-900 text-white hover:bg-zinc-900 hover:text-white',
      )}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span className="mx-0.5 h-5 w-px bg-zinc-200" aria-hidden />
}
