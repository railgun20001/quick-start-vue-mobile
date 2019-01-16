import axios from 'axios'
import qs from 'qs'
import {
    ENV,
    API,
} from '@config'
import store from '@vuex'
import util from '@util/util'

// AJAX默认配置
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'	// Post的默认ContentType

// 请求通用处理
axios.defaults.transformRequest = [
    (data) => {
        data = qs.stringify(data)
        return data
    }
]

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
});

// 响应通用处理
axios.interceptors.response.use(function (response) {
    var res = response.data
    return res
}, function (error) {
    if (error.toString().includes('500')) {
        console.log(error)
    }
    return Promise.reject(error)
})

/**
 * ajax公共配置
 * @param {String} model api模块
 * @param {String} methods api方法
 * @param {Object} axiosParams 传递给axios除method与url以外的其他参数
 */
function ajax(model, method, axiosParams, config={}) {
    var defaultConfig = {
        showLoading: true, // 是否显示loading
        showError: true, // status为0时是否显示报错信息
        errorMessage: '', // status为0时显示报错信息内容,为空时显示res.msg
        showWrong: true, // 后台代码错误时是否显示报错信息
        wrongMessage: '', //后台代码错误时显示报错信息内容,为空时显示'系统错误'
    }

    config = Object.assign(defaultConfig, config)

    _handleRequest(config)

    return new Promise((resolve, reject) => {
        if (!API[model]) {
            throw new Error(`未定义的model,${model}-${method}`)
        }
        if (!API[model].methods[method]) {
            throw new Error(`未定义的method,${model}-${method}`)
        }
        
        let baseURL = API[model].baseURL[ENV]
        if (API[model].methods[method].baseURL) {
            baseURL = API[model].methods[method].baseURL
        } else if (API[model].methods[method].env) {
            let env = API[model].methods[method].env
            baseURL = API[model].baseURL[env]
        } else if (API[model].env) {
            let env = API[model].env
            baseURL = API[model].baseURL[env]
        }

        axios({
            method: API[model].methods[method].method,
            url: baseURL + API[model].methods[method].url,
            ...axiosParams,
        }).then((res) => {
            // Status Code: 200 OK
            _handleSuccess(res, config)
            resolve(res)
        }).catch((res) => {
            // Status Code: 404 or 500 and so on ERROR
            _handleFail(res, config)
            reject(res)
        })
    })
}

// ajax发送前处理
function _handleRequest(config) {
    if (config.showLoading) {
        // 是否显示全局ajax loading
        store.commit('taggleLoading', {
            loading: true,
        })
    }
}

// 处理成功返回
function _handleSuccess(res, config) {
    _handleCommon(res, config)

    if (config.showError) {
        // 处理status为0情况
        if (res.status === 0) {
            util.message(config.errorMessage || res.msg)
        }
    }
}

// 处理错误返回
function _handleFail(res, config) {
    _handleCommon(res, config)

    if (res.toString().includes('500') && config.showWrong) {
        util.message('系统错误')
    }
}

// 处理通用返回
function _handleCommon(res, config) {
    if (config.showLoading) {
        // 关闭全局ajax loading
        store.commit('taggleLoading', {
            loading: false,
        })
    }
}

export {
    ajax,
    axios,
}
