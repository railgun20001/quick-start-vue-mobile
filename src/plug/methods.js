import Vue from 'vue'
import { axios, ajax } from '@util/ajax'
import util from '@util/util'
import np from 'number-precision'

// 微信bug,如果其他插件引入过weixin-js-sdk,那么wx会为空
// https://github.com/yanxi-me/weixin-js-sdk/issues/10
const wx = window.jWeixin || require('weixin-js-sdk')

export default function () {
    // 全局事件总线
    var EventBus = new Vue()
    Vue.prototype.$EventBus = EventBus

    // ajax封装
    Vue.prototype.$axios = axios
    Vue.prototype.$ajax = ajax

    // wx js-sdk
    Vue.prototype.$wx = wx

    // 常用工具
    Vue.prototype.$util = util

    // 使用javascript精确地执行加法，减法，乘法和除法运算
    Vue.prototype.$np = np
}