<template>
  <div class="containerbox">
    <el-row style="margin-bottom: 20px;">
      <el-card class="bord">
        <el-row class="searchbox">
          <el-col :span="24" style="text-align: center;">
            <el-input placeholder="请输入关键字查询" v-model="queryInfo.searchValue" style="width: 40%;">
              <el-button slot="append" icon="el-icon-search" @click="search">查询</el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="shujusx">
          <div class="listtitle">
            <i></i>
            <div class="txt">数据筛选</div>
          </div>
          <el-row style="margin-bottom: 10px;">
            <span class="labelshow">时间筛选：</span>
            <el-button size="small" :class="timeCheckIndex == index ? 'shaixuan-btn shaixuan-click' : 'shaixuan-btn'" v-for="(item, index) in buttonValue" :key="index" @click="handleTimeChange(index)">{{ item }}</el-button>
            <el-date-picker v-if="timeCheckIndex == 3"
              v-model="custDate"
              type="daterange"
              unlink-panels
              size="small"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="selectCustDate"
            />
          </el-row>
          <el-row>
            <span class="labelshow">流程状态：</span>
            <el-button size="small" :class="statusCheckIndex == index ? 'shaixuan-btn shaixuan-click' : 'shaixuan-btn'" v-for="(item, index) in btnzt" :key="index" @click="handleztChange(index)">{{ item }}</el-button>
          </el-row>
        </el-row>
      </el-card>
    </el-row>
    <el-row class="draftTitle">
      <el-card>
        <div class="listtitle">
          <i></i>
          <div class="txt">舆情列表</div>
        </div>
      </el-card>
    </el-row>
    <!-- 列表区 -->
    <div class="draftlist">
      <el-row class="cardlist" v-for="(item, index) in waitList" :key="index">
        <el-card>
          <el-row type="flex" align="middle" @click.native="openOrder(item.orderId)">
            <el-col :span="22">
              <el-row class="itemtitle">{{ item.artTitle }}</el-row>
              <el-row class="itemcontent">
                <div class="txtcontent">{{ item.artContent }}</div>
              </el-row>
              <el-row class="itemkey">
                <el-col :span="6" class="publishtime">发布时间：{{ item.artPublishTime }}</el-col>
                <el-col :span="4" class="sitename">{{ item.artSourceName }}</el-col>
                <el-col :span="3" class="yuqleibie" v-if="item.opinionTypeName != '' && item.opinionTypeName != null">{{ item.opinionTypeName }}</el-col>
                <el-col :span="2" v-show="item.leaderFlag == 1" class="sitename">领导批示</el-col>
              </el-row>
            </el-col>
            <el-col :span="2" style="text-align: center"><el-button type="primary" size="medium">查看</el-button></el-col>
          </el-row>
        </el-card>
      </el-row>
      <el-row type="flex" align="middle" class="nodata" v-if="total == 0">
        <el-col>
          暂无数据
        </el-col>
      </el-row>
    </div>
    <!-- 分页 -->
    <el-row type="flex" align="middle" style="height: 58px;" v-if="total > 0">
      <el-col :span="24"><BizPagination :total="total" :page.sync="queryInfo.pageNum" :limit.sync="queryInfo.pageSize" @pagination="getOpinionList" /></el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment';
