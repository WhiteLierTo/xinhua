<template>
  <div class="container nbvp">
    <div class="title">报告管理</div>
    <div class="line"></div>
    <el-form ref="form" :model="personalForm" label-width="auto" :inline="true" class="nbvp-form">
      <el-form-item label="姓名：">
        <el-input placeholder="请输入内容" v-model="personalForm.userName">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchList()"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="学号：">
        <el-input placeholder="请输入学号" v-model="personalForm.num">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchList()"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="学校：">
        <el-input placeholder="请输入学校" v-model="personalForm.school">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchList()"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="专业：">
        <el-select
          v-model="personalForm.major"
          :popper-append-to-body="false"
          @change="searchList()"
        >
          <el-option
            v-for="item in majorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select
          v-model="personalForm.status"
          :popper-append-to-body="false"
          @change="searchList()"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input placeholder="请输入邮箱" v-model="personalForm.email">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchList()"></i>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="delete-all" @click="deleteData">清除选中实验数据</div>
    <div class="table-container">
      <el-table :data="reportInfo" style="width: 85%;" @selection-change="selectChange">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column type="index" label="#" align="center" width="40"></el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" width="auto"></el-table-column>
        <el-table-column prop="studentId" label="学号" align="center" width="auto"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="100">
          <template slot-scope="scope">
            <span :class="scope.row.status==1?'green':'red'"></span>
            <span v-if="scope.row.status==1">已评分</span>
            <span v-else>未评分</span>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="分数" align="center" width="100"></el-table-column>
        <el-table-column prop="num" label="报告" align="center" width="120">
          <template slot-scope="scope">
            <el-button @click="viewReport(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="实验数据" align="center" width="120">
          <template slot-scope="scope">
            <el-button @click="singleDelete(scope.row.userId)">清除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button @click="updatePsd(scope.row)" v-if="scope.row.show">修改密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="foot-container">
      <div class="recode">
        <span>所有记录</span>
        <span>{{total}}条</span>
      </div>
      <el-pagination
        small
        :page-size="5"
        @current-change="handleCurrentChange"
        :current-page.sync="personalForm.pageNum"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      :visible.sync="dialogTableVisible"
      :show-close="false"
      :close-on-click-modal="true"
      :modal="false"
    >
      <update-form @dialog-show="dialogShow" :personal="personal" :status="1"></update-form>
    </el-dialog>
  </div>
</template>

<script>
import { getTeacherReportList, batchDel } from "../../../../api/progress";
import updateForm from "../../../../components/updateForm";

