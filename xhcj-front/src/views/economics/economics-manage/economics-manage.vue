<template>
  <div class="active-info-management">
    <tableWithFilter
      v-model="tableThis"
      :filtersInfo="filtersInfo"
      :tableInfo="tableInfo"
      :mock="false"
    >
    </tableWithFilter>
    <el-dialog
      title="移动位置"
      :visible.sync="isOPen"
      :show-close="true"
      :close-on-click-modal="true"
      :modal="true"
      width="30%"
    >
      <move-dialog @dialog-show="dialogShow" />
    </el-dialog>
  </div>
</template>
<script>
import moveDialog from "./move-dialog";

export default {
  name: "economicsManage",
  components: {
    moveDialog
  },
  data() {
    return {
      filtersInfo: [
        {
          type: "input",
          placeholder: "请输入机构名称",
          submitName: "organizeName"
        },
        {
          type: "select",
          placeholder: "请选择机构类型",
          defaultValue: "",
          options: this.$utils.data.economics.econStatusOptions(),
          submitName: "organizeType"
        }
      ],
      tableInfo: {
        searchUrl: "/cjh/list",
        deleteAllUrl: "/cjh/del",
        defaultQuery: {
          organizeName: "",
          organizeType: ""
        },
        columns: [
          {
            prop: "name",
            label: "机构名称"
          },
          {
            prop: "type",
            label: "机构类型"
          },
          {
            prop: "tags",
            label: "机构标签"
          },
          {
            prop: "pageUrl",
            label: "网址"
          }
        ],
        createConfig: {
          path: "/economics/economicsManage/addEconomics"
        },

        modifyConfig: {
          path: row => `/economics/economicsManage/addEconomics?id=${row.id}`
        },
        reSortConfig: {
          moveToPath: "/cjh/move",
          sortPath: "/cjh/sort"
        },
        reSort: true
      },
      tableThis: null,
      isOPen: false
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
    deleteHandle() {},
    moveHandle() {
      this.isOPen = true;
    },
    dialogShow(val) {
      this.isOPen = val;
    }
  }
};
</script>
<style lang="less" scoped>
.active-info-management {
  width: 100%;
  height: 100%;
  position: relative;
  .sort {
    color: #fff;
    background-color: #8fc149;
    border-color: #8fc149;
  }
  .move {
    color: #fff;
    background-color: #6ac6c8;
    border-color: #6ac6c8;
  }
  .move.is-disabled {
    background-color: #99dee0;
    border-color: #99dee0;
  }
}
</style>