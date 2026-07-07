import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import AppCard from '../shared/AppCard.jsx'
import DesktopToolCard from '../desktop/DesktopToolCard.jsx'
import { getEffectiveStatus } from '../../hooks/useDeviceStatus.js'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { tools } from '../../data/tools.js'
import { desktopTools } from '../../data/desktopTools.js'
import styles from './FeaturedTools.module.css'

export default function FeaturedTools() {
  const { t } = useLanguage()
  const sortedTools = [...tools].sort((a, b) => {
    const order = { active: 0, coming_soon: 1, maintenance: 2 }
    return (order[getEffectiveStatus(a)] || 0) - (order[getEffectiveStatus(b)] || 0)
  })

  return (
    <>
      <section className={styles.section} id="tools">
        <div className={`container ${styles.inner}`}>
          <div className={styles.headerRow}>
            <div className={styles.header}>
              <span className="section-label">{t('tools.webLabel')}</span>
              <h2 className="section-title">{t('tools.webTitle')}</h2>
              <p className="section-sub">{t('tools.webSub')}</p>
            </div>
          </div>

          <div className={styles.grid}>
            {sortedTools.map(tool => (
              <AppCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt} id="apps">
        <div className={`container ${styles.inner}`}>
          <div className={styles.headerRow}>
            <div className={styles.header}>
              <span className="section-label">{t('tools.appsLabel')}</span>
              <h2 className="section-title">{t('tools.appsTitle')}</h2>
              <p className="section-sub">{t('tools.appsSub')}</p>
            </div>
            <Link to="/tools" className={styles.viewAllLink}>
              {t('tools.viewAll')} <ArrowRight size={15} />
            </Link>
          </div>

          <div className={styles.grid}>
            {desktopTools.map(tool => (
              <DesktopToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
