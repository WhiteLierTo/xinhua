<template>
  <div class="manuscript-config-tag-container">
    <div class="title">稿件标签</div>
    <div class="content">
      <span class="label">稿件标签：</span>
      <el-radio v-model="lableType" :label="1" @change="onTagChange">热点</el-radio>
      <el-radio v-model="lableType" :label="2" @change="onTagChange">最新</el-radio>
      <el-radio v-model="lableType" :label="0" @change="onTagChange">无</el-radio>
    </div>

    <div class="content">
      <span class="label">标签时长：</span>
      <el-date-picker
          v-model="timeRange"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          size="mini"
          @change="onTimeChange"
          :disabled="!lableType"
          popper-class="manuscript-data-picker-popper-container"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
  export default {
    name: "manuscript-config-tag",
    props: ["setRelations", "relations", "afterSelectRelations", "afterInit"],

    data() {
      return {
        lableType: 0,
        timeRange: []
      }
    },

    mounted() {
      this.afterSelectRelations(() => {
        this.setRelations(this.relations.map(relation => {
          if (relation.lableType === undefined) {
            relation.lableType = this.lableType;

            if (relation.lableType) {
              relation.lableStartTime = +this.timeRange[0];
              relation.lableEndTime = +this.timeRange[1];
            }
          }
          return relation
        }));
      });

      this.afterInit(() => {
        if (this.relations.length) {
          if (this.relations[0].lableType !== undefined && this.relations[0].lableType !== null) {
            this.lableType = this.relations[0].lableType;
          }
          if (this.relations[0].lableType) {
            this.timeRange = [new Date(this.relations[0].lableStartTime), new Date(this.relations[0].lableEndTime)]
          }
        }

        this.setRelations(this.relations.map(relation => {
          if (relation.lableType === undefined) {
            relation.lableType = this.lableType;

            if (relation.lableType) {
              relation.lableStartTime = +this.timeRange[0];
              relation.lableEndTime = +this.timeRange[1];
            }
          }
          return relation
        }));
      })
    },

    methods: {
      onTagChange(val) {
        this.setRelations(this.relations.map(relation => {
          relation.lableType = val;
          return relation
        }))
      },

      onTimeChange() {
        this.setRelations(this.relations.map(relation => {
          relation.lableStartTime = +this.timeRange[0];
          relation.lableEndTime = +this.timeRange[1];
          return relation
        }))
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/config";
  @import "../../style/styles";

  .manuscript-config-tag-container {
    width: 100%;
    margin-bottom: @defaultPaddingY;

    .title {
      border-left: 4px solid @defaultBlueClick;
      padding-left: 10px;
      font-size: @middleFontSize;
      font-weight: 600;
      height: 20px;
      line-height: 20px;
      margin-bottom: 14px;
    }

    .content {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .label {
        color: @darkBlue;
        margin-right: 20px;
        width: 90px;
        text-align: right;
        flex-shrink: 0;
      }
    }
  }
</style>

<style lang="less">
  .manuscript-data-picker-popper-container {
    .el-time-panel {
      left: -25px !important;
    }
  }
</style>