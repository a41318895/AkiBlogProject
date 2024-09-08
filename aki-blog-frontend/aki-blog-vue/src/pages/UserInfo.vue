<!-- User Information Center -->
<template>
    <div>
        <wbc-nav></wbc-nav>
        <div class="container">
            <div v-show="isEdit" class="tcommonBox">
                <header>
                    <h1>
                            編輯個人資料
                    </h1>
                    
                </header>
                <section>
                    <ul class="userInfoBox">
                        <li class="avatarlist">
                            <span class="leftTitle">大頭貼</span>
                            <el-upload
                              class="avatar-uploader"
                              name="img"
                              :action="uploadURL"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload"
                              :headers="uploadHeaders">
                              <img v-if="userInfoObj.avatar" :src="userInfoObj.avatar ? userInfoObj.avatar : 'static/img/defaultHead.jpg'"  :onerror="$store.state.errorImg" class="avatar">
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                              <div slot="tip" class="el-upload__tip">點擊以上傳大頭貼, 只能上傳jpg/png文件, 且大小不超過2MB</div>
                            </el-upload>
                        </li>
                        <li class="username">
                            <span class="leftTitle">暱稱</span>
                            <el-input v-model="userInfoObj.nickName" placeholder="暱稱"></el-input> <i  class="fa fa-wa fa-asterisk"></i>
                        </li>
                        <li>
                            <span class="leftTitle">電子郵件</span>
                            <el-input v-model="userInfoObj.email" placeholder="電子郵件"></el-input> <i  class="fa fa-wa fa-asterisk"></i>
                        </li>
                        <!-- <li class="username">
                            <span class="leftTitle">密码</span>
                            <el-input v-model="userInfoObj.password" placeholder="密码"></el-input> <i  class="fa fa-wa fa-asterisk"></i>
                        </li> -->
                        <li>
                            <span class="leftTitle">性别</span>
                            <template>
                              <el-radio class="radio" v-model="userInfoObj.sex" label="0">男</el-radio>
                              <el-radio class="radio" v-model="userInfoObj.sex" label="1">女</el-radio>
                            </template>
                        </li>


                    </ul>
                    <div class=" saveInfobtn">
                        <a class="tcolors-bg"  href="javascript:void(0);" @click="cancelEdit">返 回</a>
                        <a class="tcolors-bg" href="javascript:void(0);" @click="saveInfoFun">保 存</a>
                    </div>
                </section>
            </div>
            <div v-show="!isEdit" class="tcommonBox">
                <header>
                    <h1>
                            個人中心
                        <span class="gotoEdit" @click="isEdit = !isEdit"><i class="fa fa-wa fa-edit"></i>編輯</span>
                    </h1>

                </header>
                <section>
                    <ul class="userInfoBox">
                        <li class="avatarlist">
                            <span class="leftTitle">大頭貼</span>
                            <div class="avatar-uploader">
                                <img :src="userInfoObj.avatar ? userInfoObj.avatar : 'static/img/defaultHead.jpg'" :onerror="$store.state.errorImg" class="avatar">
                            </div>
                        </li>
                        <li class="username">
                            <span class="leftTitle">暱稱</span>
                            <span>{{userInfoObj.nickName?userInfoObj.nickName:"無"}}</span>

                        </li>
                        <li>
                            <span class="leftTitle">電子郵件</span>
                            <span>{{userInfoObj.email?userInfoObj.email:"無"}}</span>
                        </li>
                        <!-- <li class="username">
                            <span class="leftTitle">密码</span>
                            <span>{{userInfoObj.password?userInfoObj.password:"无"}}</span>

                        </li> -->
                        <li>
                            <span class="leftTitle">性别</span>
                            <span>{{userInfoObj.sex == 0 ? '男':'女'}}</span>
                        </li>

                     
                    </ul>

                </section>
            </div>
        </div>
    </div>
</template>

