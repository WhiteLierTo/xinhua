<template>
  <div class="pre-view-container">
    <dialogTemplate
        v-if="isShow"
        :onClose="closeDialog"
        title="预览"
        width="600"
    >
      <div>
        <div class="row">
          <div class="label">电脑端预览:</div>
          <a :href="pcUrl" target="_blank">{{ pcUrl }}</a>
          <span class="copy-text" @click="copy">[复制]</span>
          <span class="copy-text" @click="H5Preview">[H5预览]</span>
        </div>
        <div class="row">
          <div class="label">手机端预览:</div>
          <div class="qr-code-container">
            <canvas ref="QRCanvas"></canvas>
            <p>使用微信或新华日报财经APP扫描</p>
          </div>
        </div>
      </div>
      <div slot="foot"></div>
    </dialogTemplate>
  </div>
</template>

<script>
  import QRCode from "qrcode"

  export default {
    name: "preview",
    props: {
      url: {
        type: String,
        default: "http://www.wahaha.com"
      },
      onClose: Function
    },
    data() {
      return {
        isShow: true
      }
    },
    computed: {
      pcUrl() {
        return this.url.replace(new RegExp("//", "gim"), "/").replace(new RegExp("http:/", "gim"), "http://").replace(new RegExp("https:/", "gim"), "https://");
      },
      mobUrl() {
        let urlCutList = this.pcUrl.split("?");
        return `${urlCutList[0]}-mob?${urlCutList[1]}`
      }
    },
    mounted() {
      this.drawQR();
    },
    methods: {
      closeDialog() {
        this.isShow = false;
        this.onClose && (this.onClose())
      },

      copy() {
        let inputDom = document.createElement("input");
        inputDom.value = this.pcUrl;
        inputDom.style.position = "fixed";
        inputDom.style.left = "-1000px";
        document.body.appendChild(inputDom);
        inputDom.select();
        document.execCommand("Copy");
        inputDom.remove();
        this.$message.success("复制成功");
      },

      drawQR() {
        QRCode.toCanvas(this.$refs.QRCanvas, this.pcUrl, {
          width: 128,
          height: 128,
          margin: 1
        });
      },

      H5Preview() {
        let url;
        if (this.pcUrl.includes("?")) {
          if (this.pcUrl.endsWith("&")) {
            url = `${this.pcUrl}isPreview=1`
          } else {
            url = `${this.pcUrl}&isPreview=1`
          }
        } else {
          url = `${this.pcUrl}`
        }
        window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, width=414, height=736");
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/config";
  @import "../../style/styles";

  .pre-view-container {
    .row {
      display: flex;
      margin-bottom: 40px;

      .label {
        width: 100px;
        margin-right: 10px;
        flex-shrink: 0;
      }

      a {
        word-break: break-all;
      }

      .copy-text {
        margin-left: 20px;
        color: @defaultBlueClick;
        cursor: pointer;
        flex-shrink: 0;
      }

      .qr-code-container {
        display: flex;
        flex-direction: column;
        align-items: center;


        canvas {
          width: 128px;
          height: 128px;
          margin-bottom: 10px;
        }

        p {
          color: #E4A33D;
          letter-spacing: 1px;
          font-weight: 300;
        }
      }
    }
  }
</style>
