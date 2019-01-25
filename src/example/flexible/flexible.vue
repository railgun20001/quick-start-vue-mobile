<template>
    <div class="page">
        <div class="test1"></div>
        <div class="test2"></div>
        <div class="test3"></div>
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
    },
}
</script>

<style lang="scss" scoped>
.test1 {
    width: 10rem;
    // width: pxtorem(750px);
    height: 2rem;
    background: red;
    margin: pxtorem(20px) 0;
}

.test2 {
    width: 5rem;
    // width: pxtorem(375px);
    height: 2rem;
    background: yellow;
    margin: pxtorem(20px) 0;
}

.test3 {
    width: 3rem;
    height: 2rem;
    background: blue;
    margin: pxtorem(20px) 0;
}
</style>