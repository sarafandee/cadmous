'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LOCALES, type Locale } from '@/db/schema/content'
import { slugify } from '@/lib/admin/slug'

import {
  createPageAction,
  deletePageAction,
  translatePageAction,
  updatePageAction,
} from '../actions'
import { pageFormSchema, type PageFormValues } from '../schema'
import { BlockEditor } from './BlockEditor'

const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية (AR)',
  fr: 'Français (FR)',
}

const emptyTranslation = () => ({
  title: '',
  lede: '',
  blocks: [],
  machineTranslated: false,
})

const defaults = (): PageFormValues => ({
  slug: '',
  imageUrl: '',
  status: 'draft',
  translations: {
    en: emptyTranslation(),
    ar: emptyTranslation(),
    fr: emptyTranslation(),
  },
})

export type PageFormProps =
  | { mode: 'create'; initial?: undefined; id?: undefined }
  | { mode: 'edit'; id: string; initial: PageFormValues }

export function PageForm(props: PageFormProps) {
  const router = useRouter()
  const [saving, startSave] = useTransition()
  const [deleting, startDelete] = useTransition()
  const [translatingTo, setTranslatingTo] = useState<Locale | null>(null)
  const [active, setActive] = useState<Locale>('en')

  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageFormSchema),
    defaultValues: props.mode === 'edit' ? props.initial : defaults(),
    mode: 'onTouched',
  })

  async function onSubmit(values: PageFormValues) {
    startSave(async () => {
      const result = await (props.mode === 'edit'
        ? updatePageAction(props.id, values)
        : createPageAction(values)
      ).catch((err) => {
        if (err && typeof err === 'object' && 'digest' in err) throw err
        return { ok: false as const, error: 'Save failed', fieldErrors: undefined }
      })
      if (!result) return
      if (result.ok === false) {
        toast.error(result.error)
        if (result.fieldErrors) {
          for (const [path, message] of Object.entries(result.fieldErrors)) {
            form.setError(path as never, { message })
          }
        }
        return
      }
      toast.success(props.mode === 'edit' ? 'Saved.' : 'Created.')
      router.refresh()
    })
  }

  async function onDelete() {
    if (props.mode !== 'edit') return
    if (!confirm('Delete this page permanently? Public URL will 404.')) return
    startDelete(async () => {
      await deletePageAction(props.id).catch((err) => {
        if (err && typeof err === 'object' && 'digest' in err) throw err
        toast.error('Delete failed')
      })
    })
  }

  async function translateFromEnglish(to: Locale) {
    if (to === 'en') return
    const en = form.getValues('translations.en')
    if (!en.title.trim()) {
      toast.error('Fill in the English fields first.')
      return
    }
    setTranslatingTo(to)
    try {
      const result = await translatePageAction({
        from: 'en',
        to,
        title: en.title,
        lede: en.lede,
        blocks: en.blocks,
      })
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      form.setValue(`translations.${to}.title`, result.title, { shouldDirty: true })
      form.setValue(`translations.${to}.lede`, result.lede, { shouldDirty: true })
      form.setValue(`translations.${to}.blocks`, result.blocks, { shouldDirty: true })
      form.setValue(`translations.${to}.machineTranslated`, true, { shouldDirty: true })
      toast.success(`Filled ${LOCALE_LABEL[to]} from English.`)
    } finally {
      setTranslatingTo(null)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <div className="grid gap-5 rounded-lg border border-zinc-200 bg-white p-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="vision-mission"
                    onBlur={(e) => {
                      field.onBlur()
                      const v = e.target.value
                      if (v && v !== slugify(v)) {
                        form.setValue('slug', slugify(v), { shouldDirty: true })
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Hero image URL (optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="/uploads/2026/05/uuid.webp" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <Tabs value={active} onValueChange={(v) => setActive(v as Locale)}>
            <div className="flex items-center justify-between gap-3">
              <TabsList>
                {LOCALES.map((l) => (
                  <TabsTrigger key={l} value={l}>
                    {LOCALE_LABEL[l]}
                    {form.watch(`translations.${l}.machineTranslated`) && (
                      <span className="ms-2 rounded-sm bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-900">
                        MT
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
              {active !== 'en' && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={translatingTo !== null}
                  onClick={() => translateFromEnglish(active)}
                >
                  {translatingTo === active
                    ? 'Translating…'
                    : `Translate ${LOCALE_LABEL[active]} from English`}
                </Button>
              )}
            </div>

            {LOCALES.map((l) => (
              <TabsContent
                key={l}
                value={l}
                className="mt-6 grid gap-5"
              >
                <FormField
                  control={form.control}
                  name={`translations.${l}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title{l === 'en' ? ' *' : ''}</FormLabel>
                      <FormControl>
                        <Input {...field} dir={l === 'ar' ? 'rtl' : 'ltr'} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`translations.${l}.lede`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lede (page intro)</FormLabel>
                      <FormControl>
                        <Input {...field} dir={l === 'ar' ? 'rtl' : 'ltr'} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <BlockEditor
                  name={`translations.${l}.blocks`}
                  form={form}
                  dir={l === 'ar' ? 'rtl' : 'ltr'}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="flex items-center justify-between gap-3">
          {props.mode === 'edit' ? (
            <Button
              type="button"
              variant="ghost"
              className="text-red-700 hover:text-red-800"
              onClick={onDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting…' : 'Delete'}
            </Button>
          ) : (
            <span />
          )}
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : props.mode === 'edit' ? 'Save changes' : 'Create page'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