import { getopinionlist } from '@/api/opinion/data';
import { parseTime } from '@/utils/ruoyi';
export default {
  data() {
    return {
      highlight: 4,
      buttonValue: ['今日', '本周', '本月', '自定义'],
      btnzt: ['全部', '待处理', '处理中', '已完结'],
      timeCheckIndex: 1,
      statusCheckIndex: 0,
      searchKey: '',
      queryInfo: {
        searchValue: '',
        beginTime: '',
        endTime: '',
        searchType: 4,
        queryType: 0,
        pageNum: 1,
        pageSize: 5
      },
      total: -1,
      waitList: [],
      custDate: ''
    };
  },
  watch: {
    'queryInfo.searchValue'() {
      if (this.queryInfo.searchValue == '') {
        this.getOpinionList();
      }
    }
  },
  created() {
    this.search();
  },
  methods: {
    handleTimeChange(timeIndex) {
      this.timeCheckIndex = timeIndex
      var datePatten = 'YYYY-MM-DD';
      switch (timeIndex) {
        case 0: this.queryInfo.beginTime = moment().startOf('day').format(datePatten); break;
        case 1: this.queryInfo.beginTime = moment().startOf('week').format(datePatten); break;
        case 2: this.queryInfo.beginTime = moment().startOf('month').format(datePatten); break;
        case 3: break;
      }
      if (timeIndex != 3) {
        this.queryInfo.endTime = moment().format(datePatten)
        this.search()
      }
    },
    selectCustDate(detail) {
      this.queryInfo.beginTime = detail[0]
      this.queryInfo.endTime = detail[1]
      this.search()
    },
    handleztChange(ztIndex) {
      this.statusCheckIndex = ztIndex
      this.queryInfo.queryType = ztIndex
      this.search()
    },
    getOpinionList() {
      getopinionlist(this.queryInfo)
        .then(res => {
          if (res.code == 200) {
            this.total = res.total;
            this.waitList = res.rows;
          }
        })
        .catch(() => {
          this.$message.error('获取待办列表失败');
        });
    },
    openOrder(id) {
      this.$router.push('/waitDetail/' + id + '/' + this.queryInfo.searchType + '/' + this.highlight + '/0');
    },
    search() {
      this.queryInfo.pageNum = 1;
      this.getOpinionList();
    }
  }
};
</script>

<style lang="scss" scoped>
.containerbox {
  min-height: 85vh;
  background-color: rgb(240, 242, 245);
  padding: 15px;
}
.shujusx {
  margin-top: 15px !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  border-top: 1px solid #ededf6 !important;
  .listtitle {
    margin-bottom: 15px;
  }
}
.shaixuan-btn {
  &:hover {
    color: #FFFFFF;
    background-color: #4383E4;
    border-color: #4383E4;
  }
}
.shaixuan-click {
  color: #FFFFFF;
  background-color: #4383E4;
  border-color: #4383E4;
}
.labelshow {
  color: #333;
  font-size: 14px;
}
.listtitle {
  margin-top: 15px;
  .txt {
    font-size: 16px;
    color: #333;
    font-weight: 600;
    display: inline-block;
    vertical-align: middle;
  }
  i {
    display: inline-block;
    width: 4px;
    height: 20px;
    background: #2d8cf0;
    vertical-align: middle;
    margin-right: 15px;
    margin-left: 3px;
  }
}
.el-card.is-always-shadow {
  box-shadow: none !important;
}
.draftTitle .el-card {
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #ededf6 !important;
}
.draftlist {
  .cardlist {
    margin-bottom: 10px;
    border: 1px solid #eef0f9;
    &:hover {
      border: 1px solid #4383e4;
      cursor: pointer;
    }
    .itemtitle {
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
    }
    .itemartTitle {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .itemcontent {
      font-size: 14px;
      color: #666666;
      line-height: 26px;
    }
    .itemkey {
      position: relative;
      margin-top: 15px;
      .publishtime {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(105, 128, 171, 1);
        line-height: 20px;
      }
      .sitename {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(67, 131, 228, 1);
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
      }
      .chaoqi {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #f56c6c;
        line-height: 20px;
      }
      .yuqleibie {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #1da362;
        line-height: 20px;
      }
    }
  }
}
</style>
<style lang="scss">
.nodata {
  text-align: center;
  height: 50vh;
  background-color: #fff;
  color: #515A6E;
  font-size: 18px;
  letter-spacing: 10px;
}
.searchcard {
  width: 100%;
  margin-bottom: 15px;
}
.searchbox {
  margin-bottom: 20px;
  .el-input__inner {
    height: 40px !important;
    line-height: 40px !important;
  }
  .el-input-group__append {
    background-color: #4383e4 !important;
    color: #fff !important;
    font-size: 16px !important;
    border: 0 !important;
  }
}
.draftTitle {
  .el-card__body {
    padding: 10px 20px 20px 20px !important;
  }
}
.draftlist {
  .el-card {
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #ededf6 !important;
  }
  .el-card__body {
    padding: 15px 20px 15px 20px !important;
  }
}
.txtcontent {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
