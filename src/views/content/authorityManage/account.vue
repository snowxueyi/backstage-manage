<template>
    <div class="measureConfig">
       <el-row style="margin-bottom:15px;width:100%;">
            <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
            <el-button type="info" @click="dialogFormVisible = true">删除</el-button>
        </el-row>
        <el-table size="mini" border  :data="list">
            <el-table-column align="center" type="selection" label="序号" > </el-table-column>
            <el-table-column align="center" prop="name" label="用户姓名" ></el-table-column>
            <el-table-column align="center" prop="account" label="账号"> </el-table-column>
            <el-table-column align="center" prop="tel" label="手机号"> </el-table-column>
            <el-table-column align="center" prop="state" label="状态"> </el-table-column>
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
            <!-- 树形控件 -->
            <div class="custom-tree-container">
                <el-input style="margin-top:20px;"
                placeholder="输入关键字进行过滤"
                v-model="filterText">
                </el-input>
                <div class="block">
                    <p>使用 scoped slot</p>
                    <el-tree
                    :data="data5"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :filter-node-method="filterNode"
                    :expand-on-click-node="false"
                    ref="tree2">
                    <span class="custom-tree-node" slot-scope="{ node, data }" >
                        <span>{{ node.label }}</span>
                        <span>
                        <el-button
                            type="text"
                            size="mini"
                            @click="() => append(data)">
                            Append
                        </el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click="() => remove(node, data)">
                            Delete
                        </el-button>
                        </span>
                    </span>
                    </el-tree>
                </div>
            </div>
    </div>
</template>
<script>
let id = 1000;
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1"
              },
              {
                id: 10,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "一级 2",
        children: [
          {
            id: 5,
            label: "二级 2-1"
          },
          {
            id: 6,
            label: "二级 2-2"
          }
        ]
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1"
          },
          {
            id: 8,
            label: "二级 3-2"
          }
        ]
      }
    ];
    return {
      dialogFormVisible: false,
      list: [
        { name: "吴亦凡", account: "KZ001", tel: "1557541111", state: "正常" },
        { name: "鹿晗", account: "KZ002", tel: "1557541111", state: "禁用" },
        { name: "刘昊然", account: "KZ003", tel: "1557541111", state: "注销" }
      ],
      formLabelWidth: "122px",
      form: {
        name: "",
        account: "",
        tel: "",
        state: "",
        role: "",
        password: "",
        remark: ""
      },
      data5: JSON.parse(JSON.stringify(data)),
      filterText: ''
    };
  },
  watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
  methods: {
    edit(row) {},
    remove(row) {},
    reset(row) {},
    save() {
      this.dialogFormVisible = false;
      this.list.push(this.form);
    },
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
  }
};
</script>
<style lang="less">
.measureConfig {
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
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>

