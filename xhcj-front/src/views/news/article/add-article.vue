<template>
  <div class="article-add-container">
    <div class="article-add-content">
      <div class="article-add-left-container">
        <div class="article-add-left-container-inner">
          <el-form
            ref="form"
            :model="articleInfo"
            label-width="110px"
            size="mini"
            :style="{ maxWidth: '1000px',minWidth:'650px',paddingRight:'10px'}"
          >
            <div class="base-info">
              <span>基本信息</span>
              <span class="base-info-icon-container" @click="shrinks.baseInfo = !shrinks.baseInfo">
                <span>{{ shrinks.baseInfo?'展开':'收起' }}</span>
                <i class="el-icon-arrow-up base-info-icon" :class="{iconRotate:shrinks.baseInfo}"></i>
              </span>
            </div>

            <div v-show="!shrinks.baseInfo">
              <el-form-item label="稿件名:" required>
                <div style="display:flex;">
                  <el-input v-model="articleInfo.title"></el-input>
                  <el-button
                    type="primary"
                    size="mini"
                    class="audit-name"
                    @click="validateArticleName"
                  >稿件名校验</el-button>
                </div>
              </el-form-item>

              <el-form-item label="关键词:">
                <el-input v-model="articleInfo.keyword"></el-input>
              </el-form-item>

              <el-form-item label="摘要:" :required="!!articleInfo.publishFlag">
                <el-input type="textarea" v-model="articleInfo.description" :rows="2"></el-input>
              </el-form-item>

              <el-form-item label="文章类型:">
                <el-radio-group v-model="articleInfo.type" @change="onArticleTypeChange">
                  <el-radio label="normal">原创</el-radio>
                  <el-radio label="grasp">抓取</el-radio>
                  <el-radio label="adv">广告</el-radio>
                  <el-radio label="cjh">财经号</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item
                label="来源:"
                v-if="
                articleInfo.type === 'grasp' || articleInfo.type === 'normal'
              "
              >
                <div style="display:flex;">
                  <el-select
                    v-model="articleInfo.sourceId"
                    v-if="articleInfo.type === 'grasp'"
                    style="width:345px;margin-right:20px;"
                    filterable
                    remote
                    :remote-method="filerSourceOption"
                  >
                    <el-option
                      v-for="item in graspSources"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>

                  <el-input
                    value="新华日报财经"
                    disabled
                    style="width:345px;margin-right:20px;"
                    v-if="articleInfo.type === 'normal'"
                  ></el-input>

                  <div class="resource">
                    <div style="margin-right: 10px;" @click="showResource = true">新增来源</div>
                    <div @click="showManage = true">管理来源</div>
                  </div>
                </div>
              </el-form-item>

              <template v-if="articleInfo.type !== 'adv'">
                <el-form-item label="记者:">
                  <addReporter :reporters="articleInfo.reporters" @change="onReporterChange" />
                </el-form-item>

                <el-form-item label="审校:">
                  <el-input
                    v-model="articleInfo.proofread"
                    style="width:385px;margin-right:20px;float: left;"
                    disabled
                  ></el-input>
                  <personSelector
                    :onSelect="onSelectPersonHigher('proofreadId','proofread')"
                    userDataResource="/system/user/list"
                    style="float: left"
                  />
                </el-form-item>
              </template>

              <el-form-item label="财经号关联:" v-if="articleInfo.type === 'cjh'">
                <el-input
                  v-model="articleInfo.source"
                  style="width:385px;margin-right:20px;float: left;"
                  disabled
                ></el-input>
                <economicSelect :onSelect="onSelectEconomic" style="float: left" />
              </el-form-item>
            </div>

            <div class="base-info">
              <span>图片信息</span>
              <span class="base-info-icon-container" @click="shrinks.image = !shrinks.image">
                <span>{{ shrinks.image?'展开':'收起' }}</span>
                <i class="el-icon-arrow-up base-info-icon" :class="{iconRotate:shrinks.image}"></i>
              </span>
            </div>

            <div v-show="!shrinks.image">
              <el-form-item label="首页呈现方式:">
                <el-radio-group v-model="articleInfo.picType" @change="onPicTypeChange">
                  <el-radio :label="1">
                    {{
                    articleInfo.type !== "adv" ? "单图" : "纯图"
                    }}
                  </el-radio>
                  <el-radio :label="3" v-if="articleInfo.type !== 'adv'">三图</el-radio>
                  <el-radio :label="2">大图</el-radio>
                  <el-radio :label="0" v-if="articleInfo.type !== 'adv'">无图</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="首页图片上传:" v-if="articleInfo.picType" required>
                <div class="upload-box">
                  <picCutting
                    proportion="63:13"
                    class="pic-cutting"
                    uploadPath="/system/theme/upload"
                    v-model="articleInfo.listPicOne"
                    :max-size="1500000"
                    v-if="articleInfo.type === 'adv' && articleInfo.picType === 1"
                    key="6313"
                  ></picCutting>

                  <picCutting
                    proportion="3:2"
                    class="pic-cutting"
                    uploadPath="/system/theme/upload"
                    v-model="articleInfo.listPicOne"
                    :max-size="1500000"
                    v-else-if="articleInfo.picType !== 2"
                    key="32"
                  ></picCutting>

                  <picCutting
                    proportion="16:9"
                    class="pic-cutting"
                    uploadPath="/system/theme/upload"
                    v-model="articleInfo.listPicOne"
                    :max-size="1500000"
                    v-else-if="articleInfo.picType === 2"
                    key="169"
                  ></picCutting>

                  <span class="repository-select" @click="openResourcePool('listPicOne')">资源库选择</span>
                  <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>

                  <div
                    class="upload-img-container"
                    :class="{
                    'three-two-img-container': articleInfo.picType !== 2,
                    'sixteen-nine-img-container': articleInfo.picType === 2,
                    'flat-long-img-container':
                      articleInfo.type === 'adv' && articleInfo.picType === 1,
                  }"
                  >
                    <img
                      class="empty-img"
                      src="../../../assets/nopic.png"
                      v-if="!articleInfo.listPicOne"
                      alt
                    />
                    <img class="upload-img" :src="articleInfo.listPicOne" alt v-else />
                  </div>
                  <span class="aspect-ratio">
                    {{
                    articleInfo.type === "adv" && articleInfo.picType === 1
                    ? "(w:630px h:130px)"
                    : articleInfo.picType === 2
                    ? "(16:9)"
                    : "(3:2)"
                    }}
                  </span>
                  <span class="clear" @click="articleInfo.listPicOne = ''">清除</span>
                </div>

                <div class="upload-box" v-if="articleInfo.picType === 3">
                  <picCutting
                    proportion="3:2"
                    class="pic-cutting"
                    uploadPath="/system/theme/upload"
                    v-model="articleInfo.listPicTwo"
                    :max-size="1500000"
                  ></picCutting>
                  <span class="repository-select" @click="openResourcePool('listPicTwo')">资源库选择</span>
                  <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>

                  <div class="upload-img-container three-two-img-container">
                    <img
                      class="empty-img"
                      src="../../../assets/nopic.png"
                      v-if="!articleInfo.listPicTwo"
                      alt
                    />
                    <img class="upload-img" :src="articleInfo.listPicTwo" alt v-else />
                  </div>
                  <span class="aspect-ratio">
                    {{
                    articleInfo.picType === 2 ? "(16:9)" : "(3:2)"
                    }}
                  </span>
                  <span class="clear" @click="articleInfo.listPicTwo = ''">清除</span>
                </div>

                <div class="upload-box" v-if="articleInfo.picType === 3">
                  <picCutting
                    proportion="3:2"
                    class="pic-cutting"
                    uploadPath="/system/theme/upload"
                    v-model="articleInfo.listPicThree"
                    :max-size="1500000"
                  ></picCutting>
                  <span class="repository-select" @click="openResourcePool('listPicThree')">资源库选择</span>
                  <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>

                  <div class="upload-img-container three-two-img-container">
                    <img
                      class="empty-img"
                      src="../../../assets/nopic.png"
                      v-if="!articleInfo.listPicThree"
                      alt
                    />
                    <img class="upload-img" :src="articleInfo.listPicThree" alt v-else />
                  </div>
                  <span class="aspect-ratio">
                    {{
                    articleInfo.picType === 2 ? "(16:9)" : "(3:2)"
                    }}
                  </span>
                  <span class="clear" @click="articleInfo.listPicThree = ''">清除</span>
                </div>
              </el-form-item>

              <el-form-item label="客户端banner:" :required="needMobBanner">
                <div class="upload-box">
                  <picCutting
                    proportion="16:9"
                    class="pic-cutting"
                    uploadPath="/system/theme/upload"
                    v-model="articleInfo.titleImgPath"
                    :max-size="1500000"
                  ></picCutting>
                  <span class="repository-select" @click="openResourcePool('titleImgPath')">资源库选择</span>
                  <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>

                  <div class="upload-img-container sixteen-nine-img-container">
                    <img
                      class="empty-img"
                      src="../../../assets/nopic.png"
                      v-if="!articleInfo.titleImgPath"
                      alt
                    />
                    <img class="upload-img" :src="articleInfo.titleImgPath" alt v-else />
                  </div>
                  <span class="aspect-ratio">(16:9)</span>
                </div>
                <span class="clear" @click="articleInfo.titleImgPath = ''">清除</span>
              </el-form-item>

              <el-form-item label="网站首页banner:">
                <div class="upload-box">
                  <picCutting
                    proportion="16:9"
                    class="pic-cutting"
                    uploadPath="/system/theme/upload"
                    v-model="articleInfo.contentImgPath"
                    :max-size="1500000"
                  ></picCutting>
                  <span class="repository-select" @click="openResourcePool('contentImgPath')">资源库选择</span>
                  <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>
                  <div class="upload-img-container sixteen-nine-img-container">
                    <img
                      class="empty-img"
                      src="../../../assets/nopic.png"
                      v-if="!articleInfo.contentImgPath"
                      alt
                    />
                    <img class="upload-img" :src="articleInfo.contentImgPath" alt v-else />
                  </div>
                  <span class="aspect-ratio">(16:9)</span>
                </div>
                <span class="clear" @click="articleInfo.contentImgPath = ''">清除</span>
              </el-form-item>
            </div>

            <div class="base-info">
              <span>文章内容</span>
              <span class="base-info-icon-container" @click="shrinks.article = !shrinks.article">
                <span>{{ shrinks.article?'展开':'收起' }}</span>
                <i class="el-icon-arrow-up base-info-icon" :class="{iconRotate:shrinks.article}"></i>
              </span>
            </div>

            <xhUeditor v-model="articleInfo.content" v-show="!shrinks.article" style="margin-bottom:10px"/>

            <div class="base-info">
              <span>其他内容</span>
              <span class="base-info-icon-container" @click="shrinks.other = !shrinks.other">
                <span>{{ shrinks.other?'展开':'收起' }}</span>
                <i class="el-icon-arrow-up base-info-icon" :class="{iconRotate:shrinks.other}"></i>
              </span>
            </div>

            <div v-show="!shrinks.other">
              <el-form-item label="来源链接:">
                <el-input v-model="articleInfo.sourceUrl" placeholder="请输入来源链接" style="width:80%"></el-input>
              </el-form-item>

              <el-form-item label="H5链接:">
                <el-input v-model="articleInfo.linkUrl" style="width:80%"></el-input>
              </el-form-item>

              <el-form-item label="是否推送:">
                <el-radio-group v-model="articleInfo.publishFlag">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="推送时间:" required v-if="articleInfo.publishFlag">
                <el-date-picker
                  v-model="articleInfo.pushTime"
                  type="datetime"
                  placeholder="选择推送时间"
                  style="width:80%"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="发布时间:">
                <el-date-picker
                  v-model="articleInfo.publishDate"
                  type="datetime"
                  placeholder="选择发布时间"
                  style="width:80%"
                ></el-date-picker>
              </el-form-item>

              <template v-if="articleInfo.type !== 'adv'">
                <el-form-item label="责任编辑:">
                  <el-input
                    v-model="articleInfo.author"
                    style="width:385px;margin-right:20px;float: left;"
                    disabled
                  ></el-input>
                  <personSelector
                    :onSelect="onSelectPersonHigher('authorId','author')"
                    userDataResource="/system/user/list"
                    style="float: left"
                  />
                </el-form-item>
              </template>

              <el-form-item label="发布用户:">
                <el-input
                  v-model="articleInfo.publishUserName"
                  style="width:385px;margin-right:20px;float: left;"
                  disabled
                ></el-input>
                <personSelector
                  :onSelect="onSelectPersonHigher('publishUserId','publishUserName')"
                  userDataResource="/system/user/list"
                  style="float: left"
                />
              </el-form-item>
            </div>

          </el-form>
        </div>
      </div>
      <manuscriptConfig
        v-model="articleInfo.articleList"
        :is-require="true"
        :hides="manuscriptHides"
        ref="articleList"
      />
    </div>
    <div class="bts-row">
      <div class="bts-row-one color-row">
        <!-- 全部 -->
        <el-button v-allow="'news:articleList:add:article:save'" type="primary" @click="save">保存</el-button>
        <el-button
          v-allow="'news:articleList:add:article:save'"
          type="success"
          @click="saveThenClose"
          class="bt2"
        >保存并关闭</el-button>

        <!-- 草稿 不通过 已撤稿 -->
        <el-button
          v-allow="'news:articleList:add:article:save'"
          type="success"
          class="bt3"
          @click="saveAsToReview"
          v-if="
            articleInfo.articleStatus === 0 ||
              articleInfo.articleStatus === 5 ||
              articleInfo.articleStatus === 4
          "
        >保存为待审核</el-button>

        <!-- 待审核? -->
        <el-button
          v-allow="'news:articleList:add:article:audit:no'"
          type="success"
          class="bt4"
          v-if="articleInfo.articleStatus === 2"
          @click="saveAsNoPass"
        >审核不通过</el-button>

        <el-button
          v-allow="'news:articleList:add:article:audit:yes'"
          type="success"
          class="bt5"
          @click="saveAsPass"
        >审核通过并关闭</el-button>

        <!-- 已发布 -->
        <el-button
          v-allow="'news:articleList:add:article:cancel'"
          type="primary"
          plain
          v-if="articleInfo.articleStatus === 3"
          @click="saveAsDelete"
        >撤稿</el-button>

        <!-- 全部 -->
        <el-button type="primary" v-if="articleInfo.id" plain @click="showLog">日志明细</el-button>
        <el-button
          type="primary"
          v-allow="'news:articleList:add:article:save'"
          plain
          @click="saveAndPreview"
        >预览</el-button>

        <el-button
          type="primary"
          v-allow="'news:articleList:genPoster'"
          plain
          @click="showPoster"
        >生成海报</el-button>
      </div>
    </div>

    <dialogTemplate
      :width="resourcePollWidth"
      v-if="isShowResourcePoolDialog"
      :onClose="onResourcePoolClose"
      ref="resourcePoolDialog"
      title="从资源库选择"
    >
      <resourcePool
        isSelectMode="true"
        :onSelect="onResourcePoolSelectImg"
        type="image"
        style="height:87vh"
      ></resourcePool>
      <div slot="foot"></div>
    </dialogTemplate>

    <addResource v-if="showResource" :onClose="onCloseResource" />
    <resourceManage v-if="showManage" :onClose="onCloseResourceManage" :onSelect="onSelect" />
    <preview v-if="isShowPreView" :url="previewUrl" :onClose="onPreviewClose" />

    <dialogTemplate v-if="isShowLog" :onClose="() => (isShowLog = false)" width="900" title="操作明细">
      <div slot="foot"></div>
      <logDetails :rid="logRid" :articleType="logArticleType" />
    </dialogTemplate>

    <posterImg v-if="isShowPoster" :onClose="onPosterImgClose" :article="posterArticle" />
  </div>
