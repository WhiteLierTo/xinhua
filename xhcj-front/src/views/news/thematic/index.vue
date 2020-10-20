<template>
  <div class="menu-manage-container cddddvvv">
    <div class="condition-filters-container">
      <div class="filters-container">
        <div class="filter-cell-container">
          <el-input
              @keyup.enter.native="search" v-model="form.name"
              clearable placeholder="请输入专题名称"
              style="width: 100%"
          ></el-input>
        </div>
        <div class="filter-cell-container">
          <el-select clearable v-model="form.backShowFlag" placeholder="请选择后台显示或隐藏" style="width: 100%">
            <el-option v-for="(op,index) in options" :key="index" :label="op.label" :value="op.value"></el-option>
          </el-select>
        </div>
      </div>

      <div class="operation-container">
        <el-button @click="reset">清空</el-button>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="thematic-table-container fdssfdsdff">
      <div class="operation-container">
        <el-button type="success" icon="el-icon-plus" @click="addHandle">新增</el-button>
        <el-button :disabled="multipleSelection.length !== 1" icon="el-icon-edit" type="warning" @click="editHandle">修改
        </el-button>
        <el-button type="info" :disabled="multipleSelection.length === 0" @click="isShowWillDeleteAll=true"
                   icon="el-icon-delete">批量删除
        </el-button>
        <el-button :disabled="multipleSelection.length !== 1" type="info" icon="el-icon-rank" class="moveTo"
                   @click="moveToInfo.isShow = true">移动至
        </el-button>
      </div>
      <div class="table-container" ref="table">
        <el-table :data="tableData" ref="multipleTable" row-key="id" @selection-change="_handleSelectionChange"
                  @row-click="rowClick" @row-dblclick="editHandle"
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}" stripe tooltip-effect="dark"
                  height="100%" size="mini">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="专题名称" width="240" align="left"></el-table-column>
          <el-table-column label="显示状态(后台)" align="center" width="120">
            <template slot-scope="scope">
              <span> {{ scope.row.backShowFlag?'显示':'隐藏' }} </span>
            </template>
          </el-table-column>
          <el-table-column label="显示状态(App)" align="center" width="120">
            <template slot-scope="scope">
              <span> {{ scope.row.displayFlag?'显示':'隐藏' }} </span>
            </template>
          </el-table-column>
          <el-table-column
              label="备注" prop="description" width="auto" align="left"
              header-align="center"
              min-width="500"
          ></el-table-column>
          <el-table-column prop="address" label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editHandle(scope.row)">
                <i class="el-icon-edit"></i>修改
              </el-button>
              <el-button type="text" size="small" v-if="scope.row.parentId !== 'ROOT'">
                <el-popconfirm title="请确认是否删除该行数据？" popper-class="auto-table-pop-container"
                               @onConfirm="()=> deleteHandle(scope.row.id)">
                  <i slot="reference" class="el-icon-delete">删除</i>
                </el-popconfirm>
              </el-button>
              <el-button type="text" size="small" v-if="scope.row.parentId==='root_channel_id'"
                         @click="addSubcolumn(scope.row)">
                <i class="el-icon-plus"></i>新增子栏目
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :current-page.sync="form.pageNum"
                       :page-size.sync="form.pageSize" :total="form.total" :hide-on-single-page="false"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="isShowWillDeleteAll" width="30%">
      <span>请确认是否批量删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowWillDeleteAll = false">取 消</el-button>
        <el-button type="primary" @click="()=>deleteAll()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增子栏目" :visible.sync="dialogTempShow" :show-close="true" :close-on-click-modal="false"
               :modal="true" width="40%">
      <addSubcolumn @dialog-show="dialogShow" :parentInfo="parentInfo"/>

    </el-dialog>
    <dialogTemplate width="400" title="移动至" v-if="moveToInfo.isShow" :onClose="()=>moveToInfo.isShow = false"
                    :onSubmit="submitMoveTo">
      <el-form ref="form" :model="moveToInfo" :rules="moveToInfo.rules" label-width="80px">
        <el-form-item label="移动至" prop="moveToIndex">
          <el-input-number v-model.trim="moveToInfo.moveToIndex" :min="1" placeholder="请输入移动位置的排序序号"></el-input-number>
        </el-form-item>
      </el-form>
    </dialogTemplate>
  </div>
