<template>
    <div>
        <div class="register">
            <p class="text_center" style="font-size: .8rem;padding: 2rem 0;color: rgb(40, 130, 228);">注册</p>
            <div class="clearfix">
                <label for="username" class="input_left">用户名</label>
                <input type="text" id="username" placeholder="请输入用户名" class="input_right" v-model="username">
            </div>
            <div class="clearfix mgt6">
                <label for="phone" class="input_left">手机号</label>
                <div class="input_right">
                    <input type="number" id="phone" placeholder="请输入手机号" v-model="phone" @blur="phoneInput">
                    <p class="red_text if_right_phone" v-show="errShow.errPhoneShow">请输入正确的手机号</p>
                </div>
            </div>
            <div class="clearfix mgt6">
                <label for="sms_code" class="input_left">验证码</label>
                <input type="number" id="sms_code" placeholder="请输入验证码" v-model="smsCode">
                <input class="get_verificationcode" style="color: #000;" v-model="smsCodeBtn" readonly @click="getVerificationcode" :disabled="codeDisabled">
            </div>
            <div class="clearfix mgt6">
                <label for="password" class="input_left">密码</label>
                <input type="password" id="password" placeholder="6-12位字母和数字组成的密码" class="input_right" v-model="password" @blur="passwordInput">
            </div>
            <div class="clearfix mgt6">
                <label for="pwd" class="input_left">确认密码</label>
                <div class="input_right">
                    <input type="password" id="pwd" placeholder="请再次输入密码" @blur="pwdConfirmInput" v-model="pwdConfirm">
                    <p class="red_text if_same" v-show="errShow.errPwdShow">两次输入的密码不一致</p>
                </div>
            </div>
            <button class="register_confirm" @click.prevent="registerConfirm">注册</button>
            <button class="go_login" @click="$router.push('/login')">已有账号，去登录</button>
        </div>
        <common-component :refreshShow="refreshShow"></common-component>
    </div>
</template>
<script>
    import md5 from 'js-md5';
    import commonComponent from "@/components/common/common_component.vue";
    export default {
        name: "register",
        components: {
            "common-component": commonComponent
        },
        data() {
            return {
                username: "",
                phone: "",
                smsCode: "",
                password: "",
                pwdConfirm: "",
                errShow: {
                    errPhoneShow: false,
                    errPwdShow: false
                },
                validatePassword: false,
                codeDisabled: false,
                smsCodeBtn: "获取验证码",
                //配置数据
                ajaxConfig: {
                    showLoading: false
                }
            }
        },
        methods: {
            phoneInput() {
                let val = this.phone,
                    myreg = /^[1][0-9]{10}$/;
                if(!myreg.test(val)) {
                    this.errShow.errPhoneShow = true;
                }else {
                    this.errShow.errPhoneShow = false;
                }
            },
            pwdConfirmInput() {
                if(this.password !== this.pwdConfirm) {
                    this.errShow.errPwdShow = true;
                }else {
                    this.errShow.errPwdShow = false;
                }
                this.validatePassword = true;
            },
            passwordInput() {
                if(this.validatePassword) {
                    if(this.password !== this.pwdConfirm) {
                        this.errShow.errPwdShow = true;
                    }else {
                        this.errShow.errPwdShow = false;
                    }
                }
            },
            getVerificationcode() {
                console.log(this.phone)
                if(this.phone == "" || this.errShow.errPhoneShow === true) {
                    return;
                }
                //获取验证码禁用
                this.codeDisabled = true;
                let enabledNum = 30;
                this.smsCodeBtn = enabledNum;
                let myInterval = setInterval(function(self) {
                    if(enabledNum <= 0) {
                        clearInterval(myInterval);
                        self.codeDisabled = false;
                        self.smsCodeBtn = "获取验证码";
                        return;
                    };
                    self.smsCodeBtn = --enabledNum;
                },1000,this);
                //获取验证码
                let api = "/v1/getSmsCode/";
                let _this = this;
                this.$ajax.get(api + this.phone,this.ajaxConfig)
                .then((res) => {
                    res = res.data;
                    console.log(res)
                    if(res.code === 1) {
                        _this.$popup("发送成功");
                    }else {
                        _this.$popup(res.msg);
                    }
                })
                .catch(() => {
                    _this.$popup("获取失败");
                })
            },
            registerConfirm() {
                if(this.errShow.errPhoneShow || this.errShow.errPwdShow) {
                    return;
                }
                //注册
                let postData = {},
                    username = this.username.trim(),
                    phone = this.phone.trim(),
                    password = md5(this.password),
                    pwd = md5(this.pwdConfirm),
                    sms_code = this.smsCode.trim();
                postData = {
                    username,
                    phone,
                    password,
                    pwd,
                    sms_code
                };
                //此部分待补充
                // if(searchObj.promoCode) {
                //     postData.promoCode = seachObj.promoCode
                // }
                let _this = this,
                    api = "/v1/register";
                this.$ajax.post(api,postData)
                .then((res) => {
                    res = res.data;
                    console.log(res)
                    if(res.code === 1) {
                        _this.$popup("注册成功");
                    }else {
                        _this.$popup(res.msg);
                    }
                })
                .catch(() => {
                    _this.$popup("注册失败");
                })
            }
        }
    }
</script>
<style>
    @import "../../assets/css/register.css";
</style>

