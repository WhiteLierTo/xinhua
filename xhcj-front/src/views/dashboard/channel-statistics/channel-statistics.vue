<template>
  <div class="channel-statistics-container" v-loading="isTotalLoading">
    <dashboardFilter
        :tabs="['频道','专题']"
        :onTabChange="onTabChange"
        :onTimeChange="onTimeChange"
    >
      <el-button
          type="primary" plain style="height: 100%;margin-left: auto;"
          @click="isShowDataView = !isShowDataView">
        {{ isShowDataView?"查看图表":"查看数据" }}
      </el-button>
    </dashboardFilter>

    <div class="data-view-container" v-if="isShowDataView">
      <tableWithFilter
          :tableInfo="tableInfo"
          :mock="true"
          :onSearchEnd="onSearchEnd"
          v-model="tableThis"
      >
      </tableWithFilter>
    </div>

    <div class="xh-charts-container" v-if="!isShowDataView">
      <div class="one-chart" style="margin-right: 0">
        <barChart :title="`${activeTabIndex?'专题':'频道'}发稿量统计`" :data="publishData"
                  :chartOptions="{manyTypes:['发稿量']}"/>
      </div>
      <div class="one-chart">
        <pieChart :data="publishPieData"></pieChart>
      </div>
    </div>

    <div class="xh-charts-container" v-if="!isShowDataView">
      <div class="one-chart">
        <barChart :title="`${activeTabIndex?'专题':'频道'}访问量统计`" :onClick="onSelectBar" :data="clickData"
                  :chartOptions="{manyTypes:['访问量']}"/>
      </div>
      <div class="one-chart">
        <lineChart :title="`${activeChannelName} 每日访问量统计`" :data="clickTimeLineData"/>
      </div>
    </div>
  </div>
</template>

