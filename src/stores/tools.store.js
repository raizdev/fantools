import { defineStore } from 'pinia';
import { db } from '@/includes/pocketbase';
import axios from 'axios';

export const useToolsStore = defineStore({
    id: 'tools',
    state: () => ({
        contractors: null,
        contractor: null,
        recipients: null,
        migrations: null
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

        async accessareaMigration () {

            const response = await db.collection('migrations').getFullList(500, {
                sort: 'dslam'
            });
            
            this.migrations = response
         },

        async transportInstances (values) {
            const response = await db.collection('transport').getList(1, 100, {
                filter: `wso = "${values.wso}" && accessarea = "AA/${values.accessarea}"`,
                sort: 'wap_vlan'
            });
            
            return response.items
        },

        async kpnNetwerkDetails (values) {
            const response = axios.post('https://kpn.fatools.site/kpnnetwerk/check', values)
            return response
        }
    }
});
