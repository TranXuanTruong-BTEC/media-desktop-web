import React from 'react'
import styles from './WhySection.module.css'

const features = [
  {
    icon: '🎵',
    iconBg: 'rgba(108,92,231,0.14)',
    title: 'Âm thanh chất lượng cao',
    desc: 'Tải MP3 lên đến 320 kbps — chất lượng tốt nhất hiện có. Phù hợp cho âm nhạc, podcast và bài giảng.',
  },
  {
    icon: '🎬',
    iconBg: 'rgba(0,206,201,0.1)',
    title: 'Video HD & 4K',
    desc: 'Tải MP4 ở độ phân giải gốc — lên đến 4K nơi nào hỗ trợ. Không nén, không mất chất lượng.',
  },
  {
    icon: '⚡',
    iconBg: 'rgba(253,203,110,0.1)',
    title: 'Nhanh chóng',
    desc: 'Hầu hết file bắt đầu tải trong vài giây. Dán link — kết quả hiện ngay, không cần chờ.',
  },
  {
    icon: '🔒',
    iconBg: 'rgba(255,118,117,0.1)',
    title: 'Riêng tư & bảo mật',
    desc: 'Không lưu link, không lưu file, không theo dõi hoạt động. Mọi tải xuống hoàn toàn riêng tư.',
  },
  {
    icon: '🔄',
    iconBg: 'rgba(108,92,231,0.14)',
    title: 'Convert MP4 → MP3',
    desc: 'Tải file video từ máy lên và chuyển đổi sang MP3 trực tiếp trên trình duyệt — không cần phần mềm.',
  },
  {
    icon: '📱',
    iconBg: 'rgba(0,206,201,0.1)',
    title: 'Mọi thiết bị',
    desc: 'Hoạt động trên iPhone, Android, Mac, Windows, Linux. Không cần cài app — chỉ cần trình duyệt.',
  },
  {
    icon: '🌐',
    iconBg: 'rgba(29,161,242,0.1)',
    title: '50+ nền tảng',
    desc: 'TikTok, Facebook, Instagram, Twitter/X, Vimeo, Reddit và nhiều hơn nữa. Dán link — SnapLoad tự nhận diện.',
  },
  {
    icon: '🚫',
    iconBg: 'rgba(255,77,77,0.1)',
    title: 'Không quảng cáo, không spam',
    desc: 'Không popup, không chuyển hướng lạ, không yêu cầu cài extension. Trải nghiệm sạch hoàn toàn.',
  },
]

export default function WhySection() {
  return (
    <section className={styles.section} id="why">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="section-label">Tại sao chọn SnapLoad</span>
          <h2 className="section-title">Tất cả những gì bạn cần,<br />không gì thừa</h2>
          <p className="section-sub">
            Không popup, không quảng cáo, không đăng ký.
            Chỉ tải xuống nhanh và sạch.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map(f => (
            <div key={f.title} className={styles.card}>
              <div className={styles.icon} style={{ background: f.iconBg }}>
                {f.icon}
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
