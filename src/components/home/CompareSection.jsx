import React from 'react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import styles from './CompareSection.module.css'

export default function CompareSection() {
  const { t } = useLanguage()

  const rows = [
    { feature: t('compare.f1'), web: 'yes',     app: 'no' },
    { feature: t('compare.f2'), web: 'limited', app: 'yes' },
    { feature: t('compare.f3'), web: 'yes',     app: 'byVersion' },
    { feature: t('compare.f4'), web: 'yes',     app: 'byPlatform' },
  ]

  const renderCell = (val) => {
    if (val === 'yes')  return <span className={styles.yes}>{t('compare.yes')}</span>
    if (val === 'no')   return <span className={styles.dim}>{t('compare.no')}</span>
    return <span className={styles.dim}>{t(`compare.${val}`)}</span>
  }

  return (
    <section className={styles.section} id="compare">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">{t('compare.label')}</span>
          <h2 className="section-title">{t('compare.title')}</h2>
          <p className="section-sub">{t('compare.sub')}</p>
        </div>

        <div className={styles.table}>
          <div className={`${styles.row} ${styles.head}`}>
            <div className={styles.cell}>{t('compare.feature')}</div>
            <div className={styles.cell}>{t('compare.colWeb')}</div>
            <div className={styles.cell}>{t('compare.colApp')}</div>
          </div>
          {rows.map((r, i) => (
            <div className={styles.row} key={i}>
              <div className={`${styles.cell} ${styles.feature}`}>{r.feature}</div>
              <div className={styles.cell}>{renderCell(r.web)}</div>
              <div className={styles.cell}>{renderCell(r.app)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
