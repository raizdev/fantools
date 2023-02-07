<template>
    <div class="modal-header">
       <h5 class="modal-title">{{ $t('admin.userlist.current.title') }} {{ this.person.username }}</h5>
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
            <vSelect :options="this.roles" v-model="this.selectedRoles" :placeholder="$t('admin.userlist.pending.roles')" label="name" multiple />
            </b-form-group>
        </div>
        <Button variant="success" :isSubmitting="isSubmitting" :text="$t('button.update')"></Button>
   </Form>
</template>

<script>
import { Form } from 'vee-validate';
import { mapActions, mapWritableState, mapState } from  'pinia'
import { useUsersStore, useNotificationStore, useRoleStore, useDatabaseStore } from '@/stores'

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
            selectedRoles: []
        }
    },

    computed: {
        ...mapWritableState(
            useNotificationStore, { 
                addNotification: 'notifications'
        }),

        ...mapState(
            useRoleStore, {
                roles: 'roles'
            }
        )
    },

    created() {
        this.selectedRoles = this.person.expand.roles
        this.getRoles()
    },

    methods: {
        ...mapActions(
            useUsersStore, {
                modifyPendingUser: 'modifyPendingUser',
            }
        ),

        ...mapActions(
            useRoleStore, {
                getRoles: 'getRoles'
            }
        ),

        ...mapActions(
            useDatabaseStore, {
                update: 'update'
            }
        ),

        close() {
            this.$vbsModal.close();
        },

        async onSubmit() {
            
            const roleIds = this.selectedRoles.map(item => {
                return item.id
            })
            
            const values = {
                verified: true,
                roles: roleIds
            }

            const result = await this.update(values, this.person.id, 'users');

            if(result) {
                this.addNotification.push({ text: 'Account sucessfully approved!', type: 'success'})
                this.$emit("onUpdate");
            }
        }
    }
}
</script>
