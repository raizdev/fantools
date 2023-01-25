import { inject } from 'vue'
import { defineStore } from "pinia";

export const useGatesStore = defineStore("api", () => {
  const $zo = inject("$zo");
  
  const setRoles = () => {
    $zo.setRoles(['writer']);
    $zo.setPermissions(['posts.*', 'images.create']);
  }

  return {
    setRoles
  };
})