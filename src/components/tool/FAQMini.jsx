import React from 'react'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import styles from './FAQMini.module.css'

export default function FAQMini({ tool }) {
  const [open, setOpen] = useState(null)

  const faqs = [
    {
      q: `Is this ${tool.name} free?`,
      a: 'Yes, completely free. No account, no payment, no limits on number of downloads.',
    },
    {
      q: 'How long does a download take?',
      a: 'Usually under 5 seconds from pasting the URL. Speed depends on video length and your connection.',
    },
    {
      q: `What quality can I download from ${tool.platforms[0]}?`,
      a: `We support up to ${tool.formats.includes('mp4') ? '4K video and ' : ''}320 kbps MP3 audio where the source provides it.`,
    },
    {
      q: 'Do you store my downloaded files?',
      a: 'No. Files are streamed directly to your browser and never stored on our servers.',
    },
  ]

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>Frequently asked questions</h2>
        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <div key={i} className={`${styles.item} ${open === i ? styles.open : ''}`}>
              <button
                className={styles.q}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{faq.q}</span>
                <span className={styles.icon}>
                  {open === i ? <Minus size={15} /> : <Plus size={15} />}
                </span>
              </button>
              <div className={`${styles.answer} ${open === i ? styles.answerOpen : ''}`}>
                <p className={styles.answerText}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
