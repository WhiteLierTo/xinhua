<template>
  <div class="activity-wrapper" :class="{empty:!info}">
    <div class="activity-container" @click="activityClick" v-if="info">
      <div class="img-container">
        <img :src="info.contentimgpath" alt/>
        <div class="flag-container" :class="{grey:info.state === 0 || info.state === 'l1_finish'}">{{ info.state |
          stateFormat }}
        </div>
      </div>

      <div class="detail-container">

        <div class="title">{{ info.title }}</div>

        <div class="time detail-row">
          <i class="fa fa-calendar icon" aria-hidden="true"></i>
          <span class="detail-text">{{ info.startdate | timeFormatWithDay }}&nbsp;&nbsp;~</span>
        </div>

        <div class="detail-row">
          <i class="fa fa-calendar icon" aria-hidden="true" style="opacity: 0"></i>
          <span class="detail-text">{{ info.enddate | timeFormatWithDay }}</span>
        </div>

        <div class="detail-row">
          <i class="fa fa-map-marker-alt icon"></i>
          <span class="detail-text">{{ info.address }}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  let dayToZH = ["一", "二", "三", "四", "五", "六", "日"];

  function formatTime(startTime, endTime) {
    if (!startTime || !endTimeStr) {
      return ""
    }
    startTime = new Date(startTime);
    endTime = new Date(endTime);
    let yearMouthDay = `${startTime.getFullYear()}年${(startTime.getMonth() + 1).toString().padStart(2, "0")}月${data.getDate().toString().padStart(2, "0")}日`;
    let day = `星期${dayToZH[startTime.getDay()]}`;
    let startTimeStr = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`;
    let endTimeStr = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
    return `${yearMouthDay} ${day} <br /> ${startTimeStr} - ${endTimeStr}`
  }

  export default {
    name: "xh-activity",
    props: {
      info: Object
    },

    filters: {
      timeFormatWithDay(time) {
        let startTime = new Date(time);
        let yearMouthDay = `${startTime.getFullYear()}年${(startTime.getMonth() + 1).toString().padStart(2, "0")}月${startTime.getDate().toString().padStart(2, "0")}日`;
        let day = `星期${dayToZH[startTime.getDay()]}`;
        let startTimeStr = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`;
        return `${yearMouthDay} ${startTimeStr} ${day} `
      },

      stateFormat(state) {
        return {
          0: "草稿状态",
          l1_finish: "已经结束",
          l2_coming: "即将到来",
          l3_hot: "正在进行"
        }[state]
      }
    },

    methods: {
      activityClick() {
        if (process.isMob) {
          location.href = `./activityDetail-mob?id=${this.info.id}`;
        } else {
          location.href = `./activityDetail?id=${this.info.id}`;
        }
      }
    }
  };
</script>

<style scoped lang="less">
  .activity-wrapper {
    width: 340px;
    height: 380px;
    margin-bottom: 50px;

    .activity-container {
      width: 100%;
      height: 100%;
      font-weight: 300;
      font-size: 14px;
      line-height: 24px;
      background: white;
      border-radius: 4px;
      color: #222;
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      transition: all 0.5s;
      cursor: pointer;

      .img-container {
        height: 190px;
        flex-shrink: 0;
        overflow: hidden;
        position: relative;

        .flag-container {
          position: absolute;
          left: 6px;
          top: 6px;
          width: 34px;
          height: 34px;
          background: darkred;
          border-radius: 4px;
          font-size: 12px;
          line-height: 14px;
          color: white;
          display: flex;
          align-items: center;
          text-align: center;
        }

        .grey {
          background: #808080;
        }

        img {
          width: 100%;
          height: 100%;
        }

        &:after {
          content: "阅读详情 >";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 12px;
          background: rgba(0, 152, 255, 0.8);
          opacity: 0;
          transition: all 0.5s;
        }
      }

      .detail-container {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding: 16px;

        .title {
          font-size: 18px;
          line-height: 28px;
          font-weight: 500;
          max-height: 56px;
          overflow: hidden;

          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .time {
          margin-top: auto;
        }

        .detail-row {
          display: flex;
          align-items: center;

          .icon {
            color: #0499ff;
          }

          .detail-text {
            margin-left: 10px;
            color: #707070;
            font-weight: 300;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      &:hover {
        box-shadow: 0 5px 40px 0 rgba(0, 0, 0, 0.2);

        .img-container:after {
          opacity: 1;
        }
      }
    }
  }

  .mob {
    width: calc(100vw - 0.2rem);
    height: calc(100vw - 0.15rem);
    margin-bottom: 0.2rem;
  }

  .mob.empty {
    display: none;
  }

</style>
