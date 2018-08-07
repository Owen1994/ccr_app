<template>
    <div>
        <!-- 弹框 -->
        <div class="popup"></div>
        <!-- 遮罩 -->
        <div class="mask">
            <img src="@/assets/img/loading.gif" alt="">
        </div>
        <div class="refresh" v-show="refreshShow">
            <button onclick="location.reload()">点击刷新</button>
        </div>
    </div>
</template>
<script>
    export default {
        props: ["refreshShow"]
    }
</script>