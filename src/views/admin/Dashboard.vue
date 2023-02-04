<template>
    <div>
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
       <UserList 
          :users="this.userList" 
       />
    </div>
 </template>
 <script>
 import { mapActions, mapState } from 'pinia'
 import { useUsersStore } from '@/stores'
 
 import UserList from '@/components/Module/Admin/UserList.vue';
    
 export default {
   data() {
      return {
         userList: []
      }
   },

   components: {
      UserList
   },

   
   computed: {
        breadcrumbs() {
            return [
                {
                    text: 'Home',
                    to: { name: 'home' }
                },
                {
                    text: 'Admin Dsahboard',
                    active: true
                }
            ]
        }
    },
 }
 </script>
