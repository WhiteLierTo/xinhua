<template>
  <div class="update-psd">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="psdRules"
      label-position="left"
      ref="ruleForm"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item
        label="旧密码"
        prop="usedPsd"
        :rules="[
      { required: true, message: '请输入旧密码', trigger: 'blur' }]"
      >
        <el-input type="password" v-model="ruleForm.usedPsd"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="newPsd">
        <el-input type="password" v-model="ruleForm.newPsd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="sureNewPsd">
        <el-input type="password" v-model="ruleForm.sureNewPsd"></el-input>
      </el-form-item>
    </el-form>
    <div class="psd-btn">
      <div class="cancel" @click="cancel()">取消</div>
      <div @click="onSubmit" class="sure">确定</div>
    </div>
  </div>
</template>

<script>
import { updatePassword } from "../api/user";

export default {
  name: "personalCenter",
  props: ["personal", "status"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.sureNewPsd !== "") {
          this.$refs.ruleForm.validateField("sureNewPsd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPsd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        usedPsd: "",
        newPsd: "",
        sureNewPsd: ""
      },
      isCommon: false,
      psdRules: {
        newPsd: [{ validator: validatePass, trigger: "blur" }],
        sureNewPsd: [{ validator: validatePass2, trigger: "blur" }]
      },
      params: {}
    };
  },
  watch: {},
  mounted() {},
  methods: {
    cancel() {
      this.ruleForm.usedPsd = "";
      this.ruleForm.newPsd = "";
      this.ruleForm.sureNewPsd = "";
      this.$emit("dialog-show", false);
    },
    onSubmit() {
      let password = "";
      if (this.status === 2) {
        password = JSON.parse(localStorage.getItem("userInfo")).password;
      } else if (this.status === 1) {
        password = this.personal.password;
      }
      const { usedPsd } = this.ruleForm;
      if (usedPsd !== password) {
        this.$message({
          message: "旧密码不正确",
          center: true
        });
        return;
      }

      if (this.ruleForm.newPsd == this.ruleForm.sureNewPsd) {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));

        const { sureNewPsd } = this.ruleForm;

        //老师修改学生密码
        if (this.status === 1) {
          let teaId = userInfo.userId;
          this.params = {
            teaId,
            password: sureNewPsd,
            userId: this.personal.userId
          };
        } else if (this.status === 2) {
          //学生自己修改密码
          let userId = userInfo.userId;
          let teaId = "";
          this.params = {
            teaId,
            password: sureNewPsd,
            userId
          };
        }

        updatePassword(this.params)
          .then(res => {
            this.$message({
              message: "密码修改成功",
              center: true
            });
            userInfo.password = sureNewPsd;
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            this.$emit("dialog-show", false);
            // 清空
            for (let key in this.ruleForm) {
              this.ruleForm[key] = "";
            }
          })
          .catch(err => {});
      } else {
        this.$message({
          message: "两次密码输入不一致",
          center: true
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.update-psd {
  position: relative;
  width: 100%;
  padding-top: 0.1rem;
}

.demo-ruleForm {
  width: 100%;
  padding: 0.1rem 0.4rem;
  box-sizing: border-box;
}

.tips {
  position: absolute;
  top: 0.92125rem;
  left: 1.52875rem;
  font-size: 0.09375rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(192, 167, 69, 1);
}

.psd-btn {
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 0.2rem;

  .cancel,
  .sure {
    width: 0.7125rem;
    height: 0.290625rem;
    font-size: 0.114583rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #fff;
    line-height: 0.35rem;
    text-align: center;
    background: url("../assets/image/index_img/experiment.png");
    background-size: 100%;
  }

  .cancel {
    margin-right: 0.304167rem;
  }
}
</style>

<style lang="scss">
.demo-ruleForm {
  .el-form-item {
    margin-bottom: 0.2rem;

    .el-form-item__label {
      font-size: 0.11rem;
      text-align: right;
      /*padding-right: 0.15rem;*/
      color: rgba(77, 148, 255, 1);
    }
  }

  .el-input__inner {
    border: 1px solid rgba(77, 148, 255, 1) !important;
    width: 100%;
  }
}
</style>

<!--/deep/ .el-form-item {-->
<!--margin-top: 0.260417rem;-->
<!--}-->

<!--//改变placeholder颜色-->
<!--/deep/ input::-webkit-input-placeholder {-->
<!--color: #1c5ab9;-->
<!--}-->

<!--/deep/ input::-moz-input-placeholder {-->
<!--color: #1c5ab9;-->
<!--}-->

<!--/deep/ input::-ms-input-placeholder {-->
<!--color: #1c5ab9;-->
<!--}-->

<!--/deep/ .el-form-item__label {-->
<!--text-align: right;-->
<!--}-->

<!--/deep/ .el-form-item__error {-->
<!--// font-size: 0.09375rem;-->
<!--color: #c0a745 !important;-->
<!--padding: 0;-->
<!--padding-left: 0.10625rem;-->
<!--}-->

<!--/deep/ .el-input__inner {-->
<!--background-color: transparent !important;-->
<!--}-->

<!--/deep/ .el-form-item__label:before {-->
<!--content: none !important;-->
<!--}-->

<!--/deep/ .el-input__suffix {-->
<!--display: none;-->
<!--}-->
