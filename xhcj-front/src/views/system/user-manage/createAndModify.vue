<template>
  <dialogTemplate
      :onClose="onClose"
      :onSubmit="onSubmit"
      :title="id?'修改角色':'创建角色'"
  >

    <div class="content-container" v-loading="initLoading">
      <el-form ref="form" :model="userInfo" label-width="100px">
        <el-form-item label="角色名称" prop="name" :rules="{message:'角色名称不可为空',required:true}">
          <el-input v-model.trim="userInfo.name"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="resource">
          <el-radio-group v-model="userInfo.status">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="菜单权限">
          <el-tree
              :data="jurisdictions"
              show-checkbox
              node-key="id"
              ref="tree"
              :default-checked-keys="userInfo.menusIds.filter(this.isMenuLeaf)"
              :default-expanded-keys="userInfo.menusIds.filter(id=>!this.isMenuLeaf(id))"
          >
            <!--:default-expanded-keys="userInfo.menusIds"-->
            <!--:default-checked-keys="userInfo.menusIds"-->
          </el-tree>
        </el-form-item>
      </el-form>

    </div>

  </dialogTemplate>
</template>

<script>
  export default {
    name: "createAndModify",
    props: ["onClose", "id"],
    data() {
      return {
        initLoading: true,
        submitLoading: false, // 防抖
        userInfo: {
          name: "",
          status: 1,
          menusIds: []
        },
        jurisdictions: []
      }
    },

    async mounted() {
      await this.getMenuTree();
      if (this.id) {
        await this.getRoleDetail()
      }
      this.initLoading = false;
    },

    methods: {
      async onSubmit() {
        if (this.submitLoading) return;
        let checkedKeys = this.$refs.tree.getCheckedKeys();
        let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
        let userInfo = this.$utils.gadgets.deepClone(this.userInfo);
        userInfo.menusIds = [...checkedKeys, ...halfCheckedKeys];
        let ok, msg;
        this.submitLoading = true;
        if (this.id) {
          // 修改
          [ok, msg] = await this.$ajax.system.updateRole(userInfo);
          if (ok) {
            this.$message.success("更新成功");
          } else {
            this.$message.error(`${msg}`);
          }
        } else {
          // 新建
          if (!this.userInfo.name) {
            this.$refs.form.validate().catch(() => "");
            return false
          } else {
            [ok, msg] = await this.$ajax.system.createRole(userInfo);
            if (ok) {
              this.$message.success("新增成功")
            } else {
              this.$message.error(`${msg}`);
            }
          }
        }
        this.submitLoading = false;
        return ok
      },

      async getMenuTree() {
        this.jurisdictions = await this.$ajax.system.getMenuTree();
      },

      async getRoleDetail() {
        let res = await this.$ajax.system.getRoleDetail(this.id);
        if (res) {
          this.userInfo = res;
          this.userInfo.menusIds = this.userInfo.menusIds || [];
        } else {
          this.$message.error("数据查询失败");
        }
      },

      isMenuLeaf(menuId) {
        // 判断是不是叶子节点
        let toCheckList = this.$utils.gadgets.deepClone(this.jurisdictions);
        while (toCheckList.length) {
          let node = toCheckList.pop();

          if (node.id === menuId) {
            return !node.children
          }

          if (node.children) {
            toCheckList = [...toCheckList, ...node.children]
          }
        }

        return false
      }
    }
  }
</script>

<style scoped lang="less">
  .content-container {
    width: 100%;
  }
</style>
