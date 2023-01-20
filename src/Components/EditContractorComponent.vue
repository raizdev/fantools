<template>
    <div class="modal-header">
        <h5 class="modal-title">Edit contractor</h5>
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
            <TextInput
                name="name"
                type="text"
                rules="required"
                :value="selectedContractor.name"
            />

            <vSelect :options="allEmployees" :value="mustBeAdded" @input="handleInput" placeholder="Add employee to list" label="name" multiple v-model="mustBeAdded" />
        </div>

        <b-button variant="success" class="w-100" type="submit">Update</b-button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Form, Field, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { mapActions } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import FontAwesomeIcon from './Icon/FontAwesomeIcon.vue';
import TextInput from "./Input/TextInput.vue";
import Modal from './Modal/modal.vue'

defineRule('required', required);

export default defineComponent({
    name: "EditContractorComponent",
    emits: ["onUpdate"],

    props: {
        contractor: {
            type: Array
        },
        employee: {
            type: Array
        }
    },

    components: {
        Modal,
        Form,
        Field,
        TextInput,
        FontAwesomeIcon,
        vSelect
    },

    data() {
        return {
            selectedContractor: [],
            contractorEmployees: [],
            allEmployees: [],
            mustBeAdded: []
        };
    },

    created() {
        setTimeout(() => {
            this.mustBeAdded = this.employee
            this.selectedContractor = this.contractor
        }, 100)
    },

    methods: {
        ...mapActions({
            findEmployee: 'tools/findEmployee'
        }),

        handleInput(event){

            const values = {
                searchItem: event.target.value,
                contractor: this.selectedContractor.id
            };

            this.findEmployee(values).then((result) => {
                this.allEmployees = result
            })
        },

        close() {
            this.$vbsModal.close();
        },

        onSubmit: function (value) {

            const values = {
                name: value.name ,
                contractors_id: this.selectedContractor.id,
                contractorPersons: this.mustBeAdded
            }

            this.$emit("onUpdate", values);
        }
    }
});
</script>
