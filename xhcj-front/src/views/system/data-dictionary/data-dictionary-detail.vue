<template>
  <div class="active-info-management">
    <tableWithFilter :filtersInfo="filtersInfo" :tableInfo="tableInfo" :mock="false">
      <dictionaryDetailDialog
        slot="create"
        slot-scope="scope"
        :code="code"
        :onClose="scope.onClose"
      />
      <dictionaryDetailDialog
        slot="modify"
        slot-scope="scope"
        :id="scope.row.id"
        :code="code"
        :onClose="scope.onClose"
      />
    </tableWithFilter>
  </div>
</template>
<script>
import dictionaryDetailDialog from "./data-dictionary-detail-dialog";
export default {
  name: "dataDictionaryDetail",
  components: { dictionaryDetailDialog },
  data() {
    return {
      filtersInfo: [
        {
          type: "select",
          placeholder: "请选择字典名称",
          defaultValue: "",
          options: [],
          submitName: "parentCode"
        },
        {
          type: "input",
          placeholder: "请输入字典标签",
          submitName: "name"
        },
        {
          type: "select",
          placeholder: "数据状态",
          defaultValue: "",
          options: this.$utils.data.system.dictStatusOptions(),
          submitName: "status"
        }
      ],
      tableInfo: {
        searchUrl: "/system/dict/data/list",
        deleteAllUrl: "/system/dict/data/del",
        defaultQuery: {
          parentCode: this.$route.query.code,
          name: "",
          status: ""
        },
        columns: [
          {
            prop: "name",
            label: "字典标签"
          },
          {
            prop: "value",
            label: "字典键值"
          },
          {
            prop: "sortId",
            label: "字典排序"
          },
          {
            prop: "status",
            label: "状态",
            beforeDisplay: row =>
              this.$utils.data.system.getDictStatusLabelByValue(row.status)
          },
          {
            prop: "memo",
            label: "备注"
          }
        ],
        operations: {
          delete: {
            show: true
          }
        }
      },
      code: this.$route.query.code
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
@import "../../../style/config";
@import "../../../style/styles";

.active-info-management {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>