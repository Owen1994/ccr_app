<template>
    <div>
        <div class="order">
            <div class="myheader">
                <p>订单</p>
                <!-- <div class="mybtn">同步订单</div> -->
            </div>
            <div class="order_list">
                <ul class="clearfix" v-for="(item,index) in orderList" :key="index">
                    <li>
                        <p>{{ item.symbol }}</p>
                        <p>{{ $formatDate(new Date(item.successTime)) }}</p>
                    </li>
                    <li>
                        <p class="red_text">{{ item.profit }}</p>
                        <p>盈利比率</p>
                    </li>
                    <li>
                        <p class="red_text" style="word-break: break-word;">{{ item.orderNum }}</p>
                        <p>卖出数量</p>
                    </li>
                    <li>
                        <p class="red_text">{{ item.sellPrice }}</p>
                        <p>卖出金额</p>
                    </li>
                </ul>
            </div>
        </div>
        <common-component :refreshShow="refreshShow" :nodataShow="nodataShow"></common-component>
        <common-footer></common-footer>
    </div>
</template>
<script>
    import commonComponent from "@/components/common/common_component.vue";
    import footer from "@/components/common/footer.vue";
    export default {
        name: "order",
        components: {
            "common-component": commonComponent,
            "common-footer": footer
        },
        data() {
            return {
                token: localStorage.getItem("token"),
                orderList: [],
                //配置数据
                refreshShow: false,
                nodataShow: false
            }
        },
        methods: {
            getOrder() {
                let api = "/v1/getHistoryOrders",
                    _this = this;
                this.$ajax.get(api,{
                    headers: {
                        Authorization: "Bearer " + this.token
                    },
                    showLoading: true
                }).then((res) => {
                    res = res.data;
                    console.log(res)
                    if(res.code === 1) {
                        _this.orderList = res.data;
                        // _this.orderList = [
                        //     {
                        //     "orderId": 1,                       //订单id
                        //     "bourseOrderId": 20150928158614000, //交易所订单号
                        //     "symbol": "btc",                    //币种
                        //     "successTime": 1443410396717,       //成交时间
                        //     "buyPrice": "22",                     //买入均价
                        //     "sellPrice": "22",                    //卖出价格
                        //     "profit": "0",                      //盈利率
                        //     "bourseId": 4,                      //交易所id
                        //     "bourseName": "ZB",                 //交易所名称
                        //     "bourseStatus": "1"                 //交易所状态0：禁用，1：正常
                        //     },
                        //     {
                        //     "orderId": 2,
                        //     "bourseOrderId": 20150928158614000,
                        //     "symbol": "btc",
                        //     "successTime": 1443410396717,
                        //     "buyPrice": "22",
                        //     "sellPrice": "22",
                        //     "profit": "0",
                        //     "bourseId": 4,
                        //     "bourseName": "ZB",
                        //     "bourseStatus": "1"
                        //     }
                        // ];
                    }else if(res.code === -1) {
                        _this.nodataShow = true;
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
        },
        created() {
            this.getOrder();
        }
    }
</script>
<style>
    @import "../../assets/css/order.css";
</style>