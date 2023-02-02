<template>
    <div>
        <b-form-checkbox v-model="checked" name="check-button" @change="toggleTheme" switch></b-form-checkbox>
    </div>
</template>
<script>
import { BFormCheckbox } from 'bootstrap-vue-3'

export default {

    components: {
        BFormCheckbox
    },

    mounted() {
        const initUserTheme = this.getTheme() || this.getMediaPreference();
        this.setTheme(initUserTheme);
    },
    
    data() {
        return {
            userTheme: "light-theme",
        };
    },
    
    methods: {
        toggleTheme() {
            const activeTheme = localStorage.getItem("user-theme");
            if (activeTheme === "light-theme") {
                this.setTheme("dark-theme");
            } else {
                this.setTheme("light-theme");
            }
        },
    
        getTheme() {
            return localStorage.getItem("user-theme");
        },
    
        setTheme(theme) {
            localStorage.setItem("user-theme", theme);
            this.userTheme = theme;
            document.documentElement.className = theme;
        },
    
        getMediaPreference() {
            const hasDarkPreference = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            if (hasDarkPreference) {
                return "dark-theme";
            } else {
                return "light-theme";
            }
        },
    },
    };
 </script>