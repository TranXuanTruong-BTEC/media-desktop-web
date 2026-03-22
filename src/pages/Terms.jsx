import React from 'react'
import SEO from '../components/shared/SEO.jsx'
import styles from './LegalPage.module.css'

export default function Terms() {
  return (
    <>
      <SEO
        title="Điều khoản sử dụng – SnapLoad"
        description="Điều khoản sử dụng dịch vụ SnapLoad. Vui lòng đọc trước khi sử dụng."
      />
      <div className={styles.page}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.header}>
            <span className={styles.label}>Pháp lý</span>
            <h1 className={styles.title}>Điều khoản sử dụng</h1>
            <p className={styles.meta}>Cập nhật lần cuối: 22 tháng 3, 2026</p>
          </div>

          <div className={styles.body}>
            <p>Bằng cách sử dụng SnapLoad ("dịch vụ"), bạn đồng ý với các điều khoản dưới đây. Vui lòng đọc kỹ. Nếu không đồng ý, hãy ngừng sử dụng dịch vụ.</p>

            <h2>1. Sử dụng hợp lệ</h2>
            <ul>
              <li>Bạn có thể sử dụng SnapLoad để tải nội dung cho mục đích cá nhân, phi thương mại mà bạn có quyền truy cập.</li>
              <li>Bạn không được tải và phân phối lại nội dung có bản quyền mà không có sự cho phép của chủ sở hữu.</li>
              <li>Bạn không được sử dụng SnapLoad cho bất kỳ mục đích bất hợp pháp nào.</li>
              <li>Bạn không được cố gắng đảo ngược kỹ thuật, scrape, lạm dụng hay làm quá tải hạ tầng của SnapLoad.</li>
              <li>Bạn không được sử dụng script tự động hay bot để truy cập dịch vụ với số lượng lớn.</li>
            </ul>

            <h2>2. Bản quyền và sở hữu trí tuệ</h2>
            <p>
              SnapLoad là công cụ kỹ thuật. Chúng tôi không lưu trữ, phân phối hay sở hữu nội dung được tải xuống.
              Người dùng hoàn toàn chịu trách nhiệm về việc đảm bảo tuân thủ luật bản quyền và
              điều khoản sử dụng của từng nền tảng.
            </p>

            <h2>3. Tính khả dụng của dịch vụ</h2>
            <p>
              SnapLoad được cung cấp "nguyên trạng" và "theo khả năng có sẵn". Chúng tôi không đảm bảo dịch vụ
              luôn hoạt động liên tục hay không có lỗi. Chúng tôi có quyền tạm ngừng hoặc thay đổi
              dịch vụ bất kỳ lúc nào mà không cần thông báo trước.
            </p>

            <h2>4. Giới hạn trách nhiệm</h2>
            <p>
              SnapLoad không chịu trách nhiệm về bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên hay hậu quả
              phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ.
            </p>

            <h2>5. Quyền riêng tư</h2>
            <p>
              Việc sử dụng dịch vụ cũng tuân theo <a href="/privacy">Chính sách quyền riêng tư</a> của chúng tôi.
            </p>

            <h2>6. Thay đổi điều khoản</h2>
            <p>
              Chúng tôi có thể cập nhật điều khoản này theo thời gian. Tiếp tục sử dụng dịch vụ sau khi
              thay đổi đồng nghĩa với việc bạn chấp nhận điều khoản mới.
            </p>

            <h2>7. Liên hệ</h2>
            <p>Thắc mắc về điều khoản? Liên hệ qua trang <a href="/contact">Liên hệ</a>.</p>
          </div>
        </div>
      </div>
    </>
  )
}
