<template>
    <div class="modal-header">
        <h5 class="modal-title">Edit contractor</h5>
        <b-button variant="success" class="btn-close" aria-label="Close" @click="close"></b-button>
    </div>

    <Form
        @submit="onSubmit"
    >
        <div class="modal-body">
            <TextInput
                name="name"
                type="text"
                rules="required"
                :value="name"
            />
        </div>

        <div class="modal-footer">
            <b-button variant="success" class="w-100" type="submit">Update</b-button>
        </div>
    </Form>
 </template>

 <script lang="ts">
import { defineComponent } from "vue";
import { Form, Field, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';

import TextInput from "./Input/TextInput.vue";
import Modal from './Modal/modal.vue'

defineRule('required', required);

export default defineComponent({
    name: "EditContractorComponent",
    emits: ["onUpdate"],

    props: {
        contractorName: {
            type: String,
            default: '',
        }
    },

    components: {
        Modal,
        Form,
        Field,
        TextInput
    },

    data() {
        return {
            name: '',
            email: ''
        };
    },

    created() {
        setTimeout(() => {
            this.name = this.contractorName
        }, 100)
    },

    methods: {
        close() {
            this.$vbsModal.close();
        },

        onSubmit: function (values) {
            this.$emit("onUpdate", values);
        }
    }
});
 </script>
 <style lang="css">

</style>