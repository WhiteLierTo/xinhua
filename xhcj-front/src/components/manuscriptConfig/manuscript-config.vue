<template>
  <div class="manuscript-config-container" :style="{width:`${width}px`,'user-select':isDragging?'none':''}">
    <div class="tab-line">
      <div class="bottom-color-line"></div>
      <div class="tab-cell"><span class="red-start" v-if="isRequire">*</span> 稿签</div>
    </div>
    <div class="main-content">
      <manuscriptConfigRelation
          :relations="relations"
          :onSelect="onSelectRelations"
          :afterSelectRelations="afterSelectRelations"
          :afterInit="afterInit"
      />

      <manuscriptConfigCustom
          :relations="relations"
          :setRelations="setRelations"
          :afterSelectRelations="afterSelectRelations"
          :afterInit="afterInit"
          :hides="hides"
          v-if="!hides.includes('custom')"
          ref="custom"
      />

      <manuscriptConfigComment
          :relations="relations"
          :setRelations="setRelations"
          :afterSelectRelations="afterSelectRelations"
          :afterInit="afterInit"
          v-if="!hides.includes('comment')"
          ref="comment"
      />

      <manuscriptConfigTag
          :relations="relations"
          :setRelations="setRelations"
          :afterSelectRelations="afterSelectRelations"
          :afterInit="afterInit"
          v-if="!hides.includes('tag')"
      />

      <manuscriptConfigPosition
          :relations="relations"
          :setRelations="setRelations"
          :afterSelectRelations="afterSelectRelations"
          :afterInit="afterInit"
          v-if="!hides.includes('position')"
      />

    </div>

    <div class="drop-bt-container" @mousedown="onStartDrag"></div>
  </div>
</template>

<script>
  import manuscriptConfigRelation from "./manuscript-config-relation"
  import manuscriptConfigCustom from "./manuscript-config-custom"
  import manuscriptConfigComment from "./manuscript-config-comment"
  import manuscriptConfigPosition from "./manuscript-config-position"
  import manuscriptConfigTag from "./manuscript-config-tag"

  export default {
    name: "manuscriptConfig",
    components: {
      manuscriptConfigRelation,
      manuscriptConfigCustom,
      manuscriptConfigComment,
      manuscriptConfigPosition,
      manuscriptConfigTag
    },
    props: {
      originalRelations: {
        type: Array,
        default: function () {
          return []
        }
      },
      hides: {
        type: Array,
        default: function () {
          return []
        }
      },
      isRequire: {
        type: Boolean,
        default: false
      }
    },

    model: {
      prop: "originalRelations",
      event: "input"
    },

    data() {
      return {
        relations: [],
        afterSelectRelationsFunc: [],
        afterInitFunc: [],
        width: 550,
        isDragging: false
      }
    },

    mounted() {
      document.addEventListener("mouseup", this.onMouseup);
      this.width = this.$utils.Store.get("manuscriptWidth", 550)
    },

    beforeDestroy() {
      document.removeEventListener("mouseup", this.onMouseup)
    },

    methods: {
      getCommentConfig() {
        if (!this.$refs.comment) {
          return {}
        }
        return this.$refs.comment.getCommentConfig()
      },

      getIsPcBanner() {
        if (!this.$refs.custom) {
          return false
        }
        return this.$refs.custom.getIsPcBanner();
      },

      init(newArticleList, commentConfig = {isCommentAudit: 0, isComment: 0, isPraise: 0}, isPcBanner = 0) {
        // 只在此接受数据
        if (this.$config.dedug) {
          this.checkArticleList(newArticleList);
        }

        this.relations = [...newArticleList];
        this.$refs.comment && (this.$refs.comment.init(commentConfig));
        this.$refs.custom && (this.$refs.custom.init(isPcBanner));

        this.$nextTick(() => {
          this.afterInitFunc.forEach(d => d());
          this.$emit("input", this.relations);
        });
      },

      onSelectRelations(articleList) {
        // 选择了新的栏目 其中包含老栏目
        this.relations = [...articleList];
        this.$nextTick(() => {
          this.afterSelectRelationsFunc.forEach(d => d());
          this.$emit("input", this.relations);
        });

      },

      checkArticleList(articleList) {
        // 校验入参是否合法
        // 必须包含字段: channelName channelId 否则报错
        articleList.forEach((article, index) => {
          if (!this.$utils.gadgets.isSpecialTrue(article.channelName)) {
            let text = `${index + 1}号数据缺少字段channelName`;
            this.$message.error(text);
            console.error(text)
          }
          if (!this.$utils.gadgets.isSpecialTrue(article.channelId)) {
            let text = `${index + 1}号数据缺少字段channelId`;
            this.$message.error(text);
            console.error(text)
          }
        })
      },

      setRelations(relations) {
        this.relations = [...relations];
        this.$emit("input", this.relations);
      },

      afterSelectRelations(func) {
        // 在选择栏目之后调用
        this.afterSelectRelationsFunc.push(func);
      },

      afterInit(func) {
        // 在init之后条用
        this.afterInitFunc.push(func);
      },

      onStartDrag() {
        this.isDragging = true;
        document.addEventListener("mousemove", this.onDrag);
      },

      onMouseup() {
        if (this.isDragging) {
          this.isDragging = false;
          document.removeEventListener('mousemove', this.onDrag);
          this.$utils.Store.set("manuscriptWidth", this.width);
        }
      },

      onDrag(event) {
        if (!this.isDragging) return;
        this.width = Math.min(window.innerWidth * 0.8, this.width - event.movementX);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/config";
  @import "../../style/styles";

  .manuscript-config-container {
    flex-shrink: 0;
    height: 100%;
    background: white;
    padding: @defaultPaddingY 10px @defaultPaddingY 0;
    display: flex;
    flex-direction: column;
    position: relative;

    .drop-bt-container {
      position: absolute;
      width: 10px;
      height: 100%;
      background: transparent;
      left: 0;
      top: 0;
      cursor: w-resize;
      border-radius: 10px;
    }

    .tab-line {
      height: 35px;
      width: 100%;
      border-bottom: 1px solid @defaultBorderColor;
      padding: 0 @defaultPaddingX;
      position: relative;
      flex-shrink: 0;

      .bottom-color-line {
        width: 100px;
        height: 3px;
        background: @defaultBlueClick;
        position: absolute;
        bottom: 0;
      }

      .tab-cell {
        color: @defaultTileColor;
        font-size: @middleFontSize;
        width: 100px;
        text-align: center;
        cursor: pointer;
      }
    }

    .main-content {
      padding: @defaultPaddingY @defaultPaddingX;
      flex: 1;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: @defaultBorderColor;
      }
    }
  }

  .red-start {
    color: red;
    position: relative;
    top: 4px;
  }
</style>
