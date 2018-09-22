<template>
    <div class="addGoods">
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="①基本信息" name="first">
            </el-tab-pane>
            <el-tab-pane disabled label=">"></el-tab-pane>
            <el-tab-pane label="②包装存储信息" name="second">配置管理</el-tab-pane>
            <el-tab-pane disabled label=">"></el-tab-pane>
            <el-tab-pane label="③销售信息" name="third">角色管理</el-tab-pane>
        </el-tabs> -->
        <div class="topTab">
            <span :class="currentNum=='1'?'current':''"  @click="scrollCurrent('1')">①基本信息</span>&nbsp;&nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
            <span :class="currentNum=='2'?'current':''"  @click="scrollCurrent('2')">②规格参数信息</span>&nbsp;&nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
            <span :class="currentNum=='3'?'current':''"  @click="scrollCurrent('3')">③包装存储信息</span>&nbsp;&nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
            <span :class="currentNum=='4'?'current':''"  @click="scrollCurrent('4')">④销售信息</span>
        </div>
        <div>
                            <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="160px">
                                <div class="basicInfo d_jump">
                                    <p>|&nbsp;基本信息</p>
                                    <el-row :gutter="10">
                                        <el-col :span="11">
                                            <el-form-item label="外部分类:" required>
                                                <el-row :gutter="2" type="flex">
                                                    <el-col :span="8">
                                                        <el-select v-model="form.firstLevel" placeholder="请选择一级分类">
                                                            <el-option label="区域一" value="shanghai"></el-option>
                                                            <el-option label="区域二" value="beijing"></el-option>
                                                        </el-select>
                                                    </el-col>
                                                    <el-col :span="8">
                                                        <el-select v-model="form.secondLevel" placeholder="请选择二级分类">
                                                            <el-option label="区域一" value="shanghai"></el-option>
                                                            <el-option label="区域二" value="beijing"></el-option>
                                                        </el-select>
                                                    </el-col>
                                                    <el-col :span="8">
                                                        <el-select v-model="form.thirdLevel" placeholder="请选择三级分类">
                                                            <el-option label="区域一" value="shanghai"></el-option>
                                                            <el-option label="区域二" value="beijing"></el-option>
                                                        </el-select>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                            <el-form-item label="商品编号:" required>
                                                <el-input v-model="form.goodsNum" style="width:40%;"></el-input>
                                            </el-form-item>
                                            <el-form-item label="OEM码:">
                                                <el-input v-model="form.oemCode" style="width:40%;"></el-input>
                                            </el-form-item>
                                            <el-form-item label="厂家产品码:">
                                                <el-input v-model="form.productoryCode" style="width:40%;"></el-input>
                                            </el-form-item>
                                            <el-form-item label="规格:" >
                                                <el-input v-model="form.size" style="width:40%;"></el-input>
                                            </el-form-item>
                                            <el-form-item label="商品描述:" style="width:80%;">
                                                <el-input v-model="form.goodsIntroduce"></el-input>
                                            </el-form-item>
                                            <el-form-item label="车型描述:" style="width:80%;">
                                                <el-input v-model="form.carIntroduce"></el-input>
                                            </el-form-item>
                                            <el-form-item label="产品缩略图:">
                                                    <el-upload
                                                    action="https://jsonplaceholder.typicode.com/posts/"
                                                    list-type="picture-card"
                                                    :on-preview="handlePictureCardPreview"
                                                    :auto-upload="false"
                                                    :on-exceed="handleExceed"
                                                    :limit='size'
                                                    :on-remove="handleRemove">
                                                    <i class="el-icon-plus"></i>
                                                </el-upload>
                                                <el-dialog :visible.sync="dialogVisible">
                                                    <img width="100%" :src="dialogImageUrl" alt="">
                                                </el-dialog>
                                            </el-form-item>
                                            <el-form-item label="商品详情图:">
                                                <rich-edit @editor-change="editChange" @input="input" @change="change" @text-change="textChange"></rich-edit>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="11">
                                                <el-form-item label="内部分类:" required>
                                                    <el-row :gutter="2" type="flex">
                                                        <el-col :span="8">
                                                            <el-select v-model="form.firstLevel" placeholder="请选择一级分类">
                                                                <el-option label="区域一" value="shanghai"></el-option>
                                                                <el-option label="区域二" value="beijing"></el-option>
                                                            </el-select>
                                                        </el-col>
                                                        <el-col :span="8">
                                                            <el-select v-model="form.secondLevel" placeholder="请选择二级分类">
                                                                <el-option label="区域一" value="shanghai"></el-option>
                                                                <el-option label="区域二" value="beijing"></el-option>
                                                            </el-select>
                                                        </el-col>
                                                        <el-col :span="8">
                                                            <el-select v-model="form.thirdLevel" placeholder="全部三级分类">
                                                                <el-option label="区域一" value="shanghai"></el-option>
                                                                <el-option label="区域二" value="beijing"></el-option>
                                                            </el-select>
                                                        </el-col>
                                                    </el-row>
                                                </el-form-item>
                                                <el-form-item label="商品名称:" required>
                                                    <el-input v-model="form.goodsNum" style="width:40%;"></el-input>
                                                </el-form-item>
                                                <el-form-item label="商品名称简写:">
                                                    <el-input v-model="form.goodsNum" style="width:40%;"></el-input>
                                                </el-form-item>
                                                <el-form-item label="品牌:" required>
                                                    <el-select v-model="form.thirdLevel" placeholder="全部三级分类">
                                                        <el-option label="区域一" value="shanghai"></el-option>
                                                        <el-option label="区域二" value="beijing"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item label="型号:">
                                                    <el-input v-model="form.goodsNum" style="width:40%;"></el-input>
                                                </el-form-item>
                                                <el-form-item label="替代商品编码:">
                                                    <el-input v-model="form.goodsNum" style="width:40%;"></el-input>
                                                </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div class="paramInfo d_jump">
                                    <p>|&nbsp;规格参数信息</p>
                                    <el-row :gutter="10">
                                        <el-col :span="11">
                                            <el-form-item label="品牌:" >
                                                <el-input v-model="form.goodsNum" style="width:40%;"></el-input>
                                            </el-form-item>
                                            <el-form-item label="型号:" >
                                                <el-input v-model="form.goodsNum" style="width:40%;"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="11">
                                            <el-form-item label="购买单位:" >
                                                <el-input v-model="form.goodsNum" style="width:40%;"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div class="packInfo d_jump">
                                    <p>|&nbsp;包装存储信息</p>
                                    <el-row :gutter="1">
                                        <el-col :span="11">
                                            <el-form-item label="主计量单位:" required>
                                                <el-row :gutter="1">
                                                        <el-col :span="10">
                                                            <el-select v-model="form.firstLevel" placeholder="请选择分类">
                                                                <el-option label="区域一" value="shanghai"></el-option>
                                                                <el-option label="区域二" value="beijing"></el-option>
                                                            </el-select>
                                                        </el-col>
                                                        <el-col :span="10">
                                                            <el-select v-model="form.secondLevel" placeholder="请选择单位">
                                                                <el-option label="区域一" value="shanghai"></el-option>
                                                                <el-option label="区域二" value="beijing"></el-option>
                                                            </el-select>
                                                        </el-col>
                                                    </el-row>
                                            </el-form-item>
                                            <el-form-item label="主计量单位换算数量:" required >
                                                <el-input v-model="form.goodsNum" style="width:40%;" placeholder="原箱换算数量"></el-input>
                                            </el-form-item>
                                            <el-form-item label="升换算数量:" >
                                                <el-input v-model="form.goodsNum" style="width:40%;" ></el-input>
                                            </el-form-item>
                                            <el-form-item label="包装规格:" >
                                                <el-input v-model="form.goodsNum" style="width:40%;" placeholder="原箱换算数量"></el-input>
                                            </el-form-item>
                                            <el-form-item label="单位重量（KG）:" >
                                                <el-input v-model="form.goodsNum" style="width:40%;" placeholder="原箱换算数量"></el-input>
                                            </el-form-item>
                                            <el-form-item label="CS条码:" >
                                                <el-input v-model="form.goodsNum" style="width:80%;" placeholder="原箱换算数量"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="11">
                                            <el-form-item label="辅计量单位:" >
                                                <el-row :gutter="1" type="flex">
                                                        <el-col :span="10">
                                                            <el-select v-model="form.firstLevel" placeholder="请选择分类">
                                                                <el-option label="区域一" value="shanghai"></el-option>
                                                                <el-option label="区域二" value="beijing"></el-option>
                                                            </el-select>
                                                        </el-col>
                                                        <el-col :span="10">
                                                            <el-select v-model="form.secondLevel" placeholder="请选择单位">
                                                                <el-option label="区域一" value="shanghai"></el-option>
                                                                <el-option label="区域二" value="beijing"></el-option>
                                                            </el-select>
                                                        </el-col>
                                                    </el-row>
                                            </el-form-item>
                                            <el-form-item label="辅计量单位换算数量:" >
                                                <el-input v-model="form.goodsNum" style="width:40%;" placeholder="原箱换算数量"></el-input>
                                            </el-form-item>
                                            <el-form-item label="包装属性:" required>
                                                <el-input v-model="form.goodsNum" style="width:40%;" placeholder="原箱换算数量"></el-input>
                                            </el-form-item>
                                            <el-form-item label="长宽高:" >
                                                <el-input v-model="form.goodsNum" style="width:15%;" placeholder="长"></el-input>&nbsp;*&nbsp;
                                                <el-input v-model="form.goodsNum" style="width:15%;" placeholder="宽"></el-input>&nbsp;*&nbsp;
                                                <el-input v-model="form.goodsNum" style="width:15%;" placeholder="高"></el-input>
                                            </el-form-item>
                                            <el-form-item label="单位体积(CM³):" >
                                                <el-input v-model="form.goodsNum" style="width:40%;" placeholder="原箱换算数量"></el-input>
                                            </el-form-item>
                                            <el-form-item label="EA条码:" >
                                                <el-input v-model="form.goodsNum" style="width:40%;" placeholder="原箱换算数量"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div class="salesInfo d_jump">
                                    <p>|&nbsp;销售信息</p>
                                    <el-row :gutter="10">
                                        <el-col :span="12">
                                            <el-form-item label="商品热度:" required>
                                                    <el-select v-model="form.firstLevel" placeholder="请选择分类">
                                                        <el-option label="区域一" value="shanghai"></el-option>
                                                        <el-option label="区域二" value="beijing"></el-option>
                                                    </el-select>
                                            </el-form-item>
                                            <el-form-item label="计划组:" required>
                                                <el-select v-model="form.firstLevel" placeholder="请选择分类">
                                                    <el-option label="区域一" value="shanghai"></el-option>
                                                    <el-option label="区域二" value="beijing"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="快准销售状态:" required>
                                                <el-select v-model="form.firstLevel" placeholder="请选择分类">
                                                    <el-option label="区域一" value="shanghai"></el-option>
                                                    <el-option label="区域二" value="beijing"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="备货状态:" required>
                                                <el-select v-model="form.firstLevel" placeholder="请选择分类">
                                                    <el-option label="区域一" value="shanghai"></el-option>
                                                    <el-option label="区域二" value="beijing"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="货主:" >
                                                <el-select v-model="form.firstLevel" placeholder="请选择分类">
                                                    <el-option label="区域一" value="shanghai"></el-option>
                                                    <el-option label="区域二" value="beijing"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="是否允许滞销品退货:" required>
                                                <el-radio-group v-model="form.firstLevel">
                                                    <el-radio label="是"></el-radio>
                                                    <el-radio label="否"></el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="是否允许不良品退货:" required>
                                                <el-radio-group v-model="form.firstLevel">
                                                    <el-radio label="是"></el-radio>
                                                    <el-radio label="否"></el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="是否允许请购:" required>
                                                <el-radio-group v-model="form.firstLevel">
                                                    <el-radio label="是"></el-radio>
                                                    <el-radio label="否"></el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="标准价（元）:" >
                                                <el-input v-model="form.goodsNum" style="width:29%;" placeholder="0.00"></el-input>
                                            </el-form-item>
                                            <el-form-item label="产品组:" required>
                                                <el-select v-model="form.firstLevel" placeholder="请选择">
                                                    <el-option label="区域一" value="shanghai"></el-option>
                                                    <el-option label="区域二" value="beijing"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="商城销售状态:" required>
                                                <el-select v-model="form.firstLevel" placeholder="请选择">
                                                    <el-option label="区域一" value="shanghai"></el-option>
                                                    <el-option label="区域二" value="beijing"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="税率（%）:" required>
                                                <el-select v-model="form.firstLevel" placeholder="请选择">
                                                    <el-option label="区域一" value="shanghai"></el-option>
                                                    <el-option label="区域二" value="beijing"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="销售组织:" >
                                                <el-select v-model="form.firstLevel" placeholder="请选择">
                                                    <el-option label="区域一" value="shanghai"></el-option>
                                                    <el-option label="区域二" value="beijing"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="备注:" style="width:40%;">
                                                <el-input type="textarea" v-model="form.firstLevel"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-form>
                        </div>
    </div>
