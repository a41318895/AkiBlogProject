import request from '@/utils/request'

// 獲取路由
export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}

// 查詢菜單下拉樹之結構
export function treeSelect() {
  return request({
    url: '/system/menu/treeSelect',
    method: 'get'
  })
}

// 查詢菜單下拉樹之結構 via 角色ID
export function roleMenuTreeSelect(roleId) {
  return request({
    url: '/system/menu/roleMenuTreeSelect/' + roleId,
    method: 'get'
  })
}

// 查詢菜單列表 for 篩選
export function listMenu(query) {
  return request({
    url: '/system/menu/list',
    method: 'get',
    params: query
  })
}

// 獲取菜單詳細
export function getMenu(menuId) {
  return request({
    url: '/system/menu/' + menuId,
    method: 'get'
  })
}

// 新增菜單
export function addMenu(data) {
  return request({
    url: '/system/menu',
    method: 'post',
    data: data
  })
}

// 編輯菜單
export function updateMenu(data) {
  return request({
    url: '/system/menu',
    method: 'put',
    data: data
  })
}

// 刪除菜單
export function delMenu(menuId) {
  return request({
    url: '/system/menu/' + menuId,
    method: 'delete'
  })
}
