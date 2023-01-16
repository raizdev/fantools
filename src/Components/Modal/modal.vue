<template>
    <transition name="fade">
        <div class="modal" v-if="show" style="display: block">
            <div class="modal-dialog" :class="size">
                <b-card no-body class="modal-content">
                    <template #header>
                        <CardHeader
                            :icon="icon"
                            :title="title"
                            :sub-title="subTitle"
                            :close-button="openClose"
                        />
                    </template>
                    <b-card-body>
                        <slot name="body"/>
                    </b-card-body>
                    <b-card-footer class="p-0 m-0">
                        <b-button variant="success" class="w-100" @click.prevent="saveModal">{{ buttonTitle }}</b-button>
                    </b-card-footer>
                </b-card>
            </div>
        </div>
    </transition>
</template>
<script>
import { BButton, BCard, BCardBody, BCardFooter } from "bootstrap-vue-3";
import CardHeader from "../Card/CardHeader.vue";

export default {
    name: "Modal",

    components: {
        CardHeader,
        BButton,
        BCard,
        BCardBody,
        BCardFooter
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
