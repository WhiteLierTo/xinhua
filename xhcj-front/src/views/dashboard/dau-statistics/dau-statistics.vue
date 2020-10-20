<template>
  <div class="article-statistics-container" v-loading="loading">
    <dashboardFilter :onTimeChange="onTimeChange"></dashboardFilter>

    <div class="cards-container">
      <infoCard :info="info" v-for="(info,index) in infoCards" :key="index"/>
    </div>

    <div class="row-one-charts-container">
      <div class="line-chart-container">
        <lineChart :data="loginRegData" :chartOptions="lineChartOption"/>
      </div>
      <div class="divider"></div>
      <div class="pie-chart-container">
        <pieChart title="月活跃度占比统计" :isPercent="false" :data="activePieData"/>
      </div>
    </div>

    <div class="row-two-charts-container">
      <div class="numbers-chart-real-container">
        <barChart :data="PUData" :chartOptions="PUOption"/>
      </div>
      <div class="numbers-chart-table-container">
        <div class="title">阅读数排名统计</div>
        <div class="table-container">
          <div class="table-row">
            <div class="cell" style="flex: 4;">栏目</div>
            <div class="cell">UV</div>
            <div class="cell">PV</div>
          </div>
          <div
              class="table-row"
              v-for="(item,index) in PUData"
              :key="index"
          >
            <div class="cell" style="flex: 4;">{{item[0]}}</div>
            <div class="cell">{{item[1] }}</div>
            <div class="cell">{{item[2]}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row-three-charts-container">
      <barChart title="推广数据报表" :data="extensionDta" :chartOptions="extensionOption"/>
    </div>
  </div>
</template>

<script>
  import dashboardFilter from "../dashboard-filter/dashboard-filter"
  import infoCard from "../article-statistics/infoCard"
  import lineChart from "../charts/line"
  import barChart from "../charts/bar"
  import pieChart from "../charts/pie"

  export default {
    name: "dau-statistics",
    components: {dashboardFilter, infoCard, lineChart, barChart, pieChart},

    data() {
      return {
        infoCards: [
          {
            label: "注册数",
            percent: 0,
            isUp: true,
            color: "#FFBB00",
            info: [
              {label: "昨日注册数", value: 0},
              {label: "年度累计", value: 0},
            ],
          },
          {
            label: "登录数",
            percent: 0,
            isUp: false,
            color: "#7B9ADB",
            info: [
              {label: "昨日登录数", value: 0},
              {label: "本月登录", value: 0},
            ],
          },
          {
            label: "发稿数",
            percent: 0,
            isUp: true,
            color: "#11C0DF ",
            info: [
              {label: "昨日发稿数", value: 0},
              {label: "本月累计", value: 0},
            ],
          },
          {
            label: "安装数",
            percent: 0,
            isUp: false,
            color: "#58BD00",
            info: [
              {label: "昨日安装数", value: 0},
              {label: "年度累计", value: 0},
            ],
          },
        ],

        loginRegData: [],
        lineChartOption: {
          isTimeLine: false,
          showArea: false,
          smooth: false,
          isMany: true,
          names: ["注册人数", "登录人数"]
        },
        activePieData: [],


        PUData: [],
        PUOption: {
          isMany: true,
          isStack: true,
          manyTypes: ["UV", "PV"]
        },

        extensionDta: [],
        extensionOption: {
          align: true,
          isMany: true,
          isStack: false,
          manyTypes: ["点击量", "安装量", "注册量"]
        },

        query: {
          dayCount: 0,
        },
        loading: true,
        loadingRandom: 0
      }
    },
    mounted() {
      this.getDAUPeriodData();
      this.getDAUStaticData();
    },
    methods: {
      onTimeChange(activeIndex, timeRange) {
        let dayCountMapping = [0, 7, 30];
        if (activeIndex !== -1) {
          this.query = {
            dayCount: dayCountMapping[activeIndex]
          }
        } else {
          this.query = {
            beginDate: this._formatTime(timeRange[0]),
            endDate: this._formatTime(timeRange[1])
          }
        }

        this.getDAUPeriodData();
      },


      async getDAUStaticData() {
        let [ok, data] = await this.$ajax.dashboard.DAUStaticData(this.query);
        if (!ok) return;

        // 卡片数据

        [this.infoCards[0].isUp, this.infoCards[0].percent] = this._formatPercent(data.topData.registRadio);
        this.infoCards[0].info[0].value = data.topData.yestRegistNum;
        this.infoCards[0].info[1].value = data.topData.yearRegistNum;

        [this.infoCards[1].isUp, this.infoCards[1].percent] = this._formatPercent(data.topData.loginRadio);
        this.infoCards[1].info[0].value = data.topData.yestLoginNum;
        this.infoCards[1].info[1].value = data.topData.curMonLoginNum;

        [this.infoCards[2].isUp, this.infoCards[2].percent] = this._formatPercent(data.topData.publicRadio);
        this.infoCards[2].info[0].value = data.topData.yestPublicCount;
        this.infoCards[2].info[1].value = data.topData.curMonPublicCount;

        [this.infoCards[3].isUp, this.infoCards[3].percent] = this._formatPercent(data.topData.registRadio);
        this.infoCards[3].info[0].value = data.topData.yestRegistNum;
        this.infoCards[3].info[1].value = data.topData.yearRegistNum;


        // 折线图
        let loginRegData = [];
        loginRegData.push(data.loginRegistList.map(d => [d.clickDate, d.registNum]));
        loginRegData.push(data.loginRegistList.map(d => [d.clickDate, d.loginNum]));
        this.loginRegData = loginRegData;

        // 饼图
        this.activePieData = [["活跃人数", data.activeTotal.activestCount], ["不活跃人数", data.activeTotal.noActiveCount], ["较活跃人数", data.activeTotal.activeCount]]
      },

      _formatPercent(n) {
        let percent = Math.floor((n || 0) * 100);
        let realPercent = Math.abs(percent - 100);
        return [percent >= 100, realPercent];
      },

      async getDAUPeriodData() {
        this.loading = true;
        let loadingRandom = Math.random();
        this.loadingRandom = loadingRandom;

        let [ok, data] = await this.$ajax.dashboard.DAUPeriodData(this.query);
        if (!ok) return;
        if (loadingRandom !== this.loadingRandom) return;
        this.PUData = data.pvAndUvList.map(d => [d.channelName, d.uv, d.pv]);
        this.extensionDta = data.inviteList.map(d => [d.userName, d.viewNum, d.installNum, d.registNum]);
        this.loading = false;
      },

      _getRandomNumber(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min)
      },

    }
  }
