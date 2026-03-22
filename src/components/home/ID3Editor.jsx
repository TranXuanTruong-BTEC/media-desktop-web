import React, { useState } from 'react'
import { Tag, Download, Loader, ChevronDown, ChevronUp, X } from 'lucide-react'
import { showToast } from '../shared/Toast.jsx'
import { detectDevice } from '../../hooks/useDeviceDownload.js'
import styles from './ID3Editor.module.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const GENRES = [
  'Pop','Rock','Hip-Hop','R&B','Electronic','Jazz','Classical','Country',
  'Folk','Metal','Punk','Indie','Alternative','Soul','Reggae','Latin',
  'Blues','Ambient','Soundtrack','Other',
]

export default function ID3Editor({ videoUrl, suggestedTitle = '', format, quality }) {
  const device = detectDevice()

  const [open,    setOpen]    = useState(false)
  const [title,   setTitle]   = useState(suggestedTitle)
  const [artist,  setArtist]  = useState('')
  const [album,   setAlbum]   = useState('')
  const [year,    setYear]    = useState(new Date().getFullYear().toString())
  const [genre,   setGenre]   = useState('')
  const [loading, setLoading] = useState(false)

  // Only show for MP3
  if (format !== 'mp3') return null

  async function handleDownloadWithTags() {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/tag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: videoUrl, format: 'mp3', quality, title, artist, album, year, genre }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `HTTP ${res.status}`)
      }

      if (device.isIOS) {
        // iOS: can't blob-download directly, open in new tab
        const blob   = await res.blob()
        const objUrl = URL.createObjectURL(blob)
        window.open(objUrl, '_blank')
        showToast('📱 iOS: nhấn Chia sẻ → Lưu vào Tệp')
        setTimeout(() => URL.revokeObjectURL(objUrl), 30000)
      } else {
        const blob     = await res.blob()
        const safeName = (artist && title)
          ? `${artist} - ${title}`
          : title || 'snapload'
        const objUrl   = URL.createObjectURL(blob)
        const a        = Object.assign(document.createElement('a'), {
          href: objUrl, download: `${safeName}.mp3`,
        })
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        setTimeout(() => URL.revokeObjectURL(objUrl), 10000)
        showToast(`✅ Tải xong: ${safeName}.mp3`)
      }
    } catch (err) {
      showToast(`❌ ${err.message || 'Tải thất bại'}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrap}>
      <button
        className={styles.toggle}
        onClick={() => setOpen(o => !o)}
      >
        <Tag size={13}/>
        <span>Thêm thông tin bài hát (ID3 tag)</span>
        <span className={styles.optBadge}>Tuỳ chọn</span>
        {open ? <ChevronUp size={13}/> : <ChevronDown size={13}/>}
      </button>

      {open && (
        <div className={styles.form}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label}>Tên bài hát</label>
              <input
                className={styles.input}
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Blinding Lights"
                maxLength={200}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Nghệ sĩ</label>
              <input
                className={styles.input}
                value={artist}
                onChange={e => setArtist(e.target.value)}
                placeholder="e.g. The Weeknd"
                maxLength={200}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Album</label>
              <input
                className={styles.input}
                value={album}
                onChange={e => setAlbum(e.target.value)}
                placeholder="e.g. After Hours"
                maxLength={200}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Năm</label>
              <input
                className={styles.input}
                value={year}
                onChange={e => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="2024"
                maxLength={4}
                style={{ width: '100%' }}
              />
            </div>
            <div className={`${styles.field} ${styles.fullCol}`}>
              <label className={styles.label}>Thể loại</label>
              <select
                className={styles.input}
                value={genre}
                onChange={e => setGenre(e.target.value)}
              >
                <option value="">-- Chọn thể loại --</option>
                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <button
            className={styles.dlBtn}
            onClick={handleDownloadWithTags}
            disabled={loading}
          >
            {loading
              ? <><Loader size={14} className={styles.spin}/> Đang xử lý…</>
              : <><Download size={14}/> Tải MP3 với tag đã nhập</>
            }
          </button>

          <p className={styles.hint}>
            Tag sẽ được nhúng vào file MP3 — hiển thị đúng trong iTunes, Spotify offline, VLC...
          </p>
        </div>
      )}
    </div>
  )
}
