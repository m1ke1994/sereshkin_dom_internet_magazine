import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

const PLACEHOLDER_BRANDS = new Set([
  '',
  'ваш бренд',
  'наш бренд',
  'e-clock',
  'e clock',
  'your brand',
  'brand',
  'company name',
])

const normalizeBrandName = (value: string | undefined) => {
  const normalized = (value || '').trim()
  if (PLACEHOLDER_BRANDS.has(normalized.toLowerCase())) {
    return 'Eco-Hour'
  }
  return normalized || 'Eco-Hour'
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const brandName = normalizeBrandName(env.VITE_BRAND_NAME)
  const manifestDescription =
    `${brandName} — магазин настенных часов и часов под заказ. ` +
    'Настенные часы из дерева, индивидуальный дизайн, доставка по Москве и России.'

  return {
    plugins: [
      vue(),
      VitePWA({
        registerType: 'autoUpdate',
        filename: 'manifest.json',
        includeAssets: [
          'logo.svg',
          'logo.png',
          'logo.ico',
          'apple-touch-icon.png',
          'icon-192.png',
          'icon-512.png',
          'placeholder-watch.svg',
        ],
        manifest: {
          name: brandName,
          short_name: brandName,
          description: manifestDescription,
          start_url: '/',
          scope: '/',
          display: 'standalone',
          background_color: '#f7f7f5',
          theme_color: '#0f766e',
          lang: 'ru',
          icons: [
            {
              src: '/logo.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any',
            },
            {
              src: '/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
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
