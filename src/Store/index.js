import { createStore, createLogger } from 'vuex'

import auth from './Modules/User/Auth';
import notifications from './Modules/Notification/Notifications';
import locales from "./Modules/Locale/Locale";
import tools from './Modules/Tools/Tools';

import { plugin } from './plugins'

export default createStore({
    modules: {
        auth,
        notifications,
        locales,
        tools
    },
    plugins: [plugin]
})
