<template>
  <div class="box">
    <div class="bank">
      <ul>
        <li
          v-for="(item, index) in bankDetailList"
          :key="index"
          :class="{ red: bankName === item.bankName }"
          @click="itemHandleClick(item)"
        >
          {{ item.bankName }}
        </li>
      </ul>
    </div>
    <div class="radar">
      <BaseWidthTitle :title="bankName">
        <div class="radar-content">
          <div class="radar-tu">
            <div id="radar" :style="{ width: '450px', height: '450px' }"></div>
          </div>
          <div class="radar-id">
            <el-row>
              <el-col :span="6" v-for="(item, index) in itemList" :key="index">
                <p>{{ item.tagName }}</p>
              </el-col>
            </el-row>
          </div>
        </div>
      </BaseWidthTitle>
    </div>
  </div>
</template>

<script>
export default {
  name: "Radar",
  data() {
    return {
      myChart: "",
      bankDetailList: [],
      name: "",
      itemList: [],
      bankName: "",
      valList: [],
      areaEfficientGrades: "",
      areaServiceGrades: "",
      areaSurroundingsGrades: "",
    };
  },
  mounted() {
    this.getAreaList();
    this.$store.commit("addPolling", this.getAreaList);
  },
  computed: {
    getName() {
      return this.$store.state.name;
    },
    getValList() {
      return this.$store.state.valList;
    },
  },
  watch: {
    getName(val, oldVal) {
      if (val !== oldVal) {
        this.getAreaList();
      }
    },
    "$store.state.bankName"(val) {
      this.bankName = val;
    },
    "$store.state.itemList"(val) {
      this.itemList = val;
    },
    getValList(val, oldVal) {
      if (val !== oldVal) {
        this.valList = val;
        this.darwRadar();
      }
    },
    "$store.state.bankDetail"(val) {
      this.areaEfficientGrades = val.areaEfficientGrades;
      this.areaServiceGrades = val.areaServiceGrades;
      this.areaSurroundingsGrades = val.areaSurroundingsGrades;
    },
  },
  methods: {
    itemHandleClick(item) {
      const { efficientGrades, serviceGrades, surroundingsGrades } = item;
      this.itemList = item.tags;
      this.bankName = item.bankName;
      this.valList = [efficientGrades, surroundingsGrades, serviceGrades];
      this.darwRadar();
      this.$store.commit("updateBankName", this.bankName);
    },
    getAreaList() {
      const isMyself = true;
      this.name = this.$store.state.name;

      this.$ajax.areaList(isMyself, this.name).then((res) => {
        this.bankDetailList = res.data.data.bankDetailList;
        const {
          areaEfficientGrades,
          areaSurroundingsGrades,
          areaServiceGrades,
        } = res.data.data;
        const {
          bankName,
          efficientGrades,
          serviceGrades,
          surroundingsGrades,
          tags,
        } = this.bankDetailList[0];

        this.bankName = bankName;
        this.valList = [efficientGrades, surroundingsGrades, serviceGrades];
        this.itemList = tags;

        this.areaEfficientGrades = areaEfficientGrades;
        this.areaServiceGrades = areaServiceGrades;
        this.areaSurroundingsGrades = areaSurroundingsGrades;

        this.$store.commit("updatebank", res.data.data);
        this.darwRadar();
      });
    },
    darwRadar() {
      this.myChart = this.$echarts.init(document.getElementById("radar"));

      var option = {
        title: {},
        tooltip: {},
        radar: {
          shape: "circle",
          name: {
            textStyle: {
              color: "#fff",
              fontSize: "30",
            },
          },
          indicator: [
            { name: "效率", max: 5 },
            { name: "环境", max: 5 },
            { name: "服务", max: 5 },
          ],
          splitLine: {
            lineStyle: {
              color: "#69BAFF", //网格的颜色
            },
          },
          splitArea: {
            areaStyle: {
              color: "#001D7A",
            },
          },
        },
        series: [
          {
            type: "radar",

            data: [
              {
                value: this.valList,
                name: this.bankName,
                areaStyle: {
                  color: "rgba(105,255,232,0.5)", // 图表中各个图区域的颜色
                },
              },
              {
                value: [
                  this.areaEfficientGrades,
                  this.areaSurroundingsGrades,
                  this.areaServiceGrades,
                ],
                name: this.name,
                areaStyle: {
                  color: "rgba(255,171,50,0.5)", // 图表中各个图区域的颜色
                },
              },
            ],
          },
        ],
      };
      this.myChart.setOption(option);
      this.$store.commit("addCharts", this.myChart);
    },
  },
};
</script>

<style scoped lang="less">
.box {
  width: 573px;
  height: 1725px;
  display: flex;
  flex-direction: column;
  z-index: 11;

  .bank {
    color: #fff;
    width: 573px;
    height: 898px;
    background: rgba(0, 29, 122, 0.6);
    margin-right: 15px;
    margin-bottom: 49px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      background: #102568;
      width: 18px;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(52, 119, 255, 0.32);
      border-radius: 10px;
    }

    ul {
      padding-top: 65px;
      padding-bottom: 25px;
      z-index: 999;
      cursor: pointer;
    }

    li {
      font-size: 29px;
      text-align: center;
      padding-bottom: 34px;
      &:hover {
        color: red;
        cursor: pointer;
      }
    }

    .red {
      color: red;
    }
  }

  .radar {
    .radar-content {
      width: 573px;
      height: 680px;
      background: rgba(0, 29, 122, 0.6);
      overflow: hidden;

      .radar-tu {
        width: 450px;
        height: 450px;
        margin: 48px auto 40px;
      }

      .radar-id {
        font-size: 20px;
        margin-left: 23px;

        p {
          color: #fece89;
          width: 117px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          background: rgba(255, 255, 255, 0.3);
          border: 1px solid rgba(255, 255, 255, 1);
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
