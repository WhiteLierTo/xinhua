<template>
  <div class="share-wx-container">
    <img src="../../assets/other/share_Wechat@2x.png" alt="">
    <div class="qr-code-container">
      <canvas class="qr-canvas" ref="QRCanvas"></canvas>
      <p>扫一扫分享到微信</p>
    </div>
  </div>
</template>

<script>
  import QRCode from "qrcode";

  export default {
    name: "shareWx",
    props: {
      path: {
        type: String,
      },
    },

    mounted() {
      if (process.client) {
        this.drawQR()
      }
    },
    methods: {
      drawQR(row) {

        QRCode.toCanvas(this.$refs.QRCanvas, this.path || location.href, {
          width: 160,
          height: 160,
          margin: 1
        });
      },
    }
  }
</script>

<style scoped lang="less">
  .share-wx-container {
    width: 32px;
    height: 32px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .qr-code-container {
      width: 180px;
      padding: 10px;
      background: #ffffff;
      box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
      border: solid 1px #cccccc;
      position: absolute;
      top: 100%;
      margin-top: 13px;
      right: 0;
      display: none;
      z-index: 999999;

      &:after {
        content: "";
        transform: rotate(-45deg);
        top: -5px;
        background: #fff;
        border-right: 1px solid #ccc;
        border-top: 1px solid #ccc;
        width: 8px;
        height: 8px;
        right: 12px;
        position: absolute;
      }

      .qr-canvas {
        width: 100%;
        height: 160px;
      }

      p {
        width: 100%;
        text-align: center;
        color: #222;
        font-weight: 300;
      }
    }

    &:hover {
      .qr-code-container {
        display: block;
      }
    }
  }
</style>
