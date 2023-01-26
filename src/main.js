import './assets/base.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'nprogress/nprogress.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { BootstrapVue } from 'bootstrap-vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { router } from './router'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import { VueZo } from 'vue-zo'

import Modal from "vue-bs-modal";
import progressBar from './includes/progress-bar';
import App from './App.vue'
import i18n from './includes/i18n'

import 'vue-toast-notification/dist/theme-sugar.css';
import VueToast from 'vue-toast-notification';

import { useAuthStore } from '@/stores';

const pinia = createPinia();

const app = createApp(App)

app.config.errorHandler = () => null;
app.config.warnHandler = () => null;

app.use(pinia)

const authStore = useAuthStore();
progressBar(router)
authStore.attempt(localStorage.getItem('token')).then(() => 
{
    app.use(router)
    .use(VueToast)
    .use(i18n)
    .use(BootstrapVue)
    .use(Modal)
    .use(VueClipboard)
    .use(VueZo)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
})