import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import router from '@/router'
import store from '../store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'


// 創建axios 實例
const service = axios.create({
  // axios中請求配有baseURL選項，表示請求URL公共的部分
  baseURL: store.state.baseURL,
  // 超時
  timeout: 10000
})

// request 攔截器
service.interceptors.request.use(config => {
  // 是否需要設置 token
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    config.headers['token'] = getToken() // 使每個請求攜帶 defined token
  }
  // get請求映射params
  if (config.method === 'get' && config.params) {
    let url = config.url + '?'
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName]
      var part = encodeURIComponent(propName) + '='
      if (value !== null && typeof (value) !== 'undefined') {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            if (value[key] !== null && typeof (value[key]) !== 'undefined') {
              const params = propName + '[' + key + ']'
              const subPart = encodeURIComponent(params) + '='
              url += subPart + encodeURIComponent(value[key]) + '&'
            }
          }
        } else {
          url += part + encodeURIComponent(value) + '&'
        }
      }
    }
    url = url.slice(0, -1)
    config.params = {}
    config.url = url
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// response 攔截器
service.interceptors.response.use(res => {
  // 未設置 status code 則默認success
  const code = res.data.code || 200
  // Getting error msg
  const msg = errorCode[code] || res.data.msg || errorCode['default']
  if (code === 401) {
    MessageBox.confirm('需要登入才能訪問', 'biu~', {
      confirmButtonText: '重新登入',
      type: 'warning'
    }
    ).then(() => {

      localStorage.setItem('logUrl', router.currentRoute.fullPath);
      router.push({
        path: '/Login?login=1'
      });

    }).catch(() => { })
    return Promise.reject('無效的工作階段，或工作階段已經過期，請重新登入。')
  } else if (code === 500) {
    Message({
      message: msg,
      type: 'error'
    })
    return Promise.reject(new Error(msg))
  } else if (code !== 200) {
    Notification.error({
      title: msg
    })
    return Promise.reject('error')
  } else {
    // Make string total number total
    if (res.data.data && res.data.data.total) {
      res.data.data.total = parseInt(res.data.data.total)
    }
    return res.data.data
  }
},
  error => {
    console.log('err' + error)
    let { message } = error
    if (message === 'Network Error') {
      message = '網路異常'
    } else if (message.includes('timeout')) {
      message = '系統interface請求超時'
    } else if (message.includes('failed with status code 500')) {
      message = '系統interface異常'
    } else if (message.includes('400')) {
      message = '請求參數錯誤'
    } else if (message.includes('405')) {
      message = '請求方法錯誤'
    } else if (message.includes('401')) {
      message = '身分驗證錯誤'
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
