import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Download, ChevronDown, Music, Video, Repeat, Layers, ListVideo, Mic2 } from 'lucide-react'
import { DonateNavBtn } from '../shared/DonateModal.jsx'
import ThemeToggle from '../shared/ThemeToggle.jsx'
import LanguageSwitcher from '../shared/LanguageSwitcher.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { tools } from '../../data/tools.js'
import styles from './Navbar.module.css'

const TOOL_ICONS = {
    'tiktok-downloader':   { icon: '♪', color: '#69C9D0' },
  'instagram-downloader':{ icon: '◈', color: '#e1306c' },
  'twitter-downloader':  { icon: '✕', color: '#1da1f2' },
  'facebook-downloader': { icon: 'f', color: '#1877f2' },
  'audio-extractor':     { icon: '♫', color: '#3654ff' },
}

const WEB_TOOLS = [
  { label: 'Batch Download',   sub: 'Nhiều link cùng lúc',  icon: '📋', href: '/#downloader', tab: 'batch' },
  { label: 'Playlist',         sub: 'Tải cả playlist',       icon: '📜', href: '/#downloader', tab: 'playlist' },
  { label: 'Convert MP4→MP3',  sub: 'Upload file convert',  icon: '🔄', href: '/#downloader', tab: 'convert' },
  { label: 'ID3 Tag Editor',   sub: 'Ghi thông tin bài hát',icon: '🏷',  href: '/#downloader', tab: 'mp3' },
]

export default function Navbar() {
  const [open,        setOpen]        = useState(false)
  const [toolsOpen,   setToolsOpen]   = useState(false)
  const [scrolled,    setScrolled]    = useState(false)
  const location = useLocation()
  const dropRef  = useRef(null)
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setToolsOpen(false) }, [location.pathname])

  useEffect(() => {
    const onClick = (e) => {
      if (!dropRef.current?.contains(e.target)) setToolsOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const handleAnchor = (href, tab) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        // If there's a tab param, dispatch custom event to switch tab
        if (tab) window.dispatchEvent(new CustomEvent('snapload:tab', { detail: tab }))
      } else {
        window.location.href = tab ? `${href}&tab=${tab}` : href
      }
    }
    setOpen(false)
    setToolsOpen(false)
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.inner} container`}>

        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}><Download size={15} /></span>
          Snap<span className={styles.logoAccent}>Load</span>
        </Link>

        {/* Desktop links */}
        <ul className={styles.links}>
          <li>
            <button className={styles.link} onClick={() => handleAnchor('/#downloader')}>
              {t('nav.downloader')}
            </button>
          </li>

          {/* Web Tools dropdown */}
          <li className={styles.dropWrap} ref={dropRef}>
            <button
              className={`${styles.link} ${styles.dropTrigger} ${toolsOpen ? styles.dropTriggerOpen : ''}`}
              onClick={() => setToolsOpen(o => !o)}
            >
              {t('nav.webTools')}
              <ChevronDown size={13} className={`${styles.chevron} ${toolsOpen ? styles.chevronOpen : ''}`}/>
            </button>

            {toolsOpen && (
              <div className={styles.dropdown}>
                {/* Downloader tools */}
                <div className={styles.dropSection}>
                  <div className={styles.dropSectionLabel}>📥 Tải video / âm thanh</div>
                  <div className={styles.dropGrid}>
                    {tools.filter(t => t.status !== 'coming_soon').map(t => (
                      <Link
                        key={t.id}
                        to={`/tool/${t.slug}`}
                        className={styles.dropItem}
                        onClick={() => setToolsOpen(false)}
                      >
                        <span className={styles.dropIcon}
                          style={{ background: `${TOOL_ICONS[t.id]?.color || t.color}22`,
                                   color: TOOL_ICONS[t.id]?.color || t.color }}>
                          {t.icon}
                        </span>
                        <div>
                          <div className={styles.dropItemName}>{t.name}</div>
                          <div className={styles.dropItemSub}>{t.platforms?.join(', ')}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Other web tools */}
                <div className={styles.dropDivider}/>
                <div className={styles.dropSection}>
                  <div className={styles.dropSectionLabel}>⚡ Tính năng đặc biệt</div>
                  <div className={styles.dropGrid}>
                    {WEB_TOOLS.map(t => (
                      <button
                        key={t.label}
                        className={styles.dropItem}
                        onClick={() => handleAnchor(t.href, t.tab)}
                      >
                        <span className={styles.dropIcon} style={{ background:'rgba(54,84,255,.15)', color:'#5a72ff' }}>
                          {t.icon}
                        </span>
                        <div>
                          <div className={styles.dropItemName}>{t.label}</div>
                          <div className={styles.dropItemSub}>{t.sub}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </li>

          <li>
            <button className={styles.link} onClick={() => handleAnchor('/#features')}>
              {t('nav.features')}
            </button>
          </li>
          <li>
            <button className={styles.link} onClick={() => handleAnchor('/#faq')}>
              {t('nav.faq')}
            </button>
          </li>
        </ul>

        {/* Desktop CTA */}
        <div className={styles.actions}>
          <LanguageSwitcher />
          <ThemeToggle />
          <DonateNavBtn />
          <Link to="/tools" className={styles.toolsBtn}>
            🧰 {t('nav.toolsExe')}
          </Link>
          <button
            className={styles.ctaBtn}
            onClick={() => handleAnchor('/#downloader')}
          >
            {t('nav.ctaFree')}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileTopRow}>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <button className={styles.mobileLink} onClick={() => handleAnchor('/#downloader')}>
          {t('nav.downloader')}
        </button>
        <div className={styles.mobileSectionLabel}>{t('nav.webTools')}</div>
        {tools.filter(t2 => t2.status !== 'coming_soon').map(t2 => (
          <Link key={t2.id} to={`/tool/${t2.slug}`} className={styles.mobileLink}
            onClick={() => setOpen(false)}>
            {t2.icon} {t2.name}
          </Link>
        ))}
        {WEB_TOOLS.map(w => (
          <button key={w.label} className={styles.mobileLink}
            onClick={() => handleAnchor(w.href, w.tab)}>
            {w.icon} {w.label}
          </button>
        ))}
        <button className={styles.mobileLink} onClick={() => handleAnchor('/#features')}>{t('nav.features')}</button>
        <button className={styles.mobileLink} onClick={() => handleAnchor('/#faq')}>{t('nav.faq')}</button>
        <Link to="/tools" className={styles.mobileCta}>
          🧰 {t('nav.toolsExe')} — {t('nav.ctaFree')}
        </Link>
      </div>
    </nav>
  )
}
