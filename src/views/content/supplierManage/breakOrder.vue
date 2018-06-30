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
            <el-table :data="scope.row.breakData.data" border size="mini" v-if="scope.row.breakData.mark==1">
              <el-table-column  property="name" ></el-table-column>
              <el-table-column  property="time" label="截单时间"></el-table-column>
            </el-table>
            <el-form :model="scope.row.breakData.data" v-if="scope.row.breakData.mark==2">
              <el-form-item label="规则开始时间：" :label-width="formLabelWidth">
                <el-input v-model="scope.row.breakData.data.begainTime" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="间隔周期：" :label-width="formLabelWidth">
                <el-input v-model="scope.row.breakData.data.cycle" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="下次执行时间：" :label-width="formLabelWidth">
                <el-input v-model="scope.row.breakData.data.nextTime" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
            </el-form>
            <el-button slot="reference"  size="small" type="text">{{scope.row.breakName}}</el-button>
          </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      prop="station"
      label="关联的服务站"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="createPerson"
      label="创建人"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="更新时间"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="updatePerson"
      label="更新人"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑规则</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="新增规则" :visible.sync="dialogForm1Visible">
        <el-form :model="form" size="mini">
            <el-form-item label="所属分类：" :label-width="formLabelWidth"  >
                <el-select v-model="form.belongSort" placeholder="请选择品牌类型" style="width:200px;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="计量单位名称：" :label-width="formLabelWidth" required>
                <el-input v-model="form.measureName" size="mini" style="width:200px;"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </el-dialog>
    <el-dialog title="编辑规则" :visible.sync="dialogForm2Visible" width="30%" center>
          <el-switch v-model="configRule" active-text="按周配置" inactive-text="按时间间隔配置"> </el-switch>
            <el-form :model="form1" size="mini" v-if="configRule">
                <el-form-item label="规则命名：" :label-width="formLabelWidth" required>
                    <el-input v-model="form1.breakName" size="mini" style="width:200px;"></el-input>
                  </el-form-item>
                  <el-form-item label="时间：" :label-width="formLabelWidth" required>
                    <el-input v-model="form1.time" size="mini" style="width:200px;"></el-input>
                  </el-form-item>
                  <el-form-item label="间隔周期：" :label-width="formLabelWidth" required>
                    <el-input v-model="form1.cycle" size="mini" style="width:200px;"></el-input>
                  </el-form-item>
            </el-form>
            <el-form :model="form2" size="mini" v-else>
                <el-form-item label="规则命名：" :label-width="formLabelWidth" required>
                    <el-input v-model="form2.breakName" size="mini" style="width:200px;"></el-input>
                  </el-form-item>
                  <el-form-item label="开始时间：" :label-width="formLabelWidth" required>
                    <el-input v-model="form2.breakData.data.begainTime" size="mini" style="width:200px;"></el-input>
                  </el-form-item>
                  <el-form-item label="间隔周期：" :label-width="formLabelWidth" required>
                    <el-input v-model="form2.breakData.data.cycle" size="mini" style="width:200px;"></el-input>
                  </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="save">保存</el-button>
            </div>
        </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
        tableData: [{
            organization: '华东大区',
            breakName: '隔日发',
            station: '200',
            createTime: '2018-02-08 10:00:09',
            createPerson: '张三',
            updateTime: '2018-02-08 10:00:00',
            updatePerson:'李四',
            stationData:[
              {name:'金华服务站',id:100011,address:'浙江省金华市'},
              {name:'杭州服务站',id:100012,address:'浙江省杭州市'}
            ],
            breakData:{
              mark:1,
              data:[
                {week:'monday',name:'周一',time:['10:00  ','11:00']},
                {week:'tuesday',name:'周二',time:[]},
                {week:'wensday',name:'周三',time:['10:00  ','11:00']},
                {week:'thursday',name:'周四',time:[]},
                {week:'friday',name:'周五',time:['10:00  ','11:00']},
                {week:'saturday',name:'周六',time:[]}
                ]
              }
            }, {
            organization: '华北大区',
            breakName: '日日发',
            station: '100',
            createTime: '2018-02-08 10:00:09',
            createPerson: '张三',
            updateTime: '2018-02-08 10:00:00',
            updatePerson:'李四',
            stationData:[
              {name:'金华服务站',id:100011,address:'浙江省金华市'},
              {name:'杭州服务站',id:100012,address:'浙江省杭州市'}
            ],
            breakData:{
              mark:2,
              data:{begainTime:'2018-07-01 10:00:00',nextTime:'2018-08-01 10:00:00',cycle:'24:00'}
            }
            },{
            organization: '闽浙区',
            breakName: '天天发',
            station: '88',
            createTime: '2018-02-08 10:00:09',
            createPerson: '张三',
            updateTime: '2018-02-08 10:00:00',
            updatePerson:'李四',
            stationData:[
              {name:'金华服务站',id:100011,address:'浙江省金华市'},
              {name:'杭州服务站',id:100012,address:'浙江省杭州市'}
            ],
            breakData:{
              mark:2,
              data:{begainTime:'2018-07-01 10:00:00',nextTime:'2018-08-01 10:00:00',cycle:'24:00'}
            }
            }
        ],
        dialogForm1Visible:false,
        dialogForm2Visible:false,
        formLabelWidth:'122px',
        form:{belongSort:'',measureName:''},
        form1:{},
        form1:{breakName:'',breakData:{time:'',cycle:''}},
        form2:{breakName:'',breakData:{mark:'',data:{begainTime:'',cycle:''}}},
        configRule:true
    };
  },
  methods:{
      handleClick(row){
        this.configRule=true;
        this.dialogForm2Visible=true;
        if(row.breakData.mark==1){
          this.form2={breakName:'',breakData:{mark:'',data:{begainTime:'',cycle:''}}};
          this.form1=row;
        }else{
          this.form1={breakName:'',breakData:{time:'',cycle:''}};
          this.form2=row;
        }
        
      },
      save(){

      }
  }
};
</script>

<style lang="less">
.breakOrder{
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
}
</style>

