import { defineStore } from 'pinia';
import { db } from '@/includes/pocketbase';
import { useGatesStore, useNotificationStore } from '@/stores';

export const useAuthStore = defineStore({
    
    id: 'auth',
    state: () => ({
        token: db?.authStore?.token ?? '',
        user: db?.authStore?.model ?? '',
        permissions: db?.authStore?.model?.role ?? ''
    }),
    getters: {
        authenticated(state) {
            return state.token && state.user;
        }
    },
    actions: {

        async signIn(credentials) {
            const auth = await db.collection('users').authWithPassword(
                credentials.username,
                credentials.password,
            );

            if(auth) {

                this.$patch({
                    token: auth.token,
                    user: auth.record,
                    permissions: auth.record.role
                })

                const useGate = useGatesStore()
                useGate.setRoles()
            }

            this.router.push('/');
         },

        async signUp(credentials) {

            let randomPassword = (Math.random() + 1).toString(36).substring(5);

            const data = {
                username: credentials.username,
                email: credentials.email,
                password: randomPassword,
                passwordConfirm: randomPassword
            }

            return await db.collection("users").create(data);
        },     

        logout() {
            db.authStore.clear();
            this.router.push('/account/login');
        }
    }
});
