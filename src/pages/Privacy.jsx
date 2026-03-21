import React from 'react'
import SEO from '../components/shared/SEO.jsx'
import styles from './LegalPage.module.css'

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy – SnapLoad"
        description="SnapLoad's privacy policy. We collect minimal data and never store your URLs or downloaded files."
      />
      <div className={styles.page}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.header}>
            <span className={styles.label}>Legal</span>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.meta}>Last updated: March 1, 2025</p>
          </div>

          <div className={styles.body}>
            <p>SnapLoad ("we", "us", "our") is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights.</p>

            <h2>Data we collect</h2>
            <p>We collect the absolute minimum needed to operate the service:</p>
            <ul>
              <li><strong>Video URLs:</strong> Processed transiently to fetch download links. Never stored or logged after your session ends.</li>
              <li><strong>Aggregate usage analytics:</strong> Anonymous data such as page views, country, and browser type. No personal identifiers are collected.</li>
              <li><strong>Session cookies:</strong> Minimal session cookies for core functionality only. No advertising or third-party tracking cookies.</li>
            </ul>

            <h2>Data we do NOT collect</h2>
            <ul>
              <li>Your name, email, or any account information (we don't have accounts)</li>
              <li>Your IP address beyond standard server logs, which are deleted within 24 hours</li>
              <li>The content of videos you download</li>
              <li>Any payment information</li>
            </ul>

            <h2>Third-party services</h2>
            <p>We use a CDN provider for performance and reliability. We do not use Google Analytics, Facebook Pixel, or any behavioural advertising trackers. We do not sell data to any third party.</p>

            <h2>Your rights</h2>
            <p>Since we hold no personal data, there is nothing to delete or export. If you have any privacy concerns, please contact us at <a href="mailto:privacy@snapload.app">privacy@snapload.app</a>.</p>

            <h2>Cookies</h2>
            <p>SnapLoad uses only strictly necessary cookies required for the website to function. We do not use cookies for tracking, profiling, or advertising. You can disable cookies in your browser settings — the core functionality will still work.</p>

            <h2>Children's privacy</h2>
            <p>SnapLoad is not directed at children under 13. We do not knowingly collect information from children. If you believe a child has provided us with personal information, please contact us.</p>

            <h2>Changes to this policy</h2>
            <p>We will notify users of significant changes by posting a notice on the homepage. Continued use of SnapLoad after changes constitutes acceptance of the updated policy.</p>

            <h2>Contact</h2>
            <p>Questions? Email <a href="mailto:privacy@snapload.app">privacy@snapload.app</a></p>
          </div>
        </div>
      </div>
    </>
  )
}
