<template>
    <div class="modal-header">
        <h5 class="modal-title">{{ title }}</h5>
    </div>
</template>
<script>
import CardHeader from "../Card/CardHeader.vue";

export default {
    name: "Modal",

    components: {
        CardHeader
    },

    props: {
        title: {
            type: String,
            required: true
        },

        subTitle: {
            type: String,
            required: false
        },

        buttonTitle: {
            type: String,
            required: false
        },

        icon: {
            type: String,
            required: false
        },

        size: {
            type: String,
            required: false
        },

        saveButton : false
    },

    data() {
        return {
            show: false
        };
    },

    methods: {
        openClose() {
            this.show = !this.show;
        },

        saveModal() {
            this.emitter.emit('saveModal');
        }
    }
}
</script>
