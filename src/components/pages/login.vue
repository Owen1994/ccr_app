<template>
    <div>
        <div class="login">
            <p class="text_center" style="font-size: .8rem;padding: 0 0 2rem;color: rgb(40, 130, 228);">登录</p>
            <div class="phone_num clearfix">
                <label for="phone" class="input_left">手机号</label>
                <input type="text" id="phone" placeholder="请输入手机号" class="input_right" v-model="phone">
            </div>
            <div class="password clearfix">
                <label for="login_password" class="input_left">密码</label>
                <input type="password" id="login_password" placeholder="请输入密码" class="input_right" v-model="password">
            </div>
            <div class="to_forget_password"><span @click="$router.push('/forgetpassword')">忘记密码？</span></div>
            <button class="loginbtn" @click="goLogin">登录</button>
            <button class="registerbtn" @click="$router.push('/register')">注册</button>
        </div>
        <common-component :refreshShow="refreshShow"></common-component>
    </div>
</template>
<script>
    import md5 from 'js-md5';
    import commonComponent from "@/components/common/common_component.vue";
    export default {
        name: "login",
        components: {
            "common-component": commonComponent
        },
        data() {
            return {
                phone: "",
                password: "",
                //配置数据
                ajaxConfig: {
                    showLoading: true
                },
                refreshShow: false
            }
        },
        methods: {
            goLogin() {
                if(this.phone === "" || this.password === "") {
                    this.$popup("手机号或者密码不能为空");
                    return;
                }
                if(this.$phoneValidate(this.phone) === false) {
                    this.$popup("手机号格式错误");
                    return;
                }
                let _this = this,
                    api = "/v1/login",
                    password = md5(this.password);
                this.$ajax.post(api,{
                    phone: this.phone,
                    password: password
                },this.ajaxConfig).then((res) => {
                    res = res.data;
                    console.log(res)
                    if(res.code === 1) {
                        let token = res.data.token;
                        window.localStorage.setItem("token",token);
                        _this.$router.push("/index");
                    }else {
                        _this.$popup(res.msg);
                    }
                }).catch(function() {
                    _this.refreshShow = true;
                })
            }
        }
    }
</script>
<style>
    @import "../../assets/css/login.css";
</style>

