<template>
    <div class="measureConfig">
       <el-row style="margin-bottom:15px;width:100%;">
            <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        </el-row>
        <el-table size="mini" border  :data="list">
            <el-table-column align="center" type="index" label="序号" > </el-table-column>
            <el-table-column align="center" prop="belongSort" label="所属分类" ></el-table-column>
            <el-table-column align="center" prop="measureName" label="计量单位名称"> </el-table-column>
            <el-table-column align="center"  label="操作">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.$index)" style="margin:0 5px" size="small" type="text">编辑</el-button>
                    <el-button @click='remove(scope.column)' style="margin:0 5px" size="small" type="text">删除</el-button>
                </template> 
            </el-table-column>
        </el-table>
        <el-dialog title="新增计量单位名称" :visible.sync="dialogFormVisible">
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
    </div>
</template>
<script>
export default{
    data(){
        return{
            dialogFormVisible:false,
            list:[
                {belongSort:'一级分类',measureName:'立方米'},
                {belongSort:'二级分类',measureName:'个'},
                {belongSort:'三级分类',measureName:'立方米'}
            ],
            formLabelWidth:'122px',
            form:{
                belongSort:'',
                measureName:'',
            }
        }
    },
    methods:{
        edit(row){
            console.log(row);
        },
        remove(row){
            console.log(row);
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

