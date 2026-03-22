import React, { useState } from 'react'
import SEO from '../components/shared/SEO.jsx'
import { Mail, MessageCircle, Bug, Lightbulb, HelpCircle, Send, CheckCircle } from 'lucide-react'
import styles from './Contact.module.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const TOPICS = [
  { value: 'bug',     icon: <Bug size={16}/>,         label: 'Báo lỗi',        sub: 'Tính năng không hoạt động' },
  { value: 'feature', icon: <Lightbulb size={16}/>,   label: 'Đề xuất tính năng', sub: 'Ý tưởng cải thiện' },
  { value: 'other',   icon: <HelpCircle size={16}/>,  label: 'Câu hỏi khác',   sub: 'Thắc mắc chung' },
]

export default function Contact() {
  const [type,    setType]    = useState('bug')
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!message.trim()) { setError('Vui lòng nhập nội dung.'); return }
    setSending(true); setError('')
    try {
      const res = await fetch(`${API_BASE}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, name: name.trim(), email: email.trim(), message: message.trim() }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error)
      setSent(true)
    } catch {
      setError('Gửi thất bại. Hãy thử lại hoặc dùng nút chat 💬 ở góc màn hình.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <SEO
        title="Liên hệ – SnapLoad"
        description="Liên hệ với SnapLoad để báo lỗi, đề xuất tính năng hoặc đặt câu hỏi."
      />
      <div className={styles.page}>
        <div className={`container ${styles.inner}`}>

          <div className={styles.header}>
            <span className={styles.label}>Hỗ trợ</span>
            <h1 className={styles.title}>Liên hệ</h1>
            <p className={styles.sub}>Chúng tôi đọc và phản hồi mọi tin nhắn.</p>
          </div>

          <div className={styles.layout}>

            {/* Left: form */}
            <div className={styles.formCard}>
              {sent ? (
                <div className={styles.successState}>
                  <CheckCircle size={48} className={styles.successIcon} />
                  <h2>Cảm ơn bạn! 🙏</h2>
                  <p>Tin nhắn của bạn đã được gửi. Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
                  <button className={styles.resetBtn} onClick={() => { setSent(false); setMessage(''); setName(''); setEmail('') }}>
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Topic */}
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Chủ đề</label>
                    <div className={styles.topicGrid}>
                      {TOPICS.map(t => (
                        <button
                          key={t.value}
                          type="button"
                          className={`${styles.topicBtn} ${type === t.value ? styles.topicBtnActive : ''}`}
                          onClick={() => setType(t.value)}
                        >
                          {t.icon}
                          <span className={styles.topicLabel}>{t.label}</span>
                          <span className={styles.topicSub}>{t.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Tên (không bắt buộc)</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Tên của bạn"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      maxLength={50}
                    />
                  </div>

                  {/* Email */}
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Email (để nhận phản hồi)</label>
                    <input
                      className={styles.input}
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      maxLength={100}
                    />
                  </div>

                  {/* Message */}
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Nội dung *</label>
                    <textarea
                      className={styles.textarea}
                      placeholder={
                        type === 'bug'
                          ? 'Mô tả lỗi bạn gặp: link video, định dạng, thông báo lỗi...'
                          : type === 'feature'
                          ? 'Tính năng bạn muốn có...'
                          : 'Câu hỏi hoặc góp ý của bạn...'
                      }
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={5}
                      maxLength={1000}
                      required
                    />
                    <div className={styles.charCount}>{message.length}/1000</div>
                  </div>

                  {error && <div className={styles.errorMsg}>{error}</div>}

                  <button className={styles.submitBtn} type="submit" disabled={sending}>
                    {sending
                      ? <><span className={styles.spinner}/> Đang gửi…</>
                      : <><Send size={15}/> Gửi tin nhắn</>
                    }
                  </button>
                </form>
              )}
            </div>

            {/* Right: info */}
            <div className={styles.infoCol}>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}><MessageCircle size={22}/></div>
                <h3>Chat trực tiếp</h3>
                <p>Nhấn nút 💬 ở góc phải màn hình để gửi phản hồi ngay — nhanh hơn email.</p>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}><Mail size={22}/></div>
                <h3>Thời gian phản hồi</h3>
                <p>Thường trong vòng 24–48 giờ. Các báo lỗi nghiêm trọng được ưu tiên xử lý trước.</p>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}><HelpCircle size={22}/></div>
                <h3>Câu hỏi thường gặp</h3>
                <p>Nhiều câu hỏi đã có sẵn câu trả lời trong <a href="/#faq">FAQ</a> trên trang chủ.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
