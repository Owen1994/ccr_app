<template>
    <div style="height: 100%;">
        <div class="personal_center">
            <div class="header">
                <p>个人中心</p>
            </div>
            <ul>
                <li class="extention_link" data-clipboard-text="1" ref="extentionLink">
                    <i class="fa fa-external-link" style="float: left;font-size: .9rem;"></i>
                    <span>推广链接</span>
                    <i class="fa fa-chevron-right" style="float: right;"></i>
                </li>
                <li @click="$router.push('/extention_list')">
                    <i class="fa fa-list" style="float: left;font-size: .9rem;"></i>
                    <span>推广列表</span>
                    <i class="fa fa-chevron-right" style="float: right;"></i>
                </li>
                <li @click="$router.push('/withdraw_cash')">
                    <i class="fa fa-usd" style="float: left;font-size: .9rem;width: .9rem;"></i>
                    <span>申请提现</span>
                    <i class="fa fa-chevron-right" style="float: right;"></i>
                </li>
                <li @click="$router.push('/personal_info')">
                    <i class="fa fa-pencil" style="float: left;font-size: .9rem;width: .9rem;"></i>
                    <span>完善信息</span>
                    <i class="fa fa-chevron-right" style="float: right;"></i>
                </li>
            </ul>
            <div style="padding: 0 .2rem 3rem;position: absolute;bottom: 0;width: 100%;">
                <button class="login_out" @click="$router.push('/login')">退出登录</button>
            </div>
        </div>
        <common-component :refreshShow="refreshShow"></common-component>
        <common-footer></common-footer>
    </div>
</template>
<script>
import commonComponent from "@/components/common/common_component.vue";
import footer from "@/components/common/footer.vue";
import ClipboardJS from "clipboard";
export default {
    name: "personal_center",
    components: {
        "common-component": commonComponent,
        "common-footer": footer
    },
    data() {
        return {
            token: localStorage.getItem("token"),
            //配置数据
            refreshShow: false
        }
    },
    methods: { 
        getClipBoard() {  //复制推广链接
            let clipboard = new ClipboardJS(this.$refs.extentionLink),
                _this = this;
            clipboard.on('success', function(e) {
                console.log(e);
                _this.$popup("复制成功");
            });
            clipboard.on('error', function(e) {
                console.error('Action:', e.action);
                console.error('Trigger:', e.trigger);
                _this.$popup("复制失败");
            });
        }
    },
    mounted() {
        this.getClipBoard()
    }
}
</script>
<style>
    @import "../../assets/css/personal_center.css";
</style>

