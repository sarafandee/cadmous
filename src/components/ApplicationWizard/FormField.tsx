'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

import { useFormLabels } from './labels-context'
import type { ApplicationFormData } from './schema'

const inputClass =
  'mt-1.5 w-full rounded-[4px] border bg-navy-800 px-[14px] py-[11px] text-[15px] text-white outline-none transition placeholder:text-white/30 focus:border-crimson-400'

const labelClass =
  'block text-[12px] font-semibold uppercase tracking-[0.04em] text-white/70'

type InputProps = {
  name: keyof ApplicationFormData | string
  label: string
  type?: 'text' | 'email' | 'date' | 'textarea' | 'tel'
  required?: boolean
  placeholder?: string
}

export function FormInput({ name, label, type = 'text', required, placeholder }: InputProps) {
  const { register, formState: { errors } } = useFormContext<ApplicationFormData>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = name.split('.').reduce((obj: any, key) => obj?.[key], errors)
  const borderClass = error ? 'border-crimson-500' : 'border-white/10'

  return (
    <div className="flex-1 min-w-0">
      <label className={labelClass}>
        {label}
        {required && <span className="ms-0.5 text-crimson-400">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          {...register(name as keyof ApplicationFormData)}
          placeholder={placeholder}
          rows={3}
          className={`${inputClass} ${borderClass} min-h-[88px] resize-y`}
        />
      ) : (
        <input
          type={type}
          {...register(name as keyof ApplicationFormData)}
          placeholder={placeholder}
          className={`${inputClass} ${borderClass}`}
        />
      )}
      {error && (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <p className="mt-1.5 text-[11px] text-crimson-400">{(error as any).message}</p>
      )}
    </div>
  )
}

type SelectProps = {
  name: keyof ApplicationFormData | string
  label: string
  required?: boolean
  options: { label: string; value: string }[]
  placeholder?: string
}

export function FormSelect({ name, label, required, options, placeholder }: SelectProps) {
  const { register, formState: { errors } } = useFormContext<ApplicationFormData>()
  const labels = useFormLabels()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = name.split('.').reduce((obj: any, key) => obj?.[key], errors)
  const borderClass = error ? 'border-crimson-500' : 'border-white/10'

  return (
    <div className="flex-1 min-w-0">
      <label className={labelClass}>
        {label}
        {required && <span className="ms-0.5 text-crimson-400">*</span>}
      </label>
      <select
        {...register(name as keyof ApplicationFormData)}
        defaultValue=""
        className={`${inputClass} ${borderClass} appearance-none`}
      >
        <option value="" disabled className="bg-navy-800 text-white/40">
          {placeholder ?? labels.selectPlaceholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-navy-800 text-white">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <p className="mt-1.5 text-[11px] text-crimson-400">{(error as any).message}</p>
      )}
    </div>
  )
}

export function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-4 sm:flex-nowrap">{children}</div>
}
