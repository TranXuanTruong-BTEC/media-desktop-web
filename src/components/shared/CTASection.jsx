import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CTASection.module.css'

export default function CTASection({
  label = 'Ready to start?',
  title = 'Download your first file right now',
  subtitle = 'No account. No software. No nonsense.',
  btnText = 'Start Downloading Free →',
  btnHref = '/#downloader',
}) {
  const handleClick = () => {
    if (btnHref.startsWith('/#')) {
      const id = btnHref.slice(2)
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.section}>
      {/* Background glow */}
      <div className={styles.glow} />

      <div className={`container ${styles.inner}`}>
        <div className={styles.label}>{label}</div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.sub}>{subtitle}</p>
        <button className="btn-primary" onClick={handleClick}>
          {btnText}
        </button>
      </div>
    </section>
  )
}
