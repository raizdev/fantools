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
            const response = await db.collection('users').getFullList(200)
            console.log(response)
            this.users = response
        },

        async modifyPendingUser(user, type, roles) {
            const response = await api.post('user/modifyPendingUser', { id: user.id, activated: type, roles: roles })
            return response
        },

        async modifyUserRoles(user, roles) {
            const response = await api.post('role/update', { user: user, roles: roles })
            return response
        },

        async changePassword(user) {
            const response = await api.post('user/change-password', { password: user.password })
            return response
        },
    }
});
