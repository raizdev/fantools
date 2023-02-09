import { defineStore } from 'pinia';
import { db } from '@/includes/pocketbase';
import { useNotificationStore } from '@/stores';
import i18n from '@/includes/i18n';
const { t } = i18n.global

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: null
    }),
    getters: {
        getUserByType: (state) => (param, value) => {
            return state.users.filter(users => users[param] == value)
        }
    },
    actions: {
        async userList() {
            const response = await db.collection('users').getFullList(200, {
                expand: 'roles'
            })
            this.users = response
        },

        async forgotPassword(value) {
            const response = await db.collection('users').requestPasswordReset(value.email);
            if(response) {
                console.log(1)
                useNotificationStore().notifications.push({ 
                    text: t('auth.change_password.send'), 
                    type: 'success' 
                })

                this.router.push('/');
            }
        }
    }
});
