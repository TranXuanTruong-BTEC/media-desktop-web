import React from 'react'
import { Package, Shield, Zap } from 'lucide-react'
import styles from './ToolsHero.module.css'

const highlights = [
  { icon: <Package size={14} />, label: 'Miễn phí 100%' },
  { icon: <Shield size={14} />,  label: 'Không virus, không adware' },
  { icon: <Zap size={14} />,     label: 'Cập nhật thường xuyên' },
]

export default function ToolsHero({ count }) {
  return (
    <div className={styles.hero}>
      <div className={styles.bg} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          {count} công cụ miễn phí
        </div>
        <h1 className={styles.title}>
          Tools Desktop<br />
          <span className="gradient-text">do tôi tạo ra</span>
        </h1>
        <p className={styles.sub}>
          Những ứng dụng nhỏ gọn, mạnh mẽ giúp bạn làm việc nhanh hơn.
          Tải về, cài đặt, dùng ngay — không cần đăng ký.
        </p>
        <div className={styles.highlights}>
          {highlights.map(h => (
            <div key={h.label} className={styles.highlight}>
              <span className={styles.highlightIcon}>{h.icon}</span>
              {h.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
