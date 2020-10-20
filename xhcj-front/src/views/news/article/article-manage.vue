<template>
  <div class="active-info-management">
    <tableWithFilter class="table" v-model="tableThis" :filtersInfo="filtersInfo" :tableInfo="tableInfo" :mock="false">
      <channelTree
          slot="table-offset-left" :onSelect="onChannelSelect"
          :onTabChange="onChannelChange"
          :onGetTree="onGetChannelTree"
          :specialChannelDefault="true"
      />
    </tableWithFilter>
  </div>
</template>
<script>
  export default {
    name: "videoManage",
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
            submitName: "author"
          },
          {
            type: "input",
            placeholder: "请输入记者姓名",
            submitName: "reporter"
          },
          {
            type: "input",
            placeholder: "请输入审校姓名",
            submitName: "proofread"
          },
          {
            type: "input",
            placeholder: "请输入财经号名称",
            submitName: "source"
          },
          {
            type: "select",
            placeholder: "请选择稿件状态",
            defaultValue: "",
            options: this.$utils.data.article.articleStatusOptions(),
            submitName: "articleStatus"
          },
          {
            type: "select",
            placeholder: "请选择文章类型",
            defaultValue: "",
            options: this.$utils.data.article.articleTypeOptions(),
            submitName: "type"
          },
          {
            type: "select",
            placeholder: "请选择评论审核",
            defaultValue: "",
            options: this.$utils.data.article.auditStatusOptions(),
            submitName: "isCommentAudit"
          },
          {
            type: "dateRange",
            placeholder: ["创建开始时间", "创建结束时间", "-"],
            beforeSubmit: d => +d,
            submitName: ["beginTime", "endTime"]
          },
          {
            type: "select",
            placeholder: "请选择是否为网站banner",
            defaultValue: "",
            options: this.$utils.data.article.pcbannerStatusOptions(),
            submitName: "isBanner"
          },
        ],
        tableInfo: {
          searchUrl: "/article/list",
          deleteAllUrl: "/article/del",
          defaultQuery: {
            channelId: () => this.videoId,
          },
          columns: [
            {
              prop: "id",
              label: "稿件ID"
            },
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
              prop: "publishDate",
              label: "发布时间",
              beforeDisplay: row =>
                  this.$utils.format.timeStampToStandardStr(row.publishDate)
            },
            {
              prop: "articleStatus",
              label: "稿件状态",
              beforeDisplay: row =>
                  this.$utils.data.article.getArticleStatusLabelByValue(
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
                if (row.picType === 1 && row.type !== 'adv') return '小图'
                if (row.picType === 1 && row.type === 'adv') return '纯图'
                if (row.picType === 2) return '大图'
                if (row.picType === 3) return '多图'
              }
            },
            {
              prop: "type",
              label: "类型",
              beforeDisplay: row =>
                  this.$utils.data.article.getArticleTypeLabelByValue(
                      row.type
                  ),
            },
            {
              type: "action",
              label: "操作",
              content: row => {
                if (row.articleStatus === 2) return '审核通过'
                if (row.articleStatus === 3) return '撤稿'
                return ''
              },
              styleConfig: {
                color: "rgba(67, 131, 228, 1)"
              },
              onClick: row => {
                if (row.articleStatus === 2) {
                  this.auditData = {
                    id: row.id,
                    type: row.type,
                    articleStatus: 3
                  };
                } else if (row.articleStatus === 3) {
                  this.auditData = {
                    id: row.id,
                    type: row.type,
                    articleStatus: 4
                  };
                }
                this.handleAudit()
              }
            },
            {
              prop: "reporter",
              label: "记者"
            },
            {
              prop: "author",
              label: "编辑"
            },
            {
              prop: "publishUserName",
              label: "发布人"
            },
            {
              prop: "hitCount",
              label: "点击量"
            },
            {
              prop: "isTop",
              label: "是否置顶",
              beforeDisplay: row =>
                  row.isTop ? '是' : '否'
            },
            {
              prop: "isBanner",
              label: "是否banner",
              beforeDisplay: row =>
                  row.isBanner ? '是' : '否'
            },

          ],
          operations: {},
          reSortConfig: {
            moveToPath: "/article/moveTo",
            sortPath: "/article/updateSort"
          },
          reSort: true,
          createConfig: {
            path: () => `/news/manuscript/addArticle`
          },

          modifyConfig: {
            path: row => `/news/manuscript/addArticle?id=${row.id}`
          },
          isDelay: true
        },
        showLiveDialog: false,
        type: "first",
        videoId: "",
        tableThis: null,
        auditData: {},
        sortPath: {
          moveToPath: "/live/moveTo",
          sortPath: "/live/updateSort"
        }

      };
    },

    methods: {
      onGetChannelTree(nodes) {
        nodes = nodes[0];
        if (nodes && nodes.children && nodes.children.length) {
          this.videoId = nodes.children[0].id;
        }
        this.tableThis.table.refresh()
      },

      onChannelSelect(data) {
        this.videoId = data.id === "root_channel_id" ? "" : data.id;
        this.tableInfo.reSortConfig = data.id === "root_channel_id" ? this.sortPath : undefined
        this.tableThis.table.refresh()
      },

      onChannelChange(type, activeTarget) {

        if (!activeTarget.hasOwnProperty("id")) {
          this.tableThis.table.setEmpty();
          return
        }

        this.channelType = type;
        if (activeTarget.type === type) {
          this.videoId = activeTarget.id === "root_channel_id" ? "" : activeTarget.id;
        } else {
          this.videoId = "";
        }
        this.tableThis.table.refresh();
      },

      // 筛选节点
      filterNode(value, data) {
      },


      // 审核通过 / 撤稿
      handleAudit() {
        this.$ajax.news.article.audit(this.auditData).then(res => {
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
