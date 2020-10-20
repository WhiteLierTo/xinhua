<template>
  <div class="manuscript-config-position-container">
    <div class="title">固定位置
      <!--<el-tooltip class="item" effect="dark" content="banner、置顶、固定位置为互斥属性" placement="top-start">-->
      <!--<i class="el-icon-question question-icon"></i>-->
      <!--</el-tooltip>-->
      <span class="tip">banner、置顶、固定位置为互斥属性</span>
    </div>
    <div class="table-container">
      <div class="table-row">
        <div class="cell">栏目名称</div>
        <div class="cell">类型</div>
        <div class="cell">固定位置</div>
      </div>
      <div
          class="table-row"
          v-for="(item,index) in relations.filter(relation=> !relation.isBanner && !relation.isTop).filter(relation=>relation.channelType === 'normal')"
          :key="index"
      >
        <div class="cell">{{item.channelName }}</div>
        <div class="cell">{{ item.channelType === "normal" ? "频道" : "专题" }}</div>
        <div class="cell">
          <el-input-number
              size="mini" v-model="item.positionNum"
              :min="0" :max="30"
              @change="onRankChange"
          ></el-input-number>
        </div>
      </div>


      <div class="table-row" v-if="relations.length === 0">
        <div class="cell empty-cell">无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "manuscript-config-position",
    props: ["setRelations", "relations", "afterSelectRelations", "afterInit"],
    mounted() {
      this.afterSelectRelations(() => {
        this.setRelations(this.relations.map(relation => {
          if (relation.positionNum === undefined) {
            relation.positionNum = 0;
          }
          return relation
        }));
      })
    },
    methods: {
      onRankChange() {
        this.setRelations(this.relations);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/config";
  @import "../../style/styles";

  .manuscript-config-position-container {
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

      .question-icon {
        color: gray;
        cursor: pointer;
      }

      .tip {
        font-size: 12px;
        color: #E4A33D;
        margin-left: 14px;
      }
    }

    .table-container {
      width: 100%;
      border: 1px solid @defaultBorderColor;

      .table-row {
        height: 40px;
        line-height: 40px;
        text-align: center;
        display: flex;

        &:first-child {
          background: @defaultTableHeadBgColor !important;
          color: @defaultTableHeadColor;
          font-weight: 600;
        }

        &:nth-child(2n+1) {
          background: @superLightGray;
        }

        .cell {
          flex: 1;

          &:last-child, &:first-child {
            flex: 2;
          }
        }

        .empty-cell {
          color: @lightGray;
        }
      }
    }

  }
</style>
