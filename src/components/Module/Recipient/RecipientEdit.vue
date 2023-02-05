<template>
    <div class="container-lg p-4" v-if="!selectedContractor">
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
        <b-card no-body class="border-0 p-2">
            <template #header>
                <div class="d-flex justify-content-between">
                    <div>
                        <CardHeader
                        :title="$t('contractor.recipient.recipient')"
                        >
                        </CardHeader>
                    </div>
                    <div>
                        <span @click="createRecipient(0)" v-role:any="'super-admin|escalationdesk-edit'">
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
                                ></b-form-input>
                        </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-table
                    :fields="fields"
                    :items="this.recipients.items"
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
                    
                    <template #cell(email)="email">
                        <span v-clipboard="email.item.email" @click="notifyClipboard(email)" style="cursor: pointer !important" v-if="email.item.email">
                        <FontAwesomeIcon 
                           icon="fa-regular fa-clipboard"
                           size="1x"
                           variant="dark"
                        />
                        {{ email.item.email }}
                     </span>
                    </template>

                    <template #cell(telephone)="telephone">
                        <span v-clipboard="telephone.item.telephone" @click="notifyClipboard(telephone)" style="cursor: pointer !important" v-if="telephone.item.telephone">
                        <FontAwesomeIcon 
                           icon="fa-regular fa-clipboard"
                           size="1x"
                           variant="dark"
                        />
                        {{ telephone.item.telephone }}
                     </span>
                    </template>

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
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useToolsStore, useNotificationStore, useDatabaseStore } from '@/stores'

import CardHeader from '@/Components/Card/CardHeader.vue';
import FontAwesomeIcon from '@/Components/Icon/FontAwesomeIcon.vue';
import EditRecipientComponent from '@/Components/Modal/EditRecipientComponent.vue';
import CreateRecipientComponent from '@/Components/Modal/CreateRecipientComponent.vue';

export default {

    inject: ["notyf"],
    
    data() {
        return {
            fields: [{
                key: 'name',
                label: this.$i18n.t('contractor.recipient.table.name'),
                thStyle: { width: "25%" }
            },{
                key: 'email',
                label: this.$i18n.t('contractor.recipient.table.email'),
                thStyle: { width: "40%" }
            },{
                key: 'telephone',
                label: this.$i18n.t('contractor.recipient.table.telephone'),
                thStyle: { width: "25%" }
            },{ 
                key: 'actions', 
                tdClass: (this.$zo.hasAnyRole('super-admin|escalationdesk-edit')) ? '': 'd-none',
                thClass: (this.$zo.hasAnyRole('super-admin|escalationdesk-edit')) ? '': 'd-none',
                label: this.$i18n.t('contractor.recipient.table.actions')
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
        breadcrumbs() {
            return [
                {
                    text: 'Home',
                    to: { name: 'home' }
                },
                {
                    text: 'Contractor Details',
                    to: { name: 'contractor-details' }
                }
            ]
        },
        ...mapState(
            useToolsStore, { 
                recipients: 'recipients',
                recipientByType: 'recipientByType'
            }
        ),

        ...mapWritableState(
            useNotificationStore, { 
                addNotification: 'notifications'
        }),
    },

    methods: {
        ...mapActions(
            useToolsStore, { 
                getAllRecipients: 'getAllRecipients'
            }
        ),

        ...mapActions(
            useDatabaseStore, { 
                update: 'update',
                delete: 'delete',
                create: 'create'
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
                    recipients: this.recipientByType(recipientId, 'id')[0]
                },
                contentEmits: {
                    onUpdate: this.updateRecipient,
                }
            });
        },

        createRecipient() {
            this.$vbsModal.open({
                content: CreateRecipientComponent,
                contentEmits: {
                    onUpdate: this.createdRecipient,
                }
            });
        },

        createdRecipient(values) {
            this.create(values, 'recipients').then(() => {
                this.getAllRecipients()
                this.addNotification.push({ text: this.$i18n.t('notification.updated', {name: values.name}), type: 'success'})
                this.$vbsModal.close();
            })
        },

        updateRecipient(values, recordId) {
            this.update(values, recordId, 'recipients').then(() => {
                this.getAllRecipients()
                this.addNotification.push({ text: this.$i18n.t('notification.updated', {name: values.name}), type: 'success'})
                this.$vbsModal.close();
            })
        },

        deleteRecipient(recipient) {
            this.$vbsModal.confirm({
                message: recipient.name + this.$i18n.t('contractor.recipient.delete'),
                title: this.$i18n.t('contractor.recipient.delete-recipient'),
                icon: null
            })
            .then((confirmed) => {
                if (confirmed) {
                    this.getAllRecipients()
                    this.delete(recipient.id, 'recipients');
                    this.addNotification.push({ text: this.$i18n.t('notification.deleted', {name: recipient.name}), type: 'success'})
                }
            });
        },

        notifyClipboard(type) {
            this.notyf.success(type.field.label + " " + this.$i18n.t('contractor.recipient.copied'));
        }
    },

    created() {
        this.getAllRecipients().then(() => {
            this.totalRows = this.recipients.totalItems
        })
    },
}
 </script>