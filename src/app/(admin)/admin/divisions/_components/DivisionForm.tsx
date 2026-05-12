'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
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
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { LOCALES, type Locale } from '@/db/schema/content'

import { translateDivisionAction, updateDivisionAction } from '../actions'
import { divisionFormSchema, type DivisionFormValues } from '../schema'

const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية (AR)',
  fr: 'Français (FR)',
}

export function DivisionForm({
  id,
  initial,
}: {
  id: string
  initial: DivisionFormValues
}) {
  const router = useRouter()
  const [saving, startSave] = useTransition()
  const [translatingTo, setTranslatingTo] = useState<Locale | null>(null)
  const [active, setActive] = useState<Locale>('en')

  const form = useForm<DivisionFormValues>({
    resolver: zodResolver(divisionFormSchema),
    defaultValues: initial,
    mode: 'onTouched',
  })

  async function onSubmit(values: DivisionFormValues) {
    startSave(async () => {
      const result = await updateDivisionAction(id, values).catch(() => ({
        ok: false as const,
        error: 'Save failed',
        fieldErrors: undefined,
      }))
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
      toast.success('Saved.')
      router.refresh()
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
      const result = await translateDivisionAction({
        from: 'en',
        to,
        title: en.title,
        lede: en.lede,
        items: en.items,
      })
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      form.setValue(`translations.${to}.title`, result.title, { shouldDirty: true })
      form.setValue(`translations.${to}.lede`, result.lede, { shouldDirty: true })
      form.setValue(`translations.${to}.items`, result.items, { shouldDirty: true })
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value || '0', 10))}
                  />
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
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="/uploads/2026/05/uuid.webp or https://…" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageAlt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image alt</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  name={`translations.${l}.lede`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lede (subtitle)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ItemsArray locale={l} form={form} />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

function ItemsArray({
  locale,
  form,
}: {
  locale: Locale
  form: ReturnType<typeof useForm<DivisionFormValues>>
}) {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: `translations.${locale}.items`,
  })

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <Label>Items</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ title: '', body: '' })}
        >
          Add item
        </Button>
      </div>
      {fields.length === 0 && (
        <p className="text-sm text-zinc-500">No items yet.</p>
      )}
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-4"
        >
          <FormField
            control={form.control}
            name={`translations.${locale}.items.${index}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Item title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`translations.${locale}.items.${index}.body`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Item body</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={2} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-1.5">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-xs"
              disabled={index === 0}
              onClick={() => move(index, index - 1)}
            >
              ↑
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-xs"
              disabled={index === fields.length - 1}
              onClick={() => move(index, index + 1)}
            >
              ↓
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-xs text-red-700"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
