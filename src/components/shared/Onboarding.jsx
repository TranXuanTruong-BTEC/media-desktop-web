import React, { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import {
  X, ArrowRight, ArrowLeft, Music, Video, Repeat,
  Download, AppWindow, CheckCircle, Sparkles, ChevronRight
} from 'lucide-react'
import styles from './Onboarding.module.css'

// ── Storage key ───────────────────────────────────────────────
const STORAGE_KEY = 'snapload_onboarded_v1'

function hasOnboarded() {
  try { return localStorage.getItem(STORAGE_KEY) === 'true' } catch { return false }
}
function markOnboarded() {
  try { localStorage.setItem(STORAGE_KEY, 'true') } catch {}
}

// ── Welcome modal slides ──────────────────────────────────────
const SLIDES = [
  {
    id: 'welcome',
    emoji: '👋',
    title: 'Chào mừng đến với SnapLoad!',
    sub: 'Công cụ download video miễn phí, nhanh nhất',
    content: (
      <div className={styles.featureGrid}>
        {[
          { icon: <Music size={18} />,   color: '#a29bfe', label: 'MP3',     desc: 'Lên đến 320 kbps' },
          { icon: <Video size={18} />,   color: '#00cec9', label: 'MP4',     desc: 'Lên đến 4K'       },
          { icon: <Repeat size={18} />,  color: '#fdcb6e', label: 'Convert', desc: 'MP4 → MP3'        },
        ].map(f => (
          <div key={f.label} className={styles.featureItem}>
            <div className={styles.featureIcon} style={{ color: f.color, background: f.color + '18' }}>
              {f.icon}
            </div>
            <div className={styles.featureLabel}>{f.label}</div>
            <div className={styles.featureDesc}>{f.desc}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'how',
    emoji: '⚡',
    title: '3 bước siêu đơn giản',
    sub: 'Không cần đăng ký, không cần cài đặt',
    content: (
      <div className={styles.stepsList}>
        {[
          { n: '1', icon: '🔗', title: 'Copy link',      desc: 'Copy link video từ YouTube, TikTok, Instagram...' },
          { n: '2', icon: '📋', title: 'Dán vào đây',    desc: 'Dán link vào ô nhập, chọn định dạng MP3 hoặc MP4' },
          { n: '3', icon: '⬇', title: 'Tải về ngay',    desc: 'Bấm Get File — file sẽ tải về trong vài giây'     },
        ].map(s => (
          <div key={s.n} className={styles.stepItem}>
            <div className={styles.stepNum}>{s.n}</div>
            <div className={styles.stepEmoji}>{s.icon}</div>
            <div>
              <div className={styles.stepTitle}>{s.title}</div>
              <div className={styles.stepDesc}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'platforms',
    emoji: '🌍',
    title: 'Hỗ trợ 50+ nền tảng',
    sub: 'Chỉ cần có link là tải được',
    content: (
      <div className={styles.platformsGrid}>
        {[
          { name: 'YouTube',    dot: '#ff4d4d' },
          { name: 'TikTok',     dot: '#69C9D0' },
          { name: 'Instagram',  dot: '#e1306c' },
          { name: 'Facebook',   dot: '#1877f2' },
          { name: 'Twitter/X',  dot: '#1da1f2' },
          { name: 'Reddit',     dot: '#ff4500' },
          { name: 'Vimeo',      dot: '#6772e5' },
          { name: '+40 more',   dot: '#5c5a78' },
        ].map(p => (
          <div key={p.name} className={styles.platformChip}>
            <span className={styles.platformDot} style={{ background: p.dot }} />
            {p.name}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'desktop',
    emoji: '💻',
    title: 'Dùng thường xuyên?',
    sub: 'Thử ngay ứng dụng Desktop miễn phí',
    content: (
      <div className={styles.desktopCard}>
        <div className={styles.desktopLeft}>
          <div className={styles.desktopIcon}>⬇</div>
          <div>
            <div className={styles.desktopName}>Media Desktop App</div>
            <div className={styles.desktopDesc}>
              Download không cần mở trình duyệt, batch download,
              tự động đặt tên file — chạy thẳng trên Windows.
            </div>
            <div className={styles.desktopBadges}>
              <span className={styles.desktopBadge}>Windows</span>
              <span className={styles.desktopBadge}>Miễn phí</span>
              <span className={styles.desktopBadge}>v1.2.4</span>
            </div>
          </div>
        </div>
      </div>
    ),
    cta: { label: '⬇ Tải Desktop App', href: '/tools' },
  },
]

// ── Tour steps (tooltips trỏ vào UI) ─────────────────────────
const TOUR_STEPS = [
  {
    id: 'tabs',
    target: '#downloader .formatTabs, [class*="formatTabs"]',
    title: 'Chọn định dạng',
    desc: 'Chọn MP3 (âm thanh), MP4 (video) hoặc Convert để đổi file MP4 sang MP3.',
    placement: 'bottom',
  },
  {
    id: 'input',
    target: '#downloader input[type="url"], [class*="urlInput"]',
    title: 'Dán link vào đây',
    desc: 'Copy link video từ bất kỳ nền tảng nào rồi dán vào đây. Tự động nhận diện và tải về.',
    placement: 'bottom',
  },
  {
    id: 'button',
    target: '#downloader [class*="fetchBtn"]',
    title: 'Bấm Get File',
    desc: 'Hệ thống sẽ xử lý và hiển thị các tùy chọn chất lượng để bạn chọn tải.',
    placement: 'bottom',
  },
]

// ── Tooltip positioning ───────────────────────────────────────
function getTooltipStyle(rect, placement) {
  if (!rect) return { top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }
  const GAP = 16
  const TW  = 300

  const base = {
    position: 'fixed',
    zIndex: 10000,
    width: TW,
  }

  if (placement === 'bottom') {
    return {
      ...base,
      top:  rect.bottom + GAP,
      left: Math.max(12, Math.min(rect.left + rect.width / 2 - TW / 2, window.innerWidth - TW - 12)),
    }
  }
  if (placement === 'top') {
    return {
      ...base,
      top:  rect.top - GAP - 140,
      left: Math.max(12, Math.min(rect.left + rect.width / 2 - TW / 2, window.innerWidth - TW - 12)),
    }
  }
  return {
    ...base,
    top:  rect.top + rect.height / 2 - 70,
    left: rect.right + GAP,
  }
}

// ── Main Onboarding component ─────────────────────────────────
export default function Onboarding({ forceOpen = false, onClose: onCloseCb }) {
  const [phase,       setPhase]       = useState('idle')   // idle | modal | tour | done
  const [slideIndex,  setSlideIndex]  = useState(0)
  const [tourIndex,   setTourIndex]   = useState(0)
  const [targetRect,  setTargetRect]  = useState(null)
  const [spotlightStyle, setSpotlightStyle] = useState(null)
  const overlayRef = useRef()

  // Auto-start on first visit
  useEffect(() => {
    if (forceOpen || !hasOnboarded()) {
      setTimeout(() => setPhase('modal'), 600)
    }
  }, [forceOpen])

  // Update spotlight when tour step changes
  useEffect(() => {
    if (phase !== 'tour') return
    updateTarget()
  }, [tourIndex, phase])

  function updateTarget() {
    const step = TOUR_STEPS[tourIndex]
    const selectors = step.target.split(',').map(s => s.trim())
    let el = null
    for (const sel of selectors) {
      el = document.querySelector(sel)
      if (el) break
    }
    if (!el) { advanceTour(); return }

    const rect = el.getBoundingClientRect()
    setTargetRect(rect)
    setSpotlightStyle({
      top:    rect.top - 6,
      left:   rect.left - 6,
      width:  rect.width + 12,
      height: rect.height + 12,
    })

    // Scroll into view
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // ── Modal actions ──────────────────────────────────────────
  function nextSlide() {
    if (slideIndex < SLIDES.length - 1) {
      setSlideIndex(i => i + 1)
    } else {
      startTour()
    }
  }

  function prevSlide() {
    if (slideIndex > 0) setSlideIndex(i => i - 1)
  }

  function skipAll() {
    markOnboarded()
    setPhase('idle')
    onCloseCb?.()
  }

  // ── Tour actions ───────────────────────────────────────────
  function startTour() {
    setTourIndex(0)
    setPhase('tour')
  }

  function advanceTour() {
    if (tourIndex < TOUR_STEPS.length - 1) {
      setTourIndex(i => i + 1)
    } else {
      finishTour()
    }
  }

  function finishTour() {
    markOnboarded()
    setPhase('done')
    setTimeout(() => { setPhase('idle'); onCloseCb?.() }, 400)
  }

  if (phase === 'idle' || phase === 'done') return null

  const slide = SLIDES[slideIndex]
  const tourStep = TOUR_STEPS[tourIndex]
  const tooltipStyle = getTooltipStyle(targetRect, tourStep?.placement)

  return createPortal(
    <>
      {/* ── MODAL phase ── */}
      {phase === 'modal' && (
        <div className={styles.modalOverlay} onClick={e => e.target === e.currentTarget && skipAll()}>
          <div className={styles.modal}>

            {/* Skip */}
            <button className={styles.skipBtn} onClick={skipAll}>
              <X size={16} />
            </button>

            {/* Slide dots */}
            <div className={styles.dots}>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === slideIndex ? styles.dotActive : ''}`}
                  onClick={() => setSlideIndex(i)}
                />
              ))}
            </div>

            {/* Slide content */}
            <div className={styles.slide} key={slide.id}>
              <div className={styles.slideEmoji}>{slide.emoji}</div>
              <h2 className={styles.slideTitle}>{slide.title}</h2>
              <p className={styles.slideSub}>{slide.sub}</p>
              <div className={styles.slideContent}>{slide.content}</div>
            </div>

            {/* Actions */}
            <div className={styles.modalFooter}>
              <button
                className={styles.prevBtn}
                onClick={prevSlide}
                style={{ visibility: slideIndex === 0 ? 'hidden' : 'visible' }}
              >
                <ArrowLeft size={14} /> Quay lại
              </button>

              <div className={styles.footerRight}>
                {slide.cta && (
                  <a href={slide.cta.href} className={styles.ctaLink} onClick={skipAll}>
                    {slide.cta.label}
                  </a>
                )}
                <button className={styles.nextBtn} onClick={nextSlide}>
                  {slideIndex === SLIDES.length - 1
                    ? <><Sparkles size={14} /> Bắt đầu thôi!</>
                    : <>Tiếp theo <ArrowRight size={14} /></>
                  }
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── TOUR phase ── */}
      {phase === 'tour' && (
        <>
          {/* Dark overlay with hole */}
          <div className={styles.tourOverlay} onClick={advanceTour}>
            {spotlightStyle && (
              <div
                className={styles.spotlight}
                style={spotlightStyle}
                onClick={e => e.stopPropagation()}
              />
            )}
          </div>

          {/* Tooltip */}
          {tourStep && (
            <div className={styles.tooltip} style={tooltipStyle}>
              {/* Arrow */}
              <div className={`${styles.tooltipArrow} ${styles[`arrow_${tourStep.placement}`]}`} />

              <div className={styles.tooltipHeader}>
                <span className={styles.tooltipStep}>
                  {tourIndex + 1} / {TOUR_STEPS.length}
                </span>
                <button className={styles.tooltipClose} onClick={finishTour}>
                  <X size={13} />
                </button>
              </div>

              <h3 className={styles.tooltipTitle}>{tourStep.title}</h3>
              <p className={styles.tooltipDesc}>{tourStep.desc}</p>

              <div className={styles.tooltipFooter}>
                <button className={styles.tooltipSkip} onClick={finishTour}>
                  Bỏ qua
                </button>
                <div className={styles.tourDots}>
                  {TOUR_STEPS.map((_, i) => (
                    <span key={i} className={`${styles.tourDot} ${i === tourIndex ? styles.tourDotActive : i < tourIndex ? styles.tourDotDone : ''}`} />
                  ))}
                </div>
                <button className={styles.tooltipNext} onClick={advanceTour}>
                  {tourIndex === TOUR_STEPS.length - 1
                    ? <><CheckCircle size={13} /> Xong!</>
                    : <>Tiếp <ChevronRight size={13} /></>
                  }
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>,
    document.body
  )
}

// ── Help button (always visible, re-opens onboarding) ────────
export function OnboardingTrigger() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        className={styles.helpBtn}
        onClick={() => setOpen(true)}
        title="Hướng dẫn sử dụng"
      >
        ?
      </button>
      {open && (
        <Onboarding forceOpen onClose={() => setOpen(false)} />
      )}
    </>
  )
}
