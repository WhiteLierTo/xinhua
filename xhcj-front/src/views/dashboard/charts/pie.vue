<template>
  <div class="bar-container">
    <div class="title">{{ title }}</div>
    <div class="canvas-wrapper">
      <div class="empty" v-if="data.length === 0">
        <img src="../../../assets/nodata.png" alt="">
        <p>空数据</p>
      </div>
      <div class="canvas-container" ref="canvasContainer"></div>
    </div>

  </div>
</template>

<script>
  import echarts from "echarts"
  // 只接受二维数组的数据
  export default {
    name: "pie",
    props: {
      title: String,
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      isDonut: {
        type: Boolean,
        default: false
      },
      isPercent: { // 入参是否直接为百分比
        type: Boolean,
        default: true
      }
    },
    watch: {
      data: {
        immediate: true,
        deep: true,
        handler() {
          this.draw()
        }
      }
    },
    data() {
      return {
        chartInstance: null
      }
    },
    mounted() {
      this.initBarChart()
    },
    methods: {
      initBarChart() {
        this.chartInstance = echarts.init(this.$refs.canvasContainer, "light");
      },

      draw() {
        let total = this.data.reduce((total, cur) => total += cur[1], 0);

        let option = {
          tooltip: {},
          legend: {
            orient: "vertical",
            type: "scroll",
            right: "30px",
            data: this.data.slice(0, 26).map(d => d[0]),
            formatter(name) {
              if (name.length >= 6) {
                return name.substr(0, 4) + ".."
              }
              return name
            }
          },

          toolbox: {
            orient: 'vertical',
            feature: {
              saveAsImage: {
                readOnly: true
              },
              dataView: {
                show: false,
                readOnly: true
              }
            }
          },
          series: [{
            type: 'pie',
            cursor: 'default',
            label: {
              formatter: (params) => {
                if (this.isPercent || !total) return;
                return `${params.data.name} ${params.data.value} \n ${Math.floor(100 * params.data.value / total)}%`
              }
            },
            radius: this.isDonut ? ["50%", "75%"] : [0, "75%"],
            data: this.data.slice(0, 26).map(d => ({value: d[1], name: d[0]}))
          }]
        };

        if (this.chartInstance) {
          this.chartInstance.setOption(option)
        } else {
          requestAnimationFrame(this.draw)
        }
      }
    },
  }
</script>

<style scoped lang="less">
  .bar-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .title {
      font-size: 18px;
      font-weight: 600;
      flex-shrink: 0;
      overflow: hidden;
      text-align: center;
    }

    .canvas-wrapper {
      flex: 1;
      margin-top: 4px;
      position: relative;

      .empty {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: white;
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: rgba(0, 0, 0, 0.5);

        img {
          width: 200px;
        }
      }

      .canvas-container {
        width: 100%;
        height: 100%;
      }
    }

  }
</style>
