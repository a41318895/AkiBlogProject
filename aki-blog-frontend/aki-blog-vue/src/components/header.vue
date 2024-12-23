<!-- Public Header -->
<template>
<div class="">
	<div class="headBack">
		<el-row class="container">
			<el-col :span="24">
				<!-- PC Navigation -->
				<div class="headBox">
					<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
						<el-menu-item index="/Home"><i class="fa fa-wa fa-home"></i> 首頁</el-menu-item>
						<el-submenu index="/Share">
							<template slot="title"><i class="fa fa-wa fa-archive"></i> 文章分類</template>
							<el-menu-item v-for="(item,index) in classListObj" :key="'class1'+index" :index="'/Share?classId='+item.id">{{item.name}}</el-menu-item>
						</el-submenu>
						<!-- <el-menu-item index="/Reward"><i class="fa fa-donate"></i> 贊助</el-menu-item> -->
						<el-menu-item index="/Friendslink"><i class="fa fa-wa fa-users"></i>友情連結</el-menu-item>

						<div class="userInfo">
							<div v-show="!haslogin" class="nologin">
								<el-menu-item index="/Login?login=1" @click="loginFun(1)">
									<i class="fa fa-fw fa-user-circle userImg"></i> 登入
								</el-menu-item>
								<el-menu-item index="/Login?login=0" @click="loginFun(0)">
									<i class="fas fa-user-plus">註冊</i>
								</el-menu-item>
							</div>
							<div v-show="haslogin" class="haslogin">
								<i class="fa fa-fw fa-user-circle userImg"></i>
								<ul class="haslogin-info">
									<li>
										<a href="#/UserInfo">個人中心</a>
									</li>
									<li>
										<a href="javascript:void(0);" @click="userlogout">退出登入</a>
									</li>
								</ul>
							</div>
						</div>
					</el-menu>
				</div>
			</el-col>
		</el-row>
	</div>
	<div class="headImgBox" :style="{backgroundImage:this.$store.state.themeObj.top_image?'url('+this.$store.state.themeObj.top_image+')':'url(static/img/headerBackgroundImage.jpg)'}">
		<div class="scene">
			<div><span id="luke"></span></div>
		</div>
		<div class="h-information">
			<img :src="this.$store.state.themeObj.head_portrait?this.$store.state.themeObj.head_portrait:'static/img/userHead.jpg'" alt="">
			<h2 class="">{{this.$store.state.themeObj.autograph?this.$store.state.themeObj.autograph:"所詮、肝心なところで頼りになるのは、自分だけである。"}}</h2>
		</div>
	</div>
