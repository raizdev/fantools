import { defineStore } from 'pinia';
import { db } from '@/includes/pocketbase';
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

        /* Set lastLogin in user collection */
        async setLastLogin() {
            return await db.collection('users').update(
                this.user.id, {
                    lastLogin: new Date()
                }
            )
        },

        /* Sign in user */
        async signIn(credentials) {

            /* Get credentials and initate authentication */
            const auth = await db.collection('users').authWithPassword(
                credentials.username,
                credentials.password,
            );

            /* If user is verified pass otherwise throw notification */
            if(!auth.record.verified) {
                useNotificationStore().notifications.push({ 
                    text: t('auth.signin.not_activated'), 
                    type: 'error' 
                })

                return db.authStore.clear();
            }

            /* Store user collection */
            this.$patch({
                token: auth.token,
                user: auth.record,
                permissions: auth.record.role
            })

            /* Set roles */
            this.setRoles()

            /* Set lastLogin */
            this.setLastLogin()

            this.router.push('/');
        },

        /* Logout the user */
        logout() {
            db.authStore.clear();
            this.router.push('/account/login');
        },

        /* Set roles in useGateStore */
        setRoles() {
            const useGate = useGatesStore()
            useGate.setRoles()
        }
    }
});
