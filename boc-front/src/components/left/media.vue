<template>
  <BaseWidthTitle title="舆情媒体评分">
    <div class="media-container" ref="mediaBar"></div>
  </BaseWidthTitle>
</template>

<script>
  export default {
    name: "media",
    data() {
      return {
        mediaChart: null
      }
    },
    mounted() {
      this.initGraphic();
      this.drawMediaChart();

      this.getMediaInfo();
      this.$store.commit("addPolling", this.getMediaInfo);
    },
    methods: {
      drawMediaChart() {
        let data = []
        this.mediaChart = this.$echarts.init(this.$refs.mediaBar);
        this.mediaChart.setOption({
          tooltip: {},
          xAxis: {
            data: [],
            axisLabel: {
              color: "white",
              fontSize: 14,
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
              color: "white",
              fontSize: 14
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#35639E"
              }
            }
          },
          series: {
            // type: 'bar',
            // barWidth: 38,
            // color: ["#37B1FF"],
            type: 'custom',
            renderItem: function (params, api) {
              let location = api.coord([api.value(0), api.value(1)]);
              return {
                type: 'group',
                children: [
                  {
                    type: 'MyCubeRect',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1]
                    },
                    style: {
                      fill: '#37B1FF'
                    }
                  },
                  {
                    type: 'MyCubeShadow',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1]
                    },
                    style: {
                      fill: '#35639E'
                    }
                  },
                  {
                    type: 'MyCubeTopShadow',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1]
                    },
                    style: {
                      fill: '#DD4807'
                    }
                  }
                ]
              };
            },
            data,
          },
        });

        this.$store.commit("addCharts", this.mediaChart);
      },

      initGraphic() {
        let MyCubeRect = this.$echarts.graphic.extendShape({
          shape: {
            x: 0,
            y: 0,
            width: 48, //柱宽
            zWidth: 8, //阴影折角宽
            zHeight: 4, //阴影折角高
          },
          buildPath: function (ctx, shape) {
            const api = shape.api;
            const xAxisPoint = api.coord([shape.xValue, 0]);
            const p0 = [shape.x, shape.y];
            const p1 = [shape.x - 24, shape.y];
            const p4 = [shape.x + 24, shape.y];
            const p2 = [xAxisPoint[0] - 24, xAxisPoint[1]];
            const p3 = [xAxisPoint[0] + 24, xAxisPoint[1]];

            ctx.moveTo(p0[0], p0[1]); //0
            ctx.lineTo(p1[0], p1[1]); //1
            ctx.lineTo(p2[0], p2[1]); //2
            ctx.lineTo(p3[0], p3[1]); //3
            ctx.lineTo(p4[0], p4[1]); //4
            ctx.lineTo(p0[0], p0[1]); //0
            ctx.closePath();
          }
        });
        let MyCubeShadow = this.$echarts.graphic.extendShape({
          shape: {
            x: 0,
            y: 0,
            width: 48,
            zWidth: 8,
            zHeight: 4,
          },
          buildPath: function (ctx, shape) {
            const api = shape.api;
            const xAxisPoint = api.coord([shape.xValue, 0]);
            const p4 = [shape.x + 24, shape.y];
            const p6 = [shape.x + 24 + 8 + 8, shape.y - 4 - 4];
            const p3 = [xAxisPoint[0] + 24, xAxisPoint[1]];
            const p5 = [xAxisPoint[0] + 24 + 8 + 8, xAxisPoint[1] - 4 - 4];

            ctx.moveTo(p4[0], p4[1]); //4
            ctx.lineTo(p3[0], p3[1]); //3  底部前
            ctx.lineTo(p5[0], p5[1]); //5 底部后
            ctx.lineTo(p6[0], p6[1]); //6  // 上右
            ctx.lineTo(p4[0], p4[1]); //4

            ctx.closePath();
          }
        });
        let MyCubeTopShadow = this.$echarts.graphic.extendShape({
          shape: {
            x: 0,
            y: 0,
            width: 48,
            zWidth: 8,
            zHeight: 4,
          },
          buildPath: function (ctx, shape) {
            const p1 = [shape.x - 24, shape.y];
            const p4 = [shape.x + 24, shape.y];
            const p6 = [shape.x + 24 + 8 + 8, shape.y - 4 - 4];
            const p7 = [shape.x - 24 + 8 + 8, shape.y - 4 - 4];

            ctx.moveTo(p4[0], p4[1]); //4
            ctx.lineTo(p6[0], p6[1]); //6
            ctx.lineTo(p7[0], p7[1]); //7
            ctx.lineTo(p1[0], p1[1]); //1
            ctx.lineTo(p4[0], p4[1]); //4
            ctx.closePath();
          }
        });

        this.$echarts.graphic.registerShape('MyCubeRect', MyCubeRect);
        this.$echarts.graphic.registerShape('MyCubeShadow', MyCubeShadow);
        this.$echarts.graphic.registerShape('MyCubeTopShadow', MyCubeTopShadow);
      },

      updateMediaChart(xAxis, values) {
        this.mediaChart.setOption({
          xAxis: {
            data: xAxis
          },
          series: {
            data: values
          }
        })
      },

      getRandomNumber(min = 0, max = 200) {
        let random = Math.random() * (max - min) + min;
        return Math.floor(random);
      },

      getMediaInfo() {
        this.$ajax.media().then(res => {
          if (res.data.code === 200) {
            let data = res.data.data;
            let xAxis = data.map(d => d.classify);
            let values = data.map(d => d.value);

            this.updateMediaChart(xAxis, values)

          } else {
            setTimeout(this.getMediaInfo, 5000)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .media-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
