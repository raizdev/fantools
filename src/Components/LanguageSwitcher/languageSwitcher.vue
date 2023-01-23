<template>
  <b-dropdown id="dropdown-dropright" variant="white" style="border: 0">
    <template #button-content>
      <div :class="`icon--flags ${$i18n.locale}`" style="position: absolute;margin-left: -6px !important;"></div>
    </template>
    <b-dropdown-item v-for="locale in $i18n.availableLocales">
        <a href="#" @click="updateLanguage(locale)" :key="locale">
          <div :class="`icon--flags ${locale}`"></div>
        </a>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: "LocaleSwitcher",

  methods: {
    updateLanguage(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
    },
  },

  mounted() {
    if (sessionStorage.getItem("locale")) {
      this.$i18n.locale = localStorage.getItem("locale");
    } else {
      localStorage.setItem("locale", this.$i18n.locale);
    }
  },
};
</script>
<style>
.small-padding {
  padding: 5px !important;
}
</style>
