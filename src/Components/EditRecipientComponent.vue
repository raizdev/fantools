<template>
     <div class="modal-header">
        <h5 class="modal-title">Edit Recipient</h5>
        <span @click="close">
            <FontAwesomeIcon
                icon="fa-solid fa-xmark"
                size="lg"
            />
        </span>
    </div>

    <Form
        @submit="onSubmit"
    >
        <div class="modal-body">

        </div>

        <b-button variant="success" class="w-100" type="submit">Update</b-button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Form, Field, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { mapActions } from "vuex";

import FontAwesomeIcon from './Icon/FontAwesomeIcon.vue';
import TextInput from "./Input/TextInput.vue";

export default defineComponent({
    name: "EditRecipientComponent",
    emits: ["onUpdate"],

    components: {
        FontAwesomeIcon,
        TextInput
    },

    methods: {
        close() {
            this.$vbsModal.close();
        },

        onSubmit() {
            
        }
    }
});
</script>
