import React, { createContext, useContext, useState, useCallback } from 'react'

const SearchContext = createContext(null)

export function SearchProvider({ children }) {
  const [query, setQuery] = useState('')

  const runSearch = useCallback((q) => {
    setQuery(q)
    // Give the DOM a tick (in case filtered lists need to render) then scroll
    requestAnimationFrame(() => {
      const el = document.getElementById('tools')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  return (
    <SearchContext.Provider value={{ query, setQuery, runSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used within SearchProvider')
  return ctx
}
