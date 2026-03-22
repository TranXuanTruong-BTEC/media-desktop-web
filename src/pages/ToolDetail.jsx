import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getToolById, tools } from '../data/tools.js'
import SEO from '../components/shared/SEO.jsx'
import StatusBanner from '../components/shared/StatusBanner.jsx'
import CTASection from '../components/shared/CTASection.jsx'
import AppCard from '../components/shared/AppCard.jsx'
import { getEffectiveStatus } from '../hooks/useDeviceStatus.js'
import ToolHero from '../components/tool/ToolHero.jsx'
import FeatureGrid from '../components/tool/FeatureGrid.jsx'
import ScreenshotSection from '../components/tool/ScreenshotSection.jsx'
import SystemInfo from '../components/tool/SystemInfo.jsx'
import FAQMini from '../components/tool/FAQMini.jsx'
import styles from './ToolDetail.module.css'

export default function ToolDetail() {
  const { toolId } = useParams()
  const tool = getToolById(toolId)

  if (!tool) {
    return (
      <div className={styles.notFound}>
        <h1>Tool not found</h1>
        <Link to="/" className="btn-primary">← Back to Home</Link>
      </div>
    )
  }

  const otherTools = tools.filter(t => t.id !== tool.id).slice(0, 3)

  return (
    <>
      <SEO
        title={`${tool.name} – Free Online Downloader`}
        description={tool.description}
        keywords={`${tool.name.toLowerCase()}, ${tool.platforms.join(', ').toLowerCase()} downloader, free ${tool.formats.join(' ')} download`}
      />

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <Link to="/" className={styles.back}>
            <ArrowLeft size={14} />
            All tools
          </Link>
        </div>
      </div>

      {/* If tool is not active, show full replacement block + disable ToolHero */}
      <StatusBanner status={getEffectiveStatus(tool)} toolName={tool.name} mode="page" />
      {getEffectiveStatus(tool) === 'active' && <ToolHero tool={tool} />}
      <SystemInfo tool={tool} />
      <ScreenshotSection tool={tool} />
      <FeatureGrid tool={tool} />
      <FAQMini tool={tool} />

      {/* Other tools */}
      {otherTools.length > 0 && (
        <section className={styles.moreSection}>
          <div className={`container ${styles.moreInner}`}>
            <h2 className={styles.moreTitle}>More download tools</h2>
            <div className={styles.moreGrid}>
              {otherTools.map(t => (
                <AppCard key={t.id} tool={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={`Start using ${tool.name} now`}
        subtitle="Free, fast, and ready to use — no sign-up required."
        btnText="Download Now →"
      />
    </>
  )
}
