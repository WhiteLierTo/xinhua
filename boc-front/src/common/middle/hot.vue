<template>
  <div class="box">
    <BaseWidthTitle title="口碑排行热词">
      <div id="scatter" :style="{width: '788px', height: '700px'}"></div>
    </BaseWidthTitle>
  </div>
</template>

<script>
export default {
  name: "Hot",
  data() {
    return {
      chart: "",
      datasList: []
    };
  },
  mounted() {
    this.getWordList();
    this.$store.commit("addPolling", this.getWordList);
  },
  methods: {
    getWordList() {
      this.$ajax.wordList().then(res => {
        let wordList = res.data.rows;
        this.datasList = wordList.map(d => ({ name: d.wordName }));
        this.drawScatter();
      });
    },
    drawScatter() {
      this.chart = this.$echarts.init(document.getElementById("scatter"));
      var wordLength = value => {
        var ret = ""; //拼接加\n返回的类目项
        var maxLength = 4; //每项显示文字个数
        var valLength = value.length; //X轴类目项的文字个数
        var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
        if (rowN > 1) {
          //如果类目项的文字大于3,
          for (var i = 0; i < rowN; i++) {
            var temp = ""; //每次截取的字符串
            var start = i * maxLength; //开始截取的位置
            var end = start + maxLength; //结束截取的位置
            //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
            temp = value.substring(start, end) + "\n";
            ret += temp; //凭借最终的字符串
          }
          return ret;
        } else {
          return value;
        }
      };

      //
      var data = [...this.datasList];

      //偏移量
      var offsetData = [
        [80, 53],
        [35, 73],
        [30, 33],
        [60, 33],
        [10, 48],
        [25, 78],
        [45, 89],
        [70, 70],
        [75, 25],
        [15, 28],
        [62, 47]
      ];
      //symbolSize 散点气泡大小
      var symbolSizeData = [200, 185, 175, 165, 100, 140, 90, 200];
      //
      //循环定义series的data值
      var datas = [];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        datas.push({
          name: wordLength(item.name),
          value: offsetData[i],
          symbolSize: symbolSizeData[i],
          label: {
            normal: {
              textStyle: {
                fontSize: 24,
                color: "rgba(255,255,255,1)"
              }
            }
          },
          itemStyle: {
            normal: {
              color: this.$echarts.graphic.RadialGradient([
                {
                  offset: 0,
                  color: "rgba(64,126,255,1)"
                },
                {
                  offset: 1,
                  color: "rgba(64,126,255,1)"
                }
              ]),
              opacity: 0.7,
              shadowColor: "#3372EE",
              shadowBlur: 10,
              shadowOffsetX: 1,
              shadowOffsetY: 1
            }
          }
        });
      }

      var option = {
        backgroundColor: "transparent",
        grid: {
          show: false,
          top: 10,
          bottom: 10
        },
        xAxis: [
          {
            gridIndex: 0,
            type: "value",
            show: false,
            min: 0,
            max: 100,
            nameLocation: "middle",
            nameGap: 5
          }
        ],
        yAxis: [
          {
            gridIndex: 0,
            min: 0,
            show: false,
            max: 100,
            nameLocation: "middle",
            nameGap: 30
          }
        ],

        series: [
          {
            type: "scatter",
            symbol: "circle",
            symbolSize: 120,
            label: {
              normal: {
                show: true,
                formatter: "{b}",
                color: "#fff",
                textStyle: {
                  fontSize: "20"
                }
              }
            },
            animationDurationUpdate: 1000,
            animationEasingUpdate: 1000,
            animationDelay: function(idx) {
              // 越往后的数据延迟越大
              return idx * 100;
            },
            itemStyle: {
              normal: {
                color: "#00acea"
              }
            },
            data: datas
          }
        ]
      };
      this.chart.setOption(option);
      this.$store.commit("addCharts", this.chart);
    }
  }
};
</script>

<style scoped lang="less">
.box {
  width: 788px;
  height: 800px;
}
</style>
