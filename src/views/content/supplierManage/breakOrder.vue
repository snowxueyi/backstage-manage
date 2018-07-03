<template>
<div class="breakOrder">
    <el-row style="margin:15px 0;width:100%;">
        <el-button type="primary" @click="dialogForm1Visible = true">新增</el-button>
    </el-row>
    <el-table
    :data="tableData"
    border
    size="mini"
    style="width: 100%">
    <el-table-column 
     prop="organization"
     label="组织"
     align="center"
     width="200">
      <template slot-scope="scope">
          <el-popover
          placement="bottom"
          width="500"
          height="500"
          trigger="click">
            <el-table :data="scope.row.stationData" border size="mini">
              <el-table-column type="index" width="50" label="序号"></el-table-column>
              <el-table-column  property="name" label="服务站"></el-table-column>
              <el-table-column  property="address" label="地址"></el-table-column>
            </el-table>
            <el-button slot="reference"  size="small" type="text">{{scope.row.organization}}</el-button>
          </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      prop="breakName"
      label="截单规则名称"
      align="center"
      width="200">
      <template slot-scope="scope">
          <el-popover
          placement="bottom"
          width="500"
          height="500"
          trigger="click">
            <el-form :model="scope.row.breakData" size="mini" :rules="rules" ref="ruleForm">
                <el-form-item label="开始日期：" :label-width="formLabelWidth"  >
                  <el-date-picker v-model="scope.row.breakData.begainDate" type="date" disabled placeholder="请选择开始日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="截止日期：" :label-width="formLabelWidth"  >
                    <el-date-picker v-model="scope.row.breakData.endDate" type="date" disabled placeholder="请选择截止日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="日期类型：" :label-width="formLabelWidth"  >
                    <el-radio v-model="scope.row.breakData.dateType" label="1" disabled>当日</el-radio>
                    <el-radio v-model="scope.row.breakData.dateType" label="2" disabled>昨日</el-radio>
                </el-form-item>
                <el-form-item label="开始时间：" :label-width="formLabelWidth" >  
                    <el-time-picker v-model="scope.row.breakData.begainTime" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" disabled placeholder="开始时间"></el-time-picker>
                </el-form-item>
                <el-form-item label="截止时间：" :label-width="formLabelWidth"  >
                    <el-time-picker v-model="scope.row.breakData.endTime" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" disabled placeholder="截止时间"></el-time-picker>
                </el-form-item>
            </el-form>
            <el-button slot="reference"  size="small" type="text">{{scope.row.breakName}}</el-button>
          </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="station" label="关联的服务站" align="center" width="120"></el-table-column>
    <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
    <el-table-column prop="createPerson" label="创建人" align="center" width="120"></el-table-column>
    <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
    <el-table-column prop="updatePerson" label="更新人" align="center" width="120"></el-table-column>
    <el-table-column label="操作" align="center" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑规则</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row style="padding:15px;text-align:right">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.currentPage"
          :page-sizes="pageSizes"
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
  </el-row>
  <el-dialog title="新增规则" :visible.sync="dialogForm1Visible" center >
        <div class="content">
          <el-form :model="form" size="mini" :rules="rules" ref="ruleForm" style="flex:1;margin-right:15px;border:1px solid #eee;height:240px;padding-top:5px;">
            <el-form-item label="开始日期：" :label-width="formLabelWidth"  prop="begainDate">
              <el-date-picker v-model="form.begainDate" type="date" placeholder="请选择开始日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="截止日期：" :label-width="formLabelWidth"  prop="endDate">
                <el-date-picker v-model="form.endDate" type="date" placeholder="请选择截止日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="日期类型：" :label-width="formLabelWidth"  >
                <el-radio v-model="form.dateType" label="1">当日</el-radio>
                <el-radio v-model="form.dateType" label="2">昨日</el-radio>
            </el-form-item>
            <el-form-item label="开始时间：" :label-width="formLabelWidth"  prop="begainTime">
                <el-time-picker v-model="form.begainTime" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="开始时间"></el-time-picker>
            </el-form-item>
            <el-form-item label="截止时间：" :label-width="formLabelWidth"  prop="endTime">
                <el-time-picker v-model="form.endTime" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="截止时间"></el-time-picker>
            </el-form-item>
        </el-form>
        <div class="organization" style="flex:1;border:1px solid #eee;height:240px;overflow-y:scroll;padding-top:5px;">
          <span style="color:#409EFF;"><span style="color:#f56c6c;">*</span>&nbsp;请选择关联的组织</span>
          <el-tree :data="organizationData" node-key="id" show-checkbox default-expand-all ref="organization"></el-tree>
        </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="getCheckedNodes('organization')">保存</el-button>
        </div>
    </el-dialog>
    <el-dialog title="编辑规则" :visible.sync="dialogForm2Visible" center>
          <div class="content">
            <el-form :model="editForm" size="mini"  ref="editForm" style="flex:1;margin-right:15px;border:1px solid #eee;height:240px;padding-top:5px;">
              <el-form-item label="开始日期：" :label-width="formLabelWidth" >
                <el-date-picker v-model="editForm.begainDate" type="date" placeholder="请选择开始日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="截止日期：" :label-width="formLabelWidth"  >
                  <el-date-picker v-model="editForm.endDate" type="date" placeholder="请选择截止日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="日期类型：" :label-width="formLabelWidth"  >~
                  <el-radio v-model="editForm.dateType" label="1">当日</el-radio>
                  <el-radio v-model="editForm.dateType" label="2">昨日</el-radio>
              </el-form-item>
              <el-form-item label="开始时间：" :label-width="formLabelWidth"  >
                  <el-time-picker v-model="editForm.begainTime" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="开始时间"></el-time-picker>
              </el-form-item>
              <el-form-item label="截止时间：" :label-width="formLabelWidth"  >
                  <el-time-picker v-model="editForm.endTime" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="截止时间"></el-time-picker>
              </el-form-item>
          </el-form>
          <div class="organization" style="flex:1;border:1px solid #eee;height:240px;overflow-y:scroll;padding-top:5px;">
            <span style="color:#409EFF;"><span style="color:#f56c6c;">*</span>&nbsp;请选择关联的组织</span>
            <el-tree :data="organizationData" node-key="id" show-checkbox default-expand-all ref="organization1"></el-tree>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editRule('organization1')">保存</el-button>
            <el-button  @click="deleteRule('organization1')">删除</el-button>
            <el-button  @click="dialogForm2Visible = false">取消</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
