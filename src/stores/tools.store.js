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
        recipientById: (state) => (value) => {
            return state.recipients.filter(recipient => recipient.id == value)
        },
        getContractorByName: (state) => (value) => {
            return state.contractor.filter((contractor => contractor.slug.toLowerCase().includes(value)))
        }
    },
    actions: {

        clearRecipients() {
            this.contractorRecipients = null
        },

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

        async getAllRecipientByContractor(recipientId) {
            const response = await api.get('/tools/contractor/list/employee/' + recipientId)
            return response
        },
        
        async modifyContractor (values) {
            const response = await api.post('tools/contractor/modify', values)
            return response
        },

        async modifyRecipient (values) {
            const response = await api.post('tools/contractor/recipient/modify', values)
            return response
        },
    }
});
