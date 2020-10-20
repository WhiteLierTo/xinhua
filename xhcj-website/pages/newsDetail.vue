<template>
  <div class="news-detail-container">
    <div class="news-detail-content-container">
      <h1>{{ info.title }}</h1>

      <div class="author-line">
        <div class="author-left">
          <div class="colored">{{ info.source + " " + (info.reporter || '') }}</div>
          <div v-if="info.publishDate">&nbsp;&nbsp;·&nbsp;&nbsp;{{ info.publishDate | dayFormat}}</div>
          <!--<span v-if="info.keyword">&nbsp;&nbsp;·&nbsp;&nbsp;{{ info.keyword || "" }}</span>-->
        </div>
        <shareWx/>
      </div>

      <div class="html-container" v-html="info.content"></div>

      <div class="copyright-container">
        <p>版权声明：</p>
        <p>『 新华日报财经客户端 』保留本文所有权利，</p>
        <p>如需转发，请注明来源和作者；</p>
        <p>新闻热线 / 维权爆料 / 商务合作：18705165119</p>
      </div>

      <div class="bottom-author-line">
        <span style="margin-right: 30px">编辑:{{ info.author }}</span>
        <span>审校:{{ info.proofread }}</span>
      </div>

      <div class="author-line" style="margin-top: 15px;">
        <p class="author-left">
          <img :src="defaultLogo" alt class="logo"/>
          <span class="colored">{{ info.source + " " + (info.reporter || '') }}</span>
        </p>
        <shareWx/>
      </div>

      <div class="comment-box" @click="goDownload">
        您可以在新华日报财经客户端写下评论
        <i class="fa fa-angle-right" style="position: relative;top: 1px;"></i>
      </div>
    </div>

    <div class="relation-container">
      <p class="relation-title" v-if="recommendList.length">相关推荐</p>
      <div
        class="relation-row"
        v-for="(recommend,index) in recommendList"
        :key="index"
        @click="jumpRelation(recommend)"
      >{{ recommend.content }}
      </div>

      <div class="pre-and-next-box">
        <p class="box-tip">上一篇</p>
        <p class="box-name" v-if="pre" @click="goPreOrNext(pre)">{{ pre.title }}</p>
        <p class="box-no-name" v-else>没有了</p>
      </div>

      <div class="pre-and-next-box">
        <p class="box-tip">下一篇</p>
        <p class="box-name" v-if="next" @click="goPreOrNext(next)">{{ next.title }}</p>
        <p class="box-no-name" v-else>没有了</p>
      </div>
    </div>
  </div>
</template>
<script>
  import newsDetailMixin from "../mixins/newsDetail";
  import shareWx from "../components/public/shareWx";

  export default {
    components: {shareWx},
    mixins: [newsDetailMixin],
  };
</script>
<style lang="less" scoped>
  .news-detail-container {
    width: 1120px;
    margin: 90px auto 20px;
    display: flex;

    .news-detail-content-container {
      flex: 1;
      margin-right: 58px;

      h1 {
        color: #222222;
        font-size: 24px;
        margin-bottom: 20px;
      }

      .author-line {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .author-left {
          color: #b5b5b5;
          display: flex;
          align-items: center;

          .colored {
            color: #666;
          }

          .logo {
            height: 25px;
            margin-right: 16px;
            border-radius: 50%;
          }
        }
      }

      .bottom-author-line {
        margin-top: 20px;
        color: #666;
        font-weight: 300;
      }

      .comment-box {
        margin-top: 50px;
        width: 100%;
        height: 56px;
        line-height: 56px;
        border-radius: 4px;
        border: 1px solid #eaeaea;
        cursor: pointer;
        color: #0098ff;
        text-align: center;
        font-size: 16px;
        font-weight: 300;
      }

      .copyright-container {
        color: #999999;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        margin-top: 40px;
      }
    }

    .relation-container {
      width: 322px;

      .relation-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 25px;
        border-bottom: 1px solid #eaeaea;
        padding-bottom: 10px;
      }

      .relation-row {
        color: #222;
        font-weight: 300;
        margin-bottom: 20px;
        cursor: pointer;

        &:hover {
          color: #0098ff;
        }
      }

      .pre-and-next-box {
        width: 100%;
        padding: 20px;
        border: 1px solid #eaeaea;
        color: #333;
        margin-bottom: 28px;
        border-radius: 4px;

        .box-tip {
          color: #b5b5b5;
          font-size: 16px;
        }

        .box-no-name,
        .box-name {
          font-size: 16px;
          margin-top: 20px;
          font-weight: 300;
          color: #333;
        }

        .box-name {
          cursor: pointer;

          &:hover {
            color: #0098ff;
          }
        }
      }
    }
  }
</style>
