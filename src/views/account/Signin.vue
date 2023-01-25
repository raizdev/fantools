<template>
    <div>
        <Form
            @submit="onSubmit"
        >
            <b-card no-body class="border-0 p-2">
                <template #header>
                    <CardHeader
                        :title="$t('auth.signin.title')"
                    >
                    </CardHeader>
                </template>
                <b-card-body>
                    <TextInput
                        name="username"
                        type="text"
                        placeholder="Username"
                        rules="required"
                    />
                    <TextInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        rules="required"
                    />
                </b-card-body>
                <b-card-footer class="p-0 m-0">
                    <b-button variant="success" class="w-100" type="submit">{{ $t('auth.signin.button') }}</b-button>
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

import CardHeader from '@/Components/Card/CardHeader.vue';
import TextInput from "@/Components/Input/TextInput.vue";

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
                password: ''
            }
        }
    },

    computed: {
    },

    methods: {
        onSubmit: function (values) {
            this.signIn(values).then(() => {
                this.$router.replace({
                    name: 'home'
                })
            })
        },

        ...mapActions(useAuthStore, { signIn: 'signIn'})
    }
  }
</script>