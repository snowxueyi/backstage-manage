<template>
    <div class="productList">
        <el-card style="margin-top:15px;margin-bottom:15px;">
            <el-form  :inline="true" :model="form" class="demo-form-inline" size="mini">
                <el-row>
                        <el-form-item class="item-width" label="品牌：">
                           <el-select style="width:150px;" v-model="form.itemBrand" placeholder="请选择">
                                <el-option
                                v-for="item in brand"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>    
                        </el-form-item>
                        <el-form-item class="item-width" label="内部分类：">
                           <el-select style="width:150px;" v-model="form.itemInsetSort" placeholder="请选择">
                                <el-option
                                v-for="item in insetSort"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>    
                        </el-form-item>
                        <el-form-item class="item-width" label="外部分类：">
                           <el-select style="width:150px;" v-model="form.itemOutSort" placeholder="请选择">
                                <el-option
                                v-for="item in outSort"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>    
                        </el-form-item>
                        <el-form-item class="item-width" label="商城销售状态：">
                           <el-select style="width:150px;" v-model="form.itemMallStatus" placeholder="请选择">
                                <el-option
                                v-for="item in mallStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>    
                        </el-form-item>
                        <el-form-item class="item-width" label="快准销售状态：">
                           <el-select style="width:150px;" v-model="form.itemKzStatus" placeholder="请选择">
                                <el-option
                                v-for="item in kzStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>    
                        </el-form-item>
                        <el-form-item style="margin-left:60px;">
                            <el-input style="width:250px;" placeholder="无料编码/厂家产品码/OE码/产品名称"></el-input>
                        </el-form-item>
                        <el-form-item label=" ">
                            <el-button type="info" @click="serchGoods">搜索</el-button>
                        </el-form-item>
                </el-row>
                <el-row>
                    <el-col :span='21'>
                        <el-form-item >
                            <el-button type="primary" @click="addGoods">新增</el-button>
                        </el-form-item>
                        <el-form-item >
                            <el-button type="info" @click="dialogFormVisible = true">批量更改</el-button>
                        </el-form-item>
                        <el-form-item >
                            <el-button type="info" @click="del">删除</el-button>
                        </el-form-item>    
                    </el-col>
                    <el-col :span='3' style="display:flex;">
                        <a class="exportModel"  @click="exportModel">
                            <i class="icon iconfont icon-shangchuan"></i>
                            <span slot="title">导出模板</span>
                        </a>
                        <span style="color:#e9ebee;">|</span>
                        <el-upload :before-upload="handleUpload" action="default">
                            <a class="importModel" >
                                <i class="icon iconfont icon-xiazai"></i>
                                <span slot="title">批量导入</span>
                            </a>
                        </el-upload>
                    </el-col>
                </el-row>
                </el-form>
                <el-table size="mini" border  v-bind="table" style="width:97%;">
                    <el-table-column align="center" type="index" label="序号" > </el-table-column>
                    <el-table-column
                        v-for="(item, index) in table.columns"
                        :key="index"
                        :prop="item.prop"
                        :label="item.label">
                    </el-table-column>
                        <el-table-column align="center"  label="操作">
                            <template slot-scope="scope">
                                  <el-button @click='edit(scope.row)' style="margin:0 5px" size="small" type="text">编辑</el-button>
                                  <el-button @click='remove(scope.row)' style="margin:0 5px" size="small" type="text">删除</el-button>
                            </template> 
                        </el-table-column>
                    </el-table>
                    <el-row style="padding:15px;text-align:right">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="form.currentPage"
                            :page-sizes="pageSizes"
                            :page-size="form.pageSize"
                            layout="total, sizes, prev, pager, next"
                            :total="total">
                        </el-pagination>
                    </el-row>
            </el-card>
            <!-- 批量更改二次弹窗 -->
            <el-dialog title="批量更改" :visible.sync="dialogFormVisible">
                <el-form :model="form" size="mini">
                    <el-form-item label="需更改条件：" :label-width="formLabelWidth" class="item-width">
                        <el-select v-model="editSwitch" placeholder="需更改的信息" >
                            <el-option v-for="(item, index) in editList" :key="index" :label="item.label" :value="item.value" style="width:180px;"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="更改：" :label-width="formLabelWidth" class="item-width">
                        <el-select v-model="editContent" placeholder="请选择">
                            <el-option v-for="(item, index) in filterList" :key="index" :label="item.label" :value="item.value" style="width:180px;"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
                </div>
            </el-dialog>
    </div>
