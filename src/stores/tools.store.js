import { defineStore } from 'pinia';

import api from "@/Common/Helpers/Api";

export const useToolsStore = defineStore({
    id: 'tools',
    state: () => ({
        recipients: null,
        contractor: null,
        contractorRecipients: null
    }),
    getters: {
        recipientByType: (state) => (type) => {
            return state.recipients.filter(recipient => recipient.slm == type)
        },
        getContractorByName: (state) => (value) => {
            return state.contractor.filter((contractor => contractor.slug.toLowerCase().includes(value)))
        }
    },
    actions: {

        async getContractors() {
            const response = await api.get('tools/contractor/list/all')
            this.contractor = response
        },

        async getContractorRecipients (value) {
            const response = await api.get('tools/contractor/' + value)
            this.contractorRecipients = response
        },

        async getAllRecipients () {
            const response = await api.get('/tools/contractor/employee/list')
            this.recipients = response
        },

        async getRecipientByContractor (value) {

            const response = await api.get('tools/contractor/' + value.contractor + '/employee/list/' + value.searchItem)
            return response
        },
        
        async modifyContractor (values) {

            values.contractorPersons.push(values.serviceLevelManager)

            const response = await api.post('tools/contractor/modify', values)
            return response
        },
    }
});
