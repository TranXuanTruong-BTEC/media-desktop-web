import { useState } from 'react'
import { ADS } from './ads'

const KEY = 'ads-consent'
const read = () => { try { return localStorage.getItem(KEY) } catch { return null } }

// Quảng cáo chỉ tải sau khi người dùng đồng ý, và chạy trong iframe sandbox:
// mã của bên thứ ba bị cô lập khỏi trang và không thể tự chuyển hướng trang của bạn.
export default function Ads({ t }) {
  const [c, setC] = useState(read)
  if (!ADS.enabled || ADS.slots.length === 0) return null
  const set = v => { setC(v); try { localStorage.setItem(KEY, v) } catch {} }

  return (
    <>
      {c === 'yes' && (
        <section className="ads" aria-label={t.adLabel}>
          {ADS.slots.map(s => (
            <iframe key={s.id} src={s.src} width={s.width} height={s.height} title={t.adLabel} loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" />
          ))}
          <small>{t.adLabel}</small>
        </section>
      )}
      {c === null && (
        <div className="consent" role="dialog" aria-label={t.adLabel}>
          <p>{t.consent}</p>
          <button className="btn" onClick={() => set('yes')}>{t.allow}</button>
          <button className="link-btn" onClick={() => set('no')}>{t.decline}</button>
        </div>
      )}
    </>
  )
}
