<template>
  <div class="right-container">
    <div class="right-top">
      <BaseWidthTitle title="重要客户舆情信息">
        <div class="list" ref="scrollCustomerInfo">
          <div class="empty-container" v-if="customerInfo.length === 0">
            <img src="../asset/index/empty.png" alt="">
          </div>
          <ul v-for="(item,index) in customerInfo" :key="item.rowKey + index.toString()" @click="showDetail(index)">
            <li class="list-title" v-html="item.title!==''?item.title: item.content.slice(0,75)+'...'"></li>
            <li class="list-content" v-html="item.content"></li>
            <li class="list-boto">
              <span class="pub-time">{{item.showTime}}</span>
              <span class="data-source">{{item.siteName}}</span>
              <span class="key-word"> {{item.author}}</span>
              <span class="emotion-word" v-if="item.side==1">正面</span>
              <span class="emotion-word" v-if="item.side==0">中立</span>
              <span class="emotion-word" v-if="item.side==-1">负面</span>
            </li>
          </ul>
        </div>
      </BaseWidthTitle>

    </div>
    <div class="row-divider"></div>
    <div class="right-bottom">
      <customerInfo/>
    </div>

    <div class="dialog-container" v-if="isShowDetail">
      <div class="dialog">
        <div class="close-icon" @click="isShowDetail = false"></div>
        <li class="list-title"
            v-html="customerInfo[detailIndex].title!==''?customerInfo[detailIndex].title: customerInfo[detailIndex].content.slice(0,75)+'...'"></li>
        <li class="list-content" v-html="customerInfo[detailIndex].content"></li>
        <li class="list-boto">
          <span class="pub-time">{{customerInfo[detailIndex].showTime}}</span>
          <span class="data-source">{{customerInfo[detailIndex].siteName}}</span>
          <span class="key-word"> {{customerInfo[detailIndex].author}}</span>
          <span class="emotion-word" v-if="customerInfo[detailIndex].side === 1">正面</span>
          <span class="emotion-word" v-if="customerInfo[detailIndex].side === 0">中立</span>
          <span class="emotion-word" v-if="customerInfo[detailIndex].side === -1">负面</span>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
  import customerInfo from "../components/right/customerInfo"

  export default {
    name: "right",
    components: {customerInfo},
    data() {
      return {
        companyForm: {
          searchValue: "",
          pageSize: 10,
          pageNum: 1
        },
        stockholderForm: {
          dataId: "",
          pageSize: 10,
          pageNum: 1
        },
        changeInfoForm: {
          dataId: "",
          pageSize: 10,
          pageNum: 1
        },
        total1: 100,
        total2: 100,
        total3: 100,
        customerInfo: [],
        customerListData: [],
        stockholderData: [],
        changeInfoData: [],
        showsSructure: false,
        showsChangeInfo: false,
        isShowDetail: false,
        detailIndex: 0
      }
    },
    mounted() {
      this.getCustomerInfo()
      this.autoScroll();
      this.$store.commit("addPolling", this.getCustomerInfo)
    },
    methods: {
      getCustomerInfo() {
        this.$ajax.customerInfo().then(res => {
          // console.log(res)
          if (res.data.code == 200) {
            this.customerInfo = res.data.data

          } else {
            setTimeout(this.getCustomerInfo, 5000)
          }
        })
      },

      // 自动播放
      autoScroll() {
        let customerInfo = this.$refs.scrollCustomerInfo
        
        scroll()

        function scroll() {
          // console.log(window.innerHeight) //窗口的高度
          let scrollLength = window.innerHeight / 900;

          customerInfo.scrollTop += scrollLength;
          // console.log(customerInfo.scrollTop)
          //  滚动到底部
          if (customerInfo.scrollTop + customerInfo.offsetHeight === customerInfo.scrollHeight) {
            customerInfo.scrollTop = 0;
          }

          setTimeout(scroll, 50);
        }
      },

      showDetail(index) {
        this.detailIndex = index;
        this.isShowDetail = true;
      }
    }
  }
</script>

