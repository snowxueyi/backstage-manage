const SET_TITLE = 'SET_TITLE'
const GET_USERINFO = 'GET_USERINFO'
const RECORD_USERINFO = 'RECORD_USERINFO'
const RECORD_PHONE = 'RECORD_PHONE'
const GETRECORD_PHONE = 'GETRECORD_PHONE'
const SET_LOADING = 'SET_LOADING'
const SET_PATH = 'SET_PATH'
const SET_HEADNAV='SET_HEADNAV'
const SET_SIDENAV='SET_SIDENAV'
const EDIT_LIST='EDIT_LIST'
const DELETE_LIST='DELETE_LIST'
const ADD_LIST='ADD_LIST'
const ADD_MENU='ADD_MENU'
const ADD_TAB='ADD_TAB'
const TAB_CLICK='TAB_CLICK'

import { setStore, getStore } from '../utils/storage'
export default {
  //记住登录账号
  [RECORD_PHONE](state,phone){
    if(phone&&/1\d{10}/.test(phone)){
      setStore("recodePhone",phone);
      state.recodePhone=phone;
    }
  },
  //同步记住的账号
  [GETRECORD_PHONE](state){
    let phone = getStore("recodePhone");
    if(phone&&/1\d{10}/.test(phone)){
      state.recodePhone=phone;
    }
  },
  // 设置加载完成状态
  [SET_PATH] (state,path){
    state.path=path
  },
  // 设置加载完成状态
  [SET_LOADING] (state,load){
    state.loading=load
  },
  // 设置页面路径标题
  [SET_TITLE] (state,title){
    state.title=title
  },
  //设置页面顶部tab位置 
  [SET_HEADNAV] (state,activeName){
    state.activeName=activeName
  },
  //设置页面侧边栏tab位置
  [SET_SIDENAV] (state,asideActive){
    state.asideActive=asideActive
  },
  // 记录用户信息
  [RECORD_USERINFO] (state, info) {
    state.userInfo = info
    setStore('userInfo', info)
  },
  // 获取用户信息
  [GET_USERINFO] (state) {
    if (state.userInfo) {
      return
    }
    let info = getStore("userInfo");
    try{
      info=JSON.parse(info);
    }catch(e){
      info=null;
    }
    if (info) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  },
   // 编辑菜单
   [EDIT_LIST] (state, info) {
    state.menuData.forEach((item,i)=>{
      if(item.name==info.newMenu.name){
          item.title=info.form.title;
          item.icon=info.form.icon;
          item.order=info.form.order;
          item.route=info.form.route;
          item.type=info.form.type;
          item.children=info.newMenu.children;
      }
      console.log(state.menuData);
    })
  },
   // 删除菜单
   [DELETE_LIST] (state, info) {
    state.menuData.forEach((item,i)=>{
      if(item.name==info.name){
        state.menuData.splice(i,1);
        console.log(state.menuData);
      }else{
            if(item.name==info.position){
                item.children.filter((item1,k)=>{
                    if(item1.name==info.name){
                        item.children.splice(k,1)
                    }
                })
            }
            console.log(state.menuData);
      }
    })
  },
  //新增目录
  [ADD_LIST](state,info){
    state.menuData.forEach(item=>{
      if(item.name==info.newMenu.name){
          item.children.push(info.newChild);
      }
  })
  },
  //新增菜单
  [ADD_MENU](state,info){
    state.menuData.push(info);
  },
  //新增内部tab栏
  [ADD_TAB](state,info){
    var flag = false;
      state.editableTabs.forEach(item => {
        if (item.name == info.name) {
          flag = true;
          return true;
        }
      });
      if (!flag) {
        state.editableTabs.push({
          title: info.title,
          name: info.name,
          route: info.route,
          position: info.position
        });
      }
      console.log(state.editableTabs);
  },
  [TAB_CLICK](state,info){
    state.editableTabs.forEach(item => {
      if (item.name == info.name) {
        path = item.route;
        current = item.position;
        asideIndex=item.name;
        return this.asideActive;
      }
    });
  }
}
