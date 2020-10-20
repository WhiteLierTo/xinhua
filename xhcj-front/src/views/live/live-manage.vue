<template>
  <div class="active-info-management kbjjscacscasknb">
    <tableWithFilter class="table" v-model="tableThis" :filtersInfo="filtersInfo" :tableInfo="tableInfo">
      <!--<channelTree slot="table-offset-left" :onSelect="onChannelSelect" :onTabChange="onChannelChange"/>-->
      <el-button v-allow="'live:info:chat'" type="primary" slot="table-left" plain @click="send">发送主持人消息</el-button>
      <!-- <el-button type="primary" slot="table-left" plain @click="see">查看直播推拉流地址</el-button> -->
    </tableWithFilter>
    <!-- <liveDialog v-if="showLiveDialog" :manuscript="manuscript" :onClose="onCloseLiveDialog"/> -->
    <sendDialog v-if="showLiveDialog" :manuscript="manuscript" :onClose="onCloseLiveDialog" />
    <liveAddressDialog v-if="showLiveAddressDialog" :manuscript="manuscript" :onClose="onCloseLiveAddressDialog" />
  </div>
</template>
<script>
import liveDialog from "./live-dialog";
import sendDialog from "./send-dialog";
import liveAddressDialog from "./live-address-dialog";

