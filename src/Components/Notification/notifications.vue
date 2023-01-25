<template>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { mapState } from 'pinia'
import { useNotificationStore } from '@/stores'

export default defineComponent({
    id: 'notifications',

    computed: {
        ...mapState(
            useNotificationStore, { getNotification: 'notifications' }
        )
    },

    watch: {
        getNotification(notifications) {
            const notification = notifications.shift();

            this.$toast.open({
                message: notification.text,
                type: `${notification.type || 'success'}`,
                duration: 5000,
                dismissible: true,
                position: 'top-right',
                queue: true,
                pauseOnHover: true
            })
        }
    }
})
</script>