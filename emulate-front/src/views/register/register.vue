<template>
  <login-header class="container asfadad1">
    <div class="center-box">
      <div class="title">
        <img src="../../assets/image/register/left.png" />
        <span>用户注册</span>
        <img src="../../assets/image/register/right.png" />
      </div>
      <div class="input">
        <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="login-form">
          <el-row>
            <el-col :span="12">
              <div class="info">
                <div class="user">姓名</div>
                <div class="form-item-container">
                  <el-form-item prop="userName" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
                    <el-input v-model="registerForm.userName" class="user-input"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info common">
                <div class="user">性别</div>
                <div class="form-item-container">
                  <el-form-item prop="userSex" :rules="[
                          { required: true, message: '请选择性别', trigger: 'change' }]">
                    <el-select placeholder v-model="registerForm.userSex" :popper-append-to-body="false">
                      <el-option v-for="item in userSexOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="info">
                <div class="user">邮箱</div>
                <div class="form-item-container">
                  <el-form-item prop="email" :rules="[
                          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                    <el-input v-model="registerForm.email" class="user-input" @blur="checkEmail"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info common" style="z-index:9">
                <div class="user">学号</div>
                <div class="form-item-container">
                  <el-form-item prop="studentId" :rules="[
                          { required: true, message: '请输入学号', trigger: 'blur' }]">
                    <el-input v-model="registerForm.studentId" class="pwd-input"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="info">
                <div class="user">学校</div>
                <div class="form-item-container">
                  <el-form-item prop="school" :rules="[
                          { required: true, message: '请输入学校', trigger: 'blur' }]">
                    <el-input v-model="registerForm.school" class="user-input"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info common" style="z-index:900">
                <div class="user">专业</div>
                <div class="form-item-container">
                  <el-form-item prop="profession" :rules="[
                          { required: true, message: '请选择专业', trigger: 'change' }]">
                    <el-select placeholder v-model="registerForm.profession" :popper-append-to-body="false">
                      <el-option v-for="item in majorOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="info">
                <div class="user">密码</div>
                <div class="form-item-container">
                  <el-form-item prop="password">
                    <el-input v-model="registerForm.password" show-password class="user-input"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info common" style="z-index:9">
                <div class="user">确认密码</div>
                <div class="form-item-container">
                  <el-form-item prop="verifyPassword">
                    <el-input v-model="registerForm.verifyPassword" show-password class="pwd-input"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="btn" @click="registerHandleClick">注册</div>
            </el-col>
            <el-col :span="12">
              <div class="btn" @click="backHandleClick">返回</div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </login-header>
</template>

<script>
import { register, checkEmail } from "../../api/user";

export default {
  name: "Login",
  components: {
    loginHeader: () => import("../../components/loginHeader")
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.verifyPassword !== "") {
          this.$refs.registerForm.validateField("verifyPassword");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        userName: "",
        password: "",
        studentId: "",
        userSex: "",
        email: "",
        school: "",
        profession: "",
        verifyPassword: ""
      },
      userSexOptions: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],

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
      registerRules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        verifyPassword: [{ validator: validatePass2, trigger: "blur" }]
      },
      status: ""
    };
  },
  methods: {
    checkEmail() {
      const { email } = this.registerForm;
      checkEmail(email)
        .then(res => {
          this.status = res.data;
        })
        .catch(err => { });
    },
    registerHandleClick() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          if (this.status === 1) {
            this.$message({
              message: "邮箱已存在",
              center: true
            });
            return;
          }
          register(this.registerForm)
            .then(res => {
              this.$message({
                message: "注册成功",
                center: true
              });
              this.$router.push("/login");
            })
            .catch(err => { });
        }
      });
    },
    backHandleClick() {
      this.$router.push("/");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  .center-box {
    position: relative;
    width: 5.1198rem;
    min-height: 3.8385rem;
    margin: 0.4rem auto 0;
    background: url("../../assets/image/register/registerform.png");
    background-size: 100% 100%;
    box-sizing: border-box;
    padding-top: 0.4rem;

    .title {
      width: 100%;
      text-align: center;
      display: flex;
      align-items: flex-end;
      justify-content: center;

      img {
        width: 0.63rem;
        height: 0.08rem;
        position: relative;
        bottom: 0.05rem;
      }

      span {
        font-size: 0.15rem;
        margin: 0 0.15rem;
        background: linear-gradient(#00d6ff 52%, #003a91);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .center {
        width: 0.7396rem;
        height: 0.1771rem;
        padding: 0 0.1302rem 0 0.1563rem;
        line-height: 0.1771rem;
        font-size: 0.1667rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        background: linear-gradient(#00d6ff 52%, #003a91);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .input {
      width: 100%;
      padding: 0.1rem 0.5rem 0;
      font-size: 0.1042rem;
      color: #289eff;
      box-sizing: border-box;

      .info {
        position: relative;
        width: 80%;
        height: 0.3438rem;
        z-index: 999;
        margin-top: 0.1563rem;
        background: url("../../assets/image/register/input.png") no-repeat
          center center;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .user {
          margin-right: 0.0521rem;
          margin-left: 0.15rem;
          flex-shrink: 0;
        }

        .form-item-container {
          flex: 1;
          height: 100%;
        }
      }

      .btn {
        width: 1rem;
        height: 0.3rem;
        z-index: 900;
        margin: 0.1563rem auto 0;
        background: url("../../assets/image/experiment/btnbg.png") no-repeat;
        background-size: 100% 100%;
        font-size: 0.125rem;
        line-height: 0.3rem;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang="scss">
.asfadad1 {
  .el-input {
    width: 90%;
  }

  .el-input__inner {
    background: transparent;
    border: none;
    outline: none;
    color: #289eff;
    font-size: 0.0938rem;
  }

  .el-form-item {
    margin-bottom: 0;
    height: 100% !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-form-item__error {
    top: 125%;
    left: -30%;
  }

  .el-select-dropdown {
    left: -0.2rem !important;
  }
}
</style>
