<template>
  <div class="self-form sadadsadsd">
    <div class="base-info">财经号基本信息</div>
    <el-form ref="mechanismForm" :model="mechanismForm" :rules="rules" label-width="100px">
      <el-form-item label="机构名称:" prop="name">
        <el-input v-model="mechanismForm.name" placeholder="请输入机构名称"></el-input>
      </el-form-item>
      <el-form-item label="机构类型:" prop="type">
        <el-select v-model="mechanismForm.type" placeholder="请选择机构类型">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机构标签:">
        <el-input v-model="mechanismForm.tags" placeholder="请输入机构标签（名称之间请使用英文半角符号间隔）"></el-input>
      </el-form-item>
      <el-form-item label="股权代码:" prop="fax">
        <el-input v-model="mechanismForm.fax" placeholder="请输入股票代码（代码之间请使用英文半角符号间隔）"></el-input>
      </el-form-item>
      <el-form-item label="网址:" prop="pageUrl">
        <el-input v-model="mechanismForm.pageUrl" placeholder="请输入网址"></el-input>
      </el-form-item>
      <el-form-item label="机构简介:" prop="memo">
        <el-input type="textarea" v-model="mechanismForm.memo" :rows="6" placeholder="请输入机构简介"></el-input>
      </el-form-item>
      <div class="base-info">图片信息</div>
      <el-form-item label="瀑布流图:" prop="waterfallUrl">
        <div class="upload-box">
          <picCutting proportion="1:1" class="pic-cutting" uploadPath="/activity/upload" v-model="mechanismForm.waterfallUrl" :max-size="1500000"></picCutting>
          <span class="repository-select" @click="selectWaterfallImg()">资源库选择</span>
          <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>
          <div class="no-pic-cover-left">
            <img class="empty-img" src="../../../assets/nopic.png" v-if="!mechanismForm.waterfallUrl" alt />
            <img class="nopic-img" :src="mechanismForm.waterfallUrl" alt v-else />
          </div>
          <span class="aspect-ratio">(1:1)</span>
        </div>
        <span class="clear" @click="clearCoverImg()">清除</span>
      </el-form-item>
      <el-form-item label="机构头像:" prop="headImg">
        <div class="upload-box">
          <picCutting class="pic-cutting" proportion="1:1" uploadPath="/activity/upload" v-model="mechanismForm.headImg" :max-size="1500000"></picCutting>
          <span class="repository-select" @click="selectOrganizeImg()">资源库选择</span>
          <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>
          <div class="no-pic-detail">
            <img class="empty-img" src="../../../assets/nopic.png" v-if="!mechanismForm.headImg" alt />
            <img class="nopic-img" :src="mechanismForm.headImg" alt />
          </div>
          <span class="aspect-ratio">1:1</span>
        </div>
        <span class="clear" @click="clearDetailImg">清除</span>
      </el-form-item>
    </el-form>
    <el-dialog title="资源库选择" :type="type" :close-on-click-modal="false" :visible.sync="showDialog" width="80%">
      <div :style="{height:height+'px'}">
        <resourcePool isSelectMode="true" :onSelect="callBack" type="image" />
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
      mechanismForm: {
        name: "",
        type: "",
        tags: "",
        fax: "",
        pageUrl: "",
        memo: "",
        waterfallUrl: "",
        headImg: ""
      },
      type: "select",
      typeOptions: this.$utils.data.economics.econStatusOptions(),
      rules: {
        name: [{ required: true, message: "请输入机构名称", trigger: "blur" }],
        type: [
          { required: true, message: "请选择机构类型", trigger: "change" }
        ],
        memo: [{ required: true, message: "请输入机构简介", trigger: "blur" }],
        waterfallUrl: [
          { required: true, message: "请选择瀑布流图", trigger: "change" }
        ],
        headImg: [
          { required: true, message: "请选择机构头像", trigger: "change" }
        ]
      },
      showDialog: false,
      organizeId: "",
      waterfallUrlId: "",
      headImgId: "",
      choose: false,
      waterFallShow: false,
      headImgShow: false,
      height: window.innerHeight * 0.8
    };
  },
  mounted() {
    this.organizeId = this.$route.query.id;
    if (!this.organizeId) {
      return;
    }
    this.modifyLastBreadcrumbLabel("财经号编辑页");
    this.$ajax.economics.cjhDetail(this.organizeId).then(res => {
      const {
        id,
        name,
        type,
        tags,
        fax,
        pageUrl,
        memo,
        waterfallUrl,
        headImg
      } = res.data;
      this.mechanismForm = {
        id,
        name,
        type,
        tags,
        fax,
        pageUrl,
        memo,
        waterfallUrl,
        headImg
      };
    });
  },

  methods: {
    //   资源库选择
    selectWaterfallImg() {
      this.showDialog = true;
      this.waterFallShow = true;
    },
    selectOrganizeImg() {
      this.showDialog = true;
      this.headImgShow = true;
    },
    //资源库选择
    callBack(val) {
      if (!this.$utils.validate.validImg(val[0].url)) {
        this.$message.error("请选择图片格式");
        return;
      }

      this.choose = true; //判断是否从资源库选择
      this.showDialog = false;
      if (this.waterFallShow) {
        this.waterfallUrlId = val[0].id;
        this.mechanismForm.waterfallUrl = val[0].url;
        this.waterFallShow = false;
      } else if (this.headImgShow) {
        this.headImgId = val[0].id;
        this.mechanismForm.headImg = val[0].url;
      }
    },
    // 保存
    saveHandle() {
      let mechanismFormCopy = JSON.parse(JSON.stringify(this.mechanismForm));
      if (this.choose) {
        mechanismFormCopy.waterfallUrl = this.waterfallUrlId || mechanismFormCopy.waterfallUrl;
        mechanismFormCopy.headImg = this.headImgId || mechanismFormCopy.headImg;
      }
      this.$refs.mechanismForm.validate(valid => {
        if (valid) {
          if (!this.organizeId) {
            this.$ajax.economics.addCjh(mechanismFormCopy).then(res => {
              if (res.code === 200) {
                this.$message.success("新增成功");
                this.$router.go(-1);
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.$ajax.economics.updateCjh(mechanismFormCopy).then(res => {
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
    //清除图片
    clearCoverImg() {
      this.mechanismForm.waterfallUrl = "";
    },
    clearDetailImg() {
      this.mechanismForm.headImg = "";
    },
    cancel() {
      this.$router.push("/economics/economicsManage");
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
  .no-pic-detail {
    width: 136px;
    height: 136px;
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

  .clear,
  .clear1 {
    position: absolute;
    bottom: 10px;
    left: 165px;
    color: @topNavBarBgColor;
    cursor: pointer;
  }

  .aspect-ratio {
    width: 80px;
    text-align: center;
    color: rgba(153, 153, 153, 1);
  }
  .btn {
    margin: 30px 100px;
  }
}
</style>
<style lang="less">
@import "../../../style/config.less";
.sadadsadsd {
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
}
</style>
