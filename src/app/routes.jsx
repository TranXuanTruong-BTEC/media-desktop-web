import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import ToolDetail from '../pages/ToolDetail.jsx'
import Tools from '../pages/Tools.jsx'
import DesktopToolDetail from '../pages/DesktopToolDetail.jsx'
import Privacy from '../pages/Privacy.jsx'
import Terms from '../pages/Terms.jsx'
import NotFound from '../pages/NotFound.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"              element={<Home />} />
      <Route path="/tool/:toolId"  element={<ToolDetail />} />
      <Route path="/tools"         element={<Tools />} />
      <Route path="/tools/:toolId" element={<DesktopToolDetail />} />
      <Route path="/privacy"       element={<Privacy />} />
      <Route path="/terms"         element={<Terms />} />
      <Route path="*"              element={<NotFound />} />
    </Routes>
  )
}
