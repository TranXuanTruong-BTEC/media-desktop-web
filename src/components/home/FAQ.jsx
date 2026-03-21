import React from 'react'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import styles from './FAQ.module.css'

const faqs = [
  {
    q: 'Is SnapLoad free to use?',
    a: 'Yes, completely free. Download MP3 and MP4 files without creating an account or entering payment details. We keep the lights on through a small number of non-intrusive ads.',
  },
  {
    q: 'What video platforms are supported?',
    a: 'SnapLoad works with 50+ platforms including YouTube, TikTok, Instagram, Facebook, Twitter/X, Reddit, Vimeo, Dailymotion, Snapchat, Pinterest, and many more.',
  },
  {
    q: 'Is it legal to download videos?',
    a: 'Downloading for personal use is generally permissible in many jurisdictions. However, you must not download and redistribute copyrighted content without authorization. Please review the terms of service for each platform. SnapLoad is a tool — how you use it is your responsibility.',
  },
  {
    q: 'Does SnapLoad store my data or files?',
    a: 'No. We process URLs transiently and do not log, store, or cache them. Downloaded files are streamed directly to your browser. We have no interest in your data.',
  },
  {
    q: 'What quality options are available?',
    a: 'For MP3 audio: 128, 192, 256, and 320 kbps. For MP4/WebM video: up to 4K/2160p where the source supports it, otherwise 1080p, 720p, or 480p.',
  },
  {
    q: 'Why is my download failing?',
    a: "The video may be private or region-locked, the platform may have changed its API, or the URL may be malformed. Try copying the URL directly from your browser's address bar.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className={styles.section} id="faq">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="section-label">Common questions</span>
          <h2 className="section-title">FAQ</h2>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}
            >
              <button
                className={styles.question}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <span className={styles.icon}>
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              <div className={`${styles.answer} ${open === i ? styles.answerOpen : ''}`}>
                <div className={styles.answerInner}>{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
