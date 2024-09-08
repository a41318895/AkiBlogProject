import Vue from 'vue'
import Vuex from 'vuex'
// import * as getters from './getters.js'

Vue.use(Vuex)

/** Status Definition */
export const state = {
  loading: false,
  themeObj: 0, // Subject
  keywords:'', 
  errorImg: 'this.onerror=null;this.src="' + require('../../static/img/defaultHead.jpg') + '"',
  baseURL:'http://localhost:7777/' //localhost
}

export default new Vuex.Store({
    state,
})
