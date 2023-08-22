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
                        class="mb-2"
                    />
                    <router-link :to="{ name: 'change-password'}" style="text-align: right">
                        <p class="text-right" style="font-size: 14px">{{ $t('auth.passwordlost') }}</p>
                    </router-link>
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
import Button from '@/components/Input/Button.vue';

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
            const result = await this.signIn(values)
            if(result) {
                this.$router.push({ name: 'home' })
            }
        },

        ...mapActions(useAuthStore, { signIn: 'signIn'})
    }
  }
</script>