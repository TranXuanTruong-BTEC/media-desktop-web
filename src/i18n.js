// Thêm ngôn ngữ mới: thêm 1 mục vào LANGS, và (nếu muốn) mã quốc gia vào COUNTRY_LANG.
// `desc` dịch mô tả dự án theo tiêu đề; thiếu thì dùng tiếng Anh trong data.js.
export const LANGS = {
  en: { name: 'English', home: 'Home', projects: 'Projects', categories: 'Categories', github: 'GitHub', contact: 'Contact',
    search: 'Search tools...', a: 'EXPLORE MY CREATIONS', b: '& TOOLS', sub: 'A curated collection of innovative apps, utilities, and projects built by me.',
    cta: 'View Cards', launch: 'Launch App', empty: 'No tools match your search.', desc: {} },
  vi: { name: 'Tiếng Việt', home: 'Trang chủ', projects: 'Dự án', categories: 'Danh mục', github: 'GitHub', contact: 'Liên hệ',
    search: 'Tìm công cụ...', a: 'KHÁM PHÁ SÁNG TẠO', b: '& CÔNG CỤ', sub: 'Bộ sưu tập chọn lọc các ứng dụng, tiện ích và dự án sáng tạo do tôi xây dựng.',
    cta: 'Xem dự án', launch: 'Mở ứng dụng', empty: 'Không có công cụ nào phù hợp.', desc: {
      'AI Image Generator': 'Biến mô tả văn bản thành hình ảnh với giao diện gọn gàng, nhanh chóng.',
      'Code Snippet Manager': 'Lưu, gắn thẻ và tìm kiếm các đoạn mã yêu thích ở một nơi.',
      'Color Palette': 'Tạo và xuất bảng màu hài hòa cho mọi thiết kế.',
      'TaskFlow': 'Trình theo dõi công việc nhẹ nhàng để lên kế hoạch và tập trung.',
      'Web Scraper': 'Thu thập dữ liệu có cấu trúc từ trang web bằng quy tắc đơn giản.',
      'Portfolio Builder': 'Tạo trang portfolio cá nhân từ các khối có sẵn.',
      'Social Media Tool': 'Lên kế hoạch, xem trước và hẹn giờ đăng bài trên nhiều kênh.',
      'Portfolio V2': 'Phiên bản portfolio tiếp theo với diện mạo mới, hiện đại.' } },
  ja: { name: '日本語', home: 'ホーム', projects: 'プロジェクト', categories: 'カテゴリ', github: 'GitHub', contact: 'お問い合わせ',
    search: 'ツールを検索...', a: '私の作品', b: '& ツール', sub: '私が作った革新的なアプリ、ユーティリティ、プロジェクトを厳選して紹介します。',
    cta: '作品を見る', launch: 'アプリを起動', empty: '該当するツールがありません。', desc: {
      'AI Image Generator': 'テキストから画像を生成する、シンプルで高速なツール。',
      'Code Snippet Manager': 'お気に入りのコードを保存・タグ付け・検索できます。',
      'Color Palette': 'あらゆるデザインに合う配色を生成してエクスポート。',
      'TaskFlow': '一日の計画と集中をサポートする軽量タスク管理。',
      'Web Scraper': 'シンプルなルールでウェブから構造化データを収集。',
      'Portfolio Builder': '用意されたセクションで個人ポートフォリオを作成。',
      'Social Media Tool': '複数チャンネルへの投稿を計画・プレビュー・予約。',
      'Portfolio V2': '新しくモダンな見た目になった次期ポートフォリオ。' } },
  zh: { name: '中文', home: '首页', projects: '项目', categories: '分类', github: 'GitHub', contact: '联系',
    search: '搜索工具...', a: '探索我的作品', b: '& 工具', sub: '精选我开发的创新应用、实用工具和项目合集。',
    cta: '查看项目', launch: '启动应用', empty: '没有找到匹配的工具。', desc: {
      'AI Image Generator': '用简洁快速的界面，将文字描述变成图片。',
      'Code Snippet Manager': '在一处保存、标记和搜索你喜爱的代码片段。',
      'Color Palette': '为任何设计生成并导出和谐的配色方案。',
      'TaskFlow': '轻量的任务管理工具，帮你规划一天、保持专注。',
      'Web Scraper': '用简单规则从网页中提取结构化数据。',
      'Portfolio Builder': '用现成的模块快速搭建个人作品集网站。',
      'Social Media Tool': '规划、预览并定时发布多渠道内容。',
      'Portfolio V2': '全新现代外观的下一版作品集。' } },
  es: { name: 'Español', home: 'Inicio', projects: 'Proyectos', categories: 'Categorías', github: 'GitHub', contact: 'Contacto',
    search: 'Buscar herramientas...', a: 'EXPLORA MIS CREACIONES', b: 'Y HERRAMIENTAS', sub: 'Una colección seleccionada de apps, utilidades y proyectos innovadores creados por mí.',
    cta: 'Ver proyectos', launch: 'Abrir app', empty: 'No hay herramientas que coincidan.', desc: {
      'AI Image Generator': 'Convierte texto en imágenes con una interfaz limpia y rápida.',
      'Code Snippet Manager': 'Guarda, etiqueta y busca tus fragmentos de código favoritos.',
      'Color Palette': 'Genera y exporta paletas de color armoniosas para cualquier diseño.',
      'TaskFlow': 'Un gestor de tareas ligero para planificar tu día y mantener el foco.',
      'Web Scraper': 'Recopila datos estructurados de páginas web con reglas simples.',
      'Portfolio Builder': 'Crea tu portfolio personal a partir de secciones listas.',
      'Social Media Tool': 'Planifica, previsualiza y programa publicaciones en tus canales.',
      'Portfolio V2': 'La próxima versión de mi portfolio con un aspecto fresco y moderno.' } },
}

const COUNTRY_LANG = { VN: 'vi', JP: 'ja', CN: 'zh', TW: 'zh', HK: 'zh', MO: 'zh',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es', EC: 'es', UY: 'es' }

const saved = () => { try { const s = localStorage.getItem('lang'); return LANGS[s] ? s : null } catch { return null } }
const fromBrowser = () => {
  for (const l of navigator.languages || [navigator.language]) {
    const k = (l || '').slice(0, 2).toLowerCase()
    if (LANGS[k]) return k
  }
  return 'en'
}

export const hasSavedLang = () => !!saved()
export const saveLang = l => { try { localStorage.setItem('lang', l) } catch {} }
// Ngôn ngữ ban đầu (đồng bộ): lựa chọn đã lưu > ngôn ngữ trình duyệt
export const initialLang = () => saved() || fromBrowser()
// Theo vị trí (quốc gia) của người truy cập; không xác định được thì trả null để giữ nguyên
export async function geoLang() {
  try {
    const r = await fetch('/api/geo', { cache: 'no-store' })
    const { country } = await r.json()
    return COUNTRY_LANG[country] || (country ? 'en' : null)
  } catch { return null }
}
