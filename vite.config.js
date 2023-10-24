import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cacharreria_cosas_bonitas/',
  server: {
    port: 5174  // Establece el puerto a 5174
  }
})