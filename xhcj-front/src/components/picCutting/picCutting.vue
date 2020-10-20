<template>
  <div class="pic-cutting-container">
    <input type="file" ref="fileInput"
           class="file-input" accept=".jpg,.png,.jpeg"
           @change="onFileInputChange"
           v-if="twinkle"
    >
    <div class="upload-bt" @click="uploadFile">
      <i class="el-icon-upload"></i>
      <span>上传</span>
    </div>

    <dialogTemplate
        v-show="isShowCutting"
        :onClose="()=>isShowCutting = false"
        title="图片裁剪"
        :width="1040"
    >
      <div slot="foot"></div>
      <div class="file-cut-inner">
        <div class="origin-pic-container"
             ref="originPicContainer"
             @mousedown="onOriginMouseDown"
             @wheel="onOriginMouseWheel"
        >
          <img
              :src="imgFileUrl" alt=""
              crossOrigin="anonymous"
              class="origin-pic"
              :draggable="false"
              :style="{left:`${originPicPosition.x}px`,top:`${originPicPosition.y}px`,transform:`scale(${originPicPosition.scale})`}"
              ref="originImg"
          >
          <div class="origin-pic-mask-container">
            <div class="top"></div>
            <div class="mid" :style="{height:`${thumbnailSize.height}px`}">
              <div class="left"></div>
              <div class="mid-mid" :style="{width:`${thumbnailSize.width}px`}"></div>
              <div class="right"></div>
            </div>
            <div class="bottom"></div>
          </div>
        </div>
        <div class="thumbnail-container">
          <div class="thumbnail-inner"
               :style="{height:`${thumbnailSize.height}px`,width:`${thumbnailSize.width}px`}"
          >
            <canvas id="thumbnailCanvas" ref="canvas"></canvas>
          </div>

          <div class="operation-container">

            <div class="operation">
              <div class="label">偏移量X:</div>
              <div class="input-container">
                <el-input v-model="originPicPosition.x" type="number" size="mini" @input="onControlInput"></el-input>
              </div>
            </div>

            <div class="operation">
              <div class="label">偏移量Y:</div>
              <div class="input-container">
                <el-input v-model="originPicPosition.y" type="number" size="mini" @input="onControlInput"></el-input>
              </div>
            </div>

            <div class="operation">
              <div class="label">缩放值:</div>
              <div class="input-container">
                <el-input v-model="originPicPosition.scale" type="number" size="mini"
                          @input="onControlInput"></el-input>
              </div>
            </div>
          </div>
          <div class="submit-bt-container">
            <el-button type="primary" @click="submit">
              <i class="el-icon-loading" v-show="isUploading"></i>
              <span v-show="!isUploading">确认剪裁</span>
            </el-button>
            <el-button @click="cancelSubmit">
              <i class="el-icon-loading" v-show="isUploading"></i>
              <span v-show="!isUploading"> {{ origin==="upload"?"上传原图":"使用原图" }}</span>
            </el-button>
          </div>

        </div>
      </div>
    </dialogTemplate>
  </div>
</template>

