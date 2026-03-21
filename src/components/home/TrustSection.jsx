import React from 'react'
import styles from './TrustSection.module.css'

const stats = [
  { num: '50M+', label: 'Downloads served' },
  { num: '50+',  label: 'Platforms supported' },
  { num: '<3s',  label: 'Average start time' },
  { num: '99.9%', label: 'Uptime SLA' },
]

const trustPoints = [
  {
    icon: '🚫',
    title: 'Zero ads, zero traps',
    desc: 'No fake download buttons, no redirects, no popups. Click once, get your file.',
  },
  {
    icon: '💾',
    title: 'No data retention',
    desc: 'URLs are processed and immediately discarded. We never store, share, or sell anything.',
  },
  {
    icon: '🌍',
    title: 'Global CDN delivery',
    desc: 'Files are served from servers near you. Faster speeds, lower latency, everywhere.',
  },
  {
    icon: '🔓',
    title: 'Always free',
    desc: 'Core downloads are free forever. No credit card, no trial, no hidden fees.',
  },
  {
    icon: '📱',
    title: 'Works on any device',
    desc: 'Mobile, tablet, desktop — SnapLoad works on all modern browsers. No app required.',
  },
  {
    icon: '🧩',
    title: 'No installation',
    desc: 'Runs entirely in your browser. No permissions required, works on any operating system.',
  },
]

export default function TrustSection() {
  return (
    <section className={styles.section} id="features">
      {/* Stats bar */}
      <div className={styles.statsBar}>
        <div className={`container ${styles.statsGrid}`}>
          {stats.map(s => (
            <div key={s.label} className={styles.stat}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why choose us */}
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="section-label">Why SnapLoad</span>
          <h2 className="section-title">Built for real people,<br />not bots</h2>
          <p className="section-sub">
            Most download tools are ad-infested traps. We built what we wished existed.
          </p>
        </div>

        <div className={styles.grid}>
          {trustPoints.map(p => (
            <div key={p.title} className={styles.card}>
              <div className={styles.cardIcon}>{p.icon}</div>
              <div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
