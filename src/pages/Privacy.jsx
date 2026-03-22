import React from 'react'
import SEO from '../components/shared/SEO.jsx'
import styles from './LegalPage.module.css'

export default function Privacy() {
  return (
    <>
      <SEO
        title="Chính sách quyền riêng tư – SnapLoad"
        description="Chính sách quyền riêng tư của SnapLoad. Chúng tôi thu thập dữ liệu tối thiểu và không lưu link hay file của bạn."
      />
      <div className={styles.page}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.header}>
            <span className={styles.label}>Pháp lý</span>
            <h1 className={styles.title}>Chính sách quyền riêng tư</h1>
            <p className={styles.meta}>Cập nhật lần cuối: 22 tháng 3, 2026</p>
          </div>

          <div className={styles.body}>
            <p>SnapLoad cam kết bảo vệ quyền riêng tư của bạn. Chính sách này giải thích dữ liệu chúng tôi thu thập, cách sử dụng và quyền của bạn.</p>

            <h2>Dữ liệu chúng tôi thu thập</h2>
            <p>Chúng tôi thu thập mức tối thiểu cần thiết để vận hành dịch vụ:</p>
            <ul>
              <li><strong>Link video:</strong> Được xử lý tạm thời để tạo link tải. Không được lưu trữ sau khi phiên làm việc kết thúc.</li>
              <li><strong>Số liệu tổng hợp ẩn danh:</strong> Lượt xem trang, quốc gia, loại trình duyệt. Không có thông tin cá nhân.</li>
              <li><strong>Cookie phiên:</strong> Cookie tối thiểu cần thiết cho chức năng cốt lõi. Không có cookie quảng cáo hay theo dõi.</li>
            </ul>

            <h2>Dữ liệu chúng tôi KHÔNG thu thập</h2>
            <ul>
              <li>Tên, email hay bất kỳ thông tin tài khoản nào (chúng tôi không có hệ thống tài khoản)</li>
              <li>Địa chỉ IP vượt quá log server tiêu chuẩn (xóa trong 24 giờ)</li>
              <li>Nội dung video bạn tải xuống</li>
              <li>Thông tin thanh toán bất kỳ</li>
            </ul>

            <h2>File và link của bạn</h2>
            <p>
              Link video được xử lý tức thời — không được ghi log hay lưu sau khi bạn tải xong.
              File được tạo trên server chỉ tồn tại tối đa 30 phút, sau đó tự động xóa.
              Chúng tôi không đọc, phân tích hay chia sẻ nội dung bạn tải xuống.
            </p>

            <h2>Dịch vụ bên thứ ba</h2>
            <p>
              Chúng tôi sử dụng Cloudflare Pages (lưu trữ website) và Railway (server xử lý).
              Chúng tôi không dùng Google Analytics, Facebook Pixel hay bất kỳ công cụ theo dõi hành vi nào.
              Chúng tôi không bán dữ liệu cho bên thứ ba.
            </p>

            <h2>Quyền của bạn</h2>
            <p>
              Vì chúng tôi không lưu dữ liệu cá nhân, không có gì để xóa hay xuất.
              Nếu bạn có thắc mắc, hãy liên hệ qua trang <a href="/contact">Liên hệ</a>.
            </p>

            <h2>Cookie</h2>
            <p>
              SnapLoad chỉ dùng cookie cần thiết tối thiểu cho website hoạt động (lưu ngôn ngữ, cài đặt giao diện).
              Không có cookie quảng cáo, theo dõi hay lập hồ sơ người dùng.
              Bạn có thể tắt cookie trong cài đặt trình duyệt — chức năng chính vẫn hoạt động.
            </p>

            <h2>Quyền riêng tư của trẻ em</h2>
            <p>SnapLoad không hướng đến trẻ em dưới 13 tuổi. Chúng tôi không cố ý thu thập thông tin từ trẻ em.</p>

            <h2>Thay đổi chính sách</h2>
            <p>Chúng tôi sẽ thông báo về các thay đổi quan trọng bằng cách đăng thông báo trên trang chủ.</p>

            <h2>Liên hệ</h2>
            <p>Câu hỏi? Gửi qua trang <a href="/contact">Liên hệ</a> hoặc nút chat 💬 trên màn hình.</p>
          </div>
        </div>
      </div>
    </>
  )
}
