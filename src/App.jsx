import { useEffect, useMemo, useState } from 'react'
import { Box, Search, Sun, Moon, Info, X, ArrowRight, Globe, Lock } from 'lucide-react'
import { PROJECTS, CATEGORIES, LINKS } from './data'
import { LANGS, initialLang, geoLang, hasSavedLang, saveLang } from './i18n'

export default function App() {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [lang, setLang] = useState(initialLang)
  const t = LANGS[lang]
  const [open, setOpen] = useState(null)

  useEffect(() => {
    const k = e => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'dark' } catch { return 'dark' }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  // Tự nhận diện quốc gia khi người dùng chưa tự chọn ngôn ngữ
  useEffect(() => {
    if (hasSavedLang()) return
    let off = false
    geoLang().then(l => { if (l && !off) setLang(l) })
    return () => { off = true }
  }, [])

  const pick = l => { setLang(l); saveLang(l) }
  const desc = p => t.desc[p.title] || p.desc

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return PROJECTS.filter(p =>
      (cat === 'All' || p.cat === cat) &&
      `${p.title} ${desc(p)} ${p.tags.join(' ')}`.toLowerCase().includes(s))
  }, [cat, q, lang])

  return (
    <>
      <header className="nav">
        <a className="logo" href="#top"><Box size={20} /> MyTools</a>
        <nav className="links">
          <a href="#top" onClick={() => setCat('All')}>{t.home}</a>
          <a href="#projects">{t.projects}</a>
          <span className="muted">{t.categories}</span>
          <div className="pills">
            {CATEGORIES.map(c => (
              <button key={c} className={cat === c ? 'pill on' : 'pill'}
                onClick={() => setCat(cat === c ? 'All' : c)}>{c}</button>
            ))}
          </div>
          <a href={LINKS.contact}>{t.contact}</a>
        </nav>
        <label className="search">
          <Search size={14} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder={t.search} />
        </label>
        <label className="lang">
          <Globe size={14} />
          <select value={lang} onChange={e => pick(e.target.value)} aria-label="Language">
            {Object.entries(LANGS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
        </label>
        <button className="icon-btn" aria-label="Toggle theme"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <h1>{t.a} <span>{t.b}</span></h1>
          <p>{t.sub}</p>
          <a className="btn" href="#projects">{t.cta} <ArrowRight size={14} /></a>
        </section>

        <section id="projects" className="grid">
          {list.map(p => (
            <article className={p.locked ? 'card locked' : 'card'} key={p.title}>
              <div className="card-top">
                <span className="ico"><p.icon size={20} /></span>
                {p.locked
                  ? <span className="gh" title={t.soon}><Lock size={14} /></span>
                  : <button className="gh" onClick={() => setOpen(p)} aria-label={t.details}><Info size={14} /></button>}
              </div>
              <h3>{p.title}</h3>
              <p>{desc(p)}</p>
              <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
              {p.locked
                ? <button className="btn full" disabled><Lock size={14} /> {t.soon}</button>
                : <>
                    <button className="link-btn" onClick={() => setOpen(p)}>{t.details}</button>
                    <a className="btn full" href={p.url}>{t[p.action || 'launch']}</a>
                  </>}
            </article>
          ))}
          {list.length === 0 && <p className="empty">{t.empty}</p>}
        </section>
      </main>

      {open && (
        <div className="overlay" onClick={() => setOpen(null)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
            <button className="icon-btn x" onClick={() => setOpen(null)} aria-label={t.close}><X size={16} /></button>
            <span className="ico"><open.icon size={22} /></span>
            <h2>{open.title}</h2>
            <p className="muted">{desc(open)}</p>
            <h4>{t.features}</h4>
            <ul>{(t.feat?.[open.title] || open.features || []).map(f => <li key={f}>{f}</li>)}</ul>
            <div className="tags">{open.tags.map(x => <span key={x}>{x}</span>)}</div>
            <a className="btn full" href={open.url}>{t[open.action || 'launch']}</a>
          </div>
        </div>
      )}
    </>
  )
}
