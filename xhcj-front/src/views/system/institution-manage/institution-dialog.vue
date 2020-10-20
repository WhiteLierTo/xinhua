<template>
  <div class="vvfdfvfsdv" v-loading="!organizeOptions.length">
    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="上级组织:" prop="parentId">
        <treeselect
            v-model="form.parentId"
            :options="organizeOptions"
            :show-count="true"
            placeholder="选择上级组织"
            v-if="organizeOptions.length"
        />
      </el-form-item>
      <el-form-item label="组织名称:" prop="name">
        <el-input v-model="form.name" placeholder="请输入组织名称"></el-input>
      </el-form-item>
      <el-form-item label="组织状态:" prop="state">
        <el-radio-group v-model="form.state">
          <el-radio label="0">正常</el-radio>
          <el-radio label="1">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="机构描述:" prop="memo">
        <el-input type="textarea" :rows="6" v-model="form.memo" placeholder="请输入机构描述"></el-input>
      </el-form-item>
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

  export default {
    name: "insitutionDialog",
    props: ["modifyData", "type"],
    components: {Treeselect},
    data() {
      return {
        form: {
          parentId: "",
          name: "",
          state: "0",
          memo: ""
        },
        rules: {
          name: [{required: true, message: "请输入组织名称", trigger: "blur"}]
        },
        organizeOptions: [] //上级菜单
      };
    },
    mounted() {
      this.getOrganizeTree();
      let modifyData = JSON.parse(JSON.stringify(this.modifyData))
      if (modifyData.state !== "") {
        modifyData.state = modifyData.state.toString();
      }
      this.form = modifyData;
    },
    watch: {
      modifyData(newVal) {
        let modifyData = newVal;
        if (modifyData.state !== "") {
          modifyData.state = modifyData.state.toString();
        }
        this.form = modifyData;
      }
    },
    methods: {
      getOrganizeTree() {
        var data = {
          // state: 0,
          isTreeSelect: 1
        };
        this.$ajax.system.getOrganizeList(data).then(res => {
          this.menuOptions = [];
          this.organizeOptions = res.data;
        });
      },
      cancel() {
        this.$emit("dialog-show", false);
        this.$refs.form.resetFields();
      },
      //确定
      submitForm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            let form = this.form;
            form.state = parseInt(form.state);
            if (this.type === "modify") {
              this.$ajax.system
                  .updateOrganize(form)
                  .then(res => {
                    if (res.code == 200) {
                      this.$emit("dialog-show", false);
                      this.$message.success("修改成功");
                    }
                  })
                  .catch(res => {
                    this.$message({
                      type: "error",
                      message: res.msg
                    });
                  });
            } else if (this.type === "create") {
              this.$ajax.system
                  .addOrganize(form)
                  .then(res => {
                    if (res.code == 200) {
                      this.$emit("dialog-show", false);
                      this.$message.success("新增成功");
                    }
                  })
                  .catch(res => {
                    this.$message({
                      type: "error",
                      message: res.msg
                    });
                  });
            }
          }
        });
      }
    }
  };
</script>

<style lang="less">
  .vvfdfvfsdv {
    padding-bottom: 30px;
    overflow: hidden;

    .dialog-footer {
      float: right;
    }

    .el-input__prefix {
      top: 0
    }
  }
</style>