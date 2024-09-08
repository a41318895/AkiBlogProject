import auth from './auth'
import cache from './cache'
import modal from './modal'

export default {
  install(Vue) {
    // 認證對象 
    Vue.prototype.$auth = auth
    // 緩存對象
    Vue.prototype.$cache = cache
    // 互動框對象
    Vue.prototype.$modal = modal
  }
}
