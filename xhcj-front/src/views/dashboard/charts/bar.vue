<template>
  <div class="bar-container">
    <div class="title" :style="{textAlign:mergedChartOptions.align?'center':'left'}">{{ title }}</div>
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
  // 只接受二维数组的数据 [[类目,数值],[类目,数值]]

  export default {
    name: "bar",
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
      },
      onClick: {
        type: Function
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
          isStack: false, // 是否为堆叠柱状图
          isMany: false,
          align: false, // 标题是否居中
          names: [],
          manyTypes: [], // 当isMany为true时,标识每一项数据的具体含义
        }
      }
    },
    computed: {
      mergedChartOptions() {
        return {
          ...this.baseChartOptions,
          ...this.chartOptions
        }
      },

      isNameToLong() {
        // 名字是否有太长的
        return !(this.mergedChartOptions.isMany && !this.mergedChartOptions.isStack) && this.data.length >= 8 && this.data.filter(d => d[0].length >= 4).length > 0
      }
    },

    mounted() {
      this.initBarChart()
    },
    methods: {
      initBarChart() {
        this.chartInstance = echarts.init(this.$refs.canvasContainer, "light");

        this.chartInstance.getZr().off("click");
        this.chartInstance.getZr().on("click", param => {
          let pointInPixel = [param.offsetX, param.offsetY];
          if (this.chartInstance.containPixel('grid', pointInPixel)) {
            let pointInGrid = this.chartInstance.convertFromPixel({seriesIndex: 0}, pointInPixel);
            let xIndex = pointInGrid[0];
            (this.onClick && this.onClick(this.data[xIndex][0]))
          }
          return false
        })
      },

      getOneSeries() {
        let allTotal = this.data.reduce((total, curList) => {
          return total + curList.slice(1).reduce((t, c) => t + c, 0)
        }, 0);

        let series = {
          type: 'bar',
          barWidth: undefined,
          cursor: this.onClick ? "pointer" : "default",
          label: {
            show: true,
            position: 'top',
            formatter: (param) => {
              let v = param.value[param.componentIndex + 1];
              if (this.mergedChartOptions.isStack) {
                // 堆积柱状图
                // TODO 加权
                let total = param.value.slice(1).reduce((t, c) => t + c, 0);
                if (!total) return '';
                if (v / total < 0.1) return '';
                if (allTotal !== 0 && total / allTotal < 0.01) return '';
              }

              return v ? v : ''
            }
          }
        };
        if (!this.mergedChartOptions.isMany && this.data.length < 5) {
          // 如果过于少
          series.barWidth = "30%"
        }

        if (this.mergedChartOptions.isStack) {
          series.stack = "总量";
          series.label.position = "insideTop"
        }
        return series
      },

      draw() {
        if (!this.chartInstance) {
          requestAnimationFrame(this.draw);
          return
        }

        let seriesLength = this.mergedChartOptions.manyTypes.length ? this.mergedChartOptions.manyTypes.length : 1;
        let series = Array(seriesLength).fill(null).map((this.getOneSeries));

        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: 'shadow'
            },
          },
          legend: {},
          dataset: {
            source: [
              ["product", ...this.mergedChartOptions.manyTypes],
              ...this.data
            ]
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              show: true,
              rotate: this.isNameToLong ? 45 : 0,
              formatter: (value) => {
                // 当 字数过多 且 条目过多的时候 切
                if (this.data.length >= 8 && value.length > 4) {
                  return value.substr(0, 4) + "..."
                }
                return value
              }
            }
          },
          yAxis: {
            minInterval: 1
          },
          grid: {
            top: "30px",
            left: "55px",
            right: "10px",
            bottom: this.isNameToLong ? "55px" : "20px",
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
          series
        };

        if (this.data.length >= 15) {
          // 算长,引入dataZoom
          let percent = 100 * 13 / this.data.length;
          option.grid.bottom = "70px";
          option.dataZoom = [
            {
              type: "slider",
              show: true,
              name: "slider",
              start: 0,
              end: percent
            },
          ]
        }

        this.chartInstance.setOption(option)
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
