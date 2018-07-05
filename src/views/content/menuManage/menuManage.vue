<template>
    <div class="menuManage">
       <el-row style="margin-bottom:15px;width:100%;">
            <el-button type="primary" @click="addFirst">新增</el-button>
        </el-row>
        <el-table size="mini" border  :data="list">
            <el-table-column align="center" prop="name" label="编号" width="100"> </el-table-column>
            <el-table-column align="left" label="名称" width="300" >
                <template slot-scope="scope">
                    <span v-if="scope.row.type==='菜单'">
                        <i :class="scope.row.flag==true?'el-icon-arrow-right':'el-icon-arrow-down'" @click="expand(scope.row)"></i>
                        <span>{{scope.row.title}}</span>
                    </span>
                    <span v-if="scope.row.type==='目录'" style="padding-left:20px;">
                        <i :class="scope.row.flag==true?'el-icon-arrow-right':'el-icon-arrow-down'" @click="expand(scope.row)"></i>
                        <span>{{scope.row.title}}</span>
                    </span>
                    <span v-if="scope.row.type==='按钮'" style="padding-left:40px;">
                        <span>{{scope.row.title}}</span>
                    </span>
                </template> 
            </el-table-column>
            <el-table-column align="center" label="图标" width="100"> 
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
                    v-if="scope.row.type === '菜单'"
                    type='success'
                    disable-transitions>{{scope.row.type}}</el-tag>
                    <el-tag
                    v-if="scope.row.type === '目录'"
                    type="primary"
                    disable-transitions>{{scope.row.type}}</el-tag>
                    <el-tag
                    v-if="scope.row.type === '按钮' "
                    type="warning"
                    disable-transitions>{{scope.row.type}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="order" label="排序编号" width="100"> </el-table-column>
            <el-table-column align="center" prop="route" label="链接地址" width="150"> </el-table-column>
            <el-table-column align="center" prop="authority" label="权限标识" width="200"> </el-table-column>
            <el-table-column align="center"  label="操作">
                <template slot-scope="scope">
                    <span style="margin:0 5px;color:#66b1ff;cursor:pointer;">
                        <i class="el-icon-edit-outline"></i>
                        <el-button @click="edit(scope.row)" size="small" type="text">编辑</el-button>
                    </span>
                     <span style="margin:0 5px;color:#66b1ff;cursor:pointer;" >
                        <i class="el-icon-close"></i>
                        <el-button @click='remove(scope.row)' size="small" type="text">删除</el-button>
                    </span>
                     <span style="margin:0 5px;color:#66b1ff;cursor:pointer;" v-if="scope.row.type==='菜单'">
                        <i class="el-icon-plus"></i>
                        <el-button @click="add(scope.row)" size="small" type="text">添加下级</el-button>
                    </span>
                </template> 
            </el-table-column>
        </el-table>
        <el-dialog :title="dialogType==1?'增加菜单':'编辑菜单'" :visible.sync="dialogFormVisible">
                <el-form :model="form" size="mini">
                    <el-form-item label="上级部门：" :label-width="formLabelWidth" required v-if="dialogType!=='3'">
                        <el-input v-model="form.parent" size="mini" style="width:200px;" placeholder="请输入" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="菜单类型：" :label-width="formLabelWidth" required>
                        <el-radio v-model="form.type" label="目录" disabled>目录</el-radio>
                        <el-radio v-model="form.type" label="菜单" disabled>菜单</el-radio>
                    </el-form-item>
                    <el-form-item label="菜单名称：" :label-width="formLabelWidth"  >
                        <el-input v-model="form.title" size="mini" style="width:200px;" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="链接地址：" :label-width="formLabelWidth"  >
                        <el-input v-model="form.route" size="mini" style="width:200px;" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="排序编号：" :label-width="formLabelWidth" >
                        <el-input v-model="form.order" size="mini" style="width:200px;" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="图标：" :label-width="formLabelWidth" >
                        <el-input v-model="form.icon" size="mini" style="width:200px;" placeholder="请输入">
                        </el-input><el-button type="primary" @click="innerVisible=true" plain style="margin-left:5px;">选择</el-button>
                    </el-form-item>
                </el-form>
                <el-dialog width="30%" title="请选择相应图标" :visible.sync="innerVisible" append-to-body>
                    <ul class="icon-list" style="list-style: none;padding: 0;border: 1px solid #eaeefb;border-radius: 4px;overflow:hidden;">
                        <li 
                        v-for="item in iconList"
                        :key='item'
                        @click='choseIcon(item)'
                        style="cursor:pointer;float: left;width: 20%;text-align: center;height: 120px;line-height: 120px;color: #666;border-right: 1px solid #eee;margin-right: -1px;margin-bottom: -1px;border-bottom: 1px solid #eee;">
                            <span style="display: inline-block;line-height: normal;vertical-align: middle;">
                                <i :class="item" style="    display: block;font-size: 32px;margin-bottom: 15px;color: #606266;"></i>
                                <span class="icon-name" style="display: inline-block;padding: 0 3px;height: 1em;color: #606266;">{{item}}</span>
                            </span>
                        </li>
                    </ul>
                </el-dialog>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button v-if="dialogType==1" type="primary" @click="addSave">保存</el-button>
                    <el-button v-if="dialogType==2" type="primary" @click="editSave">提交</el-button>
                    <el-button v-if="dialogType==3" type="primary" @click="addFirstSave">新增</el-button>
                </div>
            </el-dialog>
            <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
                <span>确定要删除选中的记录吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteRow()">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default{
    data(){
        return{
            dialogFormVisible:false,
            flag:true,
            dialogType:'1',
            centerDialogVisible:false,
            innerVisible:false,
            iconList:['el-icon-tickets','el-icon-news','el-icon-setting','el-icon-upload','el-icon-edit-outline','el-icon-goods'],
            list:[
                    {
                      name: '1',
                      title: '商品基础档案',
                      icon:'el-icon-goods',
                      type:'菜单',
                      flag:true,
                      authority:'goods',
                      order:'1',
                      route:'',
                      children: [
                        {name:'5',type:'目录',order:'1',title:'新增商品',route:'/addGoods',icon:'el-icon-goods',position:'1',authority:'addGoods'},
                        {name:'6',type:'目录',order:'1',title:'商品列表',route:'/goodsList',icon:'el-icon-goods',position:'1',authority:'goodsList'},
                        {name:'7',type:'目录',order:'1',title:'商品分类配置',route:'/goodsSort',icon:'el-icon-goods',position:'1',authority:'goodsSort'},
                        {name:'8',type:'目录',order:'1',title:'计量单位配置',route:'/measureConfig',icon:'el-icon-goods',position:'1',authority:'measureConfig'},
                        {name:'9',type:'目录',order:'1',title:'商品品牌配置',route:'/brandConfig',icon:'el-icon-goods',position:'1',authority:'brandConfig'}
                        ]
                    }, 
                    {
                      name: '2',
                      title: '组织管理',
                      icon:'el-icon-printer',
                      type:'菜单',
                      flag:true,
                      authority:'organization',
                      order:'1',
                      route:'',
                      children: [
                        { name: "10",type:'目录',order:'1', title: "组织管理", position: "2",icon:'el-icon-printer', route: "supplierAdd",authority:'supplierAdd' },
                        { name: "11",type:'目录',order:'1', title: "截单规则", position: "2", icon:'el-icon-printer',route: "breakOrder" ,authority:'breakOrder'}
                        ]
                    },
                    {
                      name: '3',
                      title: '菜单管理',
                      icon:'el-icon-menu',
                      type:'菜单',
                      flag:true,
                      authority:'menu',
                      order:'1',
                      route:'',
                      children: [
                            {
                                 name: "12",order:'1',type:'目录', title: "菜单管理", position: "3", icon:'el-icon-menu',route: "/menuManage",authority:'menuManage' ,flag:true,
                                 children:[
                                    {name:'20',order:'1',type:'按钮',title:'新增',icon:'el-icon-plus',route:'',authority:'new'},
                                    {name:'21',order:'1',type:'按钮',title:'编辑',icon:'el-icon-edit-outline',route:'',authority:'edit'},
                                    {name:'22',order:'1',type:'按钮',title:'删除',icon:'el-icon-close',route:'',authority:'remove'},
                                    {name:'23',order:'1',type:'按钮',title:'新增下一级',icon:'el-icon-plus',route:'',authority:'add'}
                                ]
                            },
                        ]
                    }, 
                    {
                      name: '4',
                      title: '权限管理',
                      icon:'el-icon-setting',
                      type:'菜单',
                      flag:true,
                      authority:'power',
                      order:'1',
                      route:'',
                      children: [
                        {name:'13',type:'目录',order:'1',title:'账号管理',position:'4',icon:'el-icon-setting',route:'account',authority:'account'},
                        {name:'14',type:'目录',order:'1',title:'角色管理',position:'4',icon:'el-icon-setting',route:'role',authority:'role'}
                        ]
                    }
            ],
            formLabelWidth:'122px',
            style: { 'padding-left': 0 },
            form:{
                parent:'',
                title:'',
                order:'',
                route:'',
                icon:'',
                type:'目录',
                name:''
            },
            newMenu:{}
        }
    },
    methods:{
        choseIcon(icon){
            this.form.icon=icon;
            this.innerVisible=false;
        },
        addFirst(){
            this.dialogFormVisible=true;
            this.dialogType='3';
            this.form={
                title:'',
                order:'',
                route:'',
                icon:'',
                type:'菜单',
                name:'5'
            }
        },
        addFirstSave(){
            // this.list.push(this.form);
            this.ADD_MENU(this.form);
            this.dialogFormVisible=false;
        },
        edit(row){
            console.log(row);
            this.dialogType='2';
            this.form.parent=row.title;
            this.form.title=row.title;
            this.form.route=row.route;
            this.form.order=row.order;
            this.form.icon=row.icon;
            this.form.type=row.type;
            this.dialogFormVisible=true;
            this.newMenu=row;
        },
        editSave(){
            // this.list.forEach((item,i)=>{
            //     if(item.name==this.newMenu.name){
            //         item.title=this.form.title;
            //         item.icon=this.form.icon;
            //         item.order=this.form.order;
            //         item.route=this.form.route;
            //         item.type=this.form.type;
            //         item.children=this.newMenu.children;
            //         
            //     }
            // })
            let newMenu=this.newMenu;
            let form=this.form;
            this.EDIT_LIST ({newMenu,form})
            this.dialogFormVisible=false;
        },
        remove(row){
            this.newMenu=row;
            this.centerDialogVisible=true;
        },
        deleteRow(){
            // this.list.forEach((item,i)=>{
            //     if(item.name==this.newMenu.name){
            //         this.list.splice(i,1);
            //         if(this.newMenu.type=='目录'){
            //             this.list.forEach(item1=>{
            //                 if(item1.name==this.newMenu.position){
            //                     item1.children.filter((item2,k)=>{
            //                         if(item2.name==this.newMenu.name){
            //                             item1.children.splice(k,1)
            //                         }
            //                     })
            //                 }
            //             })
            //         }
            //     }
            // })
            this.DELETE_LIST(this.newMenu);
            this.centerDialogVisible=false;
        },
        add(row){
            this.dialogType='1';
            this.dialogFormVisible=true;
            this.form.parent=row.title;
            this.form.type='目录';
            this.newMenu=row;
        },
        addSave(){
            this.form.name='2333';
            const newChild = this.form;
            let newMenu=this.newMenu;
            // this.list.forEach((item,i)=>{
            //     if(item.name==this.newMenu.name){
            //         item.children.push(newChild);
            //     }
            // })
            this.ADD_LIST({newMenu,newChild})
            this.dialogFormVisible=false;
        },
        expand(row){
            console.log(row);
             row.flag=!row.flag;
            if(!row.flag){
                this.list.forEach((item,i)=>{
                    if(item.name==row.name){
                        row.children.forEach(item=>{
                            this.list.splice(i+1, 0, item);
                        })
                    }
                })
                // this.DRAW_LIST(row);
            }else{
                for(var k in row.children){
                    this.list.forEach((item,i)=>{
                        row.children.filter(item1=>{
                            if(item1.name==item.name){
                                this.list.splice(i,1);
                            }
                        })
                    })
                }
            }
                        
        },
        // expand2(row){

        // },
        ...mapMutations(["EDIT_LIST", "DELETE_LIST","ADD_LIST",'ADD_MENU'])

    }
}
</script>
<style lang="less">
.menuManage{
    .el-dialog__footer {
        text-align: center;
    }
    .el-dialog__body {
        padding-bottom: 0;
    }
    .el-dialog {
        width: 30%;
        .icon-list{
        list-style: none;
        padding: 0;
        border: 1px solid #eaeefb;
        border-radius: 4px;
        li{
            float: left;
            width: 16.66%;
            text-align: center;
            height: 120px;
            line-height: 120px;
            color: #666;
        }
    }
    }
    .el-dialog__header {
        padding: 10px 20px 10px;
        border-bottom: 1px solid #eee;
    }
}
</style>

