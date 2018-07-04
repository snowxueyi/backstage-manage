import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import action from './action'
Vue.use(Vuex)

const state = {
  userInfo: null, // 用户信息
  title:"首页",
  loading:true,
  recodePhone:'',
  path:"home",
  menuData:[
    {
      name: '1',
      title: '商品基础档案',
      icon:'el-icon-goods',
      type:'菜单',
      flag:true,
      order:'1',
      children: [
        {name:'1',type:'目录',order:'1',title:'新增商品',route:'/addGoods',icon:'el-icon-goods',position:'1'},
        {name:'2',type:'目录',order:'1',title:'商品列表',route:'/goodsList',icon:'el-icon-goods',position:'1'},
        {name:'3',type:'目录',order:'1',title:'商品分类配置',route:'/goodsSort',icon:'el-icon-goods',position:'1'},
        {name:'4',type:'目录',order:'1',title:'计量单位配置',route:'/measureConfig',icon:'el-icon-goods',position:'1'},
        {name:'5',type:'目录',order:'1',title:'商品品牌配置',route:'/brandConfig',icon:'el-icon-goods',position:'1'}
        ]
    }, 
    {
      name: '2',
      title: '组织管理',
      icon:'el-icon-printer',
      type:'菜单',
      flag:true,
      order:'1',
      children: [
        { name: "6",type:'目录',order:'1', title: "组织管理", position: "2",icon:'el-icon-printer', route: "supplierAdd" },
        { name: "7",type:'目录',order:'1', title: "截单规则", position: "2", icon:'el-icon-printer',route: "breakOrder" }
        ]
    },
    {
      name: '3',
      title: '菜单管理',
      icon:'el-icon-menu',
      type:'菜单',
      flag:true,
      order:'1',
      children: [
        { name: "8",order:'1',type:'目录', title: "菜单管理", position: "3", icon:'el-icon-menu',route: "/menuManage" },
        ]
    }, 
    {
      name: '4',
      title: '权限管理',
      icon:'el-icon-setting',
      type:'菜单',
      flag:true,
      order:'1',
      children: [
        {name:'10',type:'目录',order:'1',title:'账号管理',position:'4',icon:'el-icon-setting',route:'account'},
        {name:'11',type:'目录',order:'1',title:'角色管理',position:'4',icon:'el-icon-setting',route:'role'}
        ]
    }
  ]
}

export default new Vuex.Store({
  state,
  action,
  mutations
})
