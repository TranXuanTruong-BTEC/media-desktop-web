import React, { useState } from 'react'
import { Download, X, Plus, Loader, CheckCircle, AlertCircle, List } from 'lucide-react'
import { smartDownload, detectDevice } from '../../hooks/useDeviceDownload.js'
import { showToast } from '../shared/Toast.jsx'
import styles from './BatchDownload.module.css'
import { downloaderConfig } from '../../data/downloaderConfig.js'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

function isValidUrl(s) {
  try { const u = new URL(s); return u.protocol === 'http:' || u.protocol === 'https:' } catch { return false }
}

export default function BatchDownload() {
  const device = detectDevice()
  const [rawText,   setRawText]   = useState('')
  const [format,    setFormat]    = useState('mp3')
  const [quality,   setQuality]   = useState('320')
  const [items,     setItems]     = useState([])  // { url, title, thumb, status, mp3Url, mp4Url, error }
  const [fetching,  setFetching]  = useState(false)
  const [dlAll,     setDlAll]     = useState(false)

  // Parse textarea → unique valid URLs
  function parseUrls() {
    const maxUrls = downloaderConfig?.tabs?.batch?.maxUrls ?? 20
    return [...new Set(
      rawText.split(/[\n,\s]+/)
        .map(s => s.trim())
        .filter(isValidUrl)
    )].slice(0, maxUrls)
  }

  async function handleFetchAll() {
    const urls = parseUrls()
    if (!urls.length) { showToast('Không tìm thấy URL hợp lệ', 'error'); return }

    setFetching(true)
    setItems(urls.map(url => ({ url, status: 'loading', title: url.slice(0, 40) + '...', thumb: '' })))

    try {
      const res  = await fetch(`${API_BASE}/api/batch-info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls }),
      })
      const data = await res.json()
      setItems(data.results.map(r => ({
        url:    r.url,
        title:  r.title || r.url,
        thumb:  r.thumb || '',
        status: r.ok ? 'ready' : 'error',
        error:  r.error || '',
        mp3Url: r.mp3Url,
        mp4Url: r.mp4Url,
      })))
    } catch {
      setItems(prev => prev.map(i => ({ ...i, status: 'error', error: 'Lỗi kết nối server' })))
    } finally {
      setFetching(false)
    }
  }

  async function downloadOne(item, idx) {
    const dlUrl = format === 'mp3' ? item.mp3Url : item.mp4Url
    if (!dlUrl) return

    setItems(prev => prev.map((it, i) => i === idx ? { ...it, status: 'downloading' } : it))

    await smartDownload({
      url:      dlUrl,
      filename: item.title,
      format,
      onSuccess: () => setItems(prev => prev.map((it, i) => i === idx ? { ...it, status: 'done' } : it)),
      onError:   () => setItems(prev => prev.map((it, i) => i === idx ? { ...it, status: 'error', error: 'Tải thất bại' } : it)),
      onIOSInstruction: () => showToast('📱 iOS: Dùng nút Chia sẻ → Lưu vào Tệp'),
    })
  }

  async function downloadAll() {
    setDlAll(true)
    const readyItems = items.filter(i => i.status === 'ready' || i.status === 'done')
    for (let i = 0; i < readyItems.length; i++) {
      const idx = items.indexOf(readyItems[i])
      await downloadOne(readyItems[i], idx)
      if (i < readyItems.length - 1) await new Promise(r => setTimeout(r, 800))
    }
    setDlAll(false)
    showToast('✅ Đã tải xong tất cả!')
  }

  const readyCount = items.filter(i => i.status === 'ready').length
  const doneCount  = items.filter(i => i.status === 'done').length

  return (
    <div className={styles.wrap}>
      {/* URL input */}
      <div className={styles.inputSection}>
        <label className={styles.inputLabel}>
          Dán tối đa 20 link (mỗi link 1 dòng hoặc cách bằng dấu phẩy)
        </label>
        <textarea
          className={styles.textarea}
          placeholder={`https://www.tiktok.com/@user/video/xxx\nhttps://www.facebook.com/watch?v=xxx\nhttps://www.instagram.com/reel/xxx`}
          value={rawText}
          onChange={e => setRawText(e.target.value)}
          rows={5}
          disabled={fetching}
        />
        <div className={styles.inputMeta}>
          {parseUrls().length} URL hợp lệ tìm thấy
        </div>
      </div>

      {/* Format selector */}
      <div className={styles.optRow}>
        <div className={styles.optGroup}>
          <label className={styles.optLabel}>Định dạng</label>
          <select className={styles.select} value={format} onChange={e => setFormat(e.target.value)} disabled={fetching}>
            <option value="mp3">MP3 Audio</option>
            <option value="mp4">MP4 Video</option>
          </select>
        </div>
        <div className={styles.optGroup}>
          <label className={styles.optLabel}>Chất lượng</label>
          <select className={styles.select} value={quality} onChange={e => setQuality(e.target.value)} disabled={fetching}>
            {format === 'mp3'
              ? [['320','320 kbps'],['256','256 kbps'],['192','192 kbps'],['128','128 kbps']].map(([v,l]) => <option key={v} value={v}>{l}</option>)
              : [['1080','1080p HD'],['720','720p'],['480','480p']].map(([v,l]) => <option key={v} value={v}>{l}</option>)
            }
          </select>
        </div>
        <button
          className={styles.fetchBtn}
          onClick={handleFetchAll}
          disabled={fetching || !parseUrls().length}
        >
          {fetching ? <><Loader size={14} className={styles.spin}/> Đang lấy info…</> : <><List size={14}/> Lấy thông tin</>}
        </button>
      </div>

      {/* Results list */}
      {items.length > 0 && (
        <>
          <div className={styles.resultHeader}>
            <span className={styles.resultCount}>{items.length} video · {doneCount + readyCount} sẵn sàng</span>
            {readyCount > 0 && (
              <button className={styles.dlAllBtn} onClick={downloadAll} disabled={dlAll}>
                {dlAll ? <><Loader size={13} className={styles.spin}/> Đang tải…</> : <><Download size={13}/> Tải tất cả ({readyCount})</>}
              </button>
            )}
          </div>

          <div className={styles.list}>
            {items.map((item, idx) => (
              <div key={idx} className={`${styles.item} ${styles[item.status]}`}>
                {item.thumb && <img src={item.thumb} alt="" className={styles.thumb} />}
                {!item.thumb && <div className={styles.thumbPlaceholder}><Download size={16}/></div>}

                <div className={styles.info}>
                  <div className={styles.title}>{item.title}</div>
                  {item.error && <div className={styles.errMsg}>{item.error}</div>}
                </div>

                <div className={styles.action}>
                  {item.status === 'loading' && <Loader size={16} className={styles.spin}/>}
                  {item.status === 'error'   && <AlertCircle size={16} style={{color:'var(--red)'}}/>}
                  {item.status === 'done'    && <CheckCircle size={16} style={{color:'var(--green)'}}/>}
                  {item.status === 'ready' && (
                    <button className={styles.dlBtn} onClick={() => downloadOne(item, idx)}>
                      <Download size={13}/> {device.isIOS ? 'Mở' : 'Tải'}
                    </button>
                  )}
                  {item.status === 'downloading' && (
                    <span className={styles.dlingLabel}><Loader size={13} className={styles.spin}/> Đang tải…</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
