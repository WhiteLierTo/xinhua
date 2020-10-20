<template>
  <div class="boto">
    <BaseWidthTitle title="重要客户信息" v-show="!showsSructure && !showsChangeInfo">

      <div class="info">
        <div class="search">
          <img class="search-icon" src="../../asset/index/search.png" alt="" @click="searchCompany">
          <el-input placeholder="搜索企业" v-model="companyForm.searchValue" @change="searchCompany">
          </el-input>
        </div>
        <el-table :data="customerListData" style="width: 100%" cellpadding="0" cellspacing="0">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column label="企业信息" width="auto" align="center">
            <template slot-scope="scope">
              <div class="company-info">
                <span>{{scope.row.factoryName }}</span>
                <span class="ownership-structure" @click="watchOwnershipStructure(scope.row)">查看股权结构>></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" width="300" align="center">
            <template slot-scope="scope">
              <span class="change-info" @click="watchChangeInfo(scope.row)">查看变更信息>></span>
            </template>
          </el-table-column>
          <div slot="empty">
            <div class="empty-container" v-if="customerListData.length === 0">
              <img src="../../asset/index/empty.png" alt="">
            </div>
          </div>
        </el-table>
        <el-pagination small @current-change="handleCurrentChange1" :current-page.sync="companyForm.pageNum" :hide-on-single-page="true" layout="prev, pager, next, jumper" :total="total1">
        </el-pagination>

      </div>

    </BaseWidthTitle>

    <div class="tructure" v-show="showsSructure">
      <div class="close" @click="closeOwnershipStructure()">
        <img src="../../asset/index/close.png" alt="">
      </div>
      <el-table class="structure-table" :data=" stockholderData">
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column label="股东及出资信息" width="auto" align="center">
          <template slot-scope="scope">
            <span class="gudong">{{scope.row.stockName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stockPercent" label="持股比例" width="170" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.stockPercent}}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="shouldCapi" label="认缴出资额(万元)" width="300" align="center">
        </el-table-column>
        <el-table-column prop="shoudDate" label="认缴出资日期" width="200" align="center">
        </el-table-column>
        <div slot="empty">
          <div class="empty-container" v-if="showsSructure && stockholderData.length === 0">
            <img src="../../asset/index/empty.png" alt="">
          </div>
        </div>
      </el-table>
      <el-pagination small @current-change="handleCurrentChange2" :current-page.sync="companyForm.pageNum" :hide-on-single-page="true" layout="prev, pager, next, jumper" :total="total2">
      </el-pagination>
    </div>

    <div class="change" v-show="showsChangeInfo">
      <div class="close" @click="closeChangeInfo()">
        <img src="../../asset/index/close.png" alt="">
      </div>
      <el-table class="structure-table" :data="changeInfoData" :max-height="900">

        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>

        <el-table-column prop="changeDate" label="变更日期" width="200" align="center">
        </el-table-column>

        <el-table-column prop="changeName" label="变更项目" width="auto" align="center">
        </el-table-column>

        <el-table-column prop="changeBefore" label="变更前" width="auto" align="left">
          <template slot-scope="scope">
            <p v-html="scope.row.changeBefore"></p>
          </template>
        </el-table-column>

        <el-table-column prop="changeAfter" label="变更后" width="auto" align="left">
          <template slot-scope="scope">
            <p v-html="scope.row.changeAfter"></p>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="empty-container" v-if="showsChangeInfo && changeInfoData.length === 0">
            <img src="../../asset/index/empty.png" alt="">
          </div>
        </div>
      </el-table>
      <el-pagination small @current-change="handleCurrentChange3" :hide-on-single-page="true" :current-page.sync="changeInfoForm.pageNum" layout="prev, pager, next, jumper" :total="total3">
      </el-pagination>

    </div>

  </div>
</template>

<script>

export default {
  name: "customerInfo",
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
      total1: 0,
      total2: 0,
      total3: 0,
      customerListData: [],
      stockholderData: [],
      changeInfoData: [],
      showsSructure: false,
      showsChangeInfo: false
    }
  },
  mounted() {
    this.customerList();
  },
  methods: {
    // 重要客户信息列表
    customerList() {
      this.$ajax.customerList(this.companyForm).then(res => {
        if (res.data.code === 200) {
          this.customerListData = res.data.rows
          this.total1 = res.data.total
        } else {
          setTimeout(this.customerList, 5000)
        }
      })
    },
    // 搜索
    searchCompany() {
      this.customerList()
    },

    //   查看股权结构
    shipStructure() {
      this.$ajax.stockholder(this.stockholderForm).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.stockholderData = res.data.rows
          this.total2 = res.data.total
          console.log(this.stockholderData)

        } else {
          setTimeout(this.shipStructure, 5000)
        }
      })
    },

    watchOwnershipStructure(row) {
      this.showsSructure = true
      this.stockholderForm.dataId = row.id
      this.shipStructure()
    },
    closeOwnershipStructure() {
      this.showsSructure = false
    },

    //查看变更信息
    changeInfo() {
      this.$ajax.changelist(this.changeInfoForm).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.changeInfoData = res.data.rows.map(row => {
            row.changeBefore = row
              .changeBefore.replace(/",/g, '"<br/><br/>')
              .replace(/["']/g, "")
            row.changeAfter = row
              .changeAfter.replace(/",/g, '"<br/><br/>')
              .replace(/["']/g, "")
            return row
          })
          this.total3 = res.data.total
          console.log(this.changeInfoData)

        } else {
          setTimeout(this.changeInfo, 5000)
        }
      })
    },
    watchChangeInfo(row) {
      this.showsChangeInfo = true
      this.changeInfoForm.dataId = row.id
      this.changeInfo()
    },
    closeChangeInfo() {
      this.showsChangeInfo = false
    },
    // 处理分页
    handleCurrentChange1(val) {
      this.companyForm.pageNum = val
      this.customerList()
    },
    handleCurrentChange2(val) {
      this.stockholderForm.pageNum = val
      this.shipStructure()
    },
    handleCurrentChange3(val) {
      this.changeInfoForm.pageNum = val
      this.changeInfo()
    },
  }
}
</script>

<style scoped lang="less">
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

.ownership-structure {
  color: #ffa4a4;
  cursor: pointer;
}

.change-info {
  color: #ffe87e;
  cursor: pointer;
}

.tructure,
.change {
  .close {
    position: absolute;
    top: 0;
    right: 10px;
    width: 67px;
    height: 67px;
    z-index: 99;
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

.el-pagination {
  float: right;
  margin-top: 50px;
}
</style>
<style lang="less">
.boto {
  .el-input {
    margin-left: 60px;
    font-size: 23px;
  }

  .el-input__inner {
    font-size: 23px;
    color: white;
    background-color: transparent;
    border: none;
  }

  .el-table__body-wrapper::-webkit-scrollbar {
    background: #102568;
    width: 10px;
    height: 10px;
    border-radius: 10px;
  }

  .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background: #1a4fbb;
    border-radius: 10px;
  }

  .el-table,
  .el-table__expanded-cell {
    width: 1867px !important;
    background-color: transparent;
  }

  .el-table th {
    padding: 0;
    font-size: 27px;
    color: #4972ff;
    background-color: rgba(121, 154, 255, 0.18);
    border: 1px solid rgba(22, 60, 203, 1);
  }

  .el-table tr {
    padding: 0;
    height: 80px;
    color: rgba(255, 255, 255, 1);
    font-size: 27px;
    background-color: transparent;
    border: none;
  }
  .el-table td {
    border: 1px solid rgba(22, 60, 203, 1);
  }

  .el-table .cell {
    line-height: 30px;
  }

  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    content: none;
  }

  .el-table tbody tr:hover > td {
    background-color: transparent !important;
  }

  .el-pagination .btn-prev {
    margin-left: auto;
    width: 80px;
    height: 30px;
    background: #529df8;
    border-radius: 15px;
    font-size: 14px;
  }

  .el-icon-arrow-left {
    position: relative;
  }

  .el-icon-arrow-left:before {
    content: "上一页";
    color: #fff;
    font-size: 0.06rem;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-pagination .btn-next {
    margin-left: auto;
    width: 80px;
    height: 30px;
    background: #529df8;
    border-radius: 15px;
    font-size: 14px;
    position: relative;
    top: 0.05rem;
    padding-left: 0;
    padding-right: 0;
  }

  .el-icon-arrow-right:before {
    content: "下一页";
    color: #fff;
    font-size: 0.0729rem;
  }

  .el-pager li {
    padding-top: 5px;
    background-color: transparent;
    color: #539df8;
    font-size: 14px;
    margin: 0 10px;
  }

  .el-pager li.active {
    color: #fff;
  }

  .el-pagination__jump {
    color: #289eff;
    font-size: 14px;
  }

  .el-pagination__editor.el-input {
    margin: 0 5px;
    width: 60px;
    height: 30px;
    background: #529df8;
    border-radius: 15px;
  }

  .el-pagination__editor.el-input .el-input__inner {
    color: #fff;
    font-size: 14px;
    outline: none;
    border: none;
  }
}

.empty-container {
  width: 95%;
  height: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 220px;
  padding-left: 60px;
}
</style>

