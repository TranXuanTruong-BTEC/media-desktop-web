// Proxy tải file: người dùng chỉ thấy /download/<tên-app>, không thấy GitHub.
// Mỗi app một biến trên Cloudflare Pages (Settings → Variables and secrets):
//   GH_REPO_<TÊN_APP>  = owner/repo     ví dụ: /download/mediaget → GH_REPO_MEDIAGET
//                                        /download/my-app   → GH_REPO_MY_APP
//   GH_TOKEN (secret, dùng chung) = token GitHub chỉ-đọc (Contents: Read-only)
const EXT = ['exe', 'msi', 'dmg', 'apk', 'appimage', 'zip'] // thứ tự ưu tiên khi chọn file trong Release
const SAFE = { 'x-content-type-options': 'nosniff', 'x-robots-tag': 'noindex', 'cache-control': 'no-store' }
const fail = (msg, status) => new Response(msg, { status, headers: { ...SAFE, 'content-type': 'text/plain; charset=utf-8' } })

export async function onRequestGet({ params, env }) {
  try {
    const app = String(params.app || '').toLowerCase()
    if (!/^[a-z0-9-]{1,40}$/.test(app)) return fail('Not found', 404)
    const repo = env[`GH_REPO_${app.toUpperCase().replace(/-/g, '_')}`]
    if (typeof repo !== 'string' || !/^[\w.-]+\/[\w.-]+$/.test(repo)) return fail('Not found', 404)

    const h = { 'user-agent': 'mytools-site', accept: 'application/vnd.github+json',
      ...(env.GH_TOKEN ? { authorization: `Bearer ${env.GH_TOKEN}` } : {}) }

    const rel = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers: h, cf: { cacheTtl: 300, cacheEverything: true } })
    if (!rel.ok) return fail(`No release available (${rel.status})`, 502)
    const assets = (await rel.json()).assets || []
    const ext = n => String(n).split('.').pop().toLowerCase()
    const asset = EXT.map(e => assets.find(a => ext(a.name) === e)).find(Boolean)
    // Chỉ tải từ API GitHub của đúng repo đã cấu hình (chống bị dẫn sang địa chỉ lạ)
    if (!asset || !String(asset.url).startsWith(`https://api.github.com/repos/${repo}/`)) return fail('No installer found', 404)

    const file = await fetch(asset.url, { headers: { ...h, accept: 'application/octet-stream' } })
    if (!file.ok) return fail('Download failed', 502)

    const name = String(asset.name).replace(/[^\w.-]/g, '_').slice(0, 120) // chặn ký tự lạ/xuống dòng trong tên file
    const out = { ...SAFE, 'content-type': 'application/octet-stream', 'content-disposition': `attachment; filename="${name}"` }
    const len = file.headers.get('content-length'); if (len) out['content-length'] = len
    return new Response(file.body, { headers: out })
  } catch {
    return fail('Service unavailable', 503)
  }
}
