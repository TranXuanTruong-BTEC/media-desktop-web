import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  X, ArrowRight, ArrowLeft, Music, Video, Repeat,
  CheckCircle, Sparkles, ChevronRight, Globe,
  Download, AppWindow, Zap, Shield, Smartphone
} from 'lucide-react'
import styles from './Onboarding.module.css'

// ── Persistence ───────────────────────────────────────────────
const STORAGE_KEY = 'snapload_onboarded_v2'
const LANG_KEY    = 'snapload_lang'

function hasOnboarded()  { try { return localStorage.getItem(STORAGE_KEY) === 'true' } catch { return false } }
function markOnboarded() { try { localStorage.setItem(STORAGE_KEY, 'true') } catch {} }
function getSavedLang()  { try { return localStorage.getItem(LANG_KEY) || null } catch { return null } }
function saveLang(l)     { try { localStorage.setItem(LANG_KEY, l) } catch {} }

// ── i18n strings ──────────────────────────────────────────────
const T = {
  vi: {
    langLabel: '🇻🇳 Tiếng Việt',
    langSelect: 'Chọn ngôn ngữ của bạn',
    langSub:    'Bạn có thể thay đổi sau trong cài đặt',
    welcome:    'Chào mừng đến với SnapLoad!',
    welcomeSub: 'Công cụ download video miễn phí, nhanh nhất',
    features: [
      { icon: 'music',  color: '#a29bfe', label: 'MP3',     desc: 'Âm thanh lên đến 320 kbps' },
      { icon: 'video',  color: '#00cec9', label: 'MP4',     desc: 'Video lên đến 4K'           },
      { icon: 'repeat', color: '#fdcb6e', label: 'Convert', desc: 'Chuyển MP4 sang MP3'        },
    ],
    howTitle:  '3 bước siêu đơn giản',
    howSub:    'Không cần đăng ký, không cần cài đặt',
    steps: [
      { n:'1', e:'🔗', t:'Copy link',   d:'Copy link video từ YouTube, TikTok, Instagram...'        },
      { n:'2', e:'📋', t:'Dán vào đây', d:'Dán link vào ô nhập, chọn định dạng MP3 hoặc MP4'        },
      { n:'3', e:'⬇',  t:'Tải về ngay', d:'Bấm Get File — file tải về trong vài giây'              },
    ],
    platTitle: 'Hỗ trợ 50+ nền tảng',
    platSub:   'Chỉ cần có link là tải được',
    desktopTitle: 'Dùng thường xuyên?',
    desktopSub:   'Thử ngay ứng dụng Desktop miễn phí',
    desktopName:  'Media Desktop App',
    desktopDesc:  'Download không cần mở trình duyệt, batch download, tự động đặt tên file — chạy thẳng trên Windows.',
    desktopCta:   '⬇ Tải Desktop App',
    next:     'Tiếp theo',
    prev:     'Quay lại',
    start:    'Bắt đầu thôi!',
    skip:     'Bỏ qua',
    done:     'Xong!',
    continue: 'Tiếp',
    tour: [
      { t: 'Chọn định dạng',  d: 'Chọn MP3 (âm thanh), MP4 (video) hoặc Convert để chuyển đổi file.' },
      { t: 'Dán link vào đây', d: 'Copy link từ YouTube, TikTok... rồi dán vào đây. Hệ thống tự nhận diện.' },
      { t: 'Bấm Get File',    d: 'Hệ thống xử lý và hiển thị các tùy chọn chất lượng để bạn chọn tải.' },
    ],
  },
  en: {
    langLabel: '🇬🇧 English',
    langSelect: 'Choose your language',
    langSub:    'You can change this later in settings',
    welcome:    'Welcome to SnapLoad!',
    welcomeSub: 'The fastest free video downloader',
    features: [
      { icon: 'music',  color: '#a29bfe', label: 'MP3',     desc: 'Audio up to 320 kbps' },
      { icon: 'video',  color: '#00cec9', label: 'MP4',     desc: 'Video up to 4K'        },
      { icon: 'repeat', color: '#fdcb6e', label: 'Convert', desc: 'MP4 to MP3'            },
    ],
    howTitle:  '3 simple steps',
    howSub:    'No sign-up, no installation needed',
    steps: [
      { n:'1', e:'🔗', t:'Copy the link',  d:'Copy a video link from YouTube, TikTok, Instagram...' },
      { n:'2', e:'📋', t:'Paste it here',  d:'Paste the link, choose MP3 or MP4 format'              },
      { n:'3', e:'⬇',  t:'Download',       d:'Hit Get File — your file is ready in seconds'          },
    ],
    platTitle: 'Supports 50+ platforms',
    platSub:   'Any link works',
    desktopTitle: 'Use it often?',
    desktopSub:   'Try the free Desktop App',
    desktopName:  'Media Desktop App',
    desktopDesc:  'Download without opening a browser, batch download, auto filename — runs natively on Windows.',
    desktopCta:   '⬇ Download Desktop App',
    next:     'Next',
    prev:     'Back',
    start:    "Let's go!",
    skip:     'Skip',
    done:     'Done!',
    continue: 'Next',
    tour: [
      { t: 'Choose format',   d: 'Pick MP3 (audio), MP4 (video), or Convert to change file format.' },
      { t: 'Paste link here', d: 'Paste any video URL here. We auto-detect the platform.'           },
      { t: 'Hit Get File',    d: 'We process the link and show quality options for you to download.' },
    ],
  },
}

