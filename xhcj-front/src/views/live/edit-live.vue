<template>
  <div class="contain sssssaa">
    <div class="flexbox">
      <div class="info">
        <div class="info-inner">
          <div class="base-info">基本信息</div>
          <el-form ref="liveForm" :model="liveForm" :rules="rules" label-width="100px">
            <el-form-item label="标题名:" prop="title">
              <el-input v-model="liveForm.title" placeholder="请输入稿件名称"></el-input>
              <el-button
                type="primary"
                size="mini"
                style="margin-left: 20px;"
                @click="checkName"
              >直播名校验</el-button>
            </el-form-item>
            <el-form-item label="app预览图:" prop="preImgPath">
              <div class="upload-box">
                <picCutting
                  proportion="16:9"
                  class="pic-cutting"
                  uploadPath="/system/theme/upload"
                  v-model="liveForm.preImgPath"
                  :max-size="1500000"
                ></picCutting>
                <span class="repository-select" @click="selectPreImgPath()">资源库选择</span>
                <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>
                <div class="no-pic-cover-left">
                  <img
                    class="empty-img"
                    src="../../assets/nopic.png"
                    v-if="!liveForm.preImgPath"
                    alt
                  />
                  <img class="nopic-img" :src="liveForm.preImgPath" alt v-else />
                </div>
                <span class="aspect-ratio">(16:9)</span>
              </div>
              <span class="clear" @click="clearPreImgPath()">清除</span>
            </el-form-item>
            <el-form-item label="网站预览图:" prop="pageImgPath">
              <div class="upload-box">
                <picCutting
                  proportion="16:9"
                  class="pic-cutting"
                  uploadPath="/system/theme/upload"
                  v-model="liveForm.pageImgPath"
                  :max-size="1500000"
                ></picCutting>
                <span class="repository-select" @click="selectPageImgPath()">资源库选择</span>
                <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>
                <div class="no-pic-cover-left">
                  <img
                    class="empty-img"
                    src="../../assets/nopic.png"
                    v-if="!liveForm.pageImgPath"
                    alt
                  />
                  <img class="nopic-img" :src="liveForm.pageImgPath" alt v-else />
                </div>
                <span class="aspect-ratio">(16:9)</span>
              </div>
              <span class="clear" @click="clearPageImgPath()">清除</span>
            </el-form-item>
            <el-form-item label="直播状态:" prop="state">
              <el-select v-model="liveForm.state" placeholder="请选择直播状态">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="直播类型:" prop="liveType">
              <el-select v-model="liveForm.liveType" placeholder="请选择直播类型">
                <el-option
                  v-for="item in liveTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="直播开始时间:" prop="liveDateStart">
              <el-date-picker
                v-model="liveForm.liveDateStart"
                type="datetime"
                placeholder="选择直播开始时间"
                style="width:100%"
              ></el-date-picker>
            </el-form-item>

            <div class="base-info">录像信息</div>
            <el-form-item label="录像地址:" prop="videoPath" v-if="liveForm.liveType!==0">
              <el-input
                type="textarea"
                v-model="liveForm.videoPath"
                :rows="6"
                placeholder="注意：多个视频之间通过英文逗号分隔。若【视频回放】不录入
    录像地址将不在APP中显示。请提供mp4格式可以访问的url地址"
              ></el-input>
            </el-form-item>
            <el-form-item label="直播介绍:" prop="description">
              <el-input
                type="textarea"
                v-model="liveForm.description"
                :rows="6"
                placeholder="请输入直播介绍"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <manuscriptConfig v-model="articleList" :hides="hides" ref="articleList" />
    </div>
    <div v-if="!id" class="operation-container">
      <div class="operation">
        <el-button type="primary" v-allow="'live:info:save'" @click="saveHandle">保存</el-button>
        <el-button type="success" v-allow="'live:info:save'" @click="saveAndClose">保存并关闭</el-button>
        <el-button type="success" v-allow="'live:info:save'" @click="audit">保存为待审核</el-button>
        <el-button type="success" v-allow="'live:audit:yes'" @click="pass">审核通过并关闭</el-button>
        <el-button type="primary" v-allow="'live:info:save'" plain @click="saveAndPreview">预览</el-button>
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
        <el-button type="primary" v-allow="'live:info:save'" @click="saveHandle">保存</el-button>
        <el-button type="success" v-allow="'live:info:save'" @click="saveAndClose">保存并关闭</el-button>
        <el-button
          type="success"
          v-allow="'live:info:save'"
          @click="audit"
          v-show="liveForm.articleStatus===0|| liveForm.articleStatus===5||liveForm.articleStatus===4"
        >保存为待审核</el-button>
        <el-button type="success" v-allow="'live:audit:yes'" @click="pass">审核通过并关闭</el-button>
        <el-button
          type="success"
          v-allow="'live:audit:no'"
          @click="close"
          v-show="liveForm.articleStatus===2"
        >审核不通过</el-button>
        <el-button
          type="primary"
          v-allow="'live:info:cancel'"
          plain
          @click="cancel"
          v-show="liveForm.articleStatus===3"
        >撤稿</el-button>
        <el-button type="primary" plain @click="showLog">日志明细</el-button>
        <el-button type="primary" v-allow="'live:info:save'" plain @click="saveAndPreview">预览</el-button>
        <el-button
          type="primary"
          v-allow="'news:articleList:genPoster'"
          plain
          @click="showPoster"
        >生成海报</el-button>
      </div>
    </div>
    <el-dialog
      title="资源库选择"
      :type="type"
      :close-on-click-modal="false"
      :visible.sync="showDialog"
      width="80%"
    >
      <div :style="{height:height+'px'}">
        <resourcePool isSelectMode="true" :onSelect="callBack" type="image" />
      </div>
    </el-dialog>
    <preview v-if="isShowPreView" :url="previewUrl" :onClose="onPreviewClose"></preview>

    <dialogTemplate v-if="isShowLog" :onClose="()=>isShowLog = false" width="900" title="操作明细">
      <div slot="foot"></div>
      <logDetails :rid="logRid" :articleType="6" />
    </dialogTemplate>
    <posterImg v-if="isShowPoster" :onClose="onPosterImgClose" :article="posterArticle" />
  </div>
