import { defineStore } from 'pinia';
import { db } from '@/includes/pocketbase';

export const useRoleStore = defineStore({
    id: 'roles',
    state: () => ({
        roles: null
    }),
    getters: {
    },
    actions: {
        async getRoles() {
            const response = await db.collection('roles').getFullList()
            this.roles = response
        }
    }
});
