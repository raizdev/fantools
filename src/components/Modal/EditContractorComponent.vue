<template>
    <div class="modal-header">
        <h5 class="modal-title"> {{ $t('contractor.modal.contractor.title') }}</h5>
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
                :label="$t('contractor.modal.contractor.name')"
                label-for="contractor-name"
                class="mb-3"
            >
                <TextInput
                    name="name"
                    type="text"
                    rules="required"
                    v-model="this.contractor.name"
                />
            </b-form-group>

            <b-form-group
                id="abbreviation-name"
                :label="$t('contractor.modal.contractor.abbreviation')"
                label-for="abbreviation-name"
            >
                <TextInput
                    name="abbreviation"
                    type="text"
                    v-model="this.contractor.abbreviation"
                />
            </b-form-group>


            <b-form-group
                id="recipient"
                :label="$t('contractor.modal.contractor.recipients')"
                label-for="recipient-1"
                :description="$t('contractor.modal.contractor.recipients-select')"
                class="mt-3"
            >
                <vSelect :options="this.recipientByType(0, 'slm')" :components="{Deselect}" placeholder="Add employee to list" label="name" multiple v-model="selectedRecipients">
                    <template v-slot:no-options>{{ $t('contractor.modal.contractor.search')}}</template>
                </vSelect>
            </b-form-group>

            <b-form-group
                id="service-level-manager"
                :label="$t('contractor.modal.contractor.servicelevelmanager')"
                label-for="service-level-manager-1"
                class="mt-3"
            >
                <vSelect :options="this.recipientByType(1, 'slm')" placeholder="Service Level Manager" label="name" v-model="selectedServiceLevelManager" />
            </b-form-group>

            <b-form-group
                id="information"
                :label="$t('contractor.modal.contractor.information')"
                label-for="information-1"
                :description="$t('contractor.modal.contractor.information-description')"
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
        <b-button variant="success" class="w-100" type="submit">{{  $t('button.update')  }}</b-button>
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
            information: this.contractor.information,
            abbreviation: this.contractor.abbreviation,
            selectedRecipients: [],
            selectedServiceLevelManager: null,
            Deselect: {
                render: createElement => createElement('span', '❌'),
            }
        }
    },

    computed: {
        ...mapState(
            useToolsStore, { 
                getRecipientSorted: 'getRecipientSorted',
                recipientByType: 'recipientByType'
            }
        )
    },

    created() {
        this.selectedRecipients = this.getRecipientSorted('level', 0)
        this.selectedServiceLevelManager = this.getRecipientSorted('level', 1)[0]
        this.getAllRecipients()
    },

    methods: {
        ...mapActions(
            useToolsStore, { 
                getAllRecipients: 'getAllRecipients',
            }
        ),

        onSubmit: function (value) {

            const recipientsIds = this.selectedRecipients.map(item => {
                return item.id
            })

            recipientsIds.push(this.selectedServiceLevelManager.id)

            const values = {
                name: value.name,
                abbreviation: this.abbreviation,
                information: this.information,
                recipients: recipientsIds
            }

            this.$emit("onUpdate", values);
        },

        close() {
            this.$vbsModal.close();
        },
    }
});
</script>
