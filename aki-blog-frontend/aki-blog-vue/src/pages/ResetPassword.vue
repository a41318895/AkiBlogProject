<template>
    <div class="container">
        <h1 class="resetPasswordTitle"></h1>
        <div class="resetPasswordBox">
            <div class="resetPassword-title">
                <h1>【3/3】重設密碼</h1>
            </div>
            <el-alert 
                v-show="resetPasswordCheckErr" 
                v-html="resetPasswordCheckTitle" 
                :title="resetPasswordCheckTitle" 
                type="error" 
                show-icon 
                :closable="false">
            </el-alert>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="用戶名" prop="userName">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="新密碼" prop="newPassword">
                    <el-input type="password" v-model="form.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="再次輸入" prop="newPasswordRe">
                    <el-input type="password" v-model="form.newPasswordRe"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button 
                        class="resetPassword-btn tcolors-bg"
                        type="primary" 
                        @click="resetPasswordCheck" 
                        v-loading.fullscreen.lock="fullscreenLoading" 
                        element-loading-text="提交資料中...">送出新資料
                    </el-button>
                </el-form-item>
            </el-form>
            <div class="navigation-links">
                <a href="#/ForgotPassword" class="tcolors">回到步驟一</a>
                <a href="#/" class="tcolors">返回首頁</a>
            </div>
        </div>
    </div>
</template>

<script>
import { resetPassword } from "../api/user.js";

export default {
    data() {
        return {
            form: {
                userName: "",
                newPassword: "",
                newPasswordRe: ""
            },
            rules: {
                userName: [{ required: true, message: "請輸入用戶名", trigger: "blur" }],
                newPassword: [
                    { required: true, message: "請輸入新密碼", trigger: "blur" },
                    { pattern: /^(\w){6,12}$/, message: "密碼長度需在6到12之間", trigger: "blur" }
                ],
                newPasswordRe: [
                    { required: true, message: "請再次輸入新密碼", trigger: "blur" },
                    { validator: (rule, value, callback) => {
                        if (value !== this.form.newPassword) {
                            callback(new Error("兩次輸入密碼不一致"));
                        } else {
                            callback();
                        }
                    }, trigger: "blur" }
                ]
            },
            fullscreenLoading: false,
            resetPasswordChecked: false,
            resetPasswordCheckErr: false,
            resetPasswordCheckTitle: "",
            verificationCode: this.$route.query.vcode || ""
        }
    },
    methods: {
        resetPasswordCheck() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.fullscreenLoading = true;
                    const resetInfo = {
                        userName: this.form.userName,
                        newPassword: this.form.newPassword,
                        verificationCode: this.verificationCode
                    }
                    resetPassword(resetInfo)
                        .then((response) => {
                            this.resetPasswordChecked = true;
                            if (this.resetPasswordChecked) {
                                this.goLogin()
                            }
                        })
                        .catch((error) => {
                            this.showError("重設密碼失敗,<br/>請稍後再試...");
                        })
                        .finally(() => {
                            this.fullscreenLoading = false;
                        });
                }
            });
        },

        goLogin() {
            this.$router.push({ path: "/Login?login=1" });
        },

        showError(message) {
            this.resetPasswordCheckErr = true;
            this.resetPasswordCheckTitle = message;
        },

        resetForm() {
            this.form.userName = ""
            this.form.newPassword = ""
            this.form.newPasswordRe = ""
            this.verificationCode = ""
        }
    },
    beforeRouteLeave(to, from, next) {
        this.resetForm();
        next();
    }
}
</script>

<style>

.resetPasswordBox{
    background: #fff;
    padding:40px;
    max-width:320px;
    margin:0 auto;
    padding-bottom:60;
}

.resetPasswordTitle{
    text-align: center;
    font-size: 26px;
    padding-top:50px;
    margin-bottom: 20px;
}

.resetPassword-title{
    position: relative;
    height:32px;
    line-height: 32px;
    margin-bottom: 20px;
}

.resetPassword-title h1{
    font-size: 24px;
    color:#666;
    font-weight: bold;
}

.resetPassword-btn{
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
  margin-top: -10px;
}

</style>