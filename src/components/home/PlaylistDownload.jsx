import React, { useState } from 'react'
import { Download, Loader, CheckCircle, AlertCircle, List, ChevronDown, ChevronUp } from 'lucide-react'
import { showToast } from '../shared/Toast.jsx'
import { detectDevice } from '../../hooks/useDeviceDownload.js'
import styles from './PlaylistDownload.module.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

function isPlaylistUrl(url) {
  return url.includes('list=') || url.includes('/playlist') || url.includes('watch?v=') === false && url.includes('youtube.com/@')
}

export default function PlaylistDownload() {
  const device = detectDevice()
  const [url,       setUrl]       = useState('')
  const [format,    setFormat]    = useState('mp3')
  const [quality,   setQuality]   = useState('320')
  const [loading,   setLoading]   = useState(false)
  const [playlist,  setPlaylist]  = useState(null)  // { total, items[] }
  const [selected,  setSelected]  = useState(new Set())
  const [dlStatus,  setDlStatus]  = useState({}) // id → 'downloading' | 'done' | 'error'
  const [dlAll,     setDlAll]     = useState(false)
  const [expanded,  setExpanded]  = useState(true)
  const [error,     setError]     = useState('')

  async function handleFetch() {
    if (!url.trim()) return
    setLoading(true); setError(''); setPlaylist(null); setSelected(new Set()); setDlStatus({})
    try {
      const res  = await fetch(`${API_BASE}/api/playlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error)
      setPlaylist(data)
      setSelected(new Set(data.items.map(i => i.id)))
      showToast(`✅ Tìm thấy ${data.total} video trong playlist`)
    } catch (err) {
      setError(err.message || 'Không thể đọc playlist')
    } finally {
      setLoading(false)
    }
  }

  function toggleItem(id) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleAll() {
    if (selected.size === playlist.items.length) setSelected(new Set())
    else setSelected(new Set(playlist.items.map(i => i.id)))
  }

  async function downloadSelected() {
    if (!playlist) return
    const toDownload = playlist.items.filter(i => selected.has(i.id))
    if (!toDownload.length) return

    setDlAll(true)
    for (const item of toDownload) {
      setDlStatus(p => ({ ...p, [item.id]: 'downloading' }))
      const enc    = encodeURIComponent(item.url)
      const dlUrl  = `${API_BASE}/api/download?url=${enc}&format=${format}&quality=${quality}`
      try {
        if (device.isIOS) {
          window.open(dlUrl, '_blank', 'noopener,noreferrer')
          await new Promise(r => setTimeout(r, 2000))
        } else {
          const resp = await fetch(dlUrl)
          if (!resp.ok) throw new Error()
          const blob = new Blob([await resp.arrayBuffer()])
          const a    = Object.assign(document.createElement('a'), {
            href: URL.createObjectURL(blob),
            download: `${item.title.slice(0,60)}.${format}`,
          })
          document.body.appendChild(a); a.click(); document.body.removeChild(a)
          await new Promise(r => setTimeout(r, 1000))
        }
        setDlStatus(p => ({ ...p, [item.id]: 'done' }))
      } catch {
        setDlStatus(p => ({ ...p, [item.id]: 'error' }))
      }
    }
    setDlAll(false)
    showToast(`✅ Hoàn tất tải ${toDownload.length} video!`)
  }

  const doneCount = Object.values(dlStatus).filter(s => s === 'done').length

  return (
    <div className={styles.wrap}>
      {/* URL input */}
      <div className={styles.urlRow}>
        <input
          className={styles.urlInput}
          type="url"
          placeholder="Paste link playlist YouTube (list=...) hoặc channel"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleFetch()}
          disabled={loading}
        />
        <button className={styles.fetchBtn} onClick={handleFetch} disabled={loading || !url.trim()}>
          {loading ? <><Loader size={14} className={styles.spin}/> Đang đọc…</> : <><List size={14}/> Đọc playlist</>}
        </button>
      </div>

      {error && (
        <div className={styles.errorBox}>
          <AlertCircle size={14}/> {error}
          <div className={styles.errorHint}>Tip: Link playlist YouTube phải có dạng ?list=PLxxxxxxx</div>
        </div>
      )}

      {/* Options */}
      {playlist && (
        <div className={styles.optRow}>
          <select className={styles.select} value={format} onChange={e => setFormat(e.target.value)} disabled={dlAll}>
            <option value="mp3">MP3 Audio</option>
            <option value="mp4">MP4 Video</option>
          </select>
          <select className={styles.select} value={quality} onChange={e => setQuality(e.target.value)} disabled={dlAll}>
            {format === 'mp3'
              ? [['320','320 kbps'],['192','192 kbps'],['128','128 kbps']].map(([v,l]) => <option key={v} value={v}>{l}</option>)
              : [['1080','1080p HD'],['720','720p'],['480','480p']].map(([v,l]) => <option key={v} value={v}>{l}</option>)
            }
          </select>
        </div>
      )}

      {/* Playlist items */}
      {playlist && (
        <div className={styles.playlistCard}>
          <div className={styles.plHeader} onClick={() => setExpanded(e => !e)}>
            <div className={styles.plTitle}>
              <List size={14}/>
              {playlist.total} video
              {doneCount > 0 && <span className={styles.doneCount}>{doneCount} đã tải</span>}
            </div>
            <div className={styles.plActions}>
              <button className={styles.selectAllBtn} onClick={e => { e.stopPropagation(); toggleAll() }}>
                {selected.size === playlist.items.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
              </button>
              <button
                className={styles.dlSelectedBtn}
                disabled={!selected.size || dlAll}
                onClick={e => { e.stopPropagation(); downloadSelected() }}
              >
                {dlAll
                  ? <><Loader size={12} className={styles.spin}/> Đang tải…</>
                  : <><Download size={12}/> Tải {selected.size} video</>
                }
              </button>
              {expanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
            </div>
          </div>

          {expanded && (
            <div className={styles.plList}>
              {playlist.items.map((item, i) => {
                const st = dlStatus[item.id]
                return (
                  <div key={item.id} className={`${styles.plItem} ${st === 'done' ? styles.plDone : ''}`}>
                    <input
                      type="checkbox"
                      checked={selected.has(item.id)}
                      onChange={() => toggleItem(item.id)}
                      className={styles.checkbox}
                      disabled={dlAll}
                    />
                    <span className={styles.plNum}>{i + 1}</span>
                    {item.thumb && <img src={item.thumb} alt="" className={styles.plThumb}/>}
                    <div className={styles.plInfo}>
                      <div className={styles.plItemTitle}>{item.title}</div>
                      {item.duration && <div className={styles.plDuration}>{item.duration}</div>}
                    </div>
                    <div className={styles.plStatus}>
                      {st === 'downloading' && <Loader size={14} className={styles.spin}/>}
                      {st === 'done'        && <CheckCircle size={14} style={{color:'var(--green)'}}/>}
                      {st === 'error'       && <AlertCircle size={14} style={{color:'var(--red)'}}/>}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
