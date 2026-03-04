import { defineConfig } from 'vite'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    sitemap({
      hostname: 'https://mytools-9ns.pages.dev',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date()
    })
  ]
})