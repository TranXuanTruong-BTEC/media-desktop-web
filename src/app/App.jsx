import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Routes from './routes.jsx'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import ScrollTop from '../components/layout/ScrollTop.jsx'
import Toast from '../components/shared/Toast.jsx'
import Onboarding, { OnboardingTrigger } from '../components/shared/Onboarding.jsx'
import { DonateNavBtn } from '../components/shared/DonateModal.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <ScrollTop />
      <Toast />
      <Onboarding />
      <OnboardingTrigger />
      <Navbar />
      <main>
        <Routes />
      </main>
      <Footer />
    </>
  )
}
