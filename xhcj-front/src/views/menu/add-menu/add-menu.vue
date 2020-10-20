<template>
  <div class="self-form aadsds">
    <div class="base-info">{{ title }}</div>
    <el-form
      ref="menuForm"
      :model="menuForm"
      :rules="rules"
      label-width="150px"
    >
      <el-form-item label="主题名称:" prop="themeName">
        <el-input
          v-model="menuForm.themeName"
          placeholder="请输入主题名称"
          :disabled="isClick"
        ></el-input>
      </el-form-item>
      <el-form-item label="首页顶部背景:" prop="indexTopBackImg">
        <div class="upload-box">
          <picCutting
            proportion="1:1"
            class="pic-cutting"
            uploadPath="/system/theme/upload"
            v-model="menuForm.indexTopBackImg"
            :max-size="1500000"
            v-show="!isClick"
          ></picCutting>
          <div class="no-pic-cover-left">
            <img
              class="empty-img"
              src="../../../assets/nopic.png"
              v-if="!menuForm.indexTopBackImg"
              alt
            />
            <img
              class="nopic-img"
              :src="menuForm.indexTopBackImg"
              alt="顶部背景图"
              v-else
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="频道文字颜色:" prop="channelWordColor">
        <el-input
          v-model="menuForm.channelWordColor"
          placeholder="请输入频道文字颜色(十六进制 例如：#000000)"
          :disabled="isClick"
        />
      </el-form-item>
      <el-form-item label="频道高亮颜色:" prop="channelWordHighlightColor">
        <el-input
          v-model="menuForm.channelWordHighlightColor"
          placeholder="请输入频道高亮颜色(十六进制 例如：#000000)"
          :disabled="isClick"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜单图标:">
        <ul>
          <li>首页图标</li>
          <li>视频图标</li>
          <li>活动图标</li>
          <li>财经号图标</li>
          <li>我的图标</li>
        </ul>
      </el-form-item>
      <el-form-item label="常规图标:">
        <ul class="conmon-icon">
          <li>
            <div class="upload-box">
              <div class="no-pic-cover-left">
                <img
                  class="empty-img"
                  src="../../../assets/nopic.png"
                  v-if="!menuForm.indexIconUrl"
                  alt
                />
                <img
                  class="nopic-img"
                  :src="menuForm.indexIconUrl"
                  alt="首页图标"
                  v-else
                />
              </div>
            </div>
            <picCutting
              proportion="1:1"
              class="pic-cutting"
              uploadPath="/system/theme/upload"
              v-model="menuForm.indexIconUrl"
              :max-size="1500000"
              v-show="!isClick"
            ></picCutting>
          </li>
          <li>
            <div class="upload-box">
              <div class="no-pic-cover-left">
                <img
                  class="empty-img"
                  src="../../../assets/nopic.png"
                  v-if="!menuForm.videoIconUrl"
                  alt
                />
                <img
                  class="nopic-img"
                  :src="menuForm.videoIconUrl"
                  alt="视频图标"
                  v-else
                />
              </div>
            </div>
            <picCutting
              proportion="1:1"
              class="pic-cutting"
              uploadPath="/system/theme/upload"
              v-model="menuForm.videoIconUrl"
              :max-size="1500000"
              v-show="!isClick"
            ></picCutting>
          </li>
          <li>
            <div class="upload-box">
              <div class="no-pic-cover-left">
                <img
                  class="empty-img"
                  src="../../../assets/nopic.png"
                  v-if="!menuForm.activityIconUrl"
                  alt
                />
                <img
                  class="nopic-img"
                  :src="menuForm.activityIconUrl"
                  alt="活动图标"
                  v-else
                />
              </div>
            </div>
            <picCutting
              proportion="1:1"
              class="pic-cutting"
              uploadPath="/system/theme/upload"
              v-model="menuForm.activityIconUrl"
              :max-size="1500000"
              v-show="!isClick"
            ></picCutting>
          </li>
          <li>
            <div class="upload-box">
              <div class="no-pic-cover-left">
                <img
                  class="empty-img"
                  src="../../../assets/nopic.png"
                  v-if="!menuForm.cjhIconUrl"
                  alt
                />
                <img
                  class="nopic-img"
                  :src="menuForm.cjhIconUrl"
                  alt="财经号图标"
                  v-else
                />
              </div>
            </div>
            <picCutting
              proportion="1:1"
              class="pic-cutting"
              uploadPath="/system/theme/upload"
              v-model="menuForm.cjhIconUrl"
              :max-size="1500000"
              v-show="!isClick"
            ></picCutting>
          </li>
          <li>
            <div class="upload-box">
              <div class="no-pic-cover-left">
                <img
                  class="empty-img"
                  src="../../../assets/nopic.png"
                  v-if="!menuForm.myIconUrl"
                  alt
                />
                <img
                  class="nopic-img"
                  :src="menuForm.myIconUrl"
                  alt="我的图标"
                  v-else
                />
              </div>
            </div>
            <picCutting
              proportion="1:1"
              class="pic-cutting"
              uploadPath="/system/theme/upload"
              v-model="menuForm.myIconUrl"
              :max-size="1500000"
              v-show="!isClick"
            ></picCutting>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="高亮图标:">
        <ul class="conmon-icon">
          <li>
            <div class="upload-box">
              <div class="no-pic-cover-left">
                <img
                  class="empty-img"
                  src="../../../assets/nopic.png"
                  v-if="!menuForm.indexHighlightIconUrl"
                  alt
                />
                <img
                  class="nopic-img"
                  :src="menuForm.indexHighlightIconUrl"
                  alt="首页高亮图标"
                  v-else
                />
              </div>
            </div>
            <picCutting
              proportion="1:1"
              class="pic-cutting"
              uploadPath="/system/theme/upload"
              v-model="menuForm.indexHighlightIconUrl"
              :max-size="1500000"
              v-show="!isClick"
            ></picCutting>
          </li>
          <li>
            <div class="upload-box">
              <div class="no-pic-cover-left">
                <img
                  class="empty-img"
                  src="../../../assets/nopic.png"
                  v-if="!menuForm.videoHighlightIconUrl"
                  alt
                />
                <img
                  class="nopic-img"
                  :src="menuForm.videoHighlightIconUrl"
                  alt="视频高亮图标"
                  v-else
                />
              </div>
            </div>
            <picCutting
              proportion="1:1"
              class="pic-cutting"
              uploadPath="/system/theme/upload"
              v-model="menuForm.videoHighlightIconUrl"
              :max-size="1500000"
              v-show="!isClick"
            ></picCutting>
          </li>
          <li>
            <div class="upload-box">
              <div class="no-pic-cover-left">
                <img
                  class="empty-img"
                  src="../../../assets/nopic.png"
                  v-if="!menuForm.activityHighlightIconUrl"
                  alt
                />
                <img
                  class="nopic-img"
                  :src="menuForm.activityHighlightIconUrl"
                  alt="活动高亮图标"
                  v-else
                />
              </div>
            </div>
            <picCutting
              proportion="1:1"
              class="pic-cutting"
              uploadPath="/system/theme/upload"
              v-model="menuForm.activityHighlightIconUrl"
              :max-size="1500000"
              v-show="!isClick"
            ></picCutting>
          </li>
          <li>
            <div class="upload-box">
              <div class="no-pic-cover-left">
                <img
                  class="empty-img"
                  src="../../../assets/nopic.png"
                  v-if="!menuForm.cjhHighlightIconUrl"
                  alt
                />
                <img
                  class="nopic-img"
                  :src="menuForm.cjhHighlightIconUrl"
                  alt="财经号高亮图标"
                  v-else
                />
              </div>
            </div>
            <picCutting
              proportion="1:1"
              class="pic-cutting"
              uploadPath="/system/theme/upload"
              v-model="menuForm.cjhHighlightIconUrl"
              :max-size="1500000"
              v-show="!isClick"
            ></picCutting>
          </li>
          <li>
            <div class="upload-box">
              <div class="no-pic-cover-left">
                <img
                  class="empty-img"
                  src="../../../assets/nopic.png"
                  v-if="!menuForm.myHighlightIconUrl"
                  alt
                />
                <img
                  class="nopic-img"
                  :src="menuForm.myHighlightIconUrl"
                  alt="我的高亮图标"
                  v-else
                />
              </div>
            </div>
            <picCutting
              proportion="1:1"
              class="pic-cutting"
              uploadPath="/system/theme/upload"
              v-model="menuForm.myHighlightIconUrl"
              :max-size="1500000"
              v-show="!isClick"
            ></picCutting>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="文字高亮颜色:" prop="wordHighlightColor">
        <el-input
          v-model="menuForm.wordHighlightColor"
          placeholder="请输入文字高亮颜色(十六进制 例如：#000000)"
          :disabled="isClick"
        ></el-input>
      </el-form-item>
      <el-form-item label="首页图片蒙版:" prop="indexImgCover">
        <el-radio-group v-model="menuForm.indexImgCover">
          <el-radio :label="0">无（默认）</el-radio>
          <el-radio :label="1">灰色</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生效时间:" prop="takeEffectTime">
        <el-date-picker
          v-model="takeEffectTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button @click="cancel()">取消</el-button>
      <el-button type="primary" @click="saveHandle">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addMenu",
  inject: ["modifyLastBreadcrumbLabel"],
  data() {
    return {
      menuForm: {
        themeName: "",
        indexTopBackImg: "",
        channelWordColor: "",
        channelWordHighlightColor: "",
        wordHighlightColor: "",
        indexImgCover: "",
        takeEffectStartTime: "",
        takeEffectEndTime: "",
        indexIconUrl: "",
        videoIconUrl: "",
        activityIconUrl: "",
        cjhIconUrl: "",
        myIconUrl: "",
        indexHighlightIconUrl: "",
        videoHighlightIconUrl: "",
        activityHighlightIconUrl: "",
        cjhHighlightIconUrl: "",
        myHighlightIconUrl: "",
        takeEffectStartTime: "",
        takeEffectEndTime: "",
      },
      takeEffectTime: [],
      rules: {
        themeName: [
          { required: true, message: "请输入主题名称", trigger: "blur" },
        ],
        indexTopBackImg: [
          { required: true, message: "请选择首页顶部背景", trigger: "blur" },
        ],
        channelWordColor: [
          { required: true, message: "请输入频道文字颜色", trigger: "change" },
        ],
        channelWordHighlightColor: [
          { required: true, message: "请输入频道高亮颜色", trigger: "change" },
        ],
        wordHighlightColor: [
          { required: true, message: "请输入文字高亮颜色", trigger: "change" },
        ],
        indexImgCover: [
          { required: true, message: "请选择首页图片蒙版", trigger: "change" },
        ],
      },
      title: "",
      id: "",
      color: "",
      isClick: false,
    };
  },
  computed: {},
  mounted() {
    this.id = this.$route.query.id;
    this.id === undefined
      ? (this.title = "新增主题")
      : (this.title = "修改主题");
    if (this.id) {
      this.modifyLastBreadcrumbLabel("修改主题");
      this.isClick = true;
      this.$ajax.menu.themeDetail(this.id).then((res) => {
        let { takeEffectStartTime, takeEffectEndTime } = res.data;
        takeEffectStartTime = this.$utils.format.timeStampToStandardStr(
          takeEffectStartTime
        );
        takeEffectEndTime = this.$utils.format.timeStampToStandardStr(
          takeEffectEndTime
        );
        this.menuForm = res.data;
        this.takeEffectTime = [takeEffectStartTime, takeEffectEndTime];
      });
    }
  },
  methods: {
    saveHandle() {
      if (this.takeEffectTime.length > 0) {
        this.menuForm.takeEffectStartTime = Date.parse(this.takeEffectTime[0]);
        this.menuForm.takeEffectEndTime = Date.parse(this.takeEffectTime[1]);
      }
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          if (!this.id) {
            this.$ajax.menu.addTheme(this.menuForm).then((res) => {
              if (res.code === 200) {
                this.$message.success("新增成功");
                this.$router.go(-1);
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.$ajax.menu.updateTheme(this.menuForm).then((res) => {
              if (res.code === 200) {
                this.$message.success("修改成功");
                this.$router.go(-1);
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        }
      });
    },
    cancel() {
      for (let i in this.menuForm) {
        this.menuForm[i] = "";
      }
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/config";
@import "../../../style/styles";

.self-form {
  width: 100%;
  height: auto;
  flex: 1;
  overflow: hidden;
  padding: 20px 30px;
  background-color: white;
  display: flex;
  flex-direction: column;

  .base-info {
    font-size: 16px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 18px;
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

  .upload-box {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: wrap;

    .no-pic-cover-left {
      width: 300px;
      height: 71px;
      line-height: 100px;
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
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    width: 700px;

    li {
      margin-right: 70px;
    }
  }

  .conmon-icon {
    .upload-box {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      flex-wrap: wrap;

      .no-pic-cover-left {
        width: 60px;
        height: 60px;
        line-height: 70px;
        text-align: center;
        background: rgba(238, 238, 238, 1);
        margin: 10px;

        .empty-img {
          width: 30px;
        }

        .nopic-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }

    li {
      margin-right: 46px;
    }
  }

  .btn {
    margin-top: 25px;
    margin-left: 150px;
  }
}
</style>
<style lang="less">
@import "../../../style/config.less";

.aadsds {
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

  .el-dialog {
    margin-top: 2vh !important;
  }

  .m-colorPicker .colorBtn {
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }

  .m-colorPicker .box.open {
    z-index: 160;
  }
}
</style>
