<template>
    <div>
        <Form
            @submit="onSubmit"
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
                        placeholder="WSO"
                        rules="required"
                    />
                    <TextInput
                        name="accessarea"
                        type="text"
                        placeholder="AA/"
                        rules="required"
                    />
                </b-card-body>
                <b-card-footer class="p-0 m-0">
                    <b-button variant="success" class="w-100" type="submit">{{ $t('button.search') }}</b-button>
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
import { mapActions } from "vuex";

import CardHeader from '@/Components/Card/CardHeader.vue';
import TextInput from '@/Components/Input/TextInput.vue';

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
        Form
    },

    methods: {
        ...mapActions({
            transportInstances: 'tools/transportInstances'
        }),
    
        onSubmit: function (values) {
            this.transportInstances(values).then((result) => {
                this.items = result
            })
        }
    }
}
</script>