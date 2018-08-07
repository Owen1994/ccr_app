import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/pages/index.vue'
import login from '@/components/pages/login.vue'
import register from '@/components/pages/register.vue'
import forgetpassword from '@/components/pages/forget_password.vue'
import newsDetail from '@/components/pages/news_detail.vue'
import personalInfo from '@/components/pages/personal_info.vue'
import personalCenter from '@/components/pages/personal_center.vue'
import order from '@/components/pages/order.vue'
import wallet from '@/components/pages/wallet.vue'
import extentionList from '@/components/pages/extention_list.vue'
import withdrawCash from '@/components/pages/withdraw_cash.vue'
import withdrawRecord from '@/components/pages/withdraw_record.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/forgetpassword',
      name: 'forgetpassword',
      component: forgetpassword
    },
    {
      path: '/news_detail/:nid',
      name: 'newsDetail',
      component: newsDetail 
    },
    {
      path: '/personal_info',
      name: 'personalInfo',
      component: personalInfo 
    },
    {
      path: '/order',
      name: 'order',
      component: order 
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: wallet 
    },
    {
      path: '/personal_center',
      name: 'personalCenter',
      component: personalCenter 
    },
    {
      path: '/extention_list',
      name: 'extentionList',
      component: extentionList 
    },
    {
      path: '/withdraw_cash',
      name: 'withdrawCash',
      component: withdrawCash 
    },
    {
      path: '/withdraw_record',
      name: 'withdrawRecord',
      component: withdrawRecord 
    }
  ]
})
export default router
