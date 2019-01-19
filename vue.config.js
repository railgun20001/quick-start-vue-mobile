const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

// 配置详见https://cli.vuejs.org/zh/config/
module.exports = {
    lintOnSave: true,
    devServer: {
        overlay: {
            warnings: true,
            errors: true,
        },
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@views', resolve('src/views'))
            .set('@components', resolve('src/components'))
            .set('@router', resolve('src/router'))
            .set('@vuex', resolve('src/vuex'))
            .set('@util', resolve('src/util'))
            .set('@config', resolve('src/config'))
            .set('@data', resolve('src/data'))
    }
}