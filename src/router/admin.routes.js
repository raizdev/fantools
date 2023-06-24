import { Dashboard, UploadMigration } from '@/views/admin';

export default {
    path: '/admin',
    children: [
        { path: 'dashboard', name: 'admin-userpanel', component: Dashboard },
        { path: 'upload-migrations', name: 'admin-upload-migrations', component: UploadMigration }
    ]
};
