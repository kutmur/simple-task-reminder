import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures proper asset loading on Render
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false // Disable for production
  }
})
