// ────────────────────────────────────────────────
// SnapLoad — i18n dictionary
// Thêm ngôn ngữ mới: copy 1 khối, đổi key, dịch giá trị.
// ────────────────────────────────────────────────

export const LANGUAGES = [
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'English',    flag: '🇬🇧' },
  { code: 'zh', label: '中文',        flag: '🇨🇳' },
  { code: 'ja', label: '日本語',      flag: '🇯🇵' },
  { code: 'ko', label: '한국어',      flag: '🇰🇷' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷' },
]

export const DEFAULT_LANG = 'vi'

export const translations = {
  vi: {
    nav: {
      downloader: 'Downloader', webTools: 'Công cụ web', apps: 'Ứng dụng',
      features: 'Tính năng', faq: 'FAQ', ctaFree: 'Dùng miễn phí →',
      toolsExe: 'Tools .exe',
    },
    hero: {
      badge: '100% miễn phí · Không cần đăng ký',
      titleLine1: 'Dán link. Chọn định dạng.',
      titleAccent: 'Tải về.',
      sub: 'SnapLoad tổng hợp mọi công cụ tải & xử lý media vào một chỗ. Dùng ngay bên dưới, hoặc tải app riêng cho từng nhu cầu.',
    },
    tools: {
      webLabel: '// Dùng ngay trên web', webTitle: 'Công cụ trực tuyến',
      webSub: 'Không cần cài đặt — mở là dùng được ngay, cho mọi nhu cầu tải & xử lý media.',
      appsLabel: '// Tải về máy', appsTitle: 'Ứng dụng desktop & di động',
      appsSub: 'Cần xử lý nhanh hơn, hàng loạt, hoặc dùng offline? Tải ứng dụng riêng cho từng nhu cầu.',
      viewAll: 'Xem tất cả ứng dụng',
    },
    footer: {
      desc: 'Tải MP3 và MP4 từ TikTok, Facebook, Instagram, Twitter/X và nhiều hơn nữa. Miễn phí, nhanh, không quảng cáo, không đăng ký.',
      copyright: '© 2026 SnapLoad. Đã đăng ký bản quyền.',
      privacy: 'Riêng tư', terms: 'Điều khoản',
    },
    theme: { toLight: 'Chuyển sang giao diện sáng', toDark: 'Chuyển sang giao diện tối' },
    lang: { choose: 'Chọn ngôn ngữ' },
  },
  en: {
    nav: {
      downloader: 'Downloader', webTools: 'Web Tools', apps: 'Apps',
      features: 'Features', faq: 'FAQ', ctaFree: 'Use for free →',
      toolsExe: 'Tools .exe',
    },
    hero: {
      badge: '100% Free · No Sign-up Required',
      titleLine1: 'Paste a link. Pick a format.',
      titleAccent: 'Download.',
      sub: 'SnapLoad brings every media tool you need into one place. Use it right below, or download a dedicated app for each task.',
    },
    tools: {
      webLabel: '// Use right now', webTitle: 'Online tools',
      webSub: 'Nothing to install — open and use instantly, for any media task.',
      appsLabel: '// Download to your device', appsTitle: 'Desktop & mobile apps',
      appsSub: 'Need it faster, in bulk, or offline? Grab a dedicated app for the job.',
      viewAll: 'View all apps',
    },
    footer: {
      desc: 'Download MP3 and MP4 from TikTok, Facebook, Instagram, Twitter/X and more. Free, fast, no ads, no sign-up.',
      copyright: '© 2026 SnapLoad. All rights reserved.',
      privacy: 'Privacy', terms: 'Terms',
    },
    theme: { toLight: 'Switch to light mode', toDark: 'Switch to dark mode' },
    lang: { choose: 'Choose language' },
  },
  zh: {
    nav: {
      downloader: '下载器', webTools: '在线工具', apps: '应用程序',
      features: '功能', faq: '常见问题', ctaFree: '免费使用 →',
      toolsExe: '桌面工具',
    },
    hero: {
      badge: '100% 免费 · 无需注册',
      titleLine1: '粘贴链接，选择格式，',
      titleAccent: '立即下载。',
      sub: 'SnapLoad 将你需要的所有媒体工具集中在一处。可直接在下方使用，也可为每种需求下载专属应用。',
    },
    tools: {
      webLabel: '// 立即在线使用', webTitle: '在线工具',
      webSub: '无需安装，打开即用，满足各种媒体处理需求。',
      appsLabel: '// 下载到设备', appsTitle: '桌面与移动应用',
      appsSub: '需要更快、批量处理或离线使用？下载专属应用即可。',
      viewAll: '查看全部应用',
    },
    footer: {
      desc: '从 TikTok、Facebook、Instagram、Twitter/X 等平台下载 MP3 和 MP4。免费、快速、无广告、无需注册。',
      copyright: '© 2026 SnapLoad。保留所有权利。',
      privacy: '隐私政策', terms: '使用条款',
    },
    theme: { toLight: '切换到浅色模式', toDark: '切换到深色模式' },
    lang: { choose: '选择语言' },
  },
  ja: {
    nav: {
      downloader: 'ダウンローダー', webTools: 'ウェブツール', apps: 'アプリ',
      features: '機能', faq: 'よくある質問', ctaFree: '無料で使う →',
      toolsExe: 'デスクトップツール',
    },
    hero: {
      badge: '100% 無料 · 登録不要',
      titleLine1: 'リンクを貼って、形式を選ぶ。',
      titleAccent: 'ダウンロード。',
      sub: 'SnapLoad は必要なメディアツールを一箇所にまとめました。すぐ下で使うか、用途別のアプリをダウンロードできます。',
    },
    tools: {
      webLabel: '// すぐウェブで使う', webTitle: 'オンラインツール',
      webSub: 'インストール不要、開いてすぐ使えます。',
      appsLabel: '// 端末にダウンロード', appsTitle: 'デスクトップ＆モバイルアプリ',
      appsSub: 'もっと速く、一括で、オフラインで使いたい方は専用アプリをどうぞ。',
      viewAll: 'すべてのアプリを見る',
    },
    footer: {
      desc: 'TikTok、Facebook、Instagram、Twitter/X などから MP3・MP4 をダウンロード。無料・高速・広告なし・登録不要。',
      copyright: '© 2026 SnapLoad. All rights reserved.',
      privacy: 'プライバシー', terms: '利用規約',
    },
    theme: { toLight: 'ライトモードに切り替え', toDark: 'ダークモードに切り替え' },
    lang: { choose: '言語を選択' },
  },
  ko: {
    nav: {
      downloader: '다운로더', webTools: '웹 도구', apps: '앱',
      features: '기능', faq: '자주 묻는 질문', ctaFree: '무료로 사용 →',
      toolsExe: '데스크톱 도구',
    },
    hero: {
      badge: '100% 무료 · 가입 불필요',
      titleLine1: '링크를 붙여넣고 형식을 선택하세요.',
      titleAccent: '다운로드.',
      sub: 'SnapLoad는 필요한 모든 미디어 도구를 한곳에 모았습니다. 바로 아래에서 사용하거나 용도별 앱을 다운로드하세요.',
    },
    tools: {
      webLabel: '// 지금 바로 웹에서 사용', webTitle: '온라인 도구',
      webSub: '설치할 필요 없이 바로 사용할 수 있습니다.',
      appsLabel: '// 기기에 다운로드', appsTitle: '데스크톱 & 모바일 앱',
      appsSub: '더 빠르게, 대량으로, 오프라인으로 사용하고 싶다면 전용 앱을 받아보세요.',
      viewAll: '모든 앱 보기',
    },
    footer: {
      desc: 'TikTok, Facebook, Instagram, Twitter/X 등에서 MP3와 MP4를 다운로드하세요. 무료, 빠름, 광고 없음, 가입 불필요.',
      copyright: '© 2026 SnapLoad. All rights reserved.',
      privacy: '개인정보처리방침', terms: '이용약관',
    },
    theme: { toLight: '라이트 모드로 전환', toDark: '다크 모드로 전환' },
    lang: { choose: '언어 선택' },
  },
  es: {
    nav: {
      downloader: 'Descargador', webTools: 'Herramientas web', apps: 'Aplicaciones',
      features: 'Funciones', faq: 'Preguntas', ctaFree: 'Usar gratis →',
      toolsExe: 'Herramientas .exe',
    },
    hero: {
      badge: '100% gratis · Sin registro',
      titleLine1: 'Pega un enlace. Elige un formato.',
      titleAccent: 'Descarga.',
      sub: 'SnapLoad reúne todas las herramientas de medios que necesitas en un solo lugar. Úsalas aquí abajo o descarga una app dedicada.',
    },
    tools: {
      webLabel: '// Usa ahora mismo', webTitle: 'Herramientas en línea',
      webSub: 'Nada que instalar — ábrelo y úsalo al instante.',
      appsLabel: '// Descarga a tu dispositivo', appsTitle: 'Apps de escritorio y móvil',
      appsSub: '¿Necesitas más velocidad, lotes o modo sin conexión? Descarga la app dedicada.',
      viewAll: 'Ver todas las apps',
    },
    footer: {
      desc: 'Descarga MP3 y MP4 de TikTok, Facebook, Instagram, Twitter/X y más. Gratis, rápido, sin anuncios, sin registro.',
      copyright: '© 2026 SnapLoad. Todos los derechos reservados.',
      privacy: 'Privacidad', terms: 'Términos',
    },
    theme: { toLight: 'Cambiar a modo claro', toDark: 'Cambiar a modo oscuro' },
    lang: { choose: 'Elegir idioma' },
  },
  fr: {
    nav: {
      downloader: 'Téléchargeur', webTools: 'Outils web', apps: 'Applications',
      features: 'Fonctionnalités', faq: 'FAQ', ctaFree: 'Utiliser gratuitement →',
      toolsExe: 'Outils .exe',
    },
    hero: {
      badge: '100% gratuit · Sans inscription',
      titleLine1: 'Collez un lien. Choisissez un format.',
      titleAccent: 'Téléchargez.',
      sub: 'SnapLoad regroupe tous les outils média dont vous avez besoin en un seul endroit. Utilisez-les ci-dessous, ou téléchargez une appli dédiée.',
    },
    tools: {
      webLabel: '// À utiliser tout de suite', webTitle: 'Outils en ligne',
      webSub: 'Rien à installer — ouvrez et utilisez instantanément.',
      appsLabel: '// À télécharger', appsTitle: 'Applications bureau & mobile',
      appsSub: 'Besoin de plus de rapidité, en masse, ou hors ligne ? Téléchargez l\'appli dédiée.',
      viewAll: 'Voir toutes les applications',
    },
    footer: {
      desc: 'Téléchargez des MP3 et MP4 depuis TikTok, Facebook, Instagram, Twitter/X et plus encore. Gratuit, rapide, sans publicité, sans inscription.',
      copyright: '© 2026 SnapLoad. Tous droits réservés.',
      privacy: 'Confidentialité', terms: 'Conditions',
    },
    theme: { toLight: 'Passer au mode clair', toDark: 'Passer au mode sombre' },
    lang: { choose: 'Choisir la langue' },
  },
}

export function getTranslator(lang) {
  const dict = translations[lang] || translations[DEFAULT_LANG]
  return function t(path) {
    const parts = path.split('.')
    let node = dict
    for (const p of parts) {
      node = node?.[p]
      if (node === undefined) break
    }
    if (node === undefined) {
      // fallback to default language if key missing in current lang
      let fallback = translations[DEFAULT_LANG]
      for (const p of parts) fallback = fallback?.[p]
      return fallback ?? path
    }
    return node
  }
}