const PLATFORMS = [
  { name: 'YouTube', dot: '#ff4d4d' }, { name: 'TikTok', dot: '#69C9D0' },
  { name: 'Instagram', dot: '#e1306c' }, { name: 'Facebook', dot: '#1877f2' },
  { name: 'Twitter/X', dot: '#1da1f2' }, { name: 'Reddit', dot: '#ff4500' },
  { name: 'Vimeo', dot: '#6772e5' }, { name: '+40 more', dot: '#5c5a78' },
]

const ICON_MAP = { music: <Music size={18}/>, video: <Video size={18}/>, repeat: <Repeat size={18}/> }

const TOUR_SELECTORS = [
  '[class*="formatTabs"]',
  '[class*="urlInput"]',
  '[class*="fetchBtn"]',
]

// ── Spotlight positioning ─────────────────────────────────────
function getSpotlight(el) {
  if (!el) return null
  const r = el.getBoundingClientRect()
  return { top: r.top - 8, left: r.left - 8, width: r.width + 16, height: r.height + 16 }
}

function getTooltipPos(el, placement = 'bottom') {
  if (!el) return { top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }
  const r   = el.getBoundingClientRect()
  const TW  = 300
  const GAP = 14
  const left = Math.max(12, Math.min(r.left + r.width / 2 - TW / 2, window.innerWidth - TW - 12))
  return placement === 'bottom'
    ? { position:'fixed', top: r.bottom + GAP, left, width: TW, zIndex: 10001 }
    : { position:'fixed', top: r.top - GAP - 160, left, width: TW, zIndex: 10001 }
}

