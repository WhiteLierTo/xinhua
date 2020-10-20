<template>
  <div ref="dom" class="linecharts"></div>
</template>

<script>
import echarts from "echarts";
const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();
const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();
export default {
  name: "ChartLine",
  props: {
    lineDataX: Array,
    lineDataY: Array
  },
  data() {
    return {
      dom: null
    };
  },
  methods: {
    resize() {
      this.dom.resize();
    }
  },
  mounted() {
    this.$nextTick(() => {
      let option = {
        backgroundColor: "#fff",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#8EC9FF"
            }
          },
          backgroundColor: "rgba(0,0,0,0.5)",
          borderColor: "#5E98DC",
          borderWidth: 1,
          extraCssText: "border-radius:0;"
        },
        grid: {
          top: "8%",
          left: "3%",
          right: "5%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#E8E8E8"
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                color: "#8C8C8C",
                fontSize: 14
              }
            },
            axisTick: {
              show: false
            },
            data: this.lineDataX
          }
        ],
        yAxis: [
          {
            axisLine: {
              show: false
            },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: "#8C8C8C",
                fontSize: 14
              }
            },
            splitLine: {
              lineStyle: {
                color: "#E8E8E8"
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "待处理",
            type: "line",
            symbol: "circle",
            symbolSize: 6,
            showSymbol: true,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            areaStyle: {
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(45,140,240,0.3)"
                    },
                    {
                      offset: 1,
                      color: "rgba(45,140,240,0)"
                    }
                  ],
                  false
                )
              }
            },
            itemStyle: {
              normal: {
                color: "rgba(45,140,240,1)",
                borderColor: "#2D8CF0",
                borderWidth: 2
              }
            },
            data: this.lineDataY
          }
        ]
      };
      this.dom = echarts.init(this.$refs.dom);
      this.dom.setOption(option);
      on(window, "resize", this.resize);
    });
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
<style lang="scss" scoped>
.linecharts {
  height: 90%;
}
</style>
