<template>
  <div class="manuscript-config-comment-container">
    <div class="title">评论管理</div>
    <div class="content">
      <span class="label">评论审核：</span>
      <el-radio v-model="isCommentAudit" :label="0">不审核</el-radio>
      <el-radio v-model="isCommentAudit" :label="1">审核</el-radio>
    </div>

    <div class="content">
      <span class="label">评论设置：</span>
      <el-checkbox-group v-model="commentConfigList">
        <el-checkbox label="closeComment">关闭评论</el-checkbox>
        <el-checkbox label="closePraise">关闭点赞</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: "manuscript-config-comment",
    data() {
      return {
        isCommentAudit: 1,
        commentConfigList: []
      }
    },
    methods: {
      init(commentConfig) {

        if (commentConfig.isCommentAudit) {
          this.isCommentAudit = 1;
        }
        if (!commentConfig.isComment) {
          this.commentConfigList.push("closeComment");
        }
        if (!commentConfig.isPraise) {
          this.commentConfigList.push("closePraise");
        }
        // 不需要同步了
      },

      getCommentConfig() {
        // 评论属性独立出去,所以需要单独获取
        return {
          isCommentAudit: this.isCommentAudit,
          isComment: this.commentConfigList.includes('closeComment') ? 0 : 1,
          isPraise: this.commentConfigList.includes('closePraise') ? 0 : 1
        }
      },

    }
  }
</script>

<style scoped lang="less">
  @import "../../style/config";
  @import "../../style/styles";

  .manuscript-config-comment-container {
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
