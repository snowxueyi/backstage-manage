<template>
  <div class="framConstruction">
      <div class="el-header" style="background-color: #4b84ff;width:100%;position:fixed;z-index:667;height:60px;">
            <div class="logo">快准运营平台</div>
            <div class="menu" style="position:absolute;left:200px;">
              <el-menu
                :default-active="activeName"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#4b84ff"
                text-color="#fff"
                active-text-color="#ffd04b" >
                <el-menu-item :index="item.id" :key="item.id" v-for="item in menuList" >{{item.label}}</el-menu-item>
              </el-menu>
            </div>
            <div class="loginout" style="height:60px;line-height:60px;color:#fff;width:150px;position:absolute;right:10px;">
              <div class="rightTab" style="position:relative;">
                <img src="http://dgj2test.kzmall.cc/statics/images/0.jpg?ver=1527735523" alt="" style="position:absolute;top:15px;left:-40px;">
                <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    admin管理员&nbsp;&nbsp;&nbsp;<i class="icon iconfont icon-poweroff"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item command="1">退出系统</el-dropdown-item>
                    <el-dropdown-item command="2">切换账号</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
      </div>
          <el-aside class="menu-warp" width="200px" style="height:100%">
            <div  style="height:100%">
              <el-menu
                :key="item.id" 
                v-for="item in menuList"
                style="height:100%"
                :default-active="asideActive"
                class="el-menu-vertical-demo"
                background-color="#fff"
                text-color="#333"
                v-if="index==item.id"
                active-text-color="#ffd04b">
                <el-menu-item :index="item1.name" :key="item1.title" v-for="item1 in item.children" @click="addtab(item1)">
                  <router-link :to="`${item1.route}`" tag="div">
                    <div>
                      <i class="el-icon-menu"></i>
                      <span slot="title">{{item1.title}}</span>
                    </div>
                  </router-link>
                </el-menu-item>
              </el-menu>
            </div>
          </el-aside>
          <el-main style="position:absolute;top:60px;left:200px;height:auto;bottom:0;right:0;background:#f8f9fb;overflow:hidden;overflow-y:auto;width:auto;z-index:666;">
            <div class="contain">
              <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit" @tab-click="tabClick">
                <el-tab-pane
                  :key="item.name"
                  v-for="item in editableTabs"
                  :label="item.title"
                  :name="item.name"
                >
                  <router-view class="main"></router-view>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-main>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      menu: [],
      activeName: "1",
      index: "1",
      asideActive:'1',
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "新增商品",
          name: "1",
          route: "/addGoods",
          position: "1"
        }
      ],
      tabIndex: 1,
      menuList: [
        {
          id: '1',
          label: '商品基础档案',
          children: [
            {name:'1',title:'新增商品',route:'/addGoods',position:'1'},
            {name:'2',title:'商品列表',route:'/goodsList',position:'1'},
            {name:'3',title:'商品分类配置',route:'/goodsSort',position:'1'},
            {name:'4',title:'计量单位配置',route:'/measureConfig',position:'1'},
            {name:'5',title:'商品品牌配置',route:'/brandConfig',position:'1'}
            ]
        }, 
        {
          id: '2',
          label: '组织管理',
          children: [
            { name: "6", title: "组织管理", position: "2", route: "supplierAdd" },
            { name: "7", title: "截单规则", position: "2", route: "breakOrder" }
            ]
        },
        {
          id: '3',
          label: '菜单管理',
          children: [
            { name: "8", title: "菜单管理", position: "3", route: "menuManage" },
            ]
        }, 
        {
          id: '4',
          label: '权限管理',
          children: [
            {name:'10',title:'账号管理',position:'4',route:'account'},
            {name:'11',title:'角色管理',position:'4',route:'role'}
            ]
        }
      ]
    };
  },
  computed: {
    ...mapState(["title", "path"])
  },
  watch: {
    index: function(newVal, oldVal) {
      this.activeName = newVal;
    }
  },
  components: {},
  mounted() {},
  ...mapMutations(["SET_PATH", "SET_TITLE"]),
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.index = key;
    },
    handleTabsEdit(targetName, action) {
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content"
        });
        this.editableTabsValue = newTabName;
      }
      if (action === "remove") {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        var path='';
        var current='';
        var asideIndex='';
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                this.editableTabs.forEach(item => {
                  if (item.name == activeName) {
                    path = item.route;
                    current = item.position;
                    asideIndex=item.name;
                    return path;
                  }
                });
                this.$router.push(`${path}`);
                this.activeName = current;
                this.index = current;
                this.asideActive=activeName;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
      console.log(this.asideActive);
      return this.asideActive;
    },
    addtab: function(object) {
      var flag = false;
      this.editableTabs.forEach(item => {
        if (item.name == object.name) {
          flag = true;
          return true;
        }
      });
      if (!flag) {
        this.editableTabs.push({
          title: object.title,
          name: object.name,
          route: object.route,
          position: object.position
        });
      }
      this.editableTabsValue = object.name;
      return this.editableTabs;
    },
    tabClick: function(value) {
      var path = "";
      var current = "";
      var asideIndex="";
      this.editableTabs.forEach(item => {
        if (item.name == value.name) {
          path = item.route;
          current = item.position;
          asideIndex=item.name;
          return this.asideActive;
        }
      });
      // return path;
      this.activeName = current;
      this.index = current;
      this.asideActive=asideIndex;
      // this.SET_PATH(value.$route.fullPath);
      this.$router.push(`${path}`);
      console.log(this.asideActive);
    },
    handleCommand(command) {
      this.$router.push("/login");
      this.$message('click on item ' + command);
    }
  }
};
</script>

