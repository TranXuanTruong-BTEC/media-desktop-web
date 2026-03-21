import React from 'react'
import { Clock, Wrench, ArrowLeft, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './StatusBanner.module.css'

const CONFIG = {
  coming_soon: {
    icon:    <Clock size={40} />,
    badge:   '🚧 Coming Soon',
    title:   'Tính năng đang được phát triển',
    desc:    'Chúng tôi đang xây dựng tính năng này và sẽ sớm ra mắt. Hãy quay lại sau nhé!',
    color:   'amber',
  },
  maintenance: {
    icon:    <Wrench size={40} />,
    badge:   '🔧 Đang bảo trì',
    title:   'Tạm thời ngừng hoạt động',
    desc:    'Tool này đang được nâng cấp và bảo trì. Chúng tôi sẽ khôi phục sớm nhất có thể. Xin lỗi vì sự bất tiện này!',
    color:   'red',
  },
}

/**
 * Dùng ở 2 nơi:
 * 1. mode="page"  — thay thế toàn bộ tool (dùng trong ToolDetail page)
 * 2. mode="overlay" — overlay lên form widget (dùng trong Hero/ToolHero)
 */
export default function StatusBanner({ status, toolName, mode = 'page' }) {
  if (!status || status === 'active') return null
  const cfg = CONFIG[status]
  if (!cfg) return null

  if (mode === 'overlay') {
    return (
      <div className={`${styles.overlay} ${styles[cfg.color]}`}>
        <div className={styles.overlayIcon}>{cfg.icon}</div>
        <div className={styles.overlayBadge}>{cfg.badge}</div>
        <div className={styles.overlayTitle}>{toolName} — {cfg.title}</div>
        <div className={styles.overlayDesc}>{cfg.desc}</div>
      </div>
    )
  }

  // mode="page" — full replacement block
  return (
    <div className={`${styles.page} ${styles[cfg.color]}`}>
      <div className={styles.pageInner}>
        <div className={styles.pageIcon}>{cfg.icon}</div>
        <div className={styles.pageBadge}>{cfg.badge}</div>
        <h2 className={styles.pageTitle}>{toolName}</h2>
        <p className={styles.pageDesc}>{cfg.desc}</p>
        <div className={styles.pageActions}>
          <Link to="/" className={styles.homeBtn}>
            <Home size={14} /> Trang chủ
          </Link>
          <Link to="/#tools" className={styles.backBtn}>
            <ArrowLeft size={14} /> Xem tools khác
          </Link>
        </div>
      </div>
    </div>
  )
}
