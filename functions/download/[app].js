// Proxy tải file: người dùng chỉ thấy /download/mediaget, không thấy GitHub.
// Cấu hình trên Cloudflare Pages → Settings → Variables and secrets:
//   GH_REPO  = owner/repo (bắt buộc)    GH_TOKEN = token chỉ-đọc (khuyên dùng: tránh giới hạn API, cần nếu repo private)
export async function onRequestGet({ params, env }) {
  const repo = params.app === 'mediaget' ? env.GH_REPO : null
  if (!repo) return new Response('Not found', { status: 404 })

  const h = { 'user-agent': 'mytools-site', accept: 'application/vnd.github+json',
    ...(env.GH_TOKEN ? { authorization: `Bearer ${env.GH_TOKEN}` } : {}) }

  const rel = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers: h, cf: { cacheTtl: 300, cacheEverything: true } })
  if (!rel.ok) return new Response('No release available', { status: 502 })
  const asset = ((await rel.json()).assets || []).find(a => /\.exe$/i.test(a.name))
  if (!asset) return new Response('No installer found', { status: 404 })

  const file = await fetch(asset.url, { headers: { ...h, accept: 'application/octet-stream' } })
  if (!file.ok) return new Response('Download failed', { status: 502 })

  const out = { 'content-type': 'application/octet-stream', 'content-disposition': `attachment; filename="${asset.name}"`, 'cache-control': 'no-store' }
  const len = file.headers.get('content-length'); if (len) out['content-length'] = len
  return new Response(file.body, { headers: out })
}
