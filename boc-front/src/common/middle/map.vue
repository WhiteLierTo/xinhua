<template>
  <div class="box">
    <div id="map" :style="{ width: '1327px', height: '1187px' }"></div>
  </div>
</template>

<script>
import data from "../../asset/data/suzhou.json";

export default {
  name: "Map",
  data() {
    return {
      myChart: "",
      datas: [
        {
          name: "张家港市",
          value: 1
        },
        {
          name: "常熟市",
          value: 2
        },
        {
          name: "太仓市",
          value: 3
        },
        {
          name: "昆山市",
          value: 4
        },
        {
          name: "相城区",
          value: 5
        },
        {
          name: "虎丘区",
          value: 6
        },
        {
          name: "姑苏区",
          value: 7
        },
        {
          name: "吴中区",
          value: 8
        },
        {
          name: "吴江区",
          value: 9
        },
        {
          name: "苏州工业园区",
          value: 10
        }
      ],
      color: [
        "#FD5B1C",
        "#511CFD",
        "#FD1C1C",
        "#41FFEB",
        "#316821",
        "#86F866",
        "#275AFF",
        "#E71701",
        "#FC910B",
        "#0FDB4D"
      ]
    };
  },
  mounted() {
    this.showProvince();
  },
  methods: {
    showProvince() {
      let colorList = JSON.parse(JSON.stringify(this.color));
      colorList[7] = "#fff";

      this.myChart = this.$echarts.init(document.getElementById("map"));
      var name = "sz";
      this.$echarts.registerMap(name, data);
      var option = {
        backgroundColor: "transparent",
        title: {
          left: "center",
          textStyle: {
            color: "#000"
          }
        },
        visualMap: {
          show: false,
          min: 1,
          max: 10,
          inRange: {
            color: colorList
          }
        },
        series: {
          type: "map",
          mapType: name,
          itemStyle: {
            normal: {
              borderColor: "#fff",
              areaColor: "#1432A3",
              borderWidth: 1.2
            },
            emphasis: {
              areaColor: "#fff",
              borderWidth: 2
            }
          },
          animation: false,
          roam: false,
          zoom: 1.25,
          data: this.datas.map(d => {
            if (this.datas[7]) {
              d.label = {
                show: true,
                fontSize: 24,
                color: "#000"
              };
              return d;
            }
            d.label = {
              show: true,
              fontSize: 24,
              color: "#fff"
            };
            return d;
          })
        }
      };
      this.myChart.setOption(option);
      this.$store.commit("addCharts", this.myChart);
      //点击事件,根据点击某个省份计算出这个省份的数据
      this.myChart.on("click", params => {
        const index = this.datas.findIndex(item => item.value === params.value);
        const colorList = JSON.parse(JSON.stringify(this.color));
        colorList[index] = "#fff";

        this.myChart.setOption({
          visualMap: {
            inRange: {
              color: colorList
            }
          },

          series: {
            data: this.datas.map((d, i) => {
              if (index === i) {
                d.label = {
                  show: true,
                  fontSize: 24,
                  color: "#000"
                };
              } else {
                d.label = {
                  show: true,
                  fontSize: 24,
                  color: "#fff"
                };
              }

              return d;
            })
          }
        });
        this.$store.commit("updateName", params.name);
      });
    }
  }
};
</script>

<style scoped lang="less">
.box {
  width: 1327px;
  height: 1187px;
  z-index: 10;
}
</style>
