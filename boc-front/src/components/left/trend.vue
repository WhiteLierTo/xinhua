<template>
  <BaseWidthTitle title="舆情趋势">
    <div class="trend-container">
      <div class="legend-line">
        <div class="tab-line">
          <div
              class="tab"
              v-for="(item,index) in tabText" :key="index"
              :class="{'active-tab':emotionTrendSearchType === index + 1}"
              @click="clickTab(index)"
              v-text="item"
          ></div>
        </div>
        <div class="real-legend-container">
          <div class="legend">
            <div class="ball" style="background: #00ABBB"></div>
            <span>正面</span>
          </div>
          <div class="legend">
            <div class="ball" style="background: #FFAB32"></div>
            <span>中立</span>
          </div>
          <div class="legend">
            <div class="ball" style="background: #E71701"></div>
            <span>负面</span>
          </div>
        </div>
      </div>
      <div class="line-chart-root" ref="line"></div>
    </div>
  </BaseWidthTitle>
</template>

<script>

  export default {
    name: "trend",
    props: ["emotionTrendSearchType", "emotionTrendData"],
    data() {
      return {
        tabText: ["今天", "7天", "30天"],
        lineChart: null,

        mockDate: new Date(),
        mockData: [[], [], []]
      }
    },
    mounted() {
      this._mockData();
      this.drawLineChart();

    },
    methods: {
      _mockData() {
        for (let i = 0; i < 20; i++) {
          this.mockDate = +this.mockDate + (24 * 60 * 60 * 1000);
          this.mockData.forEach(d => {
            d.push([this.mockDate, this.getRandomNumber()])
          })
        }
      },

      drawLineChart() {
        this.lineChart = this.$echarts.init(this.$refs.line);
        this.lineChart.setOption({
          tooltip: {},
          xAxis: {
            type: "time",
            splitNumber: 10,
            axisLabel: {
              color: "#8E9ECB",
              fontSize: 14,
              formatter: this.formatTime
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#35639E"
              },
            },
          },
          yAxis: {
            axisLabel: {
              color: "#8E9ECB",
              fontSize: 14
            },
            splitLine: {
              lineStyle: {
                color: "#35639E"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#35639E"
              }
            }
          },
          series: [
            {
              type: 'line',
              smooth: true,
              data: [],
              itemStyle: {
                color: "#E71701"
              }
            },
            {
              type: 'line',
              smooth: true,
              data: [],
              itemStyle: {
                color: "#FFAB32"
              }
            },
            {
              type: 'line',
              smooth: true,
              data: [],
              itemStyle: {
                color: "#00ABBB"
              }
            }
          ]
        })
        this.$store.commit("addCharts", this.lineChart);
      },

      updateLineChart() {

        let colors = ["#E71701", "#FFAB32", "#00ABBB"]

        let data = [
          _formatLineData(this.emotionTrendData.negativeList),
          _formatLineData(this.emotionTrendData.naturalList),
          _formatLineData(this.emotionTrendData.positiveList),
        ]

        let series = data.map((d, i) => {
          return {
            itemStyle: {
              color: colors[i]
            },
            data: d
          }
        })

        this.lineChart.setOption({
          series
        })

        function _formatLineData(data) {
          return data.map(d => [d.classify, d.value])
        }

      },

      getRandomNumber(min = 0, max = 200) {
        let random = Math.random() * (max - min) + min;
        return Math.floor(random);
      },

      formatTime(timeStamp) {
        let date = new Date(timeStamp);
        if (this.emotionTrendSearchType === 1) {
          return `${date.getHours()}时${date.getMinutes()}分`
        }
        return `${date.getMonth() + 1}月${date.getDate()}日`
      },

      clickTab(index) {
        this.$emit("onChangeEmotionTrendSearchType", index + 1);
      },

      onUpdate() {
        // 用于父组件调用
        this.updateLineChart();
      }
    }
  }
</script>

<style scoped lang="less">
  .trend-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .legend-line {
      width: 100%;
      height: 40px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      .tab-line {
        height: 100%;
        display: flex;
        padding-left: 30px;

        .tab {
          width: 106px;
          height: 40px;
          margin-right: 7px;
          color: #DEFCFC;
          cursor: pointer;
          transition: all 0.3s;
          background: url("../../asset/left/tab.png");
          background-size: 100% 100%;
          text-align: center;
          line-height: 38px;
        }

        .active-tab {
          color: #54FFF1;
          background-image: url("../../asset/left/activeTab.png");
          background-size: 100% 100%;

        }
      }

      .real-legend-container {
        display: flex;
        padding-right: 30px;

        .legend {
          display: flex;
          margin-right: 40px;
          font-size: 16px;
          color: white;
          align-items: center;

          &:last-child {
            margin-right: 0;
          }

          .ball {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 10px;
          }

          span {
            position: relative;
            top: -1px;
          }
        }
      }

    }

    .line-chart-root {
      flex: 1;
      width: 100%;
      overflow: hidden;
    }

  }
</style>
