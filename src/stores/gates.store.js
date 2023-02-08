import { inject } from 'vue'
import { defineStore } from "pinia";
import { useAuthStore } from '@/stores'
import { db } from '@/includes/pocketbase';

export const useGatesStore = defineStore("gates", () => {

    const $zo = inject("$zo");

    const setRoles = () => {

        const role = db.authStore.model.expand.roles.map(role => {
            return role.name
        })

        $zo.setRoles([...role]);
    }

    return {
        setRoles
    };
})