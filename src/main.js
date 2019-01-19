import Vue from 'vue'
import App from './App.vue'
import router from '@router'
import store from '@vuex'
import './registerServiceWorker'

// 调用插件,引入全局功能,如mixin,filter,directive等
import plug from './plug'
Vue.use(plug)

// 常用工具
import util from '@util/util'
Vue.prototype.$util = util

// ajax封装
import { ajax } from '@util/ajax'
Vue.prototype.$ajax = ajax

// 全局事件总线
// 实现非父子组件之间的通信
var EventBus = new Vue()
Vue.prototype.$EventBus = EventBus

/* 推荐插件,不使用的注释掉,也可以直接在使用的文件里引用 */
// 微信jssdk
// https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
// 微信jssdkbug,如果其他插件引入过weixin-js-sdk,那么wx会为空,见https://github.com/yanxi-me/weixin-js-sdk/issues/10
const wx = window.jWeixin || require('weixin-js-sdk')
Vue.prototype.$wx = wx

// 使用javascript精确地执行加法，减法，乘法和除法运算
// https://github.com/nefe/number-precision
import np from 'number-precision'
Vue.prototype.$np = np
/* 推荐插件 */

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
