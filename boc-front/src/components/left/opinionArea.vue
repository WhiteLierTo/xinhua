<template>
  <BaseWidthTitle title="舆情地域评分">
    <div class="area-container">
      <div class="part" ref="area"></div>
      <div class="part part-bottom">
        <div v-for="(item,index) in areaNumberList" :key="index" class="row-container">
          <p>{{ item.name }}</p>
          <p>{{ item.value }}条</p>
        </div>
      </div>
    </div>
  </BaseWidthTitle>
</template>

<script>
  // FIXME 映射值
  import chinaGeoJson from "../../asset/data/china.json";

  export default {
    name: "opinionArea",
    data() {
      return {
        areaChart: null,
        areaNumberMap: {},
        areaNumberList: []
      }
    },
    mounted() {
      this.drawAreaChart();

      this.getAreaInfo();
    },
    methods: {
      drawAreaChart() {
        this.areaChart = this.$echarts.init(this.$refs.area);
        this.$echarts.registerMap("china", chinaGeoJson);

        this.areaChart.setOption({
          visualMap: {
            min: 0,
            max: 1,
            show: false,
            inRange: {
              color: ["#c37052", "#C15A34", "#ce5a30"]
            }
          },
          series: {
            type: "map",
            mapType: "china",
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12,
                  fontWeight: 500,
                  color: "black"
                }
              },
              emphasis: {
                textStyle: {
                  fontSize: 14,
                  color: "black"
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: "#3E0237",
                areaColor: "#C15A34",
              },
              emphasis: {
                borderWidth: 2
              }
            },
            data: []
          }

        });

        this.$store.commit("addCharts", this.areaChart);
      },

      updateAreaChart() {
        let valuesList = this.areaNumberList.map(d => d.value);

        this.areaChart.setOption({
          visualMap: {
            min: Math.min(...valuesList, 0),
            max: Math.max(...valuesList, 1)
          },
          series: {
            data: this.areaNumberList
          }
        })
      },

      getAreaInfo() {
        this.$ajax.areaMap().then(res => {
          if (res.data.code === 200) {
            let areaList = res.data.data;
            areaList.sort((x, y) => y[1] - x[1]);
            this.areaNumberList = areaList;
            this.updateAreaChart();
          } else {
            setTimeout(this.getAreaInfo, 5000)
          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .area-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .part {
      flex: 1;
      overflow: auto;
    }


    .part-bottom {
      width: 100%;
      padding: 0 50px;

      &::-webkit-scrollbar {
        background: #102568;
        width: 8px;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: #1A4FBB;
        border-radius: 10px;
      }

      .row-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        font-size: 32px;
        line-height: 70px;
        color: #7D96D8;
      }
    }
  }
</style>
