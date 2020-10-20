<template>
  <div class="search-mob-container">
    <div class="search-head-container">
      <div class="input-container">
        <input type="text" class="search-input" placeholder="输入关键词搜索" v-model="keyword" @keyup.enter="search">
        <div class="search-bt-container" @click="search">
          <i class="fa fa-search search-icon"></i>
          <span class="search-text">搜索</span>
        </div>
      </div>
      <div class="tabs-wrapper">
        <div class="tabs-container">
          <div class="tab-container"
               v-for="(tabItem,index) in tabs"
               :key="index"
               :class="{'tab-active-container':activeTabIndex === index}"
               @click="onTabSelect(tabItem,index)"
          >
            {{ tabItem.label }}
          </div>
        </div>
        <div class="search-result-number">找到约 <span style="color:#0098ff">{{ total }}</span> 个结果</div>
      </div>
    </div>

    <div class="loading-container" v-if="loading">
      <i class="fa fa-spinner loading-icon" aria-hidden="true"></i>
    </div>


    <div class="search-content" v-else>
      <div class="search-result-container" v-if="activeTabIndex === 0">
        <div>
          <news-card :info="searchArticleResult" class="mob" v-for="searchArticleResult in searchArticleResults"
                     :key="searchArticleResult.id"
          ></news-card>
        </div>
        <div class="show-more-container" @click="showMore" v-if="total > searchArticleResults.length">查看更多</div>
      </div>
      <div class="search-result-container" v-else-if="activeTabIndex === 1">
        <flashNews :info="item" :keyword="keyword" v-for="item in searchNewsFlashResults"
                   :key="item.id"></flashNews>
        <div class="show-more-container" @click="showMore" v-if="total > searchNewsFlashResults.length">查看更多
        </div>
      </div>
      <div class="search-result-container" v-if="activeTabIndex === 2">
        <div>
          <news-card :info="item" class="mob" v-for="item in searchNewsSpecialResults" :key="item.id"></news-card>
        </div>
        <div class="show-more-container" @click="showMore" v-if="total > searchNewsSpecialResults.length">查看更多
        </div>
      </div>
      <div class="hot-search-list-container">
        <div class="part-head-container">
          <div class="part-head-text">热搜榜单</div>
        </div>
        <div class="hot-search-keyword-container" v-for="(hotKey,index) in hotKeys" :key="index">
          <div
            class="color-box"
            :class="{'first-color-box':index === 0,'second-color-box':index === 1,'third-color-box':index === 2}"
          >{{ index + 1 }}
          </div>
          <div class="hot-search-text" @click="onSelectHot(hotKey.keyword)">{{ hotKey.keyword }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import flashNews from "../components/search/flashNews"
  import searchMixin from "../mixins/search"


  export default {
    name: "search-mob",
    layout: "default-mob",
    components: {flashNews},
    mixins: [searchMixin],
  }
</script>

<style scoped lang="less">
  .search-mob-container {
    width: 100%;

    .search-head-container {
      background: #f7f7fb;
      padding-top: 0.2rem;
      display: flex;
      flex-direction: column;
      margin-top: 0.53rem;

      .input-container {
        width: 95%;
        height: 0.36rem;
        background: white;
        border: 1px solid rgb(0, 152, 255);
        border-radius: 0.24rem;
        margin: 0 auto;
        position: relative;

        .search-input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          padding-left: 0.2rem;
          font-size: 15px;
          border-radius: 0.24rem;

          &::placeholder {
            color: #99999980;
            font-size: 14px;
            letter-spacing: 1px;
          }
        }

        .search-bt-container {
          position: absolute;
          top: -1px;
          bottom: -1px;
          right: -1px;
          width: 1rem;
          background: #0098ff;
          border-radius: 0.24rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          .search-icon {
            color: white;
            font-size: 15px;
            margin-right: 0.1rem;
            position: relative;
            top: 1px;
          }

          .search-text {
            color: white;
            letter-spacing: 0.1rem;
            font-size: 15px;
          }
        }
      }

      .tabs-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 0.3rem;

        .tabs-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.1rem;

          .tab-container {
            height: 0.3rem;
            font-size: 14px;
            font-weight: 300;
            cursor: pointer;
            flex: 1;
            text-align: center;
          }

          .tab-active-container {
            font-weight: 600;
            border-bottom: 1px solid #222;
          }
        }

        .search-result-number {
          font-weight: 300;
          padding-left: 0.1rem;
          margin-top: 0.1rem;
          margin-bottom: 0.1rem;
        }
      }

    }

    .loading-container {
      width: 100%;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;

      .loading-icon {
        font-size: 40px;
        color: #0098ff;
        animation: xhRotate 3s infinite linear;
      }
    }

    .search-content {
      width: 100%;
      margin: 0.3rem 0;

      .search-result-container {
        padding: 0 0.1rem;

        .show-more-container {
          background: rgba(238, 244, 250, 0.5);
          color: rgb(0, 152, 255);
          height: 0.46rem;
          line-height: 0.46rem;
          text-align: center;
          width: 100%;
          margin-top: 0.2rem;
          cursor: pointer;
        }
      }

      .hot-search-list-container {
        width: 100%;
        padding: 0 0.1rem;
        margin-top: 0.3rem;

        .hot-search-keyword-container {
          display: flex;
          align-items: center;
          margin-top: 16px;
          font-size: 16px;
          color: #222;
          font-weight: 300;

          .color-box {
            width: 25px;
            height: 25px;
            background: #d8d8d8d8;
            border-radius: 4px;
            margin-right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            position: relative;
            top: 1px;
          }

          .first-color-box {
            background: #f75e5e;
          }

          .second-color-box {
            background: #f9a25f;
          }

          .third-color-box {
            background: #f9d178;
          }

          .hot-search-text {
            cursor: pointer;

            &:hover {
              color: #0098ff;
            }
          }
        }
      }
    }
  }

  @keyframes xhRotate {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
