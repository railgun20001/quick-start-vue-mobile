import Vue from 'vue'
import Router from 'vue-router'
import index from '@views/index'

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
    ]
})
