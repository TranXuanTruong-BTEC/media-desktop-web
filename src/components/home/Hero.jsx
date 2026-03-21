import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Download, AlertCircle, X, Music, Video, Repeat, FolderOpen, Link } from 'lucide-react'
import { showToast } from '../shared/Toast.jsx'
import StatusBanner from '../shared/StatusBanner.jsx'
import { DonateTrigger } from '../shared/DonateModal.jsx'
import styles from './Hero.module.css'

// ── API base — trỏ tới backend server ────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// ── Format tabs ───────────────────────────────────────────────
const FORMAT_TABS = [
  { value: 'mp3',     label: 'MP3',     icon: <Music  size={14}/>, sub: 'Audio only'   },
  { value: 'mp4',     label: 'MP4',     icon: <Video  size={14}/>, sub: 'Video + Audio'},
  { value: 'convert', label: 'Convert', icon: <Repeat size={14}/>, sub: 'MP4 → MP3'    },
]

const QUALITY_OPTIONS = {
  mp3: [
    { value: '320', label: '320 kbps', detail: 'Best quality' },
    { value: '256', label: '256 kbps', detail: 'High quality' },
    { value: '192', label: '192 kbps', detail: 'Standard'     },
    { value: '128', label: '128 kbps', detail: 'Compact'      },
  ],
  mp4: [
    { value: '2160', label: '4K / 2160p', detail: 'Ultra HD' },
    { value: '1080', label: '1080p HD',   detail: 'Full HD'   },
    { value: '720',  label: '720p HD',    detail: 'HD'        },
    { value: '480',  label: '480p',       detail: 'Standard'  },
  ],
  convert: [
    { value: '320', label: '320 kbps', detail: 'Best quality' },
    { value: '192', label: '192 kbps', detail: 'Standard'     },
    { value: '128', label: '128 kbps', detail: 'Compact'      },
  ],
}

const PLATFORMS = [
  { name: 'YouTube',   dot: '#ff4d4d' },
  { name: 'TikTok',    dot: '#69C9D0' },
  { name: 'Instagram', dot: '#e1306c' },
  { name: 'Facebook',  dot: '#1877f2' },
  { name: 'Twitter / X', dot: '#1da1f2' },
  { name: 'Vimeo',     dot: '#6772e5' },
  { name: 'Reddit',    dot: '#ff4500' },
  { name: '+40 more',  dot: '#5c5a78' },
]

function isValidUrl(str) {
  try { const u = new URL(str); return u.protocol === 'http:' || u.protocol === 'https:' }
  catch { return false }
}

