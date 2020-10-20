<template>
  <div class="active-info-management" v-loading="isLoading">
    <tableWithFilter
      :filtersInfo="filtersInfo"
      :tableInfo="tableInfo"
      v-model="tableThis"
      :onSearchEnd="onSearchEnd"
      :beforeSearch="beforeSearch"
      :onChangeCanShowSort="onChangeCanShowSort"
      v-if="!isLoading"
    >
      <channelTree
        slot="table-offset-left"
        :onSelect="onChannelSelect"
        :onTabChange="onTabChange"
        :onGetTree="onGetChannelTree"
        :specialChannelDefault="true"
      />
      <el-dropdown
        @command="create"
        slot="table-left"
        type="success"
        style="order: -97; margin-right: 10px"
      >
        <el-button type="success">
          新增<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-allow="'news:articleList:add:article'"
            command="/news/manuscript/addArticle"
            >文章
          </el-dropdown-item>
          <el-dropdown-item
            v-allow="'news:articleList:add:video'"
            command="/video/videoManage/editVideo"
            >视频
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown
        @command="relation"
        slot="table-left"
        type="primary"
        style="order: -95; margin-right: 10px"
      >
        <el-button
          type="primary"
          style="background: #5491bb; border-color: #5491bb"
        >
          关联<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-allow="'news:articleList:relevance:specialChannel'"
            command="topic"
            >专题</el-dropdown-item
          >
          <el-dropdown-item
            v-allow="'news:articleList:relevance:video'"
            command="video"
            >视频</el-dropdown-item
          >
          <el-dropdown-item
            v-allow="'news:articleList:relevance:activity'"
            command="activity"
            >活动</el-dropdown-item
          >
          <el-dropdown-item
            v-allow="'news:articleList:relevance:live'"
            command="live"
            >直播</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>

      <el-button
        slot="table-left"
        style="margin-left: 10px"
        @click="isShowWithdrawDialog = true"
        :disabled="isMultiple"
        >批量撤稿</el-button
      >
    </tableWithFilter>

    <dialog-template
      v-if="isShowQRCard"
      :onClose="() => (isShowQRCard = false)"
      width="400"
      title="二维码"
    >
      <div class="qr-card-inner">
        <canvas id="QRCode" ref="QRCanvas"></canvas>
      </div>
      <div slot="foot"></div>
    </dialog-template>
    <preview v-if="isShowPreView" :url="previewUrl" :onClose="onPreviewClose" />
    <posterImg
      v-if="isShowPoster"
      :onClose="onPosterImgClose"
      :article="posterArticle"
    />

    <el-dialog
      title="确认撤稿"
      :visible.sync="isShowWithdrawDialog"
      width="30%"
    >
      <span>请确认是否批量撤稿</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowWithdrawDialog = false">取 消</el-button>
        <el-button type="primary" @click="withdrawAll">撤 稿</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import QRCode from "qrcode";
import preview from "../../../components/preview/preview";
import posterImg from "./poster";
import axios from "axios";

