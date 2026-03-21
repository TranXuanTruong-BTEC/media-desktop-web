import React, { useState } from 'react'
import { Download, Star, Monitor, HardDrive, ChevronRight, Check, Clock, Loader, AlertCircle, Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/shared/SEO.jsx'
import { desktopTools, getAllCategories, formatDownloadCount } from '../data/desktopTools.js'
import { useGithubRelease } from '../hooks/useGithubRelease.js'
import { showToast } from '../components/shared/Toast.jsx'
import styles from './Tools.module.css'

// ── Screenshot mock placeholder ──────────────────────────────
function ScreenshotMock({ tool, index }) {
  const labels = ['Giao diện chính', 'Cài đặt', 'Kết quả']
  return (
    <div className={styles.mockScreen}
      style={{ background: `linear-gradient(135deg, ${tool.accentColor} 0%, var(--bg3) 100%)` }}>
      <div className={styles.mockBar}>
        <span className={styles.mockDot} style={{ background: 'rgba(255,96,87,0.7)' }} />
        <span className={styles.mockDot} style={{ background: 'rgba(255,189,68,0.7)' }} />
        <span className={styles.mockDot} style={{ background: 'rgba(40,200,70,0.7)' }} />
        <span className={styles.mockTitle}>{tool.name}</span>
      </div>
      <div className={styles.mockBody}>
        <div className={styles.mockIconLarge} style={{ color: tool.iconColor }}>{tool.icon}</div>
        <div className={styles.mockScreenLabel}>{labels[index] || 'Preview'}</div>
        <div className={styles.mockNote}>Thêm screenshot vào desktopTools.js</div>
      </div>
    </div>
  )
}

// ── Screenshot carousel ──────────────────────────────────────
function Screenshots({ tool }) {
  const [active, setActive] = useState(0)
  const realScreenshots = tool.screenshots?.filter(Boolean) || []
  const count = Math.max(realScreenshots.length, 3)
  const hasReal = realScreenshots.length > 0

  return (
    <div className={styles.screenshots}>
      <div className={styles.mainShot}>
        {hasReal ? (
          <img src={realScreenshots[active]} alt={`${tool.name} screenshot ${active + 1}`} className={styles.shotImg} />
        ) : (
          <ScreenshotMock tool={tool} index={active} />
        )}
        {tool.featured && (
          <div className={styles.featuredOverlay}>
            <Star size={10} fill="currentColor" /> Featured
          </div>
        )}
      </div>
      <div className={styles.thumbs}>
        {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
          <button key={i}
            className={`${styles.thumb} ${active === i ? styles.thumbActive : ''}`}
            onClick={() => setActive(i)}
          >
            {hasReal && realScreenshots[i]
              ? <img src={realScreenshots[i]} alt="" />
              : <ScreenshotMock tool={tool} index={i} />
            }
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Live GitHub data badge ────────────────────────────────────
function LiveBadge({ loading, error }) {
  if (loading) return (
    <span className={styles.liveBadge} style={{ color: 'var(--text3)' }}>
      <Loader size={10} className={styles.spin} /> Đang tải…
    </span>
  )
  if (error) return null
  return (
    <span className={styles.liveBadge}>
      <span className={styles.liveDot} /> Live từ GitHub
    </span>
  )
}

// ── Single tool row ──────────────────────────────────────────
function ToolRow({ tool }) {
  // Fetch live data từ GitHub API
  const gh = useGithubRelease(tool.githubRepo, tool.assetName)

  // Merge: ưu tiên GitHub data, fallback về data tĩnh
  const version      = gh.version      || tool.version
  const downloadUrl  = gh.downloadUrl  || tool.downloadUrl
  const fileSize     = gh.fileSize     || tool.fileSize
  const releaseDate  = gh.releaseDate  || tool.releaseDate
  const dlCount      = gh.downloadCount > 0 ? gh.downloadCount : tool.downloadCount
  const changelog    = gh.changelog?.length ? gh.changelog : tool.changelog

  function handleDownload(e) {
    // Không e.preventDefault() — để link hoạt động bình thường
    showToast(`🚀 Đang tải ${tool.name} v${version} (${fileSize})…`)
  }

  return (
    <article className={styles.toolRow} id={tool.id}>

      {/* Left: Screenshots */}
      <div className={styles.rowLeft}>
        <Screenshots tool={tool} />
      </div>

      {/* Right: Info */}
      <div className={styles.rowRight}>

        {/* Header */}
        <div className={styles.rowHeader}>
          <div className={styles.rowIconWrap} style={{ background: tool.iconBg }}>
            <span style={{ color: tool.iconColor, fontSize: '28px', lineHeight: 1 }}>{tool.icon}</span>
          </div>
          <div className={styles.rowTitles}>
            <div className={styles.rowBadges}>
              <span className={styles.platBadge}>
                <Monitor size={10} /> {tool.platform.join(' / ')}
              </span>
              <span className={styles.extBadge}>.{tool.ext}</span>
              <span className={styles.catBadge}>{tool.category}</span>
              <LiveBadge loading={gh.loading} error={gh.error} />
            </div>
            <h2 className={styles.rowName}>{tool.name}</h2>
            <p className={styles.rowTagline}>{tool.tagline}</p>
          </div>
        </div>

        {/* Stats strip */}
        <div className={styles.statsStrip}>
          <div className={styles.statChip}>
            <Download size={12} />
            {gh.loading
              ? <span className={styles.statSkeleton} />
              : <><strong>{formatDownloadCount(dlCount) || '—'}</strong><span>lượt tải</span></>
            }
          </div>
          <div className={styles.statChip}>
            <HardDrive size={12} />
            {gh.loading
              ? <span className={styles.statSkeleton} />
              : <strong>{fileSize}</strong>
            }
          </div>
          <div className={styles.statChip}>
            <Clock size={12} />
            {gh.loading
              ? <span className={styles.statSkeleton} />
              : <><strong>v{version}</strong><span>· {releaseDate}</span></>
            }
          </div>
          {tool.githubRepo && (
            <a
              href={`https://github.com/${tool.githubRepo}/releases`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ghLink}
            >
              <Github size={12} /> GitHub
            </a>
          )}
        </div>

        {/* Description */}
        <p className={styles.rowDesc}>{tool.description}</p>

        {/* Features */}
        <ul className={styles.featureList}>
          {tool.features.slice(0, 4).map(f => (
            <li key={f} className={styles.featureItem}>
              <span className={styles.featureCheck} style={{ background: tool.accentColor, color: tool.iconColor }}>
                <Check size={11} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* Latest changelog */}
        {changelog?.[0] && !gh.loading && (
          <div className={styles.changelogSnippet} style={{ borderColor: `${tool.color}30`, background: `${tool.color}0d` }}>
            <span className={styles.changelogLabel} style={{ color: tool.iconColor }}>
              <Clock size={10} /> v{changelog[0].version} · {changelog[0].date}
            </span>
            <span className={styles.changelogNote}>{changelog[0].notes}</span>
          </div>
        )}

        {/* ── DOWNLOAD BUTTON ── */}
        <div className={styles.rowActions}>
          {gh.loading ? (
            <div className={styles.dlBtnLoading}>
              <Loader size={16} className={styles.spin} />
              Đang kiểm tra phiên bản mới nhất…
            </div>
          ) : gh.error ? (
            /* Fallback khi API lỗi */
            <a
              href={tool.downloadUrl}
              className={styles.dlBtn}
              style={{ '--tool-color': tool.color }}
              onClick={handleDownload}
              download
            >
              <Download size={17} />
              Tải xuống v{version}
              <span className={styles.dlBadge}>{fileSize} · .{tool.ext}</span>
            </a>
          ) : (
            /* Nút download chính với URL thật từ GitHub */
            <a
              href={downloadUrl}
              className={styles.dlBtn}
              style={{ '--tool-color': tool.color }}
              onClick={handleDownload}
            >
              <Download size={17} />
              Tải xuống miễn phí
              <span className={styles.dlBadge}>v{version} · {fileSize}</span>
            </a>
          )}

          <Link to={`/tools/${tool.id}`} className={styles.detailBtn}>
            Chi tiết <ChevronRight size={14} />
          </Link>
        </div>

        <p className={styles.safeNote}>
          ✓ Mã nguồn mở &nbsp;·&nbsp; ✓ Không virus &nbsp;·&nbsp; ✓ Không cần đăng ký
        </p>

      </div>
    </article>
  )
}

// ── Main page ────────────────────────────────────────────────
export default function Tools() {
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const categories = getAllCategories()

  const filtered = activeCategory === 'Tất cả'
    ? desktopTools
    : desktopTools.filter(t => t.category === activeCategory)

  return (
    <>
      <SEO
        title="Tools – Ứng dụng Desktop miễn phí"
        description="Tải xuống Media Desktop App và các ứng dụng miễn phí. Download MP3/MP4 từ YouTube, TikTok, Instagram."
        keywords="media desktop app, download mp3 mp4, youtube downloader windows, free windows app"
      />

      {/* ── HERO ── */}
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBadge}>
            <span className={styles.heroDot} />
            {desktopTools.length} ứng dụng miễn phí
          </div>
          <h1 className={styles.heroTitle}>
            Tools Desktop<br />
            <span className="gradient-text">do tôi tạo ra</span>
          </h1>
          <p className={styles.heroSub}>
            Những ứng dụng nhỏ gọn, mạnh mẽ giúp bạn làm việc nhanh hơn.<br />
            Tải về, cài đặt, dùng ngay — không cần đăng ký tài khoản.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{desktopTools.length}</span>
              <span className={styles.heroStatLabel}>Tools miễn phí</span>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>50+</span>
              <span className={styles.heroStatLabel}>Nền tảng hỗ trợ</span>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>100%</span>
              <span className={styles.heroStatLabel}>Mã nguồn mở</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── LIST ── */}
      <div className={styles.body}>
        <div className={`container ${styles.bodyInner}`}>

          {/* Filter bar */}
          <div className={styles.filterBar}>
            <div className={styles.filterLeft}>
              {categories.map(cat => (
                <button key={cat}
                  className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                  {cat !== 'Tất cả' && (
                    <span className={styles.filterCount}>
                      {desktopTools.filter(t => t.category === cat).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <span className={styles.filterResult}>{filtered.length} tool</span>
          </div>

          {/* Tool list */}
          <div className={styles.list}>
            {filtered.map((tool, i) => (
              <React.Fragment key={tool.id}>
                <ToolRow tool={tool} />
                {i < filtered.length - 1 && <div className={styles.rowDivider} />}
              </React.Fragment>
            ))}
          </div>

          {/* Bottom note */}
          <div className={styles.bottomCta}>
            <div className={styles.bottomCtaIcon}>🛠</div>
            <div>
              <h3 className={styles.bottomCtaTitle}>Muốn thêm tính năng hoặc báo lỗi?</h3>
              <p className={styles.bottomCtaDesc}>
                Mở issue trực tiếp trên GitHub — tôi đọc và phản hồi mọi yêu cầu.
              </p>
              <a
                href="https://github.com/TranXuanTruong-BTEC/media-desktop-app/issues"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ghIssueBtn}
              >
                <Github size={14} /> Mở issue trên GitHub
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
