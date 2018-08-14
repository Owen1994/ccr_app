<template>
    <div style="height: 100%;">
        <header-one :title="myTitle"></header-one>
        <form class="personal_info" ref="infoForms">
            <ul class="personal_info_content">
                <li>
                    <div>
                        <p>会员头像</p>
                    </div>
                    <div>
                        <div style="width: 1.6rem;height: 1.6rem;position: relative;">
                            <img class="headImg" :src="headImg" alt="" style="width: 100%;height: 100%;">
                            <input type="file" name="head_img" @change="preImage($event)">
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <p>会员名</p>
                    </div>
                    <div>
                        <input type="text" name="username" class="username" data-validate="会员名" v-model="userInfo.username">
                    </div>
                </li>
                <li>
                    <div>
                        <p>姓名</p>
                    </div>
                    <div>
                        <input type="text" name="name" class="name" data-validate="姓名" v-model="userInfo.name">
                    </div>
                </li>
                <li>
                    <div>
                        <p>推广码</p>
                    </div>
                    <div>
                        <input type="text" class="promoCode" readonly v-model="userInfo.promoCode">
                    </div>
                </li>
                <li>
                    <div>
                        <p>性别</p>
                    </div>
                    <div class="gender_select">
                        <div style="position:relative;float:left;">
                            <i :class="['fa',userInfo.male == 1 ? 'fa-check-circle-o' : 'fa-circle-o']" style="color: rgb(0, 160, 233);"></i>
                            <input type="radio" name="male" class="male" value="1" @click="selectGender('1')" :checked="userInfo.male == 1">
                            <span>男</span>
                        </div>
                        <div style="position:relative;float:left;margin-left: .5rem;">
                            <i :class="['fa',userInfo.male == 2 ? 'fa-check-circle-o' : 'fa-circle-o']" style="color: rgb(0, 160, 233);"></i>
                            <input type="radio" name="male" class="female" value="2"  @click="selectGender('2')" :checked="userInfo.male == 2">
                            <span>女</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <p>出生日期</p>
                    </div>
                    <div>
                        <date-picker v-model="userInfo.birthday" :language="dateData.lang" :disabledDates="dateData.disabledDates" :format="customFormatter" placeholder="选择日期" name="birthday"></date-picker>
                    </div>
                </li>
                <li>
                    <div>
                        <p>代理等级</p>
                    </div>
                    <div>
                        <input type="text" class="userLevel" readonly v-model="userInfo.userLevel">
                    </div>
                </li>
                <li>
                    <div>
                        <p>手机</p>
                    </div>
                    <div>
                        <input type="text" class="phone" readonly v-model="userInfo.phone">
                    </div>
                </li>
                <li>
                    <div>
                        <p>邮箱</p>
                    </div>
                    <div>
                        <input type="text" name="email" class="email" data-validate="邮箱" v-model="userInfo.email">
                    </div>
                </li>
                <li>
                    <div>
                        <p>地址</p>
                    </div>
                    <div>
                        <input type="text" class="address" name="address" data-validate="邮箱" v-model="userInfo.address">
                    </div>
                </li>
            </ul>
            <div style="padding: 0 .2rem;">
                <button class="info_confirm" @click.prevent="preseverInfo">保存信息</button>
            </div>
        </form>
        <common-component :refreshShow="refreshShow"></common-component>
        <common-footer></common-footer>
    </div>
</template>
<script>
import headerOne from "@/components/common/header_one.vue";
import commonComponent from "@/components/common/common_component.vue";
import footer from "@/components/common/footer.vue";
import Datepicker from 'vuejs-datepicker';
import {zh} from 'vuejs-datepicker/dist/locale';
export default {
    name: "personal_info",
    components: {
        "header-one": headerOne,
        "common-component": commonComponent,
        "common-footer": footer,
        "date-picker": Datepicker
    },
    data() {
        return {
            token: localStorage.getItem("token"),
            userInfo: this.$getItem("userInfo"),
            headImg: this.$getItem("userInfo").headImg != 0 ? this.$store.state.domain + this.$getItem("userInfo").headImg : "/static/img/avatar.png",
            myTitle: "个人资料",
            dateData: {
                // date: new Date(new Date().getFullYear() - 20,1,1),
                lang: zh,
                disabledDates: {
                    from: new Date()
                }
            },
            //配置数据
            refreshShow: false
        }
    },
    methods: { 
        preImage(e) {  //图片预览
            let target = e.target,
                _this = this,
                fileReader = new FileReader();
            fileReader.readAsDataURL(target.files[0]);
            fileReader.onload = function(){
                let url = fileReader.result;
                _this.headImg = url;
            }
        },
        selectGender(num) {
            this.userInfo.male = num;
        },
        customFormatter(date) {  
            let year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate();
            return year + "/" + month + "/" + day;
        },
        preseverInfo() {
            let formdata = new FormData(this.$refs.infoForms),
                api = "/v1/userInfoChange",
                _this = this;
            this.$ajax.post(api,formdata,{
                headers: {
                    Authorization: "Bearer " + this.token
                }
            }).then((res) => {
                res = res.data;
                console.log(res)
                if(res.code === 1) {
                    _this.$ajax.get("/v1/getUserInfo",{
                        headers: {
                            Authorization: "Bearer " + _this.token
                        },
                        showLoading: true
                    }).then((res) => {
                        _this.$popup("保存成功");
                        let data = res.data;
                        console.log(res)
                        if(data.code === 1) {
                            _this.$setItem("userInfo",data.data)
                        }else if(data.code === 100012 || data.code === 100013) {
                            _this.$router.push("/login");
                        }else {
                            _this.$popup(data.msg);
                        }
                    })
                }else if(res.code === 100012 || res.code === 100013) {
                    _this.$router.push("/login");
                }else {
                    _this.$popup(res.msg);
                }
            }).catch(function() {
                _this.$popup("保存失败");
            })
        },
        
    }
}
</script>
<style>
    @import "../../assets/css/personal_info.css";
</style>

