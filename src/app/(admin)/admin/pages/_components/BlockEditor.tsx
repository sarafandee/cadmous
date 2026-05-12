'use client'

import {
  type Control,
  type FieldArrayPath,
  type UseFormReturn,
  useFieldArray,
  useWatch,
} from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { BLOCK_TYPES, type Block, type BlockType, emptyBlock } from '@/lib/blocks/schema'

import type { PageFormValues } from '../schema'

type ArrayPath = FieldArrayPath<PageFormValues>

const BLOCK_LABEL: Record<BlockType, string> = {
  heading: 'Heading',
  paragraph: 'Paragraph',
  list: 'List',
  quote: 'Quote',
  stat: 'Stat',
  'stat-grid': 'Stat grid',
  'info-grid': 'Info grid (cards)',
  image: 'Image',
  cta: 'Call to action',
}

export function BlockEditor({
  name,
  form,
  dir,
}: {
  name: ArrayPath
  form: UseFormReturn<PageFormValues>
  dir?: 'ltr' | 'rtl'
}) {
  const { fields, append, remove, move, insert } = useFieldArray({
    control: form.control,
    name,
  })

  return (
    <div className="grid gap-3" dir={dir}>
      <div className="flex items-center justify-between">
        <Label>Blocks</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline" size="sm">
              Add block
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {BLOCK_TYPES.map((t) => (
              <DropdownMenuItem
                key={t}
                onSelect={() => append(emptyBlock(t) as never)}
              >
                {BLOCK_LABEL[t]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {fields.length === 0 && (
        <p className="rounded-md border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center text-sm text-zinc-500">
          No blocks yet. Click "Add block" to insert one.
        </p>
      )}

      {fields.map((field, index) => (
        <BlockCard
          key={field.id}
          control={form.control}
          name={name}
          index={index}
          total={fields.length}
          onMoveUp={() => move(index, index - 1)}
          onMoveDown={() => move(index, index + 1)}
          onDuplicate={() => {
            const current = form.getValues(`${name}.${index}` as never) as unknown as Block
            insert(index + 1, JSON.parse(JSON.stringify(current)) as never)
          }}
          onDelete={() => remove(index)}
        />
      ))}
    </div>
  )
}

function BlockCard({
  control,
  name,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
}: {
  control: Control<PageFormValues>
  name: ArrayPath
  index: number
  total: number
  onMoveUp: () => void
  onMoveDown: () => void
  onDuplicate: () => void
  onDelete: () => void
}) {
  const block = useWatch({ control, name: `${name}.${index}` as never }) as Block | undefined
  if (!block) return null

  const path = `${name}.${index}` as const

  return (
    <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
          {BLOCK_LABEL[block.type]}
        </div>
        <div className="flex gap-1">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs"
            disabled={index === 0}
            onClick={onMoveUp}
          >
            ↑
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs"
            disabled={index === total - 1}
            onClick={onMoveDown}
          >
            ↓
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs"
            onClick={onDuplicate}
          >
            Duplicate
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs text-red-700"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>

      {block.type === 'heading' && (
        <div className="grid gap-3 sm:grid-cols-[100px_1fr]">
          <FormField
            control={control}
            name={`${path}.level` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Level</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                    className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-xs"
                  >
                    <option value={1}>H1</option>
                    <option value={2}>H2</option>
                    <option value={3}>H3</option>
                  </select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`${path}.text` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Text</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      {block.type === 'paragraph' && (
        <FormField
          control={control}
          name={`${path}.markdown` as never}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Markdown (paragraphs separated by blank lines)</FormLabel>
              <FormControl>
                <Textarea {...field} rows={6} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {block.type === 'list' && (
        <ListFields control={control} path={path} index={index} />
      )}

      {block.type === 'quote' && (
        <div className="grid gap-3">
          <FormField
            control={control}
            name={`${path}.markdown` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Quote</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`${path}.attribution` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Attribution (optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      )}

      {block.type === 'stat' && (
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField
            control={control}
            name={`${path}.value` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Value</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="1966" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`${path}.label` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Label</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Founded" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      )}

      {block.type === 'stat-grid' && (
        <StatGridFields control={control} path={path} />
      )}

      {block.type === 'info-grid' && (
        <InfoGridFields control={control} path={path} />
      )}

      {block.type === 'image' && (
        <div className="grid gap-3">
          <FormField
            control={control}
            name={`${path}.src` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Image URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="/uploads/2026/05/uuid.webp" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`${path}.alt` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Alt</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`${path}.caption` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Caption</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      )}

      {block.type === 'cta' && (
        <div className="grid gap-3">
          <FormField
            control={control}
            name={`${path}.title` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`${path}.body` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Body</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={2} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={control}
              name={`${path}.primaryLabel` as never}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Primary label</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`${path}.primaryHref` as never}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Primary href</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="/admissions" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`${path}.secondaryLabel` as never}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Secondary label</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`${path}.secondaryHref` as never}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Secondary href</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="/contact" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function ListFields({
  control,
  path,
  index: _parentIndex,
}: {
  control: Control<PageFormValues>
  path: string
  index: number
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${path}.items` as never,
  })

  return (
    <div className="grid gap-3">
      <FormField
        control={control}
        name={`${path}.ordered` as never}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormControl>
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            </FormControl>
            <FormLabel className="text-xs">Ordered (numbered)</FormLabel>
          </FormItem>
        )}
      />
      <div className="grid gap-2">
        {fields.map((f, i) => (
          <div key={f.id} className="flex gap-2">
            <FormField
              control={control}
              name={`${path}.items.${i}` as never}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input {...field} placeholder={`Item ${i + 1}`} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-9 px-2 text-xs text-red-700"
              onClick={() => remove(i)}
            >
              ✕
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() => append('' as never)}
        >
          Add item
        </Button>
      </div>
    </div>
  )
}

function StatGridFields({
  control,
  path,
}: {
  control: Control<PageFormValues>
  path: string
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${path}.items` as never,
  })
  return (
    <div className="grid gap-3">
      {fields.map((f, i) => (
        <div key={f.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
          <FormField
            control={control}
            name={`${path}.items.${i}.value` as never}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Value" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`${path}.items.${i}.label` as never}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Label" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-9 px-2 text-xs text-red-700"
            onClick={() => remove(i)}
          >
            ✕
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => append({ value: '', label: '' } as never)}
      >
        Add stat
      </Button>
    </div>
  )
}

function InfoGridFields({
  control,
  path,
}: {
  control: Control<PageFormValues>
  path: string
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${path}.items` as never,
  })
  return (
    <div className="grid gap-3">
      <FormField
        control={control}
        name={`${path}.cols` as never}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Columns</FormLabel>
            <FormControl>
              <select
                value={field.value ?? 'auto'}
                onChange={(e) =>
                  field.onChange(e.target.value === 'auto' ? undefined : parseInt(e.target.value, 10))
                }
                className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-xs"
              >
                <option value="auto">Auto</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </FormControl>
          </FormItem>
        )}
      />
      {fields.map((f, i) => (
        <div key={f.id} className="grid gap-2 rounded-md border border-zinc-200 bg-white p-3">
          <FormField
            control={control}
            name={`${path}.items.${i}.eyebrow` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Eyebrow (optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`${path}.items.${i}.title` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`${path}.items.${i}.body` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Body</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={2} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="w-fit h-7 px-2 text-xs text-red-700"
            onClick={() => remove(i)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => append({ title: '', body: '' } as never)}
      >
        Add card
      </Button>
    </div>
  )
}
