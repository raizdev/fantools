import { defineStore } from 'pinia';

import api from "@/Common/Helpers/Api";

export const useToolsStore = defineStore({
    id: 'tools',
    state: () => ({
        recipients: null,
        contractors: null
    }),
    getters: {
        recipientByType: (state) => (type) => {
            return state.recipients.filter(recipient => recipient.slm == type)
        },
        contractorById: (state) => (id) => {
            return state.contractor.filter(contractor => contractor.id == id)
        }
    },
    actions: {

        async getContractors(values) {
            const response = await api.get('tools/contractor/list/' + values)
            return response
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
