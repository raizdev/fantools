<template>
    <div>
        <Form
            @submit="onSubmit"
        >
            <b-card no-body class="border-0 p-2">
                <template #header>
                    <CardHeader
                        :title="$t('auth.change_password.title')"
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
                            name="password_confirmation"
                            type="password"
                            :rules="{ required: true, confirmed: '@password', regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/ }"
                            class="mb-2"
                            passwordMeter
                        />
                    </b-form-group>
                </b-card-body>
                <b-card-footer class="p-0 m-0">
                    <Button variant="success" :text="$t('button.update')"></Button>
                </b-card-footer>
            </b-card>
        </Form>
    </div>
</template>
<script>
import { mapActions, mapWritableState } from 'pinia'
import { useUsersStore, useAuthStore  } from '@/stores';

import { Form, Field, defineRule } from 'vee-validate';
import { required, max, confirmed, regex, min } from '@vee-validate/rules';

import CardHeader from '@/components/Card/CardHeader.vue';
import TextInput from "@/components/Input/TextInput.vue";
import Button from '@/Components/Input/Button.vue';

defineRule('min', min);
defineRule('required', required);
defineRule('max', max);
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

    inject: ["notyf"],

    components: {
        Form,
        Field,
        TextInput,
        CardHeader,
        Button
    },  

    data() {
        return {
            passwordd: ''
        }
    },

    computed: {
        ...mapWritableState(
            useAuthStore, { 
                userState: 'user'
        }),
    },

    methods: {
        ...mapActions(
            useUsersStore, { 
                changePassword: 'changePassword'
        }),

        async onSubmit(values) {
            const response = await this.changePassword(values);
            if(response) {
                this.notyf.success('Password changed!');
                this.userState.temp_password = null
                this.$router.push('/');
            }
        }
    }
  }
</script>