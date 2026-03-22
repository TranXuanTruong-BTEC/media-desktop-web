import React, { useState, useRef } from 'react'
import { Download, Loader, CheckCircle, AlertCircle, List,
         ChevronDown, ChevronUp } from 'lucide-react'
import { showToast } from '../shared/Toast.jsx'
import { detectDevice } from '../../hooks/useDeviceDownload.js'
import styles from './PlaylistDownload.module.css'
import { downloaderConfig } from '../../data/downloaderConfig.js'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function PlaylistDownload() {
  const device   = detectDevice()
  const [url,         setUrl]         = useState('')
  const [format,      setFormat]      = useState('mp3')
  const [quality,     setQuality]     = useState('320')
  const [loading,     setLoading]     = useState(false)
  const [playlist,    setPlaylist]    = useState(null)
  const [selected,    setSelected]    = useState(new Set())
  const [expanded,    setExpanded]    = useState(true)
  const [error,       setError]       = useState('')
  const [dlStatus,    setDlStatus]    = useState({})

  async function handleFetch() {
    if (!url.trim()) return
    setLoading(true); setError(''); setPlaylist(null)
    setSelected(new Set()); setDlStatus({})
    try {
      const maxItems = downloaderConfig?.tabs?.playlist?.maxItems ?? 200
      const res  = await fetch(`${API_BASE}/api/playlist`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), maxItems }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error)
      setPlaylist(data)
      setSelected(new Set(data.items.map(i => i.id)))
      showToast(`✅ Tìm thấy ${data.total} video`)
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

  // Strategy 2: Individual — sequential one-by-one
  async function downloadOneByOne() {
    if (!playlist) return
    const items = playlist.items.filter(i => selected.has(i.id))
    if (!items.length) return

    for (const item of items) {
      setDlStatus(p => ({ ...p, [item.id]: 'downloading' }))
      const enc   = encodeURIComponent(item.url)
      const dlUrl = `${API_BASE}/api/download?url=${enc}&format=${format}&quality=${quality}`
      try {
        if (device.isIOS) {
          window.open(dlUrl, '_blank', 'noopener,noreferrer')
          await new Promise(r => setTimeout(r, 3000))
        } else {
          const res  = await fetch(dlUrl)
          if (!res.ok) throw new Error()
          const blob = await res.blob()
          const safe = item.title.replace(/[^\w\s-.]/g,'').slice(0,60).trim()
          const obj  = URL.createObjectURL(blob)
          const a    = Object.assign(document.createElement('a'),
            { href: obj, download: `${safe || item.id}.${format}` })
          document.body.appendChild(a); a.click(); document.body.removeChild(a)
          await new Promise(r => setTimeout(r, 800))
          URL.revokeObjectURL(obj)
        }
        setDlStatus(p => ({ ...p, [item.id]: 'done' }))
      } catch {
        setDlStatus(p => ({ ...p, [item.id]: 'error' }))
      }
      await new Promise(r => setTimeout(r, 1200))
    }
    showToast('✅ Tải xong tất cả!')
  }

  const isZipping = false
  const doneCount = Object.values(dlStatus).filter(s => s === 'done').length

  return (
    <div className={styles.wrap}>
      <div className={styles.urlRow}>
        <input
          className={styles.urlInput} type="url"
          placeholder="Dán link playlist (hỗ trợ nhiều nền tảng)"
          value={url} onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleFetch()}
          disabled={loading || isZipping}
        />
        <button className={styles.fetchBtn} onClick={handleFetch}
          disabled={loading || !url.trim() || isZipping}>
          {loading
            ? <><Loader size={14} className={styles.spin}/> Đang đọc…</>
            : <><List size={14}/> Đọc playlist</>}
        </button>
      </div>

      {error && (
        <div className={styles.errorBox}>
          <AlertCircle size={14}/> {error}
          <div className={styles.errorHint}>Tip: Dán link playlist đầy đủ từ nền tảng hỗ trợ</div>
        </div>
      )}

      {playlist && (
        <div className={styles.optRow}>
          <select className={styles.select} value={format}
            onChange={e => { setFormat(e.target.value); setQuality(e.target.value === 'mp3' ? '320' : '1080') }}
            disabled={isZipping}>
            <option value="mp3">🎵 MP3 Audio</option>
            <option value="mp4">🎬 MP4 Video</option>
          </select>
          <select className={styles.select} value={quality}
            onChange={e => setQuality(e.target.value)} disabled={isZipping}>
            {format === 'mp3'
              ? [['320','320 kbps — Best'],['256','256 kbps'],['192','192 kbps'],['128','128 kbps']]
                  .map(([v,l]) => <option key={v} value={v}>{l}</option>)
              : [['1080','1080p Full HD'],['720','720p HD'],['480','480p']]
                  .map(([v,l]) => <option key={v} value={v}>{l}</option>)
            }
          </select>
        </div>
      )}

}

      {playlist && (
        <div className={styles.playlistCard}>
          <div className={styles.plHeader} onClick={() => setExpanded(e => !e)}>
            <div className={styles.plTitle}>
              <List size={14}/>
              <strong>{playlist.total}</strong> video
              {doneCount > 0 && <span className={styles.donePill}>{doneCount} ✓</span>}
            </div>
            <div className={styles.plActions} onClick={e => e.stopPropagation()}>
              <button className={styles.selectAllBtn} onClick={toggleAll}>
                {selected.size === playlist.items.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
              </button>
              <button className={styles.dlAllBtn} disabled={!selected.size || isZipping}
                onClick={downloadOneByOne} title="Tải từng file riêng lẻ">
                <Download size={12}/> Từng file
              </button>
              {expanded ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
            </div>
          </div>

          {expanded && (
            <div className={styles.plList}>
              {playlist.items.map((item, i) => {
                const st = dlStatus[item.id]
                return (
                  <div key={item.id} className={`${styles.plItem}
                    ${st === 'done' ? styles.plDone : ''}
                    ${!selected.has(item.id) ? styles.plDeselected : ''}`}>
                    <input type="checkbox" className={styles.checkbox}
                      checked={selected.has(item.id)}
                      onChange={() => toggleItem(item.id)} disabled={isZipping}/>
                    <span className={styles.plNum}>{i + 1}</span>
                    {item.thumb
                      ? <img src={item.thumb} alt="" className={styles.plThumb}/>
                      : <div className={styles.plThumbEmpty}/>}
                    <div className={styles.plInfo}>
                      <div className={styles.plItemTitle}>{item.title}</div>
                      {item.duration && <div className={styles.plDur}>{item.duration}</div>}
                    </div>
                    <div className={styles.plSt}>
                      {st === 'downloading' && <Loader size={13} className={styles.spin}/>}
                      {st === 'done'        && <CheckCircle size={13} style={{color:'var(--green)'}}/>}
                      {st === 'error'       && <AlertCircle size={13} style={{color:'var(--red)'}}/>}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className={styles.plFooter}>
            <span>Đã chọn {selected.size}/{playlist.total}</span>
            <span className={styles.hint}>Tải lần lượt từng file</span>
          </div>
        </div>
      )}
    </div>
  )
}
