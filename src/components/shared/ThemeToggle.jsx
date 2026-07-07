import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'

  return (
    <button
      className={`${styles.toggle} ${className}`}
      onClick={toggleTheme}
      aria-label={isDark ? t('theme.toLight') : t('theme.toDark')}
      title={isDark ? t('theme.toLight') : t('theme.toDark')}
    >
      <span className={`${styles.icon} ${!isDark ? styles.iconActive : ''}`}><Sun size={15} /></span>
      <span className={`${styles.icon} ${isDark ? styles.iconActive : ''}`}><Moon size={15} /></span>
      <span className={`${styles.knob} ${isDark ? styles.knobDark : ''}`} />
    </button>
  )
}
