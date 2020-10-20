<template>
  <div class="self-form hjkjn ">
    <div class="base-info">专题信息</div>
    <div class="dadsadsd">
      <el-form ref="basicInfoForm" :model="thematicForm" :rules="rules" label-width="120px">
        <el-form-item label="专题:" prop="name">
          <el-input v-model="thematicForm.name" placeholder="请输入专题名称"></el-input>
        </el-form-item>

        <el-form-item label="专题内名称:">
          <el-input v-model="thematicForm.fullName" placeholder="请输入专题内名称"></el-input>
        </el-form-item>
        <el-form-item label="关键词:">
          <el-input v-model="thematicForm.keyword" placeholder="请输入关键词"></el-input>
        </el-form-item>

        <el-form-item label="描述:">
          <el-input type="textarea" v-model="thematicForm.description" :rows="6" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="app是否显示:" prop="displayFlag">
          <el-radio-group v-model="thematicForm.displayFlag">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="后台是否显示:" prop="backShowFlag">
          <el-radio-group v-model="thematicForm.backShowFlag">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="base-info">图片信息</div>
        <el-form-item label="首页呈现方式:" prop="indexShowType">
          <el-radio-group v-model="thematicForm.indexShowType">
            <el-radio :label="1">常规</el-radio>
            <el-radio :label="2">大图</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="首页图片上传:" prop="indexPicUrl">
          <div class="upload-box" v-if="thematicForm.indexShowType===1">
            <picCutting proportion="3:2" class="pic-cutting" uploadPath="/activity/upload"
                        v-model="thematicForm.indexPicUrl" :max-size="1500000"></picCutting>
            <span class="repository-select" @click="selecIndexImg()">资源库选择</span>
            <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>
            <div class="no-pic-cover-left">
              <img class="empty-img" src="../../../assets/nopic.png" v-if="!thematicForm.indexPicUrl" alt/>
              <img class="nopic-img" :src="thematicForm.indexPicUrl" alt v-else/>
            </div>
            <span class="aspect-ratio">(3:2)</span>
            <span class="clear" @click="clearIndexImg()">清除</span>
          </div>
          <div class="upload-box" v-else>
            <picCutting proportion="16:9" class="pic-cutting" uploadPath="/activity/upload"
                        v-model="thematicForm.indexPicUrl" :max-size="1500000"></picCutting>
            <span class="repository-select" @click="selecIndexImg()">资源库选择</span>
            <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>
            <div class="no-pic-cover-right">
              <img class="empty-img" src="../../../assets/nopic.png" v-if="!thematicForm.indexPicUrl" alt/>
              <img class="nopic-img" :src="thematicForm.indexPicUrl" alt v-else/>
            </div>
            <span class="aspect-ratio">(16:9)</span>
            <span class="clear" @click="clearIndexImg()">清除</span>
          </div>
        </el-form-item>
        <el-form-item label="栏目页顶图:" prop="topPicUrl">
          <div class="upload-box">
            <picCutting class="pic-cutting" proportion="16:9" uploadPath="/activity/upload"
                        v-model="thematicForm.topPicUrl" :max-size="1500000"></picCutting>
            <span class="repository-select" @click="selecTopImg()">资源库选择</span>
            <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>
            <div class="no-pic-cover-right">
              <img class="empty-img" src="../../../assets/nopic.png" v-if="!thematicForm.topPicUrl" alt/>
              <img class="nopic-img" :src="thematicForm.topPicUrl" v-else alt/>
            </div>
            <span class="aspect-ratio">16:9</span>
          </div>
          <span class="clear" @click="clearTopPicImg">清除</span>
        </el-form-item>
        <el-form-item label="banner图:" prop="bannerPicUrl">
          <div class="upload-box">
            <picCutting class="pic-cutting" proportion="16:9" uploadPath="/activity/upload"
                        v-model="thematicForm.bannerPicUrl" :max-size="1500000"></picCutting>
            <span class="repository-select" @click="selectBannerImg()">资源库选择</span>
            <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>
            <div class="no-pic-cover-right">
              <img class="empty-img" src="../../../assets/nopic.png" v-if="!thematicForm.bannerPicUrl" alt/>
              <img class="nopic-img" :src="thematicForm.bannerPicUrl" v-else alt/>
            </div>
            <span class="aspect-ratio">16:9</span>
          </div>
          <span class="clear" @click="clearBannerImg">清除</span>
        </el-form-item>
        <div class="base-info">关联信息</div>
        <el-form-item label="已关联的频道:">
          <span class="associated-item" v-for="(item,index) in relatedNormals" :key="index">{{ item }}</span>
        </el-form-item>
        <el-form-item label="已设置的banner:">
          <span class="associated-item" v-for="(item,index) in relatedBannerNormals" :key="index">{{ item }}</span>
        </el-form-item>

      </el-form>
    </div>
    <el-dialog title="资源库选择" :type="type" :close-on-click-modal="false" :visible.sync="showDialog" width="80%"
               style="margin-top:2vh;">
      <div :style="{height:height+'px'}">
        <resourcePool isSelectMode="true" :onSelect="callBack" type="image"/>
      </div>
    </el-dialog>
    <div class="btn">
      <el-button @click="cancel()">取消</el-button>
      <el-button type="primary" @click="saveHandle">保存</el-button>
    </div>
  </div>
