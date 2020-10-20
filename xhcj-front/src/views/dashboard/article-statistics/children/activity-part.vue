<template>
  <div class="activity-part-container">
    <div class="cards-container">
      <infoCard :info="info" v-for="(info,index) in infoCards" :key="index"/>
    </div>

    <div class="funnel-chart-container">
      <div class="funnel-chart-inner">
        <funnelChart title="XX活动"/>
      </div>
      <div class="funnel-table-container"></div>
    </div>
  </div>
</template>

<script>
  import infoCard from "../infoCard"
  import funnelChart from "../../charts/funnel"

  export default {
    name: "activity-part",
    components: {infoCard, funnelChart},
    data() {
      return {
        infoCards: [
          {
            label: "点击数",
            percent: 0,
            isUp: true,
            color: "#FFBB00",
            info: [
              {label: "昨日点击数", value: 0},
              {label: "本月累计", value: 0},
            ],
          },
          {
            label: "报名数",
            percent: 0,
            isUp: true,
            color: "#7B9ADB",
            info: [
              {label: "昨日报名数", value: 0},
              {label: "本月累计", value: 0},
            ],
          },
          {
            label: "审核数",
            percent: 0,
            isUp: true,
            color: "#11C0DF",
            info: [
              {label: "昨日审核数", value: 0},
              {label: "本月累计", value: 0},
            ],
          },
          {
            label: "参与数",
            percent: 0,
            isUp: true,
            color: "#58BD00",
            info: [
              {label: "昨日参与数", value: 0},
              {label: "本月累计", value: 0},
            ],
          },
        ],
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../../style/config.less";
  @import "../../../../style/styles.less";

  .activity-part-container {
    padding-right: @defaultPaddingY / 2;

    .cards-container {
      margin-top: @defaultPaddingY;
      height: 200px;
      display: flex;
    }

    .funnel-chart-container {
      width: 100%;
      height: 500px;
      background: white;
      margin-top: @defaultPaddingY;
      padding: @defaultPaddingY;
      display: flex;

      .funnel-chart-inner {
        height: 100%;
        margin-right: @defaultPaddingY;
        flex: 1;
        border: 1px solid red;
      }

      .funnel-table-container {
        height: 100%;
        flex: 1;
        border: 1px solid red;
      }
    }
  }
</style>
