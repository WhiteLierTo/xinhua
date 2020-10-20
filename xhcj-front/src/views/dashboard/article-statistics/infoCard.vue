<template>
  <div class="info-card-container">
    <div class="pie-part">
      <div class="title">{{ info.label }}</div>
      <div class="chart-container" ref="chartContainer">
        <canvas class="pie" ref="canvas"></canvas>
      </div>
      <div class="compare">比前日:{{ info.percent }}%
        <i class="el-icon-top" style="color: #E55029;" v-if="info.isUp"></i>
        <i class="el-icon-bottom" style="color: #16A05D;" v-else></i>
      </div>
    </div>
    <div class="detail-part">
      <div class="detail" v-for="(item,index) in info.info" :key="index">
        <div class="label">{{ item.label }}</div>
        <div class="value">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "infoCard",
    props: {
      info: Object
    },
    data() {
      return {}
    },
    watch: {
      info: {
        immediate: true,
        deep: true,
        handler() {
          this.drawCircle();
        }
      }
    },

    methods: {
      drawCircle() {
        if (!this.$refs.canvas) {
          return requestAnimationFrame(this.drawCircle)
        }


        let percent = Math.max(0, Math.min(100, this.info.percent));
        percent = 100 - percent;


        let canvas = this.$refs.canvas;
        canvas.width = 100;
        canvas.height = 100;
        let ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.strokeStyle = "#E6E6E6";
        ctx.lineWidth = 6;
        ctx.arc(50, 50, 42, 0, Math.PI * 2);
        ctx.stroke();

        if (percent !== 100) {
          ctx.beginPath();
          ctx.strokeStyle = this.info.isUp ? this.info.color : this.info.color + "40";
          ctx.lineWidth = 6;
          if (percent === 0) {
            ctx.arc(50, 50, 42, 0, Math.PI * 2);
          } else {
            ctx.arc(50, 50, 42, Math.PI * -0.5, Math.PI * (-0.5 + 2 * percent / 100), true);
          }
          ctx.stroke();
        }

        ctx.font = "20px test";
        ctx.fillStyle = this.info.color;
        let text = `${this.info.percent}%`;
        let textWidth = ctx.measureText(text).width;

        ctx.fillText(text, 50 - (textWidth / 2), 57)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../style/config.less";
  @import "../../../style/styles.less";

  .info-card-container {
    width: 100%;
    height: 100%;
    margin-right: @defaultPaddingY;
    padding: @defaultPaddingY;
    background: white;
    display: flex;

    &:last-child {
      margin-right: 0;
    }

    .pie-part {
      width: 100px;
      display: flex;
      flex-direction: column;

      .title {
        color: #333333;
        font-size: 16px;
        font-weight: 600;
      }

      .chart-container {
        flex: 1;
        overflow: hidden;
        display: flex;
        justify-content: center;

        .pie {
          width: 100px;
          height: 100px;
          margin-bottom: 5px;
          margin-top: auto;
        }
      }

      .compare {
        font-size: 12px;
        font-weight: 400;
        color: #666;
      }
    }

    .detail-part {
      flex: 1;
      margin-left: @defaultPaddingY;
      display: flex;

      .detail {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .label {
          color: #666666;
          font-size: 12px;
          margin-bottom: 20px;
        }

        .value {
          color: #333;
          font-size: 18px;
          font-weight: 600;
        }
      }
    }
  }
</style>
