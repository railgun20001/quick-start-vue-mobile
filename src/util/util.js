/* 通用函数文件 */
import Vue from 'vue'
import store from '@vuex'
import statusList from '@data/status'

// console.log()简写
var log = console.log.bind(console)

// 判断类型
function isArray(target) {
    return Object.prototype.toString.call(target) == '[object Array]'
}
function isObject(target) {
    return Object.prototype.toString.call(target) == '[object Object]'
}
function isString(target) {
    return Object.prototype.toString.call(target) == '[object String]'
}

// 判断是否为数字,包含字符数字
function isNumber(num) {
    if (num != '' && num != null) {
        return !isNaN(num)
    } else {
        return false
    }
}

/**
 * 判断字符串是否为json格式(不严格检验)
 * @param {Boolean} strict 是否为严格模式,非严格模式只追求不报错,严格使用正则检测
 */
function isJSON(str, strict = false) {
    if (strict) {
        if (pass_object && isObject(str)) return true

        if (!isString(str)) return false

        str = str.replace(/\s/g, '').replace(/\n|\r/, '')

        if (/^\{(.*?)\}$/.test(str))
            return /"(.*?)":(.*?)/g.test(str)

        if (/^\[(.*?)\]$/.test(str)) {
            return str.replace(/^\[/, '')
                .replace(/\]$/, '')
                .replace(/},{/g, '}\n{')
                .split(/\n/)
                .map(function (s) {
                    return isJSON(s)
                })
                .reduce(function (prev, curr) {
                    return !!curr
                })
        }
        return false
    } else {
        if (isString(str)) {
            try {
                JSON.parse(str)
                return true
            } catch (e) {
                return false
            }
        }
        console.error('函数isJSON: It is not a string!')
    }
}

// 检测是否为空对象,非对象或非空返回false
function isNullObject(obj) {
    var isObj = Object.prototype.toString.call(obj) === '[object Object]'
    var isNull = Object.keys(obj).length === 0
    return isObj && isNull
}

// promise延时函数
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

/**
 * 为flex的justify-content: space-between生成伪装元素
 * @param {Array} target 目标数组
 * @param {Number} rowNum 每行个数，默认5
 * @param {String} key 生成新元素的键名
 */
function flexFake(target, rowNum, key) {
    if (!isArray(target)) {
        throw new Error('函数flexFake: 第一参数应为数组 ')
    }
    if (!isNumber(rowNum)) {
        rowNum = 5
    }
    let length = target.length
    let fakeNum = rowNum - (length % rowNum)
    let newArr = JSON.parse(JSON.stringify(target))
    for (let i = 0; i < fakeNum; i++) {
        let data = {}
        data[key] = true
        newArr.push(data)
    }
    return newArr
}

// 手机号码检验
function checkTel(tel) {
    if (!(/^1[345789]\d{9}$/.test(tel))) {
        return false
    }
    return true
}

/**
 * 将时间戳转换成时间格式
 * @param {Timestamp} date
 * @param {String} format
 */
function formatTime(date, format = 'y.m.d h:i:s') {
    date = new Date(date * 1000)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    let arr = [year, month, day, hour, minute, second].map((item) => {
        item = item.toString()
        return item[1] ? item : '0' + item
    })
    return format = format.replace(/[yY]/, arr[0]).replace(/[mM]/, arr[1]).replace(/[dD]/, arr[2]).replace(/[hH]/, arr[3]).replace(/[iI]/, arr[4]).replace(/[sS]/, arr[5])
}

/**
 * 对象浅拷贝
 * @param {Object} obj 要拷贝的对象 
 * 忽略了一些特殊的情况： 对对象/数组中的Function，正则表达式等特殊类型的拷贝
 * 
 */
function copyObj(obj) {
    var newobj = {}
    for ( var attr in obj) {
        newobj[attr] = obj[attr]
    }
    return newobj
}

/**
 * 对象深拷贝
 * @param {Object} obj 要拷贝的对象 
 * 忽略了一些特殊的情况： 对对象/数组中的Function，正则表达式等特殊类型的拷贝
 */
function deepCopyObj(obj) {
    if(isObject(obj) || isArray(obj)){
        var newobj = obj.constructor === Array ? [] : {};
        for (var attr in obj) {
            newobj[attr] = deepCopyObj(obj[attr])
        }
        return newobj
    } else {
        return obj
    }
}

/**
 * 深度合并对象
 * @param {Object} FirstOBJ
 * @param {Object} SecondOBJ
 */
function deepObjectMerge(FirstOBJ, SecondOBJ) {
    for (var key in SecondOBJ) {
        // 当FirstOBJ[key]存在且为对象或数组时,遍历内部赋值
        FirstOBJ[key] = (FirstOBJ[key] && FirstOBJ[key].toString() == '[object Object]') ?
            deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key]
    }
    return FirstOBJ
}

// 判断状态
function judge(status, model) {
    var list = statusList[model]
    if (!list) {
        console.error('vue filter judge: 错误的model-' + model)
    }

    var findItem = list.find((item) => {
        return item.id == status
    })
    if (!findItem) {
        return '未定义'
    }
    return findItem.name
}

