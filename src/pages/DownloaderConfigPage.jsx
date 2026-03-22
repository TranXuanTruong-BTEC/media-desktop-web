import React, { useState, useEffect } from 'react'
import { Save, Monitor, Smartphone, Apple, RefreshCw, Eye } from 'lucide-react'
import { api } from '../hooks/useApi.js'
import { Btn, Card, PageHeader, Badge } from '../components/shared/UI.jsx'
import styles from './DownloaderConfigPage.module.css'

// ── Defaults ───────────────────────────────────────────────────
const DEFAULT_CONFIG = {
  tabs: {
    mp3: {
      enabled: true, label: 'MP3', sub: 'Audio only',
      deviceStatus: { desktop: 'active', android: 'active', ios: 'active' },
    },
    mp4: {
      enabled: true, label: 'MP4', sub: 'Video + Audio',
      deviceStatus: { desktop: 'active', android: 'active', ios: 'coming_soon' },
    },
    convert: {
      enabled: true, label: 'Convert', sub: 'MP4 → MP3',
      deviceStatus: { desktop: 'active', android: 'active', ios: 'active' },
    },
  },
  defaultQuality: { mp3: '320', mp4: '1080', convert: '320' },
}

const STATUS_OPTS = [
  { value: 'active',      label: '✅ Hoạt động',   color: 'green' },
  { value: 'coming_soon', label: '🚧 Coming Soon',  color: 'amber' },
  { value: 'maintenance', label: '🔧 Bảo trì',      color: 'red'   },
]

const DEVICES = [
  { key: 'desktop', label: 'Desktop', icon: <Monitor    size={13}/> },
  { key: 'android', label: 'Android', icon: <Smartphone size={13}/> },
  { key: 'ios',     label: 'iOS',     icon: <Apple      size={13}/> },
]

const TAB_INFO = {
  mp3:     { icon: '🎵', quality: ['320 kbps', '256 kbps', '192 kbps', '128 kbps'] },
  mp4:     { icon: '🎬', quality: ['4K / 2160p', '1080p HD', '720p HD', '480p'] },
  convert: { icon: '🔄', quality: ['320 kbps', '192 kbps', '128 kbps'] },
}

function StatusPill({ value }) {
  const opt = STATUS_OPTS.find(o => o.value === value) || STATUS_OPTS[0]
  const colors = { green: '#1D9E75', amber: '#BA7517', red: '#A32D2D' }
  const bgs    = { green: 'rgba(29,158,117,.12)', amber: 'rgba(186,117,23,.12)', red: 'rgba(163,45,45,.12)' }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 10px', borderRadius: 40,
      background: bgs[opt.color], color: colors[opt.color],
      fontSize: 11, fontWeight: 700,
    }}>
      {opt.label}
    </span>
  )
}

