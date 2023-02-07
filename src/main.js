import './assets/base.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'nprogress/nprogress.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'notyf/notyf.min.css';

import { BootstrapVue } from 'bootstrap-vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from 'pinia';
import { createApp, markRaw } from 'vue';
import { router } from './router';
import { VueClipboard } from '@soerenmartius/vue3-clipboard';
import { VueZo } from 'vue-zo';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Modal from "vue-bs-modal";
import progressBar from './includes/progress-bar';
import App from './App.vue';
import i18n from './includes/i18n';


const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
pinia.use(({ store }) => { store.router = markRaw(router) });

const app = createApp(App)

app.config.errorHandler = () => null;
app.config.warnHandler = () => null;

app
.use(i18n)
.use(VueZo)
.use(pinia)
.use(router)
.use(VueClipboard)
.use(BootstrapVue)
.use(Modal)
.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app')
progressBar(router)
