import React, { useState, useRef, useEffect } from 'react'
import { Globe, Check } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, t, languages } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = languages.find(l => l.code === lang) || languages[0]

  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className={`${styles.wrap} ${className}`} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(o => !o)}
        aria-label={t('lang.choose')}
        title={t('lang.choose')}
      >
        <Globe size={15} />
        <span className={styles.flag}>{current.flag}</span>
      </button>

      {open && (
        <div className={styles.dropdown} role="listbox">
          {languages.map(l => (
            <button
              key={l.code}
              className={styles.option}
              onClick={() => { setLang(l.code); setOpen(false) }}
              role="option"
              aria-selected={l.code === lang}
            >
              <span className={styles.optFlag}>{l.flag}</span>
              <span className={styles.optLabel}>{l.label}</span>
              {l.code === lang && <Check size={14} className={styles.optCheck} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
