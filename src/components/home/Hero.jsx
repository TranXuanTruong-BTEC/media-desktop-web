import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Download, AlertCircle, X } from 'lucide-react'
import { showToast } from '../shared/Toast.jsx'
import styles from './Hero.module.css'

/* ── Quality options by format ─────────────────── */
const QUALITY_OPTIONS = {
  mp3: [
    { value: '320', label: '320 kbps', detail: 'Best quality' },
    { value: '256', label: '256 kbps', detail: 'High quality' },
    { value: '192', label: '192 kbps', detail: 'Standard' },
    { value: '128', label: '128 kbps', detail: 'Compact' },
  ],
  mp4: [
    { value: '2160', label: '4K / 2160p', detail: 'Ultra HD' },
    { value: '1080', label: '1080p HD', detail: 'Full HD' },
    { value: '720', label: '720p HD', detail: 'HD' },
    { value: '480', label: '480p', detail: 'Standard' },
  ],
  webm: [
    { value: '1080', label: '1080p', detail: 'Full HD' },
    { value: '720', label: '720p', detail: 'HD' },
    { value: '480', label: '480p', detail: 'Standard' },
  ],
}

const FORMAT_OPTIONS = [
  { value: 'mp3', label: 'MP3', sub: 'Audio only' },
  { value: 'mp4', label: 'MP4', sub: 'Video + Audio' },
  { value: 'webm', label: 'WebM', sub: 'Video + Audio' },
]

const PLATFORMS = [
  { name: 'YouTube', dot: '#ff4d4d' },
  { name: 'TikTok', dot: '#69C9D0' },
  { name: 'Instagram', dot: '#e1306c' },
  { name: 'Facebook', dot: '#1877f2' },
  { name: 'Twitter / X', dot: '#1da1f2' },
  { name: 'Vimeo', dot: '#6772e5' },
  { name: 'Reddit', dot: '#ff4500' },
  { name: '+40 more', dot: '#5c5a78' },
]

