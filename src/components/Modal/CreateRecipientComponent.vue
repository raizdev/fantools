<template>
    <div class="modal-header">
       <h5 class="modal-title"> {{ $t('contractor.modal.recipient.title') }}</h5>
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
               :label="$t('contractor.modal.recipient.name')"
               label-for="recipient-name"
           >
               <TextInput
                   name="name"
                   type="text"
                   rules="required"
               />
           </b-form-group>

           <b-form-group
               id="recipient-email"
               :label="$t('contractor.modal.recipient.email')"
               label-for="recipient-email"
               class="mt-2 mb-2"
           >
               <TextInput
                   name="email"
                   type="text"
               />
               
           </b-form-group>

           <b-form-group
               id="recipient-telephone"
               :label="$t('contractor.modal.recipient.telephone')"
               label-for="recipient-telephone"
               class="mt-2 mb-2"
           >
               <TextInput
                   name="telephone"
                   type="text"
                   rules="required"
               />
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
               />
           </b-form-group>

           <b-form-group
               id="recipient-slm"
               :label="$t('contractor.modal.recipient.isslm')"
               label-for="recipient-slm"
               class="mt-3 mb-2"
           >
               <b-form-checkbox
                   id="slm"
                   name="slm"
                   true-value="'1'"
                   false-value="'0'"
               >
           </b-form-checkbox>

           </b-form-group>
       </div>

       <b-button variant="success" class="w-100" type="submit">{{ $t('button.create') }}</b-button>
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
               name: value.name,
               email: value.email,
               telephone: value.telephone,
               slm: (this.isServiceLevelManager === true) ? '1' : '0',
               level: value.level
           }
           
           this.$emit("onUpdate", values);
       }
   }
}
</script>
