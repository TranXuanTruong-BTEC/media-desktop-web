import { useEffect, useMemo, useState } from 'react'
import { Box, Search, Sun, Moon, Github, ArrowRight } from 'lucide-react'
import { PROJECTS, CATEGORIES, LINKS } from './data'

export default function App() {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'dark' } catch { return 'dark' }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return PROJECTS.filter(p =>
      (cat === 'All' || p.cat === cat) &&
      `${p.title} ${p.desc} ${p.tags.join(' ')}`.toLowerCase().includes(s))
  }, [cat, q])

  return (
    <>
      <header className="nav">
        <a className="logo" href="#top"><Box size={20} /> MyTools</a>
        <nav className="links">
          <a href="#top" onClick={() => setCat('All')}>Home</a>
          <a href="#projects">Projects</a>
          <span className="muted">Categories</span>
          <div className="pills">
            {CATEGORIES.map(c => (
              <button key={c} className={cat === c ? 'pill on' : 'pill'}
                onClick={() => setCat(cat === c ? 'All' : c)}>{c}</button>
            ))}
          </div>
          <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={LINKS.contact}>Contact</a>
        </nav>
        <label className="search">
          <Search size={14} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search tools..." />
        </label>
        <button className="icon-btn" aria-label="Toggle theme"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <h1>EXPLORE MY CREATIONS <span>& TOOLS</span></h1>
          <p>A curated collection of innovative apps, utilities, and projects built by me.</p>
          <a className="btn" href="#projects">View Cards <ArrowRight size={14} /></a>
        </section>

        <section id="projects" className="grid">
          {list.map(p => (
            <article className="card" key={p.title}>
              <div className="card-top">
                <span className="ico"><p.icon size={20} /></span>
                <a className="gh" href={p.repo} target="_blank" rel="noreferrer" aria-label={`${p.title} on GitHub`}>
                  <Github size={14} />
                </a>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
              <a className="btn full" href={p.url} target="_blank" rel="noreferrer">Launch App</a>
            </article>
          ))}
          {list.length === 0 && <p className="empty">No tools match your search.</p>}
        </section>
      </main>
    </>
  )
}
