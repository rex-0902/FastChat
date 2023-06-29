import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import vue3GoogleLogin from 'vue3-google-login'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(router).use(vue3GoogleLogin,{
    clientId:'216963174739-luhmnnugnr7n537cu59bikn91n7ku7tm.apps.googleusercontent.com',
}).use(pinia)
app.mount('#app')
