import { defineStore } from 'pinia';

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: null
    }),
    getters: {
        activatedUsers: (state) => (activated) => {
            return state.users.filter(users => users.activated == activated)
        },
        getUserById: (state) => (id) => {
            return state.users.filter(users => users.id == id)
        }
    },
    actions: {
        async userList() {
            const response = await api.get('user/list')
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
