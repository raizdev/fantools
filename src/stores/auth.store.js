import { defineStore } from 'pinia';
import { useGatesStore, useNotificationStore } from '@/stores';
import api from "@/includes/api";
import i18n from '@/includes/i18n';

export const useAuthStore = defineStore({
    
    id: 'auth',
    state: () => ({
        token: localStorage.getItem('token')| '',
        user: null,
        permissions: null
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
            const response = await api.post('auth/register', credentials); 
            return response
        },     

        async attempt(token, skip = true) {
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
                    user: response,
                    permissions: response.permission
                })

                if(skip) {
                    const useGate = useGatesStore()
                    useGate.setRoles()
                }

                if(!this.user.temp_password) {
                    this.router.push('/')
                } else {
                    this.router.push('/account/change-password')  
                }
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
