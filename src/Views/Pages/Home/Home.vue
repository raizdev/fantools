<template>
    <div>
        <CardTile
            :title="$t('tiles.accessarea.title')"
            :description="$t('tiles.accessarea.description')"
            icon="fa-solid fa-database"
            link="accessarea-migration"
        />
        <CardTile
            :title="$t('tiles.transport.title')"
            :description="$t('tiles.transport.description')"
            link="transport-instance"
            icon="fa-solid fa-window-restore"
            />
        <CardTile
            :title="$t('tiles.grabber.title')"
            :description="$t('tiles.grabber.description')"
            icon="fa-solid fa-recycle"
            />
        <CardTile
            :title="$t('tiles.contractor.title')"
            :description="$t('tiles.contractor.description')"
            icon="fa-regular fa-address-book"
            link="contractor-details"
            v-role="'escalatiedesk-view'"
        />
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import CardTile from '../../../Components/Card/CardTile.vue'

export default {
    name: 'Home',

    components: {
        CardTile
    },

    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
        })
    }
}
</script>