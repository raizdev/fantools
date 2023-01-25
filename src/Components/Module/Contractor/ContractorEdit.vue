<template>
    <div class="container-lg p-4">
       <b-card no-body class="border-0 p-2">
          <template #header>
             <div class="d-flex justify-content-between">
                <div>
                   <CardHeader
                      :title="this.contractor.name"
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
             <b-table responsive striped outlined small hover fixed head-variant="dark" table-variant="light" :fields="fieldsContractor" :items="this.contractor.contractors_details">
                  <template #cell(email)="email">
                     <span v-clipboard="email.item.email" style="cursor: pointer !important">
                        <FontAwesomeIcon 
                           icon="fa-regular fa-clipboard"
                           size="1x"
                           variant="dark"
                        />
                        {{ email.item.email }}
                     </span>
                  </template>
                  <template #cell(telephone)="telephone">
                     <span v-clipboard="telephone.item.telephone" style="cursor: pointer !important">
                        <FontAwesomeIcon 
                           icon="fa-regular fa-clipboard"
                           size="1x"
                           variant="dark"
                        />
                        {{ telephone.item.telephone }}
                     </span>
                  </template>
               </b-table>
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
             <b-table striped outlined small hover fixed :fields="fieldsServiceLevelManager" :items="this.contractor.service_level_manager" />
          </b-card-body>
       </b-card>
       <b-card no-body class="border-0 p-2" v-if="this.contractor.information">
          <template #header>
             <CardHeader
                title="Information"
                >
             </CardHeader>
          </template>
          <b-card-body>
             {{ this.contractor.information }}
          </b-card-body>
       </b-card>
    </div>
 </template>
 <script>
import { mapActions, mapState } from 'pinia'
import { useToolsStore } from '@/stores'
import { ModalSize } from "vue-bs-modal";

import CardHeader from '@/Components/Card/CardHeader.vue';
import FontAwesomeIcon from '@/Components/Icon/FontAwesomeIcon.vue';
import EditContractorComponent from '@/Components/Modal/EditContractorComponent.vue';

export default {
   name: 'ContractorEdit',

   props: {
      contractorId: Number,
      contractor: Object
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
      }
   },

   components: {
      CardHeader,
      FontAwesomeIcon,
      EditContractorComponent
   },

   computed: {
      ...mapState(
         useToolsStore, { getContractor: 'contractor' }
      )
   },

   methods: {
      ...mapActions(
         useToolsStore, { 
            getContractorById: 'getContractorById',
            modifyContractor: 'modifyContractor'
         }
      ),

      editContractor() {
         this.$vbsModal.open({
            content: EditContractorComponent,
            size: ModalSize.LARGE,
            contentProps: {
               contractor: this.contractor
            },
            contentEmits: {
               onUpdate: this.updateContractor,
            }
         });
      },
   
      updateContractor(data) {
         this.modifyContractor(data).then((result) => {
            if(result) {
               this.getContractor(this.contractorId)
               this.$vbsModal.close();
            }
         })
      }
   }
}
 </script>