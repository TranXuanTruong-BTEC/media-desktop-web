import React from 'react'
import { Link } from 'react-router-dom'
import { Download } from 'lucide-react'
import styles from './Footer.module.css'

const footerLinks = {
  'Sản phẩm': [
    { label: 'Tính năng',    href: '/#features' },
    { label: 'Cách dùng',    href: '/#how' },
    { label: 'FAQ',          href: '/#faq' },
    { label: 'Downloader',   href: '/#downloader' },
  ],
  'Công cụ tải': [
    { label: 'YouTube Downloader',   href: '/tool/youtube-downloader' },
    { label: 'TikTok Downloader',    href: '/tool/tiktok-downloader' },
    { label: 'Instagram Downloader', href: '/tool/instagram-downloader' },
    { label: 'Video to MP3',         href: '/tool/audio-extractor' },
    { label: 'Tất cả công cụ →',     href: '/tools' },
  ],
  'Công ty': [
    { label: 'Giới thiệu',           href: '/about' },
    { label: 'Liên hệ',              href: '/contact' },
    { label: 'Chính sách riêng tư',  href: '/privacy' },
    { label: 'Điều khoản sử dụng',   href: '/terms' },
  ],
}

const trustBadges = [
  { icon: '🔒', label: 'SSL Encrypted' },
  { icon: '🚫', label: 'No Data Stored' },
  { icon: '⚡', label: 'Fast CDN' },
  { icon: '✓', label: 'No Sign-up' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.trustRow}>
          {trustBadges.map(b => (
            <div key={b.label} className={styles.trustBadge}>
              <span>{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoIcon}><Download size={14} /></span>
              Snap<span>Load</span>
            </Link>
            <p className={styles.brandDesc}>
              Tải MP3 và MP4 từ YouTube, TikTok, Instagram và 50+ nền tảng.
              Miễn phí, nhanh, không quảng cáo, không đăng ký.
            </p>
            <div className={styles.version}>v2.1.0</div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className={styles.col}>
              <h4 className={styles.colTitle}>{group}</h4>
              <ul className={styles.colLinks}>
                {links.map(link => (
                  <li key={link.href}>
                    {link.href.startsWith('/') && !link.href.startsWith('/#')
                      ? <Link to={link.href} className={styles.colLink}>{link.label}</Link>
                      : <a href={link.href} className={styles.colLink}>{link.label}</a>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2025 SnapLoad. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link to="/privacy" className={styles.bottomLink}>Privacy</Link>
            <Link to="/terms" className={styles.bottomLink}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