</template>

<script>
  import resourcePool from "../../news/resource/resource";

  export default {
    name: "addEconnomics",
    components: {
      resourcePool
    },
    inject: ["modifyLastBreadcrumbLabel"],
    data() {
      return {
        thematicForm: {
          name: "",
          fullName: "",
          keyword: "",
          description: "",
          displayFlag: 1,
          backShowFlag: 1,
          indexShowType: 1,
          indexPicResourceId: "",
          indexPicUrl: "",
          topPicResourceId: "",
          topPicUrl: "",
          bannerPicResourceId: "",
          bannerPicUrl: "",
        },
        type: "select",
        typeOptions: this.$utils.data.economics.econStatusOptions(),
        rules: {
          name: [{required: true, message: "请输入专题名称", trigger: "blur"}],
          displayFlag: [
            {required: true, message: "请选择", trigger: "change"}
          ],
          backShowFlag: [{required: true, message: "请选择", trigger: "blur"}],
          indexShowType: [{required: true, message: "请选择", trigger: "blur"}],
          indexPicUrl: [{required: true, message: "请选择首页图片", trigger: "change"}],
          topPicUrl: [{required: true, message: "请选择栏目页顶图", trigger: "change"}],
          bannerPicUrl: [{required: true, message: "请选择banner图", trigger: "change"}]
        },
        showDialog: false,
        choose: false,
        indexPicShow: false,
        topImgShow: false,
        bannnerImgShow: false,
        height: window.innerHeight * 0.8,
        thematicId: ""
      };
    },
    mounted() {
      this.thematicId = this.$route.query.id;
      if (!this.thematicId) {
        return;
      }
      this.modifyLastBreadcrumbLabel("专题库编辑页");
      this.$ajax.news.thematic.thematicDetail(this.thematicId).then(res => {
        this.thematicForm = res.data

      });
    },

    computed: {
      relatedNormals() {
        // 已关联到的频道
        if (!this.thematicForm.normalAllName) return [];
        return this.thematicForm.normalAllName.split(',')
      },

      relatedBannerNormals() {
        // 已设置了banner的频道
        if (!this.thematicForm.bannerNormalAllName) return [];
        return this.thematicForm.bannerNormalAllName.split(',')
      }
    },

    methods: {
      //   资源库选择
      selecIndexImg() {
        this.showDialog = true;
        this.indexPicShow = true;
      },
      selecTopImg() {
        this.showDialog = true;
        this.topImgShow = true;
      },
      selectBannerImg() {
        this.showDialog = true;
        this.bannnerImgShow = true;
      },

      //资源库选择目标
      callBack(val) {
        this.choose = true; //判断是否从资源库选择
        this.showDialog = false;
        if (this.indexPicShow) {
          this.thematicForm.indexPicResourceId = val[0].id;
          this.thematicForm.indexPicUrl = val[0].url;
          this.indexPicShow = false;
        } else if (this.topImgShow) {
          this.thematicForm.topPicResourceId = val[0].id;
          this.thematicForm.topPicUrl = val[0].url;
          this.topImgShow = false;
        } else if (this.bannnerImgShow) {
          this.thematicForm.bannerPicResourceId = val[0].id;
          this.thematicForm.bannerPicUrl = val[0].url;
          this.bannnerImgShow = false;
        }
      },
      // 保存
      saveHandle() {
        this.$refs.basicInfoForm.validate(valid => {
          if (valid) {
            if (!this.thematicId) {
              this.$ajax.news.thematic.addThematic(this.thematicForm).then(res => {
                if (res.code === 200) {
                  this.$message.success("新增成功");
                  this.$router.go(-1);
                } else {
                  this.$message.error(res.msg);
                }
              });
            } else {
              this.$ajax.news.thematic.editThematic(this.thematicForm).then(res => {
                if (res.code === 200) {
                  this.$message.success("修改成功");
                  this.$router.go(-1);
                } else {
                  this.$message.error(res.msg);
                }
              });
            }
          } else {
            this.$message.warning("请输入必填项!");
          }
        });
      },
      //清除图片
      clearIndexImg() {
        this.thematicForm.indexPicUrl = "";
        this.thematicForm.indexPicResourceId = "";
      },
      clearTopPicImg() {
        this.thematicForm.topPicUrl = "";
        this.thematicForm.topPicResourceId = "";
      },
      clearBannerImg() {
        this.thematicForm.bannerPicUrl = "";
        this.thematicForm.bannerPicResourceId = "";
      },

      cancel() {
        this.$router.push("/news/thematic");
      }
    }
  };
</script>
<style lang="less" scoped>
  @import "../../../style/config.less";
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
      height: 142px;
      line-height: 136px;
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

    .no-pic-cover-right {
      height: 119px;
    }

    .clear {
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

    .associated-item {
      display: inline-block;
      width: 60px;
      height: 30px;
      margin-right: 5px;
      line-height: 30px;
      text-align: center;
      border-radius: 6px;
      border: 1px solid #ccc;
    }

    .btn {
      margin: 30px 120px;
    }
  }
</style>
<style lang="less">
  @import "../../../style/config.less";

  .dadsadsd {
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

  .hjkjn {
    .el-dialog {
      margin-top: 2vh !important;
    }
  }
</style>