let id = 666;
import {
  getBreakList,
  getOrganizationList,
  addRule,
  deleteRule,
  editRule
} from "@/api/index";
export default {
  data() {
    return {
      tableData: [
        {
          organization: "华东大区",
          organizationId:100000,
          breakName: "隔日发",
          station: "200",
          createTime: "2018-02-08 10:00:09",
          createPerson: "张三",
          updateTime: "2018-02-08 10:00:00",
          updatePerson: "李四",
          stationData: [
            { name: "金华服务站", id: 100011, address: "浙江省金华市" },
            { name: "杭州服务站", id: 100012, address: "浙江省杭州市" }
          ],
          breakData: {
            begainDate: "2015-12-12",
            endDate: "2015-12-28",
            begainTime: new Date(10,10,10),
            endTime: new Date(10,10,10),
            dateType: "1",
          }
        },
        {
          organization: "华北大区",
          organizationId:100001,
          breakName: "日日发",
          station: "100",
          createTime: "2018-02-08 10:00:09",
          createPerson: "张三",
          updateTime: "2018-02-08 10:00:00",
          updatePerson: "李四",
          stationData: [
            { name: "金华服务站", id: 100011, address: "浙江省金华市" },
            { name: "杭州服务站", id: 100012, address: "浙江省杭州市" }
          ],
          breakData: {
            begainDate: "2015-12-12",
            endDate: "2015-12-28",
            begainTime: new Date(10,10,10),
            endTime: new Date(10,10,10),
            dateType: "1",
          }
        },
        {
          organization: "闽浙区",
          organizationId:100002,
          breakName: "天天发",
          station: "88",
          createTime: "2018-02-08 10:00:09",
          createPerson: "张三",
          updateTime: "2018-02-08 10:00:00",
          updatePerson: "李四",
          stationData: [
            { name: "金华服务站", id: 100011, address: "浙江省金华市" },
            { name: "杭州服务站", id: 100012, address: "浙江省杭州市" }
          ],
          breakData: {
            begainDate: "2015-12-12",
            endDate: "2015-12-28",
            begainTime: new Date(10,10,10),
            endTime: new Date(10,10,10),
            dateType: "1",
          }
        }
      ],
      dialogForm1Visible: false,
      dialogForm2Visible: false,
      formLabelWidth: "122px",
      form: {
        begainDate: "",
        endDate: "",
        begainTime: null,
        endTime: null,
        dateType: "1",
      },
      editForm: {
        begainDate: "",
        endDate: "",
        begainTime: null,
        endTime: null,
        dateType: "1",
      },
      rules: {
        begainDate: [
          {
            type: "date",
            required: true,
            message: "请选择开始日期",
            trigger: "change"
          }
        ],
        begainTime: [
          {
            type: "date",
            required: true,
            message: "请选择开始时间",
            trigger: "change"
          }
        ],
        endDate: [
          {
            type: "date",
            required: true,
            message: "请选择结束日期",
            trigger: "change"
          }
        ],
        endTime: [
          {
            type: "date",
            required: true,
            message: "请选择结束时间",
            trigger: "change"
          }
        ]
      },
      params: {
        pageSize: 10,
        page: 1
      },
      pageSizes: [10, 20, 30, 40],
      total: 100,
      orgId:'',
      organizationData: [
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
      ]
    };
  },
  created(){
    //获取截单规则表格数据
    // this.getBreakOrderData()
  },
  methods: {
    //获取截单表格数据
    getBreakOrderData(){
      this.form.itemId = this.$route.params.id;//请求参数
      getBreakList(
        {
          itemId: this.$route.params.id
        },
        res => {
          if (res.code == 100) {
            this.tableData = res.data;//截单表格数据
            this.total = res.data && res.data.totalCount;
          } else {
            this.$message(res.msg ? res.msg : "请求数据失败");
          }
        }
      );
    },
    //获取组织结构数据
    getOrgData(){
      getOrganizationList(
        {
          itemId: this.$route.params.id//相关请求参数
        },
        res => {
          if (res.code == 100) {
            this.organizationData = res.data;//组织结构数据
          } else {
            this.$message(res.msg ? res.msg : "请求数据失败");
          }
        }
      );

    },
    //点击编辑组织
    handleClick(row) {
      // this.getOrganizationList();//获取组织结构数据
      this.dialogForm2Visible = true;
      this.editForm=row.breakData;//可编辑信息
      this.orgId=row.organizationId;//当前组织id
    },
    //编辑组织规则-保存
    editRule(){
      // editRule(this.editForm, data => {
      //   if (data.code == 100) {
      //     this.getBreakOrderData();//刷新页面重新获取表格数据
      //     this.dialogForm1Visible=false;
      //   } else {
      //     this.$message.error(data.msg);
      //   }
      // });
      console.log(this.editForm.begainDate);
      this.dialogForm2Visible=false;
    },
    //编辑组织规则-删除
    deleteRule(){
      // deleteRule(this.form1.name, data => {
      //   if (data.code == 100) {
      //     this.tableData.forEach((item,i)=>{
      //       if(item.organizationId==this.orgId){
      //         this.tableData.splice(i,1);
      //         this.dialogForm2Visible=false;
      //       }
      //     })
      //   } else {
      //     this.$message.error(data.msg);
      //   }
      // });
      this.tableData.forEach((item,i)=>{
        if(item.organizationId==this.orgId){
          this.tableData.splice(i,1);
          this.dialogForm2Visible=false;
        }
      })
    },
    //新增组织规则
    getCheckedNodes(dom) {
      // this.getOrganizationList();//获取组织结构数据
      var orgData = this.$refs[dom].getCheckedNodes();
      console.log(this.$refs[dom].getCheckedNodes());
      console.log(new Date(this.form.endDate));
      this.$refs.ruleForm.validate(valid => {
        if (valid & (orgData.length !== 0)) {
          addRule(this.form, data => {
            if (data.code == 100) {
              this.getBreakOrderData();//刷新页面重新获取表格数据
              this.dialogForm1Visible=false;
            } else {
              this.$message.error(data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //分页
    handleSizeChange(e) {
      this.params.pageSize = e;
      this.params.page = 1;
      this.getBreakOrderData();
    },
    handleCurrentChange(e) {
      this.params.page = e;
      this.getBreakOrderData();
    },
  }
};
</script>

<style lang="less">
.breakOrder {
  .el-dialog__header {
    padding-top: 15px;
  }
  .el-dialog__body {
    padding-top: 15px;
  }
  .el-switch {
    margin-left: 20%;
    margin-bottom: 15px;
  }
  .el-input-group__append {
    padding: 0 10px;
  }
  .content {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    // align-items: center;
    // justify-content: space-between;
    font-size: 14px;
  }
  .el-dialog{
    width:66%;
  }
}
</style>

