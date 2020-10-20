<template>
  <div class="info-management  kbjjknb">
    <tableWithFilter class="table" v-model="tableThis" :filtersInfo="filtersInfo" :tableInfo="tableInfo" :mock="false">
      <el-button type="info" icon="el-icon-delete" slot="table-left" @click="batchDelHandle " :disabled="isMultiple">批量删除</el-button>
      <el-button type="success" icon="el-icon-refresh" slot="table-left" @click="batchReloadHandle " :disabled="isMultiple">批量重置角色</el-button>
      <el-button type="primary" icon="el-icon-refresh" slot="table-left" @click="batchTagHandle" :disabled="isMultiple">设置标签</el-button>
      <userDialog slot="create" slot-scope="scope" :onClose="scope.onClose" />
      <userDialog slot="modify" slot-scope="scope" :id="scope.row.id" :onClose="scope.onClose" />
    </tableWithFilter>
    <tagsDialog v-if="showTagsDialog" :onClose="onCloseTagsDialog" :selectUserId="selectUserId" />
  </div>
</template>

<script>
import userDialog from "./user-dialog";
import tagsDialog from "./tags-dialog"
export default {
  name: "backgrounduser",
  components: { userDialog, tagsDialog },
  data() {
    return {
      type: true,
      filtersInfo: [
        {
          type: "input",
          placeholder: "请输入用户名",
          submitName: "name"
        },
        {
          type: "input",
          placeholder: "请输入登录名",
          submitName: "loginName"
        },
        {
          type: "input",
          placeholder: "请输入手机号",
          submitName: "mobile"
        },
        {
          type: "select",
          placeholder: "请选择状态",
          options: this.$utils.data.system.userStatusOptions(),
          submitName: "state"
        },
        {
          type: "dateRange",
          placeholder: ["创建开始时间", "创建结束时间", "-"],
          beforeSubmit: d => +d,
          submitName: ["beginTime", "endTime"]
        },

      ],
      tableInfo: {
        searchUrl: "/system/user/app/list",
        deleteAllUrl: "/system/user/batchDel",

        columns: [
          {
            prop: "name",
            label: "用户名"
          },
          {
            prop: "loginName",
            label: "登录名"
          },
          {
            prop: "mobile",
            label: "手机号"
          },
          {
            prop: "organizeName",
            label: "组织"
          },

          {
            prop: "frontFlag",
            label: "用户类型",
            beforeDisplay: row => {
              if (row.frontFlag === 1) return '前台用户'
              if (row.frontFlag === 0) return '后台用户'
            }
          },
          {
            prop: "createDate",
            label: "创建时间",
            beforeDisplay: row =>
              this.$utils.format.timeStampToStandardStr(row.createDate)
          },
          {
            prop: "state",
            label: "状态",
            beforeDisplay: row => {
              if (row.state === 0) return '正常'
              if (row.state === 1) return '锁定'
              if (row.state === 2) return '禁用'
            }
          },
          {
            prop: "isFact",
            label: "是否实名",
            beforeDisplay: row => {
              if (row.isFact === 0) return '否'
              if (row.isFact === 1) return '是'
            }
          },
          {
            prop: "roleNames",
            label: "角色"
          },
          {
            prop: "tagNames",
            label: "标签"
          },

        ],
        operations: {
          delete: {
            show: true
          },
          extra: [
            {
              label: "重置",
              iconPath: require("../../../assets/other/reload.png"),
              onClick: (row, index) => {
                this.$prompt("请输入" + row.name + "的新密码", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消"
                })
                  .then(({ value }) => {
                    this.resetUser(row.id, value)
                  })
                  .catch(() => { });
              }
            }
          ]
        },
        hides: ["deleteAll"]
      },
      showTagsDialog: false,
      tableThis: null,
      selectUserId: []
    };
  },
  mounted() {
    var data = {
      // state: 0,
      isTreeSelect: 1
    }

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
    //    单个重置
    async resetUser(id, password) {
      var resetForm = {
        id,
        password
      }
      let flag = await this.$ajax.system.resetUserPsd(resetForm);
      if (flag) {
        this.$message.success("重置成功")

      } else {
        this.$message.error("重置失败");
      }
    },
    // 批量删除
    batchDelHandle(id) {
      this.$confirm(
        "确定删除这些用户信息？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      )
        .then(async () => {
          var userId = []
          this.tableThis.table.multipleSelection.forEach(item => {
            userId.push(item.id)
          });
          let flag = await this.$ajax.system.batchDel(userId);
          if (flag) {
            this.$message.success("删除成功")
            this.tableThis.table.refresh();
          } else {
            this.$message.error("删除失败");
          }

        })
        .catch(() => { });
    },
    // 批量重置
    batchReloadHandle() {
      this.$confirm(
        "确定要重置这些用户的角色吗？选中用户的原有角色将被清除！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      )
        .then(async () => {
          var userId = []
          this.tableThis.table.multipleSelection.forEach(item => {
            userId.push(item.id)
          });
          let flag = await this.$ajax.system.batchResetRole(userId);
          if (flag) {
            this.$message.success("重置成功")
            this.tableThis.table.refresh();
          } else {
            this.$message.error("重置失败");
          }
        })
        .catch(() => { });
    },
    //   标签管理
    batchTagHandle() {
      //   console.log(this.tableThis.table.multipleSelection)
      this.tableThis.table.multipleSelection.forEach(item => {
        this.selectUserId.push(item.id)
      })
      this.showTagsDialog = true
    },
    onCloseTagsDialog() {
      this.showTagsDialog = false
      this.tableThis.table.refresh();
      this.tableThis.table.multipleSelection = []
    }

  }


};
</script>

<style lang="less" scoped>
.info-management {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
<style lang="less">
.kbjjknb {
  .el-menu {
    border: none;
  }
  .el-menu-item {
    border-bottom: 1px solid #ededf6;
  }
  .el-submenu__title {
    border-bottom: 1px solid #ededf6 !important;
  }
  .el-submenu.is-active .el-submenu__title {
    border-bottom: 1px solid #ededf6 !important;
  }
  .el-menu-item-group__title {
    padding: 0;
  }
  .el-button--danger {
    color: #fff;
    background-color: #da7ec8;
    border-color: #da7ec8;
  }
  .el-button--danger.is-disabled {
    background-color: #e6abdb;
    border-color: #e6abdb;
  }
}
</style>