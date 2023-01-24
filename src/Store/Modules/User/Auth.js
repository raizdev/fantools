import api from "@/Common/Helpers/Api";

export default {
    namespaced: true,

    state: {
        token: localStorage.getItem('token') || '',
        user: {},
        permission: {}
    },

    getters: {
        authenticated(state) {
            return state.token && state.user;
        },

        user(state) {
            return state.user;
        },

        permission(state) {
            return state.permission;
        }
    },

    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_PERMISSION(state, permission) {
            state.permission = permission;
        }
    },

    actions: {
        async signIn({dispatch}, values) {
            let response = await api.post('auth/login', values);
            return dispatch('attempt', response.token)
        },

        async register({dispatch}, form) {
            let response = await api.post('auth/register', form);
            return dispatch('attempt', response.token)
        },

        async attempt({commit, state }, token) {
            if (token) {
                commit('SET_TOKEN', token)
            }

            if (!state.token) {
                return
            }

            try {
                let response = await api.get('user');

                commit('SET_USER', response)
                commit('SET_PERMISSION', response.permission)

            } catch (e) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        },

        signOut({commit}) {
            return api.post('auth/logout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            })
        }
    }
}
