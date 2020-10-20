<template>
  <div class="actives-mob-container">

    <div class="index-has-padding-container">
      <xhCarouselMob :carousels="banners" v-if="banners.length"/>

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
        <xhActivity class="mob" v-for="(active,index) in showActives" :info="active" :key="index"/>
      </div>
    </div>

    <div class="connect-us-container">
      <div class="connect-us-text">联系我们</div>
      <div class="under-line"></div>
      <div class="connect-us-row">
        <i class="fa fa-phone connect-icon"></i>
        <span>025-58682476</span>
      </div>
      <div class="connect-us-row">
        <i class="fa fa-envelope connect-icon"></i>
        <span>wumengying@xhfedia.com</span>
      </div>
      <div class="connect-us-row">
        <i class="fa fa-map-marker-alt connect-icon"></i>
        <span>南京市江东中路369号新华报业传媒广场1号楼24楼</span>
      </div>
    </div>
  </div>
</template>

<script>
  import xhCarouselMob from "../components/index-mob/xh-carousel-mob"
  import xhActivity from "../components/activity/xh-activity";
  import activityMixin from "../mixins/activity"

  export default {
    name: "activity-mob",
    layout: "default-mob",
    components: {xhCarouselMob, xhActivity},
    mixins: [activityMixin]
  }
</script>

<style scoped lang="less">
  .actives-mob-container {
    padding: 0.7rem 0 0;

    .tabs-container {
      height: 0.38rem;
      border-bottom: 1px solid #eaeaea;
      margin: 0.2rem 0 0.1rem;
      display: flex;

      .tab-cell {
        margin-right: 0.15rem;
        line-height: 0.38rem;
        font-size: 15px;
        color: #222;
        font-weight: 300;
        cursor: pointer;
      }

      .tab-cell-active {
        font-weight: 600;
        border-bottom: 2px solid #222;
      }
    }

    .connect-us-container {
      width: 100%;
      height: 3.6rem;
      background: url("../assets/activity/bg2XH2-4@2x.png");
      background-size: 100% 100%;
      padding-top: 1px;

      .connect-us-text {
        font-size: 22px;
        font-weight: 300;
        color: #fff;
        width: 100%;
        text-align: center;
        margin-top: 0.6rem;
      }

      .under-line {
        width: 30px;
        height: 2px;
        background: #0098ff;
        margin: 20px auto 30px;
      }

      .connect-us-row {
        width: 100%;
        margin: 0 auto 0.15rem;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: 300;

        .connect-icon {
          font-size: 16px;
          margin-right: 0.1rem;
        }
      }
    }
  }

  .index-has-padding-container {
    width: 100%;
    padding: 0 0.1rem;
  }
</style>
