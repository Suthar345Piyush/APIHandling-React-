import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
     proxy: {
       '/api': 'https://localhost:3000'
     } // after setting the proxy we not get  the cors error
  },
  plugins: [react()],
})
