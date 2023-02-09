import { defineStore } from 'pinia';
import { db } from '@/includes/pocketbase';
import { useGatesStore, useNotificationStore } from '@/stores';
import i18n from '@/includes/i18n';
const { t } = i18n.global
const auth = db.authStore

export const useAuthStore = defineStore({
    
    id: 'auth',
    state: () => ({
        token: auth?.token ?? '',
        user: auth?.model ?? ''
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
                {},
                {
                    expand: 'roles'
                }
            );

            /* If user is verified pass otherwise throw notification */
            if(!auth.record.verified) {
                useNotificationStore().notifications.push({ 
                    text: t('auth.signin.not_activated'), 
                    type: 'error' 
                })

                return db.authStore.clear();
            }

            /* Set lastLogin */
            this.setLastLogin()
 
            /* Get and set roles */
            const useGate = useGatesStore()
            useGate.setRoles()

            this.$patch({
                token: auth.token,
                user: auth.record
            })

            this.router.push('/');
        },

        /* Create user with random password without verified status */
        async signUp(credentials) {

            const data = {
                username: credentials.username,
                email: credentials.email,
                password: credentials.password,
                passwordConfirm: credentials.password_confirmation,
                emailVisibility: true
            }

            return await db.collection("users").create(data);
        },     

        /* Logout the user */
        logout() {
            db.authStore.clear();

            this.$patch({
                token: null,
                user: null
            })

            this.router.push('/account/login');
        }
    }
});
