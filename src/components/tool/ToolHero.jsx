import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Download, AlertCircle, X, Loader } from 'lucide-react'
import { showToast } from '../shared/Toast.jsx'
import { detectDevice, smartDownload } from '../../hooks/useDeviceDownload.js'
import { downloaderConfig } from '../../data/downloaderConfig.js'
import styles from './ToolHero.module.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const QUALITY_OPTIONS = {
  mp3:  [{ v:'320',l:'320 kbps — Best'},{v:'256',l:'256 kbps'},{v:'192',l:'192 kbps'},{v:'128',l:'128 kbps'}],
  mp4:  [{ v:'2160',l:'4K / 2160p'},{v:'1080',l:'1080p HD'},{v:'720',l:'720p'},{v:'480',l:'480p'}],
  webm: [{ v:'1080',l:'1080p'},{v:'720',l:'720p'},{v:'480',l:'480p'}],
  convert:[{v:'320',l:'320 kbps'},{v:'192',l:'192 kbps'},{v:'128',l:'128 kbps'}],
}

// Check if format is available for this device based on downloaderConfig
function isFormatAvailable(fmt) {
  try {
    const device = detectDevice()
    const deviceKey = device.isIOS ? 'ios' : device.isAndroid ? 'android' : 'desktop'
    const tabCfg = downloaderConfig.tabs?.[fmt]
    if (!tabCfg) return true
    if (tabCfg.enabled === false) return false
    const st = tabCfg.deviceStatus?.[deviceKey] || 'active'
    return st === 'active'
  } catch { return true }
}

function isValidUrl(s) {
  try { const u = new URL(s); return u.protocol === 'http:' || u.protocol === 'https:' } catch { return false }
}

const STEPS = [
  [300, 15, 'Connecting to platform…'],
  [800, 35, 'Fetching video info…'],
  [1400, 55, 'Processing format…'],
  [1900, 75, 'Preparing download links…'],
]

