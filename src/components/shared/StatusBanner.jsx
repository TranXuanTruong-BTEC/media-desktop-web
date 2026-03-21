import React from 'react'
import { Clock, Wrench, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './StatusBanner.module.css'

export default function StatusBanner({ status, toolName }) {
  if (!status || status === 'active') return null

  const config = {
    coming_soon: {
      icon:    <Clock size={22} />,
      title:   `${toolName} — Coming Soon`,
      desc:    'Tính năng này đang được phát triển và sẽ sớm ra mắt. Hãy quay lại sau nhé!',
      color:   'amber',
      emoji:   '🚧',
    },
    maintenance: {
      icon:    <Wrench size={22} />,
      title:   `${toolName} — Đang bảo trì`,
      desc:    'Tính năng này tạm thời ngừng hoạt động để nâng cấp. Chúng tôi sẽ khôi phục sớm nhất có thể.',
      color:   'red',
      emoji:   '🔧',
    },
  }

  const cfg = config[status]
  if (!cfg) return null

  return (
    <div className={`${styles.banner} ${styles[cfg.color]}`}>
      <div className={styles.inner}>
        <div className={styles.iconWrap}>{cfg.icon}</div>
        <div className={styles.content}>
          <div className={styles.title}>{cfg.title}</div>
          <div className={styles.desc}>{cfg.desc}</div>
        </div>
        <Link to="/tool" className={styles.backBtn}>
          <ArrowLeft size={14} /> Xem tools khác
        </Link>
      </div>
    </div>
  )
}
