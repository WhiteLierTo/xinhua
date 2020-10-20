<template>
  <div style="width: 100%;height: 100%">
    <div class="activity-detail-mob-container">
      <img v-if="detail.contentimgpath" :src="detail.contentimgpath" alt="" class="pre-img">

      <div class="detail-content-container">
        <div class="base-info-container">
          <div class="title">{{ detail.title }}</div>

          <div class="row">
            <i class="fa fa-calendar icon" aria-hidden="true"></i>
            <div class="detail-content" v-html="getMobFormatTime(detail.startdate,detail.enddate)"></div>
          </div>

          <div class="row">
            <i class="fa fa-map-marker icon" aria-hidden="true"></i>
            <div class="detail-content" v-html="detail.address"></div>
          </div>

          <div class="row">
            <i class="fa fa-user icon" aria-hidden="true"></i>
            <div class="detail-content" v-html="detail.sponsor"></div>
          </div>
        </div>
      </div>

      <div class="detail-content-container">
        <div class="base-info-container">

          <div class="big-row">
            <img src="../assets/activity/pice.png" alt="" class="icon">
            <div class="info-container">
              <div class="label">活动报名人数限额</div>
              <div class="value">{{ detail.num }}人</div>
            </div>
          </div>

          <div class="big-row">
            <img src="../assets/activity/time.png" alt="" class="icon">
            <div class="info-container">
              <div class="label">活动报名时间</div>
              <div class="value">{{ getMobFormatTime(detail.applystarttime,detail.applyendtime)}}</div>
            </div>
          </div>

          <div class="big-row">
            <img src="../assets/activity/member.png" alt="" class="icon">
            <div class="info-container">
              <div class="label">已报名人数</div>
              <div class="value">{{ detail.applySum }}人</div>
            </div>
          </div>

        </div>
      </div>

      <div class="detail-detail-title">
        <div class="dot dot1"></div>
        <div class="dot dot2"></div>
        <div class="dot dot3"></div>
        <p>活动详情</p>
        <div class="dot dot3"></div>
        <div class="dot dot2"></div>
        <div class="dot dot1"></div>
      </div>


      <div class="detail-content-container">
        <div class="base-info-container" style="margin-bottom: 0">
          <div class="html-container" v-html="detail.content"></div>
        </div>
      </div>

      <div style="height: 0.2rem"></div>
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
  import activityDetailMixin from "../mixins/activityDetail"

  export default {
    layout: "default-mob",
    mixins: [activityDetailMixin]
  };
</script>

<style scoped lang="less">

  .activity-detail-mob-container {
    margin-top: 0.53rem;
    width: 100%;
    height: 100%;
    background: #f1f1f1;

    .pre-img {
      width: 100%;
      display: block;
    }

    .detail-content-container {
      padding: 0 0.1rem;
      margin-top: 0.1rem;

      .base-info-container {
        width: 100%;
        padding: 0.1rem;
        background: #ffffff;
        border-radius: 10px;
        margin-bottom: 0.1rem;


        .title {
          color: #333333;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .row {
          font-weight: 300;
          color: #666666;
          font-size: 13px;
          display: flex;
          align-items: center;
          width: 100%;
          line-height: 20px;

          .icon {
            margin-right: 8px;
            opacity: 0.5;
          }
        }

        .big-row {
          display: flex;
          align-items: center;
          width: 100%;
          height: 0.6rem;
          border-bottom: 1px dotted #D2DEEC;
          margin-bottom: 0.1rem;
          padding-bottom: 0.1rem;

          &:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
            height: 0.5rem;
          }

          .icon {
            width: 0.5rem;
            margin-right: 0.2rem;
          }

          .info-container {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .label {
              overflow: hidden;
              color: #333333;
              font-size: 16px;
              font-weight: 600;

            }

            .value {
              overflow: hidden;
              color: #666666;
              font-size: 14px;
            }
          }
        }
      }
    }

    .detail-detail-title {
      color: #666666;
      font-size: 17px;
      text-align: center;
      margin-top: 0.2rem;
      margin-bottom: 0.1rem;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        margin: 0 10px;
      }

      .dot {
        border-radius: 50%;
        background: #D8D8D8;
        margin: 0 2px;
      }

      .dot1 {
        width: 5px;
        height: 5px;
      }

      .dot2 {
        width: 8px;
        height: 8px;
      }

      .dot3 {
        width: 10px;
        height: 10px;
      }
    }


    .detail-detail-container {
      width: 100%;
      border-left: 1px solid #eaeaea;
      padding: 0 0.1rem;

      .detail-cell {
        flex: 1;
        overflow: hidden;
        padding: 0 0 0.2rem 0.1rem;

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
          font-size: 14px;
        }
      }
    }

    .detail-introduce {
      margin-top: 0.4rem;
      width: 100%;

      .detail-introduce-title {
        width: 100%;
        text-align: center;
        font-size: 22px;
        height: 0.4rem;
        color: #222;
        font-weight: 300;
        position: relative;
        margin-bottom: 0.2rem;

        .detail-introduce-bottom {
          width: 0.3rem;
          height: 2px;
          position: absolute;
          bottom: 0;
          background: #0098ff;
          left: calc(50% - 0.15rem);
        }
      }
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
</style>
