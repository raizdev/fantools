import { createI18n } from 'vue-i18n'
import { messages } from "vite-i18n-resources";
import { configure } from "vee-validate";
import { localize } from '@vee-validate/i18n';

const locale = localStorage.getItem('locale') || import.meta.env.VITE_LOCALE_DEFAULT;

const i18n = createI18n({
    locale: locale,
    fallbackLocale: import.meta.env.VITE_LOCALE_FALLBACK,
    messages
});

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: true
});

import(`../locales/${locale}.json`)
    .then((module) => {
        let messages = module.default.messages;
        configure({
            generateMessage: localize(locale, { messages })
        })
    });

export default i18n
