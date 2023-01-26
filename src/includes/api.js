import axios from "axios";
import { environment } from "../../environment";
import { useAuthStore, useNotificationStore } from '@/stores';

const locale = localStorage.getItem("locale") || environment.locale.default
const localeImport = import(`../locales/backend/${locale}.json`).then(module => module.default)

const instance = axios.create({
    baseURL: environment.api
});

instance.interceptors.request.use(
    config => { 
        config.headers['Authorization'] = `Bearer ${authHeader(config.baseURL)}`;
        return config;
      },
      error => {
          return Promise.reject(error);
      }
  );

instance.interceptors.response.use(function (response) {
    return response.data.data;
},  async function (error) {

        const notificationStore = useNotificationStore()
        const { token, logout } = useAuthStore();

        if ([401, 403].includes(error.response.status) && token) {
            logout();
        }

        const responseCodes = await localeImport
        if(responseCodes[error.response.data.code]) {
            notificationStore.notifications.push({ text: responseCodes[error.response.data.code], type: error.response.data.status })
        } else {
            error.response.data.errors.map(function (value, key) {
                if(value !== '' && key === 0)
                notificationStore.notifications.push({ text: value.message, type: error.response.data.status })
            })
        }
        

        return Promise.reject(error.response);
});

function authHeader(url) {
    const { token } = useAuthStore();
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(environment.api);

    if (isLoggedIn && isApiUrl) {
        return token;
    } else {
        return {};
    }
}

export default instance;