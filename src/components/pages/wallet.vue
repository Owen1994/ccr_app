<template>
    <div>
        <div class="line_chart" style="width: 100%;height: 100%;">
            <div class="myheader">
                <p style="color: rgb(139, 136, 136);font-size: .6rem; ">账户余额</p>
                <div class="mybtn" @click="syncAccount">同步余额</div>
            </div>
            <!-- better-scrool块 -->
            <div class="wrapper chart_content" style="width: 100%;">
                <ul class="clearfix chart_list" ref="scrollBar">
                    <li :class="{'active': activeIndex == index}" @click="listClick(index)" v-for="(item,index) in walletList" :key="index">{{ item.bourseName }}</li>
                </ul>
                <ul class="chart_list_content">
                    <li v-for="(item,index) in walletList" :key="index" v-show="activeIndex == index">
                        <ul class="list_title">
                            <li>币种</li>
                            <li>账户余额</li>
                        </ul>
                        <div class="list_info">
                            <ul>
                                <li>{{ item.symbol }}</li>
                                <li>{{ item.available }}</li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <p class="no_data" v-show="walletList.length == 0">钱包列表为空</p>
            </div>
        </div>
        <common-component :refreshShow="refreshShow"></common-component>
        <common-footer></common-footer>
    </div>
</template>
<script>
    import footer from "@/components/common/footer.vue";
    import commonComponent from "@/components/common/common_component.vue";
    import BScroll from 'better-scroll';
    export default {
        name: "wallet",
        components: {
            "common-component": commonComponent,
            "common-footer": footer
        },
        data() {
            return {
                token: localStorage.getItem("token"),
                activeIndex: 0,
                walletList: [],
                //配置数据
                refreshShow: false
            }
        },
        methods: {
            listClick(index) {
                this.activeIndex = index;
            },
            getScrollInit() {  //better-scroll滚动条总长度设置以及初始化
                this.children = this.$refs.scrollBar.children
                let scrollWidth = 0;
                for(let i=0; i<this.children.length; i++) {
                    let child = this.children[i];
                    scrollWidth += Math.ceil(getComputedStyle(child,null).width);
                }
                this.$refs.scrollBar.style.width = scrollWidth + "px";
                let scroll = new BScroll(".wrapper",{
                    scrollX: true,
                    click: true,
                    // bounce: {
                    //     left: false,
                    //     right: false,
                    // }
                });
            },
            getWalletList() {
                let api = "/v1/getWalletList",
                    _this = this;
                this.$ajax.get(api,{
                    headers: {
                        Authorization: "Bearer " + this.token
                    },
                    showLoading: true
                }).then((res) => {
                    res = res.data;
                    console.log(res);
                    if(res.code === 1) {
                        _this.walletList = res.data;
                        _this.$nextTick(function() {
                            _this.getScrollInit();
                        })
                    }else if(res.code === 100012 || res.code === 100013) {
                        _this.$router.push("/login");
                    }else {
                        _this.$popup(res.msg);
                    }
                })
                .catch((err) => {
                    _this.refreshShow = true;
                })
            },
            syncAccount() {
                let api = "/syncAccount",
                    _this = this;
                this.$ajax.get(api,{
                    headers: {
                        Authorization: "Bearer " + this.token
                    },
                    showLoading: true
                }).then((res) => {
                    res = res.data;
                    console.log(res);
                    if(res.code === 1) {
                        _this.$popup("同步完成");
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
        mounted() {
            this.getWalletList();
        }
    }
</script>
<style>
    @import "../../assets/css/wallet.css";
</style>