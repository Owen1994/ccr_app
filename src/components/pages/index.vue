<template>
    <div>
        <div class="home">
            <div class="user">
                <ul class="clearfix">
                    <li class="avatar">
                        <div style="width: 1.6rem;height: 1.6rem;position: relative;margin: auto;">
                            <img class="headImg" :src="headImg" alt="" style="width: 100%;height: 100%;">
                        </div>
                    </li>
                    <li>
                        <span class="userName">{{ username }}</span>
                    </li>
                    <li  @click="$router.push('/personal_info')">
                        <i class="fa fa-chevron-right" style="color: red;font-size: .5rem;"></i>
                    </li>
                </ul>
                <div class="stopTime">
                    <i class="fa fa-clock-o" style="font-size: .6rem;"></i>
                    <span>{{ leftTime }}</span>
                </div>
            </div>
            <div class="user_info">
                <ul class="clearfix">
                    <li>
                        <p class="accountBalance">{{ accountBalance }}</p>
                        <p>账户余额</p>
                    </li>
                    <li>
                        <p>8000</p>
                        <p>盈利</p>
                    </li>
                    <li>
                        <p>{{ subordinateNum }}</p>
                        <p>下级</p>
                    </li>
                </ul>
            </div>
            <div class="notice">
                <ul class="notice_li">
                    <li v-for="(item,index) in newsList" :key="index" @click="$router.push('/news_detail/'+item.nid)">
                        <p class="title">{{item.title}}</p>
                        <p class="pre_content">{{item.content}}</p>
                        <p class="tag_time"><span>标签：{{item.tags}}</span><span class="notice_time">{{$formatDate(new Date(item.addTime*1000))}}</span></p>
                    </li>
                </ul>
            </div>
        </div>
        <common-component :refreshShow="refreshShow"></common-component>
        <common-footer></common-footer>
    </div>
</template>
<script>
    import commonComponent from "@/components/common/common_component.vue";
    import footer from "@/components/common/footer.vue";
    export default {
        name: "index",
        components: {
            "common-component": commonComponent,
            "common-footer": footer
        },
        data() {
            return {
                token: localStorage.getItem("token"),
                headImg: this.$getItem("userInfo").headImg != 0 ? this.$store.state.domain + this.$getItem("userInfo").headImg : "/static/img/avatar.png",
                username: "",
                accountBalance: "",
                subordinateNum: 0,
                leftTime: "",
                newsList: [],
                //配置数据
                refreshShow: false
            }
        },
        methods: {
            getUserInfo() {
                let api = "/v1/getUserInfo",
                    _this = this;
                this.$ajax.get(api,{
                    headers: {
                        Authorization: "Bearer " + this.token
                    },
                    showLoading: true
                })
                .then((res) => {
                    res = res.data;
                    console.log(res)
                    if(res.code === 1) {
                        let userInfo = JSON.stringify(res.data);
                        localStorage.setItem("userInfo",userInfo);
                        _this.username = res.data.username;
                        _this.accountBalance = res.data.accountBalance;
                        if(res.data.stopTime != 0) {
                            var leftTime = Math.ceil((new Date(res.data.stopTime*1000) - new Date()) / 3600 / 24);
                        }else {
                            var leftTime = 0;
                        }
                        _this.leftTime = leftTime + "天";
                    }else if(res.code === 100012 || res.code === 100013) {
                        _this.$router.push("/login");
                    }else {
                        _this.$popup(res.msg);
                    }
                })
                .catch((err) => {
                    console.log(err)
                    _this.refreshShow = true;
                })
            },
            getPromoteList() {
                let api = "/v1/getPromoteList",
                    _this = this;
                this.$ajax.get(api,{
                    headers: {
                        Authorization: "Bearer " + this.token
                    },
                    showLoading: true
                })
                .then((res) => {
                    res = res.data;
                    console.log(res)
                    if(res.code === 1) {
                        _this.subordinateNum = res.data.length;
                    }else if(res.code === 100012 || res.code === 100013) {
                        _this.$router.push("/login");
                    }else {
                        _this.$popup(res.msg);
                    }
                })
                .catch((err) => {
                    console.log(err)
                    _this.refreshShow = true;
                })
            },
            getNews() {
                let api = "/v1/getNew",
                    _this = this;
                this.$ajax.get(api,{
                    headers: {
                        Authorization: "Bearer " + this.token
                    }
                })
                .then((res) => {
                    res = res.data;
                    console.log(res)
                    if(res.code === 1) {
                        _this.newsList = res.data;
                    }else if(res.code === 100012 || res.code === 100013) {
                        _this.$router.push("/login");
                    }else {
                        _this.$popup(res.msg);
                    }
                })
                .catch((err) => {
                    this.newsList = "";
                    this.$popup("获取新闻列表失败");
                })
            }
        },
        created() {
            this.getUserInfo();
            this.getNews();
        },
    }
</script>
<style>
    @import "../../assets/css/index.css";
</style>