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
            <b-form-group
                id="contractor-name"
                label="Contractor Name"
                label-for="contractor-name"
            >
                <TextInput
                    name="name"
                    type="text"
                    rules="required"
                    v-model="selectedContractor.name"
                />
            </b-form-group>

            <b-form-group
                id="recipient"
                label="Recipient:"
                label-for="recipient-1"
                description="You can select more than one recipient"
            >
                <vSelect :options="allEmployees" :components="{Deselect}" :value="addedRecipient" @input="handleEmployee" placeholder="Add employee to list" label="name" multiple v-model="addedRecipient">
                    <template v-slot:no-options>Search reciptient ...</template>
                </vSelect>
            </b-form-group>

            <b-form-group
                id="service-level-manager"
                label="Service Level Manager:"
                label-for="service-level-manager-1"
                class="mt-3"
            >
                <vSelect :options="allServiceLevelManagers" :value="seviceLevelManager" placeholder="Service Level Manager" label="name" v-model="seviceLevelManager" />
            </b-form-group>

            <b-form-group
                id="information"
                label="Information"
                label-for="information-1"
                description="You can leave specific information about the contractor here"
                class="mt-3"
            >
                <b-form-textarea
                    id="textarea"
                    v-model="information"
                    placeholder=""
                    rows="3"
                    max-rows="6"
                />
            </b-form-group>
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


import FontAwesomeIcon from '../Icon/FontAwesomeIcon.vue';
import TextInput from "../Input/TextInput.vue";

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
        },
        slm: {
            type: Array
        }
    },

    components: {
        Form,
        Field,
        TextInput,
        FontAwesomeIcon,
        vSelect
    },

    data: () => ({
        information: '',
        selectedContractor: [],
        contractorEmployees: [],
        allEmployees: [],
        addedRecipient: [],
        seviceLevelManager: [],
        allServiceLevelManagers: [],
        Deselect: {
            render: createElement => createElement('span', '❌'),
        }
    }),

    created() {
        setTimeout(() => {
            this.selectedContractor = this.contractor
        }, 100)

        this.addedRecipient = this.employee
        this.seviceLevelManager = this.slm
        this.information = this.contractor.information

        this.findServiceLevelmangers(1).then((result) => {
            this.allServiceLevelManagers = result
        })
    },

    methods: {
        ...mapActions({
            findEmployee: 'tools/findEmployee',
            findServiceLevelmangers: 'tools/findServiceLevelmangers'
        }),

        handleEmployee(event){

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
                name: value.name,
                contractors_id: this.selectedContractor.id,
                contractorPersons: this.addedRecipient,
                serviceLevelManager: this.seviceLevelManager[0] ?? this.seviceLevelManager,
                information: this.information
            }

            this.$emit("onUpdate", values);
        }
    }
});
</script>
