import { defineStore } from 'pinia';
import { db } from '@/includes/pocketbase';

export const useToolsStore = defineStore({
    id: 'tools',
    state: () => ({
        contractors: null,
        contractor: null,
        recipients: null
    }), 
    getters: {
        recipientByType: (state) => (value, type) => {
            return state.recipients.items.filter(recipient => recipient[type] == value)
        },
        contractorRecipientByType: (state) => (value, type) => {
            return state.contractor.expand.recipients.filter(recipient => recipient[type] == value)
        },
        getContractorByName: (state) => (value) => {
            return state.contractors.filter((contractor => contractor.slug.toLowerCase().includes(value)))
        }
    },
    actions: {

        async getContractors() {
            const response = await db.collection('contractors').getList();

            response.items.map(item => {
                const slug = [
                    item.name,
                    item.abbreviation
                ];

                item.slug = slug.join(', ')
            })

            this.contractors = response.items
        },

        async getContractorRecipients (value) {
            const response = await db.collection('contractors').getOne(value, {
                expand: 'recipients',
                sort: 'recipients.level'
            })

            this.contractor = response
        },

        async getAllRecipients () {
            const response = await db.collection('recipients').getList(1, 500, {
                sort: 'name'
            });

            this.recipients = response
        },

        async accessareaMigration (values) {
            const response = await db.collection('migrations').getList(1, 100, {
                filter: `dslam ~ "${values.dslam}"`
            });
            
            return response.items
         },

        async transportInstances (values) {
            const response = await db.collection('transport').getList(1, 100, {
                filter: `wso = "${values.wso}" && accessarea = "AA/${values.accessarea}"`,
                sort: 'wap_vlan'
            });
            
            return response.items
        }
    }
});
