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
                  <div class="d-flex justify-content-between">
                     <div>
                        <CardHeader
                           :title="selectedContractor.name"
                        />
                     </div>
                     <div>
                     <a href="#" @click="editContractor">
                        <FontAwesomeIcon
                           icon="fa-solid fa-pen-to-square"
                           size="1x"
                        />
                     </a>
                     </div>
                  </div>
               </template>
               <b-card-body>
                  <b-table responsive striped outlined small hover fixed head-variant="dark" table-variant="light" :fields="fieldsContractor" :items="contractorEmployee" />
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
                     <b-table striped outlined small hover fixed :fields="fieldsServiceLevelManager" :items="serviceLevelManager" />
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
import { ModalSize } from "vue-bs-modal";

import Typeahead from '@/Components/Input/Bootstrap/Typeahead.vue'
import CardHeader from '@/Components/Card/CardHeader.vue';
import TextInput from '@/Components/Input/TextInput.vue';
import FontAwesomeIcon from '@/Components/Icon/FontAwesomeIcon.vue';
import EditContractorComponent from '@/Components/EditContractorComponent.vue';

defineRule('required', required);
   
export default {
   data() {
      return {
         selectedContractor: null,
         fieldsContractor: [{
            key: 'name', 
            thStyle: { width: "30%" }
         },{
            key: 'email'
         },{
            key: 'telephone',
            thStyle: { width: "20%" }
         },{
            key: 'level',
            thStyle: { width: "8%" }
         }],
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
      FontAwesomeIcon,
      EditContractorComponent
   },

   methods: {
      ...mapActions({
         transportInstances: 'tools/transportInstances',
         getContractors: 'tools/getContractors',
         getContractorById: 'tools/getContractorById',
         modifyContractor: 'tools/modifyContractor'
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
      },

      editContractor() {
         this.$vbsModal.open({
            content: EditContractorComponent,
            size: ModalSize.LARGE,
            contentProps: {
               contractor: this.selectedContractor,
               employee: this.contractorEmployee
            },
            contentEmits: {
               onUpdate: this.onUpdate,
            }
         });
      },

      onUpdate(data) {
         this.modifyContractor(data).then((result) => {
               console.log(result)
         })
         //this.$vbsModal.close();
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