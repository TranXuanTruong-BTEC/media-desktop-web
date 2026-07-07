import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { DEFAULT_LANG, LANGUAGES, getTranslator } from '../i18n/translations.js'

const STORAGE_KEY = 'snapload_lang'

const LanguageContext = createContext(null)

function detectInitialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && LANGUAGES.some(l => l.code === stored)) return stored
  } catch {}
  try {
    const nav = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase()
    if (LANGUAGES.some(l => l.code === nav)) return nav
  } catch {}
  return DEFAULT_LANG
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem(STORAGE_KEY, lang) } catch {}
  }, [lang])

  const setLang = (code) => {
    if (LANGUAGES.some(l => l.code === code)) setLangState(code)
  }

  const t = useMemo(() => getTranslator(lang), [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
