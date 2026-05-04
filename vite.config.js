import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 1. SSLCommerz API Call handle korar jonno
      '/sslcommerz': {
        target: 'https://sandbox.sslcommerz.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sslcommerz/, ''),
      },
      // 2. SSLCommerz theke asha POST redirect handle korar jonno
      '/payment': {
        target: 'http://localhost:5173',
        bypass: (req, res) => {
          // Jodi SSLCommerz theke POST request ashe, tobe index.html serve koro
          if (req.method === 'POST') {
            return '/index.html';
          }
        },
      },
    },
  },
})