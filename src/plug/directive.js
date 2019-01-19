import Vue from 'vue'

export default function () {
    /**
     * v-focus 输入框自动获取焦点
     */
    Vue.directive('focus', {
        inserted(el) {
            el.focus()
        }
    })
}