// ── REAL download logic ───────────────────────────────────────
async function fetchDownloadInfo(url, format, quality) {
  const res = await fetch(`${API_BASE}/api/info`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, format, quality }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Server error ${res.status}`)
  }
  return res.json()
}

function buildDownloadUrl(url, format, quality) {
  const params = new URLSearchParams({ url, format, quality })
  return `${API_BASE}/api/download?${params}`
}

// ── Progress steps for UX ─────────────────────────────────────
const STEPS = [
  [300,  15, 'Connecting to platform…'],
  [800,  35, 'Fetching video info…'],
  [1400, 55, 'Processing format…'],
  [1900, 75, 'Preparing download link…'],
  [2400, 90, 'Almost ready…'],
]

export default function Hero() {
  const [url,         setUrl]         = useState('')
  const [format,      setFormat]      = useState('mp3')
  const [quality,     setQuality]     = useState('320')
  const [phase,       setPhase]       = useState('idle')
  const [progress,    setProgress]    = useState(0)
  const [progressMsg, setProgressMsg] = useState('')
  const [results,     setResults]     = useState(null)
  const [errorMsg,    setErrorMsg]    = useState('')
  const [convertFile, setConvertFile] = useState(null) // for convert tab
  const [convertMode, setConvertMode]   = useState('url')  // 'url' | 'file'
  const [donateOpen,  setDonateOpen]   = useState(false)
  const inputRef  = useRef(null)
  const timersRef = useRef([])
  const fileRef   = useRef(null)

  // Sync quality when format changes
  useEffect(() => {
    setQuality(QUALITY_OPTIONS[format][0].value)
  }, [format])

  function clearTimers() { timersRef.current.forEach(clearTimeout); timersRef.current = [] }

  function reset() {
    clearTimers()
    setPhase('idle'); setProgress(0); setProgressMsg('')
    setResults(null); setErrorMsg(''); setConvertFile(null)
    setConvertMode('url')
    if (fileRef.current) fileRef.current.value = ''
  }

  // ── Animate progress bar ──────────────────────────────────
  function animateProgress(onDone) {
    setPhase('loading'); setProgress(0)
    STEPS.forEach(([delay, pct, msg]) => {
      const id = setTimeout(() => { setProgress(pct); setProgressMsg(msg) }, delay)
      timersRef.current.push(id)
    })
    return () => clearTimers()
  }

  // ── Fetch info from real API ──────────────────────────────
  async function handleFetch() {
    // Read directly from DOM to avoid stale state from onPaste timing
    const trimmed = (inputRef.current?.value || url).trim()
    if (trimmed) setUrl(trimmed) // sync state
    if (!trimmed) { setErrorMsg('Vui lòng dán link video vào ô trên.'); setPhase('error'); return }
    if (!isValidUrl(trimmed)) { setErrorMsg('Link không hợp lệ. Hãy đảm bảo link bắt đầu bằng https://'); setPhase('error'); return }

    clearTimers()
    animateProgress()

    try {
      const data = await fetchDownloadInfo(trimmed, format, quality)
      clearTimers()
      setProgress(100); setProgressMsg('Done!')

      setTimeout(() => {
        setResults({
          title:    data.title    || 'Video',
          platform: data.platform || 'Web',
          thumb:    data.thumbnail || '',
          duration: data.duration  || '',
          options:  data.formats  || buildFallbackOptions(format, trimmed),
        })
        setPhase('results')
      }, 300)
    } catch (err) {
      clearTimers()
      setErrorMsg(err.message || 'Download failed. Please try again.')
      setPhase('error')
    }
  }

  // Fallback khi backend chưa sẵn sàng
  function buildFallbackOptions(fmt, videoUrl) {
    if (fmt === 'mp3' || fmt === 'convert') {
      return QUALITY_OPTIONS.mp3.map(q => ({
        format: 'mp3', quality: q.label, value: q.value,
        size: '', downloadUrl: buildDownloadUrl(videoUrl, 'mp3', q.value),
      }))
    }
    return QUALITY_OPTIONS.mp4.map(q => ({
      format: 'mp4', quality: q.label, value: q.value,
      size: '', downloadUrl: buildDownloadUrl(videoUrl, 'mp4', q.value),
    }))
  }

  // ── Convert: local MP4 file → MP3 ────────────────────────
  async function handleConvert() {
    if (!convertFile) { setErrorMsg('Vui lòng chọn file MP4 từ máy tính.'); setPhase('error'); return }

    clearTimers(); animateProgress()
    setProgressMsg('Uploading file…')

    try {
      const formData = new FormData()
      formData.append('file', convertFile)
      formData.append('quality', quality)

      const res = await fetch(`${API_BASE}/api/convert`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        const err = await res.json().catch(()=>({}))
        throw new Error(err.error || 'Convert failed')
      }
      const data = await res.json()
      clearTimers(); setProgress(100)
      setTimeout(() => {
        setResults({
          title:    convertFile.name.replace(/\.mp4$/i, ''),
          platform: 'Local file',
          thumb:    '',
          options:  [{ format:'mp3', quality: `${quality} kbps`, value: quality, downloadUrl: data.downloadUrl?.startsWith('/') ? API_BASE + data.downloadUrl : data.downloadUrl, size: data.size }],
        })
        setPhase('results')
      }, 300)
    } catch (err) {
      clearTimers()
      setErrorMsg(err.message || 'Convert failed. Please try again.')
      setPhase('error')
    }
  }

  function handleMainAction() {
    if (format === 'convert' && convertMode === 'file') handleConvert()
    else handleFetch()
  }

  function handlePaste(e) {
    // Use clipboardData for instant value before React re-render
    const pasted = e.clipboardData?.getData('text')?.trim() || ''
    const val = pasted || e.target.value?.trim() || ''
    if (val) setUrl(val)
    // Small delay to let React update, then fetch
    setTimeout(() => {
      const finalVal = inputRef.current?.value?.trim() || val
      if (isValidUrl(finalVal)) {
        setUrl(finalVal)
        handleFetch()
      }
    }, 80)
  }

  // ── Trigger real download ─────────────────────────────────
  function handleDownload(option) {
    const rawUrl = option.downloadUrl || buildDownloadUrl((inputRef.current?.value || url).trim(), option.format, option.value)
    const dlUrl  = rawUrl.startsWith('/') ? API_BASE + rawUrl : rawUrl
    const link  = document.createElement('a')
    link.href     = dlUrl
    link.download = ''
    link.target   = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast(`⬇ Starting ${option.quality} ${option.format.toUpperCase()} download…`)
  }

  const isLoading = phase === 'loading'

  return (
    <section className={styles.hero} id="home">
      <div className={styles.bg} />
      <div className={styles.grid} />

      <div className={`container ${styles.inner}`}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          100% Free · No Sign-up Required
        </div>

        <h1 className={styles.title}>
          Download Any Video as<br />
          <span className="gradient-text">MP3 or MP4</span>
          <br />in Seconds
        </h1>

        <p className={styles.sub}>
          Paste a link from YouTube, TikTok, Instagram, or 50+ platforms.
          <br className={styles.brHide} /> Get high-quality audio or video instantly — for free.
        </p>

        {/* ── Downloader Card ── */}
        <div className={styles.card} id="downloader" style={{ position: 'relative' }}>

          {/* ── Status overlay (set via Admin dashboard) ── */}
          {typeof window !== 'undefined' && (() => {
            try {
              const tools = JSON.parse(localStorage.getItem('sl_admin_downloader') || '[]')
              const blocked = tools.find(t =>
                t.status === 'maintenance' || t.status === 'coming_soon'
              )
              // Only block if ALL tools are non-active (rare), otherwise show per-tool
              return null
            } catch { return null }
          })()}

          {/* Format tabs */}
          <div className={styles.formatTabs}>
            {FORMAT_TABS.map(t => (
              <button
                key={t.value}
                className={`${styles.formatTab} ${format === t.value ? styles.formatTabActive : ''}`}
                onClick={() => { setFormat(t.value); reset() }}
                disabled={isLoading}
              >
                <span className={styles.formatTabIcon}>{t.icon}</span>
                <span className={styles.formatTabLabel}>{t.label}</span>
                <span className={styles.formatTabSub}>{t.sub}</span>
              </button>
            ))}
          </div>

          {/* ── URL input (MP3 / MP4) ── */}
          {format !== 'convert' && (
            <div className={styles.urlRow}>
              <input
                ref={inputRef}
                type="url"
                className={styles.urlInput}
                placeholder="Paste video URL here…"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onPaste={handlePaste}
                onKeyDown={e => e.key === 'Enter' && handleMainAction()}
                autoComplete="off" spellCheck={false}
                disabled={isLoading}
              />
              <button className={styles.fetchBtn} onClick={handleMainAction} disabled={isLoading}>
                {isLoading ? 'Fetching…' : 'Get File'}
              </button>
            </div>
          )}

          {/* ── Convert tab ── */}
          {format === 'convert' && (
            <div className={styles.convertArea}>

              {/* Mode switcher: URL vs File */}
              <div className={styles.convertModeSwitcher}>
                <button
                  className={`${styles.convertModeBtn} ${convertMode === 'url' ? styles.convertModeBtnActive : ''}`}
                  onClick={() => { setConvertMode('url'); setConvertFile(null); reset() }}
                >
                  <Link size={13} /> Dán link video
                </button>
                <button
                  className={`${styles.convertModeBtn} ${convertMode === 'file' ? styles.convertModeBtnActive : ''}`}
                  onClick={() => { setConvertMode('file'); setUrl('') }}
                >
                  <FolderOpen size={13} /> Chọn file MP4
                </button>
              </div>

              {/* URL mode */}
              {convertMode === 'url' && (
                <div className={styles.urlRow}>
                  <input
                    ref={inputRef}
                    type="url"
                    className={styles.urlInput}
                    placeholder="Paste video URL (YouTube, TikTok…)"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleMainAction()}
                    autoComplete="off" spellCheck={false}
                    disabled={isLoading}
                  />
                  <button className={styles.fetchBtn} onClick={handleMainAction} disabled={isLoading}>
                    {isLoading ? 'Converting…' : 'Convert'}
                  </button>
                </div>
              )}

              {/* File mode */}
              {convertMode === 'file' && (
                <>
                  <div
                    className={`${styles.dropZone} ${convertFile ? styles.dropZoneFilled : ''}`}
                    onClick={() => fileRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add(styles.dropZoneDrag) }}
                    onDragLeave={e => e.currentTarget.classList.remove(styles.dropZoneDrag)}
                    onDrop={e => {
                      e.preventDefault(); e.currentTarget.classList.remove(styles.dropZoneDrag)
                      const f = e.dataTransfer.files[0]
                      if (f?.type === 'video/mp4' || f?.name.endsWith('.mp4') || f?.type.startsWith('video/')) setConvertFile(f)
                      else showToast('Vui lòng chọn file video (MP4, MKV...)', 'error')
                    }}
                  >
                    {convertFile ? (
                      <>
                        <Video size={20} style={{ color: 'var(--green)', flexShrink: 0 }} />
                        <div className={styles.dropZoneFile}>
                          <div className={styles.dropZoneFileName}>{convertFile.name}</div>
                          <div className={styles.dropZoneFileSize}>{(convertFile.size / 1024 / 1024).toFixed(1)} MB</div>
                        </div>
                        <button className={styles.dropZoneClear} onClick={e => { e.stopPropagation(); setConvertFile(null) }}>
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <>
                        <FolderOpen size={20} style={{ color: 'var(--text3)' }} />
                        <div>
                          <div className={styles.dropZoneText}>Kéo thả file vào đây</div>
                          <div className={styles.dropZoneSub}>hoặc click để chọn từ máy tính</div>
                          <div className={styles.dropZoneSub} style={{ marginTop: 2 }}>MP4 · MKV · AVI · MOV</div>
                        </div>
                      </>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="video/*" style={{ display:'none' }}
                    onChange={e => setConvertFile(e.target.files[0] || null)} />
                  <button
                    className={styles.fetchBtn}
                    onClick={handleMainAction}
                    disabled={isLoading || !convertFile}
                    style={{ width: '100%', marginTop: 8, justifyContent: 'center' }}
                  >
                    {isLoading ? 'Đang convert…' : 'Convert sang MP3'}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Quality selector */}
          {(format !== 'convert' || convertFile || convertMode === 'url') && phase === 'idle' && (
            <div className={styles.optionsRow}>
              <div className={styles.optionGroup}>
                <label className={styles.optionLabel}>
                  {format === 'mp4' ? 'Resolution' : 'Audio Quality'}
                </label>
                <select className={styles.select} value={quality} onChange={e => setQuality(e.target.value)} disabled={isLoading}>
                  {QUALITY_OPTIONS[format].map(o => (
                    <option key={o.value} value={o.value}>{o.label} — {o.detail}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* ── States ── */}
          {phase === 'loading' && (
            <div className={`${styles.stateArea} animate-fade-in`}>
              <div className={styles.progressWrap}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }} />
              </div>
              <p className={styles.progressMsg}>{progressMsg}</p>
            </div>
          )}

          {phase === 'error' && (
            <div className={`${styles.stateArea} ${styles.errorBox} animate-slide-up`}>
              <AlertCircle size={16} className={styles.errorIcon} />
              <span>{errorMsg}</span>
              <button className={styles.errorDismiss} onClick={reset}><X size={14} /></button>
            </div>
          )}

          {phase === 'results' && results && (
            <div className={`${styles.stateArea} animate-slide-up`}>
              <ResultCard results={results} onDownload={handleDownload} onReset={reset} />
            </div>
          )}

          {/* Show donate trigger after download */}
          {phase === 'results' && !donateOpen && (
            <DonateTrigger onOpen={() => setDonateOpen(true)} />
          )}

          {/* Trust strip */}
          <div className={styles.trustStrip}>
            {['No account needed','No watermarks','No data stored','SSL encrypted'].map(t => (
              <div key={t} className={styles.trustItem}>
                <span className={styles.trustCheck}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Platform chips */}
        <div className={styles.platforms}>
          <span className={styles.platformsLabel}>Works with</span>
          {PLATFORMS.map(p => (
            <div key={p.name} className={styles.chip}>
              <span className={styles.chipDot} style={{ background: p.dot }} />
              {p.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Result card ─────────────────────────────────────────────── */
function ResultCard({ results, onDownload, onReset }) {
  return (
    <div className={styles.resultCard}>
      <div className={styles.resultMeta}>
        {results.thumb ? (
          <img src={results.thumb} alt="" className={styles.resultThumbImg} />
        ) : (
          <div className={styles.resultThumb}><Download size={18} color="var(--text3)" /></div>
        )}
        <div className={styles.resultInfo}>
          <div className={styles.resultTitle}>{results.title}</div>
          <div className={styles.resultPlatform}>{results.platform} · Ready to download</div>
        </div>
        <button className={styles.resultClose} onClick={onReset} title="Start over"><X size={16} /></button>
      </div>

      <div className={styles.resultDivider} />

      <div className={styles.downloadList}>
        {results.options.map(opt => (
          <div key={opt.value} className={styles.downloadRow}>
            <div className={styles.downloadLeft}>
              <span className={`${styles.fmtBadge} ${styles[opt.format]}`}>{opt.format.toUpperCase()}</span>
              <span className={styles.dlQuality}>{opt.quality}</span>
              {opt.size && <span className={styles.dlSize}>{opt.size}</span>}
            </div>
            <button className={styles.dlBtn} onClick={() => onDownload(opt)}>
              <Download size={13} /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
