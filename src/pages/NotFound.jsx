import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/shared/SEO.jsx'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found – SnapLoad" description="The page you're looking for doesn't exist." />
      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.code}>404</div>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.desc}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className={styles.actions}>
            <Link to="/" className="btn-primary">← Go home</Link>
            <Link to="/#downloader" className="btn-secondary">Try the downloader</Link>
          </div>
        </div>
      </div>
    </>
  )
}
