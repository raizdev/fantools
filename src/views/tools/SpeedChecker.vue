<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
        <Form
            @submit="onSubmit"
            v-slot="{ isSubmitting }"
        >
            <b-card no-body class="border-0 p-2">
                <template #header>
                    <CardHeader
                        :title="$t('speedchecker.title')"
                    >
                    </CardHeader>
                </template>
                <b-card-body>
                    <b-input-group>
                        <TextInput
                            name="zip_code"
                            type="text"
                            rules="required"
                            class="form-control"
                            :placeholder="$t('speedchecker.placeholder.zip_code')"
                        />
                        <TextInput
                            name="house_number"
                            type="number"
                            class="form-control"
                            :placeholder="$t('speedchecker.placeholder.house_number')"
                            rules="required"
                        />
                        <TextInput
                            name="house_number_extension"
                            class="form-control"
                            :placeholder="$t('speedchecker.placeholder.house_number_extension')"
                            type="text"
                        />
                        </b-input-group>
                </b-card-body>
                <b-card-footer class="p-0 m-0">
                    <Button variant="success" :isSubmitting="isSubmitting" :text="$t('button.search')"></Button>
                </b-card-footer>
            </b-card>
        </Form>

        <b-card no-body class="border-0 p-2 speedchecker-content" v-if="this.responseData">
            <template #header>
                    <CardHeader
                        :title="$t('speedchecker.title')"
                    >
                    </CardHeader>
                </template>
                <b-tabs card>
                <b-tab :title="$t('speedchecker.fiber_info.title')" active>
                    <b-card-text>
                        <table class="table" style="width: 550px">
                            <tr>
                                <td>{{ $t('speedchecker.fiber_info.thirdparty_name') }}</td>
                                <td>{{ this.responseData.fiber_info.thirdparty_name }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('speedchecker.fiber_info.thirdparty_delivery') }}</td>
                                <td>{{ this.responseData.fiber_info.thirdparty_delivery ? 'Ja' : 'Nee' }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('speedchecker.fiber_info.nl_type') }}</td>
                                <td>{{ this.responseData.fiber_info.nl_type }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('speedchecker.fiber_info.construction_type') }}</td>
                                <td>{{ this.responseData.fiber_info.construction_type }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('speedchecker.fiber_info.reason_not_connected') }}</td>
                                <td>{{ this.responseData.fiber_info.reason_not_connected ? this.responseData.fiber_info.reason_not_connected : $t('speedchecker.fiber_info.not_connected_fine') }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('speedchecker.fiber_info.planned_fiber_to_the_home_date') }}</td>
                                <td>{{ this.responseData.fiber_info.planned_fiber_to_the_home_date }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('speedchecker.fiber_info.civil_date') }}</td>
                                <td>{{ this.responseData.fiber_info.civil_date }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('speedchecker.fiber_info.delivery_date') }}</td>
                                <td>{{ this.responseData.fiber_info.delivery_date }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('speedchecker.fiber_info.wholesale_broadband_access_plan_date_description') }}</td>
                                <td>{{ this.responseData.fiber_info.wholesale_broadband_access_plan_date_description ? $t('speedchecker.fiber_info.open') : this.responseData.fiber_info.wholesale_broadband_access_plan_date }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('speedchecker.fiber_info.sp_diy_allowed') }}</td>
                                <td>{{ this.responseData.fiber_info.sp_diy_allowed ? $t('speedchecker.fiber_info.no') : $t('speedchecker.fiber_info.yes') }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('speedchecker.fiber_info.connection_fee') }}</td>
                                <td>{{ this.responseData.fiber_info.connection_fee ? $t('speedchecker.fiber_info.yes') : $t('speedchecker.fiber_info.no') }}</td>
                            </tr>
                        </table>

                        <span v-for="(item, index) in this.technologyFilter('FIBER')" style="font-size: 14px; color: #000">
                            {{ $t('speedchecker.fiber_info.maximum_speed') }} {{ item.download }}/{{ item.upload }} mbps
                        </span>
                    </b-card-text>
                </b-tab>
                <b-tab title="Copper Info" v-if="this.responseData.fixed_info.copper_access">
                    <b-card-text>
                        <span v-for="(item, index) in this.technologyFilter('COPPER')" style="font-size: 14px; color: #000">
                            {{ $t('speedchecker.fiber_info.maximum_speed') }}  {{ item.download }}/{{ item.upload }} mbps
                        </span>
                    </b-card-text>
                </b-tab>
                </b-tabs>
        </b-card>
    </div>
</template>
<script>
import { Form, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { mapActions } from 'pinia'
import { useToolsStore } from '@/stores'

import Button from '@/Components/Input/Button.vue';
import CardHeader from '@/components/Card/CardHeader.vue';
import TextInput from "@/components/Input/TextInput.vue";

defineRule('required', required);

export default {
    name: 'Grabber',

    data() {
        return {
            token_secret: import.meta.env.VITE_TOKEN_SECRET,
            responseData: ''
        }
    },

    components: {
        Form,
        TextInput,
        CardHeader,
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
                    text: this.$i18n.t('speedchecker.title'),
                    active: true
                }
            ]
        }
    },

    methods: {
        ...mapActions(
            useToolsStore, { 
                kpnNetwerkDetails: 'kpnNetwerkDetails'
            }
        ),

        technologyFilter(value) {
            return this.responseData.available_on_address.technologies.filter(technology => technology.name == value)
        },  

        async onSubmit(values) {

            const data = {
                zip_code: values.zip_code,
                house_number: values.house_number,
                house_number_extension: values.house_number_extension || '',
                token_secret: this.token_secret
            }

            const result = await this.kpnNetwerkDetails(data)
            this.responseData = result.data.data.response
        }
    }
}
</script>