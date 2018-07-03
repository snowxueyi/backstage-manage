<template>
    <div class="measureConfig">
       <el-row style="margin-bottom:15px;width:100%;">
            <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        </el-row>
        <el-table size="mini" border  :data="list">
            <el-table-column align="center" prop="num" label="编号" > </el-table-column>
            <el-table-column align="center" prop="name" label="名称" ></el-table-column>
            <el-table-column align="center" label="图标"> 
                <template slot-scope="scope">
                    <i :class="scope.row.icon"></i>
                </template> 
            </el-table-column>
            <el-table-column
                prop="type"
                label="类型"
                align="center"
                width="100">
                <template slot-scope="scope">
                    <el-tag
                    :type="scope.row.type === '目录' ? 'primary' : 'success'"
                    disable-transitions>{{scope.row.type}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="order" label="排序编号"> </el-table-column>
            <el-table-column align="center"  label="操作">
                <template slot-scope="scope">
                    <span style="margin:0 5px;color:#66b1ff;cursor:pointer;">
                        <i class="el-icon-edit-outline"></i>
                        <el-button @click="edit(row)" size="small" type="text">编辑</el-button>
                    </span>
                     <span style="margin:0 5px;color:#66b1ff;cursor:pointer;">
                        <i class="el-icon-close"></i>
                        <el-button @click='remove(scope.row)' size="small" type="text">删除</el-button>
                    </span>
                     <span style="margin:0 5px;color:#66b1ff;cursor:pointer;">
                        <i class="el-icon-plus"></i>
                        <el-button @click="edit(row)" size="small" type="text">添加下级</el-button>
                    </span>
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
                {num:'111',name:'商品配置',order:'1',type:'目录',icon:'el-icon-edit-outline'},
                {num:'111',name:'组织管理',order:'1',type:'菜单',icon:'el-icon-edit-outline'},
                {num:'111',name:'权限管理',order:'1',type:'目录',icon:'el-icon-edit-outline'}
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

