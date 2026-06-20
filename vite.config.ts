import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: { enabled: true },
      includeAssets: ['icon.svg', 'icon-maskable.svg', 'hero/portrait.png'],
      manifest: {
        name: 'Claude Code AI Visual Lab',
        short_name: 'AI Visual Lab',
        description: 'An interactive, visual guide to using Claude Code: agents, skills, MCP, tokens, and workflow.',
        id: '/',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#03040a',
        theme_color: '#03040a',
        categories: ['education', 'developer', 'productivity'],
        icons: [
          { src: 'icon.svg', sizes: '192x192 512x512 any', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icon-maskable.svg', sizes: '192x192 512x512 any', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 4_500_000, // allow the hero portrait to precache for offline
        // don't try to cache cross-origin LLM provider calls
        runtimeCaching: [],
      },
    }),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
