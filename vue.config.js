const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [path.resolve(__dirname, './src/style/global/**/*.scss'),],
        })
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

        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
    }
}