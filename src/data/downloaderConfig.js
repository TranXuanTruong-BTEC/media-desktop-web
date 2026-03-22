// ─────────────────────────────────────────────────────────────
//  Downloader Hero Config
//  Auto-managed by Admin Dashboard
//  ⚠️  Đừng sửa tay — dùng Admin > Downloader Config
// ─────────────────────────────────────────────────────────────

export const downloaderConfig = {
  // Trạng thái từng tab theo thiết bị
  tabs: {
    mp3: {
      enabled: true,
      label: 'MP3',
      sub: 'Audio only',
      deviceStatus: { desktop: 'active', android: 'active', ios: 'active' },
    },
    mp4: {
      enabled: true,
      label: 'MP4',
      sub: 'Video + Audio',
      deviceStatus: { desktop: 'active', android: 'active', ios: 'coming_soon' },
    },
    convert: {
      enabled: true,
      label: 'Convert',
      sub: 'MP4 → MP3',
      deviceStatus: { desktop: 'active', android: 'active', ios: 'active' },
    },
  },

  // Chất lượng mặc định khi mở
  defaultQuality: {
    mp3:     '320',
    mp4:     '1080',
    convert: '320',
  },

  // Platforms hiển thị ở dưới widget
  platforms: [
        { name: 'TikTok',     dot: '#69C9D0' },
    { name: 'Instagram',  dot: '#e1306c' },
    { name: 'Facebook',   dot: '#1877f2' },
    { name: 'Twitter / X',dot: '#1da1f2' },
    { name: 'Vimeo',      dot: '#6772e5' },
    { name: 'Reddit',     dot: '#ff4500' },
    { name: '+40 more',   dot: '#5c5a78' },
  ],
}
