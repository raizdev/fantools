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
                    v-model="this.contractor.name"
                />
            </b-form-group>

            <b-form-group
                id="recipient"
                label="Recipient:"
                label-for="recipient-1"
                description="You can select more than one recipient"
            >
                <vSelect :options="this.filterAllRecipients(0)" :components="{Deselect}" placeholder="Add employee to list" label="name" multiple v-model="selectedRecipients">
                    <template v-slot:no-options>Search reciptient ...</template>
                </vSelect>
            </b-form-group>

            <b-form-group
                id="service-level-manager"
                label="Service Level Manager:"
                label-for="service-level-manager-1"
                class="mt-3"
            >
                <vSelect :options="this.filterAllRecipients(1)" placeholder="Service Level Manager" label="name" v-model="selectedServiceLevelManager" />
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
                    v-model="this.information"
                    placeholder=""
                    rows="3"
                    max-rows="6"
                />
            </b-form-group>
            </div>
        <b-button variant="success" class="w-100" type="submit">Update</b-button>
    </Form>
</template>

<script>
import { defineComponent } from "vue";
import { Form, Field, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { mapActions, mapState } from 'pinia'
import { useToolsStore } from '@/stores'

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
            type: Object
        }
    },

    components: {
        Form,
        Field,
        TextInput,
        FontAwesomeIcon,
        vSelect
    },

    data() {
        return {
            selectedRecipients: this.contractor.contractors_details,
            selectedServiceLevelManager: this.contractor.service_level_manager,
            information: this.contractor.information,
            Deselect: {
                render: createElement => createElement('span', '❌'),
            }
        }
    },

    computed: {
        ...mapState(
            useToolsStore, { 
                filterAllRecipients: 'recipientByType',
            }
        )
    },

    created() {
        this.getAllRecipients()
    },

    methods: {
        ...mapActions(
            useToolsStore, { 
                getAllRecipients: 'getAllRecipients'
            }
        ),

        onSubmit: function (value) {

            const values = {
                name: value.name,
                contractors_id: this.contractor.id,
                contractorPersons: this.selectedRecipients,
                serviceLevelManager: this.selectedServiceLevelManager[0] ?? this.selectedServiceLevelManager,
                information: this.information
            }

            this.$emit("onUpdate", values);
        },

        close() {
            this.$vbsModal.close();
        },
    }
});
</script>
