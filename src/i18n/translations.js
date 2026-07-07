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
    stats: { webTools: 'CÔNG CỤ WEB', apps: 'ỨNG DỤNG', free: 'MIỄN PHÍ', signup: 'CẦN ĐĂNG KÝ' },
    hero: {
      badge: '100% miễn phí · Không cần đăng ký',
      titleLine1: 'Dán link. Chọn định dạng.',
      titleAccent: 'Tải về.',
      sub: 'SnapLoad tổng hợp mọi công cụ tải & xử lý media vào một chỗ. Dùng ngay bên dưới, hoặc tải app riêng cho từng nhu cầu.',
    },
    tools: {
      tabAll: 'Tất cả', tabVideo: 'Video & âm thanh', tabImage: 'Ảnh & PDF', tabOther: 'Tiện ích khác',
      webLabel: '// Dùng ngay trên web', webTitle: 'Công cụ trực tuyến',
      webSub: 'Không cần cài đặt — mở là dùng được ngay, cho mọi nhu cầu tải & xử lý media.',
      appsLabel: '// Tải về máy', appsTitle: 'Ứng dụng desktop & di động',
      appsSub: 'Cần xử lý nhanh hơn, hàng loạt, hoặc dùng offline? Tải ứng dụng riêng cho từng nhu cầu.',
      viewAll: 'Xem tất cả ứng dụng',
    },
    compare: {
      label: '// Web hay app?', title: 'Chọn theo nhu cầu sử dụng',
      sub: 'Cả hai đều miễn phí — dùng web khi cần nhanh, tải app khi cần dùng thường xuyên.',
      feature: 'Tính năng', colWeb: 'Công cụ web', colApp: 'Ứng dụng tải về',
      f1: 'Không cần cài đặt', f2: 'Xử lý hàng loạt, offline', f3: 'Tự động cập nhật', f4: 'Dùng được trên mọi thiết bị',
      yes: 'Có', no: 'Không', limited: 'Giới hạn', byVersion: 'Theo phiên bản', byPlatform: 'Theo nền tảng',
    },
    devCta: {
      title: 'Có ứng dụng muốn chia sẻ với mọi người?',
      desc: 'Đăng ứng dụng của bạn lên SnapLoad — chúng tôi lo phần trang giới thiệu và thống kê lượt tải.',
      btn: 'Đăng ứng dụng của bạn',
    },
    platformFilter: { all: 'Tất cả nền tảng' },
    footer: {
      desc: 'Tải MP3 và MP4 từ TikTok, Facebook, Instagram, Twitter/X và nhiều hơn nữa. Miễn phí, nhanh, không quảng cáo, không đăng ký.',
      copyright: '© 2026 SnapLoad. Đã đăng ký bản quyền.',
      privacy: 'Riêng tư', terms: 'Điều khoản',
    },
    theme: { toLight: 'Chuyển sang giao diện sáng', toDark: 'Chuyển sang giao diện tối' },
    lang: { choose: 'Chọn ngôn ngữ' },
    status: { active: 'Hoạt động', comingSoon: 'Sắp ra mắt', maintenance: 'Bảo trì' },
    button: { openTool: 'Mở công cụ', comingSoon: 'Sắp có' },
  },
  en: {
    nav: {
      downloader: 'Downloader', webTools: 'Web Tools', apps: 'Apps',
      features: 'Features', faq: 'FAQ', ctaFree: 'Use for free →',
      toolsExe: 'Tools .exe',
    },
    stats: { webTools: 'WEB TOOLS', apps: 'APPS', free: 'FREE', signup: 'SIGN-UP NEEDED' },
    hero: {
      badge: '100% Free · No Sign-up Required',
      titleLine1: 'Paste a link. Pick a format.',
      titleAccent: 'Download.',
      sub: 'SnapLoad brings every media tool you need into one place. Use it right below, or download a dedicated app for each task.',
    },
    tools: {
      tabAll: 'All', tabVideo: 'Video & audio', tabImage: 'Image & PDF', tabOther: 'Other utilities',
      webLabel: '// Use right now', webTitle: 'Online tools',
      webSub: 'Nothing to install — open and use instantly, for any media task.',
      appsLabel: '// Download to your device', appsTitle: 'Desktop & mobile apps',
      appsSub: 'Need it faster, in bulk, or offline? Grab a dedicated app for the job.',
      viewAll: 'View all apps',
    },
    compare: {
      label: '// Web or app?', title: 'Pick what fits your workflow',
      sub: 'Both are free — use the web for a quick one-off, or the app for regular use.',
      feature: 'Feature', colWeb: 'Web tool', colApp: 'Downloadable app',
      f1: 'Nothing to install', f2: 'Batch processing, offline', f3: 'Auto-updates', f4: 'Works on any device',
      yes: 'Yes', no: 'No', limited: 'Limited', byVersion: 'Per version', byPlatform: 'Per platform',
    },
    devCta: {
      title: 'Have an app you\'d like to share?',
      desc: 'List your app on SnapLoad — we handle the listing page and download stats.',
      btn: 'Submit your app',
    },
    platformFilter: { all: 'All platforms' },
    footer: {
      desc: 'Download MP3 and MP4 from TikTok, Facebook, Instagram, Twitter/X and more. Free, fast, no ads, no sign-up.',
      copyright: '© 2026 SnapLoad. All rights reserved.',
      privacy: 'Privacy', terms: 'Terms',
    },
    theme: { toLight: 'Switch to light mode', toDark: 'Switch to dark mode' },
    lang: { choose: 'Choose language' },
    status: { active: 'Active', comingSoon: 'Coming soon', maintenance: 'Maintenance' },
    button: { openTool: 'Open tool', comingSoon: 'Coming soon' },
  },
  zh: {
    nav: {
      downloader: '下载器', webTools: '在线工具', apps: '应用程序',
      features: '功能', faq: '常见问题', ctaFree: '免费使用 →',
      toolsExe: '桌面工具',
    },
    stats: { webTools: '网页工具', apps: '应用程序', free: '免费', signup: '需要注册' },
    hero: {
      badge: '100% 免费 · 无需注册',
      titleLine1: '粘贴链接，选择格式，',
      titleAccent: '立即下载。',
      sub: 'SnapLoad 将你需要的所有媒体工具集中在一处。可直接在下方使用，也可为每种需求下载专属应用。',
    },
    tools: {
      tabAll: '全部', tabVideo: '视频与音频', tabImage: '图片与PDF', tabOther: '其他工具',
      webLabel: '// 立即在线使用', webTitle: '在线工具',
      webSub: '无需安装，打开即用，满足各种媒体处理需求。',
      appsLabel: '// 下载到设备', appsTitle: '桌面与移动应用',
      appsSub: '需要更快、批量处理或离线使用？下载专属应用即可。',
      viewAll: '查看全部应用',
    },
    compare: {
      label: '// 网页还是应用？', title: '按需求选择',
      sub: '两者都免费——临时使用选网页，经常使用请下载应用。',
      feature: '功能', colWeb: '网页工具', colApp: '下载应用',
      f1: '无需安装', f2: '批量处理、离线可用', f3: '自动更新', f4: '适用于任何设备',
      yes: '支持', no: '不支持', limited: '有限', byVersion: '按版本', byPlatform: '按平台',
    },
    devCta: {
      title: '有想分享的应用吗？',
      desc: '将你的应用发布到 SnapLoad——我们负责展示页面和下载统计。',
      btn: '提交你的应用',
    },
    platformFilter: { all: '所有平台' },
    footer: {
      desc: '从 TikTok、Facebook、Instagram、Twitter/X 等平台下载 MP3 和 MP4。免费、快速、无广告、无需注册。',
      copyright: '© 2026 SnapLoad。保留所有权利。',
      privacy: '隐私政策', terms: '使用条款',
    },
    theme: { toLight: '切换到浅色模式', toDark: '切换到深色模式' },
    lang: { choose: '选择语言' },
    status: { active: '运行中', comingSoon: '即将推出', maintenance: '维护中' },
    button: { openTool: '打开工具', comingSoon: '即将推出' },
  },
  ja: {
    nav: {
      downloader: 'ダウンローダー', webTools: 'ウェブツール', apps: 'アプリ',
      features: '機能', faq: 'よくある質問', ctaFree: '無料で使う →',
      toolsExe: 'デスクトップツール',
    },
    stats: { webTools: 'ウェブツール', apps: 'アプリ', free: '無料', signup: '登録要否' },
    hero: {
      badge: '100% 無料 · 登録不要',
      titleLine1: 'リンクを貼って、形式を選ぶ。',
      titleAccent: 'ダウンロード。',
      sub: 'SnapLoad は必要なメディアツールを一箇所にまとめました。すぐ下で使うか、用途別のアプリをダウンロードできます。',
    },
    tools: {
      tabAll: 'すべて', tabVideo: '動画・音声', tabImage: '画像・PDF', tabOther: 'その他',
      webLabel: '// すぐウェブで使う', webTitle: 'オンラインツール',
      webSub: 'インストール不要、開いてすぐ使えます。',
      appsLabel: '// 端末にダウンロード', appsTitle: 'デスクトップ＆モバイルアプリ',
      appsSub: 'もっと速く、一括で、オフラインで使いたい方は専用アプリをどうぞ。',
      viewAll: 'すべてのアプリを見る',
    },
    compare: {
      label: '// ウェブかアプリか？', title: '用途に合わせて選択',
      sub: 'どちらも無料です。すぐ使うならウェブ、日常的に使うならアプリ。',
      feature: '機能', colWeb: 'ウェブツール', colApp: 'ダウンロードアプリ',
      f1: 'インストール不要', f2: '一括処理・オフライン対応', f3: '自動更新', f4: 'どの端末でも使用可能',
      yes: '対応', no: '非対応', limited: '一部対応', byVersion: 'バージョンによる', byPlatform: 'プラットフォームによる',
    },
    devCta: {
      title: '共有したいアプリがありますか？',
      desc: 'SnapLoad にアプリを掲載しましょう。紹介ページとダウンロード統計はこちらで対応します。',
      btn: 'アプリを申請する',
    },
    platformFilter: { all: 'すべてのプラットフォーム' },
    footer: {
      desc: 'TikTok、Facebook、Instagram、Twitter/X などから MP3・MP4 をダウンロード。無料・高速・広告なし・登録不要。',
      copyright: '© 2026 SnapLoad. All rights reserved.',
      privacy: 'プライバシー', terms: '利用規約',
    },
    theme: { toLight: 'ライトモードに切り替え', toDark: 'ダークモードに切り替え' },
    lang: { choose: '言語を選択' },
    status: { active: '稼働中', comingSoon: '近日公開', maintenance: 'メンテナンス中' },
    button: { openTool: 'ツールを開く', comingSoon: '近日公開' },
  },
  ko: {
    nav: {
      downloader: '다운로더', webTools: '웹 도구', apps: '앱',
      features: '기능', faq: '자주 묻는 질문', ctaFree: '무료로 사용 →',
      toolsExe: '데스크톱 도구',
    },
    stats: { webTools: '웹 도구', apps: '앱', free: '무료', signup: '가입 필요' },
    hero: {
      badge: '100% 무료 · 가입 불필요',
      titleLine1: '링크를 붙여넣고 형식을 선택하세요.',
      titleAccent: '다운로드.',
      sub: 'SnapLoad는 필요한 모든 미디어 도구를 한곳에 모았습니다. 바로 아래에서 사용하거나 용도별 앱을 다운로드하세요.',
    },
    tools: {
      tabAll: '전체', tabVideo: '비디오 & 오디오', tabImage: '이미지 & PDF', tabOther: '기타 유틸리티',
      webLabel: '// 지금 바로 웹에서 사용', webTitle: '온라인 도구',
      webSub: '설치할 필요 없이 바로 사용할 수 있습니다.',
      appsLabel: '// 기기에 다운로드', appsTitle: '데스크톱 & 모바일 앱',
      appsSub: '더 빠르게, 대량으로, 오프라인으로 사용하고 싶다면 전용 앱을 받아보세요.',
      viewAll: '모든 앱 보기',
    },
    compare: {
      label: '// 웹 vs 앱?', title: '용도에 맞게 선택하세요',
      sub: '둘 다 무료입니다 — 빠르게 한 번 쓸 땐 웹, 자주 쓸 땐 앱을 이용하세요.',
      feature: '기능', colWeb: '웹 도구', colApp: '다운로드 앱',
      f1: '설치 불필요', f2: '일괄 처리, 오프라인 사용', f3: '자동 업데이트', f4: '모든 기기에서 사용 가능',
      yes: '지원', no: '미지원', limited: '제한적', byVersion: '버전별', byPlatform: '플랫폼별',
    },
    devCta: {
      title: '공유하고 싶은 앱이 있나요?',
      desc: 'SnapLoad에 앱을 등록하세요 — 소개 페이지와 다운로드 통계는 저희가 관리합니다.',
      btn: '앱 등록하기',
    },
    platformFilter: { all: '모든 플랫폼' },
    footer: {
      desc: 'TikTok, Facebook, Instagram, Twitter/X 등에서 MP3와 MP4를 다운로드하세요. 무료, 빠름, 광고 없음, 가입 불필요.',
      copyright: '© 2026 SnapLoad. All rights reserved.',
      privacy: '개인정보처리방침', terms: '이용약관',
    },
    theme: { toLight: '라이트 모드로 전환', toDark: '다크 모드로 전환' },
    lang: { choose: '언어 선택' },
    status: { active: '운영 중', comingSoon: '출시 예정', maintenance: '점검 중' },
    button: { openTool: '도구 열기', comingSoon: '출시 예정' },
  },
  es: {
    nav: {
      downloader: 'Descargador', webTools: 'Herramientas web', apps: 'Aplicaciones',
      features: 'Funciones', faq: 'Preguntas', ctaFree: 'Usar gratis →',
      toolsExe: 'Herramientas .exe',
    },
    stats: { webTools: 'HERRAMIENTAS', apps: 'APPS', free: 'GRATIS', signup: 'REGISTRO NECESARIO' },
    hero: {
      badge: '100% gratis · Sin registro',
      titleLine1: 'Pega un enlace. Elige un formato.',
      titleAccent: 'Descarga.',
      sub: 'SnapLoad reúne todas las herramientas de medios que necesitas en un solo lugar. Úsalas aquí abajo o descarga una app dedicada.',
    },
    tools: {
      tabAll: 'Todos', tabVideo: 'Video y audio', tabImage: 'Imagen y PDF', tabOther: 'Otras utilidades',
      webLabel: '// Usa ahora mismo', webTitle: 'Herramientas en línea',
      webSub: 'Nada que instalar — ábrelo y úsalo al instante.',
      appsLabel: '// Descarga a tu dispositivo', appsTitle: 'Apps de escritorio y móvil',
      appsSub: '¿Necesitas más velocidad, lotes o modo sin conexión? Descarga la app dedicada.',
      viewAll: 'Ver todas las apps',
    },
    compare: {
      label: '// ¿Web o app?', title: 'Elige según tu necesidad',
      sub: 'Ambas son gratis — usa la web para algo rápido, o la app para uso frecuente.',
      feature: 'Función', colWeb: 'Herramienta web', colApp: 'App descargable',
      f1: 'Nada que instalar', f2: 'Procesamiento por lotes, sin conexión', f3: 'Actualizaciones automáticas', f4: 'Funciona en cualquier dispositivo',
      yes: 'Sí', no: 'No', limited: 'Limitado', byVersion: 'Según versión', byPlatform: 'Según plataforma',
    },
    devCta: {
      title: '¿Tienes una app para compartir?',
      desc: 'Publica tu app en SnapLoad — nosotros nos encargamos de la página y las estadísticas.',
      btn: 'Enviar tu app',
    },
    platformFilter: { all: 'Todas las plataformas' },
    footer: {
      desc: 'Descarga MP3 y MP4 de TikTok, Facebook, Instagram, Twitter/X y más. Gratis, rápido, sin anuncios, sin registro.',
      copyright: '© 2026 SnapLoad. Todos los derechos reservados.',
      privacy: 'Privacidad', terms: 'Términos',
    },
    theme: { toLight: 'Cambiar a modo claro', toDark: 'Cambiar a modo oscuro' },
    lang: { choose: 'Elegir idioma' },
    status: { active: 'Activo', comingSoon: 'Próximamente', maintenance: 'Mantenimiento' },
    button: { openTool: 'Abrir herramienta', comingSoon: 'Próximamente' },
  },
  fr: {
    nav: {
      downloader: 'Téléchargeur', webTools: 'Outils web', apps: 'Applications',
      features: 'Fonctionnalités', faq: 'FAQ', ctaFree: 'Utiliser gratuitement →',
      toolsExe: 'Outils .exe',
    },
    stats: { webTools: 'OUTILS WEB', apps: 'APPS', free: 'GRATUIT', signup: 'INSCRIPTION REQUISE' },
    hero: {
      badge: '100% gratuit · Sans inscription',
      titleLine1: 'Collez un lien. Choisissez un format.',
      titleAccent: 'Téléchargez.',
      sub: 'SnapLoad regroupe tous les outils média dont vous avez besoin en un seul endroit. Utilisez-les ci-dessous, ou téléchargez une appli dédiée.',
    },
    tools: {
      tabAll: 'Tout', tabVideo: 'Vidéo & audio', tabImage: 'Image & PDF', tabOther: 'Autres utilitaires',
      webLabel: '// À utiliser tout de suite', webTitle: 'Outils en ligne',
      webSub: 'Rien à installer — ouvrez et utilisez instantanément.',
      appsLabel: '// À télécharger', appsTitle: 'Applications bureau & mobile',
      appsSub: 'Besoin de plus de rapidité, en masse, ou hors ligne ? Téléchargez l\'appli dédiée.',
      viewAll: 'Voir toutes les applications',
    },
    compare: {
      label: '// Web ou appli ?', title: 'Choisissez selon votre besoin',
      sub: 'Les deux sont gratuits — le web pour un usage rapide, l\'appli pour un usage régulier.',
      feature: 'Fonctionnalité', colWeb: 'Outil web', colApp: 'Appli à télécharger',
      f1: 'Rien à installer', f2: 'Traitement en masse, hors ligne', f3: 'Mises à jour automatiques', f4: 'Fonctionne sur tout appareil',
      yes: 'Oui', no: 'Non', limited: 'Limité', byVersion: 'Selon la version', byPlatform: 'Selon la plateforme',
    },
    devCta: {
      title: 'Une appli à partager ?',
      desc: 'Publiez votre appli sur SnapLoad — nous gérons la page de présentation et les statistiques.',
      btn: 'Soumettre votre appli',
    },
    platformFilter: { all: 'Toutes les plateformes' },
    footer: {
      desc: 'Téléchargez des MP3 et MP4 depuis TikTok, Facebook, Instagram, Twitter/X et plus encore. Gratuit, rapide, sans publicité, sans inscription.',
      copyright: '© 2026 SnapLoad. Tous droits réservés.',
      privacy: 'Confidentialité', terms: 'Conditions',
    },
    theme: { toLight: 'Passer au mode clair', toDark: 'Passer au mode sombre' },
    lang: { choose: 'Choisir la langue' },
    status: { active: 'Actif', comingSoon: 'Bientôt disponible', maintenance: 'Maintenance' },
    button: { openTool: "Ouvrir l'outil", comingSoon: 'Bientôt disponible' },
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
