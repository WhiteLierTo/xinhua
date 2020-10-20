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
    name: "lineChart",
    props: {
      title: String,
      data: {
        type: Array,
        default: function () {
          return []
        }
      },

      chartOptions: {
        type: Object,
        default: function () {
          return {}
        }
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
        chartInstance: null,
        baseChartOptions: {
          isMany: false, // 是否为多簇数据
          names: [], // 当提供names时,应该可以开启图例
          showArea: true, // 是否为面积图
          smooth: true, // 是否开启平滑
          isTimeLine: true
        }
      }
    },
    computed: {
      mergedChartOptions() {
        return {
          ...this.baseChartOptions,
          ...this.chartOptions
        }
      }
    },
    mounted() {
      this.initBarChart()
    },
    methods: {
      initBarChart() {
        this.chartInstance = echarts.init(this.$refs.canvasContainer, "light");
      },

      getOneSeries(data, index) {
        return {
          type: 'line',
          name: this.mergedChartOptions.names[index],
          smooth: this.mergedChartOptions.smooth,
          showSymbol: (this.mergedChartOptions.isMany ? this.data[0] : this.data).length <= 4,
          symbolSize: (this.mergedChartOptions.isMany ? this.data[0] : this.data).length <= 4 ? 14 : 6,
          areaStyle: this.mergedChartOptions.showArea ? {opacity: 0.5} : undefined,
          data,
        }
      },

      draw() {
        if (!this.chartInstance) {
          requestAnimationFrame(this.draw);
          return
        }

        if (!this.data.length) return;

        let option = {
          tooltip: {
            trigger: "axis"
          },
          legend: {},
          xAxis: {
            type: this.mergedChartOptions.isTimeLine ? "time" : "category",
            splitLine: {
              show: false
            },
            splitNumber: 11,
            axisLabel: {},

          },
          yAxis: {
            minInterval: 1
          },
          grid: {
            top: "30px",
            left: "55px",
            right: "20px",
            bottom: "20px"
          },
          toolbox: {
            feature: {
              saveAsImage: {
                readOnly: true
              },
              dataView: {
                readOnly: false,
                show: false,
              },

            }
          },
          dataZoom: [
            {
              type: "slider",
              show: false,
              name: "slider"
            },

          ],
          series: this.mergedChartOptions.isMany ? this.data.map(this.getOneSeries) : this.getOneSeries(this.data)
        };


        if ((this.mergedChartOptions.isMany ? this.data[0] : this.data).length >= 15) {
          // 算长,引入dataZoom
          option.grid.bottom = "70px";
          option.dataZoom = [
            {
              type: "slider",
              show: true,
              name: "slider"
            },

          ]
        }

        this.chartInstance.setOption(option)
      },

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
