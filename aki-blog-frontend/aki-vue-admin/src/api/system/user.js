import request from '@/utils/request'
import { praseStrEmpty } from '@/utils/sg'
import downloadService from '@/utils/downloadService'

// 查詢用戶列表 for 篩選
export function listUser(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}

// 獲取用戶詳細
export function getUser(userId) {
  return request({
    url: '/system/user/' + praseStrEmpty(userId),
    method: 'get'
  })
}

// 新增用戶
export function addUser(data) {
  return request({
    url: '/system/user',
    method: 'post',
    data: data
  })
}

// 刪除用戶
export function delUser(userId) {
  return request({
    url: '/system/user/' + userId,
    method: 'delete'
  })
}

// 用戶密碼重置
export function resetUserPwd(userId, password) {
  const data = {
    userId,
    password
  }
  return request({
    url: '/system/user/resetPwd',
    method: 'put',
    data: data
  })
}

// 編輯用戶
export function updateUser(data) {
  return request({
    url: '/system/user',
    method: 'put',
    data: data
  })
}

// 切換用戶狀態
export function changeUserStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/system/user/changeStatus',
    method: 'put',
    data: data
  })
}

// 導出用戶
export function exportUser() {
  return downloadService({
    url: '/system/user/export',
    method: 'get'
  })
}

