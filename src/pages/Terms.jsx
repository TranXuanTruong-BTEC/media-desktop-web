import React from 'react'
import SEO from '../components/shared/SEO.jsx'
import styles from './LegalPage.module.css'

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service – SnapLoad"
        description="SnapLoad's terms of service. Please read before using our video download tools."
      />
      <div className={styles.page}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.header}>
            <span className={styles.label}>Legal</span>
            <h1 className={styles.title}>Terms of Service</h1>
            <p className={styles.meta}>Last updated: March 1, 2025</p>
          </div>

          <div className={styles.body}>
            <p>By using SnapLoad ("the service"), you agree to the following terms. Please read them carefully. If you do not agree, do not use the service.</p>

            <h2>1. Acceptable use</h2>
            <ul>
              <li>You may use SnapLoad for personal, non-commercial downloading of content you have the right to access.</li>
              <li>You may not use SnapLoad to download and redistribute copyrighted content without express authorization from the rights holder.</li>
              <li>You may not use SnapLoad for any illegal purpose or in violation of applicable laws.</li>
              <li>You may not attempt to reverse-engineer, scrape, abuse, or overload SnapLoad's infrastructure.</li>
              <li>You may not use automated scripts or bots to access the service at scale without written permission.</li>
            </ul>

            <h2>2. Copyright and intellectual property</h2>
            <p>SnapLoad is a tool that enables access to publicly available content. You are solely responsible for ensuring your downloads comply with applicable copyright law and the terms of service of each source platform. SnapLoad respects intellectual property rights and will respond to valid DMCA notices.</p>
            <p>SnapLoad does not host, store, or distribute video content. We provide a processing service only.</p>

            <h2>3. Disclaimer of warranties</h2>
            <p>SnapLoad is provided "as is" and "as available" without warranties of any kind, express or implied. We do not guarantee that the service will be uninterrupted, error-free, or available at all times. Download availability depends on third-party platforms and may change at any time without notice.</p>

            <h2>4. Limitation of liability</h2>
            <p>To the maximum extent permitted by law, SnapLoad and its operators shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the service, including but not limited to loss of data, profits, or goodwill.</p>

            <h2>5. Service modifications</h2>
            <p>We reserve the right to modify, suspend, or discontinue any part of the service at any time, with or without notice. We will make reasonable efforts to communicate significant changes in advance.</p>

            <h2>6. Governing law</h2>
            <p>These terms shall be governed by and construed in accordance with applicable law. Any disputes shall be resolved through binding arbitration or the courts of competent jurisdiction.</p>

            <h2>7. Contact</h2>
            <p>Questions about these terms? Email <a href="mailto:legal@snapload.app">legal@snapload.app</a></p>
          </div>
        </div>
      </div>
    </>
  )
}
