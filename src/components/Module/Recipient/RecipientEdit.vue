<template>
    <div class="container-lg p-4" v-if="!selectedContractor">
        <b-card no-body class="border-0 p-2">
            <template #header>
                <div class="d-flex justify-content-between">
                    <div>
                        <CardHeader
                        title="Recipients"
                        >
                        </CardHeader>
                    </div>
                    <div>
                        <span @click="createRecipient(0)">
                            <FontAwesomeIcon
                                icon="fa-solid fa-plus"
                                size="1x"
                            />
                        </span>
                    </div>
                </div>
            </template>
            <b-card-body>
                <b-row>
                    <b-col lg="6" class="my-1">
                        <b-form-group
                        label="Filter"
                        label-for="filter-input"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        class="mb-0"
                        >
                        <b-input-group size="sm">
                            <b-form-input
                                id="filter-input"
                                v-model="filter"
                                type="search"
                                placeholder="Type to Search"
                                ></b-form-input>
                        </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-table
                    :fields="fields"
                    :items="this.recipients"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    :filter-included-fields="filterOn"
                    stacked="md"
                    show-empty
                    small
                    @filtered="onFiltered"
                    responsive striped outlined hover fixed head-variant="dark" table-variant="light"
                    >

                    <template #cell(actions)="row">
                        <span @click="editRecipient(row.item.id)">
                            <FontAwesomeIcon
                                icon="fa-solid fa-pen-to-square"
                                size="1x"
                            />
                        </span>
                        <span @click="deleteRecipient(row.item)" style="margin-left: 10px !important">
                            <FontAwesomeIcon
                                icon="fa-solid fa-trash"
                                size="1x"
                            />
                        </span>
                    </template>
                </b-table>
                <b-col sm="7" md="6" class="my-1">
                        <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        align="fill"
                        size="sm"
                        class="my-0"
                        ></b-pagination>
                    </b-col>
            </b-card-body>
        </b-card>
    </div>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useToolsStore } from '@/stores'

import CardHeader from '@/Components/Card/CardHeader.vue';
import FontAwesomeIcon from '@/Components/Icon/FontAwesomeIcon.vue';
import EditRecipientComponent from '@/Components/Modal/EditRecipientComponent.vue';
import CreateRecipientComponent from '@/Components/Modal/CreateRecipientComponent.vue';

export default {
    data() {
        return {
            fields: [{
                key: 'name',
                thStyle: { width: "25%" }
            },{
                key: 'email',
                thStyle: { width: "40%" }
            },{
                key: 'telephone',
                thStyle: { width: "25%" }
            },{ 
                key: 'actions', 
                label: 'Actions' 
            }],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
            filter: null,
            filterOn: [],
        }
    },

    components: {
        CardHeader,
        FontAwesomeIcon,
        EditRecipientComponent,
        CreateRecipientComponent
    },

    computed: {
        ...mapState(
            useToolsStore, { 
                recipients: 'recipients',
                recipientById: 'recipientById'
            }
        )
    },

    methods: {
        ...mapActions(
            useToolsStore, { 
                getAllRecipients: 'getAllRecipients',
                modifyRecipient: 'modifyRecipient'
            }
        ),

        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },

        editRecipient(recipientId) {
            this.$vbsModal.open({
                content: EditRecipientComponent,
                contentProps: {
                    recipients: this.recipientById(recipientId)[0]
                },
                contentEmits: {
                    onUpdate: this.updateRecipient,
                }
            });
        },

        createRecipient(recipientId) {
            this.$vbsModal.open({
                content: CreateRecipientComponent,
                contentEmits: {
                    onUpdate: this.updateRecipient,
                }
            });
        },

        updateRecipient(newValue) {
            this.modifyRecipient(newValue).then((result) => {
                this.getAllRecipients()
                this.$vbsModal.close();
            })
        },

        deleteRecipient(recipient) {
            this.$vbsModal.confirm({
                message: "Are you sure you want to delete " + recipient.name + "?",
                title: "Delete Recipient",
                icon: null
            })
            .then((confirmed) => {
                if (confirmed) {
                    this.delete(recipient.id);
                    this.getAllRecipients()
                }
            });
        }
    },

    created() {
        this.getAllRecipients().then(() => {
            this.totalRows = this.recipients.length
        })
    },
}
 </script>