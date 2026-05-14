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

import { MediaPicker } from '../../_components/MediaPicker'
import { RichTextEditor } from '../../_components/RichTextEditor'

import {
  createEventAction,
  deleteEventAction,
  translateEventAction,
  updateEventAction,
} from '../actions'
import { eventFormSchema, type EventFormValues } from '../schema'

const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية (AR)',
  fr: 'Français (FR)',
}

const emptyTranslation = () => ({
  title: '',
  description: '',
  machineTranslated: false,
})

const defaults = (): EventFormValues => ({
  slug: '',
  startDate: new Date().toISOString().slice(0, 16),
  endDate: '',
  location: '',
  imagePath: '',
  status: 'draft',
  translations: {
    en: emptyTranslation(),
    ar: emptyTranslation(),
    fr: emptyTranslation(),
  },
})

export type EventFormProps =
  | { mode: 'create'; initial?: undefined; id?: undefined }
  | { mode: 'edit'; id: string; initial: EventFormValues }

export function EventForm(props: EventFormProps) {
  const router = useRouter()
  const [saving, startSave] = useTransition()
  const [deleting, startDelete] = useTransition()
  const [translatingTo, setTranslatingTo] = useState<Locale | null>(null)
  const [active, setActive] = useState<Locale>('en')

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: props.mode === 'edit' ? props.initial : defaults(),
    mode: 'onTouched',
  })

  async function onSubmit(values: EventFormValues) {
    startSave(async () => {
      const result = await (props.mode === 'edit'
        ? updateEventAction(props.id, values)
        : createEventAction(values)
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
    if (!confirm('Delete this event permanently?')) return
    startDelete(async () => {
      await deleteEventAction(props.id).catch((err) => {
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
      const result = await translateEventAction({
        from: 'en',
        to,
        fields: { title: en.title, description: en.description },
      })
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      form.setValue(`translations.${to}.title`, result.fields.title, { shouldDirty: true })
      form.setValue(`translations.${to}.description`, result.fields.description, { shouldDirty: true })
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
                    placeholder="spring-concert"
                    {...field}
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Auditorium" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End (optional)</FormLabel>
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
                  name={`translations.${l}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          dir={l === 'ar' ? 'rtl' : 'ltr'}
                          minHeight={280}
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
            {saving ? 'Saving…' : props.mode === 'edit' ? 'Save changes' : 'Create event'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
