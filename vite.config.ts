/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages serves project sites from /<repo>/, so assets and the router
  // basename need that prefix there — but Vercel and local dev serve from /.
  // The Pages workflow builds with `vite build --mode ghpages` (mode comes from
  // the CLI, so no process.env / @types/node needed under strict tsconfig.node).
  base: mode === 'ghpages' ? '/LifeOS-Dashboard/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      // Use import.meta.url — no __dirname / @types/node needed
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  test: {
    globals: true,
    environment: 'node',
    exclude: ['tests/**', 'node_modules/**'],
  },
}))
