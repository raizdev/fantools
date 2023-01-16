<template>
</template>

<script>
export default {
  props: ['notification'],

  mounted() {
    this.$toast.open({
      message: this.notification.text,
      type: `${this.notification.type || 'success'}`,
      duration: 5000,
      dismissible: true,
      position: 'top-right',
      queue: true,
      pauseOnHover: true
    })
  }
}
</script>

<style>
.v-toast__text {
  color: #fff !important;
}
</style>
