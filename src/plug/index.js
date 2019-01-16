import mixin from './mixin'
import filter from './filter'
import methods from './methods'

const plug = {}
plug.install = function (Vue, options) {
    // 过滤器
    filter()

    // 注入组件
    Vue.mixin(mixin)

    // 添加实例方法
    methods()
}

export default plug