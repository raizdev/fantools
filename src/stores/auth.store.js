import { defineStore } from 'pinia';
import { db, errorMessage } from '@/includes/pocketbase';
import { useGatesStore, useNotificationStore } from '@/stores';
import i18n from '@/includes/i18n';
const { t } = i18n.global

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

            try {
                const auth = await db.collection('users').authWithPassword(
                    credentials.username,
                    credentials.password,
                );

                if(!auth.verified) {
                    useNotificationStore().notifications.push({ 
                        text: t('auth.signin.not_activated'), 
                        type: 'error' 
                    })

                    return this.logout()
                }

                this.$patch({
                    token: auth.token,
                    user: auth.record,
                    permissions: auth.record.role
                })

                const useGate = useGatesStore()
                useGate.setRoles()

                this.router.push('/');

            } catch(error) { errorMessage(error) }
        },

        async signUp(credentials) {

            let randomPassword = (Math.random() + 1).toString(36).substring(2);

            try {
                const data = {
                    username: credentials.username,
                    email: credentials.email,
                    password: randomPassword,
                    passwordConfirm: randomPassword
                }

                return await db.collection("users").create(data);

            } catch(error) { errorMessage(error) }
        },     

        logout() {
            db.authStore.clear();
            this.router.push('/account/login');
        }
    }
});
