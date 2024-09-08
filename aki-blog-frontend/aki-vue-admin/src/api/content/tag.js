import request from '@/utils/request'
import downloadService from '@/utils/downloadService'

// 查詢標籤列表 for 篩選
export function listTag(query) {
  return request({
    url: '/content/tag/list',
    method: 'get',
    params: query
  })
}

// 查詢標籤列表 for 撰寫文章選項
export function listAllTag() {
  return request({
    url: '/content/tag/listAllTag',
    method: 'get'
  })
}

// 獲取標籤詳細
export function getTag(id) {
  return request({
    url: '/content/tag/' + id,
    method: 'get'
  })
}

// 新增標籤
export function addTag(data) {
  return request({
    url: '/content/tag',
    method: 'post',
    data: data
  })
}

// 編輯標籤
export function updateTag(data) {
  return request({
    url: '/content/tag',
    method: 'put',
    data: data
  })
}

// 刪除標籤
export function delTag(id) {
  return request({
    url: '/content/tag/' + id,
    method: 'delete'
  })
}

// 導出標籤
export function exportTag() {
  return downloadService({
    url: '/content/tag/export',
    method: 'get'
  })
}
