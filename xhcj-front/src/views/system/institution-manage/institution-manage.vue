<template>
  <div class="menu-manage-container cddddvvv">
    <div class="condition-filters-container">
      <div class="filters-container">
        <div class="filter-cell-container">
          <el-input
              clearable
              @keyup.enter.native="search" v-model="form.organizeName" placeholder="请输入组织名称"
              style="width: 100%"
          ></el-input>
        </div>
        <div class="filter-cell-container">
          <el-select clearable v-model="form.state" placeholder="请选择状态" style="width: 100%">
            <el-option v-for="(op,index) in options" :key="index" :label="op.label" :value="op.value"></el-option>
          </el-select>
        </div>
      </div>

      <div class="operation-container">
        <el-button @click="reset()">清空</el-button>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="auto-table-container fdssfdsdff">
      <div class="operation-container">
        <el-button type="success" icon="el-icon-plus" @click="addHandle">新增</el-button>
      </div>
      <div class="table-container" ref="table">
        <el-table :data="tableData" @row-dblclick="editHandle" row-key="id"
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}" stripe tooltip-effect="dark"
                  height="100%" size="mini">
          <el-table-column prop="name" label="部门名称" width="auto" align="left"></el-table-column>
          <el-table-column label="状态" align="left" prop="state">
            <template slot-scope="scope">
              <span v-if="scope.row.state===0">正常</span>
              <span v-if="scope.row.state===1">停用</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="150" align="center">
            <template slot-scope="scope">
              <span>{{$utils.format.timeStampToStandardStr(scope.row.createTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editHandle(scope.row)">
                <i class="el-icon-edit"></i>修改
              </el-button>
              <el-button type="text" size="small" @click="addHandle(scope.row)" style="margin-right: 4px;">
                <i class="el-icon-plus"></i>新增
              </el-button>
              <el-button type="text" size="small" v-if="scope.row.parentId !== 'ROOT'">
                <el-popconfirm title="请确认是否删除该行数据？" popper-class="auto-table-pop-container"
                               @onConfirm="()=> deleteHandle(scope.row.id)">
                  <i slot="reference" class="el-icon-delete">删除</i>
                </el-popconfirm>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
        :title="title" :visible.sync="dialogTempShow" :show-close="true" :close-on-click-modal="false"
        :before-close="handleClose" :modal="true" width="40%"
        v-if="dialogTempShow"
    >
      <institutionDialog @dialog-show="dialogShow" :type="type" @ :modifyData="modifyData"/>
    </el-dialog>
  </div>
</template>
<script>
  import institutionDialog from "./institution-dialog";

  export default {
    name: "menuManage",
    components: {institutionDialog},
    data() {
      return {
        form: {
          organizeName: "",
          state: "",
          isTreeSelect: 0
        },
        options: [
          {
            label: "正常",
            value: "0"
          },
          {
            label: "停用",
            value: "1"
          }
        ],

        tableData: [],
        title: "",
        type: "",
        modifyData: {},
        dialogTempShow: false
      };
    },
    mounted() {
      this.getOrganizeList();
    },
    methods: {
      getOrganizeList() {
        this.$ajax.system.getOrganizeList(this.form).then(res => {
          this.tableData = res.data ? res.data[0].children : []
        });
      },

      //重置
      reset() {
        this.form.organizeName = "";
        this.form.state = "";
        this.getOrganizeList();
      },
      //搜索
      search() {
        this.getOrganizeList();
      },
      //新增
      addHandle(row) {
        this.dialogTempShow = true;
        this.title = "新增机构";
        this.type = "create";
        this.modifyData = {
          name: "",
          state: 0,
          parentId: row.id,
          memo: "",
        };
      },
      //取消
      handleClose() {
        this.dialogTempShow = false;
        this.getOrganizeList();
      },
      //修改
      editHandle(row) {
        if (row.state) {
          row.state = row.state + "";
        }
        this.dialogTempShow = true;
        this.title = "修改机构";
        this.type = "modify";
        this.modifyData = row;
      },
      deleteHandle(id) {
        this.$ajax.system.deleteOrganize(id).then(res => {
          if (res.code !== 200) {
            this.$message.warning(res.msg);
          } else {
            this.getOrganizeList();
            this.$message.success("删除成功");
          }
        });
      },
      dialogShow(val) {
        this.dialogTempShow = val;
        this.getOrganizeList();
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

        i {
          padding-right: 3px;
        }
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

  .cddddvvv {
    .fdssfdsdff {
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
    }

    .el-dialog {
      border-radius: 8px;
    }
  }
</style>