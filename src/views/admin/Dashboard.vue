<template>
    <div>
       <UserList 
          v-if="!this.contractorRecipients" 
       />
    </div>
 </template>
 <script>
 import { mapActions, mapState } from 'pinia'
 import { useUserStore } from '@/stores'
 
 import UserList from '@/components/Module/Admin/UserList.vue';
    
 export default {
    data() {
       return {
       }
    },
 
    components: {
       UserList
    },
 
    computed: {
       ...mapState(
          useUserStore, { 
             pendingUsers: 'pendingUsers'
          }
       )
    },
 
    methods: {
       ...mapActions(
          useUserStore, { 
            userList: 'userList',
          }
       )
    },
 
    mounted() {
       this.getContractors()
    }
 }
 </script>
