<template>
  <BaseWidthTitle title="舆情形象评分">
    <div class="image-score-container">
      <div class="water-ball-container">
        <div class="water-ball-root" ref="water"></div>
      </div>
      <div class="bar-chart-container">
        <div class="tab-line">
          <div
              class="tab"
              v-for="(item,index) in tabText" :key="index"
              :class="{'active-tab':emotionTrendSearchType === index + 1}"
              @click="clickTab(index)"
              v-text="item"
          ></div>
        </div>
        <div class="bar-chart-root" ref="bar"></div>
      </div>
    </div>
  </BaseWidthTitle>
</template>

<script>
  export default {
    name: "imageScore",
    props: ["emotionTrendSearchType", "emotionTrendData"],
    data() {
      return {
        waterChart: null,
        barChart: null,
        tabText: ["今天", "7天", "30天"],
        activeTabIndex: 0,
      }
    },
    mounted() {
      this.drawWaterChart();
      this.drawBarChart();
    },
    methods: {
      drawWaterChart() {
        this.waterChart = this.$echarts.init(this.$refs.water);
        this.waterChart.setOption({
          series: {
            type: 'liquidFill',
            radius: '70%',
            center: ['50%', '50%'],
            shape: 'circle',
            direction: 'right',
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 10,
                borderColor: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(69, 73, 240, 0)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(69, 73, 240, .25)'
                  }, {
                    offset: 1,
                    color: 'rgba(69, 73, 240, 1)'
                  }],
                  globalCoord: false
                },
                shadowBlur: 8,
                shadowColor: 'white',
              }
            },
            backgroundStyle: {
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0.5,
                y2: 1,
                colorStops: [{
                  offset: 1,
                  color: 'rgba(68, 145, 253, 0)'
                }, {
                  offset: 0.5,
                  color: 'rgba(68, 145, 253, .25)'
                }, {
                  offset: 0,
                  color: 'rgba(68, 145, 253, 1)'
                }],
                globalCoord: false
              },
              opacity: 0.5
            },
            label: {
              fontSize: 30,
              fontWeight: 400,
              color: '#56E7FF'
            },
            data: [0,0,0],
          }
        });

        this.$store.commit("addCharts", this.waterChart);
      },

      updateWater() {
        let oneData = this.emotionTrendData.score ? this.emotionTrendData.score / 100 : 0;
        this.waterChart.setOption({
          series: {
            data: [oneData,oneData,oneData]
          }
        })
      },

      drawBarChart() {
        this.barChart = this.$echarts.init(this.$refs.bar);
        this.barChart.setOption({
          tooltip: {},
          xAxis: {
            name: "(条)",
            nameTextStyle: {
              color: "#8E9ECB",
              fontSize: 20,
              padding: [34, 0, 0, 10]
            },
            axisLabel: {
              color: "#8E9ECB",
              fontSize: 20,
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
            data: ["负面", "中立", "正面"],
            axisLabel: {
              color: "white",
              fontSize: 20
            },
            axisLine: {
              lineStyle: {
                color: "#35639E"
              }
            }
          },
          series: {
            type: 'bar',
            barWidth: 44,
            data: [
              {
                value: 0, // 负面
                itemStyle: {
                  color: "#FD1036"
                }
              },
              {
                value: 0,// 中立
                itemStyle: {
                  color: "#F69829"
                }
              },
              {
                value: 0, // 正面
                itemStyle: {
                  color: "#09E5F9"
                }
              }
            ]
          }
        });
        this.$store.commit("addCharts", this.barChart);
      },

      updateBarChart() {
        let colors = ["#FD1036", "#F69829", "#09E5F9"];
        let data = [this.emotionTrendData.emotion.negative, this.emotionTrendData.emotion.neutral, this.emotionTrendData.emotion.negative].map((v, index) => ({
          value: v,
          itemStyle: {
            color: colors[index]
          }
        }))

        this.barChart.setOption({
          series: {
            data
          }
        })
      },

      getRandomNumber(min = 0, max = 200) {
        let random = Math.random() * (max - min) + min;
        return Math.floor(random);
      },

      clickTab(index) {
        this.$emit("onChangeEmotionTrendSearchType", index + 1);
      },

      onUpdate() {
        // 用于父组件调用
        this.updateWater();
        this.updateBarChart();
      }
    }
  }
</script>

<style scoped lang="less">
  .image-score-container {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;

    .water-ball-container {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .water-ball-root {
        width: 100%;
        height: 100%;
      }
    }

    .bar-chart-container {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .tab-line {
        height: 40px;
        margin-bottom: 50px;
        flex-shrink: 0;
        display: flex;
        padding-left: 60px;

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

      .bar-chart-root {
        flex: 1;
        width: 100%;
      }
    }
  }
</style>
