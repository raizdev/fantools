// @ts-check
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore({
  id: 'notification',

  state: () => ({
    notifications: [],
  }),
})
