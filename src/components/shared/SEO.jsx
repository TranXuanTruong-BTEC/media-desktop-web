import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function SEO({
  title = 'SnapLoad – Free MP3 & MP4 Downloader',
  description = 'Download MP3 and MP4 from TikTok, Facebook, Instagram, Twitter/X and more. Free, fast, no sign-up. High quality audio & video downloads.',
  keywords = 'mp3 downloader, mp4 downloader, tiktok downloader, video to mp3, free video downloader, tiktok downloader, instagram downloader',
  canonical,
}) {
  const fullTitle = title.includes('SnapLoad') ? title : `${title} | SnapLoad`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'SnapLoad',
        description,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      })}</script>
    </Helmet>
  )
}
