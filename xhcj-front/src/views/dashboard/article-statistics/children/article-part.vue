<template>
  <div class="article-part-container">
    <div class="cards-container">
      <infoCard :info="info" v-for="(info,index) in infoCards" :key="index"/>
    </div>

    <div class="time-chart-container">
      <lineChart title="今日阅读时间行为分析" :data="timeLineData" :chartOptions="timeChartOptions"/>
    </div>

    <div class="numbers-chart-container" v-loading="loading">

      <div class="numbers-chart-inner">
        <div class="numbers-chart-real-container">
          <lineChart title="行为数据分析" :data="actionsData" :chartOptions="actionsChartOptions"/>
        </div>
        <div class="numbers-chart-table-container">
          <div class="title">阅读数排名统计</div>
          <div class="table-container">
            <div class="table-row">
              <div class="cell">排名</div>
              <div class="cell" style="flex: 3">标题名</div>
              <div class="cell">阅读</div>
            </div>
            <div
                class="table-row"
                v-for="(item,index) in actionTableData"
                :key="index"
            >
              <div class="cell">{{index+1 }}</div>
              <div class="cell" style="flex: 3">{{item.title }}</div>
              <div class="cell">{{item.clickCount}}</div>
            </div>

          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="classification-chart-inner">
        <div class="bar-chart-inner">
          <barChart :data="actionsByArticleTypeData" :chartOptions="barChartOption"/>
        </div>
        <div class="bar-chart-table-container">
          <div class="table-container">
            <div class="table-row">
              <div class="cell">#</div>
              <div class="cell" style="flex: 3">类型</div>
              <div class="cell">阅读</div>
              <div class="cell">点赞</div>
              <div class="cell">分享</div>
              <div class="cell">评论</div>
            </div>
            <div
                class="table-row"
                v-for="(item,index) in actionsByArticleTypeData"
                :key="index"
            >
              <div class="cell">{{index + 1 }}</div>
              <div class="cell" style="flex: 3">{{item[0]}}</div>
              <div class="cell">{{item[1]}}</div>
              <div class="cell">{{item[2]}}</div>
              <div class="cell">{{item[3]}}</div>
              <div class="cell">{{item[4]}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="pie-charts-container">
        <div class="pie-chart">
          <pieChart :data="sendArticlePieData" title="编辑发稿占比" :isPercent="false"></pieChart>
        </div>
        <div class="pie-chart">
          <pieChart :data="deleteArticlePieData" :isDonut="true" title="编辑撤稿占比" :isPercent="false"></pieChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import infoCard from "../infoCard"
  import lineChart from "../../charts/line"
  import barChart from "../../charts/bar"
  import pieChart from "../../charts/pie"

  export default {
    name: "article-part",
    components: {infoCard, lineChart, barChart, pieChart},

    data() {
      return {
        infoCards: [
          {
            label: "阅读数",
            percent: 0,
            isUp: true,
            color: "#FFBB00",
            info: [
              {label: "昨日阅读数", value: 0},
              {label: "本月累计", value: 0},
            ],
          },
          {
            label: "评论数",
            percent: 0,
            isUp: true,
            color: "#7B9ADB",
            info: [
              {label: "昨日评论数", value: 0},
              {label: "本月累计", value: 0},
            ],
          },
          {
            label: "点赞数",
            percent: 0,
            isUp: true,
            color: "#11C0DF",
            info: [
              {label: "昨日点赞数", value: 0},
              {label: "本月累计", value: 0},
            ],
          },
          {
            label: "分享数",
            percent: 0,
            isUp: true,
            color: "#58BD00",
            info: [
              {label: "昨日分享数", value: 0},
              {label: "本月累计", value: 0},
            ],
          },
        ],

        timeLineData: [],
        timeChartOptions: {
          isMany: true,
          names: [],
          showArea: false
        },

        activeNumbersChartsTabIndex: 0,
        query: {
          dayCount: 0,
        },

        actionsData: [], // 行为数据分析
        actionsChartOptions: {
          isMany: true,
          smooth: false,
          names: ["阅读", "点赞", "分享", "评论"],
        },
        actionTableData: [],

        fakeBarData: [],
        actionsByArticleTypeData: [],
        barChartOption: {
          isMany: true,
          isStack: true,
          manyTypes: ["阅读", "点赞", "分享", "评论"]
        },

        sendArticlePieData: [],
        deleteArticlePieData: [],

        loading: true,
        loadingRandom: 0
      }
    },
    mounted() {
      this.getArticleStatic();
      this.getTodayReadingStatic();
      this.getArticlePeriodData();
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

        this.getArticlePeriodData();
      },

      _formatTime(t) {
        let time = new Date(t);
        return `${time.getFullYear()}-${(time.getMonth() + 1).toString().padStart(2, '0')}-${time.getDate().toString().padStart(2, '0')}`
      },

      async getArticleStatic() {
        let [ok, data] = await this.$ajax.dashboard.articleStatic();
        if (!ok) return;

        // TODO 丑陋!!
        this.infoCards[0].info[0].value = data.lastClickCount;
        this.infoCards[0].info[1].value = data.curMonClickCount;
        [this.infoCards[0].isUp, this.infoCards[0].percent] = this._formatPercent(data.clickRadio);

        this.infoCards[1].info[0].value = data.lastComCount;
        this.infoCards[1].info[1].value = data.curMonComCount;
        [this.infoCards[1].isUp, this.infoCards[1].percent] = this._formatPercent(data.comRadio);

        this.infoCards[2].info[0].value = data.lastZanCount;
        this.infoCards[2].info[1].value = data.curMonZanCount;
        [this.infoCards[2].isUp, this.infoCards[2].percent] = this._formatPercent(data.zanRadio);

        this.infoCards[3].info[0].value = data.lastShareCount;
        this.infoCards[3].info[1].value = data.curMonShareCount;
        [this.infoCards[3].isUp, this.infoCards[3].percent] = this._formatPercent(data.shareRadio);

      },

      _formatPercent(n) {
        let percent = Math.floor((n || 0) * 100);
        let realPercent = Math.abs(percent - 100);
        return [percent >= 100, realPercent];
      },

      async getTodayReadingStatic() {
        let [ok, data] = await this.$ajax.dashboard.todayReadingStatic();
        if (!ok) return;

        const articleTypeMapping = {
          1: "原创",
          2: "抓取",
          3: "广告",
          4: "财经号",
          5: "视频",
          6: "直播",
          7: "活动",
          8: "专题"
        };

        let timeLineData = Array(9).fill(null).map(() => []);

        data.forEach(d => {
          timeLineData[d.articleType].push(d)
        });

        timeLineData.shift();
        timeLineData = timeLineData.filter(d => d.length);
        const names = timeLineData.map(dataList => articleTypeMapping[dataList[0].articleType]);
        timeLineData = timeLineData.map(dataList => {
          return dataList.map(d => [d.clickDate, d.clickCount])
        });

        this.timeChartOptions.names = names;
        this.timeLineData = timeLineData;

      },

      async getArticlePeriodData() {
        this.loading = true;
        let loadingRandom = Math.random();
        this.loadingRandom = loadingRandom;
        let [ok, data] = await this.$ajax.dashboard.articlePeriodData(this.query);
        if (!ok) return;
        if (loadingRandom !== this.loadingRandom) return;

        // 行为数据
        let actionsData = Array(4).fill(null).map(() => []);
        data.list1.forEach(d => {
          actionsData[0].push([d.clickDate, d.clickCount]);
          actionsData[1].push([d.clickDate, d.zanCount]);
          actionsData[2].push([d.clickDate, d.shareCount]);
          actionsData[3].push([d.clickDate, d.comCount]);
        });
        this.actionsData = actionsData;

        // 表格数据
        this.actionTableData = data.list2;

        // 堆积数据
        const articleTypeMapping = {
          1: "原创",
          2: "抓取",
          3: "广告",
          4: "财经号",
          5: "视频",
          6: "直播",
          7: "活动",
          8: "专题"
        };
        this.actionsByArticleTypeData = data.list3.map(d => [articleTypeMapping[d.articleType], d.clickCount, d.zanCount, d.shareCount, d.comCount]);

        // 发稿占比
        let sendArticlePieData = data.list4.map(d => [d.userName, d.articleCount]);
        this.sendArticlePieData = sendArticlePieData.length ? sendArticlePieData : [];

        // 撤稿占比
        let deleteArticlePieData = data.list5.map(d => [d.userName, d.articleCount]);
        this.deleteArticlePieData = deleteArticlePieData.length ? deleteArticlePieData : [];

        this.loading = false;
      },


      _getRandomNumber(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min)
      },

    }
  }
