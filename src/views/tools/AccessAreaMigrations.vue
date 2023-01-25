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
                        placeholder="DSLAM"
                        rules="required"
                    />
                </b-card-body>
                <b-card-footer class="p-0 m-0">
                    <b-button variant="success" class="w-100" type="submit">{{ $t('button.search') }}</b-button>
                </b-card-footer>
            </b-card>
        </Form>

        <b-card no-body class="border-0 p-2" v-if="data">
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
            data: null
        }
    },

    components: {
        CardHeader,
        TextInput,
        Form
    },

    methods: {
        ...mapActions({
            accessareaMigration: 'tools/accessareaMigration'
        }),
    
        onSubmit: function (values) {
            this.accessareaMigration(values).then((result) => {
                this.data = result
            })
        }
    }
}
</script>