import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, AlertCircle, X, Music, Video, Repeat, FolderOpen, Link, Layers, ListVideo } from 'lucide-react'
import { showToast } from '../shared/Toast.jsx'
import { detectDevice, smartDownload } from '../../hooks/useDeviceDownload.js'
import { downloaderConfig } from '../../data/downloaderConfig.js'
import StatusBanner from '../shared/StatusBanner.jsx'
import { DonateTrigger } from '../shared/DonateModal.jsx'
import BatchDownload    from './BatchDownload.jsx'
import ID3Editor       from './ID3Editor.jsx'
import PlaylistDownload from './PlaylistDownload.jsx'
import styles from './Hero.module.css'

// ── API base — trỏ tới backend server ────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// ── Platform → Tool slug mapping ─────────────────────────────
const PLATFORM_REDIRECTS = [
  { match: ['tiktok.com'],                   slug: 'tiktok-downloader' },
  { match: ['instagram.com'],                slug: 'instagram-downloader' },
  { match: ['twitter.com', 'x.com'],         slug: 'twitter-downloader' },
  { match: ['facebook.com', 'fb.watch'],     slug: 'facebook-downloader' },
  { match: ['vimeo.com'],                    slug: 'audio-extractor' },
  { match: ['reddit.com'],                   slug: 'audio-extractor' },
]

function getPlatformRedirect(url) {
  try {
    const host = new URL(url).hostname.toLowerCase().replace('www.', '')
    for (const { match, slug } of PLATFORM_REDIRECTS) {
      if (match.some(m => host.includes(m))) return slug
    }
  } catch {}
  return null // YouTube or unknown → stay on hero
}

// ── Format tabs ───────────────────────────────────────────────
// Build FORMAT_TABS — reads localStorage first (live admin changes), falls back to static file
const ICON_MAP = { mp3: <Music size={14}/>, mp4: <Video size={14}/>, convert: <Repeat size={14}/>, batch: <Layers size={14}/>, playlist: <ListVideo size={14}/> }

function getLiveConfig() {
  try {
    // Same-origin localStorage (works on production Cloudflare Pages)
    const stored = localStorage.getItem('snapload_dl_config')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed?.tabs) return parsed
    }
  } catch {}
  return downloaderConfig
}

// Background fetch from admin server (local dev only)
async function fetchLiveConfigFromAdmin() {
  if (location.hostname !== 'localhost') return null  // skip on production
  try {
    const res = await fetch('http://localhost:3001/api/dl-config', { signal: AbortSignal.timeout(1000) })
    if (!res.ok) return null
    const data = await res.json()
    if (data?.ok && data?.config?.tabs) return data.config
  } catch {}
  return null
}

function buildFormatTabs(cfg) {
  const tabOrder = ['mp3', 'mp4', 'convert', 'batch', 'playlist']
  const allTabs = {
    // Defaults for tabs not in config
    batch:    { enabled: true, label: 'Batch',    sub: 'Nhiều link cùng lúc', deviceStatus: null },
    playlist: { enabled: true, label: 'Playlist', sub: 'YouTube playlist',    deviceStatus: null },
    // Override with config values
    ...(cfg.tabs || {}),
  }
  // Render in fixed order, dedup by key
  return tabOrder
    .filter(key => allTabs[key]?.enabled !== false)
    .map(key => ({
      value:        key,
      label:        allTabs[key]?.label || key,
      icon:         ICON_MAP[key],
      sub:          allTabs[key]?.sub || '',
      deviceStatus: allTabs[key]?.deviceStatus || null,
    }))
}

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
  try {
    const u = new URL(str)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false
    const h = u.hostname.toLowerCase()
    // Block private/local addresses
    if (h === 'localhost' || h === '127.0.0.1' || h === '0.0.0.0') return false
    if (/^10\./.test(h) || /^192\.168\./.test(h)) return false
    if (!h.includes('.')) return false // must have a TLD
    return true
  } catch { return false }
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
  const [donateOpen,     setDonateOpen]     = useState(false)
  const [dlProgress,     setDlProgress]     = useState(null)   // null | 'fetching' | 0-100 | 'saving'
  const [iosInstruction, setIosInstruction] = useState(null)   // null | { show, steps }
  const device   = detectDevice()
  const navigate  = useNavigate()
  const [liveConfig,  setLiveConfig]  = useState(() => getLiveConfig())
  const FORMAT_TABS = buildFormatTabs(liveConfig)

  // Computed: effective status of currently selected tab for this device
  function getActiveTabStatus() {
    if (format === 'batch' || format === 'playlist') return 'active'
    const tab = FORMAT_TABS.find(t => t.value === format)
    const deviceKey = device.isIOS ? 'ios' : device.isAndroid ? 'android' : 'desktop'
    return tab?.deviceStatus?.[deviceKey] || 'active'
  }

  // Sync config: localStorage (same-origin) + admin server poll (local dev)
  useEffect(() => {
    // 1. localStorage events (production: Cloudflare same origin)
    function onStorage(e) {
      if (e.key === 'snapload_dl_config') setLiveConfig(getLiveConfig())
    }
    window.addEventListener('storage', onStorage)

    // 2. Poll admin server every 3s (local dev: different ports)
    let interval = null
    fetchLiveConfigFromAdmin().then(cfg => {
      if (cfg) setLiveConfig(cfg)
    })
    interval = setInterval(async () => {
      const cfg = await fetchLiveConfigFromAdmin()
      if (cfg) setLiveConfig(cfg)
    }, 3000)

    return () => {
      window.removeEventListener('storage', onStorage)
      clearInterval(interval)
    }
  }, [])
  const inputRef  = useRef(null)
  const timersRef = useRef([])
  const fileRef   = useRef(null)

  // Sync quality when format changes
  useEffect(() => {
    if (QUALITY_OPTIONS[format]) setQuality(QUALITY_OPTIONS[format][0].value)
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

    // ── Redirect non-YouTube URLs to the matching tool page ──
    const redirectSlug = getPlatformRedirect(trimmed)
    if (redirectSlug) {
      showToast('🔀 Đang chuyển bạn đến công cụ phù hợp…')
      // Encode URL so tool page can auto-fill it
      navigate(`/tool/${redirectSlug}?url=${encodeURIComponent(trimmed)}`)
      return
    }

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

  // ── Smart download — handles iOS / Android / Desktop ─────────
  async function handleDownload(option) {
    const rawUrl = option.downloadUrl || buildDownloadUrl((inputRef.current?.value || url).trim(), option.format, option.value)
    const dlUrl  = rawUrl.startsWith('/') ? API_BASE + rawUrl : rawUrl
    const title  = results?.title || 'snapload'
    const fname  = title.replace(/[^\w\s-]/g, '').trim().slice(0, 60) || 'snapload'

    setIosInstruction(null)

    await smartDownload({
      url:      dlUrl,
      filename: fname,
      format:   option.format,

      onProgress: (stage, pct) => {
        if (stage === 'fetching' || stage === 'opening') {
          setDlProgress('fetching')
          showToast(`⏳ Đang chuẩn bị tải ${option.format.toUpperCase()}…`)
        } else if (stage === 'saving') {
          setDlProgress('saving')
        } else if (typeof pct === 'number') {
          setDlProgress(pct)
        }
      },

      onSuccess: ({ device: dev }) => {
        setDlProgress(null)
        if (dev === 'ios') {
          showToast('📂 Đã mở — làm theo hướng dẫn để lưu file')
        } else {
          showToast(`✅ Đã tải ${option.quality} ${option.format.toUpperCase()} thành công!`)
        }
      },

      onError: (msg) => {
        setDlProgress(null)
        showToast(`❌ ${msg || 'Tải thất bại, thử lại nhé'}`, 'error')
      },

      onIOSInstruction: (inst) => {
        setIosInstruction(inst)
      },
    })
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

          {/* ── Device tab status banner ── */}
          {format !== 'batch' && format !== 'playlist' && (() => {
            const activeTab = FORMAT_TABS.find(t => t.value === format)
            const tabDevStatus = activeTab?.deviceStatus?.[device.isIOS ? 'ios' : device.isAndroid ? 'android' : 'desktop']
            if (tabDevStatus === 'coming_soon') return (
              <div className={styles.tabStatusBanner} style={{ background:'rgba(253,203,110,0.12)', border:'1px solid rgba(253,203,110,0.3)', color:'var(--amber)' }}>
                🚧 {format.toUpperCase()} trên {device.isIOS ? 'iOS' : 'Android'} — Coming Soon. Dùng thiết bị khác hoặc thử lại sau.
              </div>
            )
            if (tabDevStatus === 'maintenance') return (
              <div className={styles.tabStatusBanner} style={{ background:'rgba(255,118,117,0.12)', border:'1px solid rgba(255,118,117,0.3)', color:'var(--red)' }}>
                🔧 {format.toUpperCase()} đang bảo trì. Vui lòng thử lại sau.
              </div>
            )
            return null
          })()}

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
          {format !== 'convert' && format !== 'batch' && format !== 'playlist' && (
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
              <button
                className={`${styles.fetchBtn} ${getActiveTabStatus() !== 'active' ? styles.fetchBtnBlocked : ''}`}
                onClick={handleMainAction}
                disabled={isLoading || getActiveTabStatus() !== 'active'}
              >
                {isLoading ? 'Fetching…'
                  : getActiveTabStatus() === 'maintenance' ? '🔧 Đang bảo trì'
                  : getActiveTabStatus() === 'coming_soon'  ? '🚧 Coming Soon'
                  : 'Get File'}
              </button>
            </div>
          )}

          {/* ── Convert tab ── */}
          {format === 'convert' && format !== 'batch' && format !== 'playlist' && (
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
                  <button
                    className={`${styles.fetchBtn} ${getActiveTabStatus() !== 'active' ? styles.fetchBtnBlocked : ''}`}
                    onClick={handleMainAction}
                    disabled={isLoading || getActiveTabStatus() !== 'active'}
                  >
                    {isLoading ? 'Converting…'
                      : getActiveTabStatus() === 'maintenance' ? '🔧 Đang bảo trì'
                      : getActiveTabStatus() === 'coming_soon'  ? '🚧 Coming Soon'
                      : 'Convert'}
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
                    className={`${styles.fetchBtn} ${getActiveTabStatus() !== 'active' ? styles.fetchBtnBlocked : ''}`}
                    onClick={handleMainAction}
                    disabled={isLoading || !convertFile || getActiveTabStatus() !== 'active'}
                    style={{ width: '100%', marginTop: 8, justifyContent: 'center' }}
                  >
                    {isLoading ? 'Đang convert…'
                      : getActiveTabStatus() === 'maintenance' ? '🔧 Đang bảo trì'
                      : getActiveTabStatus() === 'coming_soon'  ? '🚧 Coming Soon'
                      : 'Convert sang MP3'}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Quality selector */}
          {(format !== 'convert' || convertFile || convertMode === 'url') && phase === 'idle' && format !== 'batch' && format !== 'playlist' && (
            <div className={styles.optionsRow}>
              <div className={styles.optionGroup}>
                <label className={styles.optionLabel}>
                  {format === 'mp4' ? 'Resolution' : 'Audio Quality'}
                </label>
                <select className={styles.select} value={quality} onChange={e => setQuality(e.target.value)} disabled={isLoading}>
                  {(QUALITY_OPTIONS[format] || []).map(o => (
                    <option key={o.value} value={o.value}>{o.label} — {o.detail}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* ── States ── */}
          {format !== 'batch' && format !== 'playlist' && phase === 'loading' && (
            <div className={`${styles.stateArea} animate-fade-in`}>
              <div className={styles.progressWrap}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }} />
              </div>
              <p className={styles.progressMsg}>{progressMsg}</p>
            </div>
          )}

          {format !== 'batch' && format !== 'playlist' && phase === 'error' && (
            <div className={`${styles.stateArea} ${styles.errorBox} animate-slide-up`}>
              <AlertCircle size={16} className={styles.errorIcon} />
              <span>{errorMsg}</span>
              <button className={styles.errorDismiss} onClick={reset}><X size={14} /></button>
            </div>
          )}

          {format !== 'batch' && format !== 'playlist' && phase === 'results' && results && (() => {
            const activeTab = FORMAT_TABS.find(t => t.value === format)
            const tabDevStatus = activeTab?.deviceStatus?.[device.isIOS ? 'ios' : device.isAndroid ? 'android' : 'desktop'] || 'active'
            if (tabDevStatus !== 'active') return null  // hide results if tab unavailable
            return (
              <div className={`${styles.stateArea} animate-slide-up`}>
                <ResultCard
                  results={results}
                  onDownload={handleDownload}
                  onReset={reset}
                  dlProgress={dlProgress}
                  iosInstruction={iosInstruction}
                  onCloseIOS={() => setIosInstruction(null)}
                  device={device}
                />
              </div>
            )
          })()}

          {/* Show donate trigger after download */}
          {format !== 'batch' && format !== 'playlist' && phase === 'results' && !donateOpen && (
            <DonateTrigger onOpen={() => setDonateOpen(true)} />
          )}

          {/* ── Batch tab ── */}
          {format === 'batch' && (
            <BatchDownload />
          )}

          {/* ── Playlist tab ── */}
          {format === 'playlist' && (
            <PlaylistDownload />
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

/* ── iOS instruction modal ───────────────────────────────────── */
function IOSModal({ instruction, onClose }) {
  if (!instruction) return null
  const isSafari = instruction.browser === 'safari'
  const steps    = isSafari ? instruction.safariSteps : instruction.chromeSteps

  return (
    <div className={styles.iosOverlay} onClick={onClose}>
      <div className={styles.iosModal} onClick={e => e.stopPropagation()}>
        <div className={styles.iosHeader}>
          <span className={styles.iosLogo}>{isSafari ? '🧭' : '🌐'}</span>
          <div>
            <div className={styles.iosTitle}>Lưu file trên iOS</div>
            <div className={styles.iosSub}>
              {isSafari ? 'Safari' : 'Chrome'} · Làm theo các bước sau
            </div>
          </div>
          <button className={styles.iosClose} onClick={onClose}><X size={16}/></button>
        </div>

        <div className={styles.iosSteps}>
          {steps.map((s, i) => (
            <div key={i} className={styles.iosStep}>
              <div className={styles.iosStepNum}>{i + 1}</div>
              <div className={styles.iosStepIcon}>{s.icon}</div>
              <div className={styles.iosStepText}>{s.text}</div>
            </div>
          ))}
        </div>

        <div className={styles.iosNote}>
          💡 File đang mở trong tab mới. Nếu không thấy → kiểm tra thanh tab phía trên.
        </div>

        <button className={styles.iosBtn} onClick={onClose}>Đã hiểu</button>
      </div>
    </div>
  )
}

/* ── Result card ─────────────────────────────────────────────── */
function ResultCard({ results, onDownload, onReset, dlProgress, iosInstruction, onCloseIOS, device }) {
  return (
    <>
      <div className={styles.resultCard}>
        <div className={styles.resultMeta}>
          {results.thumb ? (
            <img src={results.thumb} alt="" className={styles.resultThumbImg} />
          ) : (
            <div className={styles.resultThumb}><Download size={18} color="var(--text3)" /></div>
          )}
          <div className={styles.resultInfo}>
            <div className={styles.resultTitle}>{results.title}</div>
            <div className={styles.resultPlatform}>
              {results.platform} · {device?.isIOS ? '📱 iOS' : device?.isAndroid ? '📱 Android' : '💻 Desktop'}
            </div>
          </div>
          <button className={styles.resultClose} onClick={onReset} title="Start over"><X size={16} /></button>
        </div>

        {/* Download progress bar */}
        {dlProgress !== null && (
          <div className={styles.dlProgressWrap}>
            <div
              className={styles.dlProgressBar}
              style={{
                width: typeof dlProgress === 'number' ? `${dlProgress}%`
                     : dlProgress === 'saving' ? '100%' : '30%'
              }}
            />
            <span className={styles.dlProgressLabel}>
              {dlProgress === 'connecting' ? 'Đang kết nối…'
               : dlProgress === 'opening'  ? 'Đang mở file…'
               : dlProgress === 'saving'   ? 'Đang lưu…'
               : typeof dlProgress === 'number' ? `Đang tải ${dlProgress}%`
               : 'Đang xử lý…'}
            </span>
          </div>
        )}

        {/* iOS notice banner */}
        {device?.isIOS && (
          <div className={styles.iosBanner}>
            <span>📱</span>
            <span>iOS: File sẽ mở trong tab mới → dùng nút Chia sẻ để lưu</span>
          </div>
        )}

        <div className={styles.resultDivider} />

        <div className={styles.downloadList}>
          {results.options.map(opt => {
            const isActive = dlProgress !== null
            return (
              <div key={opt.value} className={styles.downloadRow}>
                <div className={styles.downloadLeft}>
                  <span className={`${styles.fmtBadge} ${styles[opt.format]}`}>{opt.format.toUpperCase()}</span>
                  <span className={styles.dlQuality}>{opt.quality}</span>
                  {opt.size && <span className={styles.dlSize}>{opt.size}</span>}
                </div>
                <button
                  className={`${styles.dlBtn} ${isActive ? styles.dlBtnLoading : ''}`}
                  onClick={() => !isActive && onDownload(opt)}
                  disabled={isActive}
                >
                  {isActive
                    ? <><span className={styles.dlSpinner}/> {device?.isIOS ? 'Đang mở…' : 'Đang tải…'}</>
                    : <><Download size={13}/> {device?.isIOS ? 'Mở & Lưu' : 'Download'}</>
                  }
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* iOS step-by-step modal */}
      <IOSModal instruction={iosInstruction} onClose={onCloseIOS} />
    </>
  )
}
