import request from '@/utils/request'
import downloadService from '@/utils/downloadService'

// 查詢角色列表 for 篩選
export function listRole(query) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params: query
  })
}

// 查詢角色列表 for 新增用戶選項
export function listAllRole() {
  return request({
    url: '/system/role/listAllRole',
    method: 'get'
  })
}

// 獲取角色詳細
export function getRole(roleId) {
  return request({
    url: '/system/role/' + roleId,
    method: 'get'
  })
}

// 編輯角色
export function updateRole(data) {
  return request({
    url: '/system/role',
    method: 'put',
    data: data
  })
}

// 刪除角色
export function delRole(id) {
  return request({
    url: '/system/role/' + id,
    method: 'delete'
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/system/role',
    method: 'post',
    data: data
  })
}

// 切換角色狀態
export function changeRoleStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/system/role/changeStatus',
    method: 'put',
    data: data
  })
}

// 導出角色
export function exportRole() {
  return downloadService({
    url: '/system/role/export',
    method: 'get'
  })
}

