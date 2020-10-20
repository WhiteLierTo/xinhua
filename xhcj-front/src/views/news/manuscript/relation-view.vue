<template>
  <div class="relation-view-wrapper">
    <div class="relation-view-container">
      <div class="views-container">
        <div class="views-container-inner">
          <div class="block" v-for="(item,index) in buildInfo" :key="index">
            <div v-if="!index">
              <div class="block-title">{{ `关联${item.label}` }}</div>
              <div class="selector-bts-container">
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-connection"
                  @click="isShowSelector = true"
                >关联</el-button>
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-view"
                  @click="jumpToModify"
                  :disabled="!originalData.id"
                >查看</el-button>
              </div>
              <div class="block-row" style="align-items: center" v-if="isShowDetail">
                <div class="label">{{ `已关联${item.label}` }}:</div>
                <div
                  class="content"
                >{{ selectDetail[initTypeInfo[type].titleSubmitName || "title"] }}</div>
              </div>
              <div class="block-row" style="align-items: center" v-if="isShowDetail">
                <div class="label">稿件ID:</div>
                <div class="content">{{ selectDetail.id }}</div>
              </div>

              <div
                class="block-row"
                style="align-items: center"
                v-if="$utils.gadgets.isSpecialTrue(selectDetail.articleStatus)"
              >
                <div class="label">稿件状态:</div>
                <div class="content">{{ selectDetail.articleStatus | statusFormatter }}</div>
              </div>
            </div>

            <div v-else-if="isShowDetail">
              <div class="block-title">{{ item.label }}</div>

              <div
                class="block-row"
                v-for="(detailRow,detailIndex) in item.children || []"
                :key="detailIndex"
              >
                <div class="label">{{ detailRow.label }}:</div>

                <div class="image-container" v-if="detailRow.type === 'image'">
                  <img :src="selectDetail[detailRow.key]" alt v-if="selectDetail[detailRow.key]" />
                  <span v-else>---</span>
                </div>

                <div class="video-container" v-else-if="detailRow.type === 'video'">
                  <video
                    :src="selectDetail[detailRow.key]"
                    controls="controls"
                    v-if="selectDetail[detailRow.key]"
                  ></video>
                  <span v-else>---</span>
                </div>

                <div class="content" v-else-if="detailRow.type === 'aLink'">
                  <a
                    :href="detailRow.formatter ? detailRow.formatter(selectDetail) : (detailRow.content || selectDetail[detailRow.key])"
                    v-text="detailRow.text || (detailRow.formatter ? detailRow.formatter(selectDetail) : (detailRow.content || selectDetail[detailRow.key]))"
                    target="_blank"
                  ></a>
                </div>

                <div class="content" v-else-if="detailRow.type === 'table'">
                  <div class="table-container">
                    <div class="table-row">
                      <div
                        class="cell"
                        v-for="(item,index) in detailRow.tableHead"
                        :key="index"
                      >{{ item }}</div>
                    </div>

                    <div
                      class="table-row"
                      v-for="(item,index) in selectDetail[detailRow.key] || {}"
                      :key="index"
                    >
                      <div
                        class="cell"
                        v-for="(func,colIndex) in detailRow.tableContent"
                        :key="colIndex"
                      >
                        {{
                        func(item,index) }}
                      </div>
                    </div>

                    <div class="table-row" v-if="!selectDetail[detailRow.key]">
                      <div class="cell empty-cell">无数据</div>
                    </div>
                  </div>
                </div>

                <div class="content" v-else>
                  {{
                  (detailRow.formatter ?
                  detailRow.formatter(selectDetail) :
                  (detailRow.content || selectDetail[detailRow.key]))
                  || "---"
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <manuscriptConfig
        v-model="manuscripts"
        :hides="hides"
        :is-require="true"
        v-if="isShowDetail"
        ref="manuscriptConfig"
      />

      <dialogTemplate
        :onClose="closeDialog"
        title="关联"
        :width="1200"
        v-if="isShowSelector"
        ref="selector"
      >
        <div class="dialog-inner">
          <tableWithFilter :filtersInfo="filtersInfo" :tableInfo="tableInfo" v-model="tableThis">
            <el-button
              type="danger"
              icon="el-icon-folder-checked"
              slot="table-left"
              :disabled="isMultiple"
              @click="()=>select()"
            >选择</el-button>
          </tableWithFilter>
        </div>
        <div slot="foot"></div>
      </dialogTemplate>
    </div>
    <div class="bts-row" v-if="isShowDetail">
      <div class="bts-row-one color-row">
        <!-- 全部 -->
        <el-button type="primary" v-allow="permissionSave" @click="save">保存</el-button>
        <el-button type="success" v-allow="permissionSave" @click="saveThenClose" class="bt2">保存并关闭</el-button>

        <!-- 草稿 不通过 已撤稿 -->
        <el-button
          type="success"
          class="bt3"
          @click="saveAsToReview"
          v-if="manuscriptStatus === 0 || manuscriptStatus === 5 ||  manuscriptStatus === 4"
          v-allow="permissionSave"
        >保存为待审核</el-button>

        <!-- 待审核? -->
        <el-button
          v-allow="permissionNoPass"
          type="success"
          class="bt4"
          v-if="manuscriptStatus === 2"
          @click="saveAsNoPass"
        >审核不通过</el-button>

        <!-- 待审核 -->
        <el-button type="success" class="bt5" @click="saveAsPass" v-allow="permissionPass">审核通过并关闭</el-button>

        <!-- 已发布 -->
        <el-button
          type="primary"
          v-allow="permissionCancel"
          plain
          v-if="manuscriptStatus === 3"
          @click="saveAsDelete"
        >撤稿</el-button>

        <!-- 全部 -->
        <el-button type="primary" plain @click="showLog">日志明细</el-button>
        <el-button type="primary" @click="saveAndPreview" plain v-allow="permissionSave">预览</el-button>
        <el-button
          type="primary"
          v-allow="'news:articleList:genPoster'"
          plain
          @click="showPoster"
        >生成海报</el-button>
      </div>
    </div>
    <preview v-if="isShowPreView" :url="previewUrl" :onClose="onPreviewClose" />

    <dialogTemplate v-if="isShowLog" :onClose="()=>isShowLog = false" width="900" title="操作明细">
      <div slot="foot"></div>
      <logDetails :rid="logRid" :articleType="logArticleType" />
    </dialogTemplate>

    <posterImg v-if="isShowPoster" :onClose="onPosterImgClose" :article="posterArticle" />
  </div>
</template>

<script>
import preview from "../../../components/preview/preview";
import axios from "axios";
import logDetails from "./log-details";
import posterImg from "../manuscript/poster";

export default {
  name: "relation-view",
  inject: ["modifyLastBreadcrumbLabel"],
  components: { preview, logDetails, posterImg },
  data() {
    return {
      type: "",
      isShowDetail: false,
      manuscripts: [],
      buildInfo: [],

      initTypeInfo: {
        topic: {
          label: "专题",
          permissionTail: "sc",
          searchUrl: "/channel/special/list",
          titleSubmitName: "name", // filter的key
          detailPath: "/integrate/relevance/channelSpecial", // 获取详情
          updatePath: "/channel/special/update", // 专题编辑
          hides: ["isPcBanner", "comment"],
          articleType: 8, // articleType
          modifyPath: "/news/thematic/addThematic?",
          buildInfo: [
            {
              label: "专题",
            },
            {
              label: "专题信息",
              children: [
                {
                  label: "专题名称",
                  key: "name",
                },
                {
                  label: "专题内名称",
                  key: "fullName",
                },
                {
                  label: "关键词",
                  key: "keyword",
                },
                {
                  label: "描述",
                  key: "description",
                },
                {
                  label: "是否显示",
                  formatter: (row) =>
                    row.backShowFlag === 1
                      ? "显示"
                      : row.backShowFlag === 0
                      ? "隐藏"
                      : "---",
                },
              ],
            },
            {
              label: "图片信息",
              children: [
                {
                  label: "首页呈现方式",
                  formatter: (row) =>
                    row.indexShowType === 1
                      ? "常规(3:2)"
                      : row.indexShowType === 2
                      ? "大图(16:9)"
                      : "---",
                },
                {
                  label: "首页图片",
                  type: "image",
                  key: "indexPicUrl",
                },
                {
                  label: "栏目页顶图",
                  type: "image",
                  key: "topPicUrl",
                },
                {
                  label: "banner图",
                  type: "image",
                  key: "bannerPicUrl",
                },
              ],
            },
          ],
          columns: [
            {
              prop: "name",
              label: "专题名称",
            },
          ],
          filtersInfo: [
            {
              type: "input",
              placeholder: "请输入专题名称",
              submitName: "name",
            },
          ],
        },
        video: {
          label: "视频",
          permissionTail: "video",
          searchUrl: "/video/list", // 获取表格
          titleSubmitName: "title", // filter的key
          detailPath: "/video/instance", // 从这里获取detail
          updatePath: "/video/update",
          hides: ["isPcBanner"],
          articleType: 5,
          modifyPath: "/video/videoManage/editVideo?",
          buildInfo: [
            {
              label: "视频",
            },
            {
              label: "视频稿件信息",
              children: [
                {
                  label: "稿件名",
                  key: "title",
                },
                {
                  label: "关键词",
                  key: "tags",
                },
                {
                  label: "摘要",
                  key: "description",
                },
                {
                  label: "责任编辑",
                  key: "editorUserName",
                },
                {
                  label: "记者",
                  key: "authorUserName",
                },
                {
                  label: "审校",
                  key: "auditUserName",
                },
              ],
            },
            {
              label: "图片信息",
              children: [
                {
                  label: "首页呈现方式",
                  formatter: (row) => {
                    switch (row.picType) {
                      case 1:
                        return "单图";
                      case 2:
                        return "大图";
                      case 3:
                        return "多图";
                    }
                  },
                },
                {
                  label: "首页图片",
                  type: "image",
                  key: "preImgPath",
                },
                {
                  label: "客户端banner",
                  type: "image",
                  key: "bannerUrl",
                },
                {
                  label: "视频",
                  type: "video",
                  key: "videoPath",
                },
              ],
            },
            {
              label: "其他",
              children: [
                {
                  label: "是否推送",
                  formatter: (row) =>
                    row.isPublic === undefined
                      ? "---"
                      : row.isPublic
                      ? "是"
                      : "否",
                },
                {
                  label: "发布时间",
                  formatter: (row) =>
                    row.publicTime === undefined
                      ? "---"
                      : this.$utils.format.timeStampToStandardStr(
                          row.publicTime
                        ),
                },
                {
                  label: "指定发布用户",
                  key: "publicUserName",
                },
              ],
            },
          ],
          columns: [
            {
              prop: "id",
              label: "稿件ID",
            },
            {
              prop: "title",
              label: "标题",
            },
            {
              prop: "editorUserName",
              label: "编辑",
            },
            {
              prop: "authorUserName",
              label: "记者",
            },
          ],
          filtersInfo: [
            {
              type: "input",
              placeholder: "请输入稿件ID",
              submitName: "id",
            },
            {
              type: "input",
              placeholder: "请输入标题",
              submitName: "title",
            },
            {
              type: "input",
              placeholder: "请输入编辑",
              submitName: "editorUserName",
            },
            {
              type: "input",
              placeholder: "请输入记者",
              submitName: "authorUserName",
            },
          ],
        },
        activity: {
          label: "活动",
          permissionTail: "activity",
          searchUrl: "/activity/list", // 获取表格
          titleSubmitName: "title", // filter的key
          detailPath: "/integrate/relevance/activity", // 从这里获取detail
          updatePath: "/activity/edit",
          afterGetDetail: this.onGetActivityDetail,
          hides: ["isPcBanner", "tag", "comment"],
          articleType: 7,
          modifyPath: "/activity/info/addActivity?type=modify&",
          buildInfo: [
            {
              label: "活动",
            },
            {
              label: "活动基本信息",
              children: [
                {
                  label: "活动标题",
                  key: "title",
                },
                {
                  label: "活动地址",
                  key: "address",
                },
                {
                  label: "活动时间",
                  formatter: (row) =>
                    `${this.$utils.format.timeStampToStandardStr(
                      row.startdate
                    )}-${this.$utils.format.timeStampToStandardStr(
                      row.enddate
                    )}`,
                },
                {
                  label: "主办方",
                  key: "sponsor",
                },
                {
                  label: "标签",
                  key: "tags",
                },
                {
                  label: "封面图",
                  type: "image",
                  key: "preImagePath",
                },
                {
                  label: "详情页头图",
                  type: "image",
                  key: "contentimgpath",
                },
                {
                  label: "活动详情",
                  type: "aLink",
                  content: "http://baidu.com",
                  text: "点击查看详情",
                },
              ],
            },
            {
              label: "报名信息",
              children: [
                {
                  label: "报名时间",
                  formatter: (row) =>
                    `${this.$utils.format.timeStampToStandardStr(
                      row.applystarttime
                    )}-${this.$utils.format.timeStampToStandardStr(
                      row.applyendtime
                    )}`,
                },
                {
                  label: "报名人数",
                  key: "num",
                },
                {
                  label: "报名填写信息",
                  type: "table",
                  tableHead: ["#", "报名字段", "是否需要填写", "是否必填"],
                  tableContent: [
                    (item, index) => index + 1,
                    (item) => item.name,
                    (item) => (item.needflag ? "是" : "否"),
                    (item) => (item.notnullflag ? "是" : "否"),
                  ],
                  key: "enrollmentFields",
                },
              ],
            },
            {
              label: "直播信息",
              children: [
                {
                  label: "直播地址",
                  key: "liveUrl",
                },
                {
                  label: "直播时间",
                  formatter: (row) =>
                    `${this.$utils.format.timeStampToStandardStr(
                      row.liveStartTime
                    )}-${this.$utils.format.timeStampToStandardStr(
                      row.liveEndTime
                    )}`,
                },
              ],
            },
          ],
          columns: [{ prop: "title", label: "活动名称" }],
          filtersInfo: [
            {
              type: "input",
              placeholder: "请输入活动名称",
              submitName: "actName",
            },
          ],
        },
        live: {
          label: "直播",
          permissionTail: "live",
          searchUrl: "/live/list", // 获取表格
          titleSubmitName: "title", // filter的key
          detailPath: "/live/instance", // 从这里获取detail
          updatePath: "/live/update",
          hides: ["isPcBanner", "tag", "comment"],
          articleType: 6,
          modifyPath: "/live/liveManage/editLive?",
          buildInfo: [
            {
              label: "直播",
            },
            {
              label: "直播信息",
              children: [
                {
                  label: "标题名",
                  key: "title",
                },
                {
                  label: "直播状态",
                  formatter: (row) =>
                    this.$utils.data.live.getLiveStatusLabelByValue(row.state),
                },
                {
                  label: "直播开始时间",
                  formatter: (row) =>
                    this.$utils.format.timeStampToStandardStr(
                      row.liveDateStart
                    ),
                },
                {
                  label: "主持人",
                  key: "compereUserName",
                },
                {
                  label: "主播",
                  key: "anchorUserName",
                },
                {
                  label: "app预览图",
                  type: "image",
                  key: "preImgPath",
                },
                {
                  label: "网站预览图",
                  type: "image",
                  key: "pageImgPath",
                },
              ],
            },
            {
              label: "录像信息",
              children: [
                {
                  label: "录像地址",
                  key: "videoPath",
                },
              ],
            },
            {
              label: "直播介绍",
              children: [
                {
                  label: "直播介绍",
                  key: "description",
                },
              ],
            },
          ],
          columns: [
            {
              prop: "id",
              label: "稿件ID",
            },
            {
              prop: "title",
              label: "标题",
            },
            {
              prop: "compereUserName",
              label: "主持人",
            },
            {
              prop: "anchorUserName",
              label: "主播",
            },
          ],
          filtersInfo: [
            {
              type: "input",
              placeholder: "请输入稿件ID",
              submitName: "id",
            },
            {
              type: "input",
              placeholder: "请输入标题",
              submitName: "title",
            },
          ],
        },
      },

      isShowSelector: false,
      filtersInfo: [
        {
          type: "input",
          placeholder: "请输入标题",
          submitName: "title",
        },
      ],
      tableInfo: {
        searchUrl: "",
        columns: [],
        hides: ["create", "deleteAll", "modify"],
        noDivider: true,
        selectConfig: {
          singleChoice: true,
        },
      },
      tableThis: {},

      hides: [],

      selectDetail: {},
      originalData: {}, // 原始数据

      manuscriptStatus: -1, // 0:草稿 1:已删除 2:待审核 3:审核通过 4:已撤稿 5:审核未通过
      modifyId: "",

      isShowPreView: false,
      previewUrl: "",

      isShowLog: false,
      logRid: "",
      logArticleType: 0,

      isShowPoster: false,
      posterArticle: {},
    };
  },
  filters: {
    statusFormatter(val) {
      switch (val) {
        case 0:
          return "保存(草稿)";
        case 1:
          return "已删除";
        case 2:
          return "待审核";
        case 3:
          return "审核通过"; // 即已发布
        case 4:
          return "已撤稿";
        case 5:
          return "审核未通过";
      }
    },
  },
  mounted() {
    this.init();
    this.onModify();
  },
  computed: {
    isMultiple() {
      // 是否有元素被选中
      return (
        !this.tableThis ||
        !this.tableThis.table ||
        this.tableThis.table.multipleSelection.length === 0
      );
    },

    isManuscriptsEmpty() {
      return this.manuscripts.length === 0;
    },

    permissionSave() {
      return `news:articleList:save:${
        this.initTypeInfo[this.type].permissionTail
      }`;
    },

    permissionCancel() {
      return `news:articleList:cancel:${
        this.initTypeInfo[this.type].permissionTail
      }`;
    },

    permissionPass() {
      return `news:articleList:audit:yes:${
        this.initTypeInfo[this.type].permissionTail
      }`;
    },

    permissionNoPass() {
      return `news:articleList:audit:no:${
        this.initTypeInfo[this.type].permissionTail
      }`;
    },
  },
  methods: {
    init() {
      // 面包屑
      this.type = this.$route.query.type || "topic";
      this.modifyLastBreadcrumbLabel(
        `关联${this.initTypeInfo[this.type].label}`
      );
      this.buildInfo = this.$utils.gadgets.deepClone(
        this.initTypeInfo[this.type].buildInfo
      );
      this.tableInfo.searchUrl = this.initTypeInfo[this.type].searchUrl;
      this.tableInfo.columns = this.initTypeInfo[this.type].columns;

      this.filtersInfo = this.initTypeInfo[this.type].filtersInfo;
      this.hides = this.initTypeInfo[this.type].hides || [];
    },

    onModify() {
      this.modifyId = this.$route.query.id;
      if (!this.modifyId) return;
      this.select(this.modifyId);
    },

    closeDialog() {
      this.isShowSelector = false;
    },

    async select(modifyId) {
      let id = modifyId || this.tableThis.table.multipleSelection[0].id;
      this.$refs.selector && this.$refs.selector.closeSelf();

      let [ok, data] = await this.$ajax.news.manuscript.detail(
        this.initTypeInfo[this.type].detailPath,
        id,
        this.initTypeInfo[this.type].method
      );
      if (!ok) {
        this.$message.error(`请求失败:${data || ""}`);
        return;
      }
      this.originalData = this.$utils.gadgets.deepClone(data);
      this.selectDetail = this.initTypeInfo[this.type].afterGetDetail
        ? this.initTypeInfo[this.type].afterGetDetail(data)
        : data;
      this.manuscriptStatus = parseInt(this.selectDetail.articleStatus); // 专题 没有状态
      this.isShowDetail = true;

      this.$nextTick(() => {
        if (this.$refs.manuscriptConfig) {
          this.$refs.manuscriptConfig.init(
            this.$utils.gadgets.deepClone(this.selectDetail.articleList || []),
            {
              isCommentAudit: this.selectDetail.isCommentAudit,
              isComment: this.selectDetail.isComment,
              isPraise: this.selectDetail.isPraise,
            }
          );
        }
      });
    },

    onGetActivityDetail(data) {
      data.enrollmentFields = [
        ...Object.entries(JSON.parse(data.configjson)).map(([key, value]) => ({
          ...value,
          name: this.getEnrollmentFieldText(key),
        })),
        ...data.exActFieldList,
      ];
      return data;
    },

    getEnrollmentFieldText(text) {
      // 报名字段的中文名
      return {
        name: "姓名",
        sex: "性别",
        mobile: "手机号",
        company: "公司",
        profession: "职业",
        post: "职务",
        remark: "备注",
      }[text];
    },

    async update(articleStatus) {
      let commentConfig = {};
      try {
        commentConfig = this.$refs.manuscriptConfig.getCommentConfig();
      } catch (e) {
        commentConfig = {};
      }

      let res = await this.$ajax.news.manuscript.update({
        articleType: this.initTypeInfo[this.$route.query.type].articleType,
        rid:
          this.originalData.id ||
          (this.tableThis.table.multipleSelection.length
            ? this.tableThis.table.multipleSelection[0].id
            : this.$route.query.id),
        articleStatus,
        articleList: this.manuscripts,
        ...commentConfig,
      });
      if (res[0]) {
        await this.select(this.originalData.id);
      }
      return res;
    },

    isEmpty() {
      if (this.isManuscriptsEmpty) {
        this.$message.warning("稿签为必选项");
        return true;
      }
      return false;
    },

    async save() {
      // 点击保存按钮
      if (this.isEmpty()) return;
      let [ok, msg] = await this.update(this.originalData.articleStatus);
      if (ok) {
        this.$message.success("保存成功");
      } else {
        this.$message.error("保存失败" + msg);
      }
      return ok;
    },

    async saveThenClose() {
      if (this.isEmpty()) return;
      let [ok, msg] = await this.update(this.originalData.articleStatus);
      if (ok) {
        this.$message.success("保存成功");
        this.$router.go(-1);
      } else {
        this.$message.error("保存失败" + msg);
      }
    },

    async saveAsToReview() {
      if (this.isEmpty()) return;
      let [ok, msg] = await this.update(2);
      if (ok) {
        this.$message.success("保存成功");
      } else {
        this.$message.error("保存失败" + msg);
      }
    },

    async saveAsNoPass() {
      if (this.isEmpty()) return;
      let [ok, msg] = await this.update(5);
      if (ok) {
        this.$message.success("状态成功更新为审核不通过");
      } else {
        this.$message.error("状态更新失败" + msg);
      }
    },

    async saveAsPass() {
      if (this.isEmpty()) return;
      let [ok, msg] = await this.update(3);
      if (ok) {
        this.$message.success("状态成功更新为审核通过");
        this.$router.go(-1);
      } else {
        this.$message.error("状态更新失败" + msg);
      }
    },

    async saveAsDelete() {
      if (this.isEmpty()) return;
      let [ok, msg] = await this.update(4);
      if (ok) {
        this.$message.success("状态成功更新为撤稿");
      } else {
        this.$message.error("状态更新失败" + msg);
      }
    },

    jumpToModify() {
      let modifyPath = `${this.initTypeInfo[this.type].modifyPath}id=${
        this.originalData.id
      }`;
      this.$router.push(modifyPath);
    },

    onPreviewClose() {
      this.isShowPreView = false;
    },

    async saveAndPreview() {
      let isSaveOk = await this.save();
      if (!isSaveOk) return;
      let configRes = await axios.get("./config.json");
      if (configRes.status !== 200) return;
      this.$nextTick(() => {
        let path = `${configRes.data.websiteUrl}/newsDetail?id=${
          this.originalData.id
        }&type=${this.initTypeInfo[this.type].articleType}`;
        if (this.originalData.linkUrl) {
          path += `&linkUrl=${this.originalData.linkUrl}`;
        }
        this.previewUrl = path;
        this.isShowPreView = true;
      });
    },

    showLog() {
      this.logRid = this.originalData.id;
      this.logArticleType = this.initTypeInfo[this.type].articleType;
      this.isShowLog = true;
    },

    async showPoster() {
      let isSaveOk = await this.save();
      if (!isSaveOk) return;
      this.posterArticle = this.$utils.gadgets.deepClone(this.originalData);
      this.posterArticle.articleType = this.initTypeInfo[
        this.$route.query.type
      ].articleType;
      this.isShowPoster = true;
    },

    onPosterImgClose() {
      this.isShowPoster = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "../../../style/config";
@import "../../../style/styles";

.relation-view-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .relation-view-container {
    width: 100%;
    display: flex;
    flex: 1;
    overflow: hidden;

    .views-container {
      flex: 1;
      height: 100%;
      background: white;
      overflow: hidden;
      margin-right: @defaultPaddingY;
      padding: @defaultPaddingY 10px @defaultPaddingY @defaultPaddingX;

      .views-container-inner {
        width: 100%;
        height: 100%;
        overflow: auto;

        &::-webkit-scrollbar {
          width: 6px;
          height: 8px;
          background: transparent;
        }

        &::-webkit-scrollbar-thumb {
          background: @defaultBorderColor;
        }

        .block {
          margin-bottom: 30px;

          .block-title {
            border-left: 4px solid @defaultBlueClick;
            padding-left: 10px;
            height: 20px;
            color: @defaultTileColor;
            font-size: @middleFontSize;
            font-weight: 600;
            line-height: 20px;
            margin-bottom: 20px;
          }

          .selector-bts-container {
            padding-left: 105px;
          }

          .block-row {
            margin-top: 20px;
            display: flex;
            align-items: flex-start;

            .label {
              width: 90px;
              overflow: hidden;
              margin-right: 15px;
              text-align: right;
              color: @darkBlue;
            }

            .content {
              flex: 1;
              overflow: hidden;
              max-width: 440px;
              line-height: 20px;
              color: @defaultTileColor;
            }

            .image-container {
              width: 210px;
              overflow: hidden;

              img {
                max-width: 210px;
              }
            }

            .video-container {
              video {
                width: 210px;
                height: 120px;
              }
            }

            .table-container {
              width: 100%;
              border: 1px solid @defaultBorderColor;

              .table-row {
                height: 40px;
                line-height: 40px;
                text-align: center;
                display: flex;

                &:first-child {
                  background: @defaultTableHeadBgColor !important;
                  color: @defaultTableHeadColor;
                  font-weight: 600;
                }

                &:nth-child(2n + 1) {
                  background: @superLightGray;
                }

                .cell {
                  flex: 3;

                  &:first-child {
                    flex: 1;
                  }
                }

                .empty-cell {
                  color: @lightGray;
                }
              }
            }
          }
        }
      }
    }

    .dialog-inner {
      height: 650px;
    }
  }

  .bts-row {
    flex-shrink: 0;

    .bts-row-one {
      margin-top: 10px;
      width: 100%;
      .flexCenter();
    }

    .color-row {
      .el-button {
        border: none;
      }

      .bt2 {
        background: #62a8bc;
      }

      .bt3 {
        background: #5e7eae;
      }

      .bt4 {
        background: #ca7a53;
      }

      .bt5 {
        background: #859872;
      }
    }
  }
}
</style>
