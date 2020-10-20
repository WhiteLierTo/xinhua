<template>
  <div class="filter-container">
    <div class="tabs-container" v-if="tabs.length">
      <div class="tab" :class="{'tab-active':activeTabIndex === index}" @click="onSelfTabChange(index)"
           v-for="(tab,index) in tabs"
           :key="index">{{ tab }}
      </div>
      <slot>
      </slot>
    </div>
    <div class="time-filter-container">
      <div class="time-tab" :class="{'time-tab-active':activeTimeTabIndex === 0}" @click="selectTime(0)">今天</div>
      <div class="time-tab" :class="{'time-tab-active':activeTimeTabIndex === 1}" @click="selectTime(1)">7天</div>
      <div class="time-tab" :class="{'time-tab-active':activeTimeTabIndex === 2}" @click="selectTime(2)">30天</div>
      <el-date-picker
          v-model="timeRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="onDatePickerChange"
          style="width: 280px"
          :picker-options="datePickerOption"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
  // 90天限制
  export default {
    name: "dashboard-filter",
    props: {
      tabs: {
        type: Array,
        default: function () {
          return []
        }
      },
      onTabChange: {
        require: true,
        type: Function
      },
      onTimeChange: {
        require: true,
        type: Function
      }
    },
    data() {
      return {
        activeTabIndex: 0,
        activeTimeTabIndex: 0,
        timeRange: [],
        datePickerOption: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }
      }
    },

    methods: {
      onSelfTabChange(index) {
        this.activeTabIndex = index;
        this.onTabChange(index);
      },

      selectTime(index) {
        this.activeTimeTabIndex = index;
        this.timeRange = [];
        this.onTimeChange(this.activeTimeTabIndex, this.timeRange);
      },

      onDatePickerChange() {
        let duration = this.timeRange[1] - this.timeRange[0];
        if (duration > 90 * 24 * 60 * 60 * 1000) {
          this.$message.error("查询时间跨度不能超过90天");
          this.timeRange = [];
          return
        }

        this.activeTimeTabIndex = -1;
        this.onTimeChange(this.activeTimeTabIndex, this.timeRange);
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../../style/config.less";
  @import "../../../style/styles.less";

  .filter-container {
    width: 100%;
    padding: 10px @defaultPaddingY;
    background: white;
    flex-shrink: 0;

    .tabs-container {
      display: flex;
      align-items: center;
      margin-bottom: @defaultPaddingY / 3;

      .tab {
        width: 80px;
        line-height: 34px;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        color: #666;
        border-bottom: 3px solid transparent;
      }

      .tab-active {
        border-bottom: 3px solid @defaultBlueClick;
        color: #333333;
      }

    }

    .time-filter-container {
      display: flex;
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
</style>
