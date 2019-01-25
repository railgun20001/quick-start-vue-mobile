<template>
    <div class="page">
        <div>例示:</div>
        <ul class="exampleList_list">
            <li v-for="(item, index) in exampleList" @click="gotoPage(item.routerName)" style="line-height: 0.8rem;" :key="item.id">
                {{ index + 1 }}、{{ item.name }}
            </li>
        </ul>
        <div class="test"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            exampleList: [
                {
                    id: 1,
                    name: '列表',
                    routerName: 'list',
                },
                {
                    id: 2,
                    name: '轮播图',
                    routerName: 'swiper',
                },
                {
                    id: 3,
                    name: '图片上传',
                    routerName: 'upload',
                },
                {
                    id: 4,
                    name: '手机适配',
                    routerName: 'flexible',
                },
                {
                    id: 5,
                    name: 'ajax',
                    routerName: 'ajax',
                },
            ],
        }
    },

    created() {
 
    },

    methods: {
    },
}
</script>

<style lang="scss" scoped>
.test  {
  
}
</style>