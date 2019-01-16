// 是否打开调试
const DEBUG = process.env.NODE_ENV === 'production'
    ? false // npm run build  true or false (不推荐改变设置)
    : false // npm run dev  true or false

// 环境
// production ajax 请求线上 || development ajax 请求线下
const ENV = process.env.NODE_ENV === 'production'
    ? 'production' // npm run build  development or production (不推荐改变设置)
    : 'production' // npm run dev  development or production

// api配置
// 通过@util/ajax实现请求地址的字符串拼接
// 通过改变全局ENV,或者模块env,或者方法env或baseUrl,详细使用看ajax方法的代码

const API = {
    // 通用模块
    common: {
        baseURL: {
            development:'http://test.ittun.com/public',
            production: 'https://www.test.cn/public',
        },
        methods: {
            /**
             * 写好注释
             */
            test: {
                method: 'get',
                url: '/index/test/test',
            },
        },
    },
}

module.exports = {
    ENV,
    DEBUG,
    API,
}
