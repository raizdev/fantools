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
                        <FontAwesomeIcon
                            icon="fa-solid fa-plus"
                            size="1x"
                        />
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
                    :items="recipient"
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
                        <a href="#" @click="editRecipient(row.item.id)">
                        <FontAwesomeIcon
                            icon="fa-solid fa-pen-to-square"
                            size="1x"
                        />
                        </a>
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
import { mapActions } from "vuex";
import { ModalSize } from "vue-bs-modal";

import CardHeader from '@/Components/Card/CardHeader.vue';
import FontAwesomeIcon from '@/Components/Icon/FontAwesomeIcon.vue';
import EditRecipientComponent from '@/Components/Modal/EditRecipientComponent.vue';

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
        recipient: []
        }
    },

    components: {
        CardHeader,
        FontAwesomeIcon,
        EditRecipientComponent
    },

    methods: {
        ...mapActions({
            findServiceLevelmangers: 'tools/findServiceLevelmangers',
            modifyRecipient: 'tools/modifyRecipient'
        }),

        onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
        },

        editRecipient(recipientId) {
            this.$vbsModal.open({
            content: EditRecipientComponent,
            size: ModalSize.LARGE,
            contentProps: {
                recipient: this.recipient.filter(recipient => recipient.id == recipientId)[0]
            },
            contentEmits: {
                onUpdate: this.updateRecipient,
            }
            });
        },

        updateRecipient(newValue) {
            this.modifyRecipient(newValue).then((result) => {
            console.log('ok')
            })
        }
    },

    mounted() {
        this.findServiceLevelmangers(0).then((result) => {
        this.totalRows = result.length
        this.recipient = result
        })
    }
}
 </script>