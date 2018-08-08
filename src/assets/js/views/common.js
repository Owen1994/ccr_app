import Vue from "vue";
export default {
    install(Vue,options) {
        //手机号四位隐蔽
        Vue.prototype.$phoneCover = () => {
            num = num.toString();
            let numArr = num.split("");
            let newPhoneNum = "";
            for(var i=0;i<numArr.length;i++) {
                if(i<3 || i>6) {
                    newPhoneNum += numArr[i];
                }else {
                    newPhoneNum += "*";
                }
            }
            return newPhoneNum;
        }
        //手机号验证
        Vue.prototype.$phoneValidate = (phoneNum) => {
            let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if(reg.test(phoneNum)) {
                return true;
            }else {
                return false;
            }
        }
        //页面弹框
        Vue.prototype.$popup = (word) => {
            let popupEle = document.querySelector(".popup");
            popupEle.innerHTML = word;
            popupEle.style.display = "block";
            setTimeout(() => {
                popupEle.style.display = "none";
            }, 2000);
        }
        //时间格式化
        Vue.prototype.$formatDate = (date) => {
            var year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate(),
                hour = date.getHours(),
                minute = date.getMinutes();
            return year + "-" + month + "-" + day + " " + hour + ":" + minute;
        }
        //localstorage方法
        Vue.prototype.$getItem = (item) => {
            item = localStorage.getItem(item)
            return JSON.parse(item);
        }
        Vue.prototype.$setItem = (key,value) => {
            let val = JSON.stringify(value)
            return localStorage.setItem(key,val);
        }
        //rem自适应方法
        const setEnableFontUnitToRem = (enabled,size,multiple) => {
            if(enabled) {
                var root = document.documentElement;
                var rem = root.clientWidth / parseFloat(size) * 10;
                rem = (rem >= 8) ? 8 : rem;
                root.style.fontSize = rem * parseFloat(multiple) * 10 + "px";
            }
        }
        setEnableFontUnitToRem(true,750,.5);
    }
}