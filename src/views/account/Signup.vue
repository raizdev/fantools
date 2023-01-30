<template>
    <div>
        <div>
            <b-alert show variant="info" v-if="registrationDone">
                <h4 class="alert-heading">{{ $t('auth.signup.title-success')}} </h4>
                <p>
                    {{ $t('auth.signup.success') }}
                </p>
                <hr>
                <p class="mb-0">
                    {{ $t('auth.signup.too-long') }}
                </p>
            </b-alert>
        </div>
        <Form
            @submit="onSubmit"
            v-slot="{ isSubmitting }"
        >
            <b-card no-body class="border-0 p-2">
                <template #header>
                    <CardHeader
                        :title="$t('auth.signup.title')"
                    >
                    </CardHeader>
                </template>
                <b-card-body>
                    <TextInput
                        name="username"
                        type="text"
                        :placeholder="$t('auth.signup.username')"
                        rules="required"
                        class="mb-3"
                    />
                    <TextInput
                        name="mail"
                        type="email"
                        :placeholder="$t('auth.signup.email')"
                        rules="required|emailContainsDomain"
                        class="mb-3"
                    />
                </b-card-body>
                <b-card-footer class="p-0 m-0">
                    <Button variant="success" :isSubmitting="isSubmitting" :text="$t('auth.signup.button')"></Button>
                </b-card-footer>
            </b-card>
        </Form>
    </div>
</template>
<script>
import { mapActions } from 'pinia'
import { useAuthStore } from '@/stores';

import { Form, Field, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { emailContainsDomain } from '@/includes/rules';

import CardHeader from '@/components/Card/CardHeader.vue';
import TextInput from "@/components/Input/TextInput.vue";
import Button from '@/Components/Input/Button.vue';

defineRule('required', required);
defineRule('emailContainsDomain', emailContainsDomain);

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
            registrationDone: false,
            form: {
                username: '',
                email: ''
            }
        }
    },

    computed: {
    },

    methods: {

        async onSubmit(values) {
            const response = await this.signUp(values)
            if(response) {
                this.registrationDone = true
            }
        },

        ...mapActions(useAuthStore, { signUp: 'signUp'}),
    }
  }
</script>