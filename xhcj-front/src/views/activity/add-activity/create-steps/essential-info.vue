<template>
  <div class="self-form asdasdasd">
    <div class="base-info">活动基本信息</div>
    <el-form ref="basicInfoForm" :model="addActivityForm" :rules="rules" label-width="100px" :inline="true">
      <el-form-item label="活动标题:" prop="title">
        <el-input v-model="addActivityForm.title" placeholder="请输入活动标题"
                  class="activity-name"></el-input>
        <!--style="margin-right: 20px"-->
        <!--<el-button type="primary" size="mini" @click="checkName">稿件名校验</el-button>-->
      </el-form-item>
      <el-form-item label="活动地址:" prop="address">
        <el-input v-model="addActivityForm.address" placeholder="请输入活动地址" class="activity-address"></el-input>
      </el-form-item>
      <el-form-item label="开始时间:" prop="startdate" class="left-box">
        <el-date-picker v-model="addActivityForm.startdate" type="datetime" :picker-options="startdate"
                        placeholder="请选择开始日期" class="item"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间:" prop="enddate">
        <el-date-picker v-model="addActivityForm.enddate" type="datetime" :picker-options="enddate"
                        placeholder="请选择结束日期" class="item"></el-date-picker>
      </el-form-item>
      <el-form-item label="主办方:" prop="sponsor">
        <el-input v-model="addActivityForm.sponsor" placeholder="请输入主办方" class="item"></el-input>
      </el-form-item>
      <el-form-item label="标签:">
        <el-input v-model="addActivityForm.tags" placeholder="请输入标签" class="biaoqian"></el-input>
        (使用英文“,”分开)
      </el-form-item>
      <el-form-item label="封面图:" prop="preImagePath">
        <div class="upload-box">
          <picCutting proportion="3:4" class="pic-cutting" uploadPath="/activity/upload" v-model="coverImgPath"
                      :max-size="1500000"></picCutting>
          <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>

          <div class="no-pic-cover-left">
            <img class="empty-img" src="../../../../assets/nopic.png" v-if="!coverImgPath" alt/>
            <img class="nopic-img" :src="coverImgPath" alt v-else/>
          </div>
          <span class="aspect-ratio">(3:4)</span>
        </div>
        <span class="clear" @click="clearCoverImg()">清除</span>
      </el-form-item>
      <el-form-item label="详情页头图:" prop="contentimgpath">
        <div class="upload-box">
          <picCutting class="pic-cutting" uploadPath="/activity/upload" v-model="detailImgPath"
                      :max-size="1500000"></picCutting>
          <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>
          <div class="no-pic-detail">
            <img class="empty-img" src="../../../../assets/nopic.png" v-if="!detailImgPath" alt/>
            <img class="nopic-img" :src="detailImgPath" alt/>
          </div>
          <span class="aspect-ratio">(16:9)</span>
        </div>
        <span class="clear1" @click="clearDetailImg()">清除</span>
      </el-form-item>
      <el-form-item label="文章内容:" class="article-con">
        <!--<vue-ueditor-wrap v-model="addActivityForm.content" :config="myConfig"></vue-ueditor-wrap>-->
        <xhUeditor v-model="addActivityForm.content"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // TODO 页面结构不对 重构
  import VueUeditorWrap from "vue-ueditor-wrap";

  export default {
    name: "autoform",
    props: {
      aid: {
        type: String,
      }
    },

    components: {
      VueUeditorWrap
    },
    data() {
      return {
        myConfig: {
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 初始容器高度
          initialFrameHeight: 350,
          // 初始容器宽度
          initialFrameWidth: 1024,
          // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
          // serverUrl: "http://35.201.165.105:8000/controller.php",
          // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
          UEDITOR_HOME_URL: "/ueditor/"
        },
        addActivityForm: {
          title: "",
          address: "",
          startdate: "",
          enddate: "",
          sponsor: "",
          tags: "",
          content: "",
          preImagePath: "",
          contentimgpath: "",
          finishedStep: 1
        },
        activityId: "",
        activityDetail: {}, //     活动详情
        // 开始时间
        startdate: {
          disabledDate: this.checkstartdate
        },
        // 结束时间
        enddate: {
          disabledDate: this.checkenddate
        },
        rules: {
          title: [
            {required: true, message: "请输入活动标题", trigger: "blur"},
            {min: 0, max: 100, message: "不超过100字", trigger: "blur"}
          ],
          address: [
            {required: true, message: "请输入活动地址", trigger: "blur"},
            {min: 0, max: 100, message: "不超过100字", trigger: "blur"}
          ],
          startdate: [
            {required: true, message: "请选择开始日期", trigger: "blur"}
          ],
          enddate: [
            {required: true, message: "请选择结束日期", trigger: "blur"}
          ],
          sponsor: [{required: true, message: "请输入主办方", trigger: "blur"}],
          preImagePath: [{required: true, message: "请上传封面图", trigger: "blur"}],
          contentimgpath: [{required: true, message: "请上传详情页头图", trigger: "blur"}],
        },
        validFlag: "",
        fileList: [],
        coverImgPath: "", // 封面图
        detailImgPath: "" // 详情图
      };
    },
    mounted() {
      if (this.$route.query.id && this.$route.query.type === 'modify') {
        let activityId = this.$route.query.id;
        this.getactivityDetail(activityId);
      }
      if (this.$route.query.type === 'create' && this.aid) {
        this.getactivityDetail(this.aid);
      }
    },
    watch: {
      activityDetail(newVal) {
        this.addActivityForm = newVal;
        if (this.addActivityForm.startdate) {
          this.addActivityForm.startdate = this.$utils.format.timeStampToStandardStr(
              this.addActivityForm.startdate
          );
        }
        if (this.addActivityForm.enddate) {
          this.addActivityForm.enddate = this.$utils.format.timeStampToStandardStr(
              this.addActivityForm.enddate
          );
        }
      },
      deep: true
    },
    methods: {
      checkstartdate(time) {
        if (this.addActivityForm.enddate) {
          return (
              // time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() >= new Date(this.addActivityForm.enddate).getTime()
          )
              ;
        } else {
          // 不能小于于当前日期  - 8.64e7则表示包当天
          // return time.getTime() < Date.now() - 8.64e7;
        }
      },
      checkenddate(time) {
        if (this.addActivityForm.startdate) {
          return (
              // time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() <= new Date(this.addActivityForm.startdate).getTime() - 8.64e7
          );
        } else {
          // return time.getTime() < Date.now();
        }
      },

      getactivityDetail(data) {
        this.$ajax.activity.getDetailSync(data).then(res => {
          this.activityDetail = res;
          this.coverImgPath = res.preImagePath
          this.detailImgPath = res.contentimgpath
        });
      },

      // 表单校验
      validForm() {
        this.addActivityForm.preImagePath = this.coverImgPath;
        this.addActivityForm.contentimgpath = this.detailImgPath;
        this.$refs.basicInfoForm.validate(valid => {
          if (valid) {
            this.validFlag = true;
          } else {
            this.$message({
              message: "请输入必填项",
              type: "warning"
            });
          }
        });
      },
      //q清除图片
      clearCoverImg() {
        this.coverImgPath = ""
      },
      clearDetailImg() {
        this.detailImgPath = ""
      },

      checkName() {
        alert("TODO")
      }
    }
  };
