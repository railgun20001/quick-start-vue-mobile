<template>
    <div class="page">
        <div class="content_list" v-infinite-scroll="fnAjaxGetMoreOrder" infinite-scroll-disabled="busy">
            <div class="content_item" v-for="(item, index) in list" :key="index"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 数据列表
            list: [],
        }
    },

    created() {
 
    },

    methods: {
    },
}
</script>

<style lang="scss" scoped>
.page {
    background: #808080;
}

.content_item {
    min-height: pxtorem(200px);
    background: #fff;
}
</style>