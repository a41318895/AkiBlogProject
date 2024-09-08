import request from '@/utils/request'

// 登入
export function login(userName, password, code, uuid) {
  const data = {
    userName,
    password,
    code,
    uuid
  }
  return request({
    url: '/user/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 註冊帳號
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 獲取當前用戶詳細
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 登出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 獲取驗證碼
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}
