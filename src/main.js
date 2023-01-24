import './assets/base.scss'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Modal from "vue-bs-modal";

import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import store from './Store'
import i18n from './i18n'

import 'vue-toast-notification/dist/theme-sugar.css';
import VueToast from 'vue-toast-notification';
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import { VueZo } from 'vue-zo'

import setupInterceptors from './Common/Helpers/Interceptor';
setupInterceptors(store);

const app = createApp(App)

app.config.errorHandler = () => null;
app.config.warnHandler = () => null;


store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
        app
        .use(store)
        .use(router)
        .use(VueToast)
        .use(i18n)
        .use(BootstrapVue)
        .use(Modal)
        .use(VueClipboard)
        .use(VueZo)
        .component("font-awesome-icon", FontAwesomeIcon)
        .mount('#app')

        
});
