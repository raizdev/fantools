<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
        <Form
            @submit="onSubmit"
        >
            <b-card no-body class="border-0 p-2">
                <template #header>
                    <CardHeader
                        :title="$t('accessarea-migration.title')"
                        :description="$t('accessarea-migration.description')"
                    >
                    </CardHeader>
                </template>
                <b-card-body>
                    <TextInput
                        name="dslam"
                        type="text"
                        :placeholder="$t('accessarea-migration.placeholder.dslam')"
                        rules="required"
                    />
                </b-card-body>
                <b-card-footer class="p-0 m-0">
                    <Button variant="success" :isSubmitting="isSubmitting" :text="$t('button.search')"></Button>
                </b-card-footer>
            </b-card>
        </Form>

        <b-card no-body class="border-0 p-2" v-if="items">
            <b-table responsive striped outlined small hover fixed head-variant="dark" table-variant="light" :fields="fields" :items="items" v-if="items"></b-table>
        </b-card>
    </div>
</template>
<script>
import { Form, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { mapActions } from 'pinia';
import { useToolsStore } from '@/stores';

import Button from '@/components/Input/Button.vue';
import CardHeader from '@/components/Card/CardHeader.vue';
import TextInput from '@/components/Input/TextInput.vue';

defineRule('required', required);

export default {

    data() {
        return {
            fields: ['dslam', 'old', 'new', 'plandate', 'type'],
            items: null
        }
    },

    components: {
        CardHeader,
        TextInput,
        Form,
        Button
    },

    computed: {
        breadcrumbs() {
            return [
                {
                    text: 'Home',
                    to: { name: 'home' }
                },
                {
                    text: this.$i18n.t('tiles.accessarea.title'),
                    active: true
                }
            ]
        }
    },

    methods: {
        ...mapActions(
            useToolsStore, { 
                accessareaMigration: 'accessareaMigration'
        }),

        async onSubmit(values) {
            this.items = await this.accessareaMigration(values)
        }
    }
}
</script>