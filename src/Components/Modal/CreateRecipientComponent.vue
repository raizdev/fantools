<template>
    <div class="modal-header">
       <h5 class="modal-title">Create Recipient</h5>
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
               />
           </b-form-group>

           <b-form-group
               id="recipient-email"
               label="Recipient email"
               label-for="recipient-email"
           >
               <TextInput
                   name="email"
                   type="text"
               />
               
           </b-form-group>

           <b-form-group
               id="recipient-telephone"
               label="Recipient telephone"
               label-for="recipient-telephone"
           >
               <TextInput
                   name="telephone"
                   type="text"
                   rules="required"
               />
           </b-form-group>

           <b-form-group
               id="recipient-slm"
               label="Is Service Level Manager?"
               label-for="recipient-slm"
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

       <b-button variant="success" class="w-100" type="submit">Add</b-button>
   </Form>
</template>

<script>
import { Form } from 'vee-validate';
import { mapActions } from "vuex";

import FontAwesomeIcon from '../Icon/FontAwesomeIcon.vue';
import TextInput from "../Input/TextInput.vue";

export default {
   name: "CreateRecipientComponent",
   emits: ["onUpdate"],

   props: {
       recipient: {
           type: Object
       }
   },

   components: {
       Form,
       FontAwesomeIcon,
       TextInput
   },

   data() {
       return {
           isServiceLevelManager: 0,
           person: this.recipient
       }
   },

   methods: {
       ...mapActions({
           findEmployee: 'tools/updateRecipient'
       }),

       close() {
           this.$vbsModal.close();
       },

       onSubmit: function (values) {

           const newValues = {
               id: null,
               name: values.name,
               email: values.email,
               telephone: values.telephone,
               slm: (this.isServiceLevelManager === true) ? '1' : '0'
           }

           this.$emit("onUpdate", newValues);
       }
   }
}
</script>
