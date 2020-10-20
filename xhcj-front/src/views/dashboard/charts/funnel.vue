<template>
  <div class="funnel-container">
    <div class="title" :style="{textAlign:mergedChartOptions.align?'center':'left'}">{{ title }}</div>
    <div class="canvas-container" ref="canvasContainer"></div>
  </div>
</template>

<script>
  import echarts from "echarts"

  export default {
    name: "funnel",
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
        baseChartOptions: {
          align: false, // 标题是否居中
        },
        chartInstance: null
      }
    },
    computed: {
      mergedChartOptions() {
        return {
          ...this.baseChartOptions,
          ...this.chartOptions
        }
      },
    },
    mounted() {
      this.initFunnelChart();
    },
    methods: {
      initFunnelChart() {
        this.chartInstance = echarts.init(this.$refs.canvasContainer, "light");

      },

      draw() {
        if (!this.chartInstance) {
          requestAnimationFrame(this.draw);
          return
        }
        let option = {
          series: {
            type: 'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              {value: 80, name: '点击'},
              {value: 60, name: '报名'},
              {value: 40, name: '审核'},
              {value: 20, name: '签到'},
            ]
          }
        };

        this.chartInstance.setOption(option)
      }

    }
  }
</script>

<style scoped lang="less">
  .funnel-container {
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

    .canvas-container {
      flex: 1;
      margin-top: 4px;
    }
  }
</style>
