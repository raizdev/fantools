import { inject } from 'vue'
import { defineStore } from "pinia";
import { useAuthStore } from '@/stores'

export const useGatesStore = defineStore("gates", () => {

    const $zo = inject("$zo");
    const authStore = useAuthStore();

    const setRoles = () => {

        const permission = authStore.permissions.map(permission => {
            return permission
        })

        $zo.setRoles([...permission]);
    }

    return {
        setRoles
    };
})