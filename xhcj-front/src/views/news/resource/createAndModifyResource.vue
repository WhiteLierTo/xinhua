<template>
  <dialogTemplate :title="isModify?'资源修改':'资源上传'" :onClose="onCloseDialog" :onSubmit="onsubmitResource">

    <el-form ref="form" :model="resourceInfo" label-width="80px" v-loading="initLoading" v-if="!initLoading">
      <el-form-item label="资源类型">
        <el-select v-model="resourceInfo.type" placeholder="请选择资源类型" style="width: 100%">
          <el-option label="图片" value="image"></el-option>
          <el-option label="文档" value="word"></el-option>
          <el-option label="视频" value="video"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件名">
        <el-input v-model.trim="resourceInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="标签" required>
        <el-input placeholder="多个标签请以英文“,”号区分" v-model.trim="resourceInfo.tags"></el-input>
      </el-form-item>

      <uploadFormItem
          v-show="resourceInfo.type === 'image'" type="image"
          :onSuccess="uploadSuccessHigher('image')"
          :setFileName="setFileName"
          :detail="detail"
      ></uploadFormItem>

      <uploadFormItem
          v-show="resourceInfo.type === 'word'" type="word"
          :onSuccess="uploadSuccessHigher('word')"
          :setFileName="setFileName"
          :detail="detail"
      ></uploadFormItem>

      <uploadFormItem
          v-show="resourceInfo.type === 'video'" type="video"
          :onSuccess="uploadSuccessHigher('video')"
          :setFileName="setFileName"
          :detail="detail"
          ref="videoContainer"
      ></uploadFormItem>
      <uploadFormItem
          v-show="resourceInfo.type === 'video'" type="cover"
          :onSuccess="uploadSuccessHigher('cover')"
          :setFileName="setFileName"
          :detail="detail"
      ></uploadFormItem>
    </el-form>

  </dialogTemplate>
</template>

<script>
  // TODO 修改的逻辑还是没有捋清楚

  import uploadFormItem from "./uploadFormItem"

  export default {
    name: "createAndModify",
    props: ["onClose", "isModify", "id"],
    components: {
      uploadFormItem
    },
    data() {
      return {
        initLoading: true,
        detail: {},
        resourceInfo: {
          type: "image",
          name: "",
          tags: "",
          imageInfo: {}, // 图片地址
          coverInfo: {}, // 封面图地址
          wordInfo: {}, // 文档地址
          videoInfo: {}, // 视频地址
        },
      }
    },
    mounted() {
      if (this.isModify) {
        this.onModifyInit()
      } else {
        this.initLoading = false
      }
    },
    methods: {
      async onModifyInit() {
        // 如果是修改的初始化
        this.initLoading = true;
        let [ok, detail] = await this.$ajax.news.resource.get(this.id);
        if (!ok) {
          this.$message.error("查询详情失败");
          return
        }
        this.detail = detail;
        this.initLoading = false;
        this.resourceInfo.name = detail.name;
        this.resourceInfo.tags = detail.tags;
        this.resourceInfo.type = detail.type;
        this.resourceInfo[`${detail.type}Info`] = detail;
        if (detail.type === 'video') {
          this.resourceInfo.coverInfo.url = detail.coverUrl;
        }
      },

      uploadSuccessHigher(type) {
        return (Info) => {
          this.resourceInfo[`${type}Info`] = Info;
        }
      },

      onCloseDialog() {
        // 这一层的关闭函数
        this.onClose(!!this.onCloseDialog.isSubmit);
      },

      setFileName(fileName) {
        if (!this.resourceInfo.name) {
          this.resourceInfo.name = fileName
        }
      },

      async onsubmitResource() {
        if (!this.resourceInfo.tags) {
          this.$message.error("资源标签为必填项");
          return false
        }

        if (!this.resourceInfo[`${this.resourceInfo.type}Info`] || !this.resourceInfo[`${this.resourceInfo.type}Info`].rid) {
          this.$message.error("您必须上传文件");
          return false
        }

        if (this.resourceInfo.type === "video" && !this.resourceInfo.coverInfo.url) {
          this.$message.error("您必须上传封面图");
          return false
        }

        let fileInfo = this.resourceInfo[`${this.resourceInfo.type}Info`];

        let data = {
          name: this.resourceInfo.name,
          type: this.resourceInfo.type,
          tags: this.resourceInfo.tags,
          rid: fileInfo.rid,
          url: fileInfo.url,
          fileSize: fileInfo.fileSize,
          ext: fileInfo.extName
        };
        if (fileInfo.videoTime) {
          data.videoTime = fileInfo.videoTime;
        }

        if (this.resourceInfo.type === "video") {
          data.coverUrl = this.resourceInfo.coverInfo.coverUrl;
          if (!this.isModify) {
            let duration = this.$refs.videoContainer.getVideoDuration();
            if (!duration) {
              this.$message.error("请等待视频加载");
              return false
            } else {
              data.videoTime = this.$utils.format.sToTimeStr(duration);
            }
          }
        }
        if (this.isModify) {
          data.id = this.id;
        }

        let ajaxFunc = this.isModify ? this.$ajax.news.resource.update : this.$ajax.news.resource.add;

        let [ok, msg] = await ajaxFunc(data);

        if (ok) {
          this.$message.success("操作成功");
        } else {
          this.$message.error("操作失败");
        }

        this.onCloseDialog.isSubmit = ok; // 一个标志位

        return ok
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../style/config";
  @import "../../../style/styles";

  .upload-file-container {
    display: flex;
    align-items: center;

    .upload-bt {
      width: 80px;
      height: 30px;
      border-radius: 6px;
      border: 1px solid @defaultBlueClick;
      .flexCenter();
      color: @defaultBlueClick;
      cursor: pointer;

      i {
        font-size: 20px;
        margin-right: 4px;
        position: relative;
        top: 1px;
      }
    }

    .tip {
      color: @darkOrange;
    }
  }

  .img-container {
    width: 212px;
    height: 119px;
    background: @defaultBgColor;
    margin-top: 10px;
    .flexCenter();
    position: relative;

    .progress-container {
      position: absolute;
      top: 0;
      width: 100%;
      height: 4px;
      overflow: hidden;

      .progress {
        height: 100%;
        background: @successGreen;
        transition: all @defaultAnimationTime;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
    }
  }

  .file-input {
    display: none;
  }
</style>