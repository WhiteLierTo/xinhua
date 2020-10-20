<template>
  <div class="manuscript-config-custom-container">
    <div class="title">稿件自定义
      <span class="tip">banner、置顶、固定位置为互斥属性</span>
    </div>
    <div class="content" v-if="!hides.includes('setBanner')">
      <span class="label">设置banner：</span>
      <el-select
          size="mini"
          multiple
          v-model="bannerIdsList"
          style="flex: 1"
          @change="duplicateRemoval(bannerIdsList,isTopIdsList)"
          :disabled="relations.length === 0"
      >
        <el-option
            v-for="item in relations.filter(relation=>relation.channelType === 'normal')"
            :key="item.channelId"
            :label="item.channelName"
            :value="item.channelId"
        >
        </el-option>
      </el-select>
    </div>
    <div class="content">
      <span class="label">设置置顶：</span>
      <el-select
          size="mini"
          multiple
          v-model="isTopIdsList"
          style="flex: 1"
          @change="duplicateRemoval(isTopIdsList,bannerIdsList)"
          :disabled="relations.length === 0"
      >
        <el-option
            v-for="item in relations.filter(relation=>relation.channelType === 'normal')"
            :key="item.channelId"
            :label="item.channelName"
            :value="item.channelId"
        >
        </el-option>
      </el-select>
    </div>
    <div class="content" v-if="!hides.includes('isPcBanner')">
      <span class="label">是否pc网站banner：</span>
      <el-radio v-model="isPcBanner" :label="1">是</el-radio>
      <el-radio v-model="isPcBanner" :label="0">否</el-radio>
    </div>
  </div>
</template>

<script>
  export default {
    name: "manuscript-config-custom",
    props: ["setRelations", "relations", "afterSelectRelations", "afterInit", "hides"],
    data() {
      return {
        bannerIdsList: [],
        isTopIdsList: [],
        isPcBanner: 0
      }
    },

    mounted() {

      this.afterSelectRelations(() => {
        // 检测relations 给他们赋初值
        this.setRelations(this.relations.map(relation => {
          if (!this.hides.includes('setBanner') && relation.isBanner === undefined) {
            relation.isBanner = 0;
          }
          if (relation.isTop === undefined) {
            relation.isTop = 0;
          }

          return relation
        }));
        // 检测哪些已经不在了
        this.isTopIdsList = this.relations.filter(relation => relation.isTop).map(relation => relation.channelId);
        if (!this.hides.includes('setBanner')) {
          this.bannerIdsList = this.relations.filter(relation => relation.isBanner).map(relation => relation.channelId);
        }
      });

      this.afterInit(() => {
        if (!this.hides.includes('setBanner')) {
          this.bannerIdsList = this.relations.filter(relation => relation.isBanner).map(relation => relation.channelId);
        }
        this.isTopIdsList = this.relations.filter(relation => relation.isTop).map(relation => relation.channelId);

        this.setRelations(this.relations.map(relation => {
          if (!this.hides.includes('setBanner') && relation.isBanner === undefined) {
            relation.isBanner = 0;
          }
          if (relation.isTop === undefined) {
            relation.isTop = 0;
          }
          return relation
        }));
      });
    },

    methods: {
      init(isPcBanner) {
        this.isPcBanner = isPcBanner || 0;
      },

      getIsPcBanner() {
        if (this.hides.includes('isPcBanner')) {
          return false
        } else {
          return this.isPcBanner
        }
      },

      duplicateRemoval(self, target) {
        self.forEach(function (d) {
          target.remove(d)
        });

        this.setRelations(this.relations.map(relation => {
          if (!this.hides.includes('setBanner')) {
            relation.isBanner = this.bannerIdsList.includes(relation.channelId) ? 1 : 0;
          }
          relation.isTop = this.isTopIdsList.includes(relation.channelId) ? 1 : 0;
          if (relation.isTop || relation.isBanner) {
            relation.positionNum = 0
          }
          return relation
        }))
      },


    }
  }
</script>

<style scoped lang="less">
  @import "../../style/config";
  @import "../../style/styles";

  .manuscript-config-custom-container {
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
