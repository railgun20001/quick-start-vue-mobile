# quick-start-vue-mobile

## 项目开始
```
// 从git拉下代码,打开cmd终端依次执行以下命令

// 没有npm淘宝镜像的话,先执行这个,详见https://npm.taobao.org/
// 因为npm为国外服务器,太慢,且容易出错
npm install -g cnpm --registry=https://registry.npm.taobao.org

cnpm install // 下载npm包

npm run serve // 开始开发，编译成功打开localhost:8080
```

项目上线时打包
```
// --modern 使用现代模式构建应用，为现代浏览器交付原生支持的 ES2015 代码，并生成一个兼容老浏览器的包用来自动回退
npm run build --modern

// 打包时会根据构建统计生成报告，它会帮助你分析包中包含的模块们的大小
// 不用的话将vue.config.js的analyzerMode设置为disabled
```



##[eslint](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint)

尽量使用eslint, 如果你认为一些规则不符合你的开发习惯,在/.eslintrc.js中配置规则,vue-eslint的规则可以参考https://eslint.vuejs.org/rules/和https://mysticatea.github.io/vue-eslint-demo

运行以下命令自动修改代码以尽量符合eslint规则（某些报错无法自动修改）
```
npm run lint
```



##ajax

基于[axios](https://github.com/axios/axios)进行封装,见util/ajax.js
[axios中文文档](https://www.kancloud.cn/yunye/axios/234845)

使用方法详见example的ajax

使用注意:
1.默认行为有,运行时调起loading;状态码错误时显示错误消息;后端代码500时显示'系统错误'消息
2.注意状态码,在本项目status === 1代表成功,status === 0代表失败,不同后端有不同的习惯,自己依照情况改变



##[vuex](https://vuex.vuejs.org/zh/)

暂无




##可选插件

这些插件时是优化或者特殊需求,自己判断是否需要

###1.[vue-infinite-scroll (监听触底插件)](https://github.com/ElemeFE/vue-infinite-scroll)

滚动触底监听,主要用于移动端列表下一页加载,使用方法见example的list

使用注意:
1.在keep-alive缓存页面中使用,离开缓存页面事件监听依然存在,需要手动将busy设置为false.

###2.[vue-awesome-swiper (轮播图)](https://github.com/surmon-china/vue-awesome-swiper)

基于swiper.js的轮播图,使用方法见example的swiper

使用注意:
1.swiper元素或其父元素上要加v-if="imgList.length > 0"类似的判断,否则loop和autoplay不生效
2.swiper的默认options在main.js引入时已有配置,全局样式在App.vue style中已有配置

###3.[vue-core-image-upload (上传图片)](https://github.com/Vanthink-UED/vue-core-image-upload)

使用方法见example的upload

###4.[flexible (手淘适配方案)](https://github.com/amfe/article/issues/17)

位于/public/static/lib/flexible.js,在public/index.html中引入,使用方法见example的flexible

```scss
// 各种px 在750px宽的移动端设计稿上量取的px,应该经过pxtorem转换
width: pxtorem(375px); // 会转化为5rem,即屏幕一半

// 字体大小 同样,量取的字体大小也应当这样写
@include font(28px);

// 以上函数或minix均为scss,在style中的global中定义
```

也可以使用vscode的插件px to rem,记得在首选项中将Px-to-rem: Px-per-rem设置为75,Alt+z为转换快捷键

使用注意:
1.宽度为屏幕的100%不要写成pxtorem(750px),直接width:100%,因为flexible超过一定宽度会失效,如在ipad上不会表现100%

###5.[微信jssdk](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)

如果项目是在放在微信公众号,需要用到,其中包含支付,分享等功能

使用注意:
1.微信jssdkbug,如果其他插件引入过weixin-js-sdk,那么wx会为空,见https://github.com/yanxi-me/weixin-js-sdk/issues/10. 需要这样引用:

```js
const wx = window.jWeixin || require('weixin-js-sdk')
```

###6.[number-precision (防止浮点数陷阱)](https://github.com/nefe/number-precision)

使用javascript精确地执行加法，减法，乘法和除法运算,写购物车等其他依赖前端计算的地方经常用到

你可能遇到过这样的问题:
```js
// 0.1+0.2本应该等于0.3,但却会输出0.30000000000000004
0.1+0.2 // 0.30000000000000004
```

如果你想知道详细的原理,可以阅读这篇文章,[JavaScript 浮点数陷阱及解法](https://github.com/camsong/blog/issues/9)