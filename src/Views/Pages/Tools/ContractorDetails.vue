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
            <b-card no-body class="border-0 p-2">
               <template #header>
                  <CardHeader
                     :title="selectedContractor.name"
                     >
                  </CardHeader>
               </template>
               <b-card-body>
                  <b-table outlined small hover fixed no-border-collapse :fields="fields" :items="contractorDetails" />
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
                     <b-table-simple responsive>
                        <b-thead>
                           <b-tr>
                              <b-th>Fullname</b-th>
                              <b-th>Mail</b-th>
                              <b-th>Telephone</b-th>
                           </b-tr>
                        </b-thead>
                        <b-tbody>
                           <b-tr>
                              <b-td>{{ serviceLevelManager.fullname }}</b-td>
                              <b-td>{{ serviceLevelManager.mail }}</b-td>
                              <b-td>{{ serviceLevelManager.telephone }}</b-td>
                           </b-tr>
                        </b-tbody>
                     </b-table-simple>
                  </b-card-body>
               </b-card>
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
         fields: [
            { key: 'name', sortable: false },
            { key: 'email', sortable: false },
            { key: 'telephone', sortable: false },
            { key: 'level', sortable: true }
         ],
         query: '',
         contractorDetails: [],
         contractors: [],
         contractorSearch: '',
         selectedContractor: null,
         serviceLevelManager: {},
         sortBy: 'level'
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
               this.serviceLevelManager = result.service_level_manager
               this.contractorDetails = result.contract_details
         })
      }
   }
}
</script>