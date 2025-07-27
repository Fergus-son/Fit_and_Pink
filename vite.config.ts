import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        profile: 'profile.html',
        summary: 'summary.html'
      }
    }
  },
  server: {
    proxy: {
      // Проксировать все запросы, начинающиеся с `/api`
      '/api': {
        target: 'http://localhost:3001', // Ваш mock-сервер
        changeOrigin: true,
      },
    },
  },
})