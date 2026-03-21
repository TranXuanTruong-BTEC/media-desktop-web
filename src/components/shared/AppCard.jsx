import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import styles from './AppCard.module.css'

export default function AppCard({ tool }) {
  return (
    <Link to={`/tool/${tool.slug}`} className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon} style={{ background: tool.iconBg }}>
          <span style={{ color: tool.iconColor, fontSize: '20px', fontWeight: 700 }}>
            {tool.icon}
          </span>
        </div>
        {tool.featured && <span className={styles.badge}>Popular</span>}
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
    </Link>
  )
}