// ── Main component ────────────────────────────────────────────
export default function Onboarding({ forceOpen = false, onClose: onCloseCb }) {
  const savedLang = getSavedLang()
  const [lang,       setLang]       = useState(savedLang)       // null = not chosen yet
  const [phase,      setPhase]      = useState('idle')          // idle|modal|tour|done
  const [slideIdx,   setSlideIdx]   = useState(0)
  const [tourIdx,    setTourIdx]    = useState(0)
  const [spotlight,  setSpotlight]  = useState(null)
  const [tooltipPos, setTooltipPos] = useState(null)
  const [tourEl,     setTourEl]     = useState(null)

  const t = T[lang] || T.vi   // fallback to vi before lang chosen

  // Build slides array (depends on lang)
  const SLIDES = lang ? [
    { id:'welcome' }, { id:'how' }, { id:'platforms' }, { id:'desktop' },
  ] : [{ id:'lang' }]

  useEffect(() => {
    if (forceOpen || !hasOnboarded()) {
      setTimeout(() => setPhase(savedLang ? 'modal' : 'modal'), 700)
    }
  }, [forceOpen])

  // Tour target update
  useEffect(() => {
    if (phase !== 'tour') return
    const sel = TOUR_SELECTORS[tourIdx]
    const el  = document.querySelector(sel)
    setTourEl(el)
    setSpotlight(getSpotlight(el))
    setTooltipPos(getTooltipPos(el, tourIdx === 0 ? 'bottom' : 'bottom'))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [tourIdx, phase])

  function chooseLang(l) {
    setLang(l)
    saveLang(l)
    setSlideIdx(0)  // reset to welcome slide
  }

  function nextSlide() {
    if (!lang) return  // must choose lang first
    const realSlides = ['welcome','how','platforms','desktop']
    if (slideIdx < realSlides.length - 1) {
      setSlideIdx(i => i + 1)
    } else {
      setTourIdx(0)
      setPhase('tour')
    }
  }

  function prevSlide() {
    if (slideIdx > 0) setSlideIdx(i => i - 1)
  }

  function advanceTour() {
    if (tourIdx < TOUR_SELECTORS.length - 1) {
      setTourIdx(i => i + 1)
    } else {
      markOnboarded()
      setPhase('idle')
      onCloseCb?.()
    }
  }

  function skipAll() {
    if (lang) markOnboarded()
    setPhase('idle')
    onCloseCb?.()
  }

  if (phase === 'idle') return null

  // ── Which slide to show ──────────────────────────────────────
  const slideId = !lang ? 'lang' : ['welcome','how','platforms','desktop'][slideIdx]

  return createPortal(
    <>
      {/* ── MODAL ── */}
      {phase === 'modal' && (
        <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget && lang) skipAll() }}>
          <div className={styles.modal}>
            {/* Top accent bar */}
            <div className={styles.accentBar} />

            {/* Skip */}
            {lang && (
              <button className={styles.skipBtn} onClick={skipAll}>
                <X size={15} />
              </button>
            )}

            {/* Slide dots (only after lang chosen) */}
            {lang && (
              <div className={styles.dots}>
                {['welcome','how','platforms','desktop'].map((_, i) => (
                  <button key={i}
                    className={`${styles.dot} ${i === slideIdx ? styles.dotActive : i < slideIdx ? styles.dotDone : ''}`}
                    onClick={() => setSlideIdx(i)}
                  />
                ))}
              </div>
            )}

            {/* ── LANG SLIDE ── */}
            {slideId === 'lang' && (
              <div className={styles.slide}>
                <div className={styles.slideEmoji}>🌐</div>
                <h2 className={styles.slideTitle}>{t.langSelect}</h2>
                <p className={styles.slideSub}>{t.langSub}</p>
                <div className={styles.langGrid}>
                  {[
                    { code:'vi', flag:'🇻🇳', label:'Tiếng Việt', sub:'Vietnamese' },
                    { code:'en', flag:'🇬🇧', label:'English',    sub:'English'    },
                  ].map(l => (
                    <button key={l.code} className={styles.langBtn} onClick={() => chooseLang(l.code)}>
                      <span className={styles.langFlag}>{l.flag}</span>
                      <span className={styles.langLabel}>{l.label}</span>
                      <span className={styles.langSub}>{l.sub}</span>
                      <ChevronRight size={14} className={styles.langArrow} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── WELCOME SLIDE ── */}
            {slideId === 'welcome' && (
              <div className={styles.slide} key="welcome">
                <div className={styles.slideEmoji}>👋</div>
                <h2 className={styles.slideTitle}>{t.welcome}</h2>
                <p className={styles.slideSub}>{t.welcomeSub}</p>
                <div className={styles.featureGrid}>
                  {t.features.map(f => (
                    <div key={f.label} className={styles.featureItem}>
                      <div className={styles.featureIcon} style={{ color: f.color, background: f.color + '1a' }}>
                        {ICON_MAP[f.icon]}
                      </div>
                      <div className={styles.featureLabel}>{f.label}</div>
                      <div className={styles.featureDesc}>{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── HOW SLIDE ── */}
            {slideId === 'how' && (
              <div className={styles.slide} key="how">
                <div className={styles.slideEmoji}>⚡</div>
                <h2 className={styles.slideTitle}>{t.howTitle}</h2>
                <p className={styles.slideSub}>{t.howSub}</p>
                <div className={styles.stepsList}>
                  {t.steps.map(s => (
                    <div key={s.n} className={styles.stepItem}>
                      <div className={styles.stepNum}>{s.n}</div>
                      <div className={styles.stepEmoji}>{s.e}</div>
                      <div>
                        <div className={styles.stepTitle}>{s.t}</div>
                        <div className={styles.stepDesc}>{s.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── PLATFORMS SLIDE ── */}
            {slideId === 'platforms' && (
              <div className={styles.slide} key="platforms">
                <div className={styles.slideEmoji}>🌍</div>
                <h2 className={styles.slideTitle}>{t.platTitle}</h2>
                <p className={styles.slideSub}>{t.platSub}</p>
                <div className={styles.platformsGrid}>
                  {PLATFORMS.map(p => (
                    <div key={p.name} className={styles.platformChip}>
                      <span className={styles.platformDot} style={{ background: p.dot }} />
                      {p.name}
                    </div>
                  ))}
                </div>
                {/* Trust row */}
                <div className={styles.trustRow}>
                  {['🔒 Không lưu dữ liệu', '⚡ Siêu nhanh', '🆓 Miễn phí 100%'].map(t => (
                    <div key={t} className={styles.trustItem}>{t}</div>
                  ))}
                </div>
              </div>
            )}

            {/* ── DESKTOP SLIDE ── */}
            {slideId === 'desktop' && (
              <div className={styles.slide} key="desktop">
                <div className={styles.slideEmoji}>💻</div>
                <h2 className={styles.slideTitle}>{t.desktopTitle}</h2>
                <p className={styles.slideSub}>{t.desktopSub}</p>
                <div className={styles.desktopCard}>
                  <div className={styles.desktopRow}>
                    <div className={styles.desktopIcon}>⬇</div>
                    <div>
                      <div className={styles.desktopName}>{t.desktopName}</div>
                      <div className={styles.desktopDesc}>{t.desktopDesc}</div>
                      <div className={styles.desktopBadges}>
                        {['Windows', lang === 'vi' ? 'Miễn phí' : 'Free', 'v1.2.4'].map(b => (
                          <span key={b} className={styles.desktopBadge}>{b}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Footer ── */}
            {lang && (
              <div className={styles.modalFooter}>
                <button className={styles.prevBtn} onClick={prevSlide}
                  style={{ visibility: slideIdx === 0 ? 'hidden' : 'visible' }}>
                  <ArrowLeft size={13} /> {t.prev}
                </button>

                <div className={styles.footerCenter}>
                  {/* Language switcher */}
                  <button className={styles.langSwitch} onClick={() => { setLang(null); setSlideIdx(0) }}>
                    <Globe size={12} />
                    {lang === 'vi' ? 'VI' : 'EN'}
                  </button>
                </div>

                <div className={styles.footerRight}>
                  {slideId === 'desktop' && (
                    <a href="/tools" className={styles.ctaLink} onClick={skipAll}>
                      {t.desktopCta}
                    </a>
                  )}
                  <button className={styles.nextBtn} onClick={nextSlide}>
                    {slideIdx === 3
                      ? <><Sparkles size={13} /> {t.start}</>
                      : <>{t.next} <ArrowRight size={13} /></>
                    }
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TOUR ── */}
      {phase === 'tour' && (
        <>
          {/* Overlay */}
          <div className={styles.tourOverlay} onClick={advanceTour}>
            {spotlight && (
              <div className={styles.spotlight} style={spotlight} onClick={e => e.stopPropagation()} />
            )}
          </div>

          {/* Tooltip */}
          {t.tour[tourIdx] && (
            <div className={styles.tooltip} style={tooltipPos}>
              <div className={`${styles.tooltipArrow} ${styles.arrowBottom}`} />

              <div className={styles.tooltipHeader}>
                <span className={styles.tooltipStep}>{tourIdx + 1} / {TOUR_SELECTORS.length}</span>
                <button className={styles.tooltipClose} onClick={skipAll}><X size={13} /></button>
              </div>

              <h3 className={styles.tooltipTitle}>{t.tour[tourIdx].t}</h3>
              <p className={styles.tooltipDesc}>{t.tour[tourIdx].d}</p>

              <div className={styles.tooltipFooter}>
                <button className={styles.tooltipSkip} onClick={skipAll}>{t.skip}</button>
                <div className={styles.tourDots}>
                  {TOUR_SELECTORS.map((_, i) => (
                    <span key={i} className={`${styles.tourDot} ${i === tourIdx ? styles.tourDotActive : i < tourIdx ? styles.tourDotDone : ''}`} />
                  ))}
                </div>
                <button className={styles.tooltipNext} onClick={advanceTour}>
                  {tourIdx === TOUR_SELECTORS.length - 1
                    ? <><CheckCircle size={12} /> {t.done}</>
                    : <>{t.continue} <ChevronRight size={12} /></>
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

// ── Help trigger button ───────────────────────────────────────
export function OnboardingTrigger() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className={styles.helpBtn} onClick={() => setOpen(true)} title="Hướng dẫn sử dụng">?</button>
      {open && <Onboarding forceOpen onClose={() => setOpen(false)} />}
    </>
  )
}