<script>
import header from '../components/header.vue'
import {getUserInfo,saveUserInfo} from '../api/user.js'
import store from '../store'
import { getToken } from "../utils/auth.js";

    export default {
        name: 'UserInfo',
        data() { 
            return {
                uploadURL:'',
                isEdit: false,
                userInfo: {}, // Local stored user info
                originalUserInfoObj: '',
                userInfoObj: '',
                uploadHeaders: { token: getToken() } // user info
            }
        },
        methods: { 
            handleAvatarSuccess(res, file) { // upload avatar
                console.log(res)
                if(res.code == 200){
                    this.userInfoObj.avatar = res.data;
                    this.userInfoObj.head_start = 1;
                }else{
                    this.$message.error('上傳圖片失敗');
                }

            },
            beforeAvatarUpload(file) { 
                const isImgValid = file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg'
                const isLargeOver2M = file.size / 1024 / 1024 < 2
                // console.log(file);
                if (!isImgValid) {
                  this.$message.error('上傳大頭貼圖片只能為 JPG/PNG 格式 !')
                }
                if (!isLargeOver2M) {
                  this.$message.error('上傳大頭貼圖片大小不能超過 2MB !')
                }
                return isImgValid && isLargeOver2M
            },

            saveInfoFun: function(){
                var that = this

                if(!that.userInfoObj.nickName){ 
                    that.$message.error('暱稱為必填欄位，請填寫暱稱')
                    return
                }

                saveUserInfo(that.userInfoObj).then((response) => { // The interface that save info, returning show info page
                    that.$message.success('保存成功！')

                    // Call getUserInfo to fetch the latest user info
                    getUserInfo().then((response) => {
                        that.userInfoObj = response; // Update userInfoObj with the latest data
                        that.userInfo = {...that.userInfo, ...that.userInfoObj}; // Optionally update userInfo if needed
                        localStorage.setItem('userInfo', JSON.stringify(that.userInfo)); // Store updated user info
                        that.isEdit = false; // Exit edit mode
                    }).catch((error) => {
                        that.$message.error('獲取最新用戶資料失敗，請重試！');
                        console.error(error);
                    });

                }).catch((error) => {
                    that.$message.error('保存失敗，請重試！');
                    console.error(error);
                });
            },

            routeChange: function() {
                var that = this;
                if (localStorage.getItem('userInfo')) {
                    that.haslogin = true;
                    try {
                        that.userInfo = JSON.parse(localStorage.getItem('userInfo'))
                        that.userId = that.userInfo.id;
                        getUserInfo().then((response) => {
                            that.userInfoObj = response
                            this.originalUserInfoObj = JSON.parse(JSON.stringify(response))
                            that.userInfoObj.head_start = 0
                        });
                    } catch (error) {
                        console.error('Error parsing userInfo from localStorage:', error)
                    }
                } else {
                    that.haslogin = false;
                }
            },
            cancelEdit() {
                this.userInfoObj = JSON.parse(JSON.stringify(this.originalUserInfoObj)); // Restore original info
                this.isEdit = false; // Exit edit mode
            }
        },
        components: { 
            'wbc-nav':header,
        },
        watch: {
           // If router changes, execute the method again
           '$route':'routeChange'
        },
        created() { // Life circle function
            this.routeChange();
            this.uploadURL = store.state.baseURL+'upload'
        }
    }
</script>

<style>
.userInfoBox .avatarlist{
    position: relative;
}

.avatar-uploader {
    display: inline-block;
    vertical-align: top;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 120px;
    height: 120px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    position: absolute;
    top:0;
    left:0;
  }
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: block;
    object-fit: cover;
  }
.gotoEdit{
    font-size: 15px;
    float:right;
    cursor: pointer;
    color:#999;
}
.gotoEdit:hover {
    color:#333;
}
/* User Individual Setting */
.userInfoBox .leftTitle{
    display: inline-block;
    width:100px;
    padding: 10px 0;
}
.userInfoBox .rightInner{
    display: inline-block;
    max-width: calc(100% - 140px);
    vertical-align: top;
}
.userInfoBox li{
    padding:20px;
    border-bottom: 1px solid #ddd;
}
.userInfoBox li:last-child{
    border-bottom: 1px solid transparent;
}
.userInfoBox  .el-input,.userInfoBox  .el-textarea{
    max-width:300px;
    min-width: 100px;
}

.userInfoBox .el-input__inner{
    border-radius: 4px;
}
.userInfoBox  .el-textarea{
    vertical-align: top;
}
.saveInfobtn{
    margin: 20px 0;
    text-align: center;
}
.saveInfobtn a{
    color:#fff;
    padding:6px 20px;
    margin:5px 10px;
    border-radius: 5px;
    font-size: 14px;
}
.userInfoBox .fa-asterisk{
    color: #DF2050;
}
</style>
