import Vue from 'vue'
import App from './App.vue'
import router from '@router'
import store from '@vuex'
import './registerServiceWorker'

// 调用插件
import plug from './plug'
Vue.use(plug)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
