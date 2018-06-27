<template>
    <div class="measureConfig">
       <el-row style="margin-bottom:15px;width:100%;">
            <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
            <el-button type="info" @click="dialogFormVisible = true">删除</el-button>
        </el-row>
        <el-table size="mini" border  :data="list">
            <el-table-column align="center" type="selection" label="序号" > </el-table-column>
            <el-table-column align="center" prop="role" label="角色" ></el-table-column>
            <el-table-column align="center" prop="remark" label="备注"> </el-table-column>
            <el-table-column align="center"  label="操作">
                <template slot-scope="scope">
                    <el-button @click="reset(row)" style="margin:0 5px" size="small" type="text">重置密码</el-button>
                    <el-button @click="edit(row)" style="margin:0 5px" size="small" type="text">编辑</el-button>
                    <el-button @click='remove(scope.row)' style="margin:0 5px" size="small" type="text">删除</el-button>
                </template> 
            </el-table-column>
        </el-table>
        <el-dialog title="新增计量单位名称" :visible.sync="dialogFormVisible">
                <el-form :model="form" size="mini">
                    <el-form-item label="用户姓名：" :label-width="formLabelWidth" required>
                        <el-input v-model="form.name" size="mini" style="width:200px;" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="账号：" :label-width="formLabelWidth" required>
                        <el-input v-model="form.account" size="mini" style="width:200px;" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" :label-width="formLabelWidth" required>
                        <el-input v-model="form.tel" size="mini" style="width:200px;" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="状态：" :label-width="formLabelWidth"  >
                        <el-select v-model="form.state" placeholder="请选择状态" style="width:200px;">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="角色：" :label-width="formLabelWidth"  >
                        <el-select v-model="form.role" placeholder="请选择角色" style="width:200px;">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设置密码：" :label-width="formLabelWidth" required>
                        <el-input v-model="form.password" size="mini" style="width:200px;" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" :label-width="formLabelWidth" required>
                        <el-input v-model="form.remark" size="mini" style="width:200px;" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="save">保存</el-button>
                </div>
            </el-dialog>
    </div>
</template>
<script>
export default{
    data(){
        return{
            dialogFormVisible:false,
            list:[
                {role:'管理员',remark:'hello'},
                {role:'采购',remark:'采购'},
                {role:'计划',remark:'计划'}
            ],
            formLabelWidth:'122px',
            form:{
                name:'',
                account:'',
                tel:'',
                state:'',
                role:'',
                password:'',
                remark:''
            }
        }
    },
    methods:{
        edit(row){

        },
        remove(row){

        },
        reset(row){

        },
        save(){
                this.dialogFormVisible=false;
                this.list.push(this.form);
            }
    }
}
</script>
<style lang="less">
.measureConfig{
    .el-dialog__footer {
        text-align: center;
    }
    .el-dialog__body {
        padding-bottom: 0;
    }
    .el-dialog {
        width: 22%;
    }
    .el-dialog__header {
        padding: 10px 20px 10px;
        border-bottom: 1px solid #eee;
    }
}
</style>

