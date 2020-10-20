<template>
  <chart-header class="container">
    <div v-if="flag==false">
      <div class="tips" @click="backHandleClick">返回</div>
    </div>
    <div v-else>
      <div class="tips" @click="reportHandleClick">实验报告结果</div>
      <div class="tips back" @click="backHandleClick">返回</div>
      <div class="tips release1" @click="reportHandleClick">跳过</div>
    </div>
    <div class="report qwqw">
      <div class="title">舆情形象走势</div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="折线图" name="first">
          <div
            class="chart-canvas"
            style="height:400px;width:900px"
            id="chart-two"
            v-if="'first' == activeName"
          ></div>
        </el-tab-pane>
        <el-tab-pane label="水球图" name="second">
          <div
            class="chart-canvas"
            style="height:400px;width:900px"
            id="chart-one"
            v-if="'second' == activeName"
          ></div>
        </el-tab-pane>
        <el-tab-pane label="柱状图" name="third">
          <div
            class="chart-canvas"
            style="height:350px;width:900px"
            id="chart-four"
            v-if="'third' === activeName"
          ></div>
        </el-tab-pane>
        <el-tab-pane label="饼图" name="fourth">
          <div
            class="chart-canvas"
            style="height:350px;width:900px"
            id="chart-five"
            v-if="'fourth' === activeName"
          ></div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="report">
      <div class="title">整体舆情走势</div>
      <div class="chart-canvas a1" id="chart-three" style="height:400px;width:900px"></div>
    </div>
  </chart-header>
</template>

