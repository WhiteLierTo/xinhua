<template>
  <div class="containerbox">
    <el-row class="searchbox">
      <el-col :span="24" style="text-align: center;">
        <el-input placeholder="请输入关键字查询" v-model="queryInfo.searchValue"  style="width: 40%;">
          <el-button slot="append" icon="el-icon-search" @click="search">查询</el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="draftTitle">
      <el-card>
        <div class="listtitle">
          <i></i>
          <div class="txt">当前草稿</div>
        </div>
      </el-card>
    </el-row>
    <div class="draftlist">
      <el-row class="cardlist" v-for="(item, index) in draftList" :key="index">
        <el-card>
          <i class="delete" @click="checkDelFlag(item.orderId)">
            <img src="../../assets/image/delete-0.png" alt="" v-if="checkIds.indexOf(item.orderId) == -1">
            <img src="../../assets/image/delete-1.png" alt="" v-else>
          </i>
          <el-row type="flex" align="middle" @click.native="openDraft(item.orderId, item.orderStatus)">
            <el-col :span="22">
              <el-row class="itemtitle">{{ item.artTitle }}</el-row>
              <el-row class="itemcontent">
                <div class="txtcontent">{{ item.artContent }}</div>
              </el-row>
              <el-row class="itemkey">
                <el-col :span="6" class="publishtime">发布时间：{{ item.artPublishTime }}</el-col>
                <el-col :span="4" class="sitename">{{ item.artSourceName }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="2" style="text-align: center">
                <el-button type="primary" size="medium">查看</el-button>
            </el-col>
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
      <el-col :span="1">
        <el-checkbox v-model="allCheck" @change="checkAll">全选</el-checkbox>
      </el-col>
      <el-col :span="2">
        <span class="delall" @click="confirmDel">删除</span>
      </el-col>
      <el-col :span="21">
        <BizPagination :total="total" :page.sync="queryInfo.pageNum" :limit.sync="queryInfo.pageSize" @pagination="getDraftList" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getdraftlist, deletedraft } from "@/api/opinion/data";
export default {
  data() {
    return {
      allCheck: false,
      searchKey: "",
      queryInfo: {
        searchValue: "",
        pageNum: 1,
        pageSize: 5
      },
      total: -1,
      draftList: [],
      checkIds: []
    };
  },
  watch: {
    "queryInfo.searchValue"() {
      if (this.queryInfo.searchValue == "") {
        this.queryInfo.pageNum = 1;
        this.getDraftList();
      }
    }
  },
  created() {
    this.getDraftList();
  },
  methods: {
    getDraftList() {
      getdraftlist(this.queryInfo)
        .then(res => {
          if (res.code == 200) {
            window.pageYOffset = 0
              document.body.scrollTop = 0
              document.documentElement.scrollTop = 0
            this.total = res.total;
            this.draftList = res.rows;
          }
        })
        .catch(() => {
          this.$message.error("获取草稿列表失败");
        });
    },
    openDraft(id, status) {
      this.$router.push("/draft/" + id);
    },
    search() {
      this.queryInfo.pageNum = 1;
      this.getDraftList();
    },
    checkDelFlag(orderId) {
      var index = this.checkIds.indexOf(orderId)
      if (index != -1) {
        this.checkIds.splice(index, 1);
      } else {
        this.checkIds.push(orderId)
      }
      if (this.checkIds.length == this.draftList.length) {
        this.allCheck = true
      } else {
        this.allCheck = false
      }
    },
    checkAll(detail) {
      if (detail) {
        this.draftList.forEach(d => {
          this.checkIds.push(d.orderId)
        })
      } else {
        this.checkIds.splice(0)
      }
    },
    confirmDel() {
      if (this.checkIds.length == 0) {
        this.$message.error('请先选择待删除的数据');
        return
      }
      this.$confirm('此操作将永久删除数据，是否继续', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletedraft(this.checkIds).then(res => {
          console.log(res)
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getDraftList()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
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
    border: 1px solid #EEF0F9;
    &:hover {
      border: 1px solid #4383E4;
      cursor: pointer;
    }
    .delete {
      position: absolute;
      top: 0;
      left: 0;
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
.delall {
  font-size: 14px;
  color: #606266;
  padding-left: 10px;
  cursor: pointer;
  &:hover {
    color: red;
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
