import {environment} from "../../../../environment";

export default {

    namespaced: true,

    state: {
        activeLanguage: environment.locale,
        text: null
    },
    getters:{
        activeLanguage(state) {
            return state.activeLanguage;
        }
    },
    mutations: {
        SET_LANGUAGE(state, language) {
            state.activeLanguage = language;
        }
    },
    actions: {
        setLanguage(context, language) {
            context.commit('SET_LANGUAGE', language);
        }
    }
}
