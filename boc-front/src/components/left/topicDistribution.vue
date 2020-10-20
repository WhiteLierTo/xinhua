<template>
  <BaseWidthTitle title="舆情话题分布">
    <div id="topic" :style="{width: '100%', height: '100%'}"></div>
  </BaseWidthTitle>
</template>

<script>
export default {
  name: "topicDistribution",
  data() {
    return {
      myChart: ""
    };
  },
  mounted() {
    this.showTopic();
    this.getTopicInfo();

    this.$store.commit("addPolling", this.getTopicInfo)
  },
  methods: {
    showTopic() {
      this.myChart = this.$echarts.init(document.getElementById('topic'))

      var option = {
        // 图表标题
        series: [{
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 260,
            edgeLength: 10
          },
          roam: true,
          label: {
            normal: {
              show: true,
              position: "bottom",
              color: "#B0BCD6",
              formatter: "{b}"
            }
          },
          data: []
        }]
      }

      this.myChart.setOption(option)
      this.$store.commit("addCharts", this.myChart);
    },

    getTopicInfo() {
      let colorList = [
        '#86C23A', '#5CBD90', '#364E8E', '#32cd32', '#B0BCD6',
        '#FFAB32', '#ECAA6E', '#3968F6', '#ffa500', '#CC5551',
      ];

      this.$ajax.topic().then(res => {
        if (res.data.code === 200) {
          let data = res.data.data.map((d, i) => {
            d.name = d.classify;
            d.symbolSize = 40 + 8 * Math.log(d.value);
            d.draggable = true;
            let index = i % colorList.length;
            d.itemStyle = {
              normal: {
                color: colorList[index]
              }
            }
            return d
          })

          this.myChart.setOption({
            series: {
              data,
            }
          })

        } else {
          setTimeout(this.getTopicInfo, 5000)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>


