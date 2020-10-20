<template>
  <div class="pic-cutting-container">
    <input
      type="file"
      ref="fileInput"
      class="file-input"
      accept=".jpg, .png, .jpeg"
      @change="onFileInputChange"
      v-if="twinkle"
    />
    <div class="upload-bt" @click="uploadFile">
      <i class="el-icon-upload"></i>
      <span>上传</span>
    </div>

    <dialogTemplate
      v-show="isShowCutting"
      :onClose="()=>isShowCutting = false"
      title="图片裁剪"
      :width="picWidth + 40"
    >
      <div class="foot-container" slot="foot">
        <div style="display:flex;align-items: center;">
          <span style="margin-right:10px;position:relative;top:-1px">不透明度:</span>
          <el-slider v-model="opticleValue" style="width:200px"></el-slider>
        </div>
        <el-button type="primary" @click="submit" style="margin-left:auto">
          <i class="el-icon-loading" v-show="isUploading"></i>
          <span v-show="!isUploading">确认剪裁</span>
        </el-button>
        <el-button @click="submitCustomaryPic">
          <i class="el-icon-loading" v-show="isUploading"></i>
          <span v-show="!isUploading">上传原图</span>
        </el-button>
      </div>
      <div class="file-cut-inner" :style="{height:`${picHeight}px`,width:`${picWidth}px`}">
        <img ref="originImg" class="origin-img" :src="imgFileUrl" :draggable="false" />

        <div class="origin-pic-mask-container">
          <div
            class="top"
            :style="{height:`${thumbnailBoxInfo.top}px`,background: `rgba(0, 0, 0,${opticleValue / 100})`}"
          ></div>
          <div class="mid">
            <div
              class="left"
              :style="{width:`${thumbnailBoxInfo.left}px`,background: `rgba(0, 0, 0,${opticleValue / 100})`}"
            ></div>
            <div class="mid-mid">
              <div class="mid-mid-top" @mousedown="isDragTop = true"></div>
              <div class="mid-mid-bottom" @mousedown="isDragBottom = true"></div>
              <div class="mid-mid-left" @mousedown="isDragLeft = true"></div>
              <div class="mid-mid-right" @mousedown="isDragRight = true"></div>
              <div class="mid-mid-center" @mousedown="startMove"></div>
            </div>
            <div
              class="right"
              :style="{width:`${picWidth - thumbnailBoxInfo.left - thumbnailBoxInfo.width}px`,background: `rgba(0, 0, 0,${opticleValue / 100})`}"
            ></div>
          </div>
          <div
            class="bottom"
            :style="{height:`${picHeight - thumbnailBoxInfo.top - thumbnailBoxInfo.height}px`,background: `rgba(0, 0, 0,${opticleValue / 100})`}"
          ></div>
        </div>
      </div>
    </dialogTemplate>
  </div>
</template>

