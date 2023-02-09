<template>
    <div>
        <Form
            @submit="forgotPassword"
            v-slot="{ isSubmitting }"
        >
            <b-card no-body class="border-0 p-2">
                <template #header>
                    <CardHeader
                        :title="$t('auth.change_password.title_')"
                    >
                    </CardHeader>
                </template>
                <b-card-body>
                    <b-form-group
                        id="password"
                        :label="$t('auth.change_password.mail')"
                        label-for="password"
                        class="mt-2 mb-2"
                    >
                        <TextInput
                            name="email"
                            type="email"
                            rules="email|emailContainsDomain"
                            placeholder="@kpn.com"
                            class="mb-3"
                        />
                    </b-form-group>
                </b-card-body>
                <b-card-footer class="p-0 m-0">
                    <Button variant="success" :isSubmitting="isSubmitting" :text="$t('auth.signin.button')"></Button>
                </b-card-footer>
            </b-card>
        </Form>
    </div>
</template>
<script>
import { mapActions } from 'pinia'
import { useUsersStore } from '@/stores';

import { Form, Field, defineRule } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { emailContainsDomain } from '@/includes/rules';

import CardHeader from '@/components/Card/CardHeader.vue';
import TextInput from "@/components/Input/TextInput.vue";
import Button from '@/Components/Input/Button.vue';

defineRule('required', required);
defineRule('email', email);
defineRule('emailContainsDomain', emailContainsDomain)

export default {

    components: {
        Form,
        Field,
        TextInput,
        CardHeader,
        Button
    },  

    data() {
        return {
            email: ''
        }
    },

    methods: {
        ...mapActions(
            useUsersStore, { 
                forgotPassword: 'forgotPassword'
        }),
    }
  }
</script>