<template>
    <div>
        <div class="forget_password">
            <p class="text_center" style="font-size: .8rem;padding: 0 0 2rem;color: rgb(40, 130, 228);">忘记密码</p>
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
                <input class="get_verificationcode" :value="smsCodeBtn" readonly style="color: #000;" @click="getVerificationcode" :disabled="codeDisabled">
            </div>
            <div class="clearfix mgt6">
                <label for="password" class="input_left">新密码</label>
                <input type="password" id="password" placeholder="6-12位字母和数字组成的密码" class="input_right" @blur="passwordInput" v-model="password">
            </div>
            <div class="clearfix mgt6">
                <label for="pwd" class="input_left">确认密码</label>
                <div class="input_right">
                    <input type="password" id="pwd" placeholder="请再次输入密码" @blur="pwdConfirmInput" v-model="pwdConfirm">
                    <p class="red_text if_same" v-show="errShow.errPwdShow">两次输入的密码不一致</p>
                </div>
            </div>
            <button class="modify_confirm" @click.prevent="registerConfirm">修改密码</button>
            <button class="go_login" @click="$router.push('/login')">去登录</button>
        </div>
        <common-component></common-component>
    </div>
</template>
<script>
    import md5 from 'js-md5';
    import commonComponent from "@/components/common/common_component.vue";
    export default {
        name: "forgetpassword",
        components: {
            "common-component": commonComponent
        },
        data() {
            return {
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
                if(this.phone === "") {
                    this.$popup("请输入手机号");
                    return;
                }
                if(this.errShow.errPhoneShow === true) {
                    this.$popup("请输入正确的手机号");
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
                //验证
                if(this.phone == "") {
                    this.$popup("请输入手机号");
                    return;
                }else if(this.smsCode == "") {
                    this.$popup("请输入验证码");
                    return;
                }else if(this.password == "") {
                    this.$popup("请输入密码");
                    return;
                }
                if(this.errShow.errPhoneShow === true) {
                    this.$popup("请输入正确的手机号");
                    return;
                }
                if(this.errShow.errPwdShow === true) {
                    this.$popup("请保证两次输入的密码相同");
                    return;
                }
                //注册
                let postData = {},
                    phone = this.phone.trim(),
                    newPwd = md5(this.password),
                    sms_code = this.smsCode.trim();
                postData = {
                    phone,
                    newPwd,
                    sms_code
                };
                let _this = this,
                    api = "/v1/findPwd";
                this.$ajax.post(api,postData)
                .then((res) => {
                    res = res.data;
                    console.log(res)
                    if(res.code === 1) {
                        _this.$popup("修改成功");
                    }else {
                        _this.$popup(res.msg);
                    }
                })
                .catch(() => {
                    _this.$popup("修改失败");
                })
            }
        }
    }
</script>
<style>
    @import "../../assets/css/forget_password.css";
</style>