</template>
<script>
import addResource from "./add-resource";
import resourceManage from "./resource-manage";
import resourcePool from "../../news/resource/resource";
import economicSelect from "./economic/economic-select";
import addReporter from "./add-reporter";

import preview from "../../../components/preview/preview";
import axios from "axios";
import logDetails from "../manuscript/log-details";

import posterImg from "../manuscript/poster";

export default {
  name: "editArticle",
  components: {
    resourcePool,
    addResource,
    economicSelect,
    resourceManage,
    addReporter,
    preview,
    logDetails,
    posterImg,
  },
  inject: ["modifyLastBreadcrumbLabel"],
  data() {
    return {
      height: window.innerHeight * 0.8,
      articleInfo: {
        articleStatus: -1, // 状态
        title: "", // 稿件名
        keyword: "", // 关键词
        description: "", // 摘要
        type: "normal", // 稿件类型 normal:原创 grasp:抓取 adv:广告 cjh:财经号
        articleList: [], // 稿签
        publishUserName: this.$store.state.userDetail.name, // 发布人
        publishUserId: this.$store.state.userDetail.id, // 发布人ID
        sourceId: "", // 来源ID
        source: "", // 来源名字
        author: this.$store.state.userDetail.name, // 责任编辑?
        authorId: this.$store.state.userDetail.id, // 责编ID
        reporters: [], // 记者
        proofread: "", // 审校
        linkUrl: "", // H5链接
        picType: 1, // 首页呈现方式
        titleImgPath: "", // 客户端banner
        contentImgPath: "", // 网站首页banner
        listPicOne: "", // 第一张图的url
        listPicTwo: "", // 第二张图的url
        listPicThree: "", // 第三张图的url
        content: "", // 富文本
        sourceUrl: "", // 来源链接
        publishFlag: 0, // 是否推送
        publishDate: "", // 发布时间
        pushTime: "", // 推送时间,如果推送
      },
      graspSources: [], // 抓取的来源
      _graspSources: [], // 抓取来源存储
      sourceStorage: {}, // "来源"的来源是多样的,需要将旧的存储起来
      listPicStorage: new Map(), // 旧图的存起来
      isShowResourcePoolDialog: false,
      resourcePollWidth: window.innerWidth * 0.8,

      isShowPreView: false,
      previewUrl: "",

      showResource: false,
      showManage: false,

      isShowLog: false,
      logRid: "",
      logArticleType: 0,

      isShowPoster: false,
      posterArticle: {},

      shrinks: {
        // 是否收起
        baseInfo: false,
        image: false,
        article: false,
        other: false,
      },
    };
  },
  mounted() {
    this.getSourceList();
    if (this.$route.query.id) {
      this.modifyLastBreadcrumbLabel("修改文章");
      this.getArticleDetail();
    } else {
      this.articleInfo.articleStatus = 0;
    }
  },

  computed: {
    needMobBanner() {
      return !!this.articleInfo.articleList
        .map((d) => d.isBanner)
        .filter(Boolean).length;
    },

    isManuscriptsEmpty() {
      return this.articleList.length === 0;
    },

    manuscriptHides() {
      return [];
    },

    sourceIdAndSourceName() {
      // 用来监听sourceId 和 source的变动
      return `${this.articleInfo.sourceId}+${this.articleInfo.source}`;
    },

    listPic() {
      // 用来监听三个listPic的变化
      return `${this.articleInfo.listPicOne}+${this.articleInfo.listPicTwo}+${this.articleInfo.listPicThree}`;
    },
  },

  watch: {
    sourceIdAndSourceName() {
      this.sourceStorage[`${this.articleInfo.type}`] = {
        sourceId: this.articleInfo.sourceId,
        source: this.articleInfo.source,
      };
    },

    listPic() {
      // 存一份
      let addStr = "";
      // && this.articleInfo.picType
      if (this.articleInfo.type === "adv" && this.articleInfo.picType === 1) {
        // 广告是特殊的
        addStr = "adv";
      }

      this.listPicStorage[`${addStr}${this.articleInfo.picType}`] = [
        this.articleInfo.listPicOne,
        this.articleInfo.listPicTwo,
        this.articleInfo.listPicThree,
      ];
    },
  },

  methods: {
    getArticleDetail() {
      return this.$ajax.news.article
        .articleDetail(this.$route.query.id)
        .then((res) => {
          if (res.code !== 200) return;
          this.articleInfo = Object.assign(this.articleInfo, res.data);
          let reporterIds = (this.articleInfo.reporterId || "").split(",");
          this.articleInfo.reporters = (this.articleInfo.reporter || "")
            .split(",")
            .filter(Boolean)
            .map((re, index) => ({
              name: re,
              id: reporterIds[index],
            }));
          this.$refs.articleList.init(
            this.articleInfo.articleList,
            {
              isCommentAudit: this.articleInfo.isCommentAudit,
              isComment: this.articleInfo.isComment,
              isPraise: this.articleInfo.isPraise,
            },
            this.articleInfo.isPcBanner
          );
          this.$forceUpdate();
        });
    },

    //校验稿件名
    validateArticleName() {
      let data = { title: this.articleInfo.title };
      if (!!this.$route.query.id) {
        data.id = this.$route.query.id;
      }
      this.$ajax.news.article.checkTitle(data).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    //   来源列表
    getSourceList() {
      this.$ajax.news.article.getSourceList("grasp").then((res) => {
        this.graspSources = res.rows;
        this._graspSources = res.rows;
      });
    },

    onArticleTypeChange(newType) {
      // 将旧有的来源存储起来
      if (newType === "normal") {
        // 原创 需要手动指定source
        this.articleInfo.source = "新华日报财经";
        this.articleInfo.sourceId = "static_xhcj_id";
      }

      if (newType === "cjh" || newType === "grasp") {
        this.articleInfo = Object.assign(
          this.articleInfo,
          this.sourceStorage[`${this.articleInfo.type}`] || {
            source: "",
            sourceId: "",
          }
        );
      }

      // 如果是广告 且 picType === 0 || === 3 强制切到1
      if (
        this.articleInfo.type === "adv" &&
        (this.articleInfo.picType === 0 || this.articleInfo.picType === 3)
      ) {
        this.articleInfo.picType = 1;
      }

      this.onPicTypeChange(this.articleInfo.picType);
    },

    //选择财经号
    onSelectEconomic(row) {
      this.articleInfo.source = row.name;
      this.articleInfo.sourceId = row.id;
    },

    // 选人
    onSelectPersonHigher(idKey, nameKey) {
      return (row) => {
        this.articleInfo[idKey] = row.id;
        this.articleInfo[nameKey] = row.name;
      };
    },

    onResourcePoolClose() {
      this.isShowResourcePoolDialog = false;
    },

    onResourcePoolSelectImg(objList) {
      let target = objList[0];
      if (target.type !== "image") {
        this.$message.warn("请选择图片");
        return;
      }
      this.articleInfo[this.openResourcePool.imgPathKey] = target.id;
      this.$refs.resourcePoolDialog.closeSelf();
    },

    openResourcePool(key) {
      this.openResourcePool.imgPathKey = key;
      this.isShowResourcePoolDialog = true;
    },

    onPicTypeChange(newPicType) {
      let addStr = "";
      if (this.articleInfo.type === "adv" && this.articleInfo.picType === 1) {
        // 广告是特殊的
        addStr = "adv";
      }
      [
        this.articleInfo.listPicOne,
        this.articleInfo.listPicTwo,
        this.articleInfo.listPicThree,
      ] = this.listPicStorage[`${addStr}${newPicType}`] || ["", "", ""];
    },

    validateAll() {
      // 校验
      if (!this.articleInfo.title) {
        this.$message.error("稿件名为必填项");
        return false;
      }

      if (this.articleInfo.articleList.length === 0) {
        this.$message.error("文章必须被关联至至少一个频道");
        return false;
      }

      if (this.articleInfo.publishFlag && !this.articleInfo.pushTime) {
        this.$message.error("当稿件被推送时,推送时间为必填项");
        return false;
      }

      if (!this.articleInfo.description && this.articleInfo.publishFlag) {
        this.$message.error("当稿件被推送时,描述为必填项");
        return false;
      }

      if (this.articleInfo.picType && !this.articleInfo.listPicOne) {
        this.$message.error("当稿件非无图类型时,首页图片为必填项");
        return false;
      }

      let isPcBanner = this.$refs.articleList.getIsPcBanner();
      if (isPcBanner && !this.articleInfo.contentImgPath) {
        this.$message.error(
          "当稿签设置为pc网站banner时,网站首页banner为必填项"
        );
        return false;
      }

      if (this.needMobBanner && !this.articleInfo.titleImgPath) {
        this.$message.error(
          "当稿签有栏目选择了设置banner时,客户端banner为必填项"
        );
        return false;
      }

      return true;
    },

    getFormatArticleInfo(articleStatus) {
      let formattedInfo = this.$utils.gadgets.deepClone(this.articleInfo);
      if (this.articleInfo.publishDate) {
        formattedInfo.publishDate = +new Date(this.articleInfo.publishDate);
      }
      if (this.articleInfo.pushTime) {
        formattedInfo.pushTime = +new Date(this.articleInfo.pushTime);
      }
      formattedInfo.articleList = formattedInfo.articleList.map((d) => {
        d.channelId = d.channelId || d.id;
        delete d.id;
        return d;
      });
      formattedInfo.channelAllId = formattedInfo.articleList
        .map((v) => v.channelId || v.id)
        .toString();
      formattedInfo.reporter = formattedInfo.reporters
        .map((d) => d.name)
        .toString();
      formattedInfo.reporterId = formattedInfo.reporters
        .map((d) => d.id)
        .toString();

      if (formattedInfo.type === "adv") {
        delete formattedInfo.author;
        delete formattedInfo.authorId;
        delete formattedInfo.reporter;
        delete formattedInfo.reporterId;
        delete formattedInfo.proofread;
        delete formattedInfo.proofreadId;
        delete formattedInfo.publishUserName;
        delete formattedInfo.publishUserId;
      }

      if (formattedInfo.type === "normal") {
        formattedInfo.source = formattedInfo.source || "新华日报财经";
        formattedInfo.sourceId = formattedInfo.sourceId || "static_xhcj_id";
      }

      formattedInfo.articleStatus = articleStatus;

      let commentConfig = this.$refs.articleList.getCommentConfig();
      formattedInfo = Object.assign(formattedInfo, commentConfig);
      let isPcBanner = this.$refs.articleList.getIsPcBanner();
      if (isPcBanner !== false) {
        formattedInfo.isPcBanner = isPcBanner;
      }
      return formattedInfo;
    },

    submit(data) {
      return !this.$route.query.id
        ? this.$ajax.news.article.addArticle(data)
        : this.$ajax.news.article.articleUpdate(data);
    },

    async save() {
      if (!this.validateAll()) return;
      let formatArticleInfo = this.getFormatArticleInfo(0);
      return this.submit(formatArticleInfo).then(async (res) => {
        if (res.code === 200) {
          this.$message.success("保存成功");
          if (!this.$route.query.id) {
            this.$router.push({
              query: { ...this.$route.query, id: res.data },
            });
          }
          await this.getArticleDetail();
        } else {
          this.$message.error(res.msg);
        }
        return res.code === 200;
      });
    },

    async saveThenClose() {
      if (!this.validateAll()) return;
      let formatArticleInfo = this.getFormatArticleInfo(0);
      this.submit(formatArticleInfo).then((res) => {
        if (res.code === 200) {
          this.$message.success("保存成功");
          this.$router.go(-1);
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    async saveAsToReview() {
      if (!this.validateAll()) return;
      let formatArticleInfo = this.getFormatArticleInfo(2);
      this.submit(formatArticleInfo).then((res) => {
        if (res.code === 200) {
          this.$message.success("状态成功更新为待审核");
          if (!this.$route.query.id) {
            this.$router.push({
              query: { ...this.$route.query, id: res.data },
            });
          }
          this.getArticleDetail();
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    async saveAsNoPass() {
      if (!this.validateAll()) return;
      let formatArticleInfo = this.getFormatArticleInfo(5);
      this.submit(formatArticleInfo).then((res) => {
        if (res.code === 200) {
          this.$message.success("状态成功更新为审核不通过");
          this.getArticleDetail();
        } else {
          this.$message.error("状态更新失败" + res.msg);
        }
      });
    },

    async saveAsPass() {
      if (!this.validateAll()) return;
      let formatArticleInfo = this.getFormatArticleInfo(3);
      this.submit(formatArticleInfo).then((res) => {
        if (res.code === 200) {
          this.$message.success("状态成功更新为审核通过");
          this.$router.go(-1);
          // this.getArticleDetail();
        } else {
          this.$message.error("状态更新失败" + res.msg);
        }
      });
    },

    async saveAsDelete() {
      if (!this.validateAll()) return;
      let formatArticleInfo = this.getFormatArticleInfo(4);
      this.submit(formatArticleInfo).then((res) => {
        if (res.code === 200) {
          this.$message.success("状态成功更新为撤稿");
          this.getArticleDetail();
        } else {
          this.$message.error("状态更新失败" + res.msg);
        }
      });
    },

    onReporterChange(reporters) {
      this.$set(this.articleInfo, "reporters", reporters);
      this.$forceUpdate();
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
        let typeToNumber = {
          normal: 1,
          grasp: 2,
          adv: 3,
          cjh: 4,
        };
        let path = `${configRes.data.websiteUrl}/newsDetail?id=${
          this.articleInfo.id
        }&type=${typeToNumber[this.articleInfo.type]}`;
        if (this.articleInfo.linkUrl) {
          path += `&linkUrl=${this.articleInfo.linkUrl}`;
        }
        this.previewUrl = path;
        this.isShowPreView = true;
      });
    },

    onCloseResource() {
      this.showResource = false;
      this.getSourceList();
    },

    onCloseResourceManage() {
      this.showManage = false;
      this.getSourceList();
    },

    showLog() {
      this.logRid = this.articleInfo.id;
      this.logArticleType = { normal: 1, grasp: 2, adv: 3, cjh: 4 }[
        this.articleInfo.type
      ];
      this.isShowLog = true;
    },

    onSelect(row) {
      // 当仅当抓取
      if (this.articleInfo.type !== "grasp") return;
      this.articleInfo.sourceId = row.id;
    },

    filerSourceOption(val) {
      this.graspSources = this._graspSources.filter(
        (s) => s.label && s.label.includes(val)
      );
    },

    async showPoster() {
      let isSaveOk = await this.save();
      if (!isSaveOk) return;
      this.posterArticle = this.$utils.gadgets.deepClone(this.articleInfo);
      this.posterArticle.articleType = { normal: 1, grasp: 2, adv: 3, cjh: 4 }[
        this.articleInfo.type
      ];
      this.isShowPoster = true;
    },

    onPosterImgClose() {
      this.isShowPoster = false;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../style/config.less";
@import "../../../style/styles";

.article-add-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .article-add-content {
    width: 100%;
    display: flex;
    flex: 1;
    overflow: hidden;

    .article-add-left-container {
      flex: 1;
      overflow: hidden;
      background: #fff;
      height: 100%;
      margin-right: @defaultPaddingY;
      padding: @defaultPaddingY 10px @defaultPaddingY @defaultPaddingX;

      .article-add-left-container-inner {
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
      }

      .base-info {
        border-left: 4px solid @defaultBlueClick;
        padding-left: 10px;
        height: 24px;
        color: @defaultTileColor;
        font-size: @middleFontSize;
        font-weight: 600;
        line-height: 20px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;

        .base-info-icon-container {
          margin-left: 20px;
          color: @defaultBlueClick;
          font-size: @smallFontSize;
          cursor: pointer;

          .base-info-icon {
            font-size: @defaultFontSize;
            border: 1px solid @defaultBlueClick;
            border-radius: 50%;
            margin-left: 8px;
            transition: transform @defaultAnimationTime;
          }

          .iconRotate {
            transform: rotate(180deg);
          }
        }
      }

      .audit-name {
        margin-left: 10px;
      }

      .upload-box {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        width: 615px;
        margin-top: 20px;
        position: relative;

        &:first-child {
          margin-top: 0;
        }

        .upload-img-container {
          width: 212px;
          .flexCenter();
          background: rgba(238, 238, 238, 1);
          margin-top: 10px;

          .empty-img {
            width: 50px;
          }

          .upload-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .three-two-img-container {
          height: calc(212px * 2 / 3);
        }

        .sixteen-nine-img-container {
          height: calc(212px * 9 / 16);
        }

        .flat-long-img-container {
          height: calc(212px * 130 / 630);

          .empty-img {
            width: 35px;
          }
        }
      }

      .repository-select {
        width: 80px;
        height: 30px;
        margin: 0 0 0 10px;
        border-radius: 6px;
        border: 1px solid @defaultBlueClick;
        .flexCenter();
        color: @defaultBlueClick;
        cursor: pointer;
      }

      .upload-tips {
        font-size: 14px;
        color: #d38416;
      }

      .aspect-ratio {
        width: 200px;
        color: rgba(153, 153, 153, 1);
        margin-left: 24px;
      }

      .clear {
        position: absolute;
        bottom: -8px;
        left: 240px;
        color: @topNavBarBgColor;
        cursor: pointer;
      }

      .resource {
        display: flex;
        justify-content: space-around;
        color: #409eff;
        cursor: pointer;
        font-size: 12px;
        position: relative;
      }
    }
  }

  .bts-row {
    flex-shrink: 0;

    .bts-row-one {
      margin-top: 5px;
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

<style lang="less">
@media (max-width: 1400px) {
  .article-add-container {
    .el-form-item__label {
      font-size: 12px;
    }

    .el-form-item {
      margin-bottom: 6px;
    }

    .el-radio__label {
      font-size: 12px;
    }

    .el-button--small:not(.el-button--text) {
      padding: 0 8px;
      height: 25px;
    }
  }
}
</style>