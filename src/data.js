import { Bot, Code2, Palette, TrendingUp, Bug, Briefcase, Megaphone, Star } from 'lucide-react'

// Sửa link của bạn ở đây
export const LINKS = { github: 'https://github.com/TranXuanTruong-BTEC', contact: 'mailto:you@example.com' }
export const CATEGORIES = ['AI', 'Web', 'Mobile', 'UI']

// cat: một trong CATEGORIES · url: link "Launch App" · repo: link GitHub của dự án
export const PROJECTS = [
  { title: 'AI Image Generator', desc: 'Turn text prompts into images with a clean, fast interface.', tags: ['React', 'Python'], cat: 'AI', icon: Bot, url: '#', repo: '#' },
  { title: 'Code Snippet Manager', desc: 'Save, tag and search your favorite code snippets in one place.', tags: ['React', 'Python'], cat: 'Web', icon: Code2, url: '#', repo: '#' },
  { title: 'Color Palette', desc: 'Generate and export harmonious color palettes for any design.', tags: ['Tailwind', 'UI'], cat: 'UI', icon: Palette, url: '#', repo: '#' },
  { title: 'TaskFlow', desc: 'A lightweight task tracker to plan your day and stay focused.', tags: ['Flutter', 'Mobile'], cat: 'Mobile', icon: TrendingUp, url: '#', repo: '#' },
  { title: 'Web Scraper', desc: 'Collect structured data from web pages with simple rules.', tags: ['React', 'Python'], cat: 'Web', icon: Bug, url: '#', repo: '#' },
  { title: 'Portfolio Builder', desc: 'Create a personal portfolio site from ready-made sections.', tags: ['React', 'Python'], cat: 'Web', icon: Briefcase, url: '#', repo: '#' },
  { title: 'Social Media Tool', desc: 'Plan, preview and schedule posts across your channels.', tags: ['React', 'AI'], cat: 'AI', icon: Megaphone, url: '#', repo: '#' },
  { title: 'Portfolio V2', desc: 'The next version of my portfolio with a fresh, modern look.', tags: ['React', 'UI'], cat: 'UI', icon: Star, url: '#', repo: '#' },
]
