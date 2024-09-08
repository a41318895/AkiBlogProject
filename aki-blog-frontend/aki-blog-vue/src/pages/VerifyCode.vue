<template>
    <div class="container">
      <h1 class="verifyTitle"></h1>
      <div class="verifyBox">
        <div class="verify-title">
          <h1>【2/3】核對郵件之驗證碼</h1>
        </div>
        <el-alert
          v-show="verificationCodeCheckErr"
          v-html="verificationCodeCheckTitle"
          :title="verificationCodeCheckTitle"
          type="error"
          show-icon
          :closable="false"
        ></el-alert>
        <form>
          <el-input class="input-field" type="password" placeholder="驗證碼" v-model="verificationCode"></el-input>
          <div 
            class="verify-btn tcolors-bg" 
            @click="verificationCodeCheck" 
            v-loading.fullscreen.lock="fullscreenLoading" 
            element-loading-text="提交資料中...">送出驗證碼
          </div>
        </form>
        <div class="navigation-links">
            <a href="#/ForgotPassword" class="tcolors">回到步驟一</a>
            <a href="#/" class="tcolors">返回首頁</a>
        </div>
      </div>
    </div>
  </template>

<script>
import { verifyCode } from "../api/user.js";

export default{
    data() {
        return {
            verificationCode: "",
            fullscreenLoading: false,
            verificationCodeChecked: false,
            verificationCodeCheckErr: false,
            verificationCodeCheckTitle: ""
        }
    },
    methods: {

        verificationCodeCheck() {

            this.fullscreenLoading = true;

            verifyCode(this.verificationCode)
                .then((response) => {
                    this.verificationCodeChecked = true

                    if(this.verificationCodeChecked) {
                        this.goReset()
                    }
                })
                .catch((error) => {
                    this.showError("驗證碼錯誤,<br/>五分鐘之內進行相同操作者無效...");
                })
                .finally(() => {
                    this.fullscreenLoading = false;
                })
        },

        goReset() {
            this.$router.push({ path: "/ResetPassword", query: { vcode: this.verificationCode } })
        },

        showError(message) {
            this.verificationCodeCheckErr = true;
            this.verificationCodeCheckTitle = message;
        },

        resetForm() {
            this.verificationCode = "";
        }
    },
    beforeRouteLeave(to, from, next) {
        this.resetForm();
        next();
    }
}
</script>

<style>

.verifyBox{
    background: #fff;
    padding:40px;
    max-width:320px;
    margin:0 auto;
    padding-bottom:60;
}

.verifyTitle{
    text-align: center;
    font-size: 26px;
    padding-top:50px;
    margin-bottom: 20px;
}

.verify-title{
    position: relative;
    height:32px;
    line-height: 32px;
    margin-bottom: 20px;
}

.verify-title h1{
    font-size: 24px;
    color:#666;
    font-weight: bold;
}

.verify-btn{
    color:#fff;
    text-align: center;
    letter-spacing: 5px;
    padding:8px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 30px;
}

.input-field {
  margin-bottom: 20px;
}

.navigation-links {
  display: flex;
  justify-content: space-between;
  margin-top: -20px;
}

</style>