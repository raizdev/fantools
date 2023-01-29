<template>
    <div class="modal-header">
       <h5 class="modal-title">Approve {{ this.person.username }}</h5>
       <span @click="close">
           <FontAwesomeIcon
               icon="fa-solid fa-xmark"
               size="lg"
           />
       </span>
   </div>
   
   <Form
       @submit="onSubmit"
       v-slot="{ isSubmitting }"
   >
        <div class="modal-body">
            <b-form-group
                id="roles"
                label-for="roles"
                class="mt-2 mb-2"
            >
            <vSelect :options="this.roles" v-model="this.addedRoles" placeholder="Add Roles" label="name" multiple />
            </b-form-group>
            <Button variant="success" :isSubmitting="isSubmitting" text="Approve"></Button>
        </div>
   </Form>
</template>

<script>
import { Form } from 'vee-validate';
import { mapState, mapActions } from  'pinia'
import { useRolesStore, useUsersStore } from '@/stores'

import FontAwesomeIcon from '@/components/Icon/FontAwesomeIcon.vue';
import TextInput from "@/components/Input/TextInput.vue";
import Button from '@/Components/Input/Button.vue';

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
   name: "ModifyPendingUserComponent",
   emits: ["onUpdate"],

   props: {
       user: Object
   },

   components: {
       Form,
       FontAwesomeIcon,
       TextInput,
       vSelect,
       Button
   },

   data() {
       return {
           person: this.user,
           addedRoles: []
       }
   },
   
   computed: {
       ...mapState(
            useRolesStore, { 
                roles: 'roles'
            }
       )
   },

   created() {
       this.getRoles()
   },

   methods: {
        ...mapActions(
            useUsersStore, {
                modifyPendingUser: 'modifyPendingUser'
            }
        ),

        ...mapActions(
            useRolesStore, { 
               getRoles: 'getRoles'
            }
        ),

       close() {
           this.$vbsModal.close();
       },

       async onSubmit() {
            response = this.modifyPendingUser(this.person, '1', this.addedRoles);
            if(response) {
                this.$emit("onUpdate");
            }
       }
   }
}
</script>
