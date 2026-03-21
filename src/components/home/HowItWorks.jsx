import React from 'react'
import styles from './HowItWorks.module.css'

const steps = [
  {
    num: '1',
    icon: '🔗',
    title: 'Copy the link',
    desc: 'Go to YouTube, TikTok, Instagram, or any supported platform. Copy the video URL from your browser or the share menu.',
  },
  {
    num: '2',
    icon: '⚙️',
    title: 'Pick your format',
    desc: 'Paste the URL into SnapLoad. Choose MP3 or MP4 and select the quality that fits your needs.',
  },
  {
    num: '3',
    icon: '⬇️',
    title: 'Download instantly',
    desc: 'Hit download and your file is ready in seconds — saved directly to your device. No waiting, no spam.',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="section-label">Simple as it gets</span>
          <h2 className="section-title">3 steps to your file</h2>
          <p className="section-sub">
            No complicated settings, no account creation. Works exactly as you'd expect.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={step.num} className={styles.step}>
              {/* Connector line */}
              {i < steps.length - 1 && <div className={styles.connector} />}

              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
