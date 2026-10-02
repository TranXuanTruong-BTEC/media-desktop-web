import { useEffect, useMemo, useState } from 'react'
import { Box, Search, Sun, Moon, Github, ArrowRight, Globe, Lock } from 'lucide-react'
import { PROJECTS, CATEGORIES, LINKS } from './data'
import { LANGS, initialLang, geoLang, hasSavedLang, saveLang } from './i18n'

export default function App() {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [lang, setLang] = useState(initialLang)
  const t = LANGS[lang]
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
          <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
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
                  : <a className="gh" href={p.repo} target="_blank" rel="noreferrer" aria-label={`${p.title} on GitHub`}><Github size={14} /></a>}
              </div>
              <h3>{p.title}</h3>
              <p>{desc(p)}</p>
              <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
              {p.locked
                ? <button className="btn full" disabled><Lock size={14} /> {t.soon}</button>
                : <a className="btn full" href={p.url} target="_blank" rel="noreferrer">{t[p.action || 'launch']}</a>}
            </article>
          ))}
          {list.length === 0 && <p className="empty">{t.empty}</p>}
        </section>
      </main>
    </>
  )
}
