<template>
  <div class="container qghgppahdab123">
    <div class="title">我的报告</div>
    <div class="line"></div>
    <el-table :data="reportInfo">
      <el-table-column type="index" label="序号" align="center" width="200"></el-table-column>
      <el-table-column prop="userName" label="姓名" align="center" width="auto"></el-table-column>
      <el-table-column prop="studentId" label="学号" align="center" width="auto"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="auto">
        <template slot-scope="scope">
          <span :class="scope.row.status==1?'green':'red'"></span>
          <span v-if="scope.row.status==1">已评分</span>
          <span v-else>未评分</span>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="分数" align="center" width="auto"></el-table-column>
      <el-table-column prop="num" label="报告" align="center" width="auto">
        <template slot-scope="scope">
          <el-button @click="viewReport(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="recode">所有记录<span>100条</span></div> -->
    <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1" layout="prev, pager, next, jumper" :total="400">
    </el-pagination>-->
  </div>
</template>

<script>
import { getStudentReportList } from "../../../../api/progress";

export default {
  name: "myReport",

  data() {
    return {
      personalForm: {
        uname: "",
        email: "",
        num: "",
        school: "",
        major: "",
        phoneNum: ""
      },
      time: "",
      reportInfo: []
    };
  },
  mounted() {
    // 获取用户id
    let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
    // 获取报告信息
    this.getStudentReportList(userId);
  },
  methods: {
    //  查看报告
    getStudentReportList(userId) {
      getStudentReportList(userId).then(res => {
        console.log(res);
        this.reportInfo = res.data;
      });
    },
    viewReport(row) {
      console.log(row);
      this.$router.push({
        path: "/experimentalResultReport",
        query: row
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  position: relative;
  width: 6.8594rem;
  height: 4rem;
  background: url("../../../../assets/image/personnal/common.png") no-repeat;
  background-size: 100%;
  padding: 0.276rem 0.3802rem;
  box-sizing: border-box;
  margin: 0.1042rem;

  .title {
    font-size: 0.125rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 0.2083rem;
  }

  .line {
    width: 0.3958rem;
    height: 0.0208rem;
    background: rgba(3, 252, 255, 1);
    margin: 0.0396rem 0 0.1042rem 0.0477rem;
  }

  .recode {
    position: absolute;
    bottom: 0.0792rem;
    width: auto;
    height: 0.0729rem;
    font-size: 0.0729rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(40, 158, 255, 1);

    span {
      display: inline-block;
      width: auto;
      min-width: 0.4167rem;
      padding: 0 0.0521rem;
      box-sizing: border-box;
      height: 0.1563rem;
      margin-left: 0.0521rem;
      line-height: 0.1563rem;
      text-align: center;
      color: #fff;
      background: #289eff;
      border-radius: 0.0781rem;
      vertical-align: middle;
    }
  }
}

.green,
.red {
  display: inline-block;
  width: 0.052083rem;
  height: 0.052083rem;
  background: #00c100;
  border-radius: 50%;
  vertical-align: center;
}

.green {
  background: #00c100;
}

.red {
  background: #ff214b;
}
</style>


<style lang="scss">
.qghgppahdab123 {
  .el-table {
    width: auto;
    margin-top: 0.1042rem;
    background-color: transparent !important;
  }

  .el-table th,
  .el-table tr {
    padding: 0.0521rem 0;
    background-color: transparent !important;
    border-bottom: 0.0052rem solid rgba(4, 77, 125, 1);
    font-size: 0.1146rem;
  }

  .el-table .cell {
    height: 0.216667rem;
    line-height: 0.216667rem;
  }

  .el-table th {
    color: #aaf0ff;
  }

  .el-table tr {
    color: #00b8e0;
  }

  .el-table thead {
    font-size: 0.125rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(170, 240, 255, 1);
  }

  .el-table__body tr:hover > td {
    background-color: transparent;
  }

  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 0.0052rem solid rgba(4, 77, 125, 1);
  }

  .el-table::before {
    display: none;
  }

  .el-button {
    background-color: transparent;
    border: none;
    font-size: 0.1146rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
