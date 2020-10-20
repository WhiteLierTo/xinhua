<template>
  <div class="tooltips-container" :class="{hiding:isWillHideTooltips}" v-if="isShowTooltips">
    <div class="tooltip-container">
      <i class="fa fa-qrcode" aria-hidden="true"></i>
      <div class="qr-dialog-container">
        <img src="../../assets/index/XH1-2Qrcode@2x.png" alt="">
        <span>扫一扫下载新华日报财经APP</span>
      </div>
    </div>
    <div class="tooltip-container" @click="goUp">
      <i class="fa fa-angle-up" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "xh-tooltips",
    data() {
      return {
        isShowTooltips: false, // 是否显示两个地图钉
        isWillHideTooltips: false, // 是否开启关闭动画
        tooltipHideTimer: -1, // 将要关闭tooltip的timer
      }
    },
    mounted() {
      if (!process.client) return;

      if ((document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop) >= 500) {
        this.isShowTooltips = true;
      }
      document.addEventListener("scroll", () => {
        let scrollTop = (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop);
        let limit = process.isMob ? 240 : 500;
        // 以 500 为界
        if (scrollTop >= limit && (!this.isShowTooltips || this.isWillHideTooltips)) {
          clearTimeout(this.tooltipHideTimer);
          this.isWillHideTooltips = false;
          this.isShowTooltips = true;
        }

        if (scrollTop < limit && this.isShowTooltips && !this.isWillHideTooltips) {
          this.isWillHideTooltips = true;
          this.tooltipHideTimer = setTimeout(() => {
            this.isWillHideTooltips = false;
            this.isShowTooltips = false;
          }, 1000)
        }

      })
    },

    methods: {
      goUp() {
        let option = {
          top: 0,
          left: 0,
        };
        if (!process.isMob) {
          option.behavior = "smooth"
        }

        window.scrollTo(option);
      },
    }
  }
</script>

<style scoped lang="less">
  .tooltips-container {
    position: fixed;
    right: 30px;
    bottom: 200px;
    width: 40px;
    animation: show 0.8s forwards;
    z-index: 30;

    .tooltip-container {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      background: #d6d6d6;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-size: 22px;
      cursor: pointer;
      transition: all 0.4s;
      margin-top: 5px;
      position: relative;

      .qr-dialog-container {
        position: absolute;
        right: 60px;
        width: 200px;
        padding: 15px;
        background-image: linear-gradient(139deg, rgba(22, 198, 255, 0.8), rgba(0, 114, 255, 0.8));
        display: none;
        border-radius: 2px;

        img {
          width: 100%;
        }

        span {
          font-size: 12px;
          word-break: keep-all;
        }
      }

      &:hover .qr-dialog-container {
        display: block;
      }

      &:hover {
        background: #c2c2c2;
      }
    }
  }

  .hiding {
    animation: hide 0.8s forwards;
  }

  .mob {
    right: 0.1rem !important;
    bottom: 2rem !important;
    width: 0.4rem !important;

    .tooltip-container {
      height: 0.4rem !important;

      .qr-dialog-container {
        right: 0.6rem;
        width: 1.8rem;
        padding: 0.15rem;
      }
    }
  }

  @keyframes show {
    from {
      transform: translateY(200px);
      opacity: 0;
    }
  }

  @keyframes hide {
    to {
      transform: translateY(200px);
      opacity: 0;
    }
  }
</style>
