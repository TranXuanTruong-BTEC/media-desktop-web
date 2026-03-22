import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { MessageCircle, X, Send, Bug, Lightbulb, MessageSquare, CheckCircle } from 'lucide-react'
import styles from './FeedbackWidget.module.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const TYPES = [
  { value: 'bug',     icon: <Bug size={14} />,       label: 'Báo lỗi' },
  { value: 'feature', icon: <Lightbulb size={14} />, label: 'Đề xuất' },
  { value: 'other',   icon: <MessageSquare size={14}/>, label: 'Khác' },
]

export default function FeedbackWidget() {
  const [open,    setOpen]    = useState(false)
  const [phase,   setPhase]   = useState('form') // form | sending | done
  const [type,    setType]    = useState('other')
  const [name,    setName]    = useState('')
  const [message, setMessage] = useState('')
  const [error,   setError]   = useState('')

  function resetForm() {
    setPhase('form'); setType('other')
    setName(''); setMessage(''); setError('')
  }

  async function handleSubmit() {
    if (!message.trim()) { setError('Vui lòng nhập nội dung phản hồi'); return }
    setPhase('sending'); setError('')
    try {
      const res = await fetch(`${API_BASE}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, name: name.trim(), message: message.trim() }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error)
      setPhase('done')
      setTimeout(() => { setOpen(false); resetForm() }, 3000)
    } catch {
      setPhase('form')
      setError('Gửi thất bại. Vui lòng thử lại.')
    }
  }

  return createPortal(
    <>
      {/* FAB button */}
      <button
        className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
        onClick={() => { setOpen(o => !o); if (!open) resetForm() }}
        title="Gửi phản hồi"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Panel */}
      {open && (
        <div className={styles.panel}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.avatar}>💬</div>
              <div>
                <div className={styles.headerTitle}>Gửi phản hồi</div>
                <div className={styles.headerSub}>Ý kiến của bạn giúp chúng tôi cải thiện</div>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setOpen(false)}><X size={15} /></button>
          </div>

          {phase === 'done' ? (
            <div className={styles.done}>
              <div className={styles.doneIcon}><CheckCircle size={40} /></div>
              <div className={styles.doneTitle}>Cảm ơn bạn! 🙏</div>
              <div className={styles.doneSub}>Phản hồi của bạn đã được gửi. Chúng tôi sẽ xem xét sớm nhất có thể.</div>
            </div>
          ) : (
            <div className={styles.body}>
              {/* Type selector */}
              <div className={styles.typeRow}>
                {TYPES.map(t => (
                  <button
                    key={t.value}
                    className={`${styles.typeBtn} ${type === t.value ? styles.typeBtnActive : ''}`}
                    onClick={() => setType(t.value)}
                    disabled={phase === 'sending'}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>

              {/* Name */}
              <input
                className={styles.input}
                placeholder="Tên của bạn (không bắt buộc)"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={phase === 'sending'}
                maxLength={50}
              />

              {/* Message */}
              <textarea
                className={styles.textarea}
                placeholder={
                  type === 'bug'     ? 'Mô tả lỗi bạn gặp phải...' :
                  type === 'feature' ? 'Tính năng bạn muốn có...' :
                                       'Nội dung phản hồi của bạn...'
                }
                value={message}
                onChange={e => setMessage(e.target.value)}
                disabled={phase === 'sending'}
                maxLength={1000}
                rows={4}
              />
              <div className={styles.charCount}>{message.length}/1000</div>

              {error && <div className={styles.errorMsg}>{error}</div>}

              <button
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={phase === 'sending' || !message.trim()}
              >
                {phase === 'sending' ? (
                  <><span className={styles.spinner} /> Đang gửi...</>
                ) : (
                  <><Send size={14} /> Gửi phản hồi</>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </>,
    document.body
  )
}
