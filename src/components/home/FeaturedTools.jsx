import React from 'react'
import AppCard from '../shared/AppCard.jsx'
import { getEffectiveStatus } from '../../hooks/useDeviceStatus.js'
import { tools } from '../../data/tools.js'
import styles from './FeaturedTools.module.css'

export default function FeaturedTools() {
  return (
    <section className={styles.section} id="tools">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="section-label">All Tools</span>
          <h2 className="section-title">One platform,<br />every downloader</h2>
          <p className="section-sub">
            Whether you need audio, video, or both — we've got a dedicated tool for every major platform.
          </p>
        </div>

        <div className={styles.grid}>
          {[...tools]
            .sort((a, b) => {
              const order = { active: 0, coming_soon: 1, maintenance: 2 }
              return (order[getEffectiveStatus(a)] || 0) - (order[getEffectiveStatus(b)] || 0)
            })
            .map(tool => (
              <AppCard key={tool.id} tool={tool} />
            ))}
        </div>
      </div>
    </section>
  )
}
