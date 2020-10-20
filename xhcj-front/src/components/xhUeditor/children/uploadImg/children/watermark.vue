<template>
  <div class="water-mark-container">
    <dialogTemplate
        v-if="isShowDialog"
        :onClose="onWaterMarkClose"
        ref="waterMark"
        title="水印"
        width="800"
    >
      <div class="water-mark-inner">
        <div class="img-container">
          <canvas class="watermark-canvas" ref="canvas"></canvas>
        </div>
        <div class="config-container">
          <div class="row">
            <el-radio @change="drawOriginImgAndWatermark" v-model="isImgWatermark" :label="true">图片水印</el-radio>
            <el-radio @change="drawOriginImgAndWatermark" v-model="isImgWatermark" :label="false">文字水印</el-radio>
          </div>
          <div class="row" v-if="!isImgWatermark">
            <div class="label">水印文字</div>
            <div class="input-container">
              <el-input
                  @change="drawOriginImgAndWatermark"
                  v-model="watermarkText"
                  placeholder="水印文字"
              >
              </el-input>
            </div>
          </div>
          <div class="row" v-if="!isImgWatermark">
            <div class="label">水印文字大小</div>
            <div class="input-container">
              <el-input-number
                  @change="drawOriginImgAndWatermark"
                  v-model="watermarkPx" :min="10" :max="30"
                  label="水印文字大小"
              ></el-input-number>
            </div>
          </div>
          <div class="row" v-if="!isImgWatermark">
            <div class="label">水印文字颜色</div>
            <div class="input-container">
              <el-color-picker
                  @change="drawOriginImgAndWatermark"
                  v-model="watermarkColor"
                  show-alpha
              ></el-color-picker>
            </div>
          </div>
          <div class="row">
            <div class="label">水印位置</div>
            <div class="input-container">
              <el-radio @change="drawOriginImgAndWatermark" v-model="watermarkPosition" label="leftTop">左上</el-radio>
              <el-radio @change="drawOriginImgAndWatermark" v-model="watermarkPosition" label="leftBottom">左下</el-radio>
              <el-radio @change="drawOriginImgAndWatermark" v-model="watermarkPosition" label="rightTop">右上</el-radio>
              <el-radio @change="drawOriginImgAndWatermark" v-model="watermarkPosition" label="rightBottom">右下
              </el-radio>
              <el-radio @change="drawOriginImgAndWatermark" v-model="watermarkPosition" label="center">中央</el-radio>
            </div>
          </div>
          <div class="bt-row">
            <el-button type="primary" @click="uploadImgWithWatermark">
              <i class="el-icon-loading" v-show="isUploading"></i>
              <span v-show="!isUploading">上传水印图</span>
            </el-button>
            <el-button @click="uploadOriginImg">
              <i class="el-icon-loading" v-show="isUploading"></i>
              <span v-show="!isUploading">上传原图</span>
            </el-button>
          </div>
        </div>
      </div>
      <div slot="foot"></div>
    </dialogTemplate>
    <img :src="imgFileUrl" v-if="imgFileUrl" alt="" class="original-img" ref="originImg">
    <img src="../../../../../assets/other/watermark.png" class="original-img" alt="" ref="watermarkImg">
  </div>
</template>

