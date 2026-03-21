import React from 'react'
import styles from './WhySection.module.css'

const features = [
  {
    icon: '🎵',
    iconBg: 'rgba(108,92,231,0.14)',
    title: 'High-quality audio',
    desc: 'Download MP3 at up to 320 kbps — the highest quality available. Perfect for music, podcasts, and lectures.',
  },
  {
    icon: '🎬',
    iconBg: 'rgba(0,206,201,0.1)',
    title: 'HD & 4K video',
    desc: 'Get MP4 or WebM files at full resolution — up to 4K where available. No compression, no quality loss.',
  },
  {
    icon: '⚡',
    iconBg: 'rgba(253,203,110,0.1)',
    title: 'Lightning fast',
    desc: 'Our servers are globally distributed. Most downloads start in under 3 seconds, no matter where you are.',
  },
  {
    icon: '🔒',
    iconBg: 'rgba(255,118,117,0.1)',
    title: 'Private & secure',
    desc: "We don't log your URLs, store your files, or track activity. Your downloads are 100% private.",
  },
  {
    icon: '📦',
    iconBg: 'rgba(108,92,231,0.14)',
    title: 'Multiple formats',
    desc: 'Choose MP3, MP4, or WebM. Pick the quality that fits — from 128 kbps to 320 kbps for audio.',
  },
  {
    icon: '📱',
    iconBg: 'rgba(0,206,201,0.1)',
    title: 'Works on any device',
    desc: 'Mobile, tablet, desktop — SnapLoad works perfectly on all screen sizes and modern browsers.',
  },
]

export default function WhySection() {
  return (
    <section className={styles.section} id="why">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="section-label">What you get</span>
          <h2 className="section-title">Everything you need,<br />nothing you don't</h2>
          <p className="section-sub">
            We stripped out the ads, popups, and confusing menus.
            Just pure, fast downloads.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map(f => (
            <div key={f.title} className={styles.card}>
              <div className={styles.icon} style={{ background: f.iconBg }}>
                {f.icon}
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
