<template>
  <div class="login">
    <div class="logintop">
      <div class="logo-con">
        <img src="../assets/image/logo.png" />
      </div>
      <div class="logo-name">
        江苏省教育系统舆情管理平台
      </div>
    </div>
    <div class="loginbg">
      <div class="logincenter">
        <div class="longinbanner"></div>
        <div class="login-con">
          <el-card title="江苏省教育系统舆情管理平台" :bordered="false">
            <div class="form-con">
              <el-form
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                class="login-form"
              >
                <div class="login-title">江苏省教育系统舆情管理平台</div>
                <div class="login-input">
                  <el-form-item prop="username">
                    <el-input
                      v-model="loginForm.username"
                      placeholder="请输入用户名"
                      prefix-icon="el-icon-user-solid"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      v-model="loginForm.password"
                      placeholder="请输入密码"
                      prefix-icon="el-icon-lock"
                      show-password
                      @keyup.enter.native="handleLogin"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="login-button">
                  <el-form-item>
                    <el-button
                      :loading="loading"
                      size="medium"
                      type="primary"
                      style="width:100%;"
                      @click.native.prevent="handleLogin"
                    >
                      <span v-if="!loading">登 录</span>
                      <span v-else>登 录 中...</span>
                    </el-button>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div class="loginbottom"></div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [{ required: true, trigger: "blur", message: "密码不能为空" }]
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCookie();
    var _self = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        _self.handleLogin();
      }
    };
  },
  methods: {
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push("/index");
            })
            .catch(() => {
              this.loading = false;
              //   this.getCode();
            });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: -webkit-gradient(
    linear,
    100% 0,
    0 100%,
    from(#01c6fa),
    to(#1493fa)
  );
  position: relative;
  .logintop {
    height: 66px;
    background: #363e4f;
    .logo-con {
      height: 64px;
      padding: 8px 0;
      vertical-align: middle;
      display: inline-block;
      margin-left: 380px;
    }
    .logo-name {
      display: inline-block;
      vertical-align: middle;
      font-size: 26px;
      color: #fff;
      padding-left: 10px;
    }
  }
  .loginbottom {
    height: 60px;
    background: #363e4f;
    line-height: 60px;
    text-align: center;
    font-size: 14px;
    color: #989898;
  }
  .loginbg {
    width: 100%;
    height: calc(100% - 126px);
    background: url(../assets/image/loginbg.png) no-repeat center bottom;
    background-size: 80%;
    display: flex;
    .longinbanner {
      float: left;
      width: 613px;
      height: 422px;
      background: url(../assets/image/login_banner_ele.png) no-repeat center
        bottom;
      margin-right: 180px;
    }
    .logincenter {
      margin: auto;
    }
  }
  &-con {
    width: 400px;
    float: right;
    box-shadow: 0 1px 5px -1px rgba(0, 0, 0, 0.5490196078431373);
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
  .login-form {
    text-align: center;
    color: #272322;
    font-size: 16px;
    .login-title {
      padding: 20px 0 20px 0;
      color: #272322;
      font-size: 16px;
      font-weight: 700;
      line-height: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      border-bottom: 1px solid #eee;
    }
  }
  .login-input {
    padding: 16px;
    padding-bottom: 0;
  }
  .login-button {
    padding: 0 16px 26px;
  }
  .el-card__body {
    padding: 0;
  }
  .el-input--medium .el-input__inner {
    height: 42px;
    line-height: 42px;
    border: 1px solid #2d8cf0;
  }
  .el-button {
    font-size: 18px;
    line-height: 26px;
  }
  .el-form-item {
    margin-bottom: 26px;
  }
}
</style>
