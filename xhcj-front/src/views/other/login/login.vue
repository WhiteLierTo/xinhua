<template>
  <div class="login-container">
    <div class="glass"></div>
    <div class="login-inner">
      <div class="hello">Hello!</div>
      <div class="welcome">欢迎登录新华日报财经内容后台管理系统</div>
      <div class="input-container" :class="{onerror:isNameInputOnError}">
        <input
            type="text" class="input" placeholder="请输入用户名"
            @focus="isNameInputOnError = false"
            @blur="onInputBlur('name')"
            v-model="name"
        >
        <div class="error" v-if="isNameInputOnError">
          <img src="../../../assets/other/close.png" class="close-icon" alt="">
          <span>用户名不能为空</span>
        </div>
      </div>
      <div class="input-container" :class="{onerror:isPassWordInputOnError}">
        <input
            type="password" class="input" placeholder="请输入密码"
            @focus="isPassWordInputOnError = false"
            @blur="onInputBlur('password')"
            v-model="password"
            show-password
        >
        <div class="error" v-if="isPassWordInputOnError"
        >
          <img src="../../../assets/other/close.png" class="close-icon" alt="">
          <span>密码不能为空</span>
        </div>
      </div>
      <div class="submit-bt-container">
        <el-button type="primary" round class="submit-bt" @click="login" size="medium">
          <span v-if="!loginLoading">登录</span>
          <i class="el-icon-loading" v-else></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        isNameInputOnError: false,
        isPassWordInputOnError: false,
        name: "",
        password: "",
        loginLoading: false
      }
    },
    methods: {
      onInputBlur(label) {
        if (label === 'name' && !this.name) {
          this.isNameInputOnError = true;
        }
        if (label === 'password' && !this.password) {
          this.isPassWordInputOnError = true;
        }
      },

      async login() {
        this.loginLoading = true;
        let [ok, tokenOrMsg] = await this.$ajax.user.loginSync(this.name, this.password);
        this.loginLoading = false;
        if (ok) {
          this.$message.success("登录成功");
          this.$utils.cookie.set(tokenOrMsg);
          this.$router.push("/");
        } else {
          this.$message.error(tokenOrMsg);
        }
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../../style/config";
  @import "../../../style/styles";

  .login-container {
    width: 100vw;
    height: 100vh;
    .flexCenter();
    position: relative;
    overflow: hidden;
    background: url("../../../assets/other/loginBg.png")  0 / cover fixed;

    .glass {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      filter: blur(4px);
      background: url("../../../assets/other/loginBg.png")  0 / cover fixed;
    }


    .login-inner {
      background: linear-gradient(to right bottom, #FFFFFF50, #1F337880, #1F337890);
      background-size: 100vw 100vh;
      color: white;
      position: relative;
      overflow: hidden;
      padding: 54px 66px 90px;
      z-index: 2;
      margin-bottom: 50px;

      .hello {
        font-size: 32px;
        margin-bottom: 12px;
        font-weight: 300;
      }

      .welcome {
        font-size: 19px;
        letter-spacing: 2px;
        margin-bottom: 60px;
        font-weight: 300;
      }

      .input-container {
        width: 100%;
        height: 86px;
        padding: 0 20px;

        .input {
          width: 100%;
          height: 43px;
          outline: none;
          border: 1px solid transparent;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.3);
          padding-left: 22px;
          color: white;

          &::placeholder {
            color: rgba(255, 255, 255, 0.8);
          }

          &:focus {
            border: 1px solid @defaultBlueClick;
          }
        }

        .error {
          margin-top: 10px;
          color: #333333;
          display: flex;
          align-items: center;

          span {
            font-size: 13px;
          }

          .close-icon {
            width: 18px;
            margin-right: 10px;
          }
        }
      }

      .onerror {
        .input {
          border: 1px solid @errorOrange !important;
        }
      }

      .submit-bt-container {
        width: 100%;
        height: 86px;
        padding: 0 20px;
        margin-top: 18px;

        .submit-bt {
          width: 100%;
        }
      }

    }
  }
</style>

