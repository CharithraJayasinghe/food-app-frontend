import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://food-app-backend-api.vercel.app/",
      "/uploads/": "https://food-app-backend-api.vercel.app/",
    },
  },
})
