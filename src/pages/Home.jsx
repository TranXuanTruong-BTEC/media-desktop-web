import React from 'react'
import SEO from '../components/shared/SEO.jsx'
import CTASection from '../components/shared/CTASection.jsx'
import Hero from '../components/home/Hero.jsx'
import FeaturedTools from '../components/home/FeaturedTools.jsx'
import HowItWorks from '../components/home/HowItWorks.jsx'
import TrustSection from '../components/home/TrustSection.jsx'
import WhySection from '../components/home/WhySection.jsx'
import FAQ from '../components/home/FAQ.jsx'

export default function Home() {
  return (
    <>
      <SEO
        title="SnapLoad – Free MP3 & MP4 Downloader"
        description="Download MP3 and MP4 from YouTube, TikTok, Instagram and 50+ platforms. Free, fast, no sign-up required. High quality audio & video downloads."
        keywords="mp3 downloader, mp4 downloader, youtube downloader, video to mp3, free video downloader, tiktok downloader, instagram downloader, download video online"
      />
      <Hero />
      <FeaturedTools />
      <HowItWorks />
      <TrustSection />
      <WhySection />
      <FAQ />
      <CTASection />
    </>
  )
}
