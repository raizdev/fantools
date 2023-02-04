import { defineStore } from 'pinia';
import api from "@/includes/api";

export const useRolesStore = defineStore({
    id: 'roles',
    state: () => ({
        roles: null
    }),
    getters: {

    },
    actions: {
        async getRoles() {
            const response = await api.get('role/list')
            console.log(response)
            this.roles = response
        }
    }
});
