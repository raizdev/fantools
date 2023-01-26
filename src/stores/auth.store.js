import { defineStore } from 'pinia';

import api from "@/includes/api";
import { useNotificationStore } from '@/stores';
import i18n from '@/includes/i18n';

export const useAuthStore = defineStore({
    
    id: 'auth',
    state: () => ({
        token: localStorage.getItem('token')| '',
        user: null,
        permission: null
    }),
    getters: {
        authenticated(state) {
            return state.token && state.user;
        }
    },
    actions: {

        async signIn(credentials) {
            const response = await api.post('auth/login', credentials); 
            return this.attempt(response.token)
        },

        async signUp(credentials) {
            console.log(credentials)
            const response = await api.post('auth/register', credentials); 
            if(response) {
                const notificationStore = useNotificationStore()
                notificationStore.notifications.push({ text: i18n.t('auth.signup.success'), type: 'success' })
                this.router.push('/account/login');
            }
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

                this.$patch({
                    user: response
                })

            } catch (e) {
                this.logout()
            }
        },

        logout() {
            this.$patch({
                user: '',
                token: ''
            })

            localStorage.removeItem('token')
            this.router.push('/account/login');
        }
    }
});
