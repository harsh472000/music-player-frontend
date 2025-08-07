import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://3.110.167.205:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})