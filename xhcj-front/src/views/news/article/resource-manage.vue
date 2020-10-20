<template>
  <dialogTemplate ref="dialogTemplate" :onClose="onClose" title="管理来源" :width="width">
    <tableWithFilter
      v-model="tableThis"
      :filtersInfo="filtersInfo"
      :tableInfo="tableInfo"
      :mock="false"
      :style="{height:height+'px'}"
    >
      <el-button
        icon="el-icon-thumb"
        type="primary"
        slot="table-left"
        :disabled="canSelect"
        style="order:-200;margin-left:0;margin-right:10px"
        @click="onThisSelect"
      >选择</el-button>
      <addResource slot="create" slot-scope="scope" :onClose="scope.onClose"></addResource>
      <addResource slot="modify" slot-scope="scope" :id="scope.row.id" :onClose="scope.onClose"></addResource>
    </tableWithFilter>
    <div slot="foot"></div>
  </dialogTemplate>
</template>

<script>
import addResource from "./add-resource";

export default {
  name: "userDialog",
  props: ["onClose", "type", "onSelect"],
  components: { addResource },
  data() {
    return {
      width: window.innerWidth * 0.5,
      height: window.innerHeight * 0.7,
      filtersInfo: [
        {
          type: "input",
          placeholder: "请输入来源名称",
          submitName: "name",
        },
      ],
      tableInfo: {
        searchUrl: "/article/source/list",
        deleteAllUrl: "/article/source/del",

        columns: [
          {
            prop: "ext1",
            label: "预览",
            type: "image",
            imageWidth: 80,
            imageHeight: 80,
            path: (row) => row.ext1,
          },
          {
            prop: "name",
            label: "来源名称",
          },
        ],
        operations: {},
        noDivider: true,
      },
      tableThis: null,
    };
  },
  computed: {
    canSelect() {
      return !(
        this.tableThis &&
        this.tableThis.table &&
        this.tableThis.table.multipleSelection &&
        this.tableThis.table.multipleSelection.length === 1
      );
    },
  },
  methods: {
    onThisSelect() {
      this.onSelect && this.onSelect(this.tableThis.table.multipleSelection[0]);
      this.$refs.dialogTemplate.closeSelf();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/config";
@import "../../../style/styles";

.upload-box {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  width: 530px;
}

.upload-tips {
  font-size: 14px;
  color: #d38416;
}

.no-pic-cover-left {
  width: 108px;
  height: 108px;
  line-height: 135px;
  text-align: center;
  background: rgba(238, 238, 238, 1);
  margin: 10px 0;
  border-radius: 50%;

  .empty-img {
    width: 50px;
  }

  .nopic-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
