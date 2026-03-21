import React from 'react'
import { Link } from 'react-router-dom'
import { Download, ArrowRight, Star, Loader } from 'lucide-react'
import { formatDownloadCount } from '../../data/desktopTools.js'
import { useGithubRelease } from '../../hooks/useGithubRelease.js'
import { showToast } from '../shared/Toast.jsx'
import styles from './DesktopToolCard.module.css'

export default function DesktopToolCard({ tool }) {
  const gh = useGithubRelease(tool.githubRepo, tool.assetName)

  const version     = gh.version     || tool.version
  const downloadUrl = gh.downloadUrl || tool.downloadUrl
  const fileSize    = gh.fileSize    || tool.fileSize

  function handleDownload(e) {
    e.stopPropagation()
    showToast(`🚀 Đang tải ${tool.name} v${version}…`)
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon} style={{ background: tool.iconBg }}>
          <span style={{ color: tool.iconColor, fontSize: '22px' }}>{tool.icon}</span>
        </div>
        <div className={styles.badges}>
          {tool.featured && (
            <span className={styles.featured}>
              <Star size={9} fill="currentColor" /> Featured
            </span>
          )}
          <span className={styles.extBadge}>.{tool.ext}</span>
        </div>
      </div>

      <h3 className={styles.name}>{tool.name}</h3>
      <p className={styles.tagline}>{tool.tagline}</p>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <span className={styles.metaDot} style={{ background: '#0078d4' }} />
          {tool.platform.join('/')}
        </span>
        <span className={styles.metaItem}>
          {gh.loading ? '…' : `v${version}`}
        </span>
        <span className={styles.metaItem}>
          <Download size={10} />
          {gh.loading ? '…' : (formatDownloadCount(gh.downloadCount || 0) || '—')}
        </span>
      </div>

      <div className={styles.actions}>
        {gh.loading ? (
          <div className={styles.loadingBtn}>
            <Loader size={13} className={styles.spin} /> Đang tải…
          </div>
        ) : (
          <a
            href={downloadUrl}
            className={styles.downloadBtn}
            style={{ background: tool.color || 'var(--accent)' }}
            onClick={handleDownload}
          >
            <Download size={13} />
            Tải xuống · {fileSize}
          </a>
        )}
        <Link to={`/tools/${tool.id}`} className={styles.detailBtn}>
          Chi tiết <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}
