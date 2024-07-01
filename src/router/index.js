import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SettingsView from '@/views/SettingsView.vue'
const routes =[
    {
        path:'/',
        component:HomeView,
    }, {
        path:'/login',
        component:LoginView,
    }, {
        path:'/settings',
        component:SettingsView,
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;