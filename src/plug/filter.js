import Vue from 'vue'
import statusList from '@data/status'
import util from '@util/util'

export default function () {
    /**
     * 状态判断
     * @param {Number} 状态值
     * @param {String} 状态模块
     */
    Vue.filter('judge', function(status, model) {
        var list = statusList[model]
        if (!list) {
            throw new Error('vue filter judge: 错误的model-' + model)
        }
    
        var findItem = list.find((item) => {
            return item.id == status
        })
        if (!findItem) {
            return '未定义'
        }
        return findItem.name
    })

    /**
     * 将时间戳转换成时间格式
     * @param {Timestamp} date : 时间戳 
     * @param {String} format :时间格式
     */
    Vue.filter('formatTime', function (date, format = 'y-m-d h:i:s') {
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
    })

    /**
     * 转化金额为,格式
     * @param {Number} money : 金额 
     */
    Vue.filter('formatMoney', function (money) {
        return util.formatMoney(money)
    })
}