</script>

<style scoped lang="less">
  @import "../../../style/config.less";
  @import "../../../style/styles.less";

  .article-statistics-container {
    padding-right: @defaultPaddingY / 2;

    .cards-container {
      margin-top: @defaultPaddingY;
      height: 200px;
      display: flex;
    }

    .title {
      width: 100%;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 10px;
      flex-shrink: 0;
    }

    .table-container {
      width: 100%;
      border: 1px solid @defaultBorderColor;
      flex: 1;
      overflow: auto;

      .table-row {
        height: 37px;
        line-height: 40px;
        text-align: center;
        display: flex;

        &:first-child {
          background: @defaultTableHeadBgColor !important;
          color: @defaultTableHeadColor;
          font-weight: 600;
        }

        &:nth-child(2n+1) {
          background: @superLightGray;
        }

        .cell {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

        }

        .empty-cell {
          color: @lightGray;
        }
      }
    }

    .row-one-charts-container {
      width: 100%;
      height: 522px;
      display: flex;
      margin-top: @defaultPaddingY;
      background: white;
      padding: @defaultPaddingY;

      .line-chart-container {
        height: 100%;
        flex: 2;
        padding: @defaultPaddingY @defaultPaddingY @defaultPaddingY 0;
      }

      .divider {
        width: 15px;
        background: @defaultBgColor;
      }

      .pie-chart-container {
        flex: 1;
        height: 100%;
        padding-left: @defaultPaddingY;
        overflow: hidden;
      }
    }

    .row-two-charts-container {
      width: 100%;
      height: 400px;
      display: flex;
      margin-top: @defaultPaddingY;
      background: white;
      padding: @defaultPaddingY;
      overflow: hidden;

      .numbers-chart-real-container {
        flex: 2;
        margin-right: @defaultPaddingY;
      }

      .numbers-chart-table-container {
        flex: 1;
        overflow: auto;
        display: flex;
        flex-direction: column;
      }

    }

    .row-three-charts-container {
      width: 100%;
      height: 410px;
      margin-top: @defaultPaddingY;
      padding: @defaultPaddingY;
      overflow: hidden;
      background: white;
    }

  }
</style>
