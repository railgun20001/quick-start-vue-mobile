<template>
    <div class="">
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },

    created() {
    },

    methods: {
        fnAjaxTest1() {
            // 会向http://test.com/public/index/test/test?name=lcy&age=18发起get请求
            this.$ajax('common', 'test', {
                params: {
                    name: 'lcy',
                    age: 18,
                },
            }).then((res) => {
                // 成功判断,注意不同后端判断可能不同
                if (res.status === 1) {
                    console.log(res)
                }
            })
        },

        fnAjaxTest2() {
            // 会向http://test.com/public/index/test/test?agree=true发起post请求
            // 注意为post时,请求参数应该用data
            // 用params会挂在请求url上,变成了
            this.$ajax('common', 'test2', {
                params: {
                    agree: true,
                },
                data: {
                    account: '123456',
                    password: 'jiubugaosuni',
                },
            }).then((res) => {
                if (res.status === 1) {
                    console.log(res)
                }
            })
        },

        fnAjaxTest3() {
            // 会向http://test.com/public/index/test/test?name=lcy&age=18发起get请求
            this.$ajax('common', 'test', {
                params: {
                    name: 'lcy',
                    age: 18,
                },
            }, {
                showLoading: false, // 默认ajax请求时会调用loading,一些想要悄悄进行的请求可以设置为false
            }).then((res) => {
                if (res.status === 1) {
                    console.log(res)
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
</style>