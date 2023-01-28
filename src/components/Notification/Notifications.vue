<template>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { mapState } from 'pinia'
import { useNotificationStore } from '@/stores'

export default defineComponent({
    id: 'notifications',

    inject: ["notyf"],

    computed: {
        ...mapState(
            useNotificationStore, { getNotification: 'notifications' }
        )
    },

    watch: {
        getNotification(notifications) {
            const notification = notifications.shift();
            this.notyf.open({
                type: notification.type,
                message: notification.text
            })
        }
    }
})
</script>