<script>
  // TODO: 不要重复获取canvasDom 也许会影响性能?
  export default {
    name: "picCutting",
    props: {
      proportion: {
        default: "16:9"
      },
      maxSize: {
        default: 0
      },
      uploadPath: {
        default: ""
      }
    },
    data() {
      return {
        isShowCutting: false,
        imgFile: null, // 图片对象
        imgFileUrl: "", // 图片构建的地址
        isOriginPicMoving: false, // 原始图是否在移动
        originPicPosition: {
          x: 0,
          y: 0,
          scale: 1
        },
        thumbnailSize: {
          width: 250,
          height: 250
        },
        ctx: null,
        twinkle: true,
        isUploading: false, // 是否在上传
        origin: "upload", // 文件的来源 upload: 用户上传 network: 外部传入
        networkFileName: "", // 文件来自外部时,存储文件名
      }
    },
    mounted() {
      document.addEventListener("mouseup", this.onOriginMouseUp);
      document.addEventListener("mousemove", this.onOriginMouseMove);
      this.handleProportion();
    },
    beforeDestroy() {
      document.removeEventListener("mouseup", this.onOriginMouseUp);
      document.removeEventListener("mousemove", this.onOriginMouseMove);
    },
    methods: {

      cuttingPicFromUrl(url, fileName) {
        // 由外部调用
        this.origin = "network";
        this.imgFileUrl = url;
        this.isShowCutting = true;
        this.networkFileName = fileName;
      },

      handleProportion() {
        let proportionList = this.proportion.split(":");
        if (!Array.isArray(proportionList) || proportionList.length <= 1) return;
        let x = parseInt(proportionList[0]);
        let y = parseInt(proportionList[1]);
        if (x <= y) {
          this.thumbnailSize.width = this.thumbnailSize.width * (x / y);
        } else {
          this.thumbnailSize.height = this.thumbnailSize.height * (y / x);
        }
      },

      uploadFile() {
        this.$refs.fileInput.click();
      },

      onFileInputChange() {
        let file = this.$refs.fileInput.files[0];
        if (this.maxSize && file.size > this.maxSize) {
          this.$message.error(`最大支持上传${(this.maxSize / 1000).toFixed(0)}KB的图片`);
          return
        }

        this.origin = "upload";
        this.imgFile = file;
        this.imgFileUrl = window.URL.createObjectURL(this.imgFile);
        this.isShowCutting = true;
        this.twinkle = false;

        this.$nextTick(() => {
          this.$refs.originImg.onload = this.drawThumbnail;
          this.twinkle = true;
        })
      },

      onOriginMouseDown() {
        this.isOriginPicMoving = true;
      },

      onOriginMouseUp() {
        this.isOriginPicMoving = false;
      },

      onOriginMouseMove(event) {
        if (!this.isOriginPicMoving) return;
        this.originPicPosition.x = (this.originPicPosition.x || 0) + event.movementX;
        this.originPicPosition.y = (this.originPicPosition.y || 0) + event.movementY;
        this.drawThumbnail();
      },

      onOriginMouseWheel(event) {
        let deltaY = event.deltaY;
        if (deltaY > 0) {
          this.originPicPosition.scale = (this.originPicPosition.scale || 1) * 0.9;
        }
        if (deltaY < 0) {
          this.originPicPosition.scale = (this.originPicPosition.scale || 1) * 1.1;
        }

        if (this.originPicPosition.scale.toString().length > 4) {
          this.originPicPosition.scale = this.originPicPosition.scale.toFixed(2);
        }

        this.drawThumbnail();
      },

      onControlInput() {
        this.originPicPosition.x = parseInt(this.originPicPosition.x);
        this.originPicPosition.y = parseInt(this.originPicPosition.y);
        if (this.originPicPosition.scale.length > 4) {
          this.originPicPosition.scale = this.originPicPosition.scale.substr(0, 4)
        }
        this.originPicPosition.scale = parseFloat(this.originPicPosition.scale);
        this.drawThumbnail();
      },

      drawThumbnail() {
        let canvas = this.$refs.canvas;
        this.ctx = this.ctx || canvas.getContext("2d");
        canvas.width = this.thumbnailSize.width;
        canvas.height = this.thumbnailSize.height;
        let img = this.$refs.originImg;

        let originPicContainer = this.$refs.originPicContainer;
        let sx = ((originPicContainer.offsetWidth - this.thumbnailSize.width) / 2 - (this.originPicPosition.x || 0)) / (this.originPicPosition.scale || 1); // 图片起始横坐标
        let sy = ((originPicContainer.offsetHeight - this.thumbnailSize.height) / 2 - this.originPicPosition.y || 0) / (this.originPicPosition.scale || 1); // 图片起始纵坐标
        let sWidth = this.thumbnailSize.width / (this.originPicPosition.scale || 1);
        let sHeight = this.thumbnailSize.height / (this.originPicPosition.scale || 1);

        this.ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, this.thumbnailSize.width, this.thumbnailSize.height);
      },

      async submit() {
        if (this.isUploading) return;

        let fileName = "";

        if (this.origin === "upload") {
          fileName = this.imgFile.name
        }

        if (this.origin === "network") {
          fileName = this.networkFileName || "empty"
        }

        let completeCanvas = this.getCompleteCanvas();
        // this.$utils.gadgets.downloadCanvas(completeCanvas, "abc");
        let dataURL = completeCanvas.toDataURL();
        let file = this.$utils.gadgets.dataURLtoFile(dataURL, fileName);
        let path = await this.uploadFileToServer(file);
        this.$emit('input', path);
        this.isShowCutting = !path;
        completeCanvas.remove();
      },

      getCompleteCanvas() {
        // 画完整的图
        let completeCanvas = document.createElement("canvas");
        let width = this.thumbnailSize.width / this.originPicPosition.scale;
        let height = this.thumbnailSize.height / this.originPicPosition.scale;

        completeCanvas.style.display = "none";
        completeCanvas.width = width;
        completeCanvas.height = height;
        document.body.append(completeCanvas);

        let ctx = completeCanvas.getContext("2d");
        let originPicContainer = this.$refs.originPicContainer;

        let dx = 0;
        let dy = 0; // 从新canvas的(0,0)开始画
        let dWidth = width;
        let dHeight = height; // 所画的宽高,就是画布的宽高
        let sx = ((originPicContainer.offsetWidth - this.thumbnailSize.width) / 2 - (this.originPicPosition.x || 0)) / (this.originPicPosition.scale || 1); // 图片起始横坐标
        let sy = ((originPicContainer.offsetHeight - this.thumbnailSize.height) / 2 - this.originPicPosition.y || 0) / (this.originPicPosition.scale || 1); // 图片起始纵坐标

        // 1:1绘制
        ctx.drawImage(this.$refs.originImg, sx, sy, width, height, dx, dy, dWidth, dHeight);
        return completeCanvas
      },

      async cancelSubmit() {
        if (this.isUploading) return;
        let path;

        if (this.origin === "upload") {
          path = await this.uploadFileToServer(this.imgFile);
        }

        if (this.origin === "network") {
          path = this.imgFileUrl
        }

        this.$emit('input', path);
        this.isShowCutting = !path;
      },

      async uploadFileToServer(file) {
        this.isUploading = true;
        let uploadFormData = new FormData();
        uploadFormData.append("file", file);
        let data = await this.$ajax.gadgets.uploadFileSync(uploadFormData, this.uploadPath);
        let path = data.url;
        this.isUploading = false;
        if (!path) {
          this.$message.error("上传失败")
        } else {
          this.$message.success("上传成功");
        }
        return path
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/config";
  @import "../../style/styles";

  .pic-cutting-container {
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


    .file-cut-inner {
      width: 100%;
      height: 600px;
      background-color: white;
      position: relative;
      display: flex;
      padding: 0 65px;

      .close-icon {
        font-size: 30px;
        color: white;
        position: absolute;
        top: -@defaultPaddingY - 30px;
        right: 0;
        cursor: pointer;
      }

      .origin-pic-container {
        flex: 3;
        overflow: hidden;
        border: 1px solid @defaultBorderColor;
        margin-right: 10px;
        position: relative;
        cursor: move;
        user-select: none;

        .origin-pic {
          position: relative;
          transform-origin: 0 0 0;
        }

        .origin-pic-mask-container {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 40;
          pointer-events: none;
          display: flex;
          flex-direction: column;

          .mid {
            display: flex;

            .mid-mid {
              border: 1px white dashed;
              box-sizing: content-box;
            }

            .left, .right {
              flex: 1;
              overflow: hidden;
              flex-shrink: 0;
              background-color: rgba(0, 0, 0, 0.4);
            }
          }

          .top, .bottom {
            flex: 1;
            overflow: hidden;
            flex-shrink: 0;
            background-color: rgba(0, 0, 0, 0.4);
          }
        }
      }

      .thumbnail-container {
        flex: 2;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;

        .operation-container {
          flex: 1;
          overflow: hidden;
          flex-direction: column;
          justify-content: center;
          padding-top: 20px;
          width: 250px;

          .operation {
            display: flex;
            align-items: center;
            width: 140px;
            margin-right: 20px;
            margin-bottom: 20px;

            .label {
              width: 60px;
              margin-right: 10px;
              text-align: right;
            }

            .input-container {
              flex: 1;
              overflow: hidden;
            }
          }
        }

        .thumbnail-inner {
          margin-bottom: 10px;
          border: 1px solid @defaultBorderColor;
          box-sizing: content-box;
          overflow: hidden;

          #thumbnailCanvas {
            width: 100%;
            height: 100%;
          }
        }

        .submit-bt-container {
          width: 250px;
        }
      }
    }
  }

  .file-input {
    display: none;
  }
</style>

<style lang="less">
  .pic-cutting-container {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
  }
</style>
