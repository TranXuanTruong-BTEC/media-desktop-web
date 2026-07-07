import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import AppCard from '../shared/AppCard.jsx'
import DesktopToolCard from '../desktop/DesktopToolCard.jsx'
import CompareSection from './CompareSection.jsx'
import DevCta from './DevCta.jsx'
import { getEffectiveStatus } from '../../hooks/useDeviceStatus.js'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { tools } from '../../data/tools.js'
import { desktopTools } from '../../data/desktopTools.js'
import styles from './FeaturedTools.module.css'

export default function FeaturedTools() {
  const { t } = useLanguage()
  const [platform, setPlatform] = useState('all')

  const sortedTools = [...tools].sort((a, b) => {
    const order = { active: 0, coming_soon: 1, maintenance: 2 }
    return (order[getEffectiveStatus(a)] || 0) - (order[getEffectiveStatus(b)] || 0)
  })

  const categoryTabs = [
    { key: 'all',   label: t('tools.tabAll') },
    { key: 'video', label: t('tools.tabVideo') },
    { key: 'image', label: t('tools.tabImage') },
    { key: 'other', label: t('tools.tabOther') },
  ]

  const platformOptions = useMemo(() => {
    const set = new Set()
    desktopTools.forEach(tool => (tool.platform || []).forEach(p => set.add(p)))
    return Array.from(set)
  }, [])

  const filteredApps = platform === 'all'
    ? desktopTools
    : desktopTools.filter(tool => (tool.platform || []).includes(platform))

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

          <div className={styles.catTabs}>
            {categoryTabs.map(tab => (
              <button
                key={tab.key}
                className={`${styles.catTab} ${tab.key === 'all' ? styles.catTabActive : ''}`}
              >
                {tab.label}
              </button>
            ))}
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

          {platformOptions.length > 1 && (
            <div className={styles.platformFilter}>
              <button
                className={`${styles.pfChip} ${platform === 'all' ? styles.pfChipActive : ''}`}
                onClick={() => setPlatform('all')}
              >
                {t('platformFilter.all')}
              </button>
              {platformOptions.map(p => (
                <button
                  key={p}
                  className={`${styles.pfChip} ${platform === p ? styles.pfChipActive : ''}`}
                  onClick={() => setPlatform(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <div className={styles.grid}>
            {filteredApps.map(tool => (
              <DesktopToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <DevCta />
      <CompareSection />
    </>
  )
}
