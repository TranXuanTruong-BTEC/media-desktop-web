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
    // Minify với terser (mạnh hơn esbuild default)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console:    true,   // xoá console.log
        drop_debugger:   true,   // xoá debugger
        pure_funcs:      ['console.log','console.info','console.debug'],
        passes:          2,      // 2 lần compress
      },
      mangle: {
        // Đổi tên biến/function thành ký tự ngắn
        toplevel:   false,
        properties: false,       // true sẽ break CSS modules
      },
      format: {
        comments: false,         // xoá tất cả comments
      },
    },

    // Code splitting tối ưu
    rollupOptions: {
      output: {
        // Chunk tên ngẫu nhiên (khó đoán)
        chunkFileNames:  'assets/[hash].js',
        entryFileNames:  'assets/[hash].js',
        assetFileNames:  'assets/[hash].[ext]',
        // Manual chunks: tách vendor ra cache riêng
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'r'
            if (id.includes('lucide')) return 'u'
            return 'v'
          }
        },
      },
    },

    // Tăng chunk size warning threshold
    chunkSizeWarningLimit: 1000,

    // Source map = false (không expose source)
    sourcemap: false,
  },

  // Xoá console trong dev mode nếu muốn
  // esbuild: { drop: ['console', 'debugger'] },
})
