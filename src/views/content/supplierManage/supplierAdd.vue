
<template>
    <div class="organizationAdd">
        <el-input
        placeholder="请输入组织名称或服务站ID查询"
        v-model="filterText"
        style="width:30%;margin:20px 0;">
        </el-input>
        <div class="custom-tree-node" style="width:80%;">
            <el-tree
            :data="data5"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            ref="organization"
            style="flex:1;border:1px solid #eee;margin-right:20px;height:500px;">
                <span class="custom-tree-node" slot-scope="{ node, data }" @click="()=>showStation(data)">
                    <span>{{ node.label }}</span>
                    <span style="color:#ccc;!important;">
                        <a
                            @click="()=>append(data)"
                            class="el-icon-plus"
                            style="margin-right:10px;">
                        </a>
                        <a
                            @click="()=>edit(node,data)"
                            class="el-icon-edit-outline">
                        </a>
                    </span>
                </span>
            </el-tree>
            <!-- 新增组织弹出框-->
            <el-dialog title="新建组织" :visible.sync="dialogForm1Visible" center>
                <el-form :model="form1">
                    <el-form-item label="组织名称：" :label-width="formLabelWidth">
                        <el-input v-model="form1.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="组织ID：" :label-width="formLabelWidth">
                        <el-input v-model="form1.id" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogForm1Visible = false">取 消</el-button>
                    <el-button type="primary" @click="appendSave">保 存</el-button>
                </div>
            </el-dialog>
            <!-- 编辑组织弹出框-->
            <el-dialog title="编辑组织" :visible.sync="dialogForm2Visible" center>
                <el-form :model="form1">
                    <el-form-item label="组织名称：" :label-width="formLabelWidth">
                        <el-input v-model="form2.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="组织ID：" :label-width="formLabelWidth">
                        <el-input v-model="form2.id" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间：" :label-width="formLabelWidth">
                        <el-input v-model="form2.createTime" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人：" :label-width="formLabelWidth">
                        <el-input v-model="form2.createPerson" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="编辑时间：" :label-width="formLabelWidth">
                        <el-input v-model="form2.editTime" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="编辑人：" :label-width="formLabelWidth">
                        <el-input v-model="form2.editPerson" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="editSave()">保 存</el-button>
                    <el-button type="primary" @click="deleteOrganization()">删 除</el-button>
                    <el-button @click="dialogForm2Visible = false">取 消</el-button>
                </div>
            </el-dialog>
            <div class="stationAll" style="flex:1;border:1px solid #eee;height:200px;">
                <div class="title custom-tree-node" style="align-items: center;padding-left:5px;">
                    <span>{{title}}</span>
                    <el-button type="text" @click="addStation(stationId)"><i class="el-icon-plus"></i>新增服务站</el-button>
                </div>
                <ul class="station-list"> 
                    <li :key="index" v-for="(item,index) in stationList" > 
                            <span class="province">{{item.province}}</span> 
                            <dl  class="station" v-if="item.station.length"> 
                                <dd class="station-item custom-tree-node" :key="index1" v-for="(item1,index1) in item.station" :style="index1==item.station.length-1?'':'border-bottom:1px solid #eee;'">
                                        <span>{{item1.name}}</span>
                                        <span class=" delete el-icon-delete" @click="deleteStation(item1.id)"></span>
                                </dd>  
                            </dl> 
                    </li> 
                </ul> 
            </div>
            <!-- 新增服务站弹出框-->
            <el-dialog title="选择销售区域" :visible.sync="dialogForm3Visible" center>
                <el-form :model="form1">
                    <el-form-item label="销售区域：" :label-width="formLabelWidth">
                        <el-cascader
                        :options="options"
                        v-model="selectData"
                        change-on-select
                        @change="selectChange"
                      ></el-cascader>
                    </el-form-item>
                    <el-form-item label="服务站：" :label-width="formLabelWidth">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedStations" @change="handleCheckedCitiesChange">
                          <el-checkbox v-for="station in stations" :label="station" :key="station.id" style="display:block;margin:0;">{{station.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
let id = 666;
import {
  addOrganization,
  editOrganization,
  showStation,
  deleteStation,
  deleteOrganization,
  selectAddStation,
  selectArea
} from "@/api/index";
import {getCitys} from "@/store/contain";
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "快准车服",
        children: [
          {
            id: 100001,
            label: "(100001) 华南区"
          },
          {
            id: 1000002,
            label: "(1000002) 华东大区",
            children: [
              {
                id: 200003,
                label: "(200003) 江浙区"
              },
              {
                id: 200004,
                label: "(200004) 闽浙区"
              }
            ]
          }
        ]
      }
    ];
    return {
      filterText: "",
      data5: JSON.parse(JSON.stringify(data)),
      dialogForm1Visible: false,
      dialogForm2Visible: false,
      dialogForm3Visible: false,
      form1: {
        name: "",
        id: ""
      },
      form2: {
        name: "华东大区",
        id: "888888",
        createTime: "2018-05-02 10:00:00",
        createPerson: "张三",
        editTime: "2018-07-02 10:00:00",
        editPerson: "李四"
      },
      formLabelWidth: "120px",
      stationList: [],
      title: "请选择相应组织，对应展示相应服务站",
      stationId: "",
      editOrganization: { node: {}, data: {} },
      addOrganization: {},
      options:getCitys(),
      checkAll: false,
      checkedStations: [],
      stations: [{name:'武汉服务站',id:999},{name:'上海服务站',id:666}],
      isIndeterminate: true,
      selectData:[]
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
    editOrganization(val) {}
  },
  methods: {
    append(data) {
      this.dialogForm1Visible = true;
      this.addOrganization = data;
      this.form1.id = 888888;
    },
    appendSave() {
      const newChild = {
        id: this.form1.id,
        label: this.form1.name,
        children: []
      };
      if (!this.addOrganization.children) {
        this.$set(this.addOrganization, "children", []);
      }
      //新增组织接口校验
      // addOrganization(this.form1.name, data => {
      //     if (data.code == 100) {
      //       this.addOrganization.children.push(newChild);
      //       this.dialogForm1Visible=false;
      //     } else {
      //       this.$message.error(data.msg);
      //     }
      //   });
      this.addOrganization.children.push(newChild);
      this.dialogForm1Visible = false;
      return false;
    },
    edit(node, data) {
      this.dialogForm2Visible = true;
      this.editOrganization.data = data;
      this.editOrganization.node = node;
      this.form2.name = data.label;
      console.log(this.editOrganization.data);
      // data.label=this.form2.name;
    },
    editSave() {
      var data = this.editOrganization.data;
      var node = this.editOrganization.node;
      console.log(data.$treeNodeId);
      //编辑组织并保存接口请求
      // editOrganization(this.form2.name, data => {
      //     if (data.code == 100) {
      //       data.label=this.form2.name;
      //       this.dialogForm2Visible=false;
      //     } else {
      //       this.$message.error(data.msg);
      //     }
      //   });
      data.label = this.form2.name;
      this.dialogForm2Visible = false;
      return false;
    },
    deleteOrganization() {
      var id = this.editOrganization.data.id;
      var node = this.editOrganization.node;
      //删除父组织
      if (this.editOrganization.children) {
        this.$message("请先删除相应子组织");
        return false;
      }
      // ajax请求删除对应组织信息
      //   deleteOrganization(id, data => {
      //         if (data.code == 100) {
      //           // 根据Id，从组织中删除对应组织数据
      //             const parent = node.parent;
      //             const children = parent.data.children || parent.data;
      //             const index = children.findIndex(d => d.id === id);
      //             children.splice(index, 1);
      //             this.dialogForm2Visible = false;
      //         } else {
      //           this.$message.error(data.msg);
      //         }
      //     });
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === id);
      children.splice(index, 1);
      this.dialogForm2Visible = false;
    },
    deleteStation(id) {
      console.log(id);
      //ajax请求删除对应服务站信息
      //   deleteStation(id, data => {
      //         if (data.code == 100) {
      //           // 根据Id，从stationList 中删除对应服务站数据
      //             this.stationList.forEach(item => {
      //                 item.station.some((item1,i)=>{
      //                     if (item1.id == id) {
      //                         item.station.splice(i, 1)
      //                         return true;
      //                     }
      //                 })
      //             })
      //         } else {
      //           this.$message.error(data.msg);
      //         }
      //     });

      //前端数据模拟
      this.stationList.forEach(item => {
        item.station.forEach((item1, i) => {
          if (item1.id == id) {
            console.log(item1);
            item.station.splice(i, 1);
            return true;
          }
        });
      });
    },
    addStation(id) {
      console.log(id);
      //组织为空判断
      if (id == null || id == undefined || id == "") {
        this.$message.error("请先选择组织，才能新增服务站");
        return false;
      }
      this.dialogForm3Visible = true;
    },
    //新增服务站全选逻辑
    handleCheckAllChange(val) {
        this.checkedStations = val ? this.stations : [];
        this.isIndeterminate = false;
        console.log(val);
      },
    //新增服务站选中逻辑
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.stations.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.stations.length;
        console.log(value);
        var province=this.selectData[0];
        //ajax请求新增服务站
        // selectAddStation(value, data => {
        //       if (data.code == 100) {
        //         this.stationList.forech(item=>{
        //           if(item.province==province){
        //             item.station.push(value);
        //           }
        //         })
        //       } else {
        //         this.$message.error(data.msg);
        //       }
        //     });
        this.stationList.forEach(item=>{
                  if(item.province==province){
                    for(var i in value){
                      if(checkedCount!==0){
                        const station=item.station;
                        console.log(station);
                        item.station.push(value[i]);
                        var index=item.station.indexOf(value);
                      }
                    }
                  }
                })
      },
      selectChange(){
        // console.log(this.selectData)
        //ajax请求选择省市区展示对应服务站selectArea
          // selectArea(this.selectData, data => {
          //     if (data.code == 100) {
          //       this.stations=data.stations;
          //     } else {
          //       this.$message.error(data.msg);
          //     }
          //   });
      },
    showStation(data) {
      if (data.id == 1) {
        return false; //一级组织不展示对应服务站
      }
      this.title = data.label + "对应服务站";
      this.stationId = data.id;
      //ajax请求获取对应服务站
      //   showStation(data.id, data => {
      //         if (data.code == 100) {
      //           this.stationList=data.stationList;
      //           this.dialogForm1Visible=false;
      //         } else {
      //           this.$message.error(data.msg);
      //         }
      //       });

      //前端数据模拟
      this.stationList = [
        {
          province: "浙江",
          station: [
            { name: "金华服务站", id: 101 },
            { name: "嘉兴服务站", id: 102 },
            { name: "舟山服务站", id: 103 },
            { name: "台州服务站", id: 104 }
          ]
        },
        {
          province: "江苏",
          station: [
            { name: "徐州服务站", id: 105 },
            { name: "南京服务站", id: 106 },
            { name: "苏州服务站", id: 107 },
            { name: "无锡服务站", id: 108 }
          ]
        },
        {
          province: "安徽",
          station: [
            { name: "合肥服务站", id: 109 },
            { name: "黄山服务站", id: 110 },
            { name: "宣城服务站", id: 111 },
            { name: "安庆服务站", id: 112 }
          ]
        }
      ];
    }
  }
};
</script>

<style lang="less">
.organizationAdd {
  .custom-tree-node {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    // align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  ul,
  li,
  dl,
  dd {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .province {
    background-color: #eee;
    display: block;
    height: 30px;
    line-height: 30px;
    padding-left: 5px;
  }
  .station-item {
    padding: 0 5px;
    height: 30px;
    line-height: 30px;
    align-items: center;
    .delete {
      cursor: pointer;
    }
  }
  .station-item:hover {
    background-color: #f7f7f7;
  }
}
</style>

