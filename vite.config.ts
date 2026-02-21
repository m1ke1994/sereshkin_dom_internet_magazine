import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const brandName = env.VITE_BRAND_NAME || 'Ваш бренд'

  return {
    plugins: [
      vue(),
      VitePWA({
        registerType: 'autoUpdate',
        filename: 'manifest.json',
        includeAssets: ['icon-192.png', 'icon-512.png', 'placeholder-watch.svg'],
        manifest: {
          name: `${brandName} - интернет-магазин часов`,
          short_name: brandName,
          description: 'Интернет-магазин часов',
          start_url: '/',
          display: 'standalone',
          background_color: '#f7f7f5',
          theme_color: '#0f766e',
          lang: 'ru',
          icons: [
            {
              src: '/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,json,woff2}'],
          navigateFallback: '/offline.html',
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'google-fonts-stylesheets',
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-webfonts',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
  }
})
