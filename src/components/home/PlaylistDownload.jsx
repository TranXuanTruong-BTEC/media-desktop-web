import React, { useState, useRef } from 'react'
import { Download, Loader, CheckCircle, AlertCircle, List,
         ChevronDown, ChevronUp, Package, X } from 'lucide-react'
import { showToast } from '../shared/Toast.jsx'
import { detectDevice } from '../../hooks/useDeviceDownload.js'
import styles from './PlaylistDownload.module.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function PlaylistDownload() {
  const device   = detectDevice()
  const abortRef = useRef(null)

  const [url,         setUrl]         = useState('')
  const [format,      setFormat]      = useState('mp3')
  const [quality,     setQuality]     = useState('320')
  const [loading,     setLoading]     = useState(false)
  const [playlist,    setPlaylist]    = useState(null)
  const [selected,    setSelected]    = useState(new Set())
  const [expanded,    setExpanded]    = useState(true)
  const [error,       setError]       = useState('')
  const [zipPhase,    setZipPhase]    = useState('idle')
  const [zipProgress, setZipProgress] = useState(0)
  const [zipMsg,      setZipMsg]      = useState('')
  const [dlStatus,    setDlStatus]    = useState({})

  async function handleFetch() {
    if (!url.trim()) return
    setLoading(true); setError(''); setPlaylist(null)
    setSelected(new Set()); setDlStatus({}); setZipPhase('idle')
    try {
      const res  = await fetch(`${API_BASE}/api/playlist`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
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

  // Strategy 1: ZIP — server downloads all, returns single ZIP file
  async function downloadAsZip() {
    if (!playlist || !selected.size) return
    const urls  = playlist.items.filter(i => selected.has(i.id)).map(i => i.url)
    const total = urls.length

    setZipPhase('preparing'); setZipProgress(0)
    setZipMsg(`⚙️ Server đang xử lý ${total} video…`)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch(`${API_BASE}/api/playlist-zip`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ urls, format, quality, title: playlist.title || 'playlist' }),
      })
      if (!res.ok) {
        const e = await res.json().catch(() => ({}))
        throw new Error(e.error || `Server error ${res.status}`)
      }

      setZipPhase('downloading'); setZipMsg(`📦 Đang tải file ZIP ${total} video…`)

      const contentLength = res.headers.get('Content-Length')
      const reader  = res.body.getReader()
      const chunks  = []
      let received  = 0

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        chunks.push(value); received += value.length
        if (contentLength) {
          setZipProgress(Math.round((received / Number(contentLength)) * 100))
        } else {
          setZipProgress(p => Math.min(p + 1, 92))
        }
      }

      setZipProgress(100); setZipMsg('💾 Đang lưu file…')
      const blob   = new Blob(chunks, { type: 'application/zip' })
      const objUrl = URL.createObjectURL(blob)
      const a      = Object.assign(document.createElement('a'), {
        href: objUrl,
        download: `${(playlist.title || 'playlist').replace(/[^\w\s-]/g, '').slice(0,40)}.zip`,
      })
      document.body.appendChild(a); a.click(); document.body.removeChild(a)
      setTimeout(() => URL.revokeObjectURL(objUrl), 15000)

      setZipPhase('done')
      setZipMsg(`✅ Đã tải xong ${total} file về máy!`)
      showToast(`🎉 ZIP tải xong — ${total} ${format.toUpperCase()} files`)
    } catch (err) {
      if (err.name === 'AbortError') {
        setZipPhase('idle'); setZipMsg('')
      } else {
        setZipPhase('error')
        setZipMsg(`❌ Lỗi: ${err.message || 'Không tải được'}`)
      }
    }
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

  function cancelZip() {
    abortRef.current?.abort()
    setZipPhase('idle'); setZipProgress(0); setZipMsg('')
  }

  const isZipping = zipPhase === 'preparing' || zipPhase === 'downloading'
  const doneCount = Object.values(dlStatus).filter(s => s === 'done').length

  return (
    <div className={styles.wrap}>
      <div className={styles.urlRow}>
        <input
          className={styles.urlInput} type="url"
          placeholder="Paste link playlist YouTube (có ?list=...) hoặc channel"
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
          <div className={styles.errorHint}>Tip: Link phải có dạng youtube.com/playlist?list=PLxxx</div>
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

      {zipPhase !== 'idle' && (
        <div className={`${styles.zipBox} ${styles[zipPhase]}`}>
          <div className={styles.zipHeader}>
            {isZipping && <Loader size={14} className={styles.spin}/>}
            {zipPhase === 'done'  && <CheckCircle size={14}/>}
            {zipPhase === 'error' && <AlertCircle size={14}/>}
            <span className={styles.zipMsg}>{zipMsg}</span>
            {isZipping && (
              <button className={styles.cancelBtn} onClick={cancelZip} title="Huỷ">
                <X size={12}/>
              </button>
            )}
          </div>
          {isZipping && (
            <div className={styles.zipBarTrack}>
              <div className={styles.zipBarFill} style={{ width: `${zipProgress}%` }}/>
              <span className={styles.zipPct}>{zipProgress}%</span>
            </div>
          )}
        </div>
      )}

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
              <button className={styles.dlZipBtn} disabled={!selected.size || isZipping}
                onClick={downloadAsZip} title="Tải tất cả thành 1 file ZIP">
                {isZipping
                  ? <><Loader size={12} className={styles.spin}/> Đang tạo…</>
                  : <><Package size={12}/> Tải ZIP ({selected.size})</>}
              </button>
              <button className={styles.dlOneBtn} disabled={!selected.size || isZipping}
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
            <span className={styles.hint}>📦 ZIP = 1 lần tải &nbsp;·&nbsp; Từng file = lần lượt</span>
          </div>
        </div>
      )}
    </div>
  )
}
