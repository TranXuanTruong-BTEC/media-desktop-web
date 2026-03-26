// ─────────────────────────────────────────────────────────────
//  useDeviceDownload — platform-aware download handler
//  iOS: open in tab + show "Save to Files" instructions
//  Android: direct download with proper headers
//  Desktop: fetch → blob → anchor click (shows progress)
// ─────────────────────────────────────────────────────────────

export function detectDevice() {
  if (typeof navigator === 'undefined') return { isDesktop: true }
  const ua = navigator.userAgent || ''
  const isIOS = /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const isAndroid = /Android/.test(ua)
  const isMobile  = isIOS || isAndroid || /Mobi|Mobile/.test(ua)
  const isIOSSafari = isIOS && /^((?!chrome|android|crios|fxios).)*safari/i.test(ua)
  const isIOSChrome = isIOS && /CriOS/.test(ua)
  const isIOSFF    = isIOS && /FxiOS/.test(ua)
  return { isIOS, isAndroid, isMobile, isIOSSafari, isIOSChrome, isIOSFF, isDesktop: !isMobile }
}

// ─────────────────────────────────────────────────────────────
export async function smartDownload({ url, filename, format, onProgress, onSuccess, onError, onIOSInstruction }) {
  const device = detectDevice()
  const ext   = format === 'mp4' ? 'mp4' : 'mp3'
  const fname = (filename || 'snapload').replace(/[^\w\s.-]/g, '').trim().slice(0, 80) + '.' + ext

  // ── iOS: ALL browsers on iOS use WebKit → cannot save blobs ──
  if (device.isIOS) {
    onProgress?.('opening')
    try {
      // Try window.open first — iOS 13+ Safari shows native Download button
      const win = window.open(url, '_blank', 'noopener,noreferrer')
      if (!win || win.closed || typeof win.closed === 'undefined') {
        // Popup blocked (common on mobile) → navigate directly
        window.location.href = url
      }
    } catch {
      window.location.href = url
    }

    onIOSInstruction?.({
      browser: device.isIOSSafari ? 'safari' : device.isIOSChrome ? 'chrome' : 'other',
      safariSteps: [
        { icon: '▶', text: 'File đang phát trong tab mới' },
        { icon: '↑', text: 'Nhấn nút Chia sẻ ở thanh dưới Safari' },
        { icon: '📁', text: 'Chọn "Lưu vào Tệp" (Save to Files)' },
        { icon: '✅', text: 'Chọn thư mục → Nhấn Lưu' },
      ],
      chromeSteps: [
        { icon: '⋮', text: 'Nhấn dấu 3 chấm (⋮) góc trên phải' },
        { icon: '⬇', text: 'Chọn "Tải xuống" (Download)' },
        { icon: '✅', text: 'File sẽ vào thư mục Downloads' },
      ],
    })
    onSuccess?.({ device: 'ios' })
    return
  }

  // ── Android: direct anchor download (native browser download manager) ──
  if (device.isAndroid) {
    onProgress?.('downloading', 0)
    try {
      const a = Object.assign(document.createElement('a'), {
        href: url, download: fname, style: 'display:none'
      })
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      onSuccess?.({ device: 'android' })
    } catch (err) {
      // Fallback: open in new tab — Android Chrome will download automatically
      window.open(url, '_blank', 'noopener,noreferrer')
      onSuccess?.({ device: 'android-tab' })
    }
    return
  }

  // ── Desktop: fetch with progress → blob save ──────────────────
  onProgress?.('connecting', 0)
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Lỗi server: ${res.status}`)

    const total   = parseInt(res.headers.get('content-length') || '0')
    const reader  = res.body?.getReader()
    const chunks  = []
    let received  = 0

    if (reader) {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        chunks.push(value)
        received += value.length
        if (total > 0) onProgress?.('downloading', Math.min(99, Math.round((received / total) * 100)))
      }
    } else {
      const blob = await res.blob()
      chunks.push(new Uint8Array(await blob.arrayBuffer()))
      received = chunks[0].length
    }

    onProgress?.('saving', 100)

    const all = new Uint8Array(received)
    let pos = 0
    for (const c of chunks) { all.set(c, pos); pos += c.length }
    const mime    = format === 'mp4' ? 'video/mp4' : 'audio/mpeg'
    const blob    = new Blob([all], { type: mime })
    const blobUrl = URL.createObjectURL(blob)

    const a = Object.assign(document.createElement('a'), {
      href: blobUrl, download: fname, style: 'display:none'
    })
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(blobUrl), 15000)

    onSuccess?.({ device: 'desktop', bytes: received })

  } catch (err) {
    try {
      const a = Object.assign(document.createElement('a'), {
        href: url, download: fname, target: '_blank'
      })
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      onSuccess?.({ device: 'fallback' })
    } catch {
      onError?.(err.message || 'Tải thất bại, vui lòng thử lại')
    }
  }
}