</template>
<script>
// TODO 重构!!!!!
import resourcePool from "../news/resource/resource";
import preview from "../../components/preview/preview";
import axios from "axios";
import logDetails from "../news/manuscript/log-details";
import posterImg from "../news/manuscript/poster";

export default {
  name: "editLive",
  components: {
    resourcePool,
    preview,
    logDetails,
    posterImg,
  },
  data() {
    return {
      liveForm: {
        id: "",
        title: "",
        preImgPath: "",
        pageImgPath: "",
        liveType: 1,
        compereUserName: "",
        anchorUserName: "",
        videoPath: "",
        description: "",
        isPublic: 1,
        type: "",
        state: "",
        publicUserId: "",
        publicTime: "",
        channelAllId: "",
        articleStatus: 0,
        liveDateStart: "",
        liveDateEnd: "",
        sortId: 0,
        compereUserId: "",
        anchorUserId: "",
        livingFlag: "",
        articleList: [],
      },
      typeOptions: [
        {
          value: "l1_finish",
          label: "视频回放",
        },
        {
          value: "l2_coming",
          label: "即将到来",
        },
        {
          value: "l3_living",
          label: "正在直播",
        },
      ],
      liveTypeOptions: [
        //   {
        //     value: 0,
        //     label: "自主直播"
        //   },
        {
          value: 1,
          label: "第三方直播流",
        },
      ],
      rules: {
        title: [{ required: true, message: "请输入稿件名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入直播介绍", trigger: "blur" },
        ],
        preImgPath: [
          { required: true, message: "请输入app预览图", trigger: "change" },
        ],
      },
      articleList: [],
      id: "",
      hides: ["tag", "isPcBanner"],
      compereUserOptions: [],
      height: window.innerHeight * 0.8,
      showDialog: false,
      preImgPathShow: false,
      pageImgPathShow: false,
      choose: false,
      preImgPathId: "",
      pageImgPathId: "",
      type: "select",
      addId: "",

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
    if (this.id) {
      this.getDetail();
    }
    this.getUser();
  },
  computed: {},
  methods: {
    getUser() {
      let data = {};
      this.$ajax.live.getUserList(data).then((res) => {
        this.compereUserOptions = res.rows;
      });
    },
    //资源库选择(app)
    selectPreImgPath() {
      this.showDialog = true;
      this.preImgPathShow = true;
    },
    //网站预览图
    selectPageImgPath() {
      this.showDialog = true;
      this.pageImgPathShow = true;
    },
    //资源库选择
    callBack(val) {
      if (!this.$utils.validate.validImg(val[0].url)) {
        this.$message.error("请选择图片格式");
        return;
      }

      this.choose = true; //判断是否从资源库选择
      this.showDialog = false;
      if (this.preImgPathShow) {
        this.preImgPathId = val[0].id;
        this.liveForm.preImgPath = val[0].url;
        this.preImgPathShow = false;
      } else if (this.pageImgPathShow) {
        this.pageImgPathId = val[0].id;
        this.liveForm.pageImgPath = val[0].url;
      }
    },

    getDetail() {
      return this.$ajax.live.detailLive(this.id).then((res) => {
        this.liveForm = res.data;
        this.$refs.articleList.init(this.liveForm.articleList, {
          isCommentAudit: this.liveForm.isCommentAudit,
          isComment: this.liveForm.isComment,
          isPraise: this.liveForm.isPraise,
        });
      });
    },

    saveHandle() {
      this.submitHandle("", this.liveForm.articleStatus);
    },

    saveAndClose() {
      this.submitHandle("close", this.liveForm.articleStatus);
    },

    close() {
      this.submitHandle("", 5);
    },

    audit() {
      this.submitHandle("", 2);
    },

    pass() {
      this.submitHandle("close", 3);
    },

    cancel() {
      this.submitHandle("", 4);
    },

    submitHandle(close, target, afterGetNewDetail) {
      let liveFormCopy = JSON.parse(JSON.stringify(this.liveForm));
      liveFormCopy.articleStatus = target;
      let artList = [];

      if (this.id) {
        artList = this.$utils.gadgets.deepClone(this.articleList);
        liveFormCopy.channelAllId = this.articleList
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
        liveFormCopy.channelAllId = this.articleList
          .map((v) => v.id)
          .toString();
      }

      liveFormCopy.articleList = [...artList];
      liveFormCopy.liveDateStart = +new Date(liveFormCopy.liveDateStart);

      // 加入评论属性
      let commentConfig = {};
      try {
        commentConfig = this.$refs.articleList.getCommentConfig();
      } catch (e) {
        commentConfig = {};
      }

      liveFormCopy = {
        ...liveFormCopy,
        ...commentConfig,
      };

      // 资源库选择
      if (this.choose) {
        liveFormCopy.preImgPath = this.preImgPathId || liveFormCopy.preImgPath;
        liveFormCopy.pageImgPath =
          this.pageImgPathId || liveFormCopy.pageImgPath;
      }

      this.$refs.liveForm.validate(async (valid) => {
        if (valid) {
          if (!this.id) {
            this.$ajax.live.addLive(liveFormCopy).then((res) => {
              if (res.code === 200) {
                this.$message.success("保存成功");
                this.id = res.data;
                if (close === "close") {
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
            liveFormCopy.id = this.id;
            this.$ajax.live.updateLive(liveFormCopy).then((res) => {
              if (res.code === 200) {
                this.$message.success("保存成功");
                if (close === "close") {
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
        }
      });
    },

    onSelectCompere(row) {
      // 选择主持人
      this.liveForm.compereUserId = row.id;
      this.liveForm.compereUserName = row.name;
    },

    onSelectAnchor(row) {
      // 选择主持人
      this.liveForm.anchorUserId = row.id;
      this.liveForm.anchorUserName = row.name;
    },

    clearPageImgPath() {
      this.liveForm.pageImgPath = "";
    },

    clearPreImgPath() {
      this.liveForm.preImgPath = "";
    },

    onPreviewClose() {
      this.isShowPreView = false;
    },

    saveAndPreview() {
      this.submitHandle("", this.liveForm.articleStatus, async () => {
        let configRes = await axios.get("./config.json");
        if (configRes.status !== 200) return;
        this.$nextTick(() => {
          this.previewUrl = `${configRes.data.websiteUrl}/newsDetail?id=${this.id}&type=6`;
          this.isShowPreView = true;
        });
      });
    },

    checkName() {
      let data = { title: this.liveForm.title };
      if (this.liveForm.id) {
        data.id = this.liveForm.id;
      }

      this.$ajax.live.checkName(data).then((res) => {
        if (res.code === 200) {
          this.$message.success("直播名称未重复");
        } else {
          this.$message.warning("直播名重复");
        }
      });
    },

    showLog() {
      this.logRid = this.id;
      this.isShowLog = true;
    },

    async showPoster() {
      this.submitHandle(false, this.liveForm.articleStatus, () => {
        this.posterArticle = this.$utils.gadgets.deepClone(this.liveForm);
        this.posterArticle.articleType = 6;
        this.isShowPoster = true;
      });
    },

    onPosterImgClose() {
      this.isShowPoster = false;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../style/config.less";
@import "../../style/styles";

.contain {
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
    display: flex;
  }

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

  .el-button--primary.is-plain {
    background: transparent;
  }

  .el-button--primary.is-plain:hover {
    background: #409eff;
  }
}
</style>
