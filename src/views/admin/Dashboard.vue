<template>
    <div>
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
       <UserList 
          :users="this.userList" 
       />
    </div>
 </template>
 <script>
 import UserList from '@/components/Module/Admin/UserList.vue';
    
 export default {

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
                    text: 'Admin Dashboard',
                    active: true
                }
            ]
        }
    }
 }
 </script>