</div>
</template>
<script>
import {logout} from '../api/user'
import {removeToken} from '../utils/auth'
import {getCategoryList} from '../api/category'
import {
	Typeit
} from '../utils/plug.js'
export default {
	data() {
		return {
			userInfo: '', // User Information
			haslogin: false, // Is Login
			classListObj: '', // Category List
			activeIndex: '/', // Current Selected Router Module
			state: '', // Icon Click Status
			pMenu: true, // Menu in Mobile
			input: '', // Input Content
			headBg: 'url(static/img/headbg05.jpg)', // Header Background img
			headTou: '', // User Image
			projectList: '' // Project List
		}
	},
	watch: {

	},
	methods: { // Event Handler
		handleOpen(key, keyPath) { // Open Grouped Menu
			// console.log(key, keyPath);
		},
		handleClose(key, keyPath) { // Close Grouped Menu
			// console.log(key, keyPath);
		},
		searchChangeFun(e) { // Input Change Event
			// console.log(e)
			if (this.input == '') {
				this.$store.state.keywords = '';
				this.$router.push({path:'/'});
			}
		},
		getCategoryList(){
			getCategoryList().then((response)=>{
				this.classListObj = response
			})
		},
		handleSelect(key, keyPath) { // PC Menu Choose 
			//    console.log(key, keyPath);
		},
		loginFun: function(msg) { // User Login and Register Jump back
			localStorage.setItem('logUrl', this.$route.fullPath);
			if (msg === 0) {
				this.$router.push('/Login?login=0');
			} else {
				this.$router.push('/Login?login=1');
			}
		},
		// 使用者退出登入
		userlogout: function() {
			var that = this;
			this.$confirm('是否確認退出登入 ?', '退出登入提示', {
				confirmButtonText: '確定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				logout().then((response)=>{
					removeToken()
					localStorage.removeItem('userInfo');
					that.haslogin = false;	
					if (that.$route.path === '/UserInfo') {
                		that.$router.push('/Home').then(() => {
                    	// 跳轉成功後刷新頁面
                   		window.location.reload();
							that.$message({
								type: 'success',
								message: '退出登入成功 !'
							});
                		});
            		} else {
                	// 如果當前不在'/UserInfo'之頁面，直接刷新頁面
                		window.location.reload();
                		that.$message({
                    		type: 'success',
                    		message: '退出登入成功 !'
                		});
            		}
        		});
			}).catch(() => {
				
			});
		},
		routeChange: function() {
			this.login = this.$route.query.login === undefined ? 0 : parseInt(this.$route.query.login)
			var that = this
			that.pMenu = true
			this.activeIndex = this.$route.path === '/' ? '/Home' : this.$route.path
			if (localStorage.getItem('userInfo')) { // 儲存使用者訊息
				that.haslogin = true
				that.userInfo = JSON.parse(localStorage.getItem('userInfo'))
			} else {
				that.haslogin = false
			}
			// 獲取分類列表
			this.getCategoryList()

			if ((this.$route.name == "Share" || this.$route.name == "Home") && this.$store.state.keywords) {
				this.input = this.$store.state.keywords;
			} else {
				this.input = '';
				this.$store.state.keywords = '';
			}
		}
	},
	components: { // Component Definition

	},
	watch: {
		// If router changes, execute the method again
		'$route': 'routeChange'
	},
	created() { // Life Circle Function
		// To judge current page isHiden
		var that = this;
		var hiddenProperty = 'hidden' in document ? 'hidden' :
			'webkitHidden' in document ? 'webkitHidden' :
			'mozHidden' in document ? 'mozHidden' :
			null;
		var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
		var onVisibilityChange = function() {
			if (!document[hiddenProperty]) { // Hiden
				if (that.$route.path != '/DetailShare') {
					if (localStorage.getItem('userInfo')) {
						that.haslogin = true;
					} else {
						that.haslogin = false;
					}
				}
			}
		}
		document.addEventListener(visibilityChangeEvent, onVisibilityChange);
		this.routeChange();
	},
	mounted() { // Page Elements Loading finishsd
		var that = this;
		var timer = setTimeout(function() {
			Typeit(that.$store.state.themeObj.user_start, "#luke"); // Typing machine effect
			clearTimeout(timer);
		}, 500);
	}
}
</script>

<style>

/********* Header Nav Column ********/
.headBack {
	width: 100%;
	background: rgba(40, 42, 44, 0.6);
	/*margin-bottom:30px;*/
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	z-index: 100;
}

.headBox li.is-active {
	/*background: #48456C;*/
	background: rgba(73, 69, 107, 0.7);
}

.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
	border-bottom: none!important;
}

.headBox .el-menu {
	background: transparent;
	border-bottom: none!important;
}

.headBox .el-menu-demo li.el-menu-item,
.headBox .el-menu--horizontal .el-submenu .el-submenu__title {
	height: 38px;
	line-height: 38px;
	border-bottom: none!important;

}

.headBox .el-submenu li.el-menu-item {
	height: 38px;
	line-height: 38px;
}

.headBox li .fa-wa {
	vertical-align: baseline;
}

