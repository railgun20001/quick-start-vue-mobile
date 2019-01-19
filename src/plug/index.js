import mixin from './mixin'
import directive from './directive'
import filter from './filter'

const plug = {}
plug.install = function (Vue) {
    // 自定义指令
    directive()

    // 过滤器
    filter()

    // 注入组件
    Vue.mixin(mixin)
}

export default plug