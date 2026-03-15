import { createApp } from "vue"
import { registerSW } from "virtual:pwa-register"
import App from "./App.vue"
import router from "./router"
import { ensureCsrfCookie } from "./services/api"
import "./style.css"
import { brandName } from "./utils/brand"

registerSW({ immediate: true })
document.title = `${brandName} - интернет-магазин часов`
void ensureCsrfCookie().catch(() => undefined)

createApp(App).use(router).mount("#app")
