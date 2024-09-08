<template>
    <div class="container">
      <h1 class="forgotPasswordTitle"></h1>
      <div class="forgotPasswordBox">
        <div class="forgorPassword-title">
          <h1>【1/3】忘記密碼之資料確認</h1>
        </div>
        <el-alert
          v-show="infoCheckErr"
          v-html="infoCheckTitle"
          :title="infoCheckTitle"
          type="error"
          show-icon
          :closable="false"
        ></el-alert>
        <form>
          <el-input class="input-field" type="text" placeholder="用戶名" v-model="userName"></el-input>
          <el-input class="input-field" type="text" placeholder="用戶暱稱" v-model="nickName"></el-input>
          <el-input class="input-field" type="text" placeholder="電子郵件" v-model="email"></el-input>
          <el-input class="input-field" type="text" placeholder="手機號碼" v-model="phoneNumber"></el-input>
          <div 
            class="forgorPassword-btn tcolors-bg" 
            @click="forgotPasswordCheck" 
            v-loading.fullscreen.lock="fullscreenLoading" 
            element-loading-text="提交資料中...">送出資料校對
          </div>
        </form>
        <div class="backHome">
          <a href="#/" class="tcolors">返回首頁</a>
        </div>
      </div>
    </div>
  </template>

<script>
import { forgotPassword } from "../api/user.js";

export default{
    data() {
        return {
            userName: "",
            nickName: "",
            email: "",
            phoneNumber: "",
            fullscreenLoading: false,
            infoChecked: false,
            infoCheckErr: false,
            infoCheckTitle: ""
        }
    },
    methods: {

        forgotPasswordCheck() {
            
            this.fullscreenLoading = true;

            const userInfo = {
                userName: this.userName,
                nickName: this.nickName,
                email: this.email,
                phoneNumber: this.phoneNumber
            }

            forgotPassword(userInfo)
                .then((response) => {
                    this.infoChecked = true
                    
                    if(this.infoChecked) {
                        this.goVerify()
                    }
                })
                .catch((error) => {
                    this.showError("個人資料無法完全匹配,<br/>請在五分鐘後再次嘗試...")
                })
                .finally(() => {
                    this.fullscreenLoading = false;
                })
        },

        goVerify() {
            this.$router.push({ path: "/VerifyCode" })
        },

        showError(message) {
            this.infoCheckErr = true;
            this.infoCheckTitle = message;
        },

        resetForm() {
            this.userName = "";
            this.nickName = "";
            this.email = "";
            this.phoneNumber = "";
        }
    },
    beforeRouteLeave(to, from, next) {
        this.resetForm();
        next();
    }
}
</script>

<style>

.forgotPasswordBox{
    background: #fff;
    padding:40px;
    max-width:320px;
    margin:0 auto;
    padding-bottom:60;
}

.forgotPasswordTitle{
    text-align: center;
    font-size: 26px;
    padding-top:50px;
    margin-bottom: 20px;
}

.forgorPassword-title{
    position: relative;
    height:32px;
    line-height: 32px;
    margin-bottom: 20px;
}

.forgorPassword-title h1{
    font-size: 24px;
    color:#666;
    font-weight: bold;
}

.forgorPassword-btn{
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

.backHome{
  margin-top: -20px;
  text-align: right;
}

</style>