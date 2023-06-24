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
            return await db.collection(collection).create(values, {
                "$autoCancel": false,
            })
        },

        async firstItem (collection, filter) {
            return await db.collection(collection).getList(1, 1, {
                filter: filter
            });
        },

        async fullList (collection) {
            return await db.collection(collection).getFullList()
        },

        async getDuplicatedRows(rows) {

            let dslams = rows.data.map(v => v.Dslam)

            const filter = dslams.map((id) => `dslam="${id}"`).join("||");

            const records = await db.collection("migrations_duplicate").getFullList({ filter });
            console.log(records)
        }
    }
});
