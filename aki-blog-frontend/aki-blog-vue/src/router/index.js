import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
	scrollBehavior(to, from, savePosition) { // If click Back / Front or change nav, it triggered。
		if (savePosition) {
			return savePosition;
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	},
	routes: [{
			path: '/',
			component: resolve => require(['../pages/Home.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'InitializedHome'
		},
		{
			path: '/Home',
			component: resolve => require(['../pages/Home.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'Home',
		},
		{
			path: '/Share',
			component: resolve => require(['../pages/Share.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'Share'
		}, // Category
		{
			path: '/DetailArticle',
			component: resolve => require(['../pages/DetailArticle.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'DetailArticle'
		}, // Share detail
		{
			path: '/Reward',
			component: resolve => require(['../pages/Reward.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'Reward',
		}, // Donation
		{
			path: '/FriendsLink',
			component: resolve => require(['../pages/FriendsLink.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'FriendsLink'
		}, // Friend Link


		{
			path: '/Login',
			component: resolve => require(['../pages/Login.vue'], resolve),
			meta: {
				auth: false
			},
			name: 'Login'
		}, // Login & Register

		{
			path: '/ForgotPassword',
			component: resolve => require(['../pages/ForgotPassword.vue'], resolve),
			meta: {
				auth: false
			},
			name: 'ForgorPassword'
		}, // Forgot Password

		{
			path: '/VerifyCode',
			component: resolve => require(['../pages/VerifyCode.vue'], resolve),
			meta: {
				auth: false
			},
			name: 'VerifyCode'
		}, // Verify Verification Code

		{
			path: '/ResetPassword',
			component: resolve => require(['../pages/ResetPassword.vue'], resolve),
			meta: {
				auth: false
			},
			name: 'ResetPassword'
		}, // Reset password

		{
			path: '/UserInfo',
			component: resolve => require(['../pages/UserInfo.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'UserInfo'
		}, // User Information Center

	]
})
