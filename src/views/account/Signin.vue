<template>
    <div>
        <Form
            @submit="onSubmit"
            v-slot="{ isSubmitting }"
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
                        class="mb-3"
                    />
                    <TextInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        rules="required"
                        class="mb-3"
                    />
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
import { useAuthStore } from '@/stores';

import { Form, Field, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';

import CardHeader from '@/components/Card/CardHeader.vue';
import TextInput from "@/components/Input/TextInput.vue";
import Button from '@/Components/Input/Button.vue';

defineRule('required', required);

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
            form: {
                username: '',
                password: ''
            }
        }
    },

    computed: {
    },

    methods: {
        async onSubmit(values) {
            await this.signIn(values)
        },

        ...mapActions(useAuthStore, { signIn: 'signIn'})
    }
  }
</script>