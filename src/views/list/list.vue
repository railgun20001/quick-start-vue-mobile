<template>
    <div class="page">
        <div class="content_list" v-infinite-scroll="nextPage" infinite-scroll-disabled="busy" infinite-scroll-immediate-check="false">
            <div class="content_item" v-for="(item, index) in list" :key="index"></div>
        </div>
        <div class="list_none" v-if="list.length === 0 && !busy">
            没有数据
        </div>
        <div class="list_loading" v-if="busy">
            加载中...
        </div>
        <div class="list_last" v-if="pageManage.isLast">
            <div class="list_last_divider"></div>
            <span class="list_last_text">
                已经到底了~
            </span>
            <div class="list_last_divider"></div>
        </div>
    </div>
</template>

<script>
import PageManage from '@util/pageManage'

export default {
    data() {
        return {
            // 页面管理
            pageManage: null,

            // 数据列表
            list: [],
        }
    },

    computed: {
        busy() {
            return this.pageManage.isLoading
        },
    },

    created() {
        var that = this
        this.pageManage = new PageManage({
            getDataFunc(res, callback) {
                setTimeout(() => {
                    let list = []
                    if (res.page < 4) {
                        for (let i = 1; i <= 10; i++) {
                            list.push({
                                id: (res.page-1)*10+i,
                            })
                        }
                    }
                    console.log(list)
                    callback(list)
                }, 1000)
            },
            handleList(res) {
                that.list = res.list
            },
        })

        this.pageManage.init()
    },

    methods: {
        // 获取数据
        nextPage() {
            this.pageManage.next()
        },
    },
}
</script>

<style lang="scss" scoped>
.page {
    background: #808080;
}

.content_list {
    width: 90%;
    margin: 0 auto;
    padding: pxtorem(30px);
}

.content_item {
    width: 100%;
    min-height: pxtorem(500px);
    background: #fff;
}

.content_item + .content_item {
    margin: pxtorem(20px) 0 0;
}

.list_none {
    text-align: center;
    color: $divider;
    padding: pxtorem(20px);
}

.list_loading {
    text-align: center;
    color: $divider;
    padding: pxtorem(20px);
}

.list_last {
    padding: pxtorem(20px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.list_last_divider {
    border-top: 1px solid $divider; 
    height: 0;
    width: pxtorem(300px);
}

.list_last_text {
    color: $divider;
    margin: 0 pxtorem(50px);
}
</style>