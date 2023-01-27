import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores';
import { Home } from '@/views';
import accountRoutes from './account.routes';
import toolsRoutes from './tools.routes';
import adminRoutes from './admin.routes';

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
    routes: [
        { path: '/', name: 'home', component: Home },
        { ...accountRoutes },
        { ...toolsRoutes },
        { ...adminRoutes },
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
});

router.beforeEach(async (to) => {
    const publicPages = ['/account/login', '/account/register'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return '/account/login';
    }
});
