<template>

  <div>
    <dialogTemplate ref="dialogAds" :onClose="onClose" :onSubmit="onSubmit" :title="id?'广告修改':'广告新增'">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="广告样式">
              <el-select v-model="form.type" placeholder="请选择广告样式" style="width:100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="尺寸信息" class="sizeInfo">
              <div class="sizeInfo">
                <span>宽度:750px</span>
                <span>高度:1334px</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上传图片" prop="loginName">
              <div class="upload-box">
                <picCutting proportion="750:1334" class="pic-cutting" uploadPath="/resource/upload" v-model="form.path" :max-size="1500000"></picCutting>
                <span class="repository-select" @click="selectResource()">资源库选择</span>
                <span class="upload-tips">（仅支持上传jpg、png格式图片，且不超过1500kb）</span>
                <div class="no-pic-cover-left">
                  <img class="empty-img" src="../../../assets/nopic.png" v-if="!form.path" alt />
                  <img class="nopic-img" :src="form.path" alt v-else />
                </div>
              </div>
              <span class="clear" @click="clearCoverImg()">清除</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="外链地址">
              <el-input v-model="form.outLink" placeholder="请输入外链地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="外链介绍">
              <el-input type="textarea" :rows="4" v-model="form.outLinkTitle" placeholder="请输入外链介绍"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="状态">
              <el-select v-model="form.status" placeholder="请选择角色" style="width:100%">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="生效时间" prop="mobile">
              <el-date-picker v-model="dateValue" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
              </el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
    </dialogTemplate>
    <dialogTemplate ref="dialogTemplate" title="资源库" v-if="showResource" :onClose="()=>{this.showResource=false}" :onSubmit="onSubmit" :width="width">
      <div slot="foot"></div>
      <div :style="{height:height+'px'}">
        <resourcePool :isSelectMode="true" :onSelect="callBack" type="image" />
      </div>
    </dialogTemplate>
  </div>
</template>

<script>
// TODO 这写的是啥... 等待重构
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import resourcePool from "../../news/resource/resource"

export default {
  name: "userDialog",
  props: ["onClose", "id"],
  components: { Treeselect, resourcePool },
  data() {
    return {
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.8,
      form: {
        advModel: 1,
        name: "",
        outLink: "",
        path: "",
        type: "1",
        outLinkTitle: "",
        status: "1",
        effectBeginTime: 0,
        effectEndTime: 0,
      },
      rules: {
        name: [{ required: true, message: "请输入广告名称", trigger: "blur" }],
      },
      dateValue: [],
      isSourcePool: false,
      adsImgId: "",
      options: [
        {
          value: "1",
          label: "图片"
        },

      ],
      statusOptions: [
        {
          value: "1",
          label: "正常"
        },
        {
          value: "0",
          label: "停用"
        },
      ],
      adsImgPath: "",
      showResource: false,
      resourceId: "",
    };
  },
  async mounted() {
    if (this.id) {
      await this.getAdsDetail()
    }
  },
  methods: {
    async getAdsDetail() {
      this.form = await this.$ajax.advertisement.getAdsDetail(this.id);
      this.form.type = this.form.type + ""
      this.form.status = this.form.status + ""
      if (this.form.effectBeginTime && this.form.effectEndTime) {
        this.dateValue.push(this.form.effectBeginTime)
        this.dateValue.push(this.form.effectEndTime)
      }

    },
    selectResource() {
      this.showResource = true
    },
    clearCoverImg() {
      this.form.path = ""
    },
    async onSubmit() {
      if (this.submitLoading) return;
      let flag;
      this.submitLoading = true;
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.form.status = parseInt(this.form.status)
          this.form.type = parseInt(this.form.type)
          if (this.dateValue !== null) {
            for (var i = 0; i < this.dateValue.length; i++) {
              this.form.effectBeginTime = +this.dateValue[0]
              this.form.effectEndTime = +this.dateValue[1]
            }
          } else {
            this.form.effectBeginTime = 0
            this.form.effectEndTime = 0
          }
          if (this.showResource) {//资源库选择
            this.form.path = this.resourceId
          }
          if (this.id) {
            this.$ajax.advertisement.updateAds(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success(res.msg)
                this.$refs.dialogAds.closeSelf()
                flag = true
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.$ajax.advertisement.createAds(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success(res.msg)
                this.$refs.dialogAds.closeSelf()
                flag = true
              } else {
                this.$message.error(res.msg);
              }
            });

          }
        }
        this.submitLoading = false;
        return flag

      })
    },
    callBack(obj) {
      this.form.path = obj[0].url
      this.resourceId = obj[0].id
      this.$refs.dialogTemplate.closeSelf()
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/config.less";
@import "../../../style/styles";

.sizeInfo {
  color: rgba(51, 51, 51, 1) !important;

  span:nth-child(1) {
    margin-right: 30px;
  }
}

.upload-box {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  width: 585px;
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

.no-pic-cover-left {
  width: 100px;
  height: 177.87px;
  line-height: 177.87px;
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

.clear {
  position: absolute;
  bottom: 0px;
  left: 125px;
  color: @topNavBarBgColor;
  cursor: pointer;
}

.sizeInfo {
  margin-left: 20px;
}
</style>
