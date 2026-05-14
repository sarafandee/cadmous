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
import { Textarea } from '@/components/ui/textarea'
import { LOCALES, type Locale } from '@/db/schema/content'
import { slugify } from '@/lib/admin/slug'

import { MediaPicker } from '../../_components/MediaPicker'
import { RichTextEditor } from '../../_components/RichTextEditor'

import {
  createNewsAction,
  deleteNewsAction,
  translateNewsAction,
  updateNewsAction,
} from '../actions'
import { newsFormSchema, type NewsFormValues } from '../schema'

const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية (AR)',
  fr: 'Français (FR)',
}

const emptyTranslation = () => ({
  title: '',
  summary: '',
  body: '',
  machineTranslated: false,
})

const defaults = (): NewsFormValues => ({
  slug: '',
  publishedAt: new Date().toISOString().slice(0, 16),
  status: 'draft',
  imagePath: '',
  translations: {
    en: emptyTranslation(),
    ar: emptyTranslation(),
    fr: emptyTranslation(),
  },
})

export type NewsFormProps =
  | { mode: 'create'; initial?: undefined; id?: undefined }
  | { mode: 'edit'; id: string; initial: NewsFormValues }

export function NewsForm(props: NewsFormProps) {
  const router = useRouter()
  const [saving, startSave] = useTransition()
  const [deleting, startDelete] = useTransition()
  const [translatingTo, setTranslatingTo] = useState<Locale | null>(null)
  const [active, setActive] = useState<Locale>('en')

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: props.mode === 'edit' ? props.initial : defaults(),
    mode: 'onTouched',
  })

  function applySlugFromTitle() {
    const title = form.getValues('translations.en.title')
    if (!title) return
    const current = form.getValues('slug')
    if (current && current !== slugify(current)) return
    if (!current) form.setValue('slug', slugify(title), { shouldDirty: true })
  }

  async function onSubmit(values: NewsFormValues) {
    startSave(async () => {
      const action =
        props.mode === 'edit'
          ? updateNewsAction(props.id, values)
          : createNewsAction(values)

      const result = await action.catch((err) => {
        if (err && typeof err === 'object' && 'digest' in err) throw err
        return { ok: false as const, error: 'Save failed', fieldErrors: undefined }
      })

      if (!result) return // redirect threw — caller already redirected
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
    if (!confirm('Delete this post permanently?')) return
    startDelete(async () => {
      await deleteNewsAction(props.id).catch((err) => {
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
      const result = await translateNewsAction({
        from: 'en',
        to,
        fields: { title: en.title, summary: en.summary, body: en.body },
      })
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      form.setValue(`translations.${to}.title`, result.fields.title, { shouldDirty: true })
      form.setValue(`translations.${to}.summary`, result.fields.summary, { shouldDirty: true })
      form.setValue(`translations.${to}.body`, result.fields.body, { shouldDirty: true })
      form.setValue(`translations.${to}.machineTranslated`, true, { shouldDirty: true })
      toast.success(`Filled ${LOCALE_LABEL[to]} from English.`)
    } finally {
      setTranslatingTo(null)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6"
      >
        <div className="grid gap-5 rounded-lg border border-zinc-200 bg-white p-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder="open-day-recap"
                    {...field}
                    onBlur={(e) => {
                      field.onBlur()
                      const v = e.target.value
                      if (v && v !== slugify(v)) {
                        form.setValue('slug', slugify(v), { shouldDirty: true })
                      }
                      if (!v) applySlugFromTitle()
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publishedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publish date</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
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
            name="imagePath"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Featured image</FormLabel>
                <FormControl>
                  <MediaPicker
                    value={field.value ?? ''}
                    onChange={(p) => field.onChange(p)}
                  />
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
                dir={l === 'ar' ? 'rtl' : 'ltr'}
              >
                <FormField
                  control={form.control}
                  name={`translations.${l}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title{l === 'en' ? ' *' : ''}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`translations.${l}.summary`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`translations.${l}.body`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Body</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          dir={l === 'ar' ? 'rtl' : 'ltr'}
                          minHeight={320}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
            {saving ? 'Saving…' : props.mode === 'edit' ? 'Save changes' : 'Create post'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
