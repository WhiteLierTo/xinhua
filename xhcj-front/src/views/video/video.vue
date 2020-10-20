<template>
  <div class="active-info-management kbjjscacscask">
    <tableWithFilter class="table" v-model="tableThis" :filtersInfo="filtersInfo" :tableInfo="tableInfo">
      <!--<channelTree slot="table-offset-left" :onSelect="onChannelSelect" :onTabChange="onChannelChange"/>-->
    </tableWithFilter>
  </div>
</template>
<script>
  import videoUpload from "./uploadVideo";

  export default {
    name: "videoManage",
    components: {videoUpload},
    data() {
      return {
        isMultiple: false,
        organizeName: "",
        activeName: "first",
        searchList: "search-list",
        searchListActive: "search-list-active",
        isShow: false,
        filtersInfo: [
          {
            type: "input",
            placeholder: "请输入稿件ID",
            submitName: "id"
          },
          {
            type: "input",
            placeholder: "请输入标题",
            submitName: "title"
          },
          {
            type: "input",
            placeholder: "请输入编辑姓名",
            submitName: "editorUserName"
          },
          {
            type: "input",
            placeholder: "请输入记者姓名",
            submitName: "authorUserName"
          },
          {
            type: "input",
            placeholder: "请输入审校姓名",
            submitName: "proofreadUserName"
          },
          {
            type: "select",
            placeholder: "请选择稿件状态",
            defaultValue: "",
            options: this.$utils.data.video.articleStatusOptions(),
            submitName: "articleStatus"
          },
          {
            type: "select",
            placeholder: "请选择是否banner",
            defaultValue: "",
            options: this.$utils.data.video.bannerStatusOptions(),
            submitName: "isBanner"
          },
          {
            type: "select",
            placeholder: "请选择是否置顶",
            defaultValue: "",
            options: this.$utils.data.video.topStatusOptions(),
            submitName: "isTop"
          },

          {
            type: "dateRange",
            placeholder: ["创建开始时间", "创建结束时间", "-"],
            beforeSubmit: d => +d,
            submitName: ["beginTime", "endTime"]
          },
          {
            type: "select",
            placeholder: "请选择评论审核",
            defaultValue: "",
            options: this.$utils.data.video.auditStatusOptions(),
            submitName: "isCommentAudit"
          },
        ],
        tableInfo: {
          permissionHead: "video:info",
          searchUrl: "/video/list",
          deleteAllUrl: "/video/del",
          columns: [
            {
              prop: "title",
              label: "标题"
            },
            {
              prop: "position",
              label: "位置",
              beforeDisplay: row => {
                if (row.isTop) return "置顶";
                if (row.isBanner) return "Banner";
                return " "
              },
              styleConfig: {
                color: row => {
                  if (row.isTop) return "#275DA3";
                  if (row.isBanner) return "#4395AB";
                }
              }
            },
            {
              prop: "normalAllName",
              label: "频道"
            },
            {
              prop: "specialAllName",
              label: "专题"
            },
            {
              prop: "publicTime",
              label: "发布时间",
              beforeDisplay: row =>
                  this.$utils.format.timeStampToStandardStr(row.publicTime)
            },
            {
              prop: "articleStatus",
              label: "稿件状态",
              beforeDisplay: row =>
                  this.$utils.data.video.getArticleStatusLabelByValue(
                      row.articleStatus
                  ),
              presetStyle: {
                withPoint: {
                  show: true,
                  backgroundColor: row =>
                      this.$utils.data.video.getArticleStateColorByValue(
                          row.articleStatus
                      )
                }
              }
            },
            {
              prop: "picType",
              label: "样式",
              beforeDisplay: row => {
                if (row.picType === 1) return '单图';
                if (row.picType === 2) return '大图'
              }
            },
            {
              type: "action",
              label: "操作",
              content: row => {
                if (row.articleStatus === 2) return '审核通过';
                if (row.articleStatus === 3) return '撤稿';
                return ''
              },
              styleConfig: {
                color: "rgba(67, 131, 228, 1)"
              },

              onClick: row => {
                this.auditData = {
                  id: row.id,
                  articleStatus: row.articleStatus === 2 ? 3 : 4
                };
                this.handleAudit()
              },
              permissionKey: content => {
                return content === '审核通过' ? 'video:list:audityes' : 'video:info:cancel'
              }
            },
            {
              prop: "authorUserName",
              label: "记者"
            },
            {
              prop: "editorUserName",
              label: "编辑"
            },
            {
              prop: "publicUserName",
              label: "发布人"
            },
            {
              prop: "hitcount",
              label: "点击量"
            },
            {
              type: "action",
              label: "置顶",
              beforeDisplay: row =>
                  this.$utils.data.live.getTopStatusLabelByValue(row.isTop),
              content: row => {
                let isTop = row.isTop;
                if (isTop === 1) {
                  isTop = "取消置顶";
                } else if (isTop === 0) {
                  isTop = "置顶";
                } else {
                  isTop = "";
                }
                return isTop;
              },
              styleConfig: {
                color: "rgba(67,131,228,1)"
              },
              onClick: row => {
                if (row.isTop === 0) {
                  let isTopArr = this.tableThis.table.tableData.map(v => v.isTop);

                  let isTopObj = this.getWordCnt(isTopArr);

                  if (isTopObj["1"] > 1) {
                    this.$message.error("最多设置两个置顶");
                    return;
                  }

                  this.isTopVal = {
                    id: row.id,
                    isTop: 1,
                    channelId: this.videoId
                  };
                  this.$confirm("设置置顶, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }).then(() => {
                    this.isTop();
                  });
                } else if (row.isTop === 1) {
                  this.isTopVal = {
                    id: row.id,
                    isTop: 0,
                    channelId: this.videoId
                  };
                  this.$confirm("取消置顶, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }).then(() => {
                    this.isTop();
                  });
                }
              },
              permissionKey: "video:info:top"
            },
            {
              type: "action",
              label: "banner",
              beforeDisplay: row =>
                  this.$utils.data.live.getTopStatusLabelByValue(row.isBanner),
              content: row => {
                let isBanner = row.isBanner;
                if (isBanner === 1) {
                  isBanner = "取消banner";
                } else if (isBanner === 0) {
                  isBanner = "设置banner";
                } else {
                  isBanner = "";
                }
                return isBanner;
              },
              styleConfig: {
                color: "rgba(67,131,228,1)"
              },
              onClick: row => {
                if (row.isBanner === 0) {
                  let isBannerArr = this.tableThis.table.tableData.map(
                      v => v.isBanner
                  );
                  let isBannerObj = this.getWordCnt(isBannerArr);

                  if (isBannerObj["1"] > 5) {
                    this.$message.error("最多设置六个banner");
                    return;
                  }
                  this.isBannerVal = {
                    id: row.id,
                    isBanner: 1,
                    channelId: this.videoId
                  };
                  this.$confirm("是否设置banner, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }).then(() => {
                    this.isBanner(row.isBanner);
                  });
                } else if (row.isBanner === 1) {
                  this.isBannerVal = {
                    id: row.id,
                    isBanner: 0,
                    channelId: this.videoId
                  };
                  this.$confirm("是否取消banner, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }).then(() => {
                    this.isBanner(row.isBanner);
                  });
                } else {
                  this.$message.warning("设置失败");
                }
              },
              minWidth: 140,
              permissionKey: "video:info:banner"
            }
          ],
          operations: {},
          reSortConfig: {
            moveToPath: "/live/moveTo",
            sortPath: "/live/updateSort"
          },
          reSort: this.showSort,
          createConfig: {
            path: () => `/video/videoManage/editVideo`
          },

          modifyConfig: {
            path: row => `/video/videoManage/editVideo?id=${row.id}`
          },
        },
        showLiveDialog: false,
        type: "first",
        videoId: "",
        showSort: false,
        tableThis: null,
        isTopVal: {},
        isBannerVal: {},
        auditData: {},
        sortPath: {
          moveToPath: "/live/moveTo",
          sortPath: "/live/updateSort"
        },
        channelType: "normal"
      };
    },

    methods: {
      // 节点单击事件
      onChannelSelect(data) {
        this.videoId = data.id === "root_channel_id" ? "" : data.id;
        this.tableInfo.reSortConfig = data.id === "root_channel_id" ? this.sortPath : undefined
        this.tableThis.table.refresh()
      },

      onChannelChange(data, obj) {
        this.channelType = data;
        if (data === 'special' && obj.type !== 'special') {
          this.tableThis.table.setEmpty();
          return
        }
        if (data === 'special' && obj.type === 'special') {
          this.videoId = obj.id;
          this.tableThis.table.refresh();
          return
        }
        if (data === 'normal' && !obj.type) {
          this.videoId = "";
          this.tableThis.table.refresh();
          return
        }

        if (data === 'normal' && obj.type === 'normal') {
          this.videoId = obj.id;
          this.tableThis.table.refresh();
          return
        }
        if (data === 'normal' && obj.type === 'special') {
          this.tableThis.table.setEmpty();
        }
      },

      // 筛选节点
      filterNode(value, data) {
      },

      onCloseLiveDialog() {
        this.showLiveDialog = false;
      },

      // 审核通过 / 撤稿
      handleAudit() {
        this.$ajax.video.audit(this.auditData).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.tableThis.table.refresh();
          } else {
            this.$message.error(res.msg || "操作失败");
          }
        });
      },

      getWordCnt(arr) {
        return arr.reduce(function (prev, next) {
          prev[next] = prev[next] + 1 || 1;
          return prev;
        }, {});
      },

      //置顶
      isTop() {
        this.$ajax.video.updateTop(this.isTopVal).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.tableThis.table.refresh();
          } else {
            this.$message.error(res.msg);
          }
        });
      },

      //banner
      isBanner() {
        this.$ajax.video.updateBanner(this.isBannerVal).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.tableThis.table.refresh();
          } else {
            this.$message.error(res.msg);
          }
        });
      },
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

    .table {
      flex: 1;
      overflow: hidden;
    }
  }
</style>
