<template>
  <div class="btn-group">
    <button class="btn  btn-sm small-padding" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <div :class="`icon--flags ${$i18n.locale}`"></div>
    </button>
    <ul class="dropdown-menu menu dropdown-language-switcher-toggle" aria-labelledby="languageSwitcher">
      <li v-for="locale in $i18n.availableLocales">
        <a href="#" @click="updateLanguage(locale)" :key="locale">
          <div :class="`icon--flags ${locale}`"></div>
        </a>
      </li>
    </ul>
  </div>
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
