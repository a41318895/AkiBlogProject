<template>
  <div>
    <div class="container">
      <h1 class="loginTitle"></h1>
      <div>
        <div v-if="login === 1" class="loginBox">
          <div class="lr-title">
            <h1>登入</h1>
            <p>
              新用戶<a href="#/Login?login=0" class="tcolors">註冊</a>
            </p>
          </div>
          <el-alert
            v-show="loginErr"
            :title="loginTitle"
            type="error"
            show-icon
            :closable="false"
          ></el-alert>
          <form @submit.prevent="gotoHome">
            <el-input type="text" placeholder="用戶名" v-model="username"></el-input>
            <el-input
              type="password"
              placeholder="密碼"
              @keyup.enter.native="gotoHome"
              v-model="password"
            ></el-input>
            <h3><a href="#/ForgotPassword">忘記密碼？</a></h3>
            <div class="lr-btn tcolors-bg" @click="gotoHome">登入</div>
          </form>
          <div class="backHome">
            <a href="#/" class="tcolors">返回首頁</a>
          </div>
        </div>
        <div v-else class="registerBox">
          <div class="lr-title">
            <h1>註冊</h1>
            <p>
              已有帳號 ?<a href="#/Login?login=1" class="tcolors">登入</a>
            </p>
          </div>
          <el-alert
            v-show="registerErr"
            :title="registerTitle"
            type="error"
            show-icon
            :closable="false"
          ></el-alert>
          <form @submit.prevent="newRegister">
            <el-input
              type="text"
              placeholder="用戶名稱"
              v-model="nusername"
            ></el-input>
            <el-input
              type="text"
              placeholder="暱稱"
              v-model="nnickName"
            ></el-input>
            <el-input
              type="text"
              placeholder="手機號碼"
              v-model="phoneNumber"
              :class="{ 'input-error': phoneNumberErr }"
            ></el-input>
            <el-input
              type="email"
              placeholder="電子郵件"
              v-model="nemail"
            ></el-input>
            <el-input
              type="password"
              placeholder="密碼: 6-12位英文、数字、底線"
              v-model="npassword"
            ></el-input>
            <el-input
              type="password"
              placeholder="確認密碼"
              @keyup.enter.native="newRegister"
              v-model="npassword2"
            ></el-input>
            <div
              class="lr-btn tcolors-bg"
              @click="newRegister"
              v-loading.fullscreen.lock="fullscreenLoading"
              element-loading-text="提交資料中..."
            >
              註冊
            </div>
          </form>
          <div class="backHome">
            <a href="#/" class="tcolors">返回首頁</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin, userRegister } from "../api/user.js";
import { setToken } from "../utils/auth.js";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      nusername: "",
      nemail: "",
      nnickName: "",
      npassword: "",
      npassword2: "",
      phoneNumber: "",
      login: 0,
      loginErr: false,
      loginTitle: "用戶名稱或密碼錯誤",
      nusernameErr: false,
      nemailErr: false,
      npasswordErr: false,
      npassword2Err: false,
      registerErr: false,
      registerTitle: "該電子郵件已經被註冊過了",
      step: 1,
      fullscreenLoading: false,
      urlstate: 0,
      phoneNumberErr: false,
    };
  },
  methods: {
    // 新增方法 setLogin
    setLogin(status) {
      this.login = status;
      localStorage.setItem('logUrl', this.$route.fullPath);
      this.$router.push({ path: '/Login', query: { login: status } });
    },
    routeChange() {
      var that = this;
      that.login =
        that.$route.query.login == undefined
          ? 1
          : parseInt(that.$route.query.login); // Getting sent parameter's login
      that.urlstate =
        that.$route.query.urlstate == undefined
          ? 0
          : that.$route.query.urlstate; // Getting sent parameter's urlstate status code
    },
    gotoHome() {
      userLogin(this.username, this.password)
        .then((response) => {
          setToken(response.token);
          localStorage.setItem("userInfo", JSON.stringify(response.userInfo));
          if (localStorage.getItem("logUrl")) {
            this.$router.push({ path: localStorage.getItem("logUrl") });
          } else {
            this.$router.push({ path: "/" });
          }
        })
        .catch((error) => {
          this.loginErr = true;
          this.loginTitle = "使用者名稱或密碼錯誤";
        });
    },
    newRegister() {
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      const preg = /^(\w){6,12}$/;
      const phoneRegex = /^09\d{8}$/;

      this.nusernameErr = !this.nusername;
      this.nemailErr = !reg.test(this.nemail);
      this.npasswordErr = !(this.npassword && preg.test(this.npassword));
      this.npassword2Err = this.npassword !== this.npassword2;
      this.phoneNumberErr = !phoneRegex.test(this.phoneNumber);

      if (
        !this.nusernameErr &&
        !this.nemailErr &&
        !this.npasswordErr &&
        !this.npassword2Err &&
        !this.phoneNumberErr
      ) {
        this.fullscreenLoading = true;

        const userData = {
          userName: this.nusername,
          nickName: this.nnickName,
          phoneNumber: this.phoneNumber,
          email: this.nemail,
          password: this.npassword
        };

        userRegister(userData)
          .then((response) => {
            this.goLogin();
          })
          .catch((error) => {
            this.registerErr = true;
            this.registerTitle = "註冊失敗，請重新嘗試";
            this.fullscreenLoading = false;
          });
      }
    },
    goLogin() {
      this.$router.push({ path: "/Login?login=1" });
    },
    goRegister() {
      this.$router.push({ path: "/Login?login=0" });
    },
  },
  watch: {
    $route: "routeChange",
  },
  created() {
    this.routeChange();
  },
};
</script>

