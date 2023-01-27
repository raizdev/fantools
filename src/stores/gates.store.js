import { inject } from 'vue'
import { defineStore } from "pinia";
import { useAuthStore } from '@/stores'

export const useGatesStore = defineStore("gates", () => {

    const $zo = inject("$zo");
    const authStore = useAuthStore();

    const setRoles = () => {
      console.log($zo)
        $zo.setRoles([...authStore.permissions]);
    }

    return {
        setRoles
    };
})