<script>
// TODO 智能选择左上角
export default {
  props: {
    proportion: {
      default: "16:9",
    },
    maxSize: {
      default: 0,
    },
    uploadPath: {
      default: "",
    },
  },
  data() {
    return {
      picHeight: 450, // 图片裁剪区域的高度
      picWidth: 900, // 图片裁剪区的宽度
      isPicMoving: false, // 是否正在移动裁剪框
      isDragTop: false, // 是否正在往上拽
      isDragBottom: false, // 是否正在往下拽
      isDragLeft: false, // 是否正在往左拽
      isDragRight: false, // 是否正在往右拽
      isShowCutting: false,
      twinkle: true,
      proportionMark: {
        width: 400,
        height: 400,
      },

      thumbnailBoxInfo: {
        width: 400,
        height: 400,
        left: 0,
        top: 0,
      },

      imgFile: null, // 图片对象
      imgFileUrl: "", // 图片构建的地址
      isUploading: false, // 是否在上传

      opticleValue: 50, // 不透明度
    };
  },

  mounted() {
    document.addEventListener("mouseup", this.endMove);
    document.addEventListener("mousemove", this.onMove);
    this.handleProportion();
  },

  beforeDestroy() {
    document.removeEventListener("mouseup", this.endMove);
    document.removeEventListener("mousemove", this.onMove);
  },

  methods: {
    // 图片框逻辑
    startMove() {
      this.isPicMoving = true;
    },

    endMove() {
      this.isPicMoving = false;
      this.isDragTop = false;
      this.isDragBottom = false;
      this.isDragLeft = false;
      this.isDragRight = false;
    },

    onMove(event) {
      if (this.isPicMoving) {
        this.onPicMove(event);
        return;
      }

      if (this.isDragTop) {
        this.onDragTop(event);
        return;
      }

      if (this.isDragBottom) {
        this.onDragBottom(event);
        return;
      }

      if (this.isDragLeft) {
        this.onDragLeft(event);
        return;
      }

      if (this.isDragRight) {
        this.onDragRight(event);
        return;
      }
    },

    onPicMove(event) {
      this.thumbnailBoxInfo.left =
        (this.thumbnailBoxInfo.left || 0) + event.movementX;
      this.thumbnailBoxInfo.top =
        (this.thumbnailBoxInfo.top || 0) + event.movementY;
      this._validateThumbnailBoxInfo();
    },

    onDragTop(event) {
      if (this.thumbnailBoxInfo.top <= 0 && event.movementY <= 0) {
        // 最上面了 不能往上拽了
        return;
      }

      if (this.thumbnailBoxInfo.height <= 30 && event.movementY >= 0) {
        // 高度很低但不是往上拉的
        return;
      }

      // 目标高度
      let targetHeight = this.thumbnailBoxInfo.height - event.movementY;
      // 目标宽度
      let targetWidth = this._getWidthByHeight(targetHeight);

      if (targetWidth <= 30 || targetWidth > this.picWidth) {
        // 如果拉伸之后导致宽度异常,不操作
        return;
      }

      this.thumbnailBoxInfo.height = targetHeight;
      this.thumbnailBoxInfo.top += event.movementY;
      this.chageWidthByHeight();
    },

    onDragBottom(event) {
      if (
        this.thumbnailBoxInfo.top >=
          this.picHeight - this.thumbnailBoxInfo.height &&
        event.movementY >= 0
      ) {
        // 最下面了,不能往下拽了
        return;
      }

      if (this.thumbnailBoxInfo.height <= 30 && event.movementY <= 0) {
        // 高度很低但不是往上拉的
        return;
      }
      // 目标高度
      let targetHeight = this.thumbnailBoxInfo.height + event.movementY;
      // 目标宽度
      let targetWidth = this._getWidthByHeight(targetHeight);
      if (targetWidth <= 30 || targetWidth > this.picWidth) {
        // 如果拉伸之后导致宽度异常,不操作
        return;
      }

      this.thumbnailBoxInfo.height = targetHeight;
      this.chageWidthByHeight();
    },

    onDragLeft(event) {
      if (this.thumbnailBoxInfo.left <= 0 && event.movementX <= 0) {
        // 最左面了 不能往左拽了
        return;
      }
      if (this.thumbnailBoxInfo.width <= 30 && event.movementY >= 0) {
        // 宽度很窄但不是往左拉的
        return;
      }

      let targetWidth = this.thumbnailBoxInfo.width - event.movementX;
      let targetHeight = this._getHeightByWidth(targetWidth);
      if (targetHeight <= 30 || targetHeight > this.picHeight) {
        return;
      }

      this.thumbnailBoxInfo.width = targetWidth;
      this.thumbnailBoxInfo.left += event.movementX;
      this.chageHeightByWidth();
    },

    onDragRight(event) {
      if (
        this.thumbnailBoxInfo.left >=
          this.picWidth - this.thumbnailBoxInfo.width &&
        event.movementX >= 0
      ) {
        // 最右面了 不能往右拽了
        return;
      }
      if (this.thumbnailBoxInfo.width <= 30 && event.movementY <= 0) {
        // 宽度很窄但不是往右拉的
        return;
      }

      let targetWidth = this.thumbnailBoxInfo.width + event.movementX;
      let targetHeight = this._getHeightByWidth(targetWidth);
      if (targetHeight <= 30 || targetHeight > this.picHeight) {
        return;
      }

      this.thumbnailBoxInfo.width = targetWidth;
      this.chageHeightByWidth();
    },

    chageWidthByHeight() {
      // 根据高度改变宽度
      let targetWidth = this._getWidthByHeight(this.thumbnailBoxInfo.height);
      this.thumbnailBoxInfo.width = targetWidth;
      // 处理超出的部分
      if (targetWidth + this.thumbnailBoxInfo.left > this.picWidth) {
        this.thumbnailBoxInfo.left = this.picWidth - targetWidth;
      }
    },

    _getWidthByHeight(h) {
      // 根据高度获取宽度
      return h * (this.proportionMark.width / this.proportionMark.height);
    },

    chageHeightByWidth() {
      let targetHeight = this._getHeightByWidth(this.thumbnailBoxInfo.width);
      this.thumbnailBoxInfo.height = targetHeight;
      if (targetHeight + this.thumbnailBoxInfo.top > this.picHeight) {
        this.thumbnailBoxInfo.top = this.picHeight - targetHeight;
      }
    },

    _getHeightByWidth(w) {
      return w * (this.proportionMark.height / this.proportionMark.width);
    },

    _validateThumbnailBoxInfo() {
      this.thumbnailBoxInfo.left = Math.max(0, this.thumbnailBoxInfo.left);
      this.thumbnailBoxInfo.left = Math.min(
        this.picWidth - this.thumbnailBoxInfo.width,
        this.thumbnailBoxInfo.left
      );

      this.thumbnailBoxInfo.top = Math.max(0, this.thumbnailBoxInfo.top);
      this.thumbnailBoxInfo.top = Math.min(
        this.picHeight - this.thumbnailBoxInfo.height,
        this.thumbnailBoxInfo.top
      );
    },

    handleProportion() {
      let proportionList = this.proportion.split(":");
      if (!Array.isArray(proportionList) || proportionList.length <= 1) return;
      let x = parseInt(proportionList[0]);
      let y = parseInt(proportionList[1]);
      if (x <= y) {
        this.thumbnailBoxInfo.width = this.thumbnailBoxInfo.height * (x / y);
      } else {
        this.thumbnailBoxInfo.height = this.thumbnailBoxInfo.width * (y / x);
      }
      this.proportionMark.width = x;
      this.proportionMark.height = y;
    },

    // 上传逻辑
    uploadFile() {
      this.$refs.fileInput.click();
    },

    onFileInputChange() {
      let file = this.$refs.fileInput.files[0];
      if (this.maxSize && file.size > this.maxSize) {
        this.$message.error(
          `最大支持上传${(this.maxSize / 1000).toFixed(0)}KB的图片`
        );
        return;
      }

      this.imgFile = file;
      this.imgFileUrl = window.URL.createObjectURL(this.imgFile);
      this.isShowCutting = true;
      this.twinkle = false;

      this.$nextTick(() => {
        this.twinkle = true;
      });
    },

    async submit() {
      if (this.isUploading) return;

      let fileName = this.imgFile.name;

      let completeCanvas = this.getCompleteCanvas();
      let dataURL = completeCanvas.toDataURL();
      let file = this.$utils.gadgets.dataURLtoFile(dataURL, fileName);
      let path = await this.uploadFileToServer(file);
      this.$emit("input", path);
      this.isShowCutting = !path;
      completeCanvas.remove();
    },

    getCompleteCanvas() {
      // 画完整的图
      const imageDom = new Image();
      imageDom.src = this.imgFileUrl;

      // 图片的真实宽高
      let imgWidth = imageDom.width;
      let imgHeight = imageDom.height;
      let isSquash = imgWidth / imgHeight > this.picWidth / this.picHeight; // 图片是否是被"压扁"的
      const sx = this._getSx(isSquash, imgWidth, imgHeight);
      const sy = this._getSy(isSquash, imgWidth, imgHeight);
      const sWidth = this._getSWidth(isSquash, imgWidth, imgHeight);
      const sHeight = this._getSHeight(isSquash, imgWidth, imgHeight);
      const dx = this._getDx(isSquash, imgWidth, imgHeight);
      const dy = this._getDy(isSquash, imgWidth, imgHeight);
      const dWidth = sWidth;
      const dHeight = sHeight;

      let completeCanvas = document.createElement("canvas");
      completeCanvas.style.display = "none";
      if (isSquash) {
        // 在压扁模式下,宽度被充满,以宽为标准计算裁剪后的图
        completeCanvas.width =
          this.thumbnailBoxInfo.width * (imgWidth / this.picWidth);
        completeCanvas.height = this._getHeightByWidth(completeCanvas.width);
      } else {
        // 在拉伸模式下,以高为标准定
        completeCanvas.height =
          this.thumbnailBoxInfo.height * (imgHeight / this.picHeight);
        completeCanvas.width = this._getWidthByHeight(completeCanvas.height);
      }
      document.body.append(completeCanvas);
      let ctx = completeCanvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, completeCanvas.width, completeCanvas.height);
      ctx.drawImage(imageDom, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      imageDom.remove();
      return completeCanvas;
    },

    _getSx(isSquash, imgWidth, imgHeight) {
      let gap;
      if (isSquash) {
        // 在压扁模式下,横向铺满,无gap
        gap = 0;
      } else {
        // 左右有空隙,先计算空隙宽度
        let showWidth = this.picHeight * (imgWidth / imgHeight); // 显示在屏幕上的图片宽度
        gap = (this.picWidth - showWidth) / 2; // 两侧空隙宽度
      }
      // 不要为负数了,这部分在dx处找回
      let sx = Math.max(0, this.thumbnailBoxInfo.left - gap);
      return sx * (imgWidth / this.picWidth);
    },

    _getDx(isSquash, imgWidth, imgHeight) {
      let gap;
      if (isSquash) {
        // 在压扁模式下,横向铺满,无gap
        gap = 0;
      } else {
        // 左右有空隙,先计算空隙宽度
        let showWidth = this.picHeight * (imgWidth / imgHeight); // 显示在屏幕上的图片宽度
        gap = (this.picWidth - showWidth) / 2; // 两侧空隙宽度
      }
      if (this.thumbnailBoxInfo.left < gap) {
        // 左侧有空隙 此时必定是拉伸模式,以高度计算
        return (
          (gap - this.thumbnailBoxInfo.left) * (imgHeight / this.picHeight)
        );
      }
      // 左侧无空隙
      return 0;
    },

    _getSy(isSquash, imgWidth, imgHeight) {
      // 图片在自身的其实纵坐标
      let gap;
      if (!isSquash) {
        // 在拉伸模式下,图"瘦长"横向铺满,无gap
        gap = 0;
      } else {
        // 左右有空隙,先计算空隙宽度
        let showHeight = this.picWidth * (imgHeight / imgWidth); // 显示在屏幕上的图片高度
        gap = (this.picHeight - showHeight) / 2; // 左侧空隙宽度
      }
      let sy = Math.max(0, this.thumbnailBoxInfo.top - gap);
      return sy * (imgHeight / this.picHeight);
    },

    _getDy(isSquash, imgWidth, imgHeight) {
      let gap;
      if (!isSquash) {
        // 在拉伸模式下,图"瘦长"横向铺满,无gap
        gap = 0;
      } else {
        // 左右有空隙,先计算空隙宽度
        let showHeight = this.picWidth * (imgHeight / imgWidth); // 显示在屏幕上的图片高度
        gap = (this.picHeight - showHeight) / 2; // 左侧空隙宽度
      }

      if (this.thumbnailBoxInfo.top < gap) {
        // 上侧有空隙, 此时必是拉伸模式
        return (gap - this.thumbnailBoxInfo.top) * (imgWidth / this.picWidth);
      }
      // 左侧无空隙
      return 0;
    },

    _getSWidth(isSquash, imgWidth, imgHeight) {
      let showWidth;
      let gap;
      if (isSquash) {
        // 在压扁模式下 宽的比例是正常的,因为picWidth被全部用上了
        showWidth = this.picWidth;
        gap = 0;
      } else {
        // 在拉伸模式下,宽度没有被全部用上
        showWidth = this.picHeight * (imgWidth / imgHeight); // 显示在屏幕上的图片宽度
        gap = (this.picWidth - showWidth) / 2;
      }

      // 计算图片选框里图片的宽度
      const gapLeft = Math.max(0, gap - this.thumbnailBoxInfo.left); // 左侧超出部分
      const gaoRight = Math.max(
        0,
        gap -
          (this.picWidth -
            this.thumbnailBoxInfo.left -
            this.thumbnailBoxInfo.width)
      ); // 右侧超出部分
      const widthInBox = this.thumbnailBoxInfo.width - gapLeft - gaoRight; // 图片选框里的宽度
      return widthInBox * (imgWidth / showWidth);
    },

    _getSHeight(isSquash, imgWidth, imgHeight) {
      let showHeight;
      let gap;
      if (!isSquash) {
        showHeight = this.picHeight;
        gap = 0;
      } else {
        // 在压扁模式下,高度没有没全部用上
        showHeight = this.picWidth * (imgHeight / imgWidth); // 显示在屏幕上的图片高度
        gap = (this.picHeight - showHeight) / 2;
      }

      const gapTop = Math.max(0, gap - this.thumbnailBoxInfo.top);
      const gapBottom = Math.max(
        0,
        gap -
          (this.picHeight -
            this.thumbnailBoxInfo.top -
            this.thumbnailBoxInfo.height)
      );
      const heightInBox = this.thumbnailBoxInfo.height - gapTop - gapBottom;

      return heightInBox * (imgHeight / showHeight);
    },

    async submitCustomaryPic() {
      if (this.isUploading) return;
      let path = await this.uploadFileToServer(this.imgFile);

      this.$emit("input", path);
      this.isShowCutting = !path;
    },

    async uploadFileToServer(file) {
      this.isUploading = true;
      let uploadFormData = new FormData();
      uploadFormData.append("file", file);
      let data = await this.$ajax.gadgets.uploadFileSync(
        uploadFormData,
        this.uploadPath
      );
      let path = data.url;
      this.isUploading = false;
      if (!path) {
        this.$message.error("上传失败");
      } else {
        this.$message.success("上传成功");
      }
      return path;
    },
  },
};
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
    background-color: white;
    position: relative;
    margin-bottom: 10px;

    .origin-img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      position: relative;
      z-index: 10;
      background: rgba(0, 0, 0, 0.2);
    }

    .origin-pic-mask-container {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 40;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      user-select: none;

      .mid {
        display: flex;
        flex: 1;

        .mid-mid {
          border: 1px rgba(255, 255, 255, 0.5) dashed;
          box-sizing: content-box;
          flex: 1;
          padding: 6px;
          position: relative;

          .mid-mid-center {
            width: 100%;
            height: 100%;
            cursor: move;
          }

          .mid-mid-top,
          .mid-mid-bottom {
            width: 100%;
            height: 4px;
            position: absolute;
            left: 0;
            cursor: n-resize;
          }

          .mid-mid-top {
            top: -3px;
          }

          .mid-mid-bottom {
            bottom: -3px;
          }

          .mid-mid-left,
          .mid-mid-right {
            width: 4px;
            position: absolute;
            top: 1px;
            bottom: 1px;
            cursor: w-resize;
          }

          .mid-mid-left {
            left: -3px;
          }

          .mid-mid-right {
            right: -3px;
          }
        }

        .left,
        .right {
          overflow: hidden;
          flex-shrink: 0;
        }
      }

      .top,
      .bottom {
        overflow: hidden;
        flex-shrink: 0;
      }
    }
  }
}

.file-input {
  display: none;
}

.foot-container {
  display: flex;
  width: 100%;
  align-items: center;
}
</style>