</template>
<script>
  import addSubcolumn from "./add-subcolumn"

  export default {
    name: "menuManage",
    components: {addSubcolumn},
    data() {
      return {
        form: {
          name: "",
          backShowFlag: "",
          pageSize: 20,
          pageNum: 1
        },
        options: [
          {
            label: "显示",
            value: 1
          },
          {
            label: "隐藏",
            value: 0
          }
        ],

        tableData: [],
        parentInfo: "",
        dialogTempShow: false,
        multipleSelection: [],
        moveToInfo: {
          rules: {
            moveToIndex: [
              {required: true, message: '请输入移动至的目标', trigger: 'blur'},
            ]
          },
          moveToIndex: "",
          isShow: false
        },
        isShowWillDeleteAll: false,
      }
    },
    mounted() {
      this.getThematicListList();
    },
    methods: {
      getThematicListList() {
        this.$ajax.news.thematic.getThematicListList(this.form).then(res => {
          this.tableData = res.rows;
          this.form.total = res.total
        });
      },
      _handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      //重置
      reset() {
        this.form.name = "";
        this.form.backShowFlag = "";
        this.getThematicListList();
      },
      //搜索
      search() {
        this.getThematicListList();
      },

      //新增
      addHandle() {
        this.$router.push('thematic/addThematic')
      },
      //取消
      cancel() {
      },
      //修改
      editHandle(row) {
        var id = row.id || this.multipleSelection[0].id
        this.$router.push('thematic/addThematic?id=' + id)
      },

      rowClick(row) {
        this.$refs.multipleTable.toggleRowSelection(row);
      },

      // 删除
      deleteHandle(id) {
        let ids = []
        ids.push(id)
        this.deleteThematic(ids)
      },
      deleteAll() {
        let ids = this.multipleSelection.map(d => d.id)
        this.deleteThematic(ids)
      },
      deleteThematic(ids) {
        this.$ajax.news.thematic.deleteThematic(ids).then(res => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.isShowWillDeleteAll = false
            this.getThematicListList()
          } else {
            this.$message.error(res.msg);
          }
        })
      },

      dialogShow(val) {
        this.dialogTempShow = val;
        this.getThematicListList();
      },
      async submitMoveTo() {
        this.moveToInfo.moveToIndex = parseInt(this.moveToInfo.moveToIndex);

        if (this.moveToInfo.moveToIndex > this.form.total) {
          this.$message.error("移动至的目标不能大于数据总条数");
          return false
        }

        this.moveToInfo.id = this.multipleSelection[0].id
        this.moveToInfo.sortId = this.multipleSelection[0].sortId
        if (this.multipleSelection[0].parentId !== 'root_channel_id') {
          this.moveToInfo.parentId = this.multipleSelection[0].parentId
        }
        this.$ajax.news.thematic.moveToInfo(this.moveToInfo).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.moveToInfo.isShow = false
            this.getThematicListList()
          } else {
            this.$message.error(res.msg);
          }
        })

      },
      handleSizeChange() {
        this.getThematicListList()
      },

      handleCurrentChange() {
        this.getThematicListList()
      },
      addSubcolumn(row) {
        this.dialogTempShow = true
        this.parentInfo = row
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

    .thematic-table-container {
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

  .moveTo {
    color: #fff;
    background-color: #6ac6c8;
    border-color: #6ac6c8;
  }

  .moveTo.is-disabled {
    background-color: #99dee0;
    border-color: #99dee0;
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