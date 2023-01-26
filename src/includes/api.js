import axios from "axios";
import { environment } from "../../environment";
import { useAuthStore, useNotificationStore } from '@/stores';

const locale = localStorage.getItem("locale") || environment.locale.default

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

        const { token, logout } = useAuthStore();
        if ([401, 403].includes(error.response.status) && token) {
            logout();
        }

        let responseCodes = import(`../../locales/backend/${locale}.json`).then(module => {
            responseCodes = module.default

            if(responseCodes[error.response.data.code]) {
                const notificationStore = useNotificationStore()
                notificationStore.notifications.push({ text: responseCodes[error.response.data.code], type: error.response.data.status })
            }
        });

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