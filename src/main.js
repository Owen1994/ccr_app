import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
//引入公共文件
import "@/assets/css/common.css"
import "@/assets/css/fonts/font-awesome/css/font-awesome.min.css"

// 引入插件
import commonJs from "@/assets/js/views/common.js"
Vue.use(commonJs)

//引入vuex
import store from "@/store";

//引入axios
import axios from "axios"
// axios.defaults.baseURL = "http://192.168.1.119:8081"   //请求ip设置
axios.defaults.timeout = 10000
axios.interceptors.request.use((config) => {
    if(config.showLoading) {
      let popupEle = document.querySelector(".mask");
      popupEle.style.display = "block";
    }
    return config
})
axios.interceptors.response.use((response) => {
    let popupEle = document.querySelector(".mask");
    popupEle.style.display = "none";
    return response
})
Vue.prototype.$ajax = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
