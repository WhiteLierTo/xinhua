<template>
  <div class="active-info-management">
    <tableWithFilter
        v-model="tableThis"
        :filtersInfo="filtersInfo"
        :tableInfo="tableInfo"
        :mock="false"
    ></tableWithFilter>
  </div>
</template>
<script>
  export default {
    name: "channelManage",
    data() {
      return {
        filtersInfo: [
          {
            type: "input",
            placeholder: "请输入频道名称",
            submitName: "searchValue"
          }
        ],
        tableInfo: {
          searchUrl: "/channel/list",
          deleteAllUrl: "/channel/del",
          defaultQuery: {
            searchValue: ""
          },
          columns: [
            {
              prop: "name",
              label: "频道名称"
            },
            {
              prop: "displayFlag",
              label: "显示/隐藏",
              beforeDisplay: row =>
                  this.$utils.data.news.getchannelStatusOptions(row.displayFlag)
            },
            {
              prop: "isShowNewflash",
              label: "是否显示快讯",
              beforeDisplay: row => row.isShowNewflash ? '显示' : '隐藏'
            },
            {
              prop: "description",
              label: "备注"
            }
          ],
          createConfig: {
            path: "/news/channel/editChannel"
          },
          modifyConfig: {
            path: row => `/news/channel/editChannel?id=${row.id}`
          },
          reSortConfig: {
            moveToPath: "/channel/move",
            sortPath: "/channel/sort"
          },
          hides: ["deleteAll"],
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
      deleteHandle() {
      },
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
