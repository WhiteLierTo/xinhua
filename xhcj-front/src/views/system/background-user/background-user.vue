<template>
  <div class="active-info-management kbjjknbjyu">
    <div class="search">
      <div class="input">
        <el-input placeholder="请输入组织名称" clearable v-model="organizeName">
        </el-input>
        <el-button slot="append" icon="el-icon-search" @click="searchOrganize"></el-button>
      </div>
      <div class="search-list">
        <el-tree :data="organizeOptions" :props="defaultProps" :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree" default-expand-all @node-click="handleNodeClick" />
      </div>
    </div>
    <tableWithFilter class="table" v-model="tableThis" :filtersInfo="filtersInfo" :tableInfo="tableInfo" :mock="false">
      <el-button type="info" icon="el-icon-delete" slot="table-left" @click="batchDelHandle " :disabled="isMultiple">批量删除</el-button>
      <el-button type="success" icon="el-icon-refresh" slot="table-left" @click="batchReloadHandle " :disabled="isMultiple">批量重置角色</el-button>
      <userDialog slot="create" slot-scope="scope" :onClose="scope.onClose" />
      <userDialog slot="modify" slot-scope="scope" :id="scope.row.id" :onClose="scope.onClose" />
    </tableWithFilter>
  </div>
</template>

<script>
import userDialog from "./user-dialog";
export default {
  name: "backgrounduser",
  components: { userDialog },
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
        searchUrl: "/system/user/list",
        deleteAllUrl: "/system/user/batchDel",
        defaultQuery: {
          organizeId: () => this.organizeId
        },
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
            prop: "roleNames",
            label: "角色"
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
          }
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
      organizeOptions: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      organizeName: "",
      organizeId: "",
      tableThis: null
    };
  },
  mounted() {
    var data = {
      // state: 0,
      isTreeSelect: 1
    }
    this.getOrganizeTree(data)
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

    //获取部门树
    getOrganizeTree(data) {
      this.$ajax.system.getOrganizeList(data).then(res => {
        this.organizeOptions = res.data;
      });
    },
    //搜索部门
    searchOrganize() {
      var data = {
        isTreeSelect: 1,
        organizeName: this.organizeName
      }
      this.getOrganizeTree(data)
    },

    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.organizeId = data.id;
      this.tableThis.table.refresh();
    },
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
          var userId = this.tableThis.table.multipleSelection.map(d => d.id)
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
        "确定重置选中用户的角色吗？选中用户的原有角色将被清除！",
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
    }
  }
};
</script>

<style lang="less" scoped>
.active-info-management {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  .search {
    width: 280px;
    background: #fff;
    overflow: auto;
    flex-shrink: 0;
    .input {
      display: flex;
      justify-content: space-between;
      width: 90%;
      margin: 20px auto;
      .el-button {
        margin-left: 10px;
      }
    }
    .search-list {
      width: 90%;
      margin: 20px auto;
      //   border: solid 1px #dcdfe6;
    }
  }
  .table {
    flex: 1;
    margin-left: 20px;
    overflow: hidden;
  }
}
</style>
<style lang="less">
.kbjjknbjyu {
  .el-menu {
    border: none;
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
  .el-tree {
    border-bottom: 1px solid #dcdfe6;
  }
  .el-tree-node__content {
    height: 32px !important;
    border-top: 1px solid #dcdfe6;
    border-left: 1px solid #dcdfe6;
    border-right: 1px solid #dcdfe6;
    margin-right: 2px;
  }
}
</style>