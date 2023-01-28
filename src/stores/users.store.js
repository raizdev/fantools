import { defineStore } from 'pinia';
import api from "@/includes/api";

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: null
    }),
    getters: {
        activatedUsers: (state) => (activated) => {
            return state.users.filter(users => users.activated == activated)
        }
    },
    actions: {
        async userList() {
            const response = await api.get('user/list')
            this.users = response
        },

        async modifyPendingUser(user, type) {
            const response = await api.post('user/modifyPendingUser', { id: user.id, activated: type })
            return response
        },
    }
});
