import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        rootLoading: false,
    },
    mutations: {
        // 改变页面loading
        taggleLoading(state, payload) {
            state.rootLoading = payload
        },
    },
    actions: {

    }
})