export default {
  name: "liveManage",
  components: { liveDialog, liveAddressDialog, sendDialog },
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
          type: "dateRange",
          placeholder: ["创建开始时间", "创建结束时间", "-"],
          beforeSubmit: d => +d,
          submitName: ["beginTime", "endTime"]
        }
      ],
      tableInfo: {
        searchUrl: "/live/list",
        deleteAllUrl: "/live/del",
        // defaultQuery: {
        //   channelId: () => this.liveId,
        // },
        columns: [
          // {
          //   prop: "id",
          //   label: "稿件ID"
          // },
          {
            prop: "title",
            label: "标题"
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
            prop: "state",
            label: "直播状态",
            beforeDisplay: row =>
              this.$utils.data.live.getLiveStatusLabelByValue(row.state),
            presetStyle: {
              withPoint: {
                show: true,
                backgroundColor: row =>
                  this.$utils.data.live.getLiveStateColorByValue(row.state)
              }
            }
          },
          {
            prop: "articleStatus",
            label: "稿件状态",
            beforeDisplay: row =>
              this.$utils.data.live.getArticleStatusLabelByValue(
                row.articleStatus
              ),
            presetStyle: {
              withPoint: {
                show: true,
                backgroundColor: row =>
                  this.$utils.data.live.getArticleStateColorByValue(
                    row.articleStatus
                  )
              }
            }
          },
          {
            prop: "publicTime",
            label: "发布时间",
            beforeDisplay: row =>
              this.$utils.format.timeStampToStandardStr(row.publicTime)
          },
          {
            prop: "publicUserId",
            label: "发布人"
          },
          //   {
          //     prop: "compereUserName",
          //     label: "主持人"
          //   },
          //   {
          //     prop: "anchorUserName",
          //     label: "主播"
          //   },
          {
            type: "action",
            label: "录像地址",
            content: row => {
              return row.videoPath;
            },
            styleConfig: {
              color: "rgba(67,131,228,1)"
            },
            onClick: row => window.open(row.videoPath, "_blank")
          },
          //   {
          //     prop: "livePushAppName",
          //     label: "直播推流app-name"
          //   },
          //   {
          //     prop: "livePushStreamName",
          //     label: "直播推流stream-name"
          //   },
          {
            prop: "hitcount",
            label: "点击量"
          },
          // {
          //   type: "action",
          //   label: "置顶",
          //   beforeDisplay: row =>
          //       this.$utils.data.live.getTopStatusLabelByValue(row.isTop),
          //   content: row => {
          //     if (!this.liveId) return "";
          //     let isTop = row.isTop;
          //     if (isTop === 1) {
          //       isTop = "取消置顶";
          //     } else if (isTop === 0) {
          //       isTop = "置顶";
          //     } else {
          //       isTop = "";
          //     }
          //     return isTop;
          //   },
          //   styleConfig: {
          //     color: "rgba(67,131,228,1)"
          //   },
          //   onClick: row => {
          //     if (row.isTop === 0) {
          //       let isTopArr = this.tableThis.table.tableData.map(v => v.isTop);
          //
          //       let isTopObj = this.getWordCnt(isTopArr);
          //
          //       if (isTopObj["1"] > 1) {
          //         this.$message.warning("最多设置两个置顶");
          //         return;
          //       }
          //
          //       this.isTopVal = {
          //         id: row.id,
          //         isTop: 1,
          //         channelId: this.liveId
          //       };
          //       this.$confirm("是否设置置顶, 是否继续?", "提示", {
          //         confirmButtonText: "确定",
          //         cancelButtonText: "取消",
          //         type: "warning"
          //       }).then(() => {
          //         this.isTop(row.isTop);
          //       });
          //     } else if (row.isTop === 1) {
          //       this.isTopVal = {
          //         id: row.id,
          //         isTop: 0,
          //         channelId: this.liveId
          //       };
          //       this.$confirm("是否取消置顶, 是否继续?", "提示", {
          //         confirmButtonText: "确定",
          //         cancelButtonText: "取消",
          //         type: "warning"
          //       }).then(() => {
          //         this.isTop(row.isTop);
          //       });
          //     } else {
          //       this.$message.warning("设置失败");
          //     }
          //   }
          // },
          // {
          //   type: "action",
          //   label: "banner",
          //   beforeDisplay: row =>
          //       this.$utils.data.live.getTopStatusLabelByValue(row.isBanner),
          //   content: row => {
          //     if (!this.liveId) return "";
          //     let isBanner = row.isBanner;
          //     if (isBanner === 1) {
          //       isBanner = "取消banner";
          //     } else if (isBanner === 0) {
          //       isBanner = "设置banner";
          //     } else {
          //       isBanner = "";
          //     }
          //     return isBanner;
          //   },
          //   styleConfig: {
          //     color: "rgba(67,131,228,1)"
          //   },
          //   onClick: row => {
          //     if (row.isBanner === 0) {
          //       let isBannerArr = this.tableThis.table.tableData.map(
          //           v => v.isBanner
          //       );
          //       let isBannerObj = this.getWordCnt(isBannerArr);
          //       if (isBannerObj["1"] > 5) {
          //         this.$message.warning("最多设置六个banner");
          //         return;
          //       }
          //
          //       this.isBannerVal = {
          //         id: row.id,
          //         isBanner: 1,
          //         channelId: this.liveId
          //       };
          //       this.$confirm("是否设置banner, 是否继续?", "提示", {
          //         confirmButtonText: "确定",
          //         cancelButtonText: "取消",
          //         type: "warning"
          //       }).then(() => {
          //         this.isBanner();
          //       });
          //     } else if (row.isBanner === 1) {
          //       this.isBannerVal = {
          //         id: row.id,
          //         isBanner: 0,
          //         channelId: this.liveId
          //       };
          //       this.$confirm("是否取消banner, 是否继续?", "提示", {
          //         confirmButtonText: "确定",
          //         cancelButtonText: "取消",
          //         type: "warning"
          //       }).then(() => {
          //         this.isBanner();
          //       });
          //     } else {
          //       this.$message.warning("设置失败");
          //     }
          //   },
          //   minWidth: 140
          // }
        ],
        operations: {},
        reSortConfig: {
          moveToPath: "/live/moveTo",
          sortPath: "/live/updateSort"
        },
        createConfig: {
          path: "/live/liveManage/editLive"
        },

        modifyConfig: {
          path: row => `/live/liveManage/editLive?id=${row.id}`
        }
      },
      showLiveDialog: false,
      showLiveAddressDialog: false,
      tableThis: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      treeData: {
        treeType: 1,
        name: "",
        showHide: 0
      },
      type: "first",
      liveId: "",
      manuscript: "",
      isTopVal: {},
      isBannerVal: {},
      sortPath: {
        moveToPath: "/live/moveTo",
        sortPath: "/live/updateSort"
      }
    };
  },
  methods: {
    // 展示隐藏
    showHandle() {
      if (this.isShow) {
        this.treeData.showHide = 1;
      } else {
        this.treeData.showHide = 0;
      }
    },

    send() {
      if (this.tableThis.table.multipleSelection.length === 1) {
        this.showLiveDialog = true;
        this.manuscript = this.tableThis.table.multipleSelection[0];
      } else {
        this.$message.error("请选择其中一个");
      }
    },
    see() {
      if (this.tableThis.table.multipleSelection.length === 1) {
        this.showLiveAddressDialog = true;
        this.manuscript = this.tableThis.table.multipleSelection[0];
      } else {
        this.$message.error("请选择其中一个");
      }
    },
    onChannelSelect(data) {
      this.liveId = data.id === "root_channel_id" ? "" : data.id;
      this.tableInfo.reSortConfig = data.id === "root_channel_id" ? this.sortPath : undefined;
      this.tableThis.table.refresh();
    },

    onChannelChange(type, activeTarget) {

      if (!activeTarget.hasOwnProperty("id")) {
        this.tableThis.table.setEmpty();
        return
      }

      // this.channelType = type;
      if (activeTarget.type === type) {
        this.liveId = activeTarget.id === "root_channel_id" ? "" : activeTarget.id;
      } else {
        this.liveId = "";
      }
      this.tableThis.table.refresh();
    },
    // 筛选节点
    filterNode(value, data) {
    },
    onCloseLiveDialog() {
      this.showLiveDialog = false;
    },
    onCloseLiveAddressDialog() {
      this.showLiveAddressDialog = false;
    },
    getWordCnt(arr) {
      return arr.reduce(function (prev, next) {
        prev[next] = prev[next] + 1 || 1;
        return prev;
      }, {});
    },
    //置顶
    isTop() {
      this.$ajax.live.updateTop(this.isTopVal).then(res => {
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
      this.$ajax.live.updateBanner(this.isBannerVal).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.tableThis.table.refresh();
        } else {
          this.$message.error(res.msg);
        }
      });
    }
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

  .search {
    height: 100%;
    width: 280px;
    background: #fff;
    overflow: auto;
    flex-shrink: 0;
    margin-right: 20px;

    .input {
      display: flex;
      justify-content: space-between;
      width: 90%;
      margin: 20px auto;

      .el-button {
        margin-left: 10px;
      }
    }

    .search-list {
      width: 90%;
      margin: 20px auto;
      border: solid 1px #ededf6;
    }

    .search-list:nth-child(2) {
      margin: 0px auto 20px;
    }

    .search-list-active {
      border: none;
    }
  }

  .table {
    flex: 1;
    overflow: hidden;
  }
}
</style>
