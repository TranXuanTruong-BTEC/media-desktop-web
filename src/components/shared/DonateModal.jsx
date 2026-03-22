import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Heart, X, CheckCircle, Share2, AlertCircle } from 'lucide-react'
import styles from './DonateModal.module.css'

// ── Config ─────────────────────────────────────────────────────
const DONATE_CONFIG = {
  // VN users — MoMo QR
  vn: {
    message:  'Mình phát triển SnapLoad trong thời gian rảnh. Một khoản nhỏ giúp mình tiếp tục cải thiện tool và ra mắt tính năng mới.',
    thankMsg: 'Sự ủng hộ của bạn giúp mình có thêm động lực để phát triển thêm nhiều tính năng mới!',
    triggerTitle: 'File đã sẵn sàng!',
    triggerSub:   'SnapLoad miễn phí hoàn toàn. Ủng hộ dev 1 ly cà phê nhé? ☕',
    triggerBtn:   'Ủng hộ',
    method: {
      type:  'momo',
      label: 'MoMo',
      qr:    '/images/momo-qr.png',
      phone: '0912345678',
      name:  'TRAN XUAN TRUONG',
    },
    donateBtn:  'Đã chuyển khoản xong!',
    modalTitle: 'Ủng hộ SnapLoad',
  },

  // International users — PayPal (coming soon)
  intl: {
    message:  'SnapLoad is built in my free time. Even a small contribution helps me keep improving it!',
    thankMsg: "Your support means a lot. I'll keep building great tools for you!",
    triggerTitle: 'Your file is ready!',
    triggerSub:   'SnapLoad is 100% free. Support the developer with a coffee? ☕',
    triggerBtn:   'Support',
    method: {
      type:    'paypal',
      label:   'PayPal',
      url:     'https://paypal.me/your-username',  // ← điền PayPal của bạn sau
      unavailable: true,  // ← đổi thành false khi PayPal sẵn sàng
    },
    donateBtn:  'Donate via PayPal',
    modalTitle: 'Support SnapLoad',
  },
}

// ── Geo detection ──────────────────────────────────────────────
const GEO_CACHE_KEY = 'snapload_geo'

async function detectCountry() {
  try {
    const cached = sessionStorage.getItem(GEO_CACHE_KEY)
    // Validate cached value is a 2-letter country code
    if (cached && /^[A-Z]{2}$/.test(cached)) return cached

    const res  = await fetch('https://ipapi.co/country_code/', { signal: AbortSignal.timeout(3000) })
    if (!res.ok) return 'VN'
    const code = (await res.text()).trim().toUpperCase()
    // Strict validation — must be exactly 2 uppercase letters
    if (/^[A-Z]{2}$/.test(code)) {
      sessionStorage.setItem(GEO_CACHE_KEY, code)
      return code
    }
    return 'VN'
  } catch {
    return 'VN' // safe fallback
  }
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

// ── Trigger Banner (shows after download) ────────────────────
export function DonateTrigger({ onOpen }) {
  const [visible, setVisible] = useState(false)
  const [isVN,    setIsVN]    = useState(true)

  useEffect(() => {
    if (hasDonated()) return
    detectCountry().then(code => {
      setIsVN(code === 'VN')
      setTimeout(() => setVisible(true), 2000)
    })
  }, [])

  if (!visible) return null

  const t = isVN ? DONATE_CONFIG.vn : DONATE_CONFIG.intl

  return (
    <div className={`${styles.trigger} ${visible ? styles.triggerVisible : ''}`}>
      <div className={styles.triggerIcon}>
        <Heart size={16} />
      </div>
      <div className={styles.triggerText}>
        <div className={styles.triggerTitle}>{t.triggerTitle}</div>
        <div className={styles.triggerSub}>{t.triggerSub}</div>
      </div>
      <button
        className={styles.triggerBtn}
        onClick={() => { setVisible(false); onOpen() }}
      >
        {t.triggerBtn} ☕
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
  const [cfg,          setCfg]          = useState(DONATE_CONFIG.vn)  // default VN
  const [geoLoaded,    setGeoLoaded]    = useState(false)

  const [phase,        setPhase]        = useState('select') // select | thanks

  // Detect country on open
  useEffect(() => {
    if (!open) return
    detectCountry().then(code => {
      const isVN = code === 'VN'
      const newCfg = isVN ? DONATE_CONFIG.vn : DONATE_CONFIG.intl
      setCfg(newCfg)

      setGeoLoaded(true)
    })
  }, [open])

  const isVN = cfg === DONATE_CONFIG.vn

  function handleDonate() {
    incrementTrigger()
    if (!isVN && cfg.method?.url && !cfg.method?.unavailable) {
      window.open(cfg.method.url, '_blank', 'noopener,noreferrer')
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
        text: 'Tool download MP3/MP4 từ TikTok, Facebook... miễn phí và nhanh!',
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
              <h2 className={styles.modalTitle}>{cfg.modalTitle}</h2>
              <p className={styles.modalDesc}>{cfg.message}</p>
            </div>

            <div className={styles.modalBody}>


              {/* MoMo QR */}
              <div className={styles.qrSection}>
                <div className={styles.qrHeader}>
                  <span className={styles.qrMethodIcon}>📱</span>
                  <span className={styles.qrMethodLabel}>Quét mã MoMo để thanh toán</span>
                </div>
                <div className={styles.qrBox}>
                  <img
                    src={cfg.method?.qr}
                    alt="MoMo QR Code"
                    className={styles.qrImg}
                    onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
                  />
                  <div className={styles.qrPlaceholder}>
                    <div className={styles.qrPlaceholderGrid}>
                      {Array.from({length:25}).map((_,i)=>(
                        <div key={i} className={styles.qrDot} style={{opacity: Math.random()>0.4?1:0.15}} />
                      ))}
                    </div>
                    <div className={styles.qrPlaceholderText}>Đặt ảnh QR vào<br/>public/images/momo-qr.png</div>
                  </div>
                </div>
                <div className={styles.qrPhone}>
                  <span className={styles.qrPhoneLabel}>Hoặc chuyển tới số</span>
                  <span
                    className={styles.qrPhoneNum}
                    onClick={() => navigator.clipboard.writeText(DONATE_CONFIG.methods[0].phone).then(()=>alert('Đã copy!'))}
                  >
                    {cfg.method?.phone} 📋
                  </span>
                </div>
                <div className={styles.qrName}>{cfg.method?.name}</div>
              </div>

              {/* Donate button */}
              <button
                className={styles.donateBtn}
                onClick={handleDonate}
                disabled={!isVN && cfg.method?.unavailable}
                style={(!isVN && cfg.method?.unavailable) ? {opacity:0.45, cursor:'not-allowed'} : {}}
              >
                <Heart size={16} />
                {isVN ? 'Đã chuyển khoản xong!' : cfg.method?.unavailable ? 'PayPal not available yet' : 'Donate via PayPal'}
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
            <p className={styles.thanksSub}>{cfg.thankMsg}</p>

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
