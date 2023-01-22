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
         <div class="container-lg p-4" v-if="!selectedContractor">
            <b-card no-body class="border-0 p-2">
               <template #header>
                  <CardHeader
                     title="Recipients"
                     >
                  </CardHeader>
               </template>
               <b-card-body>
                  <b-row>
                     <b-col lg="6" class="my-1">
                        <b-form-group
                           label="Filter"
                           label-for="filter-input"
                           label-cols-sm="3"
                           label-align-sm="right"
                           label-size="sm"
                           class="mb-0"
                           >
                           <b-input-group size="sm">
                              <b-form-input
                                 id="filter-input"
                                 v-model="recipientTableConfiguration.filter"
                                 type="search"
                                 placeholder="Type to Search"
                                 ></b-form-input>
                           </b-input-group>
                        </b-form-group>
                     </b-col>
                  </b-row>
                  <b-table
                     :fields="recipientTableConfiguration.fields"
                     :items="recipient"
                     :current-page="recipientTableConfiguration.currentPage"
                     :per-page="recipientTableConfiguration.perPage"
                     :filter="recipientTableConfiguration.filter"
                     :filter-included-fields="recipientTableConfiguration.filterOn"
                     stacked="md"
                     show-empty
                     small
                     @filtered="onFiltered"
                     responsive striped outlined hover fixed head-variant="dark" table-variant="light"
                     >

                     <template #cell(actions)="row">
                        <a href="#" @click="editRecipient(row.item.id)">❌</a>
                     </template>
                  </b-table>
                  <b-col sm="7" md="6" class="my-1">
                        <b-pagination
                           v-model="recipientTableConfiguration.currentPage"
                           :total-rows="recipientTableConfiguration.totalRows"
                           :per-page="recipientTableConfiguration.perPage"
                           align="fill"
                           size="sm"
                           class="my-0"
                           ></b-pagination>
                     </b-col>
               </b-card-body>
            </b-card>
         </div>
         <div class="container-lg p-4" v-if="selectedContractor">
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
            <b-card no-body class="border-0 p-2" v-if="selectedContractor.information">
               <template #header>
                  <CardHeader
                     title="Information"
                     >
                  </CardHeader>
               </template>
               <b-card-body>
                  {{ selectedContractor.information }}
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
   import EditRecipientComponent from '@/Components/EditRecipientComponent.vue';

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
            recipient: [],
            fieldsServiceLevelManager: ['name', 'email', 'telephone'],
            contractorEmployee: [],
            serviceLevelManager: [],
            contractors: [],
            contractorSearch: '',
            information: '',
            query: '',
            recipientTableConfiguration: {
               fields: [{
                  key: 'name',
                  thStyle: { width: "25%" }
               },{
                  key: 'email',
                  thStyle: { width: "40%" }
               },{
                  key: 'telephone',
                  thStyle: { width: "25%" }
               },{ 
                  key: 'actions', 
                  label: 'Actions' 
               }],
               totalRows: 1,
               currentPage: 1,
               perPage: 10,
               test: ['name'],
               pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
               filter: null,
               filterOn: [],
            }
         }
      },
   
      components: {
         CardHeader,
         TextInput,
         Form,
         Typeahead,
         FontAwesomeIcon,
         EditContractorComponent,
         EditRecipientComponent
      },
   
      methods: {
         ...mapActions({
            transportInstances: 'tools/transportInstances',
            getContractors: 'tools/getContractors',
            getContractorById: 'tools/getContractorById',
            modifyContractor: 'tools/modifyContractor',
            findServiceLevelmangers: 'tools/findServiceLevelmangers'
         }),
   
         onFiltered(filteredItems) {
           // Trigger pagination to update the number of buttons/pages due to filtering
           this.recipientTableConfiguration.totalRows = filteredItems.length
           this.recipientTableConfiguration.currentPage = 1
         },
   
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
                  employee: this.contractorEmployee,
                  slm: this.serviceLevelManager
               },
               contentEmits: {
                  onUpdate: this.updateContractor,
               }
            });
         },

         editRecipient(recipientId) {
            this.$vbsModal.open({
               content: EditRecipientComponent,
               size: ModalSize.LARGE,
               contentProps: {
                  recipient: this.recipient.filter(recipient => recipient.id == recipientId)[0]
               },
               contentEmits: {
                  onUpdate: this.updateRecipient,
               }
            });
         },
   
         getContractor(newValue) {
            this.getContractorById(newValue).then((result) => {
                  this.serviceLevelManager = result.service_level_manager
                  this.contractorEmployee = result.contractors_details
                  this.selectedContractor = result
            })
         },
   
         updateContractor(data) {
            this.modifyContractor(data).then((result) => {
               if(result) {
                  this.getContractor(this.selectedContractor.id)
                  this.$vbsModal.close();
               }
            })
         },

         updateRecipient(data) {

         }
      },
   
      mounted() {
         this.findServiceLevelmangers(0).then((result) => {
               this.recipientTableConfiguration.totalRows = result.length
               this.recipient = result
         })
      },
   
   
      watch: {
         selectedContractor: function (newValue) {
            this.getContractor(newValue.id)
         }
      }
   }
</script>