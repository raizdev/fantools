import { Dashboard } from '@/views/admin';

export default {
    path: '/admin',
    children: [
        { path: 'dashboard', name: 'admin-userpanel', component: Dashboard }
    ]
};