function isValidUrl(str) {
  try {
    const u = new URL(str)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch { return false }
}

function detectPlatform(url) {
  const map = [
    ['youtu', 'YouTube'], ['tiktok', 'TikTok'],
    ['instagram', 'Instagram'], ['facebook', 'Facebook'],
    ['twitter', 'Twitter/X'], ['x.com', 'Twitter/X'],
    ['reddit', 'Reddit'], ['vimeo', 'Vimeo'],
  ]
  for (const [key, name] of map) {
    if (url.includes(key)) return name
  }
  return 'this platform'
}

/* ── Download result mock data ─────────────────── */
function getMockResults(format, platform) {
  const titles = {
    YouTube: 'Amazing Video Title – Official Music Video',
    TikTok: 'Viral TikTok Video',
    Instagram: 'Instagram Reel',
    'Twitter/X': 'Twitter/X Video',
    Facebook: 'Facebook Video',
    Reddit: 'Reddit Video Post',
    Vimeo: 'Vimeo Creator Upload',
    'this platform': 'Video File',
  }
  const title = titles[platform] || 'Video File'

  if (format === 'mp3') {
    return {
      title,
      platform,
      options: [
        { format: 'mp3', quality: '320 kbps', size: '~8.5 MB/min', value: '320' },
        { format: 'mp3', quality: '256 kbps', size: '~6.8 MB/min', value: '256' },
        { format: 'mp3', quality: '192 kbps', size: '~5.1 MB/min', value: '192' },
        { format: 'mp3', quality: '128 kbps', size: '~3.4 MB/min', value: '128' },
      ],
    }
  }
  return {
    title,
    platform,
    options: [
      { format, quality: '4K / 2160p', size: '~600 MB', value: '2160' },
      { format, quality: '1080p HD', size: '~200 MB', value: '1080' },
      { format, quality: '720p HD', size: '~100 MB', value: '720' },
      { format, quality: '480p', size: '~50 MB', value: '480' },
    ],
  }
}

/* ── Loading steps ──────────────────────────────── */
const STEPS = [
  [350, 18, 'Connecting…'],
  [750, 40, 'Fetching video metadata…'],
  [1200, 65, 'Processing format options…'],
  [1700, 85, 'Preparing download links…'],
  [2100, 100, 'Done!'],
]

export default function Hero() {
  const [url, setUrl] = useState('')
  const [format, setFormat] = useState('mp3')
  const [quality, setQuality] = useState('320')
  const [phase, setPhase] = useState('idle') // idle | loading | results | error
  const [progress, setProgress] = useState(0)
  const [progressMsg, setProgressMsg] = useState('')
  const [results, setResults] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef(null)
  const timersRef = useRef([])

  /* Reset quality when format changes */
  useEffect(() => {
    const opts = QUALITY_OPTIONS[format]
    setQuality(opts[0].value)
  }, [format])

  function clearTimers() {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  function reset() {
    clearTimers()
    setPhase('idle')
    setProgress(0)
    setProgressMsg('')
    setResults(null)
    setErrorMsg('')
  }

  function handleFetch() {
    const trimmed = url.trim()
    if (!trimmed) {
      setErrorMsg('Please paste a video URL to continue.')
      setPhase('error')
      return
    }
    if (!isValidUrl(trimmed)) {
      setErrorMsg("That doesn't look like a valid URL. Make sure it starts with https://")
      setPhase('error')
      return
    }

    clearTimers()
    setPhase('loading')
    setProgress(0)

    const platform = detectPlatform(trimmed)

    STEPS.forEach(([delay, pct, msg]) => {
      const id = setTimeout(() => {
        setProgress(pct)
        setProgressMsg(msg)
      }, delay)
      timersRef.current.push(id)
    })

    const doneId = setTimeout(() => {
      setResults(getMockResults(format, platform))
      setPhase('results')
    }, 2400)
    timersRef.current.push(doneId)
  }

  function handlePaste(e) {
    setTimeout(() => {
      const val = e.target.value.trim()
      if (isValidUrl(val)) handleFetch()
    }, 50)
  }

  function handleDownload(option) {
    // In production: trigger real download URL
    showToast(`Starting ${option.quality} ${option.format.toUpperCase()} download…`)
  }

  return (
    <section className={styles.hero} id="home">
      {/* Atmospheric background */}
      <div className={styles.bg} />
      <div className={styles.grid} />

      <div className={`container ${styles.inner}`}>
        {/* Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          100% Free · No Sign-up Required
        </div>

        {/* Headline */}
        <h1 className={styles.title}>
          Download Any Video as<br />
          <span className="gradient-text">MP3 or MP4</span>
          <br />in Seconds
        </h1>

        <p className={styles.sub}>
          Paste a link from YouTube, TikTok, Instagram, or 50+ platforms.
          <br className={styles.brHide} /> Get high-quality audio or video instantly — for free.
        </p>

        {/* ── Downloader card ── */}
        <div className={styles.card} id="downloader">
          {/* URL row */}
          <div className={styles.urlRow}>
            <input
              ref={inputRef}
              type="url"
              className={styles.urlInput}
              placeholder="Paste video URL here…"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onPaste={handlePaste}
              onKeyDown={e => e.key === 'Enter' && handleFetch()}
              autoComplete="off"
              spellCheck={false}
            />
            <button
              className={styles.fetchBtn}
              onClick={handleFetch}
              disabled={phase === 'loading'}
            >
              {phase === 'loading' ? 'Fetching…' : 'Get File'}
            </button>
          </div>

          {/* Format + Quality selectors */}
          <div className={styles.optionsRow}>
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>Format</label>
              <select
                className={styles.select}
                value={format}
                onChange={e => setFormat(e.target.value)}
                disabled={phase === 'loading'}
              >
                {FORMAT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>
                    {o.label} — {o.sub}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>Quality</label>
              <select
                className={styles.select}
                value={quality}
                onChange={e => setQuality(e.target.value)}
                disabled={phase === 'loading'}
              >
                {QUALITY_OPTIONS[format].map(o => (
                  <option key={o.value} value={o.value}>
                    {o.label} — {o.detail}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ── State area ── */}
          {phase === 'loading' && (
            <div className={`${styles.stateArea} animate-fade-in`}>
              <div className={styles.progressWrap}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className={styles.progressMsg}>{progressMsg}</p>
            </div>
          )}

          {phase === 'error' && (
            <div className={`${styles.stateArea} ${styles.errorBox} animate-slide-up`}>
              <AlertCircle size={16} className={styles.errorIcon} />
              <span>{errorMsg}</span>
              <button className={styles.errorDismiss} onClick={reset}>
                <X size={14} />
              </button>
            </div>
          )}

          {phase === 'results' && results && (
            <div className={`${styles.stateArea} animate-slide-up`}>
              <ResultCard results={results} onDownload={handleDownload} onReset={reset} />
            </div>
          )}

          {/* Trust strip */}
          <div className={styles.trustStrip}>
            {['No account needed', 'No watermarks', 'No data stored', 'SSL encrypted'].map(t => (
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

/* ── Result card sub-component ────────────────── */
function ResultCard({ results, onDownload, onReset }) {
  return (
    <div className={styles.resultCard}>
      <div className={styles.resultMeta}>
        <div className={styles.resultThumb}>
          <Download size={20} color="var(--text3)" />
        </div>
        <div className={styles.resultInfo}>
          <div className={styles.resultTitle}>{results.title}</div>
          <div className={styles.resultPlatform}>{results.platform} · Ready to download</div>
        </div>
        <button className={styles.resultClose} onClick={onReset} title="Start over">
          <X size={16} />
        </button>
      </div>

      <div className={styles.resultDivider} />

      <div className={styles.downloadList}>
        {results.options.map(opt => (
          <div key={opt.value} className={styles.downloadRow}>
            <div className={styles.downloadLeft}>
              <span className={`${styles.fmtBadge} ${styles[opt.format]}`}>
                {opt.format.toUpperCase()}
              </span>
              <span className={styles.dlQuality}>{opt.quality}</span>
              <span className={styles.dlSize}>{opt.size}</span>
            </div>
            <button
              className={styles.dlBtn}
              onClick={() => onDownload(opt)}
            >
              <Download size={13} />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
