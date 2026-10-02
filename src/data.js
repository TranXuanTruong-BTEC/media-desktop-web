import { Download, Bot, Code2, Palette, TrendingUp, Bug, Briefcase, Megaphone, Star } from 'lucide-react'

// Sửa link của bạn ở đây
export const LINKS = { github: 'https://github.com/TranXuanTruong-BTEC', contact: 'mailto:you@example.com' }
export const CATEGORIES = ['AI', 'Web', 'Mobile', 'UI', 'Desktop']

// locked: true = chưa phát hành (thẻ bị khóa). Khi ra mắt: bỏ locked, thêm url + repo.
// action: nhãn nút ('download' | 'launch').
// cat: một trong CATEGORIES · url: link "Launch App" · repo: link GitHub của dự án
export const PROJECTS = [
  { title: 'MediaGet', desc: 'Download video and audio from YouTube, TikTok, Facebook and 1000+ sites.', tags: ['Electron', 'Windows'], cat: 'Desktop', icon: Download, action: 'download',
    url: 'https://github.com/TranXuanTruong-BTEC/media-desktop-app/releases/latest', repo: 'https://github.com/TranXuanTruong-BTEC/media-desktop-app' },
  { title: 'AI Image Generator', desc: 'Turn text prompts into images with a clean, fast interface.', tags: ['React', 'Python'], cat: 'AI', icon: Bot, locked: true },
  { title: 'Code Snippet Manager', desc: 'Save, tag and search your favorite code snippets in one place.', tags: ['React', 'Python'], cat: 'Web', icon: Code2, locked: true },
  { title: 'Color Palette', desc: 'Generate and export harmonious color palettes for any design.', tags: ['Tailwind', 'UI'], cat: 'UI', icon: Palette, locked: true },
  { title: 'TaskFlow', desc: 'A lightweight task tracker to plan your day and stay focused.', tags: ['Flutter', 'Mobile'], cat: 'Mobile', icon: TrendingUp, locked: true },
  { title: 'Web Scraper', desc: 'Collect structured data from web pages with simple rules.', tags: ['React', 'Python'], cat: 'Web', icon: Bug, locked: true },
  { title: 'Portfolio Builder', desc: 'Create a personal portfolio site from ready-made sections.', tags: ['React', 'Python'], cat: 'Web', icon: Briefcase, locked: true },
  { title: 'Social Media Tool', desc: 'Plan, preview and schedule posts across your channels.', tags: ['React', 'AI'], cat: 'AI', icon: Megaphone, locked: true },
  { title: 'Portfolio V2', desc: 'The next version of my portfolio with a fresh, modern look.', tags: ['React', 'UI'], cat: 'UI', icon: Star, locked: true },
]