<script>
export default {
  name: "publicDissipate",
  components: {
    chartHeader: () => import("../../../components/chartHeader")
  },
  data() {
    return {
      flag: false,
      isComplete: false, //能否填写实验报告,
      isUp: true, // 是否增长
      activeName: "first"
    };
  },

  mounted() {
    this.isComplete = this.$route.query.announcementComplete;
    this.flag = this.$route.query.flag;
    this.isUp = !this.isComplete;
    this.drawLinesChart();
    this.drawWaterBallChart();
    this.drawManyLinesChart();
    this.drawPieChart();
    this.drawBarChart();
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "first") {
        this.drawLinesChart();
      } else if (tab.name === "second") {
        this.drawWaterBallChart();
      } else if (tab.name === "third") {
        this.drawBarChart();
      } else if (tab.name === "fourth") {
        this.drawPieChart();
      }
    },

    backHandleClick() {
      this.$router.go(-1);
    },
    reportHandleClick() {
      this.$router.push({
        path: "/completionResultsReport"
      });
    },

    drawLinesChart() {
      if (!document.getElementById("chart-two")) {
        setTimeout(this.drawLinesChart, 300);
        return;
      }

      let data = [300, 520, 570, 640, 700, 740, 840];
      if (!this.isUp) {
        data.reverse();
      }

      let chart = this.$echarts.init(document.getElementById("chart-two"));
      let option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["04-11", "04-12", "04-13", "04-14", "04-15", "04-16", "04-17"],
          axisLabel: {
            show: true,
            textStyle: {
              color: "#50A2C1", //更改坐标轴文字颜色
              fontSize: 8 //更改坐标轴文字大小
            }
          },
          axisLine: {
            lineStyle: {
              color: "#50A2C1",
              fontSize: 8
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#50A2C1", //更改坐标轴文字颜色
              fontSize: 8 //更改坐标轴文字大小
            }
          },
          axisLine: {
            lineStyle: {
              color: "#50A2C1",
              fontSize: 8
            }
          }
        },
        series: [
          {
            data: data,
            type: "line",
            smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#00B8E0" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#00B8E020" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            lineStyle: {
              color: "#00B8E0"
            }
          }
        ]
      };
      chart.setOption(option);
    },

    drawWaterBallChart() {
      if (!document.getElementById("chart-one")) {
        setTimeout(this.drawWaterBallChart, 300);
        return;
      }

      let chart = this.$echarts.init(document.getElementById("chart-one"));
      let option = {
        // 提示框组件
        series: [
          {
            type: "liquidFill",
            name: "舆情形象走势", // 系列名称，用于tooltip的显示，legend 的图例筛选
            radius: "62%", // 水球图的半径
            center: ["50%", "60%"], // 水球图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
            // 水填充图的形状 circle 默认圆形  rect 圆角矩形  triangle 三角形
            // diamond 菱形  pin 水滴状 arrow 箭头状  还可以是svg的path
            shape: "circle",
            phase: 0, // 波的相位弧度 不设置  默认自动
            direction: "right", // 波浪移动的速度  两个参数  left 从右往左 right 从左往右
            outline: {
              show: true,
              borderDistance: 0, // 边框线与图表的距离 数字
              itemStyle: {
                opacity: 1, // 边框的透明度   默认为 1
                borderWidth: 1, // 边框的宽度
                shadowBlur: 1, // 边框的阴影范围 一旦设置了内外都有阴影
                shadowColor: "#fff", // 边框的阴影颜色,
                borderColor: "#41dcd8" // 边框颜色
              }
            },
            // 图形样式
            itemStyle: {
              color: "#4077eb", // 水球显示的背景颜色
              opacity: 0.5, // 波浪的透明度
              shadowBlur: 10 // 波浪的阴影范围
            },
            backgroundStyle: {
              color: "#407bf3", // 水球未到的背景颜色
              opacity: 0.5
            },
            // 图形的高亮样式
            emphasis: {
              itemStyle: {
                opacity: 0.8 // 鼠标经过波浪颜色的透明度
              }
            },
            // 图形上的文本标签
            label: {
              fontSize: 55,
              fontWeight: 400,
              color: "#fff"
            },
            data: this.isUp ? [0.65, 0.1, 0.4] : [0.1, 0.1]
          }
        ]
      };
      chart.setOption(option);
    },
    drawBarChart() {
      if (!document.getElementById("chart-four")) {
        setTimeout(this.drawBarChart, 300);
        return;
      }
      let chart = this.$echarts.init(document.getElementById("chart-four"));
      let option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: ["06-14", "06-15", "06-16", "06-17", "06-18", "06-19"],
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#50A2C1", //更改坐标轴文字颜色
              fontSize: 8 //更改坐标轴文字大小
            }
          },
          axisLine: {
            lineStyle: {
              color: "#50A2C1",
              fontSize: 8
            }
          }
        },

        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#50A2C1", //更改坐标轴文字颜色
              fontSize: 8 //更改坐标轴文字大小
            }
          },
          axisLine: {
            lineStyle: {
              color: "#50A2C1",
              fontSize: 8
            }
          }
        },
        series: [
          {
            name: "舆情热度",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      };
      chart.setOption(option);
    },
    drawPieChart() {
      if (!document.getElementById("chart-five")) {
        setTimeout(this.drawPieChart, 300);
        return;
      }
      let chart = this.$echarts.init(document.getElementById("chart-five"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "数据来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "微博" },
              { value: 310, name: "微信、QQ" },
              { value: 274, name: "大数据" },
              { value: 235, name: "网络视频" },
              { value: 400, name: "搜索引擎" }
            ].sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              color: "rgba(193, 243, 255, 1);"
            },
            labelLine: {
              lineStyle: {
                color: "rgba(193, 243, 255, 1);"
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: "#c23531",
              shadowBlur: 200,
              shadowColor: "rgba(193, 243, 255, 1);"
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
      chart.setOption(option);
    },
    drawManyLinesChart() {
      if (!document.getElementById("chart-three")) {
        setTimeout(this.drawManyLinesChart, 300);
        return;
      }

      let data = [
        [300, 520, 570, 640, 700, 740, 840],
        [200, 460, 490, 520, 650, 700, 760],
        [100, 420, 410, 490, 600, 650, 700],
        [50, 220, 370, 400, 550, 600, 650]
      ];
      if (!this.isUp) {
        data = [
          [600, 720, 870, 740, 400, 340, 240],
          [620, 750, 888, 950, 650, 580, 230],
          [800, 840, 890, 950, 850, 770, 300],
          [520, 620, 850, 990, 680, 590, 400]
        ];
      }

      let series = data.map(d => {
        return {
          data: d,
          type: "line",
          smooth: true
        };
      });

      let chart = this.$echarts.init(document.getElementById("chart-three"));
      let option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["04-11", "04-12", "04-13", "04-14", "04-15", "04-16", "04-17"],
          axisLabel: {
            show: true,
            textStyle: {
              color: "#50A2C1", //更改坐标轴文字颜色
              fontSize: 12 //更改坐标轴文字大小
            }
          },
          axisLine: {
            lineStyle: {
              color: "#50A2C1",
              fontSize: 12
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#50A2C1", //更改坐标轴文字颜色
              fontSize: 12 //更改坐标轴文字大小
            }
          },
          axisLine: {
            lineStyle: {
              color: "#50A2C1",
              fontSize: 12
            }
          }
        },
        series: series
      };
      chart.setOption(option);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  position: relative;

  .tips {
    position: absolute;
    top: 0.3333rem;
    width: 1.0938rem;
    height: 0.3438rem;
    background: url("../../../assets/image/experiment/tips.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    font-size: 0.1042rem;
    font-weight: 500;
    color: rgba(170, 240, 255, 1);
    line-height: 0.3rem;
    cursor: pointer;
    z-index: 2;
  }
  .tips {
    left: 3.8rem;
  }
  .back {
    left: 4.8rem;
  }
  .release1 {
    left: 5.8rem;
  }
  .report {
    width: 100%;
    height: 2.4948rem;
    background: url("../../../assets/image/experiment/reportBg.png") no-repeat;
    background-size: 100% 100%;
    z-index: 5;
    margin: 0.2083rem auto 0;
    display: flex;
    position: relative;
    #chart-three {
      margin-left: 1.4rem;
      flex: 1;
      margin-right: 1rem;
    }
    .chart-canvas + .chart-canvas {
      margin-left: 0.3rem;
    }
  }
}

