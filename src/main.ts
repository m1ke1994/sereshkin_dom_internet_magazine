import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'
import router from './router'
import { ensureCsrfCookie } from './services/api'
import './style.css'
import { applySeo } from './utils/seo'

registerSW({ immediate: true })
applySeo()
void ensureCsrfCookie().catch(() => undefined)

createApp(App).use(router).mount('#app')