export default function DownloaderConfigPage() {
  const [config,  setConfig]  = useState(DEFAULT_CONFIG)
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [building, setBuilding] = useState(false)
  const [buildMsg, setBuildMsg] = useState('')

  // Load from localStorage (synced with website)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('snapload_dl_config')
      if (stored) setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(stored) })
    } catch {}
  }, [])

  function setTabField(tab, field, val) {
    setConfig(p => ({
      ...p,
      tabs: { ...p.tabs, [tab]: { ...p.tabs[tab], [field]: val } }
    }))
  }

  function setDeviceStatus(tab, device, val) {
    setConfig(p => ({
      ...p,
      tabs: {
        ...p.tabs,
        [tab]: {
          ...p.tabs[tab],
          deviceStatus: { ...p.tabs[tab].deviceStatus, [device]: val }
        }
      }
    }))
  }

  async function handleSave() {
    setSaving(true)
    setBuildMsg('')
    try {
      // Step 1: Save config to file
      const res = await api.saveDownloaderConfig(config)
      if (res.ok) {
        localStorage.setItem('snapload_dl_config', JSON.stringify(config))
        setSaved(true)
        setTimeout(() => setSaved(false), 4000)
      }
    } catch {
      localStorage.setItem('snapload_dl_config', JSON.stringify(config))
      setSaved(true)
      setTimeout(() => setSaved(false), 4000)
    } finally {
      setSaving(false)
    }

    // Step 2: Trigger build
    setBuilding(true)
    setBuildMsg('Đang build...')
    try {
      const buildRes = await api.build()
      if (buildRes.ok) {
        setBuildMsg('✅ Build xong! Cloudflare Pages đang deploy...')
      } else {
        setBuildMsg('⚠️ Build lỗi: ' + (buildRes.error || 'Không rõ'))
      }
    } catch (e) {
      setBuildMsg('⚠️ Không kết nối được admin server để build. Hãy vào Xuất & Deploy để build thủ công.')
    } finally {
      setBuilding(false)
      setTimeout(() => setBuildMsg(''), 8000)
    }
  }

  function handleReset() {
    setConfig(DEFAULT_CONFIG)
  }

  return (
    <div>
      <PageHeader
        title="⚙️ Cấu hình Downloader"
        subtitle="Quản lý tab MP3/MP4/Convert và trạng thái theo thiết bị trên trang chủ"
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="ghost" size="sm" onClick={handleReset}>
              <RefreshCw size={13} /> Reset mặc định
            </Btn>
            <Btn variant="primary" onClick={handleSave} disabled={saving || building}>
              {building ? <><RefreshCw size={13} className={styles.spin}/> Đang build…</> :
               saving   ? <><RefreshCw size={13} className={styles.spin}/> Đang lưu…</> :
               saved    ? <>✅ Đã lưu!</> :
                          <><Save size={13}/> Lưu & Deploy</>}
            </Btn>
          </div>
        }
      />

      {/* Build status message */}
      {buildMsg && (
        <div style={{
          padding: '10px 16px', borderRadius: 'var(--radius-sm)',
          marginBottom: 14, fontSize: 13, fontWeight: 600,
          background: buildMsg.startsWith('✅') ? 'rgba(29,158,117,.12)' : 'rgba(253,203,110,.12)',
          color:      buildMsg.startsWith('✅') ? 'var(--green)' : 'var(--amber)',
          border:     `1px solid ${buildMsg.startsWith('✅') ? 'rgba(29,158,117,.3)' : 'rgba(253,203,110,.3)'}`,
        }}>
          {buildMsg}
        </div>
      )}

      {/* Preview */}
      <Card className={styles.previewCard}>
        <div className={styles.previewTitle}>👁 Preview — Tabs trên trang chủ</div>
        <div className={styles.previewTabs}>
          {Object.entries(config.tabs).map(([key, tab]) => (
            <div key={key} className={`${styles.previewTab} ${!tab.enabled ? styles.previewTabDisabled : ''}`}>
              <div className={styles.previewTabIcon}>{TAB_INFO[key]?.icon}</div>
              <div className={styles.previewTabLabel}>{tab.label}</div>
              <div className={styles.previewTabSub}>{tab.sub}</div>
              <div className={styles.previewTabBadges}>
                {DEVICES.map(d => (
                  <span key={d.key} className={styles.previewDeviceBadge}>
                    {d.icon}
                    <StatusPill value={tab.deviceStatus?.[d.key] || 'active'} />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tab configs */}
      <div className={styles.tabGrid}>
        {Object.entries(config.tabs).map(([key, tab]) => (
          <Card key={key} className={`${styles.tabCard} ${!tab.enabled ? styles.tabCardOff : ''}`}>
            <div className={styles.tabCardHeader}>
              <span className={styles.tabIcon}>{TAB_INFO[key]?.icon}</span>
              <span className={styles.tabName}>{tab.label}</span>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={tab.enabled}
                  onChange={e => setTabField(key, 'enabled', e.target.checked)}
                  className={styles.toggleInput}
                />
                <span className={styles.toggleSlider} />
              </label>
            </div>

            <div className={styles.tabFields}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Label</label>
                <input
                  className={styles.fieldInput}
                  value={tab.label}
                  onChange={e => setTabField(key, 'label', e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Sub-text</label>
                <input
                  className={styles.fieldInput}
                  value={tab.sub}
                  onChange={e => setTabField(key, 'sub', e.target.value)}
                />
              </div>
            </div>

            <div className={styles.deviceSection}>
              <div className={styles.deviceSectionTitle}>Trạng thái theo thiết bị</div>
              {DEVICES.map(device => (
                <div key={device.key} className={styles.deviceRow}>
                  <div className={styles.deviceLabel}>
                    {device.icon}
                    <span>{device.label}</span>
                  </div>
                  <select
                    className={styles.deviceSelect}
                    value={tab.deviceStatus?.[device.key] || 'active'}
                    onChange={e => setDeviceStatus(key, device.key, e.target.value)}
                  >
                    {STATUS_OPTS.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className={styles.qualityInfo}>
              <div className={styles.qualityLabel}>Options chất lượng:</div>
              <div className={styles.qualityList}>
                {TAB_INFO[key]?.quality.map(q => (
                  <Badge key={q} color="gray">{q}</Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card className={styles.infoCard}>
        <div className={styles.infoTitle}>📋 Hướng dẫn</div>
        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <span className={styles.infoNum}>1</span>
            <span>Chỉnh trạng thái từng tab cho từng thiết bị ở trên</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoNum}>2</span>
            <span>Nhấn <strong>Lưu & Deploy</strong> — file <code>downloaderConfig.js</code> sẽ được cập nhật</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoNum}>3</span>
            <span>Vào <strong>Xuất & Deploy</strong> → Build để push lên Cloudflare Pages</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoNum}>⚡</span>
            <span>User iOS sẽ thấy <em>"Coming Soon"</em> thay vì nút Download khi tab bị giới hạn</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
