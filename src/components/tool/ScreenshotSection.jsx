import React from 'react'
import styles from './ScreenshotSection.module.css'

const steps = [
  {
    num: '01',
    title: 'Copy the video URL',
    desc: 'Open the video on the platform and copy the link from your browser address bar or the share button.',
  },
  {
    num: '02',
    title: 'Paste & choose format',
    desc: 'Paste the URL into the input above. Select your preferred format (MP3/MP4) and quality level.',
  },
  {
    num: '03',
    title: 'Download your file',
    desc: 'Click Download and your file saves directly to your device — no redirects, no waiting.',
  },
]

export default function ScreenshotSection({ tool }) {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>

        <div className={styles.textSide}>
          <span className="section-label">How to use</span>
          <h2 className={styles.title}>
            Download from {tool.platforms[0]}<br />in 3 simple steps
          </h2>
          <div className={styles.steps}>
            {steps.map(s => (
              <div key={s.num} className={styles.step}>
                <div className={styles.stepNum}>{s.num}</div>
                <div>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual mock of the tool UI */}
        <div className={styles.mockSide}>
          <div className={styles.mockCard}>
            <div className={styles.mockHeader}>
              <div className={styles.mockDots}>
                <span /><span /><span />
              </div>
              <div className={styles.mockUrl}>snapload.app</div>
            </div>
            <div className={styles.mockBody}>
              <div className={styles.mockInput}>
                <span className={styles.mockInputText}>
                  {tool.platforms[0].toLowerCase()}.com/watch?v=…
                </span>
                <div className={styles.mockBtn} style={{ background: tool.color || 'var(--accent)' }}>
                  Download
                </div>
              </div>
              <div className={styles.mockResult}>
                <div className={styles.mockThumb} />
                <div className={styles.mockMeta}>
                  <div className={styles.mockTitle} />
                  <div className={styles.mockSub} />
                </div>
              </div>
              {['320 kbps — Best quality', '256 kbps', '128 kbps'].map((q, i) => (
                <div key={i} className={styles.mockRow}>
                  <div className={styles.mockBadge} style={{ opacity: 1 - i * 0.2 }}>
                    {tool.formats[0].toUpperCase()}
                  </div>
                  <span className={styles.mockRowLabel}>{q}</span>
                  <div className={styles.mockDlBtn}>↓</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
