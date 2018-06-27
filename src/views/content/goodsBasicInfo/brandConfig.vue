<template>
    <div class="brandConfig" >
            <el-row style="margin-bottom:15px;width:100%;">
                <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
            </el-row>
            <el-card style="min-width:1600px;">
                <el-table size="mini"  border  :data="list">
                    <el-table-column align="center" type="index" label="序号" > </el-table-column>
                    <el-table-column align="center" prop="brandName" label="品牌名称" ></el-table-column>
                    <el-table-column align="center" prop="brandAlias" label="品牌别名"> </el-table-column>
                    <el-table-column prop="logo" label="logo" width='150'>
                        <template slot-scope="scope">
                            <span style="margin:0 5px" size="small" type="text" class="icon iconfont icon-tupian-xianxing"></span>
                            <el-popover
                            placement="bottom"
                            width="100"
                            height="100"
                            trigger="click">
                                <img :src="scope.row.logo" style="width:100%;height:100%;" >
                                <el-button slot="reference" style="margin-left:60px" size="small" type="text">预览</el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="brandType" label="品牌类型"> </el-table-column>
                    <el-table-column align="center" prop="brandIntroduce"  label="品牌描述"></el-table-column>
                    <el-table-column align="center"  label="操作">
                        <template slot-scope="scope">
                            <el-button @click="edit(row)" style="margin:0 5px" size="small" type="text">编辑</el-button>
                            <el-button @click='remove(scope.row)' style="margin:0 5px" size="small" type="text">删除</el-button>
                        </template> 
                    </el-table-column>
                </el-table>
            </el-card>
            <el-dialog title="新增品牌" :visible.sync="dialogFormVisible">
                <el-form :model="form" size="mini">
                    <el-form-item label="品牌名称：" :label-width="formLabelWidth" required >
                        <el-input v-model="form.brandName" placeholder="请输入" size="mini" style="width:200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌别名：" :label-width="formLabelWidth" required >
                        <el-input v-model="form.brandAlias" placeholder="请输入" size="mini" style="width:200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌logo：" :label-width="formLabelWidth" >
                        <div class="imgPic">
                            <img :src="logoSrc" >
                            <img class="brandPic" v-if="form.logo.length > 0" v-bind:src="form.logo" >
                            <input class="brandPic" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" v-on:change="showPic()" ref="brandInput">
                        </div>
                    </el-form-item>
                    <el-form-item label="品牌类型：" :label-width="formLabelWidth"  required>
                        <el-select v-model="form.brandType" placeholder="请选择品牌类型" style="width:200px;">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="品牌描述：" :label-width="formLabelWidth" >
                        <el-input type="textarea" v-model="form.brandIntroduce" size="mini" style="width:200px;"></el-input>
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
                list:[
                    {brandName:'飞利浦',brandAlias:'玛莎拉蒂',logo:'../../src/assets/logo.png',brandType:'一级',brandIntroduce:'荷兰皇家爱集团品牌荷兰皇家集团品牌'},
                    {brandName:'盖茨',brandAlias:'玛莎拉蒂',logo:'timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528262696470&di=9c5c7943e2396f01dce66f4d525976a1&imgtype=0&src=http%3A%2F%2Fpic11.nipic.com%2F20101210%2F145234_164756002473_2.png',brandType:'一级',brandIntroduce:'荷兰皇家爱集团品牌荷兰皇家集团品牌'}
                ],
                dialogFormVisible: false,
                formLabelWidth:'100px',
                form:{
                    brandName:'',
                    brandAlias:'',
                    brandType:'',
                    brandIntroduce:'',
                    logo:'',
                },
                logoSrc:'../../src/assets/add.png'
            }
        },
        methods:{
            preview(row){
                console.log(row.logo);
            },
            edit(row){

            },
            remove(row){

            },
            showPic:function(event) {
                var _this=this;
                // var img = event.target.files[0];
                var img=_this.$refs.brandInput.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(img);
                reader.onload = function(e) {
                    _this.form.logo= this.result;
                };
            },
            save(){
                this.dialogFormVisible=false;
                this.list.push(this.form);
            }
        }
    }
</script>
<style lang="less">
.brandConfig{
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
    .imgPic{
        position: relative;
        overflow: hidden;
        width: 100px;
        height:100px;
    }
    img{
        display: block;
        width: 100px;
    }
    img.brandPic{
        width: 100%;
        height:100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 99;
        overflow:hidden;

    }
    input.brandPic{
        display: block;
        opacity: 0;
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        z-index: 99;
    }
}
</style>