.headBox ul li.el-menu-item,
.headBox ul li.el-menu-item.is-active,
.headBox ul li.el-menu-item:hover,
.headBox .el-submenu div.el-submenu__title,
.headBox .el-submenu__title i.el-submenu__icon-arrow {
	color: #fff;
}

.headBox .el-menu--horizontal .el-submenu>.el-menu {
	top: 38px;
	border: none;
	padding: 0;
}

.headBox>ul li.el-menu-item:hover,
.headBox>ul li.el-submenu:hover .el-submenu__title {
	background: #48456C;
	border-bottom: none;
}

.headBox>ul .el-submenu .el-menu,
.headBox>ul .el-submenu .el-menu .el-menu-item {
	background: #48456C;
}

.headBox>ul .el-submenu .el-menu .el-menu-item {
	min-width: 0;
}

.headBox>ul .el-submenu .el-menu .el-menu-item:hover {
	background: #64609E;
}

/* PC search block */

.headBox .pcsearchbox {
	padding: 0;
	max-width: 170px;
	/*min-width: 30px;*/
	height: 100%;
	line-height: 38px;
	position: absolute;
	top: 0;
	right: 0;
	cursor: pointer;
}

.headBox .pcsearchbox:hover .pcsearchinput {
	opacity: 1;
	/*transform: scaleX(1);*/
	visibility: visible;
}

.headBox .pcsearchbox i.pcsearchicon {
	color: #fff;
	padding-left: 10px;
}

.headBox .pcsearchbox .pcsearchinput {
	width: 180px;
	padding: 10px 20px 10px 20px;
	background: rgba(40, 42, 44, 0.6);
	border-radius: 0 0 2px 2px;
	position: absolute;
	right: 0;
	top: 38px;
	opacity: 0;
	visibility: hidden;
	/*transform: scaleX(0);*/
	transform-origin: right;
	transition: all 0.3s ease-out;
}

.headBox .pcsearchbox .hasSearched {
	opacity: 1;
	/*transform: scaleX(1);*/
	visibility: visible;
}

.headBox .pcsearchbox .el-input {
	width: 100%;
}

.headBox .el-input__inner {
	height: 30px;
	border: none;
	background: #fff;
	/*border: 1px solid #333;*/
	border-radius: 2px;
	padding-right: 10px;
}

.headBox .userInfo {
	height: 100%;
	line-height: 38px;
	position: absolute;
	right: 30px;
	top: 0;
	color: #fff;
}

.headBox .userInfo a {
	color: #fff;
	font-size: 13px;
	transition: all 0.2s ease-out;
}

.headBox .userInfo a:hover {
	color: #48456C;
}

.headBox .nologin {
	text-align: right;
}

.headBox .haslogin {
	text-align: right;
	position: relative;
	min-width: 80px;
	cursor: pointer;
}

.headBox .haslogin:hover ul {
	visibility: visible;
	opacity: 1;
}

.headBox .haslogin ul {
	background: rgba(40, 42, 44, 0.6);
	padding: 5px 10px;
	position: absolute;
	right: 0;
	visibility: hidden;
	opacity: 0;
	transition: all 0.3s ease-out;
}

.headBox .haslogin ul li {
	border-bottom: 1px solid #48456C;
}

.headBox .haslogin ul li:last-child {
	border-bottom: 1px solid transparent;
}

/******* Mobile search block *******/

.mobileBox {
	position: relative;
	height: 38px;
	line-height: 38px;
	color: #fff;
}

.hideMenu {
	position: relative;
	width: 100%;
	height: 100%;
	line-height: 38px;
}

.hideMenu ul.mlistmenu {
	width: 100%;
	position: absolute;
	left: 0;
	top: 100%;
	box-sizing: border-box;
	z-index: 999;
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12), 0 0 8px 0 rgba(0, 0, 0, .04);
	background: #48456C;
	color: #fff;
	border-right: none;
}

.hideMenu .el-submenu .el-menu {
	background: #64609E;
}