</template>
<script>
    import { getList } from "@/api/";
    export default{
        data(){
            return{
                form:{},
                brand:[
                    { value: "", label: "全部"}
                ],
                insetSort:[
                    { value: "", label: "全部"}
                ],
                outSort:[
                    { value: "", label: "全部"}
                ],
                mallStatus:[
                    { value: "", label: "全部"}
                ],
                kzStatus:[
                    { value: "", label: "全部"}
                ],
                dialogFormVisible: false,
                editSwitch:'',
                editContent:'',
                editList:[{label:'商品编码',value:'1'},{label:'商品名称',value:'2'}],
                formLabelWidth: '100px',
                form:{},
                table: {
                    columns: [
                        {prop:'goodsCode',label:'商品编码'},
                        {prop:'goodsName',label:'商品名称'},
                        {prop:'brand',label:'品牌'},
                        {prop:'model',label:'型号'},
                        {prop:'specification',label:'规格'},
                        {prop:'kzStatus',label:'快准销售状态'},
                        {prop:'addTime',label:'新增时间'},
                        {prop:'editTime',label:'上次编辑时间'}
                    ],
                    data: [
                        {goodsCode:'123',goodsName:'XXXXXXX',brand:'飞利浦',model:'1345444KXhgbvd',specification:'10只/每盒',kzStatus:'正常',addTime:'2018.05.02',editTime:'2018.09.06'},
                        {goodsCode:'456',goodsName:'XXXXXXX',brand:'玛莎拉蒂',model:'1345444KXhgbvd',specification:'10只/每盒',kzStatus:'正常',addTime:'2018.05.02',editTime:'2018.09.06'},
                        {goodsCode:'789',goodsName:'XXXXXXX',brand:'飞利浦',model:'1345444KXhgbvd',specification:'10只/每盒',kzStatus:'正常',addTime:'2018.05.02',editTime:'2018.09.06'}
                    ],
                    size: 'mini',
                    stripe: true,
                    border: true
                },
                pageSizes: [10, 20, 30, 40],
                total:1000
            }
        },
        computed:{
            filterList:function(){
                var _this=this;
                var editSwitch=this.editSwitch;
                var editList=this.editList;
                return editList.filter(function(item){
                    // for(var j in wd){
                    //     if(item.wd.indexOf("," + wd[j] + ",") ==-1){
                    //         return false;
                    //     }
                    // }
                    // return true;
                });
            }
        },
        methods:{
            serchGoods:function(){
                console.log('1');
            },
            addGoods:function(){
                console.log(1);
            },
            del(){

            },
            handleSizeChange(e) {
            this.params.pageSize = e;
            this.params.page = 1;
            this.getGoodsList();
            },
            handleCurrentChange(e) {
            this.params.page = e;
            this.getGoodsList();
            },
            exportModel(){
                window.location.href = 'http://fairyever.qiniudn.com/goodsImport.xlsx'//导出地址
            },
            handleUpload (file) {
                this.$import.xlsx(file)
                    .then(({header, results}) => {
                    // header 为表头
                    // results 为内容
                    this.table.columns = header.map(e => {
                        return {
                        label: e,
                        prop: e
                        }
                    })
                    this.table.data = results
                    })
                // 阻止默认的上传
                return false
            },
            edit(row){
                // this.$router.push("/detail/" + row.itemId);
                console.log(row.brand);
            },
            remove(row){
                // this.$router.push("/detail/" + row.itemId);
                console.log(row.goodsCode);
                this.table.data.some((item,i) => {
                    if (item.goodsCode == row.goodsCode) {
                        this.table.data.splice(i, 1)
                        return true;
                    }
                })
            }
        }
    }
</script>
<style lang="less">
.productList{
    .el-form-item__label{
        padding:0;
    }
    .el-table thead {
    color: #333!important;
    }
    .exportModel{
        color:#2386eb;margin-right:10px;font-size:13px;cursor:pointer;margin-top: 2px;
    }
    .importModel{
        color:#2386eb;font-size:13px;cursor:pointer;margin-left:10px;
    }
    .el-dialog__footer {
        text-align: center;
    }
    .el-dialog__body {
        padding-bottom: 0;
    }
    .el-dialog {
        width: 20%;
    }
    .el-dialog__header {
        padding: 10px 20px 10px;
        border-bottom: 1px solid #eee;
    }
}
</style>

