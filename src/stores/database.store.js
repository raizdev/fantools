import { defineStore } from 'pinia';
import { db } from '@/includes/pocketbase';

export const useDatabaseStore = defineStore({
    id: 'database',
    state: () => ({
    }),
    getters: {
    },
    actions: {
        async update (values, recordId, collection) {
            return await db.collection(collection).update(recordId, values)
        },
        
        async delete (recordId, collection) {
            return await db.collection(collection).delete(recordId)
        },

        async create (values, collection) {
            return await db.collection(collection).create(values)
        }
    }
});
