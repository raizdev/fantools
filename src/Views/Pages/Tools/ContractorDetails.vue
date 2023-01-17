<template>
   <div>
      <div class="jumbotron jumbotron-fluid">
         <div class="container">
            <form>
               <div class="main">
                  <div class="form-group">
                     <FontAwesomeIcon
                        icon="fa-solid fa-magnifying-glass"
                        size="2x"
                        variant="light"
                        style="position: absolute; padding: 10px"
                     />
                     <vue-bootstrap-typeahead 
                        @input="handleInput"
                        :data="contractors"
                        :serializer="s => s.slug"
                        placeholder="Search for contractors..."
                        @hit="selectedContractor = $event"
                        />
                  </div>
               </div>
            </form>
         </div>
      </div>
      <div>
         <div div class="container-lg p-4" v-if="selectedContractor">
            <Form
               @submit="onSubmit"
               >
               <b-card no-body class="border-0 p-2">
                  <template #header>
                     <CardHeader
                        :title="selectedContractor.name"
                        >
                     </CardHeader>
                  </template>
                  <b-card-body>
                     <b-table outlined small hover fixed no-border-collapse :fields="fields" :items="contractorDetails.contract_details"/>
                  </b-card-body>
               </b-card>
            </Form>
         </div>
      </div>
   </div>
</template>
<script>
import { BCard, BCardBody, BButton, BCardFooter, BTable } from 'bootstrap-vue-3';

import { Form, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { mapActions } from "vuex";
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

import CardHeader from '@/Components/Card/CardHeader.vue';
import TextInput from '@/Components/Input/TextInput.vue';
import FontAwesomeIcon from '@/Components/Icon/FontAwesomeIcon.vue';

defineRule('required', required);
   
export default {

   data() {
      return {
         fields: ['name', 'email', 'telephone', 'level'],
         query: '',
         contractorDetails: [],
         contractors: [],
         contractorSearch: '',
         selectedContractor: null
      }
   },

   components: {
      CardHeader,
      TextInput,
      BCardBody,
      BCardFooter,
      BButton,
      BCard,
      Form,
      BTable,
      VueBootstrapTypeahead,
      FontAwesomeIcon
   },

   methods: {
      ...mapActions({
         transportInstances: 'tools/transportInstances',
         getContractors: 'tools/getContractors',
         getContractorById: 'tools/getContractorById'
      }),

      onSubmit: function (values) {
         this.transportInstances(values).then((result) => {
               this.items = result
         })
      },

      handleInput(event){
         this.getContractors(event.target.value).then((result) => {
               this.contractors = result
         })
      }
   },

   watch: {
      selectedContractor: function (newValue) {
         this.getContractorById(newValue.id).then((result) => {
               this.contractorDetails = result
         })
      }
   }
}
</script>