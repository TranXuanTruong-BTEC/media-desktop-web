import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Heart, X, Coffee, CheckCircle, Share2, ExternalLink } from 'lucide-react'
import styles from './DonateModal.module.css'

// ── Config — đổi thông tin của bạn ở đây ──────────────────────
const DONATE_CONFIG = {
  devName:  'TranXuanTruong',
  message:  'Mình phát triển SnapLoad trong thời gian rảnh. Một khoản nhỏ giúp mình tiếp tục cải thiện tool và ra mắt tính năng mới.',
  thankMsg: 'Sự ủng hộ của bạn giúp mình có thêm động lực để tiếp tục phát triển SnapLoad và ra mắt thêm nhiều tool hữu ích.',

  amounts: [
    { value: 20000,  label: '20.000đ', sub: 'Ly trà đá ☕' },
    { value: 50000,  label: '50.000đ', sub: 'Ly cà phê', default: true },
    { value: 100000, label: '100.000đ', sub: 'Bữa ăn trưa' },
  ],

  methods: [
    {
      id:    'momo',
      label: 'MoMo',
      icon:  '📱',
      // Thay bằng link MoMo của bạn
      url:   'https://me.momo.vn/your-momo-id',
      // Hoặc link QR
      qr:    null,
    },
    {
      id:    'bank',
      label: 'Chuyển khoản',
      icon:  '🏦',
      url:   null,
      // Hiện thông tin tài khoản
      info:  { bank: 'Vietcombank', account: '1234567890', name: 'TRAN XUAN TRUONG' },
    },
    {
      id:    'buymeacoffee',
      label: 'Buy Me Coffee',
      icon:  '☕',
      url:   'https://buymeacoffee.com/your-username',
      qr:    null,
    },
    {
      id:    'paypal',
      label: 'PayPal',
      icon:  '💳',
      url:   'https://paypal.me/your-username',
      qr:    null,
    },
  ],
}

// ── Storage ───────────────────────────────────────────────────
const STORAGE_KEY = 'snapload_donated'
const TRIGGER_KEY = 'snapload_donate_trigger_count'

function getTriggerCount() {
  try { return parseInt(localStorage.getItem(TRIGGER_KEY) || '0') } catch { return 0 }
}
function incrementTrigger() {
  try { localStorage.setItem(TRIGGER_KEY, String(getTriggerCount() + 1)) } catch {}
}
function markDonated() {
  try { localStorage.setItem(STORAGE_KEY, 'true') } catch {}
}
function hasDonated() {
  try { return localStorage.getItem(STORAGE_KEY) === 'true' } catch { return false }
}

// ── Format currency ───────────────────────────────────────────
function fmt(n) {
  return new Intl.NumberFormat('vi-VN').format(n) + 'đ'
}

// ── Trigger Banner (shows after download) ────────────────────
export function DonateTrigger({ onOpen }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show after 2s delay, don't show if already donated
    if (hasDonated()) return
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className={`${styles.trigger} ${visible ? styles.triggerVisible : ''}`}>
      <div className={styles.triggerIcon}>
        <Heart size={16} />
      </div>
      <div className={styles.triggerText}>
        <div className={styles.triggerTitle}>File đã sẵn sàng tải về!</div>
        <div className={styles.triggerSub}>SnapLoad miễn phí hoàn toàn. Ủng hộ dev 1 ly cà phê nhé?</div>
      </div>
      <button
        className={styles.triggerBtn}
        onClick={() => { setVisible(false); onOpen() }}
      >
        Ủng hộ ☕
      </button>
      <button
        className={styles.triggerSkip}
        onClick={() => setVisible(false)}
      >
        <X size={14} />
      </button>
    </div>
  )
}

