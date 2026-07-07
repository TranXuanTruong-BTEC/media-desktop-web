import React from 'react'
import { Link } from 'react-router-dom'
import { getEffectiveStatus } from '../../hooks/useDeviceStatus.js'
import { useLanguage } from '../../context/LanguageContext.jsx'
import styles from './AppCard.module.css'

export default function AppCard({ tool }) {
  const { t } = useLanguage()
  const effStatus = getEffectiveStatus(tool)  // reads deviceStatus for current device
  const isLocked  = effStatus === 'coming_soon' || effStatus === 'maintenance'

  const statusPill = effStatus === 'active'
    ? <span className={styles.statusLive}>{t('status.active')}</span>
    : effStatus === 'maintenance'
      ? <span className={styles.statusMaint}>{t('status.maintenance')}</span>
      : <span className={styles.statusSoon}>{t('status.comingSoon')}</span>

  return (
    <div className={`${styles.card} ${isLocked ? styles.cardLocked : ''}`}>
      <div className={styles.header}>
        <div className={styles.icon} style={{ background: tool.iconBg }}>
          <span style={{ color: tool.iconColor, fontSize: '18px', fontWeight: 700 }}>
            {tool.icon}
          </span>
        </div>
        {statusPill}
      </div>

      <h3 className={styles.name}>{tool.name}</h3>
      <p className={styles.tagline}>{tool.tagline}</p>

      {isLocked ? (
        <span className={styles.btnDisabled}>{t('button.comingSoon')}</span>
      ) : (
        <Link to={`/tool/${tool.slug}`} className={styles.btn}>
          {t('button.openTool')}
        </Link>
      )}
    </div>
  )
}
