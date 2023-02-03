import { createRouter, createWebHistory } from 'vue-router';
import { environment } from '../../environment'
import { version } from '../../package'
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

    document.title = `${environment.ApplicationName} - v${version}`

    const publicPages = ['/account/login', '/account/register'];
    const authRequired = !publicPages.includes(to.path);

    const tempPages = ['/account/change-password'];
    const inTempPassword = !tempPages.includes(to.path);

    const authStore = useAuthStore();

    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return '/account/login';
    }

    if(inTempPassword && authStore.user && authStore.user.temp_password) {
        return '/account/change-password';
    }
});
