<template>
  <login-header class="container">
    <div class="center-box aaabbbccc">
      <img class="center-img" src="../../assets/image/login/loginform.png" alt="登录" />
      <div class="title">
        <div class="left t1">
          <img src="../../assets/image/login/left.png" />
        </div>
        <div class="center t1">用户登录</div>
        <div class="right t1">
          <img src="../../assets/image/login/right.png" />
        </div>
      </div>
      <div class="input">
        <el-form ref="loginForm" :model="loginForm" class="login-form">
          <div class="username">
            <img class="user" src="../../assets/image/login/user.png" />
            <div class="user-input-container">
              <el-form-item style="height: 100%" prop="email" :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                  ]">
                <el-input v-model="loginForm.email" placeholder="邮箱" class="user-input"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="username" style="margin-top: 0.2rem">
            <img class="user" src="../../assets/image/login/password.png" />
            <div class="user-input-container">
              <el-form-item prop="password" :rules="[
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]">
                <el-input v-model="loginForm.password" placeholder="密码" show-password @keyup.enter.native="handleLogin" class="pwd-input"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="btn" @click="handleLogin">登录</div>
        </el-form>
      </div>
      <div class="loginText">
        <div class="loginLeft" @click="visitorsHandleClick">访客登录</div>
        <div class="loginRight">
          <span class="regiest" @click="registerHandleClick">注册</span>/
          <span class="forget" @click="forgetHandleClick">忘记密码</span>
        </div>
      </div>
    </div>
  </login-header>
</template>

<script>
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Login",
  components: {
    loginHeader: () => import("../../components/loginHeader")
  },
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        email: "",
        password: ""
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  mounted() { },
  methods: {
    ...mapActions("user", ["Login", "fkLogin"]),
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.Login(this.loginForm)
            .then(res => {
              this.$message({
                message: "登录成功",
                center: true
              });
              let userType = JSON.parse(localStorage.getItem("userInfo")).userType;
              //   console.log(userType)
              if (userType == 1) {
                this.$router.push({
                  name: "personalCenter",
                  params: {
                    activeName: "second",
                  }
                });
              } else {
                this.$router.push({
                  name: "home"
                });
              }

            })
            .catch(err => {
              this.$message({
                message: err,
                center: true
              });
            });
        }
      });
    },
    //游客登录
    visitorsHandleClick() {
      this.fkLogin().then(res => {
        this.$router.push({
          name: "home"
        });
      });
    },
    // 忘记密码
    forgetHandleClick() {
      this.$message({
        message: "忘记密码请联系管理员修改密码",
        center: true
      });
    },
    registerHandleClick() {
      // 跳转注册
      this.$router.push({
        path: "/register"
      });
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
    width: 4.0104rem;
    height: 3.4531rem;
    margin: 0.5208rem auto 0;

    .center-img {
      width: 100%;
      height: 100%;
    }

    .title {
      width: 4.0104rem;
      position: absolute;
      top: 0.5677rem;
      left: 0.8438rem;

      .t1 {
        float: left;
      }

      .left img,
      .right img {
        width: 0.625rem;
        height: 0.0781rem;
        margin-top: 0.0521rem;
      }

      .center {
        width: 0.7396rem;
        height: 0.1771rem;
        padding: 0 0.1302rem 0 0.1563rem;
        line-height: 0.1771rem;
        font-size: 0.1667rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        background: linear-gradient(#00d6ff 52%, #003a91);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .input {
      position: absolute;
      top: 1.0417rem;
      left: 0.7552rem;

      .username {
        position: relative;
        width: 2.51rem;
        height: 0.3rem;
        z-index: 999;
        background: url("../../assets/image/login/input.png") no-repeat center
          center;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.2rem;
        box-sizing: border-box;

        .user {
          width: 0.1979rem;
          height: 0.1875rem;
          margin-right: 0.14rem;
          /*margin: 0.1458rem 0.1563rem 0 0.2865rem;*/
        }

        .user-input-container {
          flex: 1;
          height: 0.3rem;
        }
      }

      .password {
        width: 2.5104rem;
        height: 0.4479rem;
        z-index: 999;
        margin-top: 0.1042rem;
        background: url("../../assets/image/login/input.png") no-repeat center
          center;
        background-size: 100%;

        .pwd {
          width: 0.1771rem;
          height: 0.2083rem;
          margin: 0.1458rem 0.1563rem 0 0.2865rem;
        }
      }

      .btn {
        width: 2.5104rem;
        height: 0.3802rem;
        z-index: 999;
        margin-top: 0.0781rem;
        background: url("../../assets/image/login/loginbtn.png") no-repeat
          center center;
        background-size: 100%;
        font-size: 0.125rem;
        line-height: 0.3802rem;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
    }

    .loginText {
      overflow: hidden;
      width: 2.5rem;
      position: absolute;
      bottom: 0.6823rem;
      left: 0.7344rem;
      font-size: 0.0938rem;
      color: rgba(40, 158, 255, 1);
      font-family: Source Han Sans CN;
      font-weight: 400;
      cursor: pointer;

      .loginLeft {
        float: left;
      }

      .loginRight {
        float: right;

        .regiest {
          color: rgba(170, 240, 255, 1);
          padding-right: 0.026rem;
        }

        .forget {
          padding-left: 0.026rem;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.aaabbbccc {
  .el-input__inner {
    background: transparent;
    height: 0.3rem;
    border: none;
    outline: none;
    color: #289eff;
    font-size: 0.0938rem;
  }

  .el-form-item__error {
    top: 114%;
    left: -30%;
  }
}
</style>