.title {
  position: absolute;
  left: 0.35rem;
  top: 0.25rem;
  font-size: 0.12rem;
  font-weight: 400;
  color: rgba(193, 243, 255, 1);
  line-height: 0.16rem;

  &:before {
    content: "";
    position: absolute;
    left: -0.08rem;
    height: 80%;
    top: 10%;

    width: 0.03rem;
    background: rgba(0, 174, 255, 1);
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.qwqw {
  .el-tabs__header {
    width: auto;
  }
  .el-tabs {
    width: 4.1667rem;
    padding: 0.2604rem 1.6094rem;
  }
  .el-tabs__content {
    margin-top: -25px;
    width: 900px;
  }
  #chart-one {
    margin-top: -50px;
  }
  .el-tabs__item {
    width: 0.8333rem;
    height: 0.2813rem;
    color: #aaf0ff;
    background: url("../../../assets/image/experiment/tips.png");
    background-size: 100% 100%;
    line-height: 0.2813rem;
    text-align: center;
  }
  .el-tabs__header .el-tabs__nav {
    border: none;
  }
  .el-tabs__header .el-tabs__item {
    border: none;
    margin-right: -28px;
  }
  .el-tabs__header {
    border: none;
  }
  .el-tabs__header .el-tabs__item.is-active {
    width: 0.8333rem;
    height: 0.2813rem;
    color: #aaf0ff;
    background: url("../../../assets/image/experiment/tips_active.png");
    background-size: 100% 100%;
    line-height: 0.2813rem;
    text-align: center;
  }
}
</style>