.hideMenu .el-menu-item,
.hideMenu .el-submenu__title {
	color: #fff;
}

.hideMenu>i {
	position: absolute;
	left: 10px;
	top: 12px;
	width: 30px;
	height: 30px;
	font-size: 16px;
	color: #fff;
	cursor: pointer;
}

.hideMenu .el-menu-item,
.el-submenu__title {
	height: 40px;
	line-height: 40px;
}

.mobileBox .searchBox {
	padding-left: 40px;
	width: 100%;
	box-sizing: border-box;
}

.mobileBox .searchBox .el-input__inner {
	display: block;
	border-radius: 2px;
	border: none;
	height: 25px;
}

.hideMenu ul.mlistmenu.pshow {
	display: block;
}

.hideMenu ul.mlistmenu .el-submenu__icon-arrow,
.mobileBox li.el-menu-item a {
	color: #fff;
}

.hideMenu>ul li.el-menu-item:hover,
.hideMenu>ul li.el-menu-item.is-active {
	background: #48576a;
}



/* Header background image */

.headImgBox {
	height: 650px;
	position: relative;
	width: 100%;
	background-size: cover;
	background-position: center 50%;
	background-repeat: no-repeat;
	margin-bottom: 90px;
}

.h-information {
	text-align: center;
	width: 70%;
	margin: auto;
	position: relative;
	top: 300px;
	padding: 40px 0;
	font-size: 20px;
	opacity: 0.70;
	background: rgba(230, 244, 249, 0.8);
	border-radius: 5px;
	z-index: 1;
	animation: b 1s ease-out;
	-webkit-animation: b 1s ease-out;
}

@-webkit-keyframes b {
	0% {
		-webkit-transform: translateY(90px);
		transform: translateY(90px);
	}
	80% {
		-webkit-transform: translateY(5px);
		transform: translateY(5px)
	}
	90% {
		-webkit-transform: translateY(-5px);
		transform: translateY(-5px)
	}
	to {
		-webkit-transform: translateY(0);
		transform: translateY(0)
	}
}

@keyframes b {
	0% {
		-webkit-transform: translateY(90px);
		transform: translateY(90px);
	}
	80% {
		-webkit-transform: translateY(5px);
		transform: translateY(5px)
	}
	90% {
		-webkit-transform: translateY(-5px);
		transform: translateY(-5px)
	}
	to {
		-webkit-transform: translateY(0);
		transform: translateY(0)
	}
}

.h-information img {
	width: 100px;
	height: 100px;
	border-radius: 100%;
	transition: all .4s ease-in-out;
	-webkit-transition: all .4s ease-in-out;
	object-fit: cover;
}

.h-information img:hover {
	transform: rotate(360deg);
	-webkit-transform: rotate(360deg);
}

.h-information h2 {
	margin-top: 20px;
	font-size: 18px;
	font-weight: 700;
	/*font-family: 'Sigmar One';*/
}
.h-information h2 a{
	background: linear-gradient(to right, #DF2050, #48456D);
	background-clip: text;
	color: transparent;
}
.headImgBox .scene {
	width: 100%;
	/*height:300px;*/
	text-align: center;
	font-size: 100px;
	font-weight: 200;
	color: #fff;
	position: absolute;
	left: 0;
	top: 160px;
	font-family: 'Sigmar One', Arial;
	text-shadow: 0 2px 2px #47456d;

}

.headImgBox .scene span {
	transform: matrix(1, 0, 0, 1, 0, 0);
	-webkit-transform: matrix(1, 0, 0, 1, 0, 0);
	text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
}

.saying:after {
	content: "|";
	font-family: Arial, sans-serif;
	font-size: 1em;
	/*line-height: 0;*/
	display: inline-block;
	vertical-align: baseline;
	opacity: 1;
	text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
	animation: caret 500ms infinite;
}

@keyframes caret {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
}
</style>
