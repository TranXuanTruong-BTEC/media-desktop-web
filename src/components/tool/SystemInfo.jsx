import React from 'react'
import styles from './SystemInfo.module.css'

export default function SystemInfo({ tool }) {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Supported platforms</h3>
            <div className={styles.tags}>
              {tool.platforms.map(p => (
                <span key={p} className={styles.tag}>{p}</span>
              ))}
            </div>
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Output formats</h3>
            <div className={styles.tags}>
              {tool.formats.map(f => (
                <span key={f} className={`${styles.tag} ${styles[f]}`}>
                  {f.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Requirements</h3>
            <div className={styles.tags}>
              <span className={styles.tag}>Modern browser</span>
              <span className={styles.tag}>Internet connection</span>
              <span className={styles.tag}>No app needed</span>
            </div>
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Privacy</h3>
            <div className={styles.tags}>
              <span className={styles.tag}>No account</span>
              <span className={styles.tag}>No logging</span>
              <span className={styles.tag}>SSL secured</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
