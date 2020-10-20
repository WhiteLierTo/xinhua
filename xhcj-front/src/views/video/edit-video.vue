<template>
  <div class="contain csdkj">
    <div class="flexbox">
      <div class="info">
        <div class="info-inner">
          <div class="base-info">基本信息</div>
          <div class="sssssaa">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
              <el-form-item label="稿件名:" prop="title">
                <el-input v-model="form.title" placeholder="请输入稿件名"></el-input>
                <el-button type="primary" size="mini" class="audit-name" @click="auditName">稿件名校验</el-button>
              </el-form-item>

              <el-form-item label="关键词:">
                <el-input v-model="form.tags" placeholder="请输入稿件名"></el-input>
              </el-form-item>
              <el-form-item
                label="摘要:"
                :prop="isRequired?'description':''"
                :isRequired="isRequired"
              >
                <el-input type="textarea" v-model="form.description" :rows="6" placeholder="请输入摘要"></el-input>
              </el-form-item>
              <el-form-item label="责任编辑:">
                <el-input
                  v-model="form.editorUserName"
                  style="width:385px;margin-right:20px;float: left;"
                  disabled
                ></el-input>
                <personSelector
                  :onSelect="onSelecteEditor"
                  userDataResource="/system/user/list"
                  style="float: left"
                />
              </el-form-item>
              <el-form-item label="记者:">
                <addReporter :reporters="reporters" @change="onReporterChange" />
              </el-form-item>
              <el-form-item label="审校:">
                <el-input
                  v-model="form.proofreadUserName"
                  style="width:385px;margin-right:20px;float: left;"
                  disabled
                ></el-input>
                <personSelector
                  :onSelect="onSelecteAudit"
                  userDataResource="/system/user/list"
                  style="float: left"
                />
              </el-form-item>

              <div class="base-info">图片信息</div>
              <el-form-item label="首页呈现方式:">
                <el-radio-group v-model="form.picType" @change="onPicTypeChange">
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="2">大图</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="首页图片上传:" prop="preImgPath">
                <div class="upload-box" v-if="form.picType===1" key="1">
                  <picCutting
                    proportion="3:2"
                    class="pic-cutting"
                    uploadPath="/system/theme/upload"
                    v-model="form.preImgPath"
                    :max-size="1500000"
                  ></picCutting>
                  <span class="repository-select" @click="selectpreImgPath()">资源库选择</span>
                  <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>
                  <div class="no-pic-cover-left no-pic-cover-left-32">
                    <img class="empty-img" src="../../assets/nopic.png" v-if="!form.preImgPath" alt />
                    <img class="nopic-img" :src="form.preImgPath" alt v-else />
                  </div>
                  <span class="aspect-ratio">(3:2)</span>
                  <span class="clear" @click="clearpreImgPath()">清除</span>
                </div>

                <div class="upload-box" v-else key="2">
                  <picCutting
                    proportion="16:9"
                    class="pic-cutting"
                    uploadPath="/system/theme/upload"
                    v-model="form.preImgPath"
                    :max-size="1500000"
                  ></picCutting>
                  <span class="repository-select" @click="selectpreImgPath()">资源库选择</span>
                  <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>
                  <div class="no-pic-cover-right">
                    <img class="empty-img" src="../../assets/nopic.png" v-if="!form.preImgPath" alt />
                    <img class="nopic-img" :src="form.preImgPath" alt v-else />
                  </div>
                  <span class="aspect-ratio">(16:9)</span>
                  <span class="clear" @click="clearpreImgPath()">清除</span>
                </div>
              </el-form-item>
              <el-form-item label="客户端banner:" :prop="bannerRequired?'bannerUrl':''">
                <div class="upload-box">
                  <picCutting
                    proportion="16:9"
                    class="pic-cutting"
                    uploadPath="/system/theme/upload"
                    v-model="form.bannerUrl"
                    :max-size="1500000"
                  ></picCutting>
                  <span class="repository-select" @click="selectBannerUrl()">资源库选择</span>
                  <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>
                  <div class="no-pic-cover-left">
                    <img class="empty-img" src="../../assets/nopic.png" v-if="!form.bannerUrl" alt />
                    <img class="nopic-img" :src="form.bannerUrl" alt v-else />
                  </div>
                  <span class="aspect-ratio">(16:9)</span>
                </div>
                <span class="clear" @click="clearBannerUrl()">清除</span>
              </el-form-item>
              <el-form-item label="视频:" prop="videoPath">
                <videoUpload v-model="form.videoPath" ref="videoContainer" />
              </el-form-item>

              <div class="base-info">其他</div>
              <el-form-item label="是否推送:">
                <el-radio-group v-model="form.isPublic">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="推送时间:" required v-if="form.isPublic">
                <el-date-picker
                  v-model="form.pushTime"
                  type="datetime"
                  placeholder="选择推送时间"
                  style="width:80%"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="发布时间:">
                <el-date-picker
                  v-model="form.publicTime"
                  type="datetime"
                  placeholder="选择发布时间"
                  style="width:80%"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="发布用户:">
                <el-input
                  v-model="form.publicUserName"
                  style="width:385px;margin-right:20px;float: left;"
                  disabled
                ></el-input>
                <personSelector
                  :onSelect="onSelectePublic"
                  userDataResource="/system/user/list"
                  style="float: left"
                />
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <manuscriptConfig v-model="articleList" :hides="hides" ref="articleList" />
    </div>
    <el-dialog title="资源库选择" :close-on-click-modal="false" :visible.sync="showDialog" width="80%">
      <div :style="{height:height+'px'}">
        <resourcePool isSelectMode="true" :onSelect="callBack" type="image" />
      </div>
    </el-dialog>
    <div v-if="!id" class="operation-container">
      <div class="operation">
        <el-button type="primary" v-allow="permissionSave" @click="saveInfo()">保存</el-button>
        <el-button type="success" v-allow="permissionSave" @click="saveAndClose()">保存并关闭</el-button>
        <el-button type="success" v-allow="permissionSave" @click="auditing()">保存为待审核</el-button>
        <el-button type="success" v-allow="permissionPass" @click="passed">审核通过并关闭</el-button>
        <el-button type="primary" v-allow="permissionSave" plain @click="saveAndPreview">预览</el-button>
        <el-button
          type="primary"
          v-allow="'news:articleList:genPoster'"
          plain
          @click="showPoster"
        >生成海报</el-button>
      </div>
    </div>
    <div v-else class="operation-container">
      <div class="operation1">
        <el-button type="primary" v-allow="permissionSave" @click="saveInfo()">保存</el-button>
        <el-button type="success" v-allow="permissionSave" @click="saveAndClose()">保存并关闭</el-button>
        <el-button
          type="success"
          v-allow="permissionSave"
          @click="auditing()"
          v-show="form.articleStatus === 0 || form.articleStatus === 5||form.articleStatus === 4"
        >保存为待审核</el-button>
        <el-button type="success" v-allow="permissionPass" @click="passed">审核通过并关闭</el-button>
        <el-button
          type="success"
          v-allow="permissionNoPass"
          @click="noAudit()"
          v-show="form.articleStatus===2"
        >审核不通过</el-button>
        <el-button
          type="primary"
          v-allow="permissionCancel"
          plain
          @click="withdraw"
          v-show="form.articleStatus===3"
        >撤稿</el-button>
        <el-button type="primary" plain @click="showLog">日志明细</el-button>
        <el-button type="primary" v-allow="permissionSave" plain @click="saveAndPreview">预览</el-button>
        <el-button
          type="primary"
          v-allow="'news:articleList:genPoster'"
          plain
          @click="showPoster"
        >生成海报</el-button>
      </div>
    </div>
    <preview v-if="isShowPreView" :url="previewUrl" :onClose="onPreviewClose"></preview>

    <dialogTemplate v-if="isShowLog" :onClose="()=>isShowLog = false" width="900" title="操作明细">
      <div slot="foot"></div>
      <logDetails :rid="logRid" :articleType="5" />
    </dialogTemplate>

    <posterImg v-if="isShowPoster" :onClose="onPosterImgClose" :article="posterArticle" />
  </div>
