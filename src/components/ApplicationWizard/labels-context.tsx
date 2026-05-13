'use client'

import { createContext, useContext, type ReactNode } from 'react'

import { FORM_LABELS, isAppLang, type AppLang, type FormLabels } from './labels'

const FormLabelsContext = createContext<FormLabels>(FORM_LABELS.en)
const AppLangContext = createContext<AppLang>('en')

export function FormLabelsProvider({
  appLang,
  children,
}: {
  appLang: string
  children: ReactNode
}) {
  const lang: AppLang = isAppLang(appLang) ? appLang : 'en'
  return (
    <AppLangContext.Provider value={lang}>
      <FormLabelsContext.Provider value={FORM_LABELS[lang]}>
        {children}
      </FormLabelsContext.Provider>
    </AppLangContext.Provider>
  )
}

export function useFormLabels(): FormLabels {
  return useContext(FormLabelsContext)
}

export function useAppLang(): AppLang {
  return useContext(AppLangContext)
}
