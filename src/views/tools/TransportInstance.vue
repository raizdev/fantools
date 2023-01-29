<template>
    <div>
        <Form
            @submit="onSubmit"
            v-slot="{ isSubmitting }"
        >
            <b-card no-body class="border-0 p-2">
                <template #header>
                    <CardHeader
                        :title="$t('transport-instance.title')"
                        :description="$t('transport-instance.description')"
                    >
                    </CardHeader>
                </template>
                <b-card-body>
                    <TextInput
                        name="wso"
                        type="text"
                        :placeholder="$t('transport-instance.placeholder.wso')"
                        rules="required"
                        class="mb-2"
                    />
                    <TextInput
                        name="accessarea"
                        type="text"
                        :placeholder="$t('transport-instance.placeholder.accessarea')"
                        rules="required"
                    />
                </b-card-body>
                <b-card-footer class="p-0 m-0">
                    <Button variant="success" :isSubmitting="isSubmitting" :text="$t('button.search')"></Button>
                </b-card-footer>
            </b-card>
        </Form>

        <b-card no-body class="border-0 p-2" v-if="items">
            <b-table outlined small hover fixed no-border-collapse :fields="fields" :items="items">
                <template #cell(wap_area)="data">
                    {{ data.value.split("WA-DSLW/").join("WA-") }}
                </template>
            </b-table>
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
            fields: ['transport_instance', 'wap_vlan', 'wap_area', 'bandwidth_up', 'bandwidth_down'],
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
                transportInstances: 'transportInstances'
        }),

        async onSubmit(values) {
            this.items = await this.transportInstances(values)
        }
    }
}
</script>