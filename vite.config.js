import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'automatic' }),
  ],
  css: {
    modules: { localsConvention: 'camelCase' },
  },
  build: {
    // esbuild — built-in, không cần cài thêm gì
    minify: 'esbuild',

    // Xoá console.log qua esbuild
    target: 'es2015',

    rollupOptions: {
      output: {
        // Tên file hash ngẫu nhiên
        chunkFileNames:  'assets/[hash].js',
        entryFileNames:  'assets/[hash].js',
        assetFileNames:  'assets/[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'r'
            if (id.includes('lucide')) return 'u'
            return 'v'
          }
        },
      },
    },

    sourcemap:              false,
    chunkSizeWarningLimit:  1000,
  },

  esbuild: {
    // Xoá console và debugger khi build
    drop:          ['console', 'debugger'],
    legalComments: 'none',
  },
})
