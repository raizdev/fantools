<template>
    <b-card no-body class="border-0 p-2">
        <template #header>
            <div class="d-flex justify-content-between">
                <CardHeader title="Import CSV to Accessarea Migrations"> </CardHeader>
            </div>
        </template>
        <b-card-body>
            <div class="mb-3">
                <input
                    class="form-control"
                    type="file"
                    accept=".csv"
                    v-on:change="onFileChange"
                />
            </div>
            <b-progress :value="loadedState" max="100" variant="success" show-progress striped :animated="animate" v-if="loadedState > 0 && loadedState != 100"></b-progress>

            <template v-if="loadedState == 100">
                {{ this.file.name }} is uplaoded
            </template>

        </b-card-body>
        <b-card-footer class="p-0 m-0" v-if="parsed || loadedState == 100">
            <Form
                @submit="onSubmit"
                v-slot="{ isSubmitting }"
            >
                <Button variant="success" :isSubmitting="isSubmitting" text="Submit"></Button>
            </Form>
        </b-card-footer>
    </b-card>
</template>
<script>
import { Form } from 'vee-validate';
import { mapActions, mapWritableState } from 'pinia';
import { useDatabaseStore, useNotificationStore } from '@/stores';

import Papa from 'papaparse';
import CardHeader from '@/components/Card/CardHeader.vue';
import Button from '@/Components/Input/Button.vue';


export default {
    data() {
        return {
            animate: true,
            file: '',
            content: [],
            migrations: [],
            parsed: false,
            loadedState: 0
        }
    },

    components: {
        CardHeader,
        Button,
        Form
    },

    computed: {
        ...mapWritableState(useNotificationStore, { 
            addNotification: 'notifications'
        }),
    },

    methods: {

        ...mapActions(useDatabaseStore, { 
            create: 'create',
            fullList: 'fullList',
            firstItem: 'firstItem'
        }),
        

        async onFileChange(e) {

            this.file = e.target.files[0];

            const ifAlreadyUploaded = await this.firstItem('migration_files', `file = "${this.file.name}"`);

            if(ifAlreadyUploaded.items?.length > 0) {
                return this.addNotification.push({ text: 'This file is already been uploaded earlier!', type: 'error'})
            }

            this.parseFile();
        },

        parseFile(){
            Papa.parse(this.file, {
                header: true,
                skipEmptyLines: true,
                complete: function( results ){
                    this.content = results;
                    this.parsed = true;
                }.bind(this)
            });
        },

        async onSubmit() {

            const response = await this.fullList('migrations');
            
            const exstingDslams = response.map(item => {
                return item.dslam
            })
            
            let filesProgressed = 0;

            for await (let element of this.content.data) {

                if(exstingDslams.includes(element.Dslam)) {
                    return;
                }

                if(filesProgressed%10 === 0) {
                    setTimeout(1000)
                }

                await this.create({
                    dslam: element.Dslam,
                    old: element.AA_oud,
                    new: element.AA_nieuw,
                    plandate: element.Plandatum,
                    type: element.Type_Migratie
                }, 'migrations');

                filesProgressed++;
                this.loadedState = filesProgressed / this.content.data.length * 100;
                this.parsed = false;
            }

            await this.create({
                file: this.file.name,
                finished: true
            }, 'migration_files');

            return this.addNotification.push({ text: 'Migrations successfully uploaded!', type: 'success'})
        }
    },
}
</script>
