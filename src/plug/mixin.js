import {
    DEBUG,
} from '@config'

export default {
    data() {
        return {
            imgErrorSrc: 'this.src="/static/img/default.jpg"',
        }
    },

    methods: {
        // 获取query
        query() {
            var query = this.$route.query
            if (this.$route.name === 'index') {
                query = this.$util.deepObjectMerge(query, this.$store.state.data.tabQuery)
            }
            return query
        },

        /**
         * 跳转路由
         * @param {String} routerName 路由名
         * @param {Object} query url参数
         */
        gotoPage(routerName, query = {}) {
            // 判断是否为tab页面
            if (['index', 'store', 'cart', 'my'].indexOf(routerName) > -1) {
                this.gotoTab(routerName, query)
                return
            }
            this.$router.push({
                name: routerName,
                query: query,
            })
        },

        /**
         * 跳转tab路由
         * @param {String} routerName 路由名
         * @param {Object} query url参数
         */
        gotoTab(routerName, query = {}) {
            this.$store.commit('data/gotoTab', {
                tabActive: routerName,
                tabQuery: query,
            })

            if (this.$route.name !== 'index') {
                this.$router.push({
                    name: 'index',
                    query: query,
                })
            }
        },

        // 空操作
        noop() {
            return
        },

        // 微信jssdk设置,安卓设备专用
        // 每个页面只用调用一次就行
        wxConfig(jsApiList) {
            return new Promise((resolve) => {
                // ios 设备进入程序已经进行js-sdk签名
                if (window.__wxjs_is_wkwebview === true) {
                    resolve()
                    return
                }

                // 非ios设备，切换路由时候进行重新签名
                this.$ajax('qgcloud', 'getJSSDK', {
                    params: {
                        url: encodeURIComponent(window.location.href.split('#')[0]),
                        appid: this.$util.getLocalStorage('appid'),
                    },
                }, {
                    showError: false,
                }).then((res) => {
                    if (res.status === 1) {
                        this.$wx.config({
                            debug: DEBUG,
                            appId: res.data.appId, // 必填，公众号的唯一标识
                            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                            signature: res.data.signature, // 必填，签名，见附录1
                            jsApiList: jsApiList || this.$store.state.user.jsApiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        })
                        this.$wx.ready(() => {
                            resolve()
                        })
                    }
                })
            })
        },
    },
}