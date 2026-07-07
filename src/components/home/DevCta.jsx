import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext.jsx'
import styles from './DevCta.module.css'

export default function DevCta() {
  const { t } = useLanguage()
  return (
    <section className={styles.section} id="dev">
      <div className="container">
        <div className={styles.band}>
          <div>
            <h3 className={styles.title}>{t('devCta.title')}</h3>
            <p className={styles.desc}>{t('devCta.desc')}</p>
          </div>
          <Link to="/contact" className={styles.btn}>{t('devCta.btn')}</Link>
        </div>
      </div>
    </section>
  )
}
