<template>
    <div>
        <header-one :title="myTitle"></header-one>
        <div class="withdraw_record">
            <ul class="withdraw_record_list">
                <li v-for="(item,index) in outMoneyList" :key="index">
                    <div>
                        <p>{{ item.outStatus == 0 ? "待审核" : item.outStatus == 1 ? "已完成" : "审核失败" }}</p>
                        <p>{{ $formatDate(new Date((item.addTime)*1000)) }}</p>
                    </div>
                    <div>
                        <p>-{{ item.outMoney }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <common-component :refreshShow="refreshShow" :nodataShow="nodataShow"></common-component>
        <common-footer></common-footer>
    </div>
</template>
<script>
    import headerOne from "@/components/common/header_one.vue";
    import commonComponent from "@/components/common/common_component.vue";
    import footer from "@/components/common/footer.vue";
    export default {
        name: "withdrawRecord",
        components: {
            "common-component": commonComponent,
            "common-footer": footer,
            "header-one": headerOne
        },
        data() {
            return {
                token: localStorage.getItem("token"),
                myTitle: "提现记录",
                outMoneyList: [],
                //配置数据
                refreshShow: false,
                nodataShow: false
            }
        },
        methods: {
           getOutMoneyList() {
               let api = "/v1/outMoneyList",
                    _this = this;
                this.$ajax.get(api,{
                    headers: {
                        Authorization: "Bearer " + _this.token
                    },
                    showLoading: true
                })
                .then((res) => {
                    res = res.data;
                    console.log(res)
                    if(res.code === 1) {
                        _this.outMoneyList = res.data;
                    }else if(res.code === 100012 || res.code === 100013) {
                        _this.$router.push("/login");
                    }else if(res.code === -1) {
                        _this.nodataShow = true;
                    }else {
                        _this.$popup(res.msg);
                    }
                })
                .catch((err) => {
                    _this.refreshShow = true;
                })
           }
        },
        created() {
            this.getOutMoneyList()   
        }
    }
</script>
<style>
    @import "../../assets/css/withdraw_record.css";
</style>