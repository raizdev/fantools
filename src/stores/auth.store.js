import { defineStore } from 'pinia';

import api from "@/Common/Helpers/Api";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        token: localStorage.getItem('token')| '',
        user: null,
        permission: null
    }),
    actions: {

        async signIn(credentials) {
            const response = await api.post('auth/login', credentials); 
            return this.attempt(response.token)
        },

        async attempt(token) {

            if (token) {
                this.token = token
            }

            if (!this.token) {
                return
            }

            localStorage.setItem('token', this.token)

            try {
                let response = await api.get('user');

                this.user = response
            } catch (e) {
                this.token = null
                this.user = null
            }
        },

        logout() {
            this.user = null;
            localStorage.removeItem('token');
            router.push('/account/login');
        }
    }
});
