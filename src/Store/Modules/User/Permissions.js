import api from "../../../Common/Helpers/Api";

export default {

    namespaced: true,

    state: {
        list: null
    },

    getters: {
        list(state) {
            return state.list
        }
    },

    mutations: {
        APPEND_LIST: (state, list) => {
            state.list = list
        }
    }
}
