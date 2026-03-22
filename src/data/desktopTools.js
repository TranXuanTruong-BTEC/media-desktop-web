// ─────────────────────────────────────────────────────────────
//  Desktop Tools Data
//  GitHub Releases tự động fetch version + download URL
// ─────────────────────────────────────────────────────────────

export const desktopTools = [
  {
    id: 'media-desktop-app',
    name: 'Media Desktop App',
    tagline: 'Download MP3/MP4 từ YouTube, TikTok, Instagram và 50+ nền tảng',
    description:
      'Ứng dụng Windows mạnh mẽ giúp bạn download nhạc và video từ hơn 50 nền tảng phổ biến. Giao diện thân thiện, hỗ trợ batch download, chọn chất lượng, không cần mở trình duyệt.',

    // GitHub repo để fetch latest release tự động
    _r: 'TranXuanTruong-BTEC/media-desktop-app',
    // Tên file .exe trong GitHub Releases Assets
    assetName: 'MediaDesktopApp-Setup.exe',

    icon: '⬇',
    iconBg: 'rgba(108,92,231,0.15)',
    iconColor: '#a29bfe',
    color: '#6c5ce7',
    accentColor: 'rgba(108,92,231,0.18)',
    category: 'Media',
    platform: ['Windows'],
    ext: 'exe',

    // Fallback khi GitHub API chưa load xong
    version: '1.2.4',
    releaseDate: '2025-03-19',
    fileSize: '135 MB',
    downloadCount: 0,

    // Fallback download URL (direct)
    downloadUrl: 'https://github.com/TranXuanTruong-BTEC/media-desktop-app/releases/latest/download/MediaDesktopApp-Setup.exe',

    screenshots: ['', '', ''],

    features: [
      'Download MP3 lên đến 320 kbps',
      'Download MP4 lên đến 4K Ultra HD',
      'Batch download nhiều link cùng lúc',
      'Hỗ trợ YouTube, TikTok, Instagram, Facebook',
      'Tự động đặt tên file theo tiêu đề video',
      'Giao diện tối/sáng, nhẹ và nhanh',
    ],
    requirements: 'Windows 10/11 (64-bit)',
    changelog: [
      { version: '1.2.4', date: '2025-03-19', notes: 'Update blockmap, cải thiện tốc độ cài đặt' },
      { version: '1.2.3', date: '2025-03-19', notes: 'Update engine, fix lỗi nhỏ' },
      { version: '1.2.0', date: '2025-02-10', notes: 'Thêm hỗ trợ TikTok và Instagram Reels' },
    ],
    featured: true,
    tags: ['media', 'download', 'youtube', 'tiktok', 'windows'],
  },
]

// ─── Helpers ─────────────────────────────────────────────────
export const getFeaturedDesktopTools = () =>
  desktopTools.filter(t => t.featured)

export const getDesktopToolById = (id) =>
  desktopTools.find(t => t.id === id)

export const getAllCategories = () =>
  ['Tất cả', ...new Set(desktopTools.map(t => t.category))]

export function formatDownloadCount(n) {
  if (!n || n === 0) return null          // null → hiển thị '—' ở UI
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n.toLocaleString('vi-VN')        // 1234 → "1.234"
}