</template>
<script>
import richEdit from "../../com/richEdit.vue";
import pull from "../../com/richEdit.vue";
export default {
  data() {
    return {
      activeName: "first",
      form: {
        firstLevel: "",
        secondLevel: "",
        thirdLevel: "",
        goodsNum: "",
        oemCode: "",
        productoryCode: "",
        resource: "",
        goodsIntroduce: "",
        size: "",
        carIntroduce: ""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      size: 5,
      rules: {
        namfirstLevele: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      currentNum:1
    };
  },
  methods: {
    editChange(eventName, ...args) {
      // console.log(...args);
    },
    input(html) {
      // console.log(html)
    },
    change({ html, text, quill }) {
      console.log(html);
    },
    textChange(delta, oldDelta, source) {
      // console.log(delta)
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(file, fileList) {
      this.$message({
        message: "最多支持上传5张照片",
        type: "warning"
      });
    },
    scrollCurrent(index){
        this.currentNum=index;
        // 用 class="d_jump" 添加锚点
        let jump = document.querySelectorAll('.d_jump')
        let total = jump[index-1].offsetTop;
        console.log(total);
        let distance = document.documentElement.scrollTop || document.body.scrollTop;
        // document.body.scrollTop = total;
        document.documentElement.scrollTop = total
    }
  },
  components: {
    richEdit,
  }
};
</script>
<style lang="less">
.addGoods {
  .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
  }
  .ql-container {
    height: 300px;
    overflow-y: scroll;
    overflow-x: scroll;
  }
  .el-tabs__header {
    background: #fff !important;
  }
  .topTab{
        height: 35px;
        line-height: 35px;
        width: 100%;
        border: 1px solid #eee;
        border-top: none;
        border-right: none;
        border-left: none;
        .current{
            border-bottom:1px solid #4b84ff;
        }
        span{
            display: inline-block;
            height: 100%;
            cursor: pointer;
        }
  }
}
</style>

