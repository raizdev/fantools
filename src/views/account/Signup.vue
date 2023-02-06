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
                    <b-alert show variant="info" style="font-size: 14px">
                        {{ $t('auth.change_password.requirements.must_contain') }}
                        <li>{{ $t('auth.change_password.requirements.characters') }}</li>
                        <li>{{ $t('auth.change_password.requirements.lowercase') }}</li>
                        <li>{{ $t('auth.change_password.requirements.uppercase') }}</li>
                        <li>{{ $t('auth.change_password.requirements.special') }}</li>
                    </b-alert>

                    <b-form-group
                        id="password"
                        :label="$t('auth.signup.username')"
                        label-for="password"
                        class="mt-2 mb-2"
                    >
                        <TextInput
                            name="username"
                            type="text"
                            rules="required"
                            class="mb-3"
                        />
                    </b-form-group>

                    <b-form-group
                        id="password"
                        :label="$t('auth.signup.email')"
                        label-for="password"
                        class="mt-2 mb-2"
                    >
                        <TextInput
                            name="email"
                            type="email"
                            placeholder="@kpn.com"
                            rules="required|emailContainsDomain"
                            class="mb-3"
                        />
                    </b-form-group>

                    <b-form-group
                        id="password"
                        :label="$t('auth.change_password.password')"
                        label-for="password"
                        class="mt-2 mb-2"
                    >
                        <TextInput
                            name="password"
                            type="password"
                            rules="required|min:8"
                            class="mb-3"
                        />
                    </b-form-group>

                    <b-form-group
                        id="password_confirmation-email"
                        :label="$t('auth.change_password.password_confirmation')"
                        label-for="password_confirmation-email"
                        class="mt-2 mb-2"
                    >
                        <TextInput
                            name="passwordConfirm"
                            type="password"
                            :rules="{ required: true, confirmed: '@password', regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/ }"
                            class="mb-2"
                            passwordMeter
                        />
                    </b-form-group>
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
import { useAuthStore, useDatabaseStore } from '@/stores';

import { Form, Field, defineRule } from 'vee-validate';
import { required, confirmed, regex } from '@vee-validate/rules';
import { emailContainsDomain } from '@/includes/rules';

import CardHeader from '@/components/Card/CardHeader.vue';
import TextInput from "@/components/Input/TextInput.vue";
import Button from '@/Components/Input/Button.vue';

defineRule('required', required);
defineRule('emailContainsDomain', emailContainsDomain);
defineRule('confirmed', (value, [target]) => {
  if (value === target) {
    return true;
  }
  return 'Passwords must match';
});
defineRule('regex', (value, [target]) => {
    if(value.match(target)) {
        return true;
    }
    return 'Required: upper, lowercase characters and atleast 1 specialchar (#?!@$%^&*-)';
})

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

        async onSubmit(credentials) {
            const response = await this.create(credentials, 'users')
            if(response) {
                this.registrationDone = true
            }
        },

        ...mapActions(
            useAuthStore, {
                 signUp: 'signUp'
            }
        ),

        ...mapActions(
            useDatabaseStore, {
                create: 'create'
            }
        )
    }
  }
</script>