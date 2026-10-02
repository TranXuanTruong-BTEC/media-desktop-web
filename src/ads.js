// QUẢNG CÁO — mặc định TẮT. Để bật (ví dụ với Adsterra):
//  1) Tạo tài khoản Publisher, thêm website, tạo ô quảng cáo định dạng Banner (hoặc Native Banner).
//  2) Dán mã Adsterra đưa cho bạn vào public/ads/banner.html (chỗ có chú thích).
//  3) Ở đây: đặt enabled: true và bỏ chú thích dòng slot, chỉnh width/height cho đúng kích thước đã tạo.
// Mã quảng cáo chạy trong trang riêng /ads/banner.html (CSP nới lỏng riêng, xem public/_headers) + iframe sandbox,
// còn trang chính vẫn giữ CSP chặt. Chỉ dùng banner/native. KHÔNG bật Popunder/Social Bar/redirect.
export const ADS = {
  enabled: false,
  slots: [
    // { id: 'banner-1', src: '/ads/banner.html', width: 728, height: 90 },
  ],
}
