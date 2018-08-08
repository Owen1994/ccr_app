<template>
    <div>
        <header-one :title="myTitle" :backRouth="backRouth"></header-one>
        <div class="extention_list">
            <ul>
                <li v-for="(item,index) in extentionList" :key = "index">
                    <div class="extention_info clearfix">
                        <p>{{ item.Name }}</p>
                        <p>未付费</p>
                        <div>
                            <p>{{ item.agentName }}</p>
                        </div>
                    </div>
                    <p class="time">{{ $formatDate(new Date(item.addTime * 1000)) }}</p>
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
        name: "extentionList",
        components: {
            "common-footer": footer,
            "header-one": headerOne,
            "common-component": commonComponent
        },
        data() {
            return {
                token: localStorage.getItem("token"),
                extentionList: [],
                //配置数据
                myTitle: "推广列表",
                backRouth: "/personal_center",
                refreshShow: false,
                nodataShow: false
            }
        },
        methods: {
            getExtentionList() {
                let api = "/v1/getPromoteList",
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
                        _this.extentionList = res.data;
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
            this.getExtentionList();
        }
    }
</script>
<style>
    @import "../../assets/css/extention_list.css";
</style>