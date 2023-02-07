import { inject } from 'vue'
import { defineStore } from "pinia";
import { useAuthStore } from '@/stores'
import { db } from '@/includes/pocketbase';

export const useGatesStore = defineStore("gates", () => {

    const $zo = inject("$zo");
    const authStore = useAuthStore();

    const getRoles = (role) => {

        if(!role) {
            role = authStore.permissions
        }

        $zo.setRoles([...role]);
    }

    const setRoles = async () => {
        const roles = await db.collection('users').getOne(authStore.user.id, {
            expand: 'roles'
        })

        const role = roles.expand.roles.map(role => {
            return role.name
        })

        authStore.permissions = role
        getRoles(role)
    }

    return {
        setRoles,
        getRoles
    };
})