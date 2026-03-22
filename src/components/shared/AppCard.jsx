import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, Wrench, ArrowRight } from 'lucide-react'
import { getEffectiveStatus } from '../../hooks/useDeviceStatus.js'
import styles from './AppCard.module.css'

export default function AppCard({ tool }) {
  const effStatus = getEffectiveStatus(tool)  // reads deviceStatus for current device
  const isLocked  = effStatus === 'coming_soon' || effStatus === 'maintenance'

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
        {tool.featured && effStatus === 'active' && (
          <span className={styles.badge}>Popular</span>
        )}
        {effStatus === 'coming_soon' && (
          <span className={styles.badgeComingSoon}>🚧 Coming Soon</span>
        )}
        {effStatus === 'maintenance' && (
          <span className={styles.badgeMaintenance}>🔧 Bảo trì</span>
        )}
      </div>

      <h3 className={styles.name}>{tool.name}</h3>
      <p className={styles.tagline}>{tool.tagline}</p>

      <div className={styles.formats}>
        {(tool.formats || []).map(f => (
          <span key={f} className={`${styles.format} ${styles[f]}`}>
            {f.toUpperCase()}
          </span>
        ))}
      </div>

      <div className={styles.arrow}>
        {isLocked
          ? effStatus === 'maintenance'
            ? <Wrench size={15} style={{ color: 'var(--red)' }} />
            : <Clock  size={15} style={{ color: 'var(--amber)' }} />
          : <ArrowRight size={16} />
        }
      </div>

      {/* Status overlay on locked cards */}
      {effStatus === 'coming_soon' && (
        <div className={styles.statusOverlay}>
          <Clock size={16} />
          <span>Coming Soon</span>
        </div>
      )}
      {effStatus === 'maintenance' && (
        <div className={`${styles.statusOverlay} ${styles.statusOverlayRed}`}>
          <Wrench size={16} />
          <span>Đang bảo trì</span>
        </div>
      )}
    </Link>
  )
}
