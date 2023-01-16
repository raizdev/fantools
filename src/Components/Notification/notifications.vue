<template>
  <div class="notifications">
    <notification
        v-for="(notification, index) in notifications"
        :key="notification.text + index"
        :notification="notification"
        @close-notification="removeNotification"
    ></notification>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Notification from '@/Components/Notification/Notification.vue';

export default {
  components: {
    Notification
  },

  computed: {
    ...mapGetters({
      notifications: 'notifications/list',
    }),
  },

  methods: {
    removeNotification: function (notification) {
      this.$store.commit('notifications/REMOVE_NOTIFICATION', notification);
    },
  },
}
</script>
