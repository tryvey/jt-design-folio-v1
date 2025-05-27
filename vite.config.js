import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Ensure all assets are properly handled
    assetsDir: 'assets',
    // Ensure public directory is copied to build output
    copyPublicDir: true,
  },
  // Allow markdown files to be imported
  assetsInclude: ['**/*.md'],
})