<style scoped lang="less">
  .right-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    .right-top {
      width: 100%;
      height: 630px;

      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 0 45px;
        box-sizing: border-box;

        &::-webkit-scrollbar {
          background: #102568;
          width: 10px;
          height: 10px;
          border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb {
          background: #1a4fbb;
          border-radius: 10px;
        }

        ul {
          flex: 1;
          width: 48%;
          min-width: 48%; //加上最大最小宽度盒子的宽才有效
          max-width: 48%;
          border-bottom: 2px #376aff dashed;
          cursor: pointer;
        }

        li {
          list-style: none;
        }

        .list-title {
          font-size: 18px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 48px;
          margin-top: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .list-content {
          margin: 19px 0;
          font-size: 16px;
          font-weight: 500;
          color: rgba(54, 229, 255, 1);
          line-height: 30px;
          word-break: break-all;
          max-height: 84px;
          overflow: hidden;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          display: -webkit-box;
        }

        .list-boto {
          display: flex;
          justify-content: space-between;
          margin-bottom: 45px;
          font-size: 18px;
          font-weight: 500;

          .pub-time {
            color: rgba(255, 255, 255, 1);
          }

          .data-source {
            color: #a5ffa7;
          }

          .key-word {
            color: #ffae5c;
          }

          .emotion-word {
            color: #376aff;
          }
        }
      }
    }

    .right-bottom {
      width: 100%;
      height: 1204px;
      position: relative;

      .info {
        padding-left: 45px;
      }

      .search {
        position: relative;
        width: 574px;
        height: 50px;
        background: rgba(121, 154, 255, 0.18);
        border: 1px solid #bbb;
        border-radius: 10px;
        margin: 30px 0;
        line-height: 50px;
      }

      .search-icon {
        position: absolute;
        top: 10px;
        left: 20px;
        width: 31px;
        height: 31px;
        cursor: pointer;
      }

      .company-info {
        display: flex;
        justify-content: space-between;
        padding: 0 30px;
      }

      .company-name {
      }

      .ownership-structure {
        color: #ffa4a4;
      }

      .list-content {
        margin: 19px 0;
        font-size: 16px;
        font-weight: 500;
        color: rgba(54, 229, 255, 1);
        line-height: 40px;
        word-break: break-all; //允许在单词内换行。
      }

      .tructure,
      .change {
        position: relative;

        .close {
          position: absolute;
          top: -80px;
          right: 10px;
          width: 67px;
          height: 67px;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .structure-table {
          margin-top: 120px;
        }

        .gudong {
          color: #ffe87e;
        }
      }
    }

    .dialog-container {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.85);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999999;

      .dialog {
        width: 1038px;
        background: rgba(34, 76, 223, 0.25);
        padding: 50px;
        position: relative;

        .close-icon {
          position: absolute;
          right: 0;
          top: -104px;
          width: 60px;
          height: 60px;
          cursor: pointer;
          background: url("../asset/index/close.png");
          background-size: 100% 100%;
        }

        li {
          list-style: none;
        }

        .list-title {
          font-size: 18px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 48px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }

        .list-content {
          margin: 19px 0;
          font-size: 16px;
          font-weight: 500;
          color: rgba(54, 229, 255, 1);
          line-height: 30px;
          word-break: break-all;
          max-height: 600px;
          overflow: auto;
          padding-right: 20px;

          &::-webkit-scrollbar {
            background: #102568;
            width: 8px;
            border-radius: 10px;
          }

          &::-webkit-scrollbar-thumb {
            background: #1a4fbb;
            border-radius: 10px;
          }
        }

        .list-boto {
          display: flex;
          justify-content: space-between;
          margin-bottom: 45px;
          font-size: 18px;
          font-weight: 500;

          .pub-time {
            color: rgba(255, 255, 255, 1);
          }

          .data-source {
            color: #a5ffa7;
          }

          .key-word {
            color: #ffae5c;
          }

          .emotion-word {
            color: #376aff;
          }
        }
      }
    }
  }

  .el-pagination {
    float: right;
    margin-top: 50px;
  }

  .row-divider {
    width: 100%;
    margin: 30px 0;
    border-top: 2px #376aff dashed;
    flex-shrink: 0;
  }

  .col-divider {
    width: 2px;
    border-left: 2px #376aff dashed;
    margin: 0 45px;
    flex-shrink: 0;
  }

  .empty-container {
    width: 95%;
    height: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
