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
                     <Typeahead
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
            <b-card no-body class="border-0 p-2">
               <template #header>
                  <CardHeader
                     :title="selectedContractor.name"
                     >
                  </CardHeader>
               </template>
               <b-card-body>
                  <b-table outlined small hover fixed no-border-collapse :fields="fieldsContractor" :items="contractorEmployee" />
               </b-card-body>
            </b-card>
            <b-card no-body class="border-0 p-2">
                  <template #header>
                     <CardHeader
                        title="Service Level Manager"
                        >
                     </CardHeader>
                  </template>
                  <b-card-body>
                     <b-table outlined small hover fixed no-border-collapse :fields="fieldsServiceLevelManager" :items="serviceLevelManager" />
                  </b-card-body>
               </b-card>
         </div>
      </div>
   </div>
</template>
<script>
import { Form, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { mapActions } from "vuex";

import Typeahead from '@/Components/Input/Bootstrap/Typeahead.vue'
import CardHeader from '@/Components/Card/CardHeader.vue';
import TextInput from '@/Components/Input/TextInput.vue';
import FontAwesomeIcon from '@/Components/Icon/FontAwesomeIcon.vue';

defineRule('required', required);
   
export default {
   data() {
      return {
         selectedContractor: null,
         fieldsContractor: ['name', 'email', 'telephone', 'level'],
         fieldsServiceLevelManager: ['name', 'email', 'telephone'],
         contractorEmployee: [],
         serviceLevelManager: [],
         contractors: [],
         contractorSearch: '',
         query: ''
      }
   },

   components: {
      CardHeader,
      TextInput,
      Form,
      Typeahead,
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
               this.serviceLevelManager = result.service_level_manager
               this.contractorEmployee = result.contractors_details
         })
      }
   }
}
</script>