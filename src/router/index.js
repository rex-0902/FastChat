import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SettingsView from '@/views/SettingsView.vue'
import { useUserStore } from "@/store/user-store";

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
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    console.log(userStore.loginStatus)
    if (userStore.loginStatus === false && to.path !== '/login') {
      next('/login');
    } else {
      next();
    }
    console.log(from)
    console.log(to)
    if (userStore.loginStatus === true && from.path == '/login') {
        next('/');
      }
  });


export default router;