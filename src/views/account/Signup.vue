<template>
    <div>
        <Form
            @submit="onSubmit"
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
                        rules="required"
                        class="mb-3"
                    />
                </b-card-body>
                <b-card-footer class="p-0 m-0">
                    <b-button variant="success" class="w-100" type="submit">{{ $t('auth.signup.button') }}</b-button>
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

import CardHeader from '@/components/Card/CardHeader.vue';
import TextInput from "@/components/Input/TextInput.vue";

defineRule('required', required);

export default {

    components: {
        Form,
        Field,
        TextInput,
        CardHeader
    },  

    data() {
        return {
            form: {
                username: '',
                email: ''
            }
        }
    },

    computed: {
    },

    methods: {

        onSubmit: function (values) {
            this.signUp(values)
        },

        ...mapActions(useAuthStore, { signUp: 'signUp'})
    }
  }
</script>