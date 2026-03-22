import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import styles from './FAQ.module.css'

const faqs = [
  {
    q: 'SnapLoad có miễn phí không?',
    a: 'Hoàn toàn miễn phí — không cần đăng ký, không cần thẻ tín dụng, không giới hạn số lần tải. SnapLoad được phát triển và duy trì bởi cá nhân trong thời gian rảnh.',
  },
  {
    q: 'Hỗ trợ những nền tảng nào?',
    a: 'SnapLoad hỗ trợ 50+ nền tảng: YouTube, TikTok, Instagram (Reels, Stories), Facebook, Twitter/X, Vimeo, Reddit, Dailymotion và nhiều hơn nữa. Dán link vào ô tìm kiếm — SnapLoad tự nhận diện và chuyển bạn đến công cụ phù hợp.',
  },
  {
    q: 'Tải được định dạng và chất lượng nào?',
    a: 'MP3: 128, 192, 256, 320 kbps. MP4: 480p, 720p HD, 1080p Full HD, 4K Ultra HD (tuỳ video gốc hỗ trợ). Ngoài ra có tính năng Convert: tải file MP4 lên máy và xuất ra MP3.',
  },
  {
    q: 'Tại sao cần nhấn Chia sẻ → Lưu vào Tệp trên iPhone?',
    a: 'iOS (iPhone/iPad) không cho phép trình duyệt tự động lưu file như Android hay PC. Khi nhấn Download trên Safari, file sẽ mở trong tab mới — bạn cần nhấn nút Chia sẻ (□↑) ở thanh dưới rồi chọn "Lưu vào Tệp" để lưu về máy.',
  },
  {
    q: 'Tải thất bại phải làm sao?',
    a: 'Thử các bước sau: (1) Kiểm tra video có phải public không — video private không tải được. (2) Copy lại link trực tiếp từ thanh địa chỉ trình duyệt. (3) Thử chất lượng thấp hơn (720p thay vì 4K). (4) Gửi feedback qua nút 💬 ở góc phải màn hình.',
  },
  {
    q: 'SnapLoad có lưu link hoặc file của tôi không?',
    a: 'Không. Link video được xử lý tạm thời và xóa ngay sau khi tải xong. File chỉ tồn tại trên server tối đa 30 phút để bạn tải về. SnapLoad không log URL, không theo dõi hoạt động, không bán dữ liệu.',
  },
  {
    q: 'Convert MP4 sang MP3 hoạt động thế nào?',
    a: 'Chọn tab "Convert" trên trang chủ → chọn chế độ "Chọn file MP4" → tải file lên → chọn chất lượng → Convert. Xử lý bằng ffmpeg trên server, thường dưới 30 giây. File tối đa 200MB.',
  },
  {
    q: 'Có thể dùng trên điện thoại không?',
    a: 'Có. SnapLoad hoạt động trên mọi thiết bị qua trình duyệt. Android: file tự lưu vào Downloads. iOS: file mở trong tab → Chia sẻ → Lưu vào Tệp. Không cần cài app.',
  },
  {
    q: 'Có vi phạm bản quyền không?',
    a: 'SnapLoad là công cụ — việc sử dụng hợp pháp hay không phụ thuộc vào mục đích của bạn. Tải về để xem offline cá nhân thường được chấp nhận ở nhiều quốc gia. Không được phân phối lại nội dung có bản quyền. Hãy tôn trọng điều khoản sử dụng của từng nền tảng.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className={styles.section} id="faq">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="section-label">Câu hỏi thường gặp</span>
          <h2 className="section-title">FAQ</h2>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}
            >
              <button
                className={styles.question}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <span className={styles.icon}>
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              {open === i && (
                <div className={styles.answer}>
                  <div className={styles.answerInner}>{faq.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
