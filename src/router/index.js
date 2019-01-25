import Vue from 'vue'
import Router from 'vue-router'
import index from '@views/index'

/* 例示页面,要删 */
import list from '../example/list'
import swiper from '../example/swiper'
import upload from '../example/upload'
import flexible from '../example/flexible'
import ajax from '../example/ajax'
/* 例示页面,要删 */

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

        /* 例示页面,要删 */
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
        {
            path: '/upload',
            name: 'upload',
            components: {
                main: upload,
            },
            meta: {
                title: '上传图片',
            },
        },
        {
            path: '/flexible',
            name: 'flexible',
            components: {
                main: flexible,
            },
            meta: {
                title: '手机适配',
            },
        },
        {
            path: '/ajax',
            name: 'ajax',
            components: {
                main: ajax,
            },
            meta: {
                title: 'ajax',
            },
        },
        /* 例示 */
    ]
})
