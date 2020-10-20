<template>
  <div class="menu-manage-container dssfsdf">
    <div class="condition-filters-container">
      <div class="filters-container">
        <div class="filter-cell-container">
          <el-input v-model="form.name" placeholder="请输入菜单名称" style="width: 100%"></el-input>
        </div>
        <div class="filter-cell-container">
          <el-select v-model="form.hideFlag" placeholder="菜单状态" style="width: 100%">
            <el-option
                v-for="(op,index) in options"
                :key="index"
                :label="op.label"
                :value="op.value"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div class="operation-container">
        <el-button @click="reset">清空</el-button>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="auto-table-container dssdcds">
      <div class="operation-container">
        <el-button type="success" icon="el-icon-plus" @click="addHandle()">新增</el-button>
      </div>
      <div class="table-container" ref="table">
        <el-table
            :data="tableData"
            @row-dblclick="editHandle"
            row-key="id"
            stripe
            style="width: 100%"
            height="100%"
            size="mini"
        >
          <el-table-column prop="name" label="菜单名称" width="200"></el-table-column>
          <!--<el-table-column prop="icon" label="图标" width="130">-->
            <!--<template slot-scope="scope">-->
              <!--<svg-icon :icon-class="scope.row.icon"/>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column prop="perms" label="权限标识" width="280"></el-table-column>
          <!--<el-table-column prop="path" label="组件路径" width="280"></el-table-column>-->
          <el-table-column prop="hideFlag" label="可见" width="130">
            <template slot-scope="scope">
              <span v-if="scope.row.hideFlag===0">显示</span>
              <span v-else-if="scope.row.hideFlag===1">隐藏</span>
            </template>
          </el-table-column>
          <!--<el-table-column prop="createTime" label="创建时间" width="180">-->
            <!--<template-->
                <!--slot-scope="scope"-->
            <!--&gt;{{$utils.format.timeStampToStandardStr(scope.row.createTime)}}-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editHandle(scope.row)">
                <i class="el-icon-edit">修改</i>
              </el-button>
              <el-button type="text" size="small" @click="addHandle(scope.row.id)">
                <i class="el-icon-plus">新增</i>
              </el-button>
              <el-button type="text" size="small">
                <el-popconfirm
                    title="请确认是否删除该行数据？"
                    popper-class="auto-table-pop-container"
                    @onConfirm="()=> deleteHandle(scope.row.id)"
                >
                  <i slot="reference" class="el-icon-delete">删除</i>
                </el-popconfirm>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
        :title="title"
        :visible.sync="dialogTempShow"
        :show-close="true"
        :close-on-click-modal="false"
        :modal="true"
        width="40%"
    >
      <menu-dialog
          v-if="dialogTempShow"
          @dialog-show="dialogShow"
          :modifyData="modifyData"
          :status="status"
      ></menu-dialog>
    </el-dialog>
  </div>
</template>
<script>
  import menuDialog from "./menu-dialog";

  export default {
    name: "menuManage",
    components: {menuDialog},
    data() {
      return {
        form: {
          name: "",
          hideFlag: ""
        },
        options: [
          {
            label: "显示",
            value: "0"
          },
          {
            label: "隐藏",
            value: "1"
          }
        ],
        tableData: [],
        title: "",
        dialogTempShow: false,
        modifyData: {},
        status: "",
      };
    },
    mounted() {
      this.getMenuList();
    },
    methods: {
      getMenuList() {
        this.$ajax.system.getMenuList(this.form).then(res => {
          this.tableData = res.data;
        });
      },

      handleSizeChange() {
      },
      handleCurrentChange() {
      },
      //重置
      reset() {
        for (let key in this.form) {
          this.form[key] = "";
        }
      },
      //搜索
      search() {
        this.getMenuList();
      },
      //新增
      addHandle(parentId) {
        this.dialogTempShow = true;
        this.title = "新增菜单";
        this.status = "add";
        this.modifyData = {
          parentId,
          menuType: "M",
          name: "",
          icon: "",
          orderNum: "",
          isFrame: "1",
          path: "",
          component: "",
          perms: "",
          hideFlag: "0",
          memo: ""
        };
        this.getMenuList();
      },
      //删除
      deleteHandle(id) {
        this.$ajax.system.deleteMenu(id).then(res => {
          if (res.code !== 200) {
            this.$message.warning(res.msg);
          } else {
            this.getMenuList();
            this.$message.success("删除成功");
          }
        });
      },
      //取消
      cancel() {
      },
      //修改
      editHandle(row) {
        this.dialogTempShow = true;
        this.status = "modify";
        this.title = "修改菜单";
        this.modifyData = row;
      },
      dialogShow(val) {
        this.dialogTempShow = val;
        this.getMenuList();
      }
    }
  };
</script>
<style scoped lang="less">
  @import "../../../style/config";
  @import "../../../style/styles";

  .menu-manage-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    .condition-filters-container {
      width: 100%;
      display: flex;
      background-color: @defaultCardBgColor;
      padding: @defaultPaddingY @defaultPaddingX 0;
      align-items: flex-start;
      flex-shrink: 0;

      .operation-container {
        margin-left: auto;
        flex-shrink: 0;
        .flexCenter();
      }

      .filters-container {
        flex: 1;
        flex-shrink: 0;
        display: flex;
        flex-wrap: wrap;

        .filter-cell-container {
          margin-right: @defaultPaddingX;
          margin-bottom: @defaultPaddingY;
          width: @defaultFilterWidth;
          .flexCenter();
        }
      }
    }

    .auto-table-container {
      width: 100%;
      height: 100%;
      flex: 1;
      padding: @defaultPaddingY @defaultPaddingX;
      background-color: @defaultCardBgColor;
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      overflow: hidden;

      .operation-container {
        display: flex;
        align-items: center;
        margin-bottom: @defaultPaddingY;
        flex-shrink: 0;
      }

      .table-container {
        width: 100%;
        margin-bottom: @defaultPaddingY;
        flex: 1;
        overflow: hidden;
        border: 1px solid #dcdfe6;
      }

      .pagination-container {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        flex-shrink: 0;
      }
    }
  }

  .auto-table-pop-container {
    .el-popconfirm__action {
      margin-top: 8px;
    }
  }
</style>
<style lang="less">
  @import "../../../style/config";
  @import "../../../style/styles";

  .dssfsdf {
    .auto-table-pop-container .el-popconfirm__main {
      margin-bottom: 12px !important;
    }

    .FH-table {
      border: 1px solid @defaultBorderColor;
    }

    .el-table th {
      height: 40px;
      background: @defaultTableHeadBgColor;
      color: @defaultTableHeadColor;
      font-weight: 600;
      padding: 0;
    }

    .el-table tr {
      height: 40px;
      cursor: pointer;
    }

    .el-table .cell {
      font-size: 12px;
    }

    .el-popconfirm__main {
      margin-bottom: 8px !important;
    }
  }

  .el-dialog {
    border-radius: 8px;
  }
</style>
