<template>
  <div class="row">
    <div class="input-container">
      <div class="reporter-cell-container" v-for="reporter in reporters" :key="reporter.id">
        <span>{{ reporter.name }}</span>
        <div class="close-icon-container" @click="removeCell(reporter)">
          <i class="el-tag__close el-icon-close close-icon"></i>
        </div>
      </div>
    </div>
    <personSelector :onSelect="onSelect" :isSingleChoice="false" :defaultQuery="{isReporter:1}" userDataResource="/system/user/list" :isSelectReporter=true />
  </div>
</template>

<script>
export default {
  name: "add-reporter",
  props: ["reporters"],
  data() {
    return {}
  },
  methods: {
    onSelect(newReporters) {
      let oldReportIds = this.reporters.map(reporter => reporter.id);
      let reporters = this.reporters.concat(newReporters.filter(r => !oldReportIds.includes(r.id)));
      this.$emit("change", reporters);
    },

    removeCell(item) {
      let reporters = this.reporters.filter(reporter => reporter.id !== item.id);
      this.$emit("change", reporters);
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../style/config";

.row {
  display: flex;

  .input-container {
    min-height: 32px;
    padding-top: 4px;
    width: 385px;
    border: 1px solid @defaultBorderColor;
    border-radius: 4px;
    margin-right: 20px;
    background: white;
    padding-left: 4px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .reporter-cell-container {
      height: 26px;
      font-size: 12px;
      line-height: 24px;
      padding: 0 2px 0 10px;
      border-radius: 4px;
      border: 1px solid #e9e9eb;
      margin: 0 4px 4px 0;
      display: flex;
      align-items: center;
      color: #909399;
      background-color: #f4f4f5;

      .close-icon-container {
        width: 12px;
        height: 12px;
        overflow: hidden;
        color: #909399;
        margin-left: 4px;
        cursor: pointer;
        background: #c0c4cc;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        top: 1px;

        :hover {
          color: white !important;
        }

        .close-icon {
          transform: scale(0.8);
          position: relative;
          top: 1px;
        }
      }
    }
  }
}
</style>
