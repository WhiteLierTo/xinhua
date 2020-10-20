<template>
  <div class="containerbox">
    <el-row class="searchbox">
      <el-col :span="24" style="text-align: center;">
        <el-input placeholder="请输入关键字查询" v-model="queryInfo.searchValue" class="input-with-select" style="width: 40%;">
          <el-button slot="append" icon="el-icon-search" @click="search">查询</el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="draftTitle">
      <el-card>
        <div class="listtitle">
          <i></i>
          <div class="txt">处理中流程</div>
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
                <el-col :span="2" v-if="item.leaderFlag == 1" class="sitename">领导批示</el-col>
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
      <el-col :span="24">
        <BizPagination :total="total" :page.sync="queryInfo.pageNum" :limit.sync="queryInfo.pageSize" @pagination="getOpinionList" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getopinionlist } from '@/api/opinion/data';
import { parseTime } from '@/utils/ruoyi';
export default {
  data() {
    return {
      highlight: 2,
      searchKey: '',
      queryInfo: {
        searchValue: '',
        beginTime: '',
        endTime: '',
        searchType: 2,
        queryType: 2,
        pageNum: 1,
        pageSize: 5
      },
      total: -1,
      waitList: []
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
    this.getOpinionList();
  },
  methods: {
    getOpinionList() {
      getopinionlist(this.queryInfo)
        .then(res => {
          if (res.code == 200) {
            this.total = res.total;
            const rows = this.setdraftList(res.rows);
            this.waitList = rows;
          }
        })
        .catch(() => {
          this.$message.error('获取待办列表失败');
        });
    },
    setdraftList(data) {
      data.forEach(item => {
        let time = item.artPublishTime;
        item.artPublishTime = parseTime(time);
      });
      return data;
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
.searchbox {
  margin: auto;
  margin-bottom: 20px;
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
    position: relative;
    border: 1px solid #eef0f9;
    &:hover {
      border: 1px solid #4383e4;
      cursor: pointer;
    }
    margin-bottom: 10px;
    .itemtitle {
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
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
      .chakan {
        position: absolute;
        right: 20px;
        bottom: 20px;
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
.searchbox {
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
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