</script>
<style lang="less" scoped>
  @import "../../../../style/config.less";

  .self-form {
    .base-info {
      font-size: 16px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      margin-bottom: 20px;
    }

    .base-info:before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 20px;
      background-color: @topNavBarBgColor;
      vertical-align: bottom;
      margin-right: 10px;
    }

    .activity-name,
    .activity-address {
      width: 900px;
    }

    .item {
      width: 395px;
    }

    .biaoqian {
      width: 335px;
    }

    .upload-box {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
      width: 525px;
    }

    .upload-right {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
      width: 505px;
      margin-left: 29px;
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
      line-height: 119px;
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

    .no-pic-cover-left {
      width: 146px;
      height: 195px;
      line-height: 195px;
    }

    .clear,
    .clear1 {
      position: absolute;
      bottom: 10px;
      left: 175px;
      color: @topNavBarBgColor;
      cursor: pointer;
    }

    .clear1 {
      left: 270px;
    }

    .no-pic-detail {
      width: 241px;
      height: 136px;
      line-height: 175px;
    }

    .aspect-ratio {
      width: 80px;
      text-align: center;
      color: rgba(153, 153, 153, 1);
    }
  }
</style>
<style lang="less">
  @import "../../../../style/config.less";

  .asdasdasd {
    .el-form {
      width: 75%;
    }

    .el-form-item__label {
      color: @leftNavBarBgColor;
    }

    .article-con {
      .el-form-item__content {
        line-height: 20px;
      }
    }
  }
</style>
