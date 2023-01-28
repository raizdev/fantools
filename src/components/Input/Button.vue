<template>
    <div>
        <b-button :variant="success" :class="{ 'submitting': isSubmitting }" class="w-100" type="submit" :disabled="isSubmitting">
            <b-spinner small v-if="this.isSubmitting"></b-spinner>
            {{ this.text }}
        </b-button>
    </div>
</template>
<script>
export default {
    props: {
        text: String,
        variant: String,
        isSubmitting: Boolean
    }
}
</script>