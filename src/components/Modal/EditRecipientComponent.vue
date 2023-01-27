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
            <b-form-group
                id="recipient-name"
                label="Recipient Name"
                label-for="recipient-name"
            >
                <TextInput
                    name="name"
                    type="text"
                    rules="required"
                    v-model="this.recipient.name"
                />
            </b-form-group>

            <b-form-group
                id="recipient-email"
                label="Recipient email"
                label-for="recipient-email"
                class="mt-2 mb-2"
            >
                <TextInput
                    name="email"
                    type="text"
                    v-model="this.recipient.email"
                />
                
            </b-form-group>

            <b-form-group
                id="recipient-telephone"
                label="Recipient telephone"
                label-for="recipient-telephone"
                class="mt-2 mb-2"
            >
                <TextInput
                    name="telephone"
                    type="text"
                    rules="required"
                    v-model="this.recipient.telephone"
                />
            </b-form-group>
            <b-form-group
                id="recipient-slm"
                label-for="recipient-slm"
                class="mt-2 mb-2"
                label="Contractors"
            >
            <vSelect :options="this.contractor" v-model="this.contractors" placeholder="Add employee to contractor" label="name" multiple>
                    <template v-slot:no-options>Search contractor ...</template>
                </vSelect>
            </b-form-group>

            <b-form-group
                id="level-name"
                label="Level"
                label-for="level-name"
            >
                <TextInput
                    name="level"
                    type="number"
                    rules="required"
                    v-model="this.person.level"
                />
            </b-form-group>

            <b-form-group
                id="recipient-slm"
                label="Is Service Level Manager?"
                label-for="recipient-slm"
                class="mt-3 mb-2"
            >
                <b-form-checkbox
                    id="slm"
                    v-model="isServiceLevelManager"
                    name="slm"
                    true-value="'1'"
                    false-value="'0'"
                >
            </b-form-checkbox>

            </b-form-group>
        </div>

        <b-button variant="success" class="w-100" type="submit">Update</b-button>
    </Form>
</template>

<script>
import { Form } from 'vee-validate';
import { mapState, mapActions } from  'pinia'
import { useToolsStore } from '@/stores'

import FontAwesomeIcon from '../Icon/FontAwesomeIcon.vue';
import TextInput from "../Input/TextInput.vue";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
    name: "EditRecipientComponent",
    emits: ["onUpdate"],

    props: {
        recipients: Object
    },

    components: {
        Form,
        FontAwesomeIcon,
        TextInput,
        vSelect
    },

    data() {
        return {
            recipient: this.recipients,
            contractors: null,
            isServiceLevelManager: 0
        }
    },
    
    computed: {
        ...mapState(
            useToolsStore, { 
                contractor: 'contractor',
            }
        )
    },

    created() {
        this.getAllRecipientByContractor(this.recipient.id).then((result) => {
            this.contractors = result[0].contract_person
        })
    },

    methods: {
        ...mapActions(
            useToolsStore, { 
                getAllRecipientByContractor: 'getAllRecipientByContractor',
                getContractors: 'getContractors'
            }
        ),

        close() {
            this.$vbsModal.close();
        },

        onSubmit: function (value) {

            const values = {
                id: this.recipient.id,
                name: value.name,
                email: value.email,
                telephone: value.telephone,
                slm: (this.isServiceLevelManager === true) ? '1' : '0'
            }
            
            this.$emit("onUpdate", values);
        }
    }
}
</script>