<style>
.loginTitle{
    text-align: center;
    font-size: 26px;
    padding-top:50px;
    margin-bottom: 20px;
}
.loginBox ,.registerBox{
    background: #fff;
    padding:40px;
    max-width:320px;
    margin:0 auto;
}
.loginBox{
    padding-bottom:60;
}
.lr-title{
    position: relative;
    height:32px;
    line-height: 32px;
    margin-bottom: 20px;
}
.lr-title h1{
    font-size: 24px;
    color:#666;
    font-weight: bold;
    /*width:50%;*/
}
.lr-title p{
    font-size: 12px;
    color:#999;
    position: absolute;
    right:0;
    top:0;
}
.lr-btn{
    color:#fff;
    text-align: center;
    letter-spacing: 5px;
    padding:8px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 30px;
}
.loginBox .el-input,.registerBox .el-input{
    margin-bottom: 20px;
}
.loginBox .el-alert ,.registerBox .el-alert{
    top:-18px;
    background-color: #888;
}
.loginBox .el-input input,.registerBox .el-input input{
    border-radius: 4px;
}
.loginBox h3,.registerBox h3{
    text-align: right;
    margin-bottom: 20px;
}
.loginBox h3 a,.registerBox h3 a{
    font-size: 13px;
    color:#999;
}
.loginBox .otherLogin{
    max-width:320px;
    padding:30px 40px;
    background: #ddd;
    text-align: center;
    margin-left:-40px;
    margin-right: -40px;
    visibility: hidden;
}
.loginBox .otherLogin p{
    margin-bottom:20px;
    font-size: 16px;
}
.loginBox .otherLogin a i{
    display: inline-block;
    width: 42px;
    height: 42px;
    line-height: 42px;
    font-size: 18px;
    border-radius: 50%;
    color:#fff;
    margin: 0 10px;
}
.loginBox .otherLogin a i.fa-wechat{
    background: #7bc549;
}
.loginBox .otherLogin a i.fa-qq{
    background: #56b6e7;
}
.loginBox .otherLogin a i.fa-weibo{
    background: #ff763b;
}

/* Login Success */
.registerSuc{
    padding: 40px;
    margin: 0 auto;
}
.registerSuc .sucIcon{
    text-align: center;
    margin-bottom: 30px;
    padding-left:60px;
}
.registerSuc .sucContent{
    line-height: 1.5;
    font-size: 15px;
    text-align: center;
}
.registerSuc .sucContent p{
    margin-top: 10px;
    font-size: 13px;
    color: #999;
}
.registerSuc .sucContent .lastbtn{
    display: inline-block;
    font-size: 14px;
    padding: 3px 10px;
    border-radius: 5px;
    color:#fff;
    cursor: pointer;
}
.registerSuc .sucContent  .el-icon-close{
    font-size: 13px;
}
.backHome{
  margin-top: -20px;
  text-align: left;
}
</style>
