<template>
  <div class="resource-container">
    <tableWithFilter
      :filtersInfo="filtersInfo"
      :tableInfo="tableInfo"
      :doubleSelect="isSelectMode ? doubleSelect : undefined"
      :mock="false"
      v-model="tableThis"
    >
      <createAndModifyResource
        slot="create"
        slot-scope="scope"
        :onClose="scope.onClose"
      ></createAndModifyResource>
      <createAndModifyResource
        slot="modify"
        slot-scope="scope"
        :onClose="scope.onClose"
        :id="scope.row.id"
        :isModify="true"
      ></createAndModifyResource>
      <el-button
        v-if="!!isSelectMode"
        type="danger"
        icon="el-icon-folder-checked"
        slot="table-left"
        @click="select"
        :disabled="
          !tableThis ||
            !tableThis.table ||
            !tableThis.table.multipleSelection ||
            tableThis.table.multipleSelection.length === 0
        "
      >
        选择
      </el-button>
    </tableWithFilter>
  </div>
</template>
<script>
import createAndModifyResource from "./createAndModifyResource";

export default {
  name: "Resource",
  components: {
    createAndModifyResource,
  },
  props: ["isSelectMode", "onSelect", "type"],
  data() {
    return {
      filtersInfo: [
        {
          type: "input",
          placeholder: "请输入文件名/标签",
          submitName: "tags",
        },
        {
          type: "input",
          placeholder: "请输入上传人",
          submitName: "userName",
        },
        {
          type: "select",
          placeholder: "请选择类型",
          options: [
            { label: "图片", value: "image" },
            { label: "视频 ", value: "video" },
            { label: "文档", value: "word" },
          ],
          defaultValue: this.type || "",
          submitName: "type",
        },
        {
          type: "dateRange",
          placeholder: ["开始时间", "结束时间", "-"],
          beforeSubmit: (d) => +d,
          submitName: ["beginTime", "endTime"],
        },
      ],
      tableInfo: {
        searchUrl: "/resource/list",
        deleteAllUrl: "/resource/del",
        columns: [
          {
            type: "image",
            label: "图片预览",
            imageWidth: 140,
            imageHeight: 80,
            path: this.getResourceShowImg,
          },
          {
            prop: "name",
            label: "文件名",
          },
          {
            prop: "tags",
            label: "标签",
          },
          {
            prop: "ext",
            label: "扩展名",
          },
          {
            prop: "userName",
            label: "上传人",
          },
          {
            prop: "createDate",
            label: "上传时间",
            beforeDisplay: (row) =>
              this.$utils.format.timeStampToStandardStr(row.createDate),
          },
          {
            type: "action",
            label: "操作",
            content: "下载",
            onClick: this.downloadResource,
            // disable: true
          },
        ],
        hides: this.isSelectMode ? ["deleteAll", "modify"] : [],
        selectConfig: {
          singleChoice: !!this.isSelectMode,
        },
        createConfig: {
          label: "上传",
          icon: "el-icon-upload",
        },
        noDivider:this.isSelectMode
      },
      tableThis: null,
    };
  },
  methods: {
    doubleSelect(row) {
      let selections = this.$utils.gadgets.deepClone([row]).map((selection) => {
        selection.id = selection.url;
        return selection;
      });
      this.onSelect && this.onSelect(selections);
    },
    select() {
      let selections = this.$utils.gadgets
        .deepClone(this.tableThis.table.multipleSelection)
        .map((selection) => {
          selection.id = selection.url;
          return selection;
        });
      this.onSelect && this.onSelect(selections);
    },

    downloadResource(row) {
      this.$ajax.news.resource.download(row);
    },

    getResourceShowImg(row) {
      switch (row.type) {
        case "image":
          return row.url;
        case "video":
          return row.coverUrl;
        case "word":
          return this.$utils.data.file.getImageByDocExtension(row.ext);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.resource-container {
  width: 100%;
  height: 100%;
}
</style>
