<template>
    <router-link :to="{ name: link }" class="card card-tile flex-row flex-wrap border-0 shadow-sm p-3 mb-3 bg-white rounded">
        <div class="card-header border-0">
            <FontAwesomeIcon
                :icon="icon"
                size="3x"
                flip-v
            />
        </div>
        <div class="card-block">
            <h4 class="card-title">{{ title }}</h4>
            <p class="card-text text-muted">{{ description }}</p>
        </div>        
    </router-link>
</template>
<script>
import FontAwesomeIcon from '@/Components/Icon/FontAwesomeIcon.vue';

export default {
    props: {
        title: String,
        description: String,
        icon: String,
        link: String
    },

    components: {
        FontAwesomeIcon
    }
}
</script>