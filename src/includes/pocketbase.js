import PocketBase from 'pocketbase';
import { useAuthStore, useNotificationStore } from '@/stores';

const db = new PocketBase(import.meta.env.VITE_API_URL);

export function errorMessage(error) {

    const notificationStore = useNotificationStore()
    const { token, logout } = useAuthStore();

    if ([401, 403].includes(error.code) && token) {
        logout();
    }

    const field = Object.keys(error.data.data)[0];
    console.log(field)
    if(error.data.data[field]) {
        notificationStore.notifications.push({ text: error.data.data[field].message, type: 'error' })
    } else {
        notificationStore.notifications.push({ text: error.message, type: 'error' })
    }
}

export { db };