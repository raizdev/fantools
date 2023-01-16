<template>
    <div class="d-flex">
        <div class="card-header p-0">
            <h5 class="title">{{ title }}</h5>
            <span class="description">{{ description }}</span>
        </div>
        <button type="button" class="btn-close float-lg-end" style="margin-left: auto" @click="openClose" v-if="closeButton"></button>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        description: String,
        closeButton: Function
    },
    methods: {
      openClose() {
          this.closeButton()
      }
    }
}
</script>