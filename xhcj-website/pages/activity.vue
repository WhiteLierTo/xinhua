<template>
  <div class="actives-container">

    <div class="content">
      <xhCarousel :carousels="banners" v-if="banners.length"/>
      <div class="tabs-container" ref="tabs">
        <div
          class="tab-cell"
          :class="{'tab-cell-active':activeTabIndex === index}"
          @click="selectTab(index)"
          v-for="(tab,index) in tabs"
          :key="index"
        >{{tab.label}}
        </div>
      </div>
      <div class="activity-list-container">
        <xhActivity v-for="(active,index) in showActives" :info="active" :key="index"/>
      </div>
    </div>

    <div class="connect-us-container">
      <div class="connect-us-text">联系我们</div>
      <div class="under-line"></div>
      <div class="connect-us-row">
        <i class="fa fa-phone connect-icon" aria-hidden="true"></i>
        <span>025-58682476</span>
      </div>
      <div class="connect-us-row">
        <i class="fa fa-envelope connect-icon" aria-hidden="true"></i>
        <span>wumengying@xhfedia.com</span>
      </div>
      <div class="connect-us-row">
        <i class="fa fa-map-marker-alt connect-icon" aria-hidden="true"></i>
        <span>南京市江东中路369号新华报业传媒广场1号楼24楼</span>
      </div>
    </div>
  </div>
</template>

<script>
  import xhActivity from "../components/activity/xh-activity";
  import xhCarousel from "../components/index/xh-carousel"
  import activityMixin from "../mixins/activity"

  export default {
    name: "activitys",
    components: {xhCarousel, xhActivity},
    mixins: [activityMixin],

  };
</script>

<style scoped lang="less">
  .actives-container {
    .content {
      width: 1120px;
      margin: 70px auto 0;

      .tabs-container {
        height: 38px;
        border-bottom: 1px solid #eaeaea;
        margin: 44px 0 32px;
        display: flex;

        .tab-cell {
          margin-right: 40px;
          line-height: 38px;
          font-size: 16px;
          color: #222;
          font-weight: 300;
          cursor: pointer;
        }

        .tab-cell-active {
          font-weight: 600;
          border-bottom: 2px solid #222;
        }
      }

      .activity-list-container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background-size: 100% 100%;
      }
    }

    .connect-us-container {
      width: 100%;
      height: 360px;
      background: url("../assets/activity/bg2XH2-4@2x.png");
      background-size: 100% 100%;
      padding-top: 1px;

      .connect-us-text {
        font-size: 36px;
        font-weight: 300;
        color: #fff;
        width: 100%;
        text-align: center;
        margin-top: 60px;
      }

      .under-line {
        width: 30px;
        height: 2px;
        background: #0098ff;
        margin: 20px auto 30px;
      }

      .connect-us-row {
        width: 100%;
        margin: 0 auto 18px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        font-weight: 300;

        .connect-icon {
          font-size: 20px;
          margin-right: 10px;
        }
      }
    }
  }
</style>
