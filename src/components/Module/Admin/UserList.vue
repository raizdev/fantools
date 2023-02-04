<template>
    <div class="container-lg p-4">
        <b-card no-body class="border-0 p-2">
            <template #header>
                <div class="d-flex justify-content-between">
                    <div>
                        <CardHeader
                            :title="$t('admin.userlist.pending.title')"
                            :description="$t('admin.userlist.pending.description')"
                        >
                        </CardHeader>
                    </div>
                </div>
            </template>
            <b-card-body>
                <b-table
                    :fields="fieldsPending"
                    :items="this.activatedUsers(0)"
                    stacked="md"
                    show-empty
                    small
                    responsive striped outlined hover fixed head-variant="dark" table-variant="light"
                >
                    <template #cell(actions)="row">
                        <span @click="modifyPendingUser(row.item)">
                            <FontAwesomeIcon
                                icon="fa-solid fa-user-plus"
                                size="1x"
                            />
                        </span>
                        <span style="margin-left: 10px !important">
                            <FontAwesomeIcon
                                icon="fa-solid fa-trash-can"
                                size="1x"
                            />
                        </span>
                    </template>
                </b-table>
            </b-card-body>
        </b-card>
        <b-card no-body class="border-0 p-2">
            <template #header>
                <div class="d-flex justify-content-between">
                    <div>
                        <CardHeader
                            :title="$t('admin.userlist.current.title')"
                            :description="$t('admin.userlist.current.description')"
                        >
                        </CardHeader>
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
                    :fields="fieldsCurrent"
                    :items="this.allUsers"
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
                    <template #cell(last_login)="row">
                        {{ convertLastLogin(row.item.last_login) }}
                    </template>

                    <template #cell(actions)="row">
                        <span @click="modifyUser(row.item)">
                            <FontAwesomeIcon
                                icon="fa-solid fa-user-plus"
                                size="1x"
                            />
                        </span>
                        <span style="margin-left: 10px !important">
                            <FontAwesomeIcon
                                icon="fa-solid fa-trash-can"
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
import { useUsersStore } from '@/stores'
import ModifyPendingUserComponent from '@/components/Modal/Admin/ModifyPendingUserComponent.vue'
import ModifyUserComponent from '@/components/Modal/Admin/ModifyUserComponent.vue'
import CardHeader from '@/components/Card/CardHeader.vue';
import FontAwesomeIcon from '@/components/Icon/FontAwesomeIcon.vue';
import moment from 'moment'

export default {

    props: {
        users: Object
    },  

    data() {
        return {
            fieldsPending: [{
                key: 'username',
                label: 'Ruisnaam',
                thStyle: { width: "25%" }
            },{
                key: 'mail',
                thStyle: { width: "62%" }
            },{
                key: 'actions', 
                label: 'Actions' 
            }],
            fieldsCurrent: [{
                key: 'username',
                label: 'Ruisnaam',
                thStyle: { width: "15%" }
            },{
                key: 'mail',
                thStyle: { width: "40%" }
            },{
                key: 'last_login',
                thStyle: { width: "32%" }
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
        ModifyPendingUserComponent,
        ModifyUserComponent,
        moment
    },  

    computed: {
        ...mapState(
            useUsersStore, {
            activatedUsers: 'activatedUsers',
            allUsers: 'users',
            getUserById: 'getUserById',
        })
   },

    methods: {
        ...mapActions(
            useUsersStore, { 
            getUsers: 'userList'
        }),
 
        convertLastLogin(value) {
            if(value === null) {
                return 'not logged in'
            }
            var timestamp = moment.unix(value);
            return timestamp.format("d MMMM YYYY")
        },

        async modifyPendingUser(user) {
            this.$vbsModal.open({
                content: ModifyPendingUserComponent,
                contentProps: {
                    user: user
                },
                contentEmits: {
                    onUpdate: this.modifyPendingUser,
                }
            });
        },

        async modifyUser(user) {
            this.$vbsModal.open({
                content: ModifyUserComponent,
                contentProps: {
                    user: user
                },
                contentEmits: {
                    onUpdate: this.modifyPendingUser,
                }
            });
        },
        
        async modifyPendingUser() {
            this.getUsersAndRoles();
            this.$vbsModal.close();
        },

        getUsersAndRoles() {
            this.getUsers().then(() => {
                this.totalRows = this.users.length
            })


        }
   },

   created() {
        this.getUsersAndRoles();
    }
}
</script>