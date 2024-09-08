import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 創建axios實例
const service = axios.create({
  // axios baseURL : 表示req URL 之公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超時
  timeout: 10000
})
// Request interceptor
service.interceptors.request.use(config => {
  // 是否需要設置 token
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    config.headers['token'] = getToken() // 讓每個req攜帶custom token
  }
  // get req 映射 params
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

// Response interceptor
service.interceptors.response.use(res => {
  // 未設置status code 默認 200 success
  const code = res.data.code || 200
  // 獲取錯誤訊息
  const msg = errorCode[code] || res.data.msg || errorCode['default']
  if (code === 401) {
    MessageBox.confirm('登入狀態已經過期，您可以繼續留在該頁面，或者也可以重新登入', '系統提示', {
      confirmButtonText: '重新登入',
      cancelButtonText: '取消',
      type: 'warning'
    }
    ).then(() => {
      store.dispatch('FedLogOut').then(() => {
        location.href = '/index'
      })
    }).catch(() => { })
    return Promise.reject('無效的工作階段，或者工作階段已經過期，請您重新登入。')
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
    message = '系統請求超時'
  } else if (message.includes('failed with status code 500')) {
    message = '系統異常'
  } else if (message.includes('400')) {
    message = '請求參數錯誤'
  } else if (message.includes('405')) {
    message = '請求方法錯誤'
  } else if (message.includes('401')) {
    message = '身分驗證錯誤'
  } else if (message.includes('Request failed with status code')) {
    message = 'Please take a look of web logs...'
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
