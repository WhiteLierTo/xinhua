<template>
  <div class="dsfdsgdx">
    <dialogTemplate ref="dialogTemplate" :onClose="onClose" :onSubmit="onSubmit" :width="width" title="标签管理">
      <div :style="{height:height+'px'}">
        <tableWithFilter class="table" v-model="tableThis" :tableInfo="tableInfo" :mock="false">
        </tableWithFilter>
      </div>
      <el-form ref="form" label-width="100px">
        <el-form-item label="标签名称:" class="left-box">
          <el-input v-model="tagForm.tagName" placeholder="请输入标签名称"></el-input>
        </el-form-item>
        <el-form-item label="标签描述:">
          <div class="add-tag">
            <el-input v-model="tagForm.tagRemark" placeholder="请输入标签描述"></el-input>
            <el-button class="add-btn" @click="addTag()">确认新增</el-button>
          </div>
        </el-form-item>
      </el-form>
    </dialogTemplate>
  </div>
</template>

<script>
export default {
  name: "userDialog",
  props: ["onClose", "selectUserId"],
  data() {
    return {
      width: window.innerWidth * 0.5,
      height: window.innerHeight * 0.5,
      tagForm: {
        tagName: "",
        tagRemark: ""
      },
      ids: [],
      tableInfo: {
        searchUrl: "/system/user/tage/list",
        method: "GET",
        deleteAllUrl: "/system/user/tage/batchDel",
        columns: [
          {
            prop: "tagName",
            label: "标签",
            canModify: true
          },
          {
            prop: "tagRemark",
            label: "标签描述",
            canModify: true
          }
        ],
        operations: {
          delete: {
            show: true
          },
        },
        hides: ["create", "modify", "deleteAll"],
        modifyConfig: {
          onInSituModify: this.tagChange
        }
      },
      tableThis: null
    };
  },

  computed: {
    isMultiple() {
      return (
        !this.tableThis ||
        !this.tableThis.table ||
        this.tableThis.table.multipleSelection.length === 0
      );
    }
  },
  methods: {
    async   onSubmit() {
      if (this.tableThis.table.multipleSelection.length != 0) {
        if (this.submitLoading) return;
        this.submitLoading = true;
        let flag;
        this.tableThis.table.multipleSelection.forEach(item => {
          this.ids.push(item.id)
        })
        let obj = {
          userIds: this.selectUserId,
          ids: this.ids
        }

        flag = await this.$ajax.appUser.bandingTags(obj);
        if (flag) {
          this.$message.success("设置成功")
        } else {
          this.$message.error("设置失败");
        }
        this.submitLoading = false;
        return flag
      } else {
        this.$message.warning("至少选择一个标签！");
      }

    },
    addTag() {
      this.$ajax.appUser.createTag(this.tagForm).then(res => {
        if (res.code === 200) {
          this.$message.success("新增成功")
          this.tableThis.table.refresh();
        } else {
          this.$message.warning(res.msg);
        }
      })

    },
    // 标签修改
    async tagChange(oldRow, col, val, refresh) {
      if (val === "") {
        this.$message.error("不可为空");
        return;
      }
      let obj = {
        id: oldRow.id,
        tagName: oldRow.tagName,
        tagRemark: oldRow.tagRemark
      }
      if (col.prop === "tagName") {
        obj.tagName = val
      }
      if (col.prop === "tagRemark") {
        obj.tagRemark = val
      }

      if (await this.$ajax.appUser.addAndModifyTag(obj)) {
        this.$message.success("修改成功");
        refresh();
      } else {
        this.$message.error("修改失败");
      }
    }

  }
}





</script>

<style lang="less" scoped>
.add-tag {
  width: 131%;
  display: flex;
  justify-content: space-between;
  .add-btn {
    margin-left: 10px;
  }
}
</style>
<style lang="less">
.dsfdsgdx {
  .el-form {
    width: 50%;
  }
}
</style>
