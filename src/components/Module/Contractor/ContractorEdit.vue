<template>
    <div class="container-lg p-4">
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <b-card no-body class="border-0 p-2" v-if="this.contractor.information">
          <template #header>
             <CardHeader
                title="Information"
                >
             </CardHeader>
          </template>
          <b-card-body>
             <p v-html="this.contractor.information"></p>
          </b-card-body>
       </b-card>
       <b-card no-body class="border-0 p-2">
          <template #header>
             <div class="d-flex justify-content-between">
                <div>
                   <CardHeader
                      :title="this.contractor.name"
                      />
                </div>
                <div>
                   <a href="#" @click="editContractor" v-role:any="'super-admin|escalationdesk-edit'">
                      <FontAwesomeIcon
                         icon="fa-solid fa-pen-to-square"
                         size="1x"
                         />
                   </a>
                </div>
             </div>
          </template>
          <b-card-body>
             <b-table responsive striped outlined small hover fixed head-variant="dark" table-variant="light" :fields="fieldsContractor" :items="this.getRecipientSorted('level', 0)">
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
             <b-table striped outlined small hover fixed :fields="fieldsServiceLevelManager" :items="this.getRecipientSorted('level', 1)" />
          </b-card-body>
       </b-card>
    </div>
 </template>
 <script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useToolsStore, useDatabaseStore, useNotificationStore } from '@/stores'

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
               text: this.contractor.name,
               active: true
            }
         ]
      },
      ...mapState(
         useToolsStore, { 
            contractor: 'contractor' ,
            getRecipientSorted: 'getRecipientSorted'
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
            modifyContractor: 'modifyContractor',
         }
      ),

      ...mapActions(
         useDatabaseStore, { 
            update: 'update'
         }
      ),

      editContractor() {
         this.$vbsModal.open({
            content: EditContractorComponent,
            contentProps: {
               contractor: this.contractor
            },
            contentEmits: {
               onUpdate: this.updateContractor,
            }
         });
      },
   
      updateContractor(values) {
         this.update(values, this.contractor.id, 'contractors').then(() => {
            this.getContractorRecipients(this.contractor.id)
            this.addNotification.push({ text: this.$i18n.t('notification.updated', {name: this.contractor.name }), type: 'success'})
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