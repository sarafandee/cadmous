'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import type { ApplicationFormData } from './schema'

type InputProps = {
  name: keyof ApplicationFormData | string
  label: string
  type?: 'text' | 'email' | 'date' | 'textarea'
  required?: boolean
  placeholder?: string
}

export function FormInput({ name, label, type = 'text', required, placeholder }: InputProps) {
  const { register, formState: { errors } } = useFormContext<ApplicationFormData>()
  const error = name.split('.').reduce((obj: any, key) => obj?.[key], errors)

  return (
    <div className="flex-1">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ms-0.5">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          {...register(name as keyof ApplicationFormData)}
          placeholder={placeholder}
          rows={3}
          className={`w-full rounded-md border px-3 py-2 text-sm ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
      ) : (
        <input
          type={type}
          {...register(name as keyof ApplicationFormData)}
          placeholder={placeholder}
          className={`w-full rounded-md border px-3 py-2 text-sm ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
      )}
      {error && (
        <p className="mt-1 text-xs text-red-500">{(error as any).message}</p>
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
  const error = name.split('.').reduce((obj: any, key) => obj?.[key], errors)

  return (
    <div className="flex-1">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ms-0.5">*</span>}
      </label>
      <select
        {...register(name as keyof ApplicationFormData)}
        className={`w-full rounded-md border px-3 py-2 text-sm ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
      >
        <option value="">{placeholder ?? 'Select...'}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-xs text-red-500">{(error as any).message}</p>
      )}
    </div>
  )
}

export function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-4">{children}</div>
}
