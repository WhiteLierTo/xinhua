<template>
  <div class="active-info-management dsadsdas">
    <tableWithFilter :filtersInfo="filtersInfo" :tableInfo="tableInfo" :mock="false">
      <dictionaryDialog slot="create" slot-scope="scope" :onClose="scope.onClose" />
      <dictionaryDialog
        slot="modify"
        slot-scope="scope"
        :id="scope.row.id"
        :onClose="scope.onClose"
      />
    </tableWithFilter>
  </div>
</template>
<script>
import dictionaryDialog from "./dictionary-dialog";
export default {
  name: "dataDictionary",
  components: {
    dictionaryDialog
  },
  data() {
    return {
      dialogTempShow: false,
      filtersInfo: [
        {
          type: "select",
          placeholder: "请选择字典状态",
          defaultValue: "",
          options: this.$utils.data.system.dictStatusOptions(),
          submitName: "status"
        },
        {
          type: "input",
          placeholder: "请输入字典类型",
          submitName: "code"
        },
        {
          type: "input",
          // defaultValue: "",
          placeholder: "请输入字典名称",
          // options: [],
          submitName: "name"
        },
        {
          type: "dateRange",
          placeholder: ["创建开始时间", "创建结束时间", "-"],
          beforeSubmit: d => +d,
          submitName: ["beginTime", "endTime"]
        }
      ],
      tableInfo: {
        searchUrl: "/system/dict/list",
        deleteAllUrl: "/system/dict/del",
        defaultQuery: {
          code: "",
          name: "",
          status: "",
          beginTime: "",
          endTime: ""
        },
        columns: [
          {
            prop: "name",
            label: "字典名称"
          },
          {
            type: "action",
            label: "字典类型",
            content: row => {
              return row.code;
            },
            styleConfig: {
              color: "rgba(67,131,228,1)"
            },
            onClick: row => {
              this.$router.push(
                `/system/dictionary/dictionaryDetail?code=${row.code}`
              );
            }
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
          },
          {
            prop: "createDate",
            label: "创建时间",
            beforeDisplay: row =>
              this.$utils.format.timeStampToStandardStr(row.createDate)
          }
        ],
        operations: {
          delete: {
            show: true
          }
        }
      },
      flag: false
    };
  },
  mounted() {
    // this.getOptionselect();
  },
  methods: {
    // //数据字典选择框列表
    // getOptionselect() {
    //   this.$ajax.system.getOptionselect().then(res => {
    //     this.filtersInfo[2].options = res.data.records.map(item => {
    //       return {
    //         label: item.name,
    //         value: item.name
    //       };
    //     });
    //     this.flag = true;
    //   });
    // }
  }
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
