import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Download, AlertCircle, X } from 'lucide-react'
import { showToast } from '../shared/Toast.jsx'
import styles from './ToolHero.module.css'

const QUALITY_OPTIONS = {
  mp3:  [{ v: '320', l: '320 kbps — Best' }, { v: '256', l: '256 kbps' }, { v: '192', l: '192 kbps' }, { v: '128', l: '128 kbps' }],
  mp4:  [{ v: '2160', l: '4K / 2160p' }, { v: '1080', l: '1080p HD' }, { v: '720', l: '720p' }, { v: '480', l: '480p' }],
  webm: [{ v: '1080', l: '1080p' }, { v: '720', l: '720p' }, { v: '480', l: '480p' }],
}

const STEPS = [
  [350, 20, 'Connecting…'],
  [750, 45, 'Fetching metadata…'],
  [1200, 70, 'Processing formats…'],
  [1700, 90, 'Preparing links…'],
  [2100, 100, 'Done!'],
]

function isValidUrl(str) {
  try { const u = new URL(str); return u.protocol === 'http:' || u.protocol === 'https:' } catch { return false }
}

export default function ToolHero({ tool }) {
  const defaultFormat = tool.formats[0]
  const [url, setUrl]       = useState('')
  const [format, setFormat] = useState(defaultFormat)
  const [quality, setQuality] = useState(QUALITY_OPTIONS[defaultFormat]?.[0]?.v || '320')
  const [phase, setPhase]   = useState('idle')
  const [progress, setProgress] = useState(0)
  const [progressMsg, setProgressMsg] = useState('')
  const [results, setResults] = useState(null)
  const [error, setError]   = useState('')
  const timers = useRef([])

  useEffect(() => {
    const opts = QUALITY_OPTIONS[format]
    if (opts) setQuality(opts[0].v)
  }, [format])

  function clearTimers() { timers.current.forEach(clearTimeout); timers.current = [] }

  function reset() {
    clearTimers(); setPhase('idle'); setProgress(0)
    setProgressMsg(''); setResults(null); setError('')
  }

  function handleFetch() {
    const t = url.trim()
    if (!t)              { setError('Please paste a video URL.'); setPhase('error'); return }
    if (!isValidUrl(t))  { setError('Invalid URL. Make sure it starts with https://'); setPhase('error'); return }

    clearTimers(); setPhase('loading')
    STEPS.forEach(([delay, pct, msg]) => {
      const id = setTimeout(() => { setProgress(pct); setProgressMsg(msg) }, delay)
      timers.current.push(id)
    })
    const done = setTimeout(() => {
      setResults(mockResults(format, tool.name))
      setPhase('results')
    }, 2400)
    timers.current.push(done)
  }

  function mockResults(fmt, toolName) {
    if (fmt === 'mp3') return {
      title: `${toolName} – Sample Video`,
      options: QUALITY_OPTIONS.mp3.map(o => ({ format: 'mp3', quality: o.l, value: o.v })),
    }
    return {
      title: `${toolName} – Sample Video`,
      options: (QUALITY_OPTIONS[fmt] || QUALITY_OPTIONS.mp4).map(o => ({ format: fmt, quality: o.l, value: o.v })),
    }
  }

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
              type="url"
              className={styles.urlInput}
              placeholder={`Paste ${tool.platforms[0]} link here…`}
              value={url}
              onChange={e => setUrl(e.target.value)}
              onPaste={e => setTimeout(() => { if (isValidUrl(e.target.value.trim())) handleFetch() }, 50)}
              onKeyDown={e => e.key === 'Enter' && handleFetch()}
              autoComplete="off" spellCheck={false}
            />
            <button className={styles.fetchBtn} onClick={handleFetch} disabled={phase === 'loading'}>
              {phase === 'loading' ? 'Fetching…' : 'Download'}
            </button>
          </div>

          {/* Format + quality */}
          {tool.formats.length > 1 && (
            <div className={styles.optionsRow}>
              <div className={styles.optionGroup}>
                <label className={styles.optionLabel}>Format</label>
                <select className={styles.select} value={format} onChange={e => setFormat(e.target.value)} disabled={phase === 'loading'}>
                  {tool.formats.map(f => <option key={f} value={f}>{f.toUpperCase()}</option>)}
                </select>
              </div>
              <div className={styles.optionGroup}>
                <label className={styles.optionLabel}>Quality</label>
                <select className={styles.select} value={quality} onChange={e => setQuality(e.target.value)} disabled={phase === 'loading'}>
                  {(QUALITY_OPTIONS[format] || []).map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* States */}
          {phase === 'loading' && (
            <div className={`${styles.state} animate-fade-in`}>
              <div className={styles.progressWrap}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }} />
              </div>
              <p className={styles.progressMsg}>{progressMsg}</p>
            </div>
          )}

          {phase === 'error' && (
            <div className={`${styles.state} ${styles.errorBox} animate-slide-up`}>
              <AlertCircle size={15} /> <span>{error}</span>
              <button className={styles.errClose} onClick={reset}><X size={13} /></button>
            </div>
          )}

          {phase === 'results' && results && (
            <div className={`${styles.state} animate-slide-up`}>
              <div className={styles.resultCard}>
                <div className={styles.resultHeader}>
                  <span className={styles.resultTitle}>{results.title}</span>
                  <button className={styles.resultClose} onClick={reset}><X size={15} /></button>
                </div>
                <div className={styles.resultDivider} />
                <div className={styles.downloadList}>
                  {results.options.map(o => (
                    <div key={o.value} className={styles.downloadRow}>
                      <div className={styles.downloadLeft}>
                        <span className={`${styles.badge} ${styles[o.format]}`}>{o.format.toUpperCase()}</span>
                        <span className={styles.dlQuality}>{o.quality}</span>
                      </div>
                      <button
                        className={styles.dlBtn}
                        onClick={() => showToast(`Starting ${o.quality} ${o.format.toUpperCase()} download…`)}
                      >
                        <Download size={12} /> Download
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
