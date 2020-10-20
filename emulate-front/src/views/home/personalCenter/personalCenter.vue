<template>
  <div class="personal poiuy">
    <div class="header">
      <div class="title">个人中心</div>
      <div class="line"></div>
    </div>
    <el-form ref="form" :model="personalForm" label-width="120px" :inline="false">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名：">
            <el-input v-model="personalForm.userName" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别：">
            <el-radio-group v-model="personalForm.userSex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="邮箱：">
            <el-input v-model="personalForm.email" readonly placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学号：">
            <el-input v-model="personalForm.studentId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="学校：">
            <el-input v-model="personalForm.school"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专业：">
            <!-- <el-input v-model="personalForm.profession" readonly></el-input> -->
            <el-select v-model="personalForm.profession" :popper-append-to-body="false">
              <el-option
                v-for="item in majorOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="密码：" class="psd">
        <div @click="goUpdate()" class="psd-box">
          <span class="xiugai">修改</span>
          <img src="../../../assets/image/personnal/xiugai.png" alt />
        </div>
      </el-form-item>
      <el-form-item label="简介：">
        <el-input type="textarea" v-model="personalForm.userDescription"></el-input>
      </el-form-item>
    </el-form>
    <div @click="onSubmit" class="update-btn">确认修改</div>
    <el-dialog
      :visible.sync="dialogTableVisible"
      :show-close="false"
      :close-on-click-modal="true"
      :modal="false"
    >
      <update-form @dialog-show="dialogShow" :status="2"></update-form>
    </el-dialog>
  </div>
</template>

<script>
import updateForm from "../../../components/updateForm";
import { updateUser } from "../../../api/user";

export default {
  name: "personalCenter",
  components: {
    updateForm
  },
  data() {
    return {
      personalForm: {
        userName: "",
        userSex: "",
        email: "",
        studentId: "",
        school: "",
        profession: "",
        password: "",
        userId: "",
        userDescription: ""
      },
      dialogTableVisible: false,
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
      ]
    };
  },
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const {
      userName,
      userSex,
      email,
      studentId,
      school,
      profession,
      userId,
      userDescription
    } = userInfo;
    this.personalForm = {
      userName,
      userSex,
      email,
      studentId,
      school,
      profession,
      userId,
      userDescription
    };
  },
  methods: {
    onSubmit() {
      updateUser(this.personalForm)
        .then(res => {
          this.$message({
            message: "修改成功",
            center: true
          });
          res.data.isShow = true;
          const data = JSON.stringify(res.data);
          localStorage.setItem("userInfo", data);
        })
        .catch(err => {});
    },
    goUpdate() {
      this.dialogTableVisible = true;
    },
    dialogShow(val) {
      this.dialogTableVisible = val;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.personal {
  position: relative;
  width: 100%;
  height: calc(100vh - 0.8rem);
  background: url("../../../assets/image/personnal/common.png") no-repeat;
  background-size: 93.5% 90%;
  padding: 0.276rem 0.3802rem;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0.1rem;
  .header {
    padding: 0 0 0.104167rem 0.045167rem;

    .title {
      font-size: 0.125rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0.2083rem;
      margin: 0.05rem 0 0 0.15625rem;
    }

    .line {
      width: 0.3958rem;
      height: 0.0208rem;
      background: rgba(3, 252, 255, 1);
      margin: 0.0396rem 0 0.1042rem 0.19625rem;
    }
  }
}

.psd {
  width: 60%;
  color: #fff;

  .psd-box {
    display: inline-block;
    box-sizing: border-box;
    cursor: pointer;
    line-height: 0.104167rem;
    margin-left: 0.104167rem;
  }

  .xiugai {
    display: inline-block;
    margin-right: 0.025rem;
    font-size: 0.1146rem;
    margin-top: 0.026042rem;
  }

  img {
    width: 0.1198rem;
    height: 0.1198rem;
    vertical-align: center;
  }
}

.update-btn {
  /*position: absolute;*/
  /*left: 0.7738rem;*/
  /*bottom: 0.6rem;*/
  margin-left: 0.8rem;
  width: 0.7552rem;
  height: 0.3333rem;
  font-size: 0.11rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(40, 158, 255, 1);
  line-height: 0.35rem;
  text-align: center;
  background: url("../../../assets/image/index_img/experiment.png");
  background-size: 100% 100%;
  cursor: pointer;
}

.el-form {
  width: 75%;
  padding-left: 0.104167rem;
}
</style>


<style lang="scss">
.poiuy {
  .el-form-item {
    display: inline-block;
    margin-right: 0.260417rem;
    line-height: 0.104167rem;
  }

  .el-form-item__label {
    font-size: 0.114583rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(0, 184, 224, 1);
    width: 0.416667rem;
  }

  input::-webkit-input-placeholder {
    color: #126476;
  }

  input::-ms-input-placeholder {
    color: #126476;
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #00b8e0;
    font-size: 0.1146rem;
  }

  .el-input__inner {
    width: 100%;
    background-color: transparent;
    border: none;
    font-size: 0.114583rem;
    color: #00b8e0;
  }

  .el-radio-group {
    margin-left: 0.104167rem;
    width: 100%;
  }

  .el-textarea {
    margin-left: 0.104167rem;
  }

  .el-textarea__inner {
    display: block;
    width: 2.859375rem;
    height: 0.78125rem;
    border: none;
    background: rgba(255, 255, 255, 0.25);
    color: #00b8e0;
    font-size: 0.1146rem;
    resize: none;
    padding: 0.092083rem;
  }

  .el-textarea__inner::-webkit-scrollbar {
    border-radius: 0.0521rem;
    height: 100%;
    width: 0.0417rem;
    background-color: #233865;
  }

  .el-textarea__inner::-webkit-scrollbar-thumb {
    height: 0.0417rem;
    border-radius: 0.0521rem;
    -webkit-box-shadow: inset 0 0 0.0313rem rgba(0, 0, 0, 0.3);
    background-color: #289eff;
  }

  .el-dialog {
    z-index: 999;
    background: url("../../../assets/image/experiment/publicbg.png") no-repeat;
    background-size: 100% 100%;
    width: 3.8021rem;
    margin-top: 30vh !important;
    padding: 0;
  }

  .el-dialog__wrapper {
    background: url("../../../assets/image/model.png") no-repeat;
    background-size: 100% 100%;
  }

  .el-form--inline .el-form-item__content {
    width: 100%;
  }

  .el-radio__inner {
    width: 0.1042rem;
    height: 0.1042rem;
  }

  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    width: 100%;
    box-sizing: border-box;
    padding: 0.08rem 0.12rem;
    /*overflow: hidden;*/
  }

  .el-form-item {
    margin-bottom: 0.15rem;
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
  .el-input {
    width: 57%;
  }
}
</style>

