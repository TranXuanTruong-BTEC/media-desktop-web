import React from 'react'
import styles from './FeatureGrid.module.css'

export default function FeatureGrid({ tool }) {
  const features = [
    { icon: '⚡', title: 'Lightning fast', desc: 'Download starts within seconds. Powered by a distributed global backend.' },
    { icon: '🔒', title: 'Private & secure', desc: 'No URL logging, no file storage. Completely private every time.' },
    { icon: '🎯', title: `${tool.formats.map(f => f.toUpperCase()).join(' & ')} formats`, desc: `Export to ${tool.formats.join(', ')} with quality options for every need.` },
    { icon: '📱', title: 'Works on all devices', desc: 'Fully responsive — works on iPhone, Android, Mac, Windows, and Linux.' },
  ]

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>Why use our {tool.name}?</h2>
        <div className={styles.grid}>
          {features.map(f => (
            <div key={f.title} className={styles.card}>
              <span className={styles.icon}>{f.icon}</span>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
