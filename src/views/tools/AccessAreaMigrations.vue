<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
        <Form
            @submit="onSubmit"
        >
            <b-card no-body class="border-0 p-2">
                <template #header>
                    <CardHeader
                        :title="$t('accessarea-migration.title')"
                        :description="$t('accessarea-migration.description')"
                    >
                    </CardHeader>
                </template>
                <b-card-body>
                    <vSelect :options="paginated" :filterable="false" @open="onOpen" @close="onClose" @search="(query) => (search = query)" :placeholder="$t('accessarea-migration.placeholder.dslam')" label="dslam" v-model="selectedDslam">
                        <template #list-footer>
                        <li v-show="hasNextPage" ref="load" class="loader">
                            Loading more options...
                        </li>
                        </template>
                    </vSelect>
                </b-card-body>
                <b-card-footer class="p-0 m-0">
                    <Button variant="success" :isSubmitting="isSubmitting" :text="$t('button.search')"></Button>
                </b-card-footer>
            </b-card>
        </Form>

        <b-card no-body class="border-0" v-if="items">
            <b-table responsive striped outlined small hover fixed head-variant="dark" table-variant="light" :fields="fields" :items="items" v-if="items"></b-table>
        </b-card>
    </div>
</template>
<script>
import { Form, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { mapActions, mapState } from 'pinia';
import { useToolsStore } from '@/stores';

import Button from '@/components/Input/Button.vue';
import CardHeader from '@/components/Card/CardHeader.vue';
import TextInput from '@/components/Input/TextInput.vue';

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

defineRule('required', required);

export default {

    data() {
        return {
            fields: ['dslam', 'old', 'new', 'plandate', 'type'],
            items: null,
            observer: null,
            limit: 10,
            search: '',
            selectedDslam: null
        }
    },

    components: {
        CardHeader,
        TextInput,
        Form,
        Button,
        vSelect
    },

    created() {
        this.accessareaMigration()
    },

    mounted() {
        this.observer = new IntersectionObserver(this.infiniteScroll)
    },

    computed: {
        breadcrumbs() {
            return [
                {
                    text: 'Home',
                    to: { name: 'home' }
                },
                {
                    text: this.$i18n.t('tiles.accessarea.title'),
                    active: true
                }
            ]
        },

        filtered() {
            return this.migrations.filter((items) => items.dslam.includes(this.search))
        },

        paginated() {
            return this.filtered.slice(0, this.limit)
        },

        hasNextPage() {
            return this.paginated.length < this.filtered.length
        },

        ...mapState(
            useToolsStore, {
                migrations: 'migrations'
            }
        ),
    },

    methods: {
        ...mapActions(
            useToolsStore, { 
                accessareaMigration: 'accessareaMigration'
        }),

        onSubmit() {
            this.items = this.migrations.filter(item => item.id === this.selectedDslam.id)
        },

        async onOpen() {
            if (this.hasNextPage) {
                await this.$nextTick()
                this.observer.observe(this.$refs.load)
            }
        },

        onClose() {
            this.observer.disconnect()
        },

        async infiniteScroll([{ isIntersecting, target }]) {
            if (isIntersecting) {
                const ul = target.offsetParent
                const scrollTop = target.offsetParent.scrollTop
                this.limit += 10
                await this.$nextTick()
                ul.scrollTop = scrollTop
            }
        },
    }
}
</script>