<script>
  import dashboardFilter from "../dashboard-filter/dashboard-filter"
  import barChart from "../charts/bar"
  import pieChart from "../charts/pie"
  import lineChart from "../charts/line"

  export default {
    name: "channel-statistics",
    components: {dashboardFilter, barChart, pieChart, lineChart},
    data() {
      return {
        activeTabIndex: 0,
        activeTimeTabIndex: -1,
        timeRange: [],
        fakeBarData: [
          // [类目 数值],[类目 数值]
        ],
        fakeTimeLineData: [
          // 时间 数值
        ],

        isShowDataView: false,
        tableInfo: {
          searchUrl: "",
          columns: [
            {
              prop: "channelName",
              label: "频道/专题",
            },
            {
              prop: "publicCount",
              label: "发稿量",
            },
            {
              prop: "publicPercent",
              label: "发稿总占比"
            },
            {
              prop: "clickCount",
              label: "访问量"
            },
            {
              prop: "clickPercent",
              label: "访问量占比"
            }
          ],
          hides: ["create", "modify", "deleteAll", "select"],
        },
        query: {
          channelType: "normal",
          dayCount: 0,
        },

        publishData: [], // 发稿量统计
        publishPieData: [], // 访问量比例
        clickData: [], // 访问量统计
        clickIdToNameMapping: new Map(),
        clickTimeLineData: [],

        isTotalLoading: true,
        isTimeLineLoading: true,

        activeChannelName: "",
        randomTimeLineLoadingKey: "",

        tableData: [], // 表格展示的data
        tableThis: null
      }
    },

    async mounted() {
      await this.getStatistics();
    },

    methods: {

      async getStatistics() {
        this.isTotalLoading = true;

        let [ok, data] = await this.$ajax.dashboard.channelsBase(this.query);
        if (!ok) return;
        data.publicList = data.publicList || [];
        data.clickList = data.clickList || [];

        let total = data.publicList.map(p => p.publicCount).reduce((total, cur) => total + cur, 0);
        this.publishData = data.publicList.map(p => [p.channelName, p.publicCount]);
        this.publishPieData = data.publicList.map(p => [p.channelName, this._formatNumber(p.publicCount, total)]);
        this.clickData = data.clickList.map(c => [c.channelName, c.clickCount]);
        this.clickIdToNameMapping = new Map(data.clickList.map(c => [c.channelName, c.channelId]));
        this.isTotalLoading = false;

        // 表格
        let tableData = data.publicList;
        this.publishPieData.forEach(([name, percent]) => {
          let index = tableData.map(d => d.channelName).indexOf(name);
          if (index === -1) {
            tableData.push({channelName: name, publicPercent: percent});
          } else {
            tableData[index].publicPercent = percent;
          }
        });

        let clickTotal = data.clickList.map(p => p.clickCount).reduce((total, cur) => total + cur, 0);
        this.clickData.forEach(([name, clickCount]) => {
          let index = tableData.map(d => d.channelName).indexOf(name);
          if (index === -1) {
            tableData.push({channelName: name, clickCount, clickPercent: this._formatNumber(clickCount, clickTotal)});
          } else {
            tableData[index].clickCount = clickCount;
            tableData[index].clickPercent = this._formatNumber(clickCount, clickTotal);
          }
        });

        tableData.forEach(d => {
          d.publicCount = d.publicCount || 0;
          d.publicPercent = (d.publicPercent || 0) + "%";
          d.clickPercent = (d.clickPercent || 0) + "%";
          d.clickCount = d.clickCount || 0;
        });

        this.tableData = tableData;

        if (this.isShowDataView && this.tableThis && this.tableThis.table) {
          this.tableThis.table.refresh()
        }

        // 默认都查一次,无所谓了
        this.getTimeLineData();
      },

      _formatNumber(n, total) {
        if (total === 0) return 0;
        return Math.floor(10000 * n / total) / 100
      },


      async getTimeLineData(id) {
        if (!id && !this.clickData.length) {
          this.clickTimeLineData = [];
          return
        }
        let randomKey = Math.random();
        this.randomTimeLineLoadingKey = randomKey;
        this.isTimeLineLoading = true;
        if (!id) {
          this.activeChannelName = this.clickData[0][0];
        }

        id = id || this.clickIdToNameMapping.get(this.clickData[0][0]);
        let query = {...this.query, channelId: id};
        let [ok, data] = await this.$ajax.dashboard.channelClickSta(query);
        if (ok) {
          this.clickTimeLineData = data.map(d => [d.clickDate || d.cliclDate, d.clickCount]);
        } else {
          this.clickTimeLineData = []
        }

        if (randomKey === this.randomTimeLineLoadingKey) {
          // 是我发出去的
          this.isTimeLineLoading = false;
        }
      },

      onTabChange(index) {
        this.activeTabIndex = index;
        this.query.channelType = index ? "special" : "normal";
        this.getStatistics();
      },

      onTimeChange(activeIndex, timeRange) {
        let dayCountMapping = [0, 7, 30];
        if (activeIndex !== -1) {
          this.query = {
            channelType: this.query.channelType,
            dayCount: dayCountMapping[activeIndex]
          }
        } else {
          this.query = {
            channelType: this.query.channelType,
            beginDate: this._formatTime(timeRange[0]),
            endDate: this._formatTime(timeRange[1])
          }
        }
        this.getStatistics()
      },

      _formatTime(t) {
        let time = new Date(t);
        return `${time.getFullYear()}-${(time.getMonth() + 1).toString().padStart(2, '0')}-${time.getDate().toString().padStart(2, '0')}`
      },


      getRandomBarData() {
        // 饼图一样用
        let randomChannelNumber = this._getRandomNumber(50, 10);
        this.fakeBarData = Array(randomChannelNumber).fill(null).map((d, index) => {
          return [`频道${index + 1}`, this._getRandomNumber(1000, 100000)]
        });
      },

      getRandomTimeLineData() {
        // 时间折线图
        let baseTime = +new Date("2020-01-01");
        let randomChannelNumber = this._getRandomNumber(50, 10);
        this.fakeTimeLineData = Array(randomChannelNumber).fill(null).map((d, index) => {
          baseTime += (24 * 60 * 60 * 1000);
          return [baseTime, this._getRandomNumber(1000, 100000)]
        });
      },

      _getRandomNumber(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min)
      },

      onSelectBar(name) {
        this.activeChannelName = name;
        this.getTimeLineData(this.clickIdToNameMapping.get(name));
      },

      onSearchEnd() {
        return this.$utils.gadgets.deepClone(this.tableData);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../style/config.less";
  @import "../../../style/styles.less";

  .channel-statistics-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .filter-container {
      width: 100%;
      padding: 10px @defaultPaddingY;
      background: white;
      flex-shrink: 0;

      .tabs-container {
        display: flex;
        align-items: center;

        .tab {
          width: 80px;
          line-height: 34px;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
          color: #666;
        }

        .tab-active {
          border-bottom: 3px solid @defaultBlueClick;
          color: #333333;
        }

      }

      .time-filter-container {
        display: flex;
        margin-top: @defaultPaddingY / 3;
        align-items: center;

        .time-tab {
          margin-right: @defaultPaddingY;
          color: #333;
          cursor: pointer;
        }

        .time-tab-active {
          color: @defaultBlueClick;
        }
      }
    }

    .data-view-container {
      flex: 1;
      overflow: hidden;
      background: white;
      margin-top: @defaultPaddingY;
    }

    .xh-charts-container {
      flex: 1;
      margin-top: @defaultPaddingY;
      display: flex;
      min-height: 350px;

      .one-chart {
        flex: 1;
        overflow: auto;
        background: white;
        padding: @defaultPaddingY;

        &::-webkit-scrollbar {
          display: none;
        }

        &:first-child {
          margin-right: @defaultPaddingY;
        }
      }
    }
  }
</style>
