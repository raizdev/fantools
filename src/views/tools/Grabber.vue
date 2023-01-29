<template>
    <div>
        <Form
            @submit="onSubmit"
        >
            <b-card no-body class="border-0 p-2">
                <template #header>
                    <CardHeader
                        :title="$t('grabber.title')"
                    >
                    </CardHeader>
                </template>
                <b-card-body>
                    <b-form-group
                        id="grabber"
                        label-for="grabber-1"
                        :description="$t('grabber.description')"
                    >
                        <b-form-textarea
                            id="textarea"
                            v-model="this.grabber"
                            placeholder=""
                            rows="3"
                            max-rows="6"
                        />
                    </b-form-group>
                </b-card-body>
                <b-card-footer class="p-0 m-0">
                    <b-button variant="success" class="w-100" type="submit">{{ $t('button.search') }}</b-button>
                </b-card-footer>
            </b-card>
        </Form>

        <b-card no-body class="border-0 p-2" v-if="output">
            <b-form-textarea
                id="textarea"
                v-model="this.output"
                placeholder=""
                rows="3"
                max-rows="6"
            />
        </b-card>
    </div>
</template>
<script>
import { Form, Field, defineRule } from 'vee-validate';
import CardHeader from '@/components/Card/CardHeader.vue';

export default {
    name: 'Grabber',

    data() {
        return {
            regex: /\b([A-Z]{3}[0-9]{5}|[A-Z]{3}[0-9]{10})\b/g,
            grabber: '',
            output: ''
        }
    },

    components: {
        Form,
        CardHeader
    },

    methods: {
        onSubmit() {
            const matches = this.grabber.match(this.regex)
            let withoutDuplicates = matches.filter((item, index) => matches.indexOf(item) === index);
            this.output = withoutDuplicates.join(';');
        }
    }
}
</script>