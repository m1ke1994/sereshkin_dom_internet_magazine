import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { registerSW } from 'virtual:pwa-register'
import { brandName } from './utils/brand'

registerSW({ immediate: true })
document.title = `${brandName} - интернет-магазин часов`

createApp(App).use(router).mount('#app')
