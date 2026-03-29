import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Download, ArrowLeft, Check, Clock, HardDrive, Monitor, Tag, Loader, Star } from 'lucide-react'
import { getDesktopToolById, desktopTools, formatDownloadCount } from '../data/desktopTools.js'
import { useGithubRelease } from '../hooks/useGithubRelease.js'
import { getEffectiveStatus, getDeviceType } from '../hooks/useDeviceStatus.js'
import SEO from '../components/shared/SEO.jsx'
import DesktopToolCard from '../components/desktop/DesktopToolCard.jsx'
import { showToast } from '../components/shared/Toast.jsx'
import styles from './DesktopToolDetail.module.css'

export default function DesktopToolDetail() {
  const { toolId } = useParams()
  const tool = getDesktopToolById(toolId)

  if (!tool) {
    return (
      <div className={styles.notFound}>
        <h1>Tool không tồn tại</h1>
        <Link to="/tools" className="btn-primary">← Quay lại Tools</Link>
      </div>
    )
  }

  const gh = useGithubRelease(tool._r || tool.githubRepo, tool.assetName)

  const version     = gh.version      || tool.version
  const downloadUrl = gh.downloadUrl  || tool.downloadUrl
  const fileSize    = gh.fileSize     || tool.fileSize
  const releaseDate = gh.releaseDate  || tool.releaseDate
  const dlCount     = gh.downloadCount > 0 ? gh.downloadCount : tool.downloadCount
  const otherTools = desktopTools.filter(t => t.id !== tool.id).slice(0, 3)

  function handleDownload() {
    // Navigate programmatically — URL never appears in DOM href
    showToast(`🚀 Đang tải ${tool.name} v${version}…`)
    // Small delay so toast shows first
    setTimeout(() => {
      const a = document.createElement('a')
      a.href     = downloadUrl
      a.download = ''
      a.target   = '_blank'
      a.rel      = 'noopener noreferrer'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }, 200)
  }

  return (
    <>
      <SEO
        title={`${tool.name} v${version} – Tải miễn phí`}
        description={tool.description}
        keywords={tool.tags.join(', ')}
      />

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <Link to="/tools" className={styles.back}>
            <ArrowLeft size={14} /> Tất cả Tools
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroInner}`}>

          <div className={styles.heroLeft}>
            <div className={styles.toolIcon} style={{ background: tool.iconBg }}>
              <span style={{ color: tool.iconColor, fontSize: '36px' }}>{tool.icon}</span>
            </div>
            <div className={styles.heroMeta}>
              <div className={styles.heroBadgeRow}>
                {tool.featured && <span className={styles.featuredBadge}><Star size={10} fill="currentColor" /> Featured</span>}
                <span className={styles.catBadge}>{tool.category}</span>

              </div>
              <h1 className={styles.heroTitle}>{tool.name}</h1>
              <p className={styles.heroDesc}>{tool.description}</p>

              {/* Stats */}
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <HardDrive size={13} />
                  {gh.loading ? <span className={styles.skeleton} /> : <span>{fileSize}</span>}
                </div>
                <div className={styles.stat}>
                  <Monitor size={13} />
                  <span>{tool.requirements}</span>
                </div>
                <div className={styles.stat}>
                  <Download size={13} />
                  {gh.loading
                    ? <span className={styles.skeleton} />
                    : <span>{formatDownloadCount(dlCount) || '—'} lượt tải</span>}
                </div>
                <div className={styles.stat}>
                  <Clock size={13} />
                  {gh.loading
                    ? <span className={styles.skeleton} />
                    : <span>Cập nhật {releaseDate}</span>}
                </div>
              </div>

              {/* Download button — status aware */}
              <div className={styles.heroActions}>
                {(() => {
                  const effSt = getEffectiveStatus(tool)
                  const dType = getDeviceType()
                  const dLabel = dType === 'ios' ? 'iOS' : dType === 'android' ? 'Android' : null
                  if (effSt === 'maintenance') return (
                    <div className={styles.statusBanner} style={{ background:'rgba(255,118,117,0.12)', border:'1.5px solid rgba(255,118,117,0.3)', color:'var(--red)' }}>
                      🔧 {dLabel ? `${dLabel}: ` : ''}Đang bảo trì — tính năng tải về tạm thời không khả dụng
                    </div>
                  )
                  if (effSt === 'coming_soon') return (
                    <div className={styles.statusBanner} style={{ background:'rgba(253,203,110,0.12)', border:'1.5px solid rgba(253,203,110,0.3)', color:'var(--amber)' }}>
                      🚧 {dLabel ? `${dLabel}: ` : ''}Coming Soon — sắp ra mắt!
                    </div>
                  )
                  return null
                })()}
                {getEffectiveStatus(tool) === 'active' && (
                  gh.loading ? (
                    <div className={styles.dlBtnLoading}>
                      <Loader size={18} className={styles.spin} />
                      Đang tải thông tin phiên bản…
                    </div>
                  ) : (
                    <a
                      href="#download"
                      className={styles.downloadBtn}
                      style={{ background: tool.color || 'var(--accent)' }}
                      onClick={(e) => { e.preventDefault(); handleDownload() }}
                    >
                      <Download size={20} />
                      Tải xuống miễn phí
                      <span className={styles.dlMeta}>v{version} · {fileSize} · .{tool.ext}</span>
                    </a>
                  )
                )}
              </div>

              <p className={styles.safeNote}>
                ✓ Không virus &nbsp;·&nbsp; ✓ Không adware &nbsp;·&nbsp; ✓ Không cần đăng ký
              </p>
            </div>
          </div>

          {/* Version card */}
          <div className={styles.heroRight}>
            <div className={styles.versionCard}>
              <div className={styles.versionHeader}>
                <Tag size={13} /> Thông tin phiên bản
              </div>
              <div className={styles.versionRows}>
                {[
                  ['Phiên bản', gh.loading ? null : `v${version}`],
                  ['Nền tảng', tool.platform.join(' / ')],
                  ['Kích thước', gh.loading ? null : fileSize],
                  ['Định dạng', `.${tool.ext}`],
                  ['Lượt tải', gh.loading ? null : (formatDownloadCount(dlCount) || '—')],
                  ['Cập nhật', gh.loading ? null : releaseDate],
                ].map(([k, v]) => (
                  <div key={k} className={styles.versionRow}>
                    <span className={styles.vKey}>{k}</span>
                    {v === null
                      ? <span className={styles.skeleton} />
                      : <span className={styles.vVal}>{v}</span>
                    }
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Features + Changelog */}
      <div className={styles.contentBelt}>
        <div className={`container ${styles.contentGrid}`}>

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Tính năng nổi bật</h2>
            <ul className={styles.featureList}>
              {tool.features.map(f => (
                <li key={f} className={styles.featureItem}>
                  <span className={styles.featureCheck} style={{ background: tool.accentColor, color: tool.iconColor }}>
                    <Check size={13} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>



        </div>
      </div>

      {/* Requirements */}
      <div className={styles.requireSection}>
        <div className={`container ${styles.requireInner}`}>
          <h2 className={styles.blockTitle}>Yêu cầu hệ thống</h2>
          <div className={styles.requireGrid}>
            <div className={styles.requireItem}>
              <Monitor size={18} className={styles.requireIcon} />
              <div>
                <div className={styles.requireLabel}>Hệ điều hành</div>
                <div className={styles.requireVal}>{tool.requirements}</div>
              </div>
            </div>
            <div className={styles.requireItem}>
              <HardDrive size={18} className={styles.requireIcon} />
              <div>
                <div className={styles.requireLabel}>Dung lượng</div>
                <div className={styles.requireVal}>{gh.loading ? '…' : fileSize}</div>
              </div>
            </div>
            <div className={styles.requireItem}>
              <Download size={18} className={styles.requireIcon} />
              <div>
                <div className={styles.requireLabel}>Cài đặt</div>
                <div className={styles.requireVal}>Chạy file .{tool.ext} và làm theo hướng dẫn</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other tools */}
      {otherTools.length > 0 && (
        <div className={styles.moreSection}>
          <div className={`container ${styles.moreInner}`}>
            <h2 className={styles.blockTitle}>Các tool khác</h2>
            <div className={styles.moreGrid}>
              {otherTools.map(t => (
                <DesktopToolCard key={t.id} tool={t} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
