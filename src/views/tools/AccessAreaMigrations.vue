<template>
    <div>
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
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">DSLAM</th>
                    <th scope="col">Old AccessArea</th>
                    <th scope="col">New AccessArea</th>
                    <th scope="col">Mig type</th>
                    <th scope="col">Plandate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">{{ this.items.dslam }}</th>
                    <td>{{ this.items.old_aa }}</td>
                    <td>{{ this.items.new_aa }}</td>
                    <td>{{ this.items.mig_type }}</td>
                    <td>{{ this.items.plandate }}</td>
                    </tr>
                </tbody>
                </table>
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
            fields: ['dslam', 'old_aa', 'new_aa', 'plandate', 'mig_type'],
            items: null
        }
    },

    components: {
        CardHeader,
        TextInput,
        Form,
        Button
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