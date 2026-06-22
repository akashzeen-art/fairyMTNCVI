import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/adpoke': {
        target: 'http://68.183.88.91',
        changeOrigin: true,
      },
    },
  },
})
