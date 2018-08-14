<template>
    <div>
        <header-one :title="myTitle" :extraLabel="record" :extraRouth="toRecord"></header-one>
        <div class="withdraw_cash">
            <div class="withdraw_card clearfix">
                <p>到账银行卡</p>
                <p class="card_select">
                    <!-- <span>农业银行(8677)</span>
                    <span>></span> -->
                    <input type="text" placeholder="请输入卡号" class="bankcard_num" v-model="bankCardNum">
                </p>
            </div>
            <div class="withdraw_num">
                <p>提现金额</p>
                <div class="num_ipt">
                    <input type="text" class="outmoney_num" v-model="outMoney">
                </div>
                <p class="left_num">
                    <span>当前余额</span>
                    <span>￥</span><span class="accountBalance">{{ accountBalance }}</span>
                </p>
            </div>
            <div class="withdraw_btn">
                <button class="outmoney_btn" @click="withdrawConfirm">提现</button>
            </div>
        </div>
        <common-component :refreshShow="refreshShow"></common-component>
        <common-footer></common-footer>
    </div>
</template>
<script>
    import headerOne from "@/components/common/header_one.vue";
    import commonComponent from "@/components/common/common_component.vue";
    import footer from "@/components/common/footer.vue";
    export default {
        name: "withdraw_cash",
        components: {
            "common-component": commonComponent,
            "common-footer": footer,
            "header-one": headerOne
        },
        data() {
            return {
                token: localStorage.getItem("token"),
                bankCardNum: "",
                outMoney: "",
                accountBalance: this.$getItem("userInfo").accountBalance,
                myTitle: "提现",
                record: "提现记录",
                toRecord: "/withdraw_record",
                extentionList: [],
                //配置数据
                refreshShow: false
            }
        },
        methods: {
            withdrawConfirm() {
                let api = "/v1/outMoney",
                    _this = this,
                    postData = {
                        bankCard: _this.bankCardNum,
                        outMoney: _this.outMoney
                    }
                this.$ajax.post(api,postData,{
                    headers: {
                        Authorization: "Bearer " + _this.token
                    },
                    showLoading: true
                })
                .then((res) => {
                    res = res.data;
                    console.log(res)
                    if(res.code === 1) {
                        _this.$popup("提交成功");
                    }else if(res.code === 100012 || res.code === 100013) {
                        _this.$router.push("/login");
                    }else {
                        _this.$popup(res.msg);
                    }
                })
                .catch((err) => {
                    _this.refreshShow = true;
                })
            }
        }
    }
</script>
<style>
    @import "../../assets/css/withdraw_cash.css";
</style>