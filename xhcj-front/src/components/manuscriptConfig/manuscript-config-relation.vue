<template>
  <div class="manuscript-config-relation-container">
    <div class="title">稿件关联</div>
    <div class="content">
      <span class="label">栏目关联：</span>
      <el-select
          v-model="selectedList"
          disabled
          size="mini"
          multiple
          :collapse-tags="false"
          style="flex: 1;margin-right: 20px"
      >
        <el-option
            v-for="item in relations"
            :key="item.channelId"
            :label="item.channelName"
            :value="item.channelId"
        >
        </el-option>
      </el-select>
      <NewsSectionSelector
          :defaultKey="defaultKey"
          :onSelect="onSelectSelectors"
          :selected="relations"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: "manuscript-config-relation",
    props: ["relations", "onSelect", "afterSelectRelations", "afterInit"],
    data() {
      return {
        selectedList: [],
        defaultKey: "",
      }
    },

    mounted() {
      this.defaultKey = this.$route.query.default;

      this.afterSelectRelations(() => {
        this.selectedList = this.relations.map(r => r.channelId);
      });

      this.afterInit(() => {
        this.selectedList = this.relations.map(r => r.channelId);
      })
    },

    methods: {
      onSelectSelectors(relationsList) {
        let oldRelations = this.$utils.gadgets.deepClone(this.relations);
        let oldRelationsIds = oldRelations.map(r => r.channelId);  // 返回的数据里 channelId 是tree里面的id
        relationsList.forEach(relation => { // 选出来的时候,都是id
          let index = oldRelationsIds.indexOf(relation.id);
          if (index === -1) {
            let deepCopyRelation = this.$utils.gadgets.deepClone(relation);
            deepCopyRelation.channelName = deepCopyRelation.name;
            deepCopyRelation.channelId = deepCopyRelation.id;
            deepCopyRelation.channelType = deepCopyRelation.type;
            delete deepCopyRelation.children;
            oldRelations.push(deepCopyRelation);
          }
        });
        let relationsIds = relationsList.map(r => r.id);
        oldRelations = oldRelations.filter(d => relationsIds.includes(d.channelId));
        this.onSelect(oldRelations);
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/config";
  @import "../../style/styles";

  .manuscript-config-relation-container {
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