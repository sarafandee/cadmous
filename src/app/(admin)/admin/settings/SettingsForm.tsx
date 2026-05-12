'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
  addSettingAction,
  deleteSettingKeyAction,
  saveSettingsAction,
} from './actions'

type Row = { key: string; locale: string; value: string }
type Grouped = { key: string; entries: Row[] }

export function SettingsForm({ initial }: { initial: Row[] }) {
  const router = useRouter()
  const [saving, startSave] = useTransition()
  const [entries, setEntries] = useState<Row[]>(initial)
  const [newKey, setNewKey] = useState('')
  const [newIsLocalized, setNewIsLocalized] = useState(false)

  const grouped: Grouped[] = []
  const map = new Map<string, Row[]>()
  for (const e of entries) {
    if (!map.has(e.key)) map.set(e.key, [])
    map.get(e.key)!.push(e)
  }
  for (const [key, rows] of map) {
    grouped.push({ key, entries: rows.sort((a, b) => a.locale.localeCompare(b.locale)) })
  }
  grouped.sort((a, b) => a.key.localeCompare(b.key))

  function update(key: string, locale: string, value: string) {
    setEntries((cur) =>
      cur.map((e) => (e.key === key && e.locale === locale ? { ...e, value } : e)),
    )
  }

  async function onSave() {
    startSave(async () => {
      const result = await saveSettingsAction({ entries }).catch(() => ({
        ok: false as const,
        error: 'Save failed',
      }))
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('Settings saved.')
      router.refresh()
    })
  }

  async function onAdd() {
    if (!newKey.trim()) return
    const result = await addSettingAction({ key: newKey, isLocalized: newIsLocalized }).catch(
      () => ({ ok: false as const, error: 'Add failed' }),
    )
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success('Key added')
    setNewKey('')
    router.refresh()
  }

  async function onDeleteKey(key: string) {
    if (!confirm(`Delete the ${key} setting?`)) return
    const result = await deleteSettingKeyAction(key).catch(() => ({
      ok: false as const,
      error: 'Delete failed',
    }))
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success('Deleted')
    router.refresh()
  }

  return (
    <div className="grid gap-6">
      {grouped.map((g) => {
        const localized = g.entries.length > 1 || g.entries[0]?.locale !== ''
        return (
          <section
            key={g.key}
            className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <code className="font-mono text-sm font-semibold text-zinc-700">{g.key}</code>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs text-red-700"
                onClick={() => onDeleteKey(g.key)}
              >
                Delete key
              </Button>
            </div>
            {!localized && (
              <div>
                <Label className="mb-1.5 block text-xs text-zinc-500">Value</Label>
                <Input
                  value={g.entries[0]?.value ?? ''}
                  onChange={(e) => update(g.key, '', e.target.value)}
                />
              </div>
            )}
            {localized && (
              <div className="grid gap-3 sm:grid-cols-3">
                {g.entries.map((row) => (
                  <div key={row.locale}>
                    <Label className="mb-1.5 block text-xs uppercase tracking-wide text-zinc-500">
                      {row.locale}
                    </Label>
                    <Input
                      value={row.value}
                      dir={row.locale === 'ar' ? 'rtl' : 'ltr'}
                      onChange={(e) => update(g.key, row.locale, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        )
      })}

      <div className="flex justify-end">
        <Button onClick={onSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save all'}
        </Button>
      </div>

      <section className="grid gap-3 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-5">
        <h2 className="text-sm font-semibold text-zinc-700">Add a key</h2>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <Input
            value={newKey}
            placeholder="contact.phone_secondary"
            onChange={(e) => setNewKey(e.target.value)}
          />
          <label className="flex items-center gap-2 text-sm text-zinc-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300"
              checked={newIsLocalized}
              onChange={(e) => setNewIsLocalized(e.target.checked)}
            />
            Localized (EN/AR/FR)
          </label>
          <Button onClick={onAdd} disabled={!newKey.trim()}>
            Add
          </Button>
        </div>
        <p className="text-xs text-zinc-500">
          Use dotted keys grouped by area, e.g. <code className="font-mono">contact.email</code>,{' '}
          <code className="font-mono">social.facebook</code>.
        </p>
      </section>
    </div>
  )
}
