<template>
    <!-- 
        swiper使用注意事项:
        1.swiper元素或其父元素上要加v-if="imgList.length > 0"类似的判断,否则loop和autoplay不生效
        2.swiper的默认options在main.js引入时已有配置,全局样式在App.vue style中已有配置
    -->
    <div class="page">
        <swiper class="swiper" v-if="imgList.length > 0" :options="swiperOption" ref="swiper">
            <swiper-slide v-for="(item, index) in imgList" :key="index">
                <img @click="fnHandleClick(item)" :src="item.img" class="detail_intro_bottom_pic_img">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 图片列表
            imgList: [
                {
                    img: '/static/img/img1.png',
                    url: '',
                },
                {
                    img: '/static/img/img2.png',
                    url: '',
                },
            ],

            swiperOption: {
                pagination: {
                    el: '.swiper-pagination',
                },
            },
        }
    },

    created() {
 
    },

    methods: {
        // 处理图片点击
        fnHandleClick(item) {
            window.location.href = item.url
        },
    },
}
</script>

<style lang="scss" scoped>
.swiper {
    height: pxtorem(750px);
}
</style>