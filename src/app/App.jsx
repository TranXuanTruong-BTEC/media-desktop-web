import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Routes from './routes.jsx'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import ScrollTop from '../components/layout/ScrollTop.jsx'
import Toast from '../components/shared/Toast.jsx'

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
      <Navbar />
      <main>
        <Routes />
      </main>
      <Footer />
    </>
  )
}