// ── Main Donate Modal ─────────────────────────────────────────
export default function DonateModal({ open, onClose }) {
  const defaultAmount = DONATE_CONFIG.amounts.find(a => a.default)?.value || DONATE_CONFIG.amounts[1].value
  const [amount,       setAmount]       = useState(defaultAmount)
  const [customAmount, setCustomAmount] = useState('')
  const [method,       setMethod]       = useState(DONATE_CONFIG.methods[0].id)
  const [phase,        setPhase]        = useState('select') // select | confirm | thanks

  const finalAmount = customAmount ? parseInt(customAmount.replace(/\D/g,'')) || 0 : amount
  const selectedMethod = DONATE_CONFIG.methods.find(m => m.id === method)

  function handleDonate() {
    incrementTrigger()

    if (selectedMethod?.url) {
      window.open(selectedMethod.url, '_blank', 'noopener,noreferrer')
    }
    setPhase('thanks')
    markDonated()
  }

  function handleClose() {
    setPhase('select')
    onClose()
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: 'SnapLoad — Download video miễn phí',
        text: 'Tool download MP3/MP4 từ YouTube, TikTok... miễn phí và nhanh!',
        url: window.location.origin,
      })
    } else {
      navigator.clipboard.writeText(window.location.origin)
        .then(() => alert('Đã copy link! Chia sẻ cho bạn bè nhé.'))
    }
  }

  if (!open) return null

  return createPortal(
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && handleClose()}>
      <div className={styles.modal}>

        {/* Close */}
        <button className={styles.closeBtn} onClick={handleClose}>
          <X size={16} />
        </button>

        {/* ── Phase: select ── */}
        {phase === 'select' && (
          <>
            <div className={styles.modalHeader}>
              <div className={styles.modalAvatar}>
                <Heart size={24} />
              </div>
              <h2 className={styles.modalTitle}>Ủng hộ SnapLoad</h2>
              <p className={styles.modalDesc}>{DONATE_CONFIG.message}</p>
            </div>

            <div className={styles.modalBody}>
              {/* Amount */}
              <div className={styles.sectionLabel}>Chọn mức ủng hộ</div>
              <div className={styles.amountGrid}>
                {DONATE_CONFIG.amounts.map(a => (
                  <button
                    key={a.value}
                    className={`${styles.amountBtn} ${amount === a.value && !customAmount ? styles.amountBtnActive : ''}`}
                    onClick={() => { setAmount(a.value); setCustomAmount('') }}
                  >
                    <div className={styles.amountVal}>{a.label}</div>
                    <div className={styles.amountSub}>{a.sub}</div>
                  </button>
                ))}
              </div>

              <input
                className={styles.customInput}
                placeholder="Hoặc nhập số tiền khác (VND)..."
                value={customAmount}
                onChange={e => {
                  const raw = e.target.value.replace(/\D/g,'')
                  setCustomAmount(raw)
                  if (raw) setAmount(0)
                }}
              />

              {/* Method */}
              <div className={styles.sectionLabel}>Phương thức thanh toán</div>
              <div className={styles.methodGrid}>
                {DONATE_CONFIG.methods.map(m => (
                  <button
                    key={m.id}
                    className={`${styles.methodBtn} ${method === m.id ? styles.methodBtnActive : ''}`}
                    onClick={() => setMethod(m.id)}
                  >
                    <span className={styles.methodIcon}>{m.icon}</span>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Bank info */}
              {selectedMethod?.info && (
                <div className={styles.bankInfo}>
                  <div className={styles.bankRow}>
                    <span className={styles.bankKey}>Ngân hàng</span>
                    <span className={styles.bankVal}>{selectedMethod.info.bank}</span>
                  </div>
                  <div className={styles.bankRow}>
                    <span className={styles.bankKey}>Số tài khoản</span>
                    <span className={styles.bankValCopy} onClick={() => navigator.clipboard.writeText(selectedMethod.info.account)}>
                      {selectedMethod.info.account} 📋
                    </span>
                  </div>
                  <div className={styles.bankRow}>
                    <span className={styles.bankKey}>Chủ tài khoản</span>
                    <span className={styles.bankVal}>{selectedMethod.info.name}</span>
                  </div>
                  <div className={styles.bankNote}>
                    Ghi nội dung: <strong>ung ho snapload</strong>
                  </div>
                </div>
              )}

              {/* Donate button */}
              <button className={styles.donateBtn} onClick={handleDonate}>
                <Heart size={16} />
                {selectedMethod?.info
                  ? `Đã chuyển ${finalAmount > 0 ? fmt(finalAmount) : ''}`
                  : `Ủng hộ${finalAmount > 0 ? ' ' + fmt(finalAmount) : ''}`
                }
                {selectedMethod?.url && <ExternalLink size={13} />}
              </button>

              <div className={styles.modalNote}>
                Không bắt buộc · Không thu thêm phí · Cảm ơn bạn rất nhiều 🙏
              </div>
            </div>
          </>
        )}

        {/* ── Phase: thanks ── */}
        {phase === 'thanks' && (
          <div className={styles.thanks}>
            <div className={styles.thanksCheck}>
              <CheckCircle size={32} />
            </div>
            <h2 className={styles.thanksTitle}>Cảm ơn bạn rất nhiều! 🙏</h2>
            <p className={styles.thanksSub}>{DONATE_CONFIG.thankMsg}</p>

            <div className={styles.thanksStats}>
              <div className={styles.thanksStat}>
                <div className={styles.thanksStatNum}>50+</div>
                <div className={styles.thanksStatLabel}>Nền tảng</div>
              </div>
              <div className={styles.thanksStatDiv} />
              <div className={styles.thanksStat}>
                <div className={styles.thanksStatNum}>100%</div>
                <div className={styles.thanksStatLabel}>Miễn phí</div>
              </div>
              <div className={styles.thanksStatDiv} />
              <div className={styles.thanksStat}>
                <div className={styles.thanksStatNum}>∞</div>
                <div className={styles.thanksStatLabel}>Tình yêu</div>
              </div>
            </div>

            <div className={styles.thanksActions}>
              <button className={styles.shareBtn} onClick={handleShare}>
                <Share2 size={14} /> Chia sẻ SnapLoad
              </button>
              <button className={styles.continueBtn} onClick={handleClose}>
                Tiếp tục dùng →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>,
    document.body
  )
}

// ── Donate button for Navbar ──────────────────────────────────
export function DonateNavBtn() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className={styles.navDonateBtn} onClick={() => setOpen(true)}>
        <Heart size={13} /> Ủng hộ
      </button>
      <DonateModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
