import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 創建axios實例
const downloadService = axios.create({
  // axios baseURL : 表示req URL 之公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  responseType: 'blob'
})

// Request interceptor
downloadService.interceptors.request.use(config => {
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
downloadService.interceptors.response.use(res => {
  console.log(res)
  if (!res.data) {
    return
  }
  var blob = new Blob([res.data])
  const contentDisposition = res.headers['content-disposition']
  var fileName = 'test'
  if (contentDisposition) {
    fileName = window.decodeURI(res.headers['content-disposition'].split('=')[1], 'UTF-8')
  }
  var url = window.URL.createObjectURL(blob)
  var aLink = document.createElement('a')
  aLink.style.display = 'none'
  aLink.href = url
  aLink.setAttribute('download', fileName)
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink) // 下載完成移除元素
  window.URL.revokeObjectURL(url) // 釋放blob對象
},
error => {
  console.log('err' + error)
  let { message } = error
  if (message === 'Network Error') {
    message = '後端連接異常'
  } else if (message.includes('timeout')) {
    message = '系統請求超時'
  } else if (message.includes('Request failed with status code')) {
    message = '系統' + message.substr(message.length - 3) + '異常'
  }
  Message({
    message: message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)

export default downloadService

