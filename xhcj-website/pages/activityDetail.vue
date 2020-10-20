<template>
  <div>
    <div class="activity">
      <img v-if="detail.contentimgpath" :src="detail.contentimgpath" alt="" class="pre-img">
      <div class="detail-detail-container">
        <div class="detail-cell" style="flex:1.3">
          <p><i class="fa fa-calendar icon" aria-hidden="true"></i> <span class="detail-title">时间</span></p>
          <p class="detail-content" v-html="getFormatTime2(detail.startdate,detail.enddate)"></p>
        </div>
        <div class="detail-cell">
          <p><i class="fa fa-map-marker icon" aria-hidden="true"></i> <span class="detail-title">地点</span></p>
          <p class="detail-content">{{ detail.address }}</p>
        </div>
        <div class="detail-cell">
          <p><i class="fa fa-calendar icon" aria-hidden="true"></i> <span class="detail-title">主办方</span></p>
          <p class="detail-content">{{ detail.sponsor }}</p>
        </div>
        <div class="detail-cell">
          <p><i class="fa fa-user icon" aria-hidden="true"></i> <span class="detail-title">限额</span></p>
          <p class="detail-content">{{ detail.num }}</p>
        </div>
      </div>
      <div class="detail-introduce">
        <div class="detail-introduce-title">
          活动介绍
          <div class="detail-introduce-bottom"></div>
        </div>
        <div class="html-container" v-html="detail.content"></div>
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
  import activityDetailMixin from "../mixins/activityDetail"

  export default {
    mixins: [activityDetailMixin]
  };
</script>
<style lang="less" scoped>
  .activity {
    width: 1120px;
    margin: 90px auto;

    .pre-img {
      width: 100%;
      margin-bottom: 50px;
    }

    .detail-detail-container {
      width: 100%;
      height: 80px;
      display: flex;

      .detail-cell {
        flex: 1;
        height: 100%;
        overflow: hidden;
        border-left: 1px solid #eaeaea;
        padding: 0 22px;

        .icon {
          color: #0098ff90;
          position: relative;
          top: 1px;
        }

        .detail-title {
          color: #999;
          margin-left: 4px;
          font-weight: 300;
          font-size: 14px;
        }

        .detail-content {
          color: #222222;
          margin-top: 10px;
          font-weight: 600;
        }
      }
    }

    .detail-introduce {
      margin-top: 140px;
      width: 100%;

      .detail-introduce-title {
        width: 100%;
        text-align: center;
        font-size: 36px;
        height: 70px;
        color: #222;
        font-weight: 300;
        position: relative;
        margin-bottom: 70px;

        .detail-introduce-bottom {
          width: 30px;
          height: 2px;
          position: absolute;
          bottom: 0;
          background: #0098ff;
          left: calc(50% - 15px);
        }
      }
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

</style>