export default {
  name: "manuscript",
  components: { preview, posterImg },
  data() {
    return {
      isShowQRCard: false,
      qrText: "",
      tableThis: {},
      filtersInfo: [
        {
          type: "input",
          placeholder: "请输入稿件ID",
          submitName: "rid",
        },
        {
          type: "input",
          placeholder: "请输入标题",
          submitName: "title",
        },
        {
          type: "input",
          placeholder: "请输入编辑姓名",
          submitName: "editorUserName",
        },
        {
          type: "input",
          placeholder: "请输入记者姓名",
          submitName: "authorUserName",
        },
        {
          type: "input",
          placeholder: "请输入审校人姓名",
          submitName: "proofreadUserName",
        },
        {
          type: "input",
          placeholder: "请输入财经号名称",
          submitName: "source",
        },
        {
          type: "select",
          placeholder: "请选择稿件类型",
          options: this.$utils.data.manuscript.manuscriptTypeOptions(),
          submitName: "articleType",
        },
        {
          type: "select",
          placeholder: "请选择稿件状态",
          options: [
            { label: "草稿", value: 0 },
            { label: "待审核", value: 2 },
            { label: "已发布", value: 3 },
            { label: "已撤稿", value: 4 },
            { label: "未通过", value: 5 },
          ],
          submitName: "status",
        },
        {
          type: "select",
          placeholder: "是否为banner",
          options: [
            { label: "是", value: 1 },
            { label: "否", value: 0 },
          ],
          submitName: "isBanner",
        },
        {
          type: "select",
          placeholder: "是否置顶",
          options: [
            { label: "是", value: 1 },
            { label: "否", value: 0 },
          ],
          submitName: "isTop",
        },
        {
          type: "dateRange",
          placeholder: ["开始时间", "结束时间", "-"],
          beforeSubmit: (d) => +d,
          submitName: ["beginTime", "endTime"],
        },
        {
          type: "select",
          placeholder: "选择来源",
          options: this.graspSources,
          submitName: "test",
          filterable: true,
          isGraspSources: true,
          submitName: "sourceId",
        },
      ],
      tableInfo: {
        permissionHead: "news:articleList",
        searchUrl: "/integrate/list",
        deleteAllUrl: "/integrate/del",
        defaultQuery: {
          channelId: () => this.channelId,
        },
        columns: [
          {
            prop: "articleType",
            label: "类型",
            beforeDisplay: (row) => {
              let target = this.$utils.data.manuscript
                .manuscriptTypeOptions()
                .find((d) => d.value === row.articleType);
              return target ? target.label : "";
            },
            styleConfig: {
              color: (row) => {
                let target = this.$utils.data.manuscript
                  .manuscriptTypeOptions()
                  .find((d) => d.value === row.articleType);
                if (target.label === "原创") {
                  return "#D2443A";
                }
              },
            },
          },
          {
            prop: "title",
            label: "标题",
          },
          {
            prop: "positionNum",
            label: "位置",
            beforeDisplay: (row) => {
              if (row.isTop) return "置顶";
              if (row.isBanner) return "Banner";
              return row.positionNum === 0 ? " " : row.positionNum;
            },
            styleConfig: {
              color: (row) => {
                if (row.isTop) return "#275DA3";
                if (row.isBanner) return "#4395AB";
              },
            },
          },
          {
            prop: "normalAllName",
            label: "频道",
          },
          {
            prop: "specialAllName",
            label: "专题",
          },
          {
            prop: "publicTime",
            label: "发布时间",
            beforeDisplay: (row) =>
              this.$utils.format.timeStampToStandardStr(row.publicTime),
          },
          {
            prop: "status",
            label: "稿件状态",
            beforeDisplay: (row) => {
              // 现在这里凑合一下
              switch (row.status) {
                case 0:
                  return "草稿";
                case 1:
                  return "已删除";
                case 2:
                  return "待审核";
                case 3:
                  return "已发布"; // 即已发布
                case 4:
                  return "已撤稿";
                case 5:
                  return "未通过";
              }
            },
            presetStyle: {
              withPoint: {
                show: true,
                backgroundColor: (row) => {
                  switch (row.status) {
                    case 0:
                      return "#E78921";
                    case 1:
                      return "red";
                    case 2:
                      return "#0079FF";
                    case 3:
                      return "#16A05D";
                    case 4:
                      return "#7F7F7F";
                    case 5:
                      return "#DC4B41";
                  }
                },
              },
            },
          },
          // {
          //   prop: "picType",
          //   label: "样式",
          //   beforeDisplay: row => {
          //     switch (row.picType) {
          //       case 0:
          //         return "无图";
          //       case 1:
          //         return "单图";
          //       case 2:
          //         return "大图";
          //       case 3:
          //         return "多图";
          //     }
          //   }
          // },
          {
            type: "action",
            label: "操作",
            content: [
              (row) => this.getActionContent(0, row.status),
              "打开链接",
              "预览",
              "取消关联",
            ],
            onClick: this.onActionClick,
            permissionKey: [
              "news:articleList:operation:audit",
              "allow",
              "allow",
              "news:articleList:relevance:cancel",
            ],
          },
          {
            prop: "authorUserName",
            label: "记者",
          },
          {
            prop: "editorUserName",
            label: "编辑",
          },
          // {
          //   prop: "publicUserName",
          //   label: "发布人"
          // },
          {
            type: "action",
            label: "置顶",
            content: (row) =>
              row.isTop === undefined ? "" : row.isTop ? "取消置顶" : "置顶",
            onClick: this.onIstTopClick,
            permissionKey: "news:articleList:operation:top",
          },
          {
            type: "action",
            label: "banner",
            content: (row) =>
              row.isBanner === undefined
                ? ""
                : row.isBanner
                ? "取消Banner"
                : "设置Banner",
            onClick: this.onIsBannerClick,
            permissionKey: "news:articleList:operation:banner",
          },
          {
            prop: "clickNum",
            label: "点击量",
          },
          {
            type: "action",
            label: "海报",
            content: "生成海报",
            onClick: this.showPoster,
            permissionKey: "news:articleList:genPoster",
            // fixed: "right"
          },
        ],
        hides: ["create"],
        modifyConfig: {
          path: this.getModifyPath,
        },
        reSortConfig: {
          moveToPath: "/integrate/moveTo",
          sortPath: "/integrate/updateSort",
        },
        isDelay: true,
      },
      channelId: "",
      channelType: "normal",
      actionContent: [
        {
          0: "",
          1: "",
          2: "审核通过",
          3: "撤稿",
          4: "",
          5: "",
        },
      ], // action的文案
      config: {},
      isShowTableData: false, // 业务: 在拿到频道树之后,默认选取第一个

      isShowPreView: false,
      previewUrl: "",

      isShowPoster: false,
      posterArticle: {},

      isRendered: false,

      isLoading: true,
      isShowWithdrawDialog: false,
    };
  },
  computed: {
    isMultiple() {
      return (
        !this.tableThis ||
        !this.tableThis.table ||
        this.tableThis.table.multipleSelection.length === 0
      );
    },
  },
  async mounted() {
    await this.getSourceList();
    this.config = await this.$ajax.gadgets.getConfigSync();
    this.isLoading = false;
  },
  methods: {
    getSourceList() {
      return this.$ajax.news.article.getSourceList("grasp").then((res) => {
        this.filtersInfo = this.filtersInfo.map((filter) => {
          if (filter.isGraspSources) {
            filter.options = res.rows;
          }
          return filter;
        });
      });
    },

    onGetChannelTree(nodes) {
      nodes = nodes[0];
      if (nodes && nodes.children && nodes.children.length) {
        this.channelId = nodes.children[0].id;
      }
      this.tableThis.table.refresh();
    },

    relation(command) {
      // 关联的按钮组
      this.$router.push(`/news/manuscript/relation?type=${command}`);
    },

    create(command) {
      // 新增的按钮组
      this.$router.push(`${command}?default=${this.channelId}`);
    },

    getActionContent(index, status) {
      return this.actionContent[index][status] || "";
    },

    onActionClick(row, rowIndex, actionIndex) {
      if (actionIndex === 1) {
        // 打开链接
        axios
          .get("./config.json")
          .then((res) => {
            if (!res.data.websiteUrl.endsWith("/")) {
              res.data.websiteUrl += "/";
            }
            let path = `${res.data.websiteUrl}newsDetail?id=${row.rid}&type=${row.articleType}`;
            window.open(path);
          })
          .catch(() => {});
        return;
      }

      if (actionIndex === 2) {
        // 预览
        axios
          .get("./config.json")
          .then((configRes) => {
            this.previewUrl = `${configRes.data.websiteUrl}/newsDetail?id=${row.rid}&type=${row.articleType}`;
            this.isShowPreView = true;
          })
          .catch(() => {});
        return;
      }

      if (actionIndex === 3) {
        this.$ajax.news.manuscript.cancelRelation(row).then(([ok, msg]) => {
          if (ok) {
            this.tableThis.table.refresh(false);
          } else {
            this.$message.error(msg);
          }
        });
        return;
      }

      switch (row.status) {
        case 0: // 保存(草稿)
          return;
        case 1: // 已删除
          return;
        case 2: // 待审核
          if (actionIndex === 0) {
            // 审核通过操作
            this.updateStatus(row, 3);
          }
          return;
        case 3: // 审核通过
          if (actionIndex === 0) {
            // 撤稿操作
            this.updateStatus(row, 4);
          }
          return;
        case 4: // 已撤稿
          return;
        case 5: // 审核未通过
          return;
      }
    },

    onChannelSelect(data) {
      this.channelId = data.id === "root_channel_id" ? "" : data.id;
      this.tableThis.table.refresh();
    },

    removeSetTopAndBanner() {
      // 去掉设置指定和是指banner
      let topColumns = this.tableInfo.columns.find(
        (column) => column.label === "置顶"
      );
      topColumns.disable = true;
      let bannerColumns = this.tableInfo.columns.find(
        (column) => column.label === "banner"
      );
      bannerColumns.disable = true;
    },

    addSetTopAndBanner() {
      let topColumns = this.tableInfo.columns.find(
        (column) => column.label === "置顶"
      );
      topColumns.disable = false;
      let bannerColumns = this.tableInfo.columns.find(
        (column) => column.label === "banner"
      );
      bannerColumns.disable = false;
    },

    onTabChange(type, activeTarget) {
      this.channelType = type;
      if (type === "special") {
        this.removeSetTopAndBanner();
      } else {
        this.addSetTopAndBanner();
      }

      if (!activeTarget.hasOwnProperty("id")) {
        this.tableThis.table.setEmpty();
        return;
      }

      if (activeTarget.type === type) {
        this.channelId =
          activeTarget.id === "root_channel_id" ? "" : activeTarget.id;
      } else {
        this.channelId = "";
      }

      this.tableThis.table.refresh();
    },

    async updateStatus(row, status) {
      // 撤稿 审核通过
      this.$ajax.news.manuscript
        .updateStatus({
          articleType: row.articleType,
          rid: row.rid,
          status,
        })
        .then(([ok, msg]) => {
          if (ok) {
            this.tableThis.table.refresh(false);
          } else {
            this.$message.error(msg);
          }
        });
    },

    getModifyPath(row) {
      // 计算需要跳转的路由
      switch (row.articleType) {
        case 1:
        case 2:
        case 3:
        case 4:
          // 这些都是文章
          return `/news/manuscript/addArticle?id=${row.rid}`;
        case 5: // 视频
          return `/news/manuscript/relation?type=video&id=${row.rid}`;
        case 6: // 直播
          return `/news/manuscript/relation?type=live&id=${row.rid}`;
        case 7: // 活动
          return `/news/manuscript/relation?type=activity&id=${row.rid}`;
        case 8: // 专题
          return `/news/manuscript/relation?type=topic&id=${row.rid}`;
      }
    },

    onIsBannerClick(row) {
      // 是不是banner的控制
      // 校验

      this.$ajax.news.manuscript
        .changeIsBanner({
          id: row.id,
          isBanner: row.isBanner * -1 + 1,
        })
        .then(([ok, msg]) => {
          if (ok) {
            this.tableThis.table.refresh(false);
          } else {
            this.$message.error(msg);
          }
        });
    },

    onIstTopClick(row) {
      // 是否置顶的控制
      this.$ajax.news.manuscript
        .changeIsTop({
          id: row.id,
          isTop: row.isTop * -1 + 1,
        })
        .then(([ok, msg]) => {
          if (ok) {
            this.tableThis.table.refresh(false);
          } else {
            this.$message.error(msg);
          }
        });
    },

    setEmpty() {
      this.tableThis.table.setEmpty();
    },

    drawQR(path) {
      QRCode.toCanvas(this.$refs.QRCanvas, path, {
        width: 256,
        height: 256,
      });
    },

    onSearchEnd(rows) {
      return rows;
    },

    beforeSearch(query) {
      let countQuery = this.$utils.gadgets.deepClone(query);
      delete countQuery.channelId;
      delete countQuery.pageNum;
      delete countQuery.pageSize;
      delete countQuery.total;

      let isEmptyQuery = Object.keys(countQuery).length === 0;

      if (this.channelType === "normal" && query.channelId && isEmptyQuery) {
        query.isSelNull = 1;
      } else {
        query.isSelNull = 0;
      }
      return query;
    },

    onPreviewClose() {
      this.isShowPreView = false;
    },

    onPosterImgClose() {
      this.isShowPoster = false;
    },

    showPoster(row) {
      this.posterArticle = this.$utils.gadgets.deepClone(row);
      this.isShowPoster = true;
    },

    onChangeCanShowSort(oldCanShowSort) {
      let thisCanShowSort = this.channelType !== "normal" || this.channelId;
      return oldCanShowSort && !!thisCanShowSort;
    },

    async withdrawAll() {
      let publishedRows = this.tableThis.table.multipleSelection.filter(
        (row) => row.status === 3
      );

      if (publishedRows.length === 0) {
        this.$message.error("仅有已发布的稿件才可以撤稿.");
        this.isShowWithdrawDialog = false;
        return;
      }

      let duplicatedRows = [];
      publishedRows.forEach((row) => {
        let sendData = {
          rid: row.rid,
          articleType: row.articleType,
          key: `${row.rid}--${row.articleType}`,
        };
        if (!duplicatedRows.map((r) => r.key).includes(sendData.key)) {
          duplicatedRows.push(sendData);
        }
      });

      let ok = await this.$ajax.news.manuscript.batchCancelAll(
        duplicatedRows.map(({ rid, articleType }) => ({ rid, articleType }))
      );

      if (ok) {
        this.$message.success("批量撤稿成功");
        this.tableThis.table.refresh(false);
      } else {
        this.$message.error("操作失败");
      }

      this.isShowWithdrawDialog = false;
    },
  },

  activated() {
    if (this.isRendered) {
      // 重新刷新
      this.tableThis.table.refresh(false);
    } else {
      this.isRendered = true;
    }
  },
};
</script>
<style lang="less" scoped>
@import "../../../style/config";
@import "../../../style/styles";

.active-info-management {
  width: 100%;
  height: 100%;
}

.qr-card-inner {
  width: 270px;
  height: 270px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 10px;
  top: -14px;
}
</style>
