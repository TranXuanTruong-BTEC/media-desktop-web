export const tools = [
  {
    slug: "yt2-downloader",
    name: "YT2 Downloader",
    icon: "🎬",
    description:
      "Tải video và audio từ YouTube nhanh chóng với chất lượng cao. Hỗ trợ MP4, MP3 và nhiều định dạng khác.",
    version: "1.2.0",
    os: "Windows 10/11 (64-bit)",
    size: "45MB",
    updated: "01/03/2026",
    download: "/downloads/yt2-downloader.exe",

    // ========================
    // FEATURE GRID
    // ========================
    features: [
      {
        icon: "⚡",
        title: "Tốc độ cao",
        desc: "Tải video với tốc độ tối ưu nhờ engine xử lý native."
      },
      {
        icon: "🎵",
        title: "Chuyển MP3 dễ dàng",
        desc: "Tách audio từ video chỉ với 1 click."
      },
      {
        icon: "📦",
        title: "Nhiều định dạng",
        desc: "Hỗ trợ MP4, MP3, WebM và nhiều chuẩn phổ biến."
      },
      {
        icon: "🧠",
        title: "Tự động nhận diện link",
        desc: "Chỉ cần paste URL, app tự xử lý."
      },
      {
        icon: "🖥",
        title: "Giao diện tối giản",
        desc: "Thiết kế tập trung trải nghiệm người dùng."
      },
      {
        icon: "🔒",
        title: "Không thu thập dữ liệu",
        desc: "Ứng dụng hoạt động hoàn toàn local."
      }
    ],

    // ========================
    // SCREENSHOTS
    // ========================
    screenshots: [
      "/images/yt2-1.png",
      "/images/yt2-2.png",
      "/images/yt2-3.png",
      "/images/yt2-4.png"
    ],

    // ========================
    // SYSTEM REQUIREMENTS
    // ========================
    requirements: [
      { title: "Hệ điều hành", value: "Windows 10/11 (64-bit)" },
      { title: "RAM", value: "Tối thiểu 4GB" },
      { title: "CPU", value: "Intel i3 hoặc tương đương" },
      { title: "Dung lượng trống", value: "200MB" },
      { title: "Kết nối mạng", value: "Cần internet để tải nội dung" }
    ],

    // ========================
    // FAQ MINI
    // ========================
    faqs: [
      {
        question: "Ứng dụng có miễn phí không?",
        answer:
          "Có, YT2 Downloader hoàn toàn miễn phí và không có quảng cáo."
      },
      {
        question: "Có giới hạn số lượng tải không?",
        answer:
          "Không. Bạn có thể tải không giới hạn số lượng video."
      },
      {
        question: "Có cần tài khoản YouTube không?",
        answer:
          "Không cần. Chỉ cần link video công khai."
      },
      {
        question: "Ứng dụng có an toàn không?",
        answer:
          "Có. Ứng dụng không thu thập dữ liệu và không chứa phần mềm độc hại."
      }
    ]
  },

  // =========================================================
  // TOOL 2 (Ví dụ để scale sau này)
  // =========================================================
  {
    slug: "image-compressor",
    name: "Image Compressor",
    icon: "🖼",
    description:
      "Nén hình ảnh chất lượng cao mà không làm giảm độ sắc nét. Hỗ trợ JPG, PNG, WebP.",
    version: "1.0.0",
    os: "Windows 10/11 (64-bit)",
    size: "32MB",
    updated: "20/02/2026",
    download: "/downloads/image-compressor.exe",

    features: [
      {
        icon: "📉",
        title: "Giảm dung lượng mạnh",
        desc: "Giảm đến 80% dung lượng mà vẫn giữ chất lượng."
      },
      {
        icon: "⚙",
        title: "Tùy chỉnh chất lượng",
        desc: "Cho phép điều chỉnh mức nén linh hoạt."
      },
      {
        icon: "📂",
        title: "Batch processing",
        desc: "Nén nhiều ảnh cùng lúc."
      }
    ],

    screenshots: [
      "/images/compressor-1.png",
      "/images/compressor-2.png"
    ],

    requirements: [
      { title: "Hệ điều hành", value: "Windows 10/11 (64-bit)" },
      { title: "RAM", value: "2GB trở lên" },
      { title: "Dung lượng trống", value: "150MB" }
    ],

    faqs: [
      {
        question: "Có giới hạn số lượng ảnh không?",
        answer: "Không. Bạn có thể xử lý batch không giới hạn."
      },
      {
        question: "Có làm giảm chất lượng ảnh nhiều không?",
        answer: "Không. Thuật toán tối ưu để giữ độ sắc nét tối đa."
      }
    ]
  }
];