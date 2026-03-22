import React, { useState } from 'react'
import styles from './HowItWorks.module.css'

const TABS = [
  { id: 'web', label: '🌐 Tải từ web' },
  { id: 'mobile', label: '📱 Trên điện thoại' },
  { id: 'convert', label: '🔄 Convert file' },
]

const STEPS = {
  web: [
    {
      num: '1', icon: '🔗',
      title: 'Sao chép link video',
      desc: 'Vào TikTok, Facebook, Instagram, Twitter/X... Sao chép link từ thanh địa chỉ trình duyệt hoặc nút "Chia sẻ" → "Sao chép liên kết".',
      tip: 'Hỗ trợ nhiều nền tảng: TikTok, Facebook, Instagram, Twitter/X, Vimeo, Reddit...',
    },
    {
      num: '2', icon: '📋',
      title: 'Dán link vào SnapLoad',
      desc: 'Dán link vào ô tìm kiếm trên trang chủ — SnapLoad tự nhận diện nền tảng và chuyển bạn đến công cụ phù hợp. Chọn MP3 hoặc MP4 và chất lượng mong muốn.',
      tip: 'Dán xong là tự tải ngay — không cần nhấn thêm nút nào.',
    },
    {
      num: '3', icon: '⬇️',
      title: 'Tải file về máy',
      desc: 'Nhấn Download — file sẽ về máy trong vài giây. MP3 lưu vào thư mục Music, MP4 vào Downloads.',
      tip: 'Không cần tài khoản, không cần cài app, không quảng cáo.',
    },
  ],
  mobile: [
    {
      num: '1', icon: '📤',
      title: 'Copy link từ app',
      desc: 'Mở video trên app TikTok, Instagram, Facebook... Nhấn nút "Chia sẻ" rồi chọn "Sao chép liên kết".',
      tip: 'TikTok: nhấn mũi tên → Sao chép liên kết. Instagram: nhấn ⋯ → Sao chép liên kết.',
    },
    {
      num: '2', icon: '🌍',
      title: 'Mở SnapLoad trên trình duyệt',
      desc: 'Mở trình duyệt (Safari/Chrome), vào mytools-9ns.pages.dev. Dán link vào ô và nhấn Get File.',
      tip: 'Thêm vào màn hình chính để dùng nhanh hơn: Safari → Chia sẻ → Thêm vào màn hình chính.',
    },
    {
      num: '3', icon: '💾',
      title: 'Lưu file (iOS khác Android)',
      desc: 'Android: file tự tải về thư mục Downloads. iOS Safari: file mở trong tab mới → nhấn nút Chia sẻ (□↑) → chọn "Lưu vào Tệp".',
      tip: 'iOS: MP3 có thể lưu thẳng vào Apple Music sau khi tải về Tệp.',
    },
  ],
  convert: [
    {
      num: '1', icon: '📁',
      title: 'Chọn tab Convert',
      desc: 'Trên trang chủ, nhấn tab "Convert" (biểu tượng ↩). Chọn chế độ "Chọn file MP4" từ máy tính.',
      tip: 'Convert hỗ trợ: MP4, MKV, AVI, MOV, WebM.',
    },
    {
      num: '2', icon: '🎵',
      title: 'Tải file video lên',
      desc: 'Kéo thả file MP4 vào khung hoặc click để chọn. Chọn chất lượng MP3 (128 / 192 / 320 kbps) rồi nhấn Convert.',
      tip: 'File tối đa 200MB. Xử lý trên server — không cần phần mềm cài thêm.',
    },
    {
      num: '3', icon: '✅',
      title: 'Tải MP3 về',
      desc: 'Quá trình convert thường dưới 30 giây. Sau khi xong, nhấn Download để lưu file MP3.',
      tip: 'File được xóa khỏi server sau 30 phút để bảo vệ quyền riêng tư.',
    },
  ],
}

export default function HowItWorks() {
  const [tab, setTab] = useState('web')
  const steps = STEPS[tab]

  return (
    <section className={styles.section} id="how">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="section-label">Đơn giản từng bước</span>
          <h2 className="section-title">Cách sử dụng SnapLoad</h2>
          <p className="section-sub">
            Không cần đăng ký, không cần cài app. Chạy ngay trên trình duyệt.
          </p>
        </div>

        {/* Tab switcher */}
        <div className={styles.tabs}>
          {TABS.map(t => (
            <button
              key={t.id}
              className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Steps */}
        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={step.num} className={styles.step}>
              {i < steps.length - 1 && <div className={styles.connector} />}
              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              {step.tip && (
                <div className={styles.stepTip}>💡 {step.tip}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
