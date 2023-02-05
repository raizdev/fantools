import PocketBase from 'pocketbase';
import { useAuthStore, useNotificationStore } from '@/stores';

const db = new PocketBase(import.meta.env.VITE_API_URL);

db.afterSend = function (response, data) {

    const notificationStore = useNotificationStore()
    const { token, logout } = useAuthStore();

    if ([401, 403].includes(data.code) && token) {
        logout();
    }

    
    if([400].includes(data.code)) {
        const field = Object.keys(data?.data)[0];

        if(data.data[field]) {
            notificationStore.notifications.push({ text: data.data[field].message, type: 'error' })
        } else {
            notificationStore.notifications.push({ text: data.message, type: 'error' })
        }
    }

    return Object.assign(data);
}

export { db };