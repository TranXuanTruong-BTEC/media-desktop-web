import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Download } from 'lucide-react'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Downloader', href: '/#downloader' },
  { label: 'Tính năng',  href: '/#features' },
  { label: 'Tools',      href: '/tools', isPage: true },
  { label: 'FAQ',        href: '/#faq' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  const handleAnchor = (href) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.href = href
      }
    }
    setOpen(false)
  }

  const isActive = (href) => {
    if (href === '/tools') return location.pathname.startsWith('/tools')
    return false
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
          {navLinks.map(link => (
            <li key={link.href}>
              {link.isPage ? (
                <Link
                  to={link.href}
                  className={`${styles.link} ${isActive(link.href) ? styles.linkActive : ''}`}
                >
                  {link.label}
                  {link.href === '/tools' && (
                    <span className={styles.toolsPill}>New</span>
                  )}
                </Link>
              ) : (
                <button
                  className={styles.link}
                  onClick={() => handleAnchor(link.href)}
                >
                  {link.label}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className={styles.actions}>
          <Link to="/tools" className={styles.toolsBtn}>
            🧰 Tools
          </Link>
          <button
            className={styles.ctaBtn}
            onClick={() => handleAnchor('/#downloader')}
          >
            Dùng miễn phí →
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
        {navLinks.map(link => (
          link.isPage ? (
            <Link
              key={link.href}
              to={link.href}
              className={`${styles.mobileLink} ${isActive(link.href) ? styles.mobileLinkActive : ''}`}
            >
              {link.label}
            </Link>
          ) : (
            <button
              key={link.href}
              className={styles.mobileLink}
              onClick={() => handleAnchor(link.href)}
            >
              {link.label}
            </button>
          )
        ))}
        <Link to="/tools" className={styles.mobileCta}>
          🧰 Tải Tools miễn phí →
        </Link>
      </div>
    </nav>
  )
}
