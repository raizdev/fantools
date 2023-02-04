<template>
    <div class="modal-header">
       <h5 class="modal-title">{{ $t('admin.userlist.current.modify') }} {{ this.person.username }}</h5>
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
                <vSelect :options="this.roles" v-model="this.addedRoles" :placeholder="$t('admin.userlist.pending.roles')" label="name" multiple />
            </b-form-group>
        </div>
        <Button variant="success" :isSubmitting="isSubmitting" :text="$t('button.update')"></Button>
   </Form>
</template>

<script>
import { Form } from 'vee-validate';
import { mapState, mapActions, mapWritableState } from  'pinia'
import { useRolesStore, useUsersStore, useNotificationStore  } from '@/stores'

import FontAwesomeIcon from '@/components/Icon/FontAwesomeIcon.vue';
import TextInput from "@/components/Input/TextInput.vue";
import Button from '@/Components/Input/Button.vue';

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
    name: "ModifyUserComponent",
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
        ),
        ...mapState(
            useUsersStore, { 
                getUser: 'getUserById'
            }
        ),
        ...mapWritableState(
            useNotificationStore, { 
                addNotification: 'notifications'
        }),
    },

    created() {
        this.getRoles()
        const user = this.getUser(this.user.id)[0];
        this.addedRoles = user.roles
    },

    methods: {
        ...mapActions(
            useRolesStore, { 
                getRoles: 'getRoles'
            }
        ),

        ...mapActions(
            useUsersStore, {
                modifyUserRoles: 'modifyUserRoles'
            }
        ),

        close() {
            this.$vbsModal.close();
        },

        async onSubmit() {
                const result = await this.modifyUserRoles(this.person, this.addedRoles);
                if(result) {
                    this.addNotification.push({ text: 'Account modified!', type: 'success'})
                    this.$emit("onUpdate");
                }
        }
    }
}
</script>
