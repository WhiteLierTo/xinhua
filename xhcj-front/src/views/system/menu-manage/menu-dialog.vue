<template>
  <div class="vvfdfvfsdv" v-loading="loading">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级菜单">
            <treeselect
                v-model="form.parentId"
                :options="menuOptions"
                :show-count="true"
                placeholder="选择上级菜单"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="form.menuType">
              <el-radio label="M">目录</el-radio>
              <el-radio label="C">菜单</el-radio>
              <el-radio label="F">按钮</el-radio>
              <el-radio label="D">根菜单</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item v-if="form.menuType != 'F'" label="菜单图标">
            <el-popover
                placement="bottom-start"
                width="460"
                trigger="click"
                @show="$refs['iconSelect'].reset()"
            >
              <IconSelect ref="iconSelect" @selected="selected"/>
              <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
                <svg-icon
                    v-if="form.icon"
                    slot="prefix"
                    :icon-class="form.icon"
                    class="el-input__icon"
                    style="height: 32px;width: 16px;"
                />
                <i v-else slot="prefix" class="el-icon-search el-input__icon"/>
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入菜单名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序" prop="sortId">
            <el-input-number
                v-model="form.sortId"
                controls-position="right"
                :min="0"
                style="width:100%"
            />
          </el-form-item>

        </el-col>
        <el-col :span="12">
          <el-form-item v-if="form.menuType != 'F'" label="是否外链">
            <el-radio-group v-model="form.isFrame">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="form.menuType != 'F'" label="路由地址" prop="path">
            <el-input v-model="form.path" placeholder="请输入路由地址"/>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.menuType == 'C' || form.menuType == 'D'">
          <el-form-item label="组件路径" prop="component">
            <el-input v-model="form.component" placeholder="请输入组件路径"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="form.menuType != 'M'" label="权限标识">
            <el-input v-model="form.perms" placeholder="请权限标识" maxlength="50"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item v-if="form.menuType != 'F'" label="菜单状态">
            <el-radio-group v-model="form.hideFlag">
              <el-radio label="0">显示</el-radio>
              <el-radio label="1">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" class="sure">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </div>
</template>
<script>
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import IconSelect from "./IconSelect";

  export default {
    name: "menuDialog",
    components: {Treeselect, IconSelect},
    props: ["modifyData", "status"],
    data() {
      return {
        form: {
          id: "",
          parentId: "menu_root_id",
          menuType: "",
          name: "",
          icon: "",
          orderNum: "",
          isFrame: "",
          path: "",
          component: "",
          perms: "",
          hideFlag: "",
          sortId: "0"
        },
        rules: {
          name: [
            {required: true, message: "菜单名称不能为空", trigger: "blur"}
          ],
          sortId: [{required: true, message: "菜单顺序不能为空", trigger: "blur"}]
        }, //表单校验
        menuOptions: [], //上级菜单

        loading: true
      };
    },
    async mounted() {
      await this.getTreeList();
      this.loading = false;
      let target = this.$utils.gadgets.deepClone(this.modifyData);
      if (this.state === "add" && !target.parentId) {
        target.parentId = "menu_root_id"
      }

      target.hideFlag = target.hideFlag.toString();
      target.isFrame = target.isFrame.toString();
      this.form = target;
    },
    watch: {
      modifyData(val) {
        const temp = JSON.parse(JSON.stringify(val));
        const {parentId} = temp;
        if (parentId === "menu_root_id") {
          temp.parentId = 0;
        }
        temp.hideFlag = temp.hideFlag.toString();
        temp.isFrame = temp.isFrame.toString();
        this.form = temp;
      }
    },
    methods: {
      getTreeList() {
        let forms = {
          name: "",
          hideFlag: ""
        };
        return this.$ajax.system.getTreeList(forms).then(res => {
          this.menuOptions = [];
          const menu = {
            id: 'menu_root_id',
            label: "主类目",
            children: []
          };
          menu.children = res.data;
          this.menuOptions.push(menu);
        });
      },
      // 选择图标
      selected(name) {
        this.form.icon = name;
      },
      cancel() {
        this.$emit("dialog-show", false);
      },
      //确定
      submitForm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.status === "modify") {

              let submitForm = this.$utils.gadgets.deepClone(this.form);
              if (submitForm.parentId === 'menu_root_id') {
                submitForm.parentId = ""
              }
              submitForm.children = [];


              this.$ajax.system.updateMenu(submitForm).then(res => {
                this.$emit("dialog-show", false);
                if (res.code !== 200) {
                  this.$message.warning(res.msg);
                } else {
                  this.$message.success("修改成功");
                }
              });


            } else if (this.status === "add") {
              this.$ajax.system.postMenu(this.form).then(res => {
                this.$emit("dialog-show", false);
                if (res.code !== 200) {
                  this.$message.warning(res.msg);
                } else {
                  this.$message.success("新增成功");
                }
              });
            }
          }
        });
      }
    }
  };
</script>
<style lang='less'>
  .vvfdfvfsdv {
    padding-bottom: 30px;

    .dialog-footer {
      float: right;
    }

    .el-input__prefix {
      top: 0px;
    }
  }
</style>
