import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import vue3GoogleLogin from 'vue3-google-login'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'glightbox/dist/css/glightbox.css';
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(router).use(vue3GoogleLogin,{
    clientId:'850095673053-tt1mv3kngih891r6fgpej58onhvs4tsj.apps.googleusercontent.com',
}).use(pinia)
app.mount('#app')
