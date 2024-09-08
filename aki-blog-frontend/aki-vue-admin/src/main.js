import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import locale from 'element-ui/lib/locale/lang/zh-TW' // 引入繁體中文語言包
import directive from './directive' // directive
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import plugins from './plugins' // plugins
import './assets/icons' // icon
import '@/permission' // permission control
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from '@/utils/sg'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// Global methods
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.handleTree = handleTree
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(directive)
Vue.use(ElementUI, { locale })
Vue.use(plugins)
Vue.use(mavonEditor)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