// 秒转化
function praseSecond(s, format = 'd天h时i分') {
    if (!s) {
        return format.replace(/[dD]/, '00').replace(/[hH]/, '00').replace(/[iI]/, '00').replace(/[sS]/, '00')
    }

    var day = Math.ceil(s / 86400)
    var hour = parseInt((s % 86400) / 3600)
    var minute = parseInt((s % 3600) / 60)
    var second = s % 60
    let arr = [day, hour, minute, second].map((item) => {
        item = item.toString()
        return item[1] ? item : '0' + item
    })
    format = format.replace(/[dD]/, arr[0]).replace(/[hH]/, arr[1]).replace(/[iI]/, arr[2]).replace(/[sS]/, arr[3])
    return format
}

// 获取当前unix时间戳
function getNowTime() {
    return Math.round(new Date().getTime()/1000)
}

/*
 * 动态添加 CSS 样式
 * @param selector {string} 选择器
 * @param rules    {string} CSS样式规则
 * @param index    {number} 插入规则的位置, 靠后的规则会覆盖靠前的
 */
var addCssRule = function() {
    // 创建一个 style， 返回其 stylesheet 对象
    // 注意：IE6/7/8中使用 style.stylesheet，其它浏览器 style.sheet
    function createStyleSheet() {
        var head = document.head || document.getElementsByTagName('head')[0]
        var style = document.createElement('style')
        style.type = 'text/css'
        head.appendChild(style)
        return style.sheet || style.styleSheet
    }
 
    // 创建 stylesheet 对象
    var sheet = createStyleSheet()
 
    // 返回接口函数
    return function(selector, rules, index) {
        index = index || sheet.cssRules.length

        // 标准浏览器支持 insertRule， IE低版本则支持 addRule
        if (sheet.insertRule) { 
            sheet.insertRule(selector + "{" + rules + "}", index) 
        } else if (sheet.addRule) { 
            sheet.addRule(selector, rules, index) 
        }
    }
}()

// 消息弹窗
function message(msg) {
    Vue.$vux.toast.text(msg, 'top')
}

// 确认弹窗
function comfirm(content, title='提示') {
    return new Promise((resolve, reject) => {
        Vue.$vux.confirm.show({
            title: title,
            content: content,
            onCancel() {
                reject()
            },
            onConfirm() {
                resolve()
            }
        })
    })
}

// 处理本地缓存的key值(带上token)
function _handleStorageKey(key, isHandleKey) {
    if (isHandleKey) {
        let token = store.state.options.token
        return String(key) + String(token)
    } else {
        return key
    }
}

/**
 * localStorage 保存
 * @param {String} key 键
 * @param {String, Object, Array} value 值   
 * @param {String} type '' || array || object 
 * @param {Boolean} isHandleKey 是否处理key,即变为key+token(如userInfo16),目的是不同token的商城分开缓存
 */
function setLocalStorage(key, value, type='', isHandleKey = true) {
    if (type) {
        let defaultValue = (type == 'object' ? {} : [])
        try {
            value = JSON.stringify(value) || defaultValue
        } catch (e) {
            value = defaultValue
            return value
        }
    }
    localStorage.setItem(_handleStorageKey(key, isHandleKey), value)
}

/**
 * localStorage 获取
 * @param {String} key 键
 * @param {String, Object, Array} value 值   
 * @param {String} type '' || array || object 
 * @param {Boolean} isHandleKey 是否处理key,即变为key+token(如userInfo16),目的是不同token的商城分开缓存
 */
function getLocalStorage(key, type='', isHandleKey = true) {
    var value = localStorage.getItem(_handleStorageKey(key, isHandleKey))
    if (type) {
        let defaultValue = (type == 'object' ? {} : [])
        try {
            value = JSON.parse(value)
            if (!isArray(value) && !isObject(value)) {
                value = defaultValue
            }
        } catch (e) {
            value = defaultValue
            return value
        }
    }
    return value
}

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
function formatMoney(num, currency = false) {
    if (!num) {
        num = '0'
    }
    num = num.toString().replace(/\$|\,/g, '')
    if (isNaN(num))
        num = '0'
    let absNum = Math.abs(num)
    let sign = (num == absNum)
    num = absNum
    num = Math.floor(num * 100 + 0.50000000001)
    let cents = num % 100
    num = Math.floor(num / 100).toString()
    if (cents < 10)
        cents = '0' + cents
    if (currency) {
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
    }
    return (((sign) ? '' : '-') + num + '.' + cents)
}

export default {
    // console.log()简写
    log,

    // 判断类型
    isArray,
    isObject,
    isNumber,

    // 判断是否为数字,包含字符数字
    isString,

    // 判断字符串是否为json格式
    isJSON,

    // 检测是否为空对象,非对象或非空返回false
    isNullObject,

    // promise延时函数
    delay,

    // 为flex的justify-content: space-between生成伪装元素
    flexFake,

    // 手机号码检验
    checkTel,

    // 将时间戳转换成时间格式
    formatTime,

    // 对象浅拷贝
    copyObj,

    // 对象深拷贝
    deepCopyObj,

    // 深度合并对象
    deepObjectMerge,

    // 判断状态
    judge,

    // 秒转化
    praseSecond,

    // 获取当前unix时间戳
    getNowTime,

    // 动态添加 CSS 样式
    addCssRule,

    // 消息弹窗
    message,

    // 确认弹窗
    comfirm,

    // localStorage 保存
    setLocalStorage,

    // localStorage 获取
    getLocalStorage,

    // 将数值四舍五入(保留2位小数)后格式化成金额形式
    formatMoney,
}