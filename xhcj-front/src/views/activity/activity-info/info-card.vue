<template>
  <div class="info-card-container" :class="{selected:isSelected}" @click="toggleSelect">
    <div class="tag" :style="{backgroundColor:$utils.data.activity.getActStateColorByValue(info.state)}">
      {{ $utils.data.activity.getActStateLabelByValue(info.state) }}
    </div>
    <div class="select-circle" :class="{'select-circle-selected':isSelected}">
      <i class="el-icon-check check-icon"></i>
    </div>
    <div class="content-container">
      <div class="title">{{ info.title }}</div>
      <div class="detail-row">活动时间：{{ $utils.format.timeStampToStandardStr(info.startdate) }} ~ {{
        $utils.format.timeStampToStandardStr(info.enddate) }}
      </div>
      <div class="detail-row" v-if="info.applystarttime && info.applyendtime">报名时间：{{
        $utils.format.timeStampToStandardStr(info.applystarttime) }} ~ {{
        $utils.format.timeStampToStandardStr(info.applyendtime) }}
      </div>
      <div class="detail-row" v-if="info.address">举办地址：{{info.address}}</div>
      <div class="detail-row" v-if="info.num">报名人数：{{info.num}}</div>
    </div>
    <div class="labels-container">
      <div v-for="(item,index) in info.tags?info.tags.split(','):[]" :key="index">
        <div class="label" v-if="item">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "info-card",
    props: ["info", "isSelected", "toggleSelect"],
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less">
  @import "../../../style/config";
  @import "../../../style/styles";

  .info-card-container {
    width: 470px;
    min-height: 370px;
    background: white;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    cursor: pointer;

    @media screen and (max-width: 1400px) {
      width: 360px;
      min-height: 300px;
    }

    .tag {
      width: 138px;
      height: 40px;
      background: @defaultBorderColor;
      border-radius: 8px 0 8px 0;
      color: white;
      .flexCenter();
    }

    .select-circle {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 1px solid gray;
      position: absolute;
      right: 16px;
      top: 16px;
      .flexCenter();
      cursor: pointer;

      .check-icon {
        font-size: 10px;
        color: @defaultBlueClick;
        display: none;
      }
    }

    .select-circle-selected {
      border-color: @defaultBlueClick;

      .check-icon {
        display: block;
      }
    }

    .content-container {
      padding: @defaultPaddingX @defaultPaddingY;

      .title {
        font-size: @bigFontSize;
        color: @lightBlack;
        margin-bottom: @defaultPaddingY;
        font-weight: 600;
      }

      .detail-row {
        line-height: @defaultFontSize * 2;
      }
    }

    .labels-container {
      min-height: 80px;
      margin-top: auto;
      border-top: 1px @lightBlue dashed;
      display: flex;
      align-items: center;
      padding: 10px @defaultPaddingY;
      flex-wrap: wrap;

      .label {
        height: 40px;
        padding: 0 20px;
        background: rgba(44, 59, 81, 0.06);
        border-radius: 21px;
        .flexCenter();
        color: #445F87;
        margin-right: 10px;
        margin-bottom: 5px;
      }
    }
  }

  .selected {
    border: 1px solid @defaultBlueClick;
    box-shadow: 4px 4px 14px 0 rgba(0, 0, 0, 0.3);
  }
</style>
