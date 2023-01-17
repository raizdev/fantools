<template>
    <div>
        <CardTile
            :title="$t('tiles.accessarea.title')"
            :description="$t('tiles.accessarea.description')"
            icon="fa-solid fa-database"
            link="accessarea-migration"
            flip-v
        />
        <CardTile
            :title="$t('tiles.transport.title')"
            :description="$t('tiles.transport.description')"
            icon="sign-merge-right"
            link="transport-instance"
            />
        <CardTile
            :title="$t('tiles.grabber.title')"
            :description="$t('tiles.grabber.description')"
            icon="clipboard2-data-fill"
            />
        <CardTile
            :title="$t('tiles.contractor.title')"
            :description="$t('tiles.contractor.description')"
            icon="person-lines-fill"
            link="contractor-details"
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
            authenticated: 'auth/authenticated'
        })
    }
}
</script>