export default function ToolHero({ tool }) {
  const device       = detectDevice()
  const availFmts    = (tool.formats || ['mp3']).filter(isFormatAvailable)
  const defaultFmt   = availFmts[0] || tool.formats[0] || 'mp3'

  const [url,         setUrl]         = useState('')
  const [format,      setFormat]      = useState(defaultFmt)
  const [quality,     setQuality]     = useState(QUALITY_OPTIONS[defaultFmt]?.[0]?.v || '320')
  const [phase,       setPhase]       = useState('idle')
  const [progress,    setProgress]    = useState(0)
  const [progressMsg, setProgressMsg] = useState('')
  const [results,     setResults]     = useState(null)
  const [error,       setError]       = useState('')
  const [dlProgress,  setDlProgress]  = useState(null)
  const inputRef     = useRef()
  const timers       = useRef([])
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const opts = QUALITY_OPTIONS[format]
    if (opts) setQuality(opts[0].v)
  }, [format])

  // Auto-fill URL from ?url= query param (e.g. redirected from hero)
  useEffect(() => {
    const paramUrl = searchParams.get('url')
    if (paramUrl && isValidUrl(paramUrl)) {
      setUrl(paramUrl)
      if (inputRef.current) inputRef.current.value = paramUrl
      // Auto-fetch after a short delay
      setTimeout(() => handleFetch(), 300)
    }
  }, []) // run once on mount

  // Auto-refetch when format changes if URL is already entered and results shown
  const urlRef = useRef('')
  useEffect(() => {
    const currentUrl = inputRef.current?.value?.trim() || url.trim()
    if (currentUrl && isValidUrl(currentUrl) && (phase === 'results' || phase === 'idle') && urlRef.current === currentUrl) {
      handleFetch()
    }
  }, [format]) // eslint-disable-line

  function clearTimers() { timers.current.forEach(clearTimeout); timers.current = [] }

  function reset() {
    clearTimers()
    setPhase('idle'); setProgress(0); setProgressMsg('')
    setResults(null); setError(''); setDlProgress(null)
  }

  async function handleFetch() {
    const val = inputRef.current?.value?.trim() || url.trim()
    if (!val) { setError('Vui lòng paste URL video.'); setPhase('error'); return }
    if (!isValidUrl(val)) { setError('URL không hợp lệ. Phải bắt đầu bằng https://'); setPhase('error'); return }

    // Check format availability
    if (!isFormatAvailable(format)) {
      setError(`🚧 ${format.toUpperCase()} chưa hỗ trợ trên thiết bị này. Hãy thử trên desktop.`)
      setPhase('error')
      return
    }

    urlRef.current = val
    clearTimers(); setPhase('loading'); setResults(null)

    // Fake progress while fetching
    STEPS.forEach(([delay, pct, msg]) => {
      const id = setTimeout(() => { setProgress(pct); setProgressMsg(msg) }, delay)
      timers.current.push(id)
    })

    try {
      const res = await fetch(`${API_BASE}/api/info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: val, format }),
      })
      clearTimers()
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `Server error ${res.status}`)
      }
      const data = await res.json()
      setProgress(100); setProgressMsg('Xong!')

      // Filter options by selected format
      const options = (data.formats || []).filter(f =>
        format === 'mp3' ? f.format === 'mp3'
        : format === 'mp4' ? f.format === 'mp4'
        : true
      )

      setTimeout(() => {
        setResults({
          title:    data.title || 'Video',
          platform: data.platform || '',
          thumb:    data.thumbnail || '',
          duration: data.duration || '',
          options,
        })
        setPhase('results')
      }, 300)
    } catch (err) {
      clearTimers()
      // Fallback: build download URLs without metadata
      const enc = encodeURIComponent(val)
      const fallbackOptions = format === 'mp3'
        ? QUALITY_OPTIONS.mp3.map(o => ({
            format: 'mp3', quality: o.l, value: o.v,
            downloadUrl: `${API_BASE}/api/download?url=${enc}&format=mp3&quality=${o.v}`
          }))
        : QUALITY_OPTIONS.mp4.map(o => ({
            format: 'mp4', quality: o.l, value: o.v,
            downloadUrl: `${API_BASE}/api/download?url=${enc}&format=mp4&quality=${o.v}`
          }))
      setResults({ title: 'Video', platform: '', thumb: '', options: fallbackOptions })
      setPhase('results')
    }
  }

  async function handleDownload(opt) {
    const dlUrl = opt.downloadUrl || `${API_BASE}/api/download?url=${encodeURIComponent(url.trim())}&format=${opt.format}&quality=${opt.value}`

    setDlProgress('fetching')

    await smartDownload({
      url:      dlUrl,
      filename: (results?.title || 'snapload').replace(/[^\w\s-]/g, '').trim().slice(0, 60),
      format:   opt.format,
      onProgress: (stage, pct) => {
        setDlProgress(typeof pct === 'number' ? pct : stage)
      },
      onSuccess: ({ device: dev }) => {
        setDlProgress(null)
        if (dev === 'ios') {
          showToast('📂 Đã mở — làm theo hướng dẫn để lưu file')
        } else {
          showToast(`✅ Đang tải ${opt.quality} ${opt.format.toUpperCase()}!`)
        }
      },
      onError: (msg) => {
        setDlProgress(null)
        showToast(`❌ ${msg || 'Tải thất bại'}`, 'error')
      },
      onIOSInstruction: () => {
        showToast('📱 iOS: File đã mở → nhấn Chia sẻ → Lưu vào Tệp')
      },
    })
  }

  const isLoading = phase === 'loading'

  return (
    <div className={styles.hero} style={{ '--tool-color': tool.color }}>
      <div className={styles.glow} />
      <div className={`container ${styles.inner}`}>

        {/* Tool identity */}
        <div className={styles.toolMeta}>
          <div className={styles.toolIcon} style={{ background: tool.iconBg }}>
            <span style={{ color: tool.iconColor, fontSize: '28px', fontWeight: 700 }}>{tool.icon}</span>
          </div>
          <div>
            <h1 className={styles.toolTitle}>{tool.name}</h1>
            <p className={styles.toolTagline}>{tool.tagline}</p>
          </div>
        </div>

        {/* Widget */}
        <div className={styles.card}>
          <div className={styles.urlRow}>
            <input
              ref={inputRef}
              type="url"
              className={styles.urlInput}
              placeholder={
                tool.platforms?.[0] === 'Instagram'
                  ? 'https://www.instagram.com/reel/...'
                  : tool.platforms?.[0] === 'TikTok'
                  ? 'https://www.tiktok.com/@user/video/...'
                  : tool.platforms?.[0] === 'YouTube'
                  ? 'https://www.youtube.com/watch?v=...'
                  : tool.platforms?.[0] === 'Facebook'
                  ? 'https://www.facebook.com/watch?v=...'
                  : (tool.platforms?.[0] ? `Paste ${tool.platforms[0]} link here…` : 'Paste video URL here…')
              }
              value={url}
              onChange={e => setUrl(e.target.value)}
              onPaste={e => {
                const pasted = e.clipboardData?.getData('text')?.trim()
                if (pasted && isValidUrl(pasted)) {
                  setUrl(pasted)
                  setTimeout(handleFetch, 80)
                }
              }}
              onKeyDown={e => e.key === 'Enter' && handleFetch()}
              autoComplete="off" spellCheck={false}
              disabled={isLoading}
            />
            <button
              className={styles.fetchBtn}
              onClick={handleFetch}
              disabled={isLoading}
            >
              {isLoading ? <><Loader size={14} className={styles.spin}/> Fetching…</> : 'Download'}
            </button>
          </div>

          {/* Format + quality selectors */}
          <div className={styles.optionsRow}>
            {tool.formats.length > 1 && (
              <div className={styles.optionGroup}>
                <label className={styles.optionLabel}>Format</label>
                <select
                  className={styles.select}
                  value={format}
                  onChange={e => {
                    setFormat(e.target.value)
                    // Auto-refetch handled by useEffect above
                  }}
                  disabled={isLoading}
                >
                  {tool.formats.map(f => {
                    const avail = isFormatAvailable(f)
                    return (
                      <option key={f} value={f}>
                        {f.toUpperCase()}{!avail ? ' 🚧' : ''}
                      </option>
                    )
                  })}
                </select>
              </div>
            )}
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>Quality</label>
              <select
                className={styles.select}
                value={quality}
                onChange={e => setQuality(e.target.value)}
                disabled={isLoading}
              >
                {(QUALITY_OPTIONS[format] || QUALITY_OPTIONS.mp3).map(o => (
                  <option key={o.v} value={o.v}>{o.l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Loading state */}
          {phase === 'loading' && (
            <div className={`${styles.state} animate-fade-in`}>
              <div className={styles.progressWrap}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }} />
              </div>
              <p className={styles.progressMsg}>{progressMsg}</p>
            </div>
          )}

          {/* Error state */}
          {phase === 'error' && (
            <div className={`${styles.state} ${styles.errorBox} animate-slide-up`}>
              <AlertCircle size={15} />
              <span>{error}</span>
              <button className={styles.errClose} onClick={reset}><X size={13} /></button>
            </div>
          )}

          {/* Results */}
          {phase === 'results' && results && (
            <div className={`${styles.state} animate-slide-up`}>
              {/* Download progress bar */}
              {dlProgress !== null && (
                <div className={styles.dlProgressWrap}>
                  <div
                    className={styles.dlProgressBar}
                    style={{ width: typeof dlProgress === 'number' ? `${dlProgress}%` : dlProgress === 'saving' ? '100%' : '30%' }}
                  />
                  <span className={styles.dlProgressMsg}>
                    {dlProgress === 'fetching' || dlProgress === 'connecting' ? 'Đang chuẩn bị…'
                      : dlProgress === 'opening' ? 'Đang mở file…'
                      : dlProgress === 'saving'  ? 'Đang lưu…'
                      : typeof dlProgress === 'number' ? `Đang tải ${dlProgress}%`
                      : 'Đang xử lý…'}
                  </span>
                </div>
              )}

              <div className={styles.resultCard}>
                {/* Thumbnail + title */}
                {results.thumb && (
                  <img src={results.thumb} alt="" className={styles.resultThumb} />
                )}
                <div className={styles.resultHeader}>
                  <div>
                    <div className={styles.resultTitle}>{results.title}</div>
                    {results.duration && (
                      <div className={styles.resultMeta}>{results.platform} · {results.duration}</div>
                    )}
                  </div>
                  <button className={styles.resultClose} onClick={reset}><X size={15} /></button>
                </div>

                <div className={styles.resultDivider} />

                <div className={styles.downloadList}>
                  {results.options.map(o => (
                    <div key={o.value} className={styles.downloadRow}>
                      <div className={styles.downloadLeft}>
                        <span className={`${styles.badge} ${styles[o.format]}`}>
                          {o.format.toUpperCase()}
                        </span>
                        <span className={styles.dlQuality}>{o.quality}</span>
                        {o.size && <span className={styles.dlSize}>{o.size}</span>}
                      </div>
                      <button
                        className={`${styles.dlBtn} ${dlProgress !== null ? styles.dlBtnLoading : ''}`}
                        onClick={() => dlProgress === null && handleDownload(o)}
                        disabled={dlProgress !== null}
                      >
                        {dlProgress !== null
                          ? <><span className={styles.dlSpinner}/> {device.isIOS ? 'Đang mở…' : 'Đang tải…'}</>
                          : <><Download size={12}/> {device.isIOS ? 'Mở & Lưu' : 'Download'}</>
                        }
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
