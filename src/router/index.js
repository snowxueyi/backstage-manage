import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Frame'
import goodsSort from '@/views/content/goodsBasicInfo/goodsSort'
import addGoods from '@/views/content/goodsBasicInfo/addGoods'
import test from '@/views/content/test/test'
import goodsList from '@/views/content/goodsBasicInfo/goodsList'
import measureConfig from '@/views/content/goodsBasicInfo/measureConfig'
import supplierDetail from '@/views/content/supplierManage/supplierDetail'
import supplierAdd from '@/views/content/supplierManage/supplierAdd'
import breakOrder from '@/views/content/supplierManage/breakOrder'
import brandConfig from '@/views/content/goodsBasicInfo/brandConfig'
import account from '@/views/content/authorityManage/account'
import role from '@/views/content/authorityManage/role'
import menuManage from '@/views/content/MenuManage/MenuManage'
import login from '@/views/login'

Vue.use(Router)
export default new Router({
  routes: [
    // { path: '/', redirect: '/login' },
    //     { path: '/login', component: login,name:'login',title:'登录' },
    //     { path: '/index', component: Index,name:'index' },
    //     { path: '/index/list', component: list ,name:'list'},
    //     { path: '/index/menu', component: menu,name:'menu' },
    //     { path: '/index/detail/:id', component: detail,name:'detail' },
    //     { path: '/index/addGoods', component: addGoods,name:'addGoods' }
    //首页
    {
      path: '/',
      component: Index,
      name: 'index',
      redirect: '/login',
      children: [
        {
          path: '/goodsSort',
          name: 'goodsSort', component: goodsSort,head:'1',side:'3'
        },
        {
          path: '/test',
          name: 'test', component: test,head:'1',side:'3'
        },
        {
          path: '/supplierDetail/:id',
          name: 'supplierDetail', component: supplierDetail,head:'1',side:'9'
        },
        {
          path: '/supplierAdd',
          name: 'supplierAdd', component: supplierAdd,head:'2',side:'1'
        },
        {
          path: '/breakOrder',
          name: 'breakOrder', component: breakOrder,head:'2',side:'2'
        },
        {
          path:'/addGoods',
          name:'addGoods',
          component:addGoods
        },
        {
          path:'/goodsList',
          name:'goodsList',
          component:goodsList
        },
        {
          path:'/measureConfig',
          name:'measureConfig',
          component:measureConfig
        },
        {
          path:'/brandConfig',
          name:'brandConfig',
          component:brandConfig
        },
        {
          path:'/account',
          name:'account',
          component:account
        },
        {
          path:'/role',
          name:'role',
          component:role
        },
        {
          path:'/menuManage',
          name:'menuManage',
          component:menuManage
        }
      ]
    },
    //登录
    {
      path: '/login',
      title: '登录',
      name: 'login',
      component: login
    },
  ]
})