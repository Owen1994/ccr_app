<template>
    <div>
        <!-- 弹框 -->
        <div class="popup"></div>
        <!-- 遮罩 -->
        <div class="mask">
            <img src="@/assets/img/loading.gif" alt="">
        </div>
        <!-- 请求出错刷新 -->
        <div class="refresh" v-show="refreshShow">
            <button onclick="location.reload()">点击刷新</button>
        </div>
        <!-- 无返回数据 -->
        <div class="no_data" v-show="nodataShow">
            <img src="@/assets/img/nodata.jpg" alt="">
        </div>
    </div>
</template>
<script>
    export default {
        props: ["refreshShow","nodataShow"]
    }
</script>