</template>
<script>
import videoUpload from "./uploadVideo";
import resourcePool from "../news/resource/resource";
import addReporter from "../news/article/add-reporter";
import preview from "../../components/preview/preview";
import axios from "axios";
import logDetails from "../news/manuscript/log-details";
import posterImg from "../news/manuscript/poster";

export default {
  name: "editVideo",
  components: {
    resourcePool,
    videoUpload,
    addReporter,
    preview,
    logDetails,
    posterImg,
  },
  inject: ["modifyLastBreadcrumbLabel"],
  data() {
    return {
      height: window.innerHeight * 0.8,
      form: {
        id: "",
        articleStatus: -1,
        title: "",
        tags: "",
        description: "",
        editorUserName: "",
        editorUserId: "",
        authorUserName: "",
        authorUserId: "",
        proofreadUserName: "",
        proofreadUserId: "",
        picType: 1,
        preImgPath: "",
        bannerUrl: "",
        videoPath: "",
        videoTime: "",
        isPublic: 0,
        publicTime: "",
        publicUserName: "",
        publicUserId: "",
        channelAllId: "",
        articleList: [],
        pushTime: "", // 推送时间
      },
      rules: {
        title: [{ required: true, message: "请输入稿件名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入摘要", trigger: "blur" },
        ],
        preImgPath: [
          { required: true, message: "请选择首页图片", trigger: "blur" },
        ],
        bannerUrl: [
          { required: true, message: "请选择客户端banner", trigger: "blur" },
        ],
        videoPath: [{ required: true, message: "请上传视频", trigger: "blur" }],
      },
      isRequired: false, //非必填
      id: "",
      hides: ["tag", "isPcBanner"],
      detail: {},
      uploadPath: "/system/theme/upload",
      showDialog: false,
      preImgShow: false,
      preImgId: "",
      pageImgId: "",
      bannerShow: false,
      bannerId: "",
      articleList: [],
      bannerRequired: false,
      reporters: [],
      reporter: "",
      reporterId: "",
      videoInfo: {},
      preImgPathStorage: "",

      isShowPreView: false,
      previewUrl: "",

      isShowLog: false,
      logRid: "",

      isShowPoster: false,
      posterArticle: {},
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    const userDetail = this.$store.state.userDetail;
    this.form.publicUserName = userDetail.name;
    this.form.publicUserId = userDetail.id;
    if (this.id) {
      this.getDetail();
      this.modifyLastBreadcrumbLabel("视频编辑页");
    } else {
      this.form.articleStatus = 0;
    }
  },
  computed: {
    permissionSave() {
      return "news:articleList:add:video:save";
    },

    permissionCancel() {
      return "news:articleList:add:video:cancel";
    },

    permissionPass() {
      return "news:articleList:add:video:audit:yes";
    },

    permissionNoPass() {
      return "news:articleList:add:video:audit:no";
    },
  },
  watch: {
    "form.isPublic"(newVal) {
      this.isRequired = newVal;
    },
    "form.picType"(newVal) {
      this.isRequired = !newVal;
    },
    articleList(newVal) {
      let isBannerObj = this.getWordCnt(newVal.map((v) => v.isBanner));
      this.bannerRequired = isBannerObj["1"] >= 1;
    },
    deep: true,
  },
  methods: {
    getDetail() {
      return this.$ajax.video.videoDetail(this.id).then((res) => {
        this.form = res.data;
        this.$refs.articleList.init(this.form.articleList, {
          isCommentAudit: this.form.isCommentAudit,
          isComment: this.form.isComment,
          isPraise: this.form.isPraise,
        });
        if (this.form.authorUserName && this.form.authorUserId) {
          this.reporter = this.form.authorUserName.split(",");
          this.reporterId = this.form.authorUserId.split(",");
          this.reporters = this.reporterId.map((id, i) => ({
            id,
            name: this.reporter[i],
          }));
        }
      });
    },

    // 元素个数 obj
    getWordCnt(arr) {
      return arr.reduce(function (prev, next) {
        prev[next] = prev[next] + 1 || 1;
        return prev;
      }, {});
    },

    //   资源库选择
    selectpreImgPath() {
      this.showDialog = true;
      this.preImgShow = true;
    },

    selectBannerUrl() {
      this.showDialog = true;
      this.bannerShow = true;
    },

    //资源库选择目标
    callBack(val) {
      this.choose = true; //判断是否从资源库选择
      this.showDialog = false;
      if (this.preImgShow) {
        this.preImgId = val[0].id;
        this.form.preImgPath = val[0].url;
        this.preImgShow = false;
      } else if (this.bannerShow) {
        this.bannerId = val[0].id;
        this.form.bannerUrl = val[0].url;
        this.bannerShow = false;
      }
    },

    clearpreImgPath() {
      this.preImgId = "";
      this.form.preImgPath = "";
    },
    clearBannerUrl() {
      this.bannerId = "";
      this.form.bannerUrl = "";
    },

    //选择人员
    onSelecteEditor(row) {
      // 选择了用户
      this.form.editorUserId = row.id;
      this.form.editorUserName = row.name;
    },

    onSelecteAudit(row) {
      this.form.proofreadUserId = row.id;
      this.form.proofreadUserName = row.name;
    },
    onSelectePublic(row) {
      this.form.publicUserId = row.id;
      this.form.publicUserName = row.name;
    },

    auditName() {
      let data = {
        id: this.id,
        title: this.form.title,
      };
      this.$ajax.video.checkTitle(data).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    // 操作
    saveInfo() {
      this.saveHandle(false, this.form.articleStatus);
    },
    saveAndClose() {
      this.saveHandle(true, this.form.articleStatus);
    },

    auditing() {
      this.saveHandle(false, 2);
    },
    passed() {
      this.saveHandle(true, 3);
    },
    withdraw() {
      this.saveHandle(false, 4);
    },
    noAudit() {
      this.saveHandle(false, 5);
    },
    //保存
    saveHandle(isClose, target, afterGetNewDetail) {
      let form = JSON.parse(JSON.stringify(this.form));
      form.articleStatus = target;
      if (this.choose) {
        form.preImgPath = this.preImgId || form.preImgPath;
        form.bannerUrl = this.bannerId || form.bannerUrl;
      }

      if (form.isPublic === 1 && !form.description) {
        this.$message.warning("请填写摘要！");
        return;
      }
      if (!form.bannerUrl && !this.form.bannerUrl && this.bannerRequired) {
        this.$message.warning("请上传客户端banner图！");
        return;
      }
      if (form.isPublic && !form.pushTime) {
        this.$message.warning("请填写推送时间！");
        return;
      }
      if (!form.videoPath) {
        this.$message.warning("请上传视频！");
        return;
      }

      let duration = this.$refs.videoContainer.getVideoDuration();
      if (!duration) {
        this.$message.error("请等待视频加载");
        return false;
      } else {
        form.videoTime = this.$utils.format.sToTimeStr(duration);
      }

      if (this.reporters.length !== 0) {
        form.authorUserName = this.reporters.map((v) => v.name).toString();
        form.authorUserId = this.reporters.map((v) => v.id).toString();
      }

      if (form.publicTime) form.publicTime = +new Date(form.publicTime);
      if (form.pushTime) form.pushTime = +new Date(form.pushTime);

      let artList = [];
      if (this.id) {
        artList = this.articleList.map((v) => {
          return {
            channelId: v.channelId || v.id,
            isBanner: v.isBanner,
            isTop: v.isTop,
            isCommentAudit: v.isCommentAudit,
            isComment: v.isComment,
            isPraise: v.isPraise,
            positionNum: v.positionNum,
          };
        });
        form.channelAllId = this.articleList
          .map((v) => v.channelId || v.id)
          .toString();
      } else {
        artList = this.articleList.map((v) => {
          return {
            channelId: v.id,
            isBanner: v.isBanner,
            isTop: v.isTop,
            isCommentAudit: v.isCommentAudit,
            isComment: v.isComment,
            isPraise: v.isPraise,
            positionNum: v.positionNum,
          };
        });
        form.channelAllId = this.articleList.map((v) => v.id).toString();
      }

      form.articleList = [...artList];

      // 加入评论属性
      let commentConfig = {};
      try {
        commentConfig = this.$refs.articleList.getCommentConfig();
      } catch (e) {
        commentConfig = {};
      }

      form = {
        ...form,
        ...commentConfig,
      };

      this.$refs.form.validate(async (valid) => {
        if (valid) {
          //资源库选择
          if (!this.id) {
            this.$ajax.video.addVideo(form).then((res) => {
              if (res.code === 200) {
                this.id = res.data;
                this.form.id = res.data;
                this.$message.success("保存成功");
                if (isClose) {
                  this.$router.go("-1");
                } else {
                  this.getDetail().then(() => {
                    afterGetNewDetail && afterGetNewDetail();
                  });
                }
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.$ajax.video.updateVideo(form).then((res) => {
              if (res.code === 200) {
                this.$message.success("保存成功");
                if (isClose) {
                  this.$router.go("-1");
                } else {
                  this.getDetail().then(() => {
                    afterGetNewDetail && afterGetNewDetail();
                  });
                }
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        } else {
          this.$message.warning("请填写必填项！");
        }
      });
    },

    onReporterChange(reporters) {
      this.reporters = reporters;
      this.$forceUpdate();
    },

    onPicTypeChange() {
      [this.preImgPathStorage, this.form.preImgPath] = [
        this.form.preImgPath,
        this.preImgPathStorage,
      ];
    },

    saveAndPreview() {
      this.saveHandle(false, this.form.articleStatus, async () => {
        let configRes = await axios.get("./config.json");
        if (configRes.status !== 200) return;
        this.$nextTick(() => {
          this.previewUrl = `${configRes.data.websiteUrl}/newsDetail?id=${this.id}&type=5`;
          this.isShowPreView = true;
        });
      });
    },

    showLog() {
      this.logRid = this.id;
      this.isShowLog = true;
    },

    async showPoster() {
      this.saveHandle(false, this.form.articleStatus, () => {
        this.posterArticle = this.$utils.gadgets.deepClone(this.form);
        this.posterArticle.articleType = 5;
        this.isShowPoster = true;
      });
    },

    onPosterImgClose() {
      this.isShowPoster = false;
    },

    onPreviewClose() {
      this.isShowPreView = false;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../style/config.less";
@import "../../style/styles";

.csdkj {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .flexbox {
    display: flex;
    flex: 1;
    overflow: hidden;

    .info {
      flex: 1;
      overflow: hidden;
      background: #fff;
      height: 100%;
      margin-right: @defaultPaddingY;
      padding: @defaultPaddingY 10px @defaultPaddingY @defaultPaddingX;

      .info-inner {
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
        height: 20px;
        color: @defaultTileColor;
        font-size: @middleFontSize;
        font-weight: 600;
        line-height: 20px;
        margin-bottom: 20px;
      }

      .audit-name {
        position: absolute;
        left: 492px;
        top: 2px;
      }

      .upload-box {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        width: 615px;
      }

      .repository-select {
        width: 80px;
        height: 30px;
        margin: 5px 0 0 10px;
        border-radius: 6px;
        border: 1px solid @defaultBlueClick;
        .flexCenter();
        color: @defaultBlueClick;
        cursor: pointer;
      }

      .pic-cutting {
        margin-top: 5px;
      }

      .upload-tips {
        font-size: 14px;
        color: #d38416;
      }

      .no-pic-cover-left,
      .no-pic-cover-right,
      .no-pic-detail {
        width: 212px;
        height: 119px;
        line-height: 150px;
        text-align: center;
        background: rgba(238, 238, 238, 1);
        margin: 10px 0;

        .empty-img {
          width: 50px;
        }

        .nopic-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .no-pic-cover-left-32 {
        height: calc(212px * 2 / 3);
      }

      .clear,
      .clear1 {
        position: absolute;
        bottom: 10px;
        left: 240px;
        color: @topNavBarBgColor;
        cursor: pointer;
      }

      .aspect-ratio {
        width: 80px;
        text-align: center;
        color: rgba(153, 153, 153, 1);
      }

      .video-info {
        position: relative;
      }

      .ratio,
      .clear-video {
        position: absolute;
        left: 357px;
        top: 37px;
        color: rgba(153, 153, 153, 1);
      }

      .clear-video {
        left: 362px;
        top: 145px;
        color: @topNavBarBgColor;
        cursor: pointer;
      }
    }

    .sign {
      flex: 1;
      height: 752px;
      margin-left: 15px;
      background: #fff;
    }

    .selector {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .operation-container {
    flex-shrink: 0;
    margin-top: 10px;

    .operation,
    .operation1 {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 0 auto;
    }
  }
}
</style>
<style lang="less">
@import "../../style/config.less";

.sssssaa {
  .el-form {
    width: 700px;
  }

  .el-form-item__label {
    color: @leftNavBarBgColor;
  }

  .el-form-item__content,
  .el-select {
    width: 479px;
  }
}

.csdkj {
  .el-dialog {
    margin-top: 2vh !important;
  }

  .operation {
    .el-button {
      border: none;
    }

    .el-button:nth-child(2) {
      background: #62a8bc;
    }

    .el-button:nth-child(3) {
      background: #5e7eae;
    }
  }

  .operation1 {
    .el-button {
      border: none;
    }

    .el-button:nth-child(2) {
      background: #62a8bc;
    }

    .el-button:nth-child(3) {
      background: #5e7eae;
    }

    .el-button:nth-child(4) {
      background: #ca7a53;
    }

    .el-button:nth-child(5) {
      background: #859872;
    }
  }
}
</style>
