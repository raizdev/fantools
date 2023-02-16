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
                            placeholder="Postal code"
                        />
                        <TextInput
                            name="house_number"
                            type="number"
                            class="form-control"
                            placeholder="House number"
                            rules="required"
                        />
                        <TextInput
                            name="house_number_extension"
                            class="form-control"
                            placeholder="House number extension"
                            type="number"
                        />
                        </b-input-group>
                </b-card-body>
                <b-card-footer class="p-0 m-0">
                    <Button variant="success" :isSubmitting="isSubmitting" :text="$t('button.search')"></Button>
                </b-card-footer>
            </b-card>
        </Form>

        <b-card no-body class="border-0 p-2 speedchecker-content" v-if="responseData">
            <template #header>
                    <CardHeader
                        :title="$t('speedchecker.fiber_info')"
                    >
                    </CardHeader>
                </template>
                <b-tabs card>
                <b-tab title="Fiber Info" active>
                    <b-card-text>
                        <table class="table" style="width: 550px">
                            <tr>
                                <td>Netwerk leverancier</td>
                                <td>{{ this.responseData.fiber_info.thirdparty_name }}</td>
                            </tr>
                            <tr>
                                <td>Derde netwerk</td>
                                <td>{{ this.responseData.fiber_info.thirdparty_delivery ? 'Ja' : 'Nee' }}</td>
                            </tr>
                            <tr>
                                <td>NL type</td>
                                <td>{{ this.responseData.fiber_info.nl_type }}</td>
                            </tr>
                            <tr>
                                <td>Gebouw type</td>
                                <td>{{ this.responseData.fiber_info.construction_type }}</td>
                            </tr>
                            <tr>
                                <td>Toelichting HAS</td>
                                <td>{{ this.responseData.fiber_info.reason_not_connected ? this.responseData.fiber_info.reason_not_connected : 'Geen bijzonderheden' }}</td>
                            </tr>
                            <tr>
                                <td>HAS plandatum</td>
                                <td>{{ this.responseData.fiber_info.planned_fiber_to_the_home_date }}</td>
                            </tr>
                            <tr>
                                <td>Civiel datum</td>
                                <td>{{ this.responseData.fiber_info.civil_date }}</td>
                            </tr>
                            <tr>
                                <td>Oplever datum</td>
                                <td>{{ this.responseData.fiber_info.delivery_date }}</td>
                            </tr>
                            <tr>
                                <td>WBA openstelling</td>
                                <td>{{ this.responseData.fiber_info.wholesale_broadband_access_plan_date_description ? 'Open' : this.responseData.fiber_info.wholesale_broadband_access_plan_date }}</td>
                            </tr>
                            <tr>
                                <td>Doe het zelf</td>
                                <td>{{ this.responseData.fiber_info.sp_diy_allowed ? 'Nee' : 'Ja' }}</td>
                            </tr>
                            <tr>
                                <td>Eigen bijdragen verplicht</td>
                                <td>{{ this.responseData.fiber_info.connection_fee ? 'Ja' : 'Nee' }}</td>
                            </tr>
                        </table>

                        <span v-for="(item, index) in this.technologyFilter('FIBER')" style="font-size: 14px; color: #000">
                            Maximaal leverbaar: {{ item.download }}/{{ item.upload }} mbps
                        </span>
                    </b-card-text>
                </b-tab>
                <b-tab title="Copper Info">
                    <b-card-text>
                        {{ this.responseData.copper_info }}
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
                    text: this.$i18n.t('tiles.speedchecker.title'),
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