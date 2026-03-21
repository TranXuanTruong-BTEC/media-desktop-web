import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, Wrench } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import styles from './AppCard.module.css'

export default function AppCard({ tool }) {
  const isLocked = tool.status === 'coming_soon' || tool.status === 'maintenance'

  return (
    <Link
      to={isLocked ? '#' : `/tool/${tool.slug}`}
      className={`${styles.card} ${isLocked ? styles.cardLocked : ''}`}
      onClick={isLocked ? e => e.preventDefault() : undefined}
    >
      <div className={styles.header}>
        <div className={styles.icon} style={{ background: tool.iconBg }}>
          <span style={{ color: tool.iconColor, fontSize: '20px', fontWeight: 700 }}>
            {tool.icon}
          </span>
        </div>
        {tool.featured && <span className={styles.badge}>Popular</span>}
        {tool.status === 'coming_soon' && <span className={styles.badgeComingSoon}>🚧 Coming Soon</span>}
        {tool.status === 'maintenance' && <span className={styles.badgeMaintenance}>🔧 Bảo trì</span>}
      </div>

      <h3 className={styles.name}>{tool.name}</h3>
      <p className={styles.tagline}>{tool.tagline}</p>

      <div className={styles.formats}>
        {tool.formats.map(f => (
          <span key={f} className={`${styles.format} ${styles[f]}`}>
            {f.toUpperCase()}
          </span>
        ))}
      </div>

      <div className={styles.arrow}>
        <ArrowRight size={16} />
      </div>

      {/* Status overlay */}
      {tool.status === 'coming_soon' && (
        <div className={styles.statusOverlay}>
          <Clock size={16} />
          <span>Coming Soon</span>
        </div>
      )}
      {tool.status === 'maintenance' && (
        <div className={`${styles.statusOverlay} ${styles.statusOverlayRed}`}>
          <Wrench size={16} />
          <span>Đang bảo trì</span>
        </div>
      )}
    </Link>
  )
}
