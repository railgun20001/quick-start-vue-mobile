<template>
    <div class="page">
        <vue-core-image-upload
            ref="upload"
            class="upload_container"
            :crop="false"
            @imagechanged="imagechanged"
            @imageuploaded="imageuploaded"
            @errorhandle="errorhandle"
            :compress="85"
            text=""
            url="your upload url"
        >
            <img class="upload_default_img" v-if="!imageUrl" src="/static/img/img3.png">
            <img class="upload_img" v-else :src="imageUrl">
        </vue-core-image-upload>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imageUrl: '',
        }
    },

    created() {
    },

    methods: {
        // 当图片上传过程中触发
        imagechanged(file) {
            console.log(file)
            this.imageUrl = URL.createObjectURL(file);
            console.log(this.imageUrl)
            this.$store.commit('taggleLoading', true)
        },

        // 上传图片成功
        imageuploaded(res) {
            if (res.status) {
                this.$emit('input', res.data[0])
                this.$store.commit('taggleLoading', false)
            }
        },

        // 失败
        errorhandle() {
            this.$store.commit('taggleLoading', false)
        },
    },
}
</script>

<style lang="scss" scoped>
.page {
    padding-top: pxtorem(300px);
}

.upload_container {
    width: pxtorem(200px);
    height: pxtorem(200px);
    border: 1px solid $border;
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 auto;
}

.upload_default_img {
    width: pxtorem(150px);
}

.upload_img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>