export default {
  name: "reportmanage",
  components: { updateForm },
  data() {
    return {
      personalForm: {
        uname: "",
        email: "",
        num: "",
        school: "",
        major: "",
        phoneNum: "",
        status: "",
        pageNum: 1,
        pageSize: 5
      },
      time: "",
      reportInfo: [],
      total: 0,
      multipleSelection: [], //选中的用户
      majorOptions: [
        {
          value: "经贸 ",
          label: "经贸"
        },
        {
          value: "金融",
          label: "金融"
        },
        {
          value: "工商",
          label: "工商"
        },
        {
          value: "管工",
          label: "管工"
        },
        {
          value: "工程",
          label: "工程"
        },
        {
          value: "公管",
          label: "公管"
        },
        {
          value: "经管",
          label: "经管"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      statusOptions: [
        {
          value: "1",
          label: "已评分"
        },
        {
          value: "2",
          label: "未评分"
        }
      ],
      dialogTableVisible: false,
      personal: {}
    };
  },
  mounted() {
    var obj = {
      allSelected: 1,
      pageNum: 1,
      pageSize: 5
    };
    this.getReportList(obj);
  },
  methods: {
    dialogShow(val) {
      this.dialogTableVisible = val;
    },
    //修改密码
    updatePsd(row) {
      this.dialogTableVisible = true;
      this.personal = row;
    },
    // 获取全部列表
    getReportList(data) {
      getTeacherReportList(data).then(res => {
        console.log(res);
        this.reportInfo = res.rows;
        this.total = res.total;
        this.reportInfo.forEach(v => {
          console.log(v.password);
          v.show = true;
          if (v.password) {
            v.show = true;
          } else {
            v.show = false;
          }
        });
      });
    },
    // 搜索
    searchList() {
      this.personalForm.pageNum = 1;
      this.getReportList(this.personalForm);
    },

    handleCurrentChange(val) {
      this.personalForm.pageNum = val;
      this.getReportList(this.personalForm);
    },
    //查看实验报告
    viewReport(row) {
      console.log(row);
      this.$router.push({
        path: "/experimentalReport",
        query: {
          userId: row.userId
        }
      });
    },
    //删除数据
    clearData(data) {
      batchDel(data)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: "删除实验数据成功",
              center: true
            });
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            center: true
          });
        });
    },
    // 单条删除
    singleDelete(userId) {
      var data = [userId];
      this.clearData(data);
    },

    selectChange(rows) {
      //   console.log(rows)
      this.multipleSelection = [];
      rows.forEach(item => {
        this.multipleSelection.push(item.userId);
      });
      //   console.log(this.multipleSelection)
    },
    // 批量删除
    deleteData() {
      this.clearData(this.multipleSelection);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: calc(100vh - 0.8rem);
  background: url("../../../../assets/image/personnal/common.png") no-repeat;
  background-size: 100% 100%;
  padding: 0.276rem 0.3802rem;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .title {
    font-size: 0.125rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 0.2083rem;
    flex-shrink: 0;
  }

  .line {
    width: 0.3958rem;
    height: 0.0208rem;
    background: rgba(3, 252, 255, 1);
    margin: 0.0396rem 0 0.1042rem 0.0477rem;
    flex-shrink: 0;
  }

  .nbvp-form {
    flex-shrink: 0;
  }

  .foot-container {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 85%;
    .recode {
      font-size: 0.0729rem;
      font-weight: 400;
      color: rgba(40, 158, 255, 1);
      display: flex;
      word-break: keep-all;
      line-height: 0.1563rem;
      position: relative;
      top: 0.05rem;

      span + span {
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

  .table-container {
    flex: 1;
    overflow: auto;
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

.el-form {
  width: 85%;
}
.delete-all {
  width: 1rem;
  height: 0.241667rem;
  font-size: 0.114583rem;
  font-weight: 400;
  color: rgba(40, 158, 255, 1);
  text-align: center;
  line-height: 0.241667rem;
  background: url("../../../../assets/image/personnal/delete.png");
  background-size: 100% 100%;
  cursor: pointer;
}
</style>


<style lang="scss">
.nbvp {
  .el-form-item {
    height: 0.2083rem;
    margin: 0;
    margin-bottom: 0.1563rem;
    margin-right: 0.1563rem;
    line-height: 0.2083rem;
  }

  //改变placeholder颜色
  input::-webkit-input-placeholder {
    color: #126476;
  }

  input::-moz-input-placeholder {
    color: #126476;
  }

  input::-ms-input-placeholder {
    color: #126476;
  }

  .el-form-item__content {
    position: relative;
    line-height: unset;
  }

  .el-input__icon {
    position: relative;
    color: rgba(3, 252, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 8%;
    padding-right: 0.1042rem;
    cursor: pointer;
  }

  .el-form-item {
    display: inline-block;
    margin-right: 0.260417rem !important;
    line-height: 0.104167rem;
  }

  //改变placeholder颜色
  //改变placeholder颜色
  input::-webkit-input-placeholder {
    color: #126476;
  }

  input::-moz-input-placeholder {
    color: #126476;
  }

  input::-ms-input-placeholder {
    color: #126476;
  }

  .el-input {
    width: 1.020833rem;
    height: 0.209375rem;
    font-size: 0.114583rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(0, 184, 224, 1);
    line-height: 0.208333rem;
  }

  .el-input__inner {
    height: 0.238333rem;
    background-color: transparent;
    color: #00b8e0;
    border: 0.005208rem solid rgba(0, 184, 224, 1);
    border-radius: 0.052083rem;
  }

  .el-form-item__label {
    height: 0.208333rem;
    text-align: left;
    font-size: 0.114583rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(0, 184, 224, 1);
    width: 0.416667rem;
    line-height: 0.208333rem;
  }

  .el-icon-arrow-up:before {
    content: "";
    position: absolute;
    right: -0.9917rem !important;
    top: 0.13167rem;
    color: rgba(3, 252, 255, 1);
    font-size: 0.104167rem;
  }

  .el-icon-arrow-up:after {
    content: "";
    position: absolute;
    right: -1.9917rem !important;
    top: 0.13167rem;
    color: rgba(3, 252, 255, 1);
    font-size: 0.104167rem;
  }

  .el-select .el-input.is-focus .el-input__inner,
  .el-select .el-input__inner:focus {
    border-color: rgba(0, 184, 224, 1);
  }

  .el-select-dropdown,
  .el-select-dropdown__item {
    background-color: transparent !important;
    line-height: 0.208333rem;
  }

  deep.el-select-dropdown__item.hover {
    background-color: transparent !important;
  }

  .el-select-dropdown__item.selected {
    background: transparent !important;
  }

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
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    position: relative;
  }

  .el-pagination {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .el-pagination .btn-prev {
    margin-left: auto;
    width: 0.4167rem;
    height: 0.1563rem;
    background: #289eff;
    border-radius: 0.0781rem;
    font-size: 0.0729rem;
    position: relative;
    top: 0.05rem;
    padding: 0;
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
    width: 0.4167rem;
    height: 0.1563rem;
    background: #289eff;
    border-radius: 0.0781rem;
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
    padding-top: 0.052083rem;
    background-color: transparent;
    color: #409eff;
    font-size: 0.0729rem;
    margin: 0 0.052083rem;
  }

  .el-pager li.active {
    color: #fff;
  }

  .el-pagination__jump {
    color: #289eff;
    font-size: 0.0729rem !important;
    position: relative;
    top: 0.05rem;
  }

  .el-pagination__editor.el-input {
    width: 0.3rem;
    height: 0.1563rem;
    line-height: 0.1563rem;
    background: #289eff;
    border-radius: 0.0781rem;
    vertical-align: middle;
    font-size: 0.0729rem;
    margin: 0 0.05rem;
  }

  .el-pagination__editor.el-input .el-input__inner {
    width: 0.3167rem;
    height: 0.1563rem;
    padding-bottom: 0.104167rem;
    box-sizing: border-box;
    color: #fff;
    font-size: 0.0729rem;
    outline: none;
    border: none;
  }

  // .right {
  //   position: absolute;
  //   right: 0.15625rem;
  //   top: 0.640417rem;
  //   width: 40%;
  // }
  .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    position: absolute;
    width: 1.441667rem;
    padding-left: 0.260417rem;
  }

  .el-date-editor .el-range-input,
  .el-date-editor .el-range-separator {
  }

  .el-icon-time:before {
    position: absolute;
    left: -2.1125rem;
    top: 0.016042rem;
    font-size: 0.15625rem;
  }

  .el-scrollbar__wrap {
    z-index: 99;
  }

  .el-select-dropdown__item {
    height: 0.14625rem !important;
    padding: 0.052083rem 0;
    color: #126476;
    font-size: 0.0504167rem;
    background: transparent !important;
  }

  .el-select-dropdown__item.selected {
    color: #00b8e0;
  }

  .el-scrollbar__bar,
  .el-scrollbar__thumb {
    background-color: #126476 !important;
    display: none;
  }

  .el-select-dropdown__item {
    height: 0.3rem !important;
    line-height: 0.19625rem !important;
    color: #000;
    background: #fff !important;

    span {
      margin-left: 0.1rem;
      font-size: 0.1rem;
    }
  }

  .el-select-dropdown__item.selected {
    color: #00b8e0;
    background: #fff !important;
  }

  .el-select-dropdown__list {
    padding: 0 !important;
  }

  .el-table__row {
    height: 0.2rem;
  }

  .el-table td,
  .el-table th {
    padding: 0.025rem 0;
  }
  .el-pagination--small span:not([class*="suffix"]) {
    height: 0.15rem;
  }
  .el-dialog {
    z-index: 999;
    background: url("../../../../assets/image/experiment/publicbg.png")
      no-repeat;
    background-size: 100% 100%;
    width: 3.8021rem;
    margin-top: 30vh !important;
    padding: 0;
  }

  .el-dialog__wrapper {
    background: url("../../../../assets/image/model.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
