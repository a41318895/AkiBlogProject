import request from '@/utils/request'
import downloadService from '@/utils/downloadService'

// 查詢分類列表 for 篩選
export function listCategory(query) {
  return request({
    url: '/content/category/list',
    method: 'get',
    params: query
  })
}

// 查詢分類列表 for 撰寫文章選項
export function listAllCategory() {
  return request({
    url: '/content/category/listAllCategory',
    method: 'get'
  })
}

// 獲取分類詳細
export function getCategory(id) {
  return request({
    url: '/content/category/' + id,
    method: 'get'
  })
}

// 新增分類
export function addCategory(data) {
  return request({
    url: '/content/category',
    method: 'post',
    data: data
  })
}

// 編輯分類
export function updateCategory(data) {
  return request({
    url: '/content/category',
    method: 'put',
    data: data
  })
}

// 刪除分類
export function delCategory(id) {
	return request({
		url: '/content/category/' + id,
		method: 'delete'
	})
}

// 導出分類
export function exportCategory() {
  return downloadService({
    url: '/content/category/export',
    method: 'get'
  })
}
