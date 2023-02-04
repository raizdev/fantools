<template>
    <div class="container-lg p-4">
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <b-card no-body class="border-0 p-2" v-if="this.contractorRecipients.information">
          <template #header>
             <CardHeader
                title="Information"
                >
             </CardHeader>
          </template>
          <b-card-body>
             <p v-html="this.contractorRecipients.information"></p>
          </b-card-body>
       </b-card>
       <b-card no-body class="border-0 p-2">
          <template #header>
             <div class="d-flex justify-content-between">
                <div>
                   <CardHeader
                      :title="this.contractorRecipients.name"
                      />
                </div>
                <div>
                   <a href="#" @click="editContractor" v-role:any="'super-admin|escalatiedesk-edit'">
                      <FontAwesomeIcon
                         icon="fa-solid fa-pen-to-square"
                         size="1x"
                         />
                   </a>
                </div>
             </div>
          </template>
          <b-card-body>
             <b-table responsive striped outlined small hover fixed head-variant="dark" table-variant="light" :fields="fieldsContractor" :items="this.contractorRecipients.contractors_details">
                  <template #cell(email)="email">
                     <span v-clipboard="email.item.email" @click="notifyClipboard(email)" style="cursor: pointer !important" v-if="email.item.email">
                        <FontAwesomeIcon 
                           icon="fa-regular fa-clipboard"
                           size="1x"
                           variant="dark"
                        />
                        {{ email.item.email }}
                     </span>
                  </template>
                  <template #cell(telephone)="telephone">
                     <span v-clipboard="telephone.item.telephone" @click="notifyClipboard(telephone)" style="cursor: pointer !important" v-if="telephone.item.telephone">
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
             <b-table striped outlined small hover fixed :fields="fieldsServiceLevelManager" :items="this.contractorRecipients.service_level_manager" />
          </b-card-body>
       </b-card>
    </div>
 </template>
 <script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useToolsStore, useNotificationStore } from '@/stores'

import CardHeader from '@/Components/Card/CardHeader.vue';
import FontAwesomeIcon from '@/Components/Icon/FontAwesomeIcon.vue';
import EditContractorComponent from '@/Components/Modal/EditContractorComponent.vue';

export default {
   name: 'ContractorEdit',

   inject: ["notyf"],

   data() {
      return {
         fieldsContractor: [{
            key: 'name', 
            label: this.$i18n.t('contractor.recipient.table.name'),
            thStyle: { width: "30%" }
         },{
            key: 'email',
            label: this.$i18n.t('contractor.recipient.table.email')
         },{
            key: 'telephone',
            label: this.$i18n.t('contractor.recipient.table.telephone'),
            thStyle: { width: "20%" }
         },{
            key: 'level',
            thStyle: { width: "8%" }
         }],
         fieldsServiceLevelManager: [{ 
            key: 'name', 
            label: this.$i18n.t('contractor.recipient.table.name') 
         },{
            key: 'email',
            label: this.$i18n.t('contractor.recipient.table.email'),
         },{
            key: 'telephone',
            label: this.$i18n.t('contractor.recipient.table.email')
         }]
      }
   },

   components: {
      CardHeader,
      FontAwesomeIcon,
      EditContractorComponent
   },

   computed: {
      breadcrumbs() {
         return [
            {
               text: 'Home',
               to: { name: 'home' }
            },
            {
               text: 'Contractor Details',
               to: { name: 'contractor-details' }
            },
            {
               text: this.contractorRecipients.name,
               active: true
            }
         ]
      },
      ...mapState(
         useToolsStore, { 
            contractorRecipients: 'contractorRecipients',
            getContractor: 'contractor' 
         }
      ),
      ...mapWritableState(
            useNotificationStore, { 
                addNotification: 'notifications'
        }),
   },

   methods: {
      ...mapActions(
         useToolsStore, { 
            getContractorRecipients: 'getContractorRecipients',
            getContractorById: 'getContractorById',
            modifyContractor: 'modifyContractor',
         }
      ),

      editContractor() {
         this.$vbsModal.open({
            content: EditContractorComponent,
            contentProps: {
               contractor: this.contractorRecipients
            },
            contentEmits: {
               onUpdate: this.updateContractor,
            }
         });
      },
   
      updateContractor(data) {
         this.modifyContractor(data).then((result) => {
            this.getContractorRecipients(this.contractorRecipients.id)
            this.addNotification.push({ text: this.$i18n.t('notification.updated', {name: data.name}), type: 'success'})
            this.$vbsModal.close();
         })
      },

      notifyClipboard(type) {
         this.notyf.success(type.field.label + " " + this.$i18n.t('contractor.recipient.copied'));
      }
   },

   created() {
      this.getContractorRecipients(this.$route.params.id)
   }
}
 </script>