import { defineStore } from 'pinia';
import api from "@/includes/api";

export const useUserStore = defineStore({
    id: 'users',
    state: () => ({
        users: null
    }),
    getters: {
        getUsers: (state) => (activated) => {
            return state.recipients.filter(users => users.activated == activated)
        }
    },
    actions: {
    }
});
