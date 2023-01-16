import api from "../Common/Helpers/Api";

export function plugin(store) {
    //subscribe to mutations
    store.subscribe((mutations, state) => {
        switch (mutations.type) {
            case 'auth/SET_TOKEN':
                if(mutations.payload) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${mutations.payload}`
                    localStorage.setItem('token', mutations.payload)
                } else {
                    api.defaults.headers.common['Authorization'] = null
                    localStorage.removeItem('token')
                }
                break;
        }
    })
    //subscribe to action
    store.subscribeAction({
        before(actions, state) {

        },
        after(actions, state) {

        },
    })
}
