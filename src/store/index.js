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
  editableTabs: [
    {
      title: "新增商品",
      name: "1",
      route: "/addGoods",
      position: "1"
    }
  ],
  menuData:[
    {
      name: '1',
      title: '商品基础档案',
      icon:'el-icon-goods',
      type:'菜单',
      flag:true,
      authority:'goods',
      order:'1',
      route:'',
      children: [
        {name:'5',type:'目录',order:'1',title:'新增商品',route:'/addGoods',icon:'el-icon-goods',position:'1',authority:'addGoods'},
        {name:'6',type:'目录',order:'1',title:'商品列表',route:'/goodsList',icon:'el-icon-goods',position:'1',authority:'goodsList'},
        {name:'7',type:'目录',order:'1',title:'商品分类配置',route:'/goodsSort',icon:'el-icon-goods',position:'1',authority:'goodsSort'},
        {name:'8',type:'目录',order:'1',title:'计量单位配置',route:'/measureConfig',icon:'el-icon-goods',position:'1',authority:'measureConfig'},
        {name:'9',type:'目录',order:'1',title:'商品品牌配置',route:'/brandConfig',icon:'el-icon-goods',position:'1',authority:'brandConfig'}
        ]
    }, 
    {
      name: '2',
      title: '组织管理',
      icon:'el-icon-printer',
      type:'菜单',
      flag:true,
      authority:'organization',
      order:'1',
      route:'',
      children: [
        { name: "10",type:'目录',order:'1', title: "组织管理", position: "2",icon:'el-icon-printer', route: "supplierAdd",authority:'supplierAdd' },
        { name: "11",type:'目录',order:'1', title: "截单规则", position: "2", icon:'el-icon-printer',route: "breakOrder" ,authority:'breakOrder'}
        ]
    },
    {
      name: '3',
      title: '菜单管理',
      icon:'el-icon-menu',
      type:'菜单',
      flag:true,
      authority:'menu',
      order:'1',
      route:'',
      children: [
        { 
          name: "12",order:'1',type:'目录', title: "菜单管理", position: "3", icon:'el-icon-menu',route: "/menuManage",authority:'menuManage' ,
          children:[
            {name:'20',order:'1',type:'按钮',title:'新增',icon:'el-icon-plus',route:'',authority:'new'},
            {name:'21',order:'1',type:'按钮',title:'编辑',icon:'el-icon-edit-outline',route:'',authority:'edit'},
            {name:'22',order:'1',type:'按钮',title:'删除',icon:'el-icon-close',route:'',authority:'remove'},
            {name:'23',order:'1',type:'按钮',title:'新增下一级',icon:'el-icon-plus',route:'',authority:'add'}
          ]
        },
        ]
    }, 
    {
      name: '4',
      title: '权限管理',
      icon:'el-icon-setting',
      type:'菜单',
      flag:true,
      authority:'power',
      order:'1',
      route:'',
      children: [
        {name:'13',type:'目录',order:'1',title:'账号管理',position:'4',icon:'el-icon-setting',route:'account',authority:'account'},
        {name:'14',type:'目录',order:'1',title:'角色管理',position:'4',icon:'el-icon-setting',route:'role',authority:'role'}
        ]
    }
  ]
}

export default new Vuex.Store({
  state,
  action,
  mutations
})
