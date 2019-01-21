import Vue from 'vue'
import Router from 'vue-router'
import index from '@views/index'
import list from '@views/list'
import swiper from '@views/swiper'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            alias: '/index',
            name: 'index',
            components: {
                main: index,
            },
            meta: {
                title: '首页',
            },
        },
        {
            path: '/list',
            name: 'list',
            components: {
                main: list,
            },
            meta: {
                title: '列表',
            },
        },
        {
            path: '/swiper',
            name: 'swiper',
            components: {
                main: swiper,
            },
            meta: {
                title: '轮播图',
            },
        },
    ]
})
