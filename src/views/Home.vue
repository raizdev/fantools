<template>
    <div>
        <CardTile
            :title="$t('tiles.accessarea.title')"
            :description="$t('tiles.accessarea.description')"
            icon="fa-solid fa-database"
            link="accessarea-migrations"
        />
        <CardTile
            :title="$t('tiles.transport.title')"
            :description="$t('tiles.transport.description')"
            icon="fa-solid fa-window-restore"
            link="transport-instance"
        />
        <CardTile
            :title="$t('tiles.grabber.title')"
            :description="$t('tiles.grabber.description')"
            icon="fa-solid fa-recycle"
            link="grabber"
        />
        <CardTile
            :title="$t('tiles.broadband_checker.title')"
            :description="$t('tiles.broadband_checker.description')"
            icon="fa-solid fa-wifi"
            link="speed-checker"
        />
    </div>
</template>
<script>
import CardTile from '@/components/Card/CardTile.vue'

export default {

    name: 'Home',

    components: {
        CardTile
    }
}
</script>
