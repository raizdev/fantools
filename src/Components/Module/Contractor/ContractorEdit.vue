<template>
    <div class="container-lg p-4">
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
             <b-table responsive striped outlined small hover fixed head-variant="dark" table-variant="light" :fields="fieldsContractor" :items="this.contractorEmployee" />
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
             <b-table striped outlined small hover fixed :fields="fieldsServiceLevelManager" :items="this.serviceLevelManager" />
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
 </template>
 <script>
    import { mapActions } from "vuex";
    import { ModalSize } from "vue-bs-modal";
    
    import CardHeader from '@/Components/Card/CardHeader.vue';
    import FontAwesomeIcon from '@/Components/Icon/FontAwesomeIcon.vue';
    import EditContractorComponent from '@/Components/Modal/EditContractorComponent.vue';
    
    export default {
        name: 'ContractorEdit',
    
        props: {
            contractorId: Number
        },
    
       data() {
          return {
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
             serviceLevelManager: [],
             contractorEmployee: [],
             selectedContractor: [],
             information: ''
          }
       },
    
       components: {
          CardHeader,
          FontAwesomeIcon,
          EditContractorComponent
       },
    
       methods: {
          ...mapActions({
             getContractorById: 'tools/getContractorById',
             modifyContractor: 'tools/modifyContractor'
          }),
    
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
    
          getContractor(contractorId) {
             this.getContractorById(contractorId).then((result) => {
                   this.serviceLevelManager = result.service_level_manager
                   this.contractorEmployee = result.contractors_details
                   this.selectedContractor = result
             })
          },
    
          updateContractor(data) {
             this.modifyContractor(data).then((result) => {
                if(result) {
                   this.getContractor(this.contractorId)
                   this.$vbsModal.close();
                }
             })
          }
       },

       mounted() {
            this.getContractor(this.contractorId)
       }
    }
 </script>