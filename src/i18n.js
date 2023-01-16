import { createI18n } from 'vue-i18n/index'
import { messages } from "vite-i18n-resources";
import { environment } from "../environment";
import { configure } from "vee-validate";
import { localize } from '@vee-validate/i18n';

const locale = localStorage.getItem('locale') || environment.locale.default;

const i18n = createI18n({
    locale: locale,
    fallbackLocale: environment.locale.fallback,
    messages
});

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: true
});

import(`./Locales/frontend/${locale}.json`)
    .then((module) => {
        let messages = module.default.messages;
        configure({
            generateMessage: localize(locale, { messages })
        })
    });


export default i18n
