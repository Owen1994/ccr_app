<template>
    <div>
        <header-one :title="myTitle"></header-one>
        <div class="news_detail">
            <div class="detail_title">
                <p class="news_title">{{ newsTitle }}</p>
                <p class="author_info"><span class="author">{{ author }}</span></p>
                <p class="addTime_info"><i class="fa fa-clock-o" style="font-size: .5rem;margin-right: .2rem;"></i><span class="addTime">{{ addTime }}</span></p>
            </div>
            <div class="detail_content">
                <p>{{ detailContent }}</p>
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
        name: "newsDetail",
        components: {
            "header-one": headerOne,
            "common-component": commonComponent,
            "common-footer": footer
        },
        data() {
            return {
                token: localStorage.getItem("token"),
                myTitle: "新闻详情",
                nid: this.$route.params.nid,
                newsTitle: "",
                author: "",
                addTime: "",
                detailContent: "",
                //配置数据
                ajaxConfig: {
                    showLoading: true
                },
                refreshShow: false
            }
        },
        methods: {
            getNewsDetail() {
                let api = "/v1/getNew/" + this.nid,
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
                        _this.newsTitle = res.data.title;
                        _this.author = res.data.author;
                        _this.addTime = _this.$formatDate(new Date(res.data.addTime * 1000));
                        _this.detailContent = res.data.content;
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
            this.getNewsDetail();
        },
    }
</script>
<style>
    @import "../../assets/css/news_detail.css";
</style>