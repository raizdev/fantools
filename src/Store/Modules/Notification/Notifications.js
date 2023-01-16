export default {

    namespaced: true,

    state: {
        list: []
    },

    mutations: {
        ADD_NOTIFICATION(state, payload) {
            state.list.push(payload);
        },

        REMOVE_NOTIFICATION(state, payload) {
            state.list = state.list.filter(notification => notification.text !== payload.text);
        }
    },

    getters: {
        list: state => state.list
    }
}