<script>
  // 水印
  export default {
    name: "watermark",
    props: {
      onSubmit: Function
    },
    data() {
      return {
        watermarkConfig: {
          width: 100, // 宽度
          padding: 4
        },
        files: [],
        isUploading: false,
        isShowDialog: false,
        imgFile: "",
        imgFileUrl: "",
        scale: 1, // 缩放比
        isImgWatermark: true, // 水印类型
        watermarkText: "新华财经日报财经客户端",
        watermarkPx: 12,
        watermarkColor: "rgba(205, 193, 193, 0.5)",
        watermarkPosition: "leftTop",
      }
    },
    methods: {
      act(files) {
        this.files = files;
        this.isShowDialog = true;
        this.imgFile = files[0];
        this.imgFileUrl = window.URL.createObjectURL(this.imgFile);
        this.$nextTick(() => {
          this.$refs.originImg.onload = this.drawOriginImgAndWatermark;
        });
      },

      onWaterMarkClose() {
        this.img = null;
        this.imgFileUrl = "";
        this.$nextTick(() => {
          this.isShowDialog = false;
        });
      },

      drawOriginImgAndWatermark() {
        // 画原始图
        let canvas = this.$refs.canvas;
        let ctx = canvas.getContext("2d");
        let img = this.$refs.originImg;

        let canvasWidth, canvasHeight;
        if (img.offsetWidth >= img.offsetHeight) {
          // 扁长
          this.scale = 400 / img.offsetWidth;
          canvasWidth = 400; // 定死400
          canvasHeight = img.offsetHeight * this.scale;
        } else {
          // 瘦高
          this.scale = 400 / img.offsetHeight;
          canvasHeight = 400;
          canvasWidth = img.offsetWidth * this.scale;
        }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        this.drawWatermark();
      },

      drawWatermark() {
        let canvas = this.$refs.canvas;
        let ctx = canvas.getContext("2d");
        if (this.isImgWatermark) {
          let watermarkImg = this.$refs.watermarkImg;
          let startX, startY;
          let dWidth = this.watermarkConfig.width * this.scale;
          let dHeight = (watermarkImg.height / watermarkImg.width) * dWidth;
          switch (this.watermarkPosition) {
            case "leftTop":
              startX = this.watermarkConfig.padding;
              startY = this.watermarkConfig.padding;
              break;
            case "leftBottom":
              startX = this.watermarkConfig.padding;
              startY = canvas.height - dHeight - this.watermarkConfig.padding;
              break;
            case "rightTop":
              startX = canvas.width - dWidth - this.watermarkConfig.padding;
              startY = this.watermarkConfig.padding;
              break;
            case "rightBottom":
              startX = canvas.width - dWidth - this.watermarkConfig.padding;
              startY = canvas.height - dHeight - this.watermarkConfig.padding;
              break;
            case "center":
              startX = (canvas.width - dWidth) / 2;
              startY = (canvas.height - dHeight) / 2;
              break;
          }
          ctx.drawImage(watermarkImg, startX, startY, dWidth, dHeight);
        } else {
          ctx.save();
          ctx.font = `${this.watermarkPx}px test`;
          ctx.fillStyle = this.watermarkColor;
          let textWidth = ctx.measureText(this.watermarkText).width;
          let startX, startY;
          switch (this.watermarkPosition) {
            case "leftTop":
              startX = this.watermarkConfig.padding;
              startY = this.watermarkConfig.padding + this.watermarkPx;
              break;
            case "leftBottom":
              startX = this.watermarkConfig.padding;
              startY = canvas.height - this.watermarkConfig.padding;
              break;
            case "rightTop":
              startX = canvas.width - this.watermarkConfig.padding - textWidth;
              startY = this.watermarkConfig.padding + this.watermarkPx;
              break;
            case "rightBottom":
              startX = canvas.width - this.watermarkConfig.padding - textWidth;
              startY = canvas.height - this.watermarkConfig.padding;
              break;
            case "center":
              startX = (canvas.width - textWidth) / 2;
              startY = (canvas.height) / 2;
              break;
          }
          ctx.fillText(this.watermarkText, startX, startY);
          ctx.restore();
        }
      },

      _uploadOneImgWithWatermarkPromise(file, resolve) {
        // 画完整的图
        let completeCanvas = document.createElement("canvas");
        let width = this.$refs.originImg.width;
        let height = this.$refs.originImg.height;
        completeCanvas.style.display = "none";
        completeCanvas.width = width;
        completeCanvas.height = height;
        document.body.append(completeCanvas);
        let ctx = completeCanvas.getContext("2d");
        let imgDom = document.createElement("img");
        imgDom.style.display = "none";
        document.body.append(imgDom);
        imgDom.src = window.URL.createObjectURL(file);
        imgDom.onload = async () => {
          ctx.drawImage(imgDom, 0, 0);
          if (this.isImgWatermark) {
            let watermarkImg = this.$refs.watermarkImg;
            let startX, startY;
            let dWidth = this.watermarkConfig.width;
            let dHeight = (watermarkImg.height / watermarkImg.width) * dWidth;
            switch (this.watermarkPosition) {
              case "leftTop":
                startX = this.watermarkConfig.padding;
                startY = this.watermarkConfig.padding;
                break;
              case "leftBottom":
                startX = this.watermarkConfig.padding;
                startY = completeCanvas.height - dHeight - this.watermarkConfig.padding;
                break;
              case "rightTop":
                startX = completeCanvas.width - dWidth - this.watermarkConfig.padding;
                startY = this.watermarkConfig.padding;
                break;
              case "rightBottom":
                startX = completeCanvas.width - dWidth - this.watermarkConfig.padding;
                startY = completeCanvas.height - dHeight - this.watermarkConfig.padding;
                break;
              case "center":
                startX = (completeCanvas.width - dWidth) / 2;
                startY = (completeCanvas.height - dHeight) / 2;
                break;
            }
            ctx.drawImage(watermarkImg, startX, startY, dWidth, dHeight);
          }
          if (!this.isImgWatermark) {
            ctx.save();
            ctx.font = `${this.watermarkPx}px test`;
            ctx.fillStyle = this.watermarkColor;
            let textWidth = ctx.measureText(this.watermarkText).width;
            let startX, startY;
            switch (this.watermarkPosition) {
              case "leftTop":
                startX = this.watermarkConfig.padding;
                startY = this.watermarkConfig.padding + this.watermarkPx;
                break;
              case "leftBottom":
                startX = this.watermarkConfig.padding;
                startY = completeCanvas.height - this.watermarkConfig.padding;
                break;
              case "rightTop":
                startX = completeCanvas.width - this.watermarkConfig.padding - textWidth;
                startY = this.watermarkConfig.padding + this.watermarkPx;
                break;
              case "rightBottom":
                startX = completeCanvas.width - this.watermarkConfig.padding - textWidth;
                startY = completeCanvas.height - this.watermarkConfig.padding;
                break;
              case "center":
                startX = (completeCanvas.width - textWidth) / 2;
                startY = (completeCanvas.height) / 2;
                break;
            }
            ctx.fillText(this.watermarkText, startX, startY);
            ctx.restore();
          }

          let dataURL = completeCanvas.toDataURL();
          let fileWithWatermark = this.$utils.gadgets.dataURLtoFile(dataURL, file.name);
          let path = await this.uploadFileToServer(fileWithWatermark);
          completeCanvas.remove();
          imgDom.remove();
          resolve(path);
        };

      },

      async uploadImgWithWatermark() {
        this.isUploading = true;
        Promise.all([...this.files].map(async file => this.uploadOneImgWithWatermark(file))).then(filesPath => {
          this.$message.success("上传成功");
          this.onSubmit(filesPath);
          this.$refs.waterMark.closeSelf();
        }).catch(err => {
          this.$message.error("上传失败:", err)
        }).finally(() => {
          this.isUploading = false;
        })
      },

      uploadOneImgWithWatermark(file) {
        return new Promise(resolve => {
          this._uploadOneImgWithWatermarkPromise(file, resolve)
        });
      },

      async uploadOriginImg() {
        // 上传原图
        this.isUploading = true;
        Promise.all([...this.files].map(async file => this.uploadFileToServer(file))).then(filesPath => {
          this.$message.success("上传成功");
          this.onSubmit(filesPath);
          this.$refs.waterMark.closeSelf();
        }).catch(err => {
          this.$message.error("上传失败:", err)
        }).finally(() => {
          this.isUploading = false;
        })
      },

      async uploadFileToServer(file) {
        let uploadFormData = new FormData();
        uploadFormData.append("file", file);
        let data = await this.$ajax.gadgets.uploadFileSync(uploadFormData, "/activity/upload");
        return data.url
      }
    }
  };

</script>

<style scoped lang="less">
  .water-mark-container {
    .water-mark-inner {
      display: flex;
      min-height: 300px;

      .img-container {
        width: 400px;
        height: 400px;
        overflow: hidden;
        margin-right: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        .watermark-canvas {
        }
      }

      .config-container {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .row {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          height: 40px;

          .label {
            width: 90px;
            margin-right: 10px;
          }

          .input-container {
            flex: 1;
            overflow: hidden;
          }
        }

        .bt-row {
          display: flex;
          margin-top: auto;
        }
      }
    }
  }

  .original-img {
    opacity: 0;
    position: fixed;
    left: -200%;
  }
</style>