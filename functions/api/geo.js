// Cloudflare Pages Function: trả về mã quốc gia của người truy cập (không cần dịch vụ bên thứ ba)
export const onRequestGet = ({ request }) =>
  new Response(JSON.stringify({ country: request.cf?.country || null }), {
    headers: { 'content-type': 'application/json', 'cache-control': 'private, max-age=86400' },
  })
