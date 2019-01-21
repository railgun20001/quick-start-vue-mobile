<template>
    <div id="app">
        <!-- 主视图 -->
        <router-view
            id="main"
            name="main"
        ></router-view>
    </div>
</template>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @include font($base_font);
}

#main {
    min-height: 100vh;
}

/* reset */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
}
img {
    vertical-align: bottom;
}
input,button,select,textarea {
    outline:none
}
textarea {
    resize:none
}

// input type=search 取消border与删除按钮
input[type="search"] {
    -webkit-appearance:none;
}
input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
}

// swiper 轮播图
.swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
}
.swiper-pagination-bullet-active {
    background: $primary !important;
}
/* reset */

.clamp_1 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.clamp_2 {
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: normal;
}

.clamp_3 {
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: normal;
}
</style>
