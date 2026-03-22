import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/shared/SEO.jsx'
import styles from './LegalPage.module.css'

export default function About() {
  return (
    <>
      <SEO
        title="Giới thiệu – SnapLoad"
        description="SnapLoad là công cụ tải MP3/MP4 miễn phí, hỗ trợ 50+ nền tảng. Tìm hiểu về sứ mệnh và câu chuyện phía sau SnapLoad."
      />
      <div className={styles.page}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.header}>
            <span className={styles.label}>Câu chuyện</span>
            <h1 className={styles.title}>Về SnapLoad</h1>
            <p className={styles.meta}>Công cụ tải video miễn phí, nhanh, không quảng cáo</p>
          </div>

          <div className={styles.body}>
            <h2>SnapLoad là gì?</h2>
            <p>
              SnapLoad là công cụ web miễn phí giúp bạn tải MP3 và MP4 từ hơn 50 nền tảng video
              bao gồm YouTube, TikTok, Instagram, Facebook, Twitter/X và nhiều hơn nữa — chỉ cần
              dán link, chọn định dạng và nhấn tải xuống.
            </p>

            <h2>Tại sao tôi xây dựng SnapLoad?</h2>
            <p>
              Các công cụ tải video hiện tại trên thị trường đầy popup, quảng cáo rác, yêu cầu
              đăng ký hoặc cài extension đáng ngờ. SnapLoad ra đời để giải quyết đúng một vấn đề:
              tải video nhanh, sạch, không rác.
            </p>
            <p>
              Dự án được phát triển và duy trì bởi cá nhân trong thời gian rảnh. Mọi tính năng
              đều được cân nhắc kỹ để mang lại trải nghiệm tốt nhất cho người dùng.
            </p>

            <h2>Cam kết của chúng tôi</h2>
            <ul>
              <li><strong>Miễn phí mãi mãi</strong> — Không có phiên bản trả phí hay tính năng bị khoá.</li>
              <li><strong>Không quảng cáo xâm lấn</strong> — Không popup, không redirect lạ, không cài extension.</li>
              <li><strong>Bảo vệ quyền riêng tư</strong> — Không lưu link, không lưu file, không theo dõi bạn.</li>
              <li><strong>Không cần tài khoản</strong> — Mở trang là dùng được ngay.</li>
              <li><strong>Cập nhật liên tục</strong> — Thêm tính năng mới và sửa lỗi thường xuyên.</li>
            </ul>

            <h2>Tính năng nổi bật</h2>
            <ul>
              <li>Tải MP3 chất lượng lên đến 320 kbps</li>
              <li>Tải MP4 lên đến 4K Ultra HD</li>
              <li>Convert file MP4 → MP3 trực tiếp trên trình duyệt</li>
              <li>Hỗ trợ 50+ nền tảng — tự nhận diện khi bạn dán link</li>
              <li>Hoạt động trên mọi thiết bị: iPhone, Android, PC, Mac</li>
              <li>Công cụ desktop đính kèm cho Windows</li>
            </ul>

            <h2>Công nghệ sử dụng</h2>
            <p>
              SnapLoad được xây dựng bằng React (frontend), Node.js + Express (backend),
              triển khai trên Cloudflare Pages (website) và Railway (server xử lý).
              Xử lý video sử dụng yt-dlp và ffmpeg — hai công cụ mã nguồn mở hàng đầu.
            </p>

            <h2>Liên hệ & Phản hồi</h2>
            <p>
              Có câu hỏi hoặc góp ý? Sử dụng nút chat <strong>💬</strong> ở góc phải màn hình
              để gửi phản hồi trực tiếp — chúng tôi đọc và phản hồi mọi tin nhắn.
            </p>
            <p>
              Hoặc xem <Link to="/faq">FAQ</Link> để tìm câu trả lời nhanh,
              hay <Link to="/contact">Liên hệ</Link> nếu cần hỗ trợ trực tiếp.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