</script>

<style scoped lang="less">
  @import "../../../../style/config.less";
  @import "../../../../style/styles.less";

  .article-part-container {

    .cards-container {
      margin-top: @defaultPaddingY;
      height: 200px;
      display: flex;
    }

    .time-chart-container {
      width: 100%;
      height: 390px;
      background: white;
      margin-top: @defaultPaddingY;
      padding: @defaultPaddingY;
    }

    .numbers-chart-container {
      width: 100%;
      background: white;
      margin-top: @defaultPaddingY;
      padding: @defaultPaddingY;
      display: flex;
      flex-direction: column;


      .numbers-chart-inner {
        height: 477px;
        margin-top: 10px;
        display: flex;

        .numbers-chart-real-container {
          flex: 2;
          margin-right: 20px;
          height: 100%;
        }

        .numbers-chart-table-container {
          flex: 1;
          overflow: hidden;
          margin-top: 25px;
          height: 92%;
          display: flex;
          flex-direction: column;
        }
      }

      .divider {
        height: 20px;
        background: @defaultBgColor;
        margin-top: 30px;
        margin-bottom: 30px;
      }

      .classification-chart-inner {
        height: 477px;
        display: flex;

        .bar-chart-inner {
          flex: 2;
          margin-right: 20px;
          height: 100%;
        }

        .bar-chart-table-container {
          flex: 1;
          height: 100%;
          margin-top: 30px;
        }
      }

      .pie-charts-container {
        height: 540px;
        width: 100%;
        display: flex;
        overflow: hidden;

        .pie-chart {
          flex: 1;
        }
      }
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
          margin-left: 4px;
        }

        .empty-cell {
          color: @lightGray;
        }
      }
    }


  }
</style>
