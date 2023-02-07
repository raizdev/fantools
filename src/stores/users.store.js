import { defineStore } from 'pinia';
import { db } from '@/includes/pocketbase';

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: null
    }),
    getters: {
        getUserByType: (state) => (param, value) => {
            return state.users.filter(users => users[param] == value)
        }
    },
    actions: {
        async userList() {
            const response = await db.collection('users').getFullList(200, {
                expand: 'roles'
            })
            this.users = response
        }
    }
});