<style lang="less" >
body {
  margin: 0;
  padding: 0;
  .framConstruction{
    .menu-warp {
      width: 200px;
      height: 100%;
      position: fixed;
      left: 0px;
      top: 60px;
      z-index:665;
    }
    .el-main{
      padding-top:0;
    }
    .el-header .logo {
      text-align: center;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      height: 60px;
      line-height: 60px;
      width: 200px;
      position: absolute;
      left:0;
      top:0;
    }
    .contain {
      background: #f8f9fb;
      .el-tabs__header{
        background: #f8f9fb;
        padding-top: 20px;
        position: fixed;
        z-index:1;
        top:60px;
        height: 40px;
        width:100%;
        border-bottom:none;
        padding-bottom: 10px;
        .el-tabs__nav-wrap {
            border-bottom: 1px solid #e4e7ed;
            height: 40px;
        }
      }
      .el-tabs__content{
        background: #fff;
        // position: absolute;
        // top: 61px;
        // margin-top: 15px;
        padding: 20px;
        width: 99%;
        padding-top:70px;
      }
    } 
    .el-dropdown {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }
    .el-menu--horizontal {
      border: none;
    }
    .el-menu {
      border: none;
    }
    .el-submenu__title,
    .menubar {
      background-color: #fff;
      color: #333;
    }
    aside .is-active {
      color: #4b84ff !important;
      background-color: #e4edff !important;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
        border-bottom-color: #f8f9fb;
    }
    aside .el-menu-item:hover {
      background-color: #e4edff !important;
    }
    aside .el-menu {
      border-right: 1px solid #eee;
    }
    .el-header .is-active {
      background-color: #598eff !important;
      color: #fff !important;
      border-bottom: none !important;
    }
    .el-header .el-menu-item:hover {
      background-color: #598eff !important;
    }
    .el-tabs__new-tab {
      display: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border-top-color: #4b84ff;
      border-left: none;
      border-right: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item[tabindex="-1"] {
      margin-top: -1px;
      border-top: 1px solid #f8f9fb;
      border-left: none;
      border-right: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-closable {
      border-right: 1px solid #e4e7ed;
      border-left: 1px solid #e4e7ed;
    }
  }
}
</style>

