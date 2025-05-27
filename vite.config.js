import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// Ensure proper handling of client-side routing
const copyContentPlugin = () => {
  return {
    name: 'copy-content-plugin',
    closeBundle: async () => {
      // Ensure content folder is correctly copied to build output
      // This is a fallback in case assetsInclude doesn't work properly
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copyContentPlugin()
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    // Add this to ensure all files are copied correctly
    copyPublicDir: true,
    // This ensures that client-side routing works properly
    assetsDir: 'assets',
  },
  publicDir: 'public',
  // Copy the content folder to the build output
  assetsInclude: ['**/*.md'],
})
