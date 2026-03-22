import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// Cache to avoid duplicate pings on same page within session
const pinged = new Set()

export function usePageView() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Skip if already pinged this path in this session
    if (pinged.has(pathname)) return
    pinged.add(pathname)

    // Fire-and-forget — don't await, don't block UI
    try {
      fetch(`${API_BASE}/api/pageview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: pathname,
          ref:  document.referrer || '',
        }),
        // Short timeout — don't hang if backend offline
        signal: AbortSignal.timeout ? AbortSignal.timeout(3000) : undefined,
      }).catch(() => {}) // silently fail
    } catch { /* ignore */ }
  }, [pathname])
}
