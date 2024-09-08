import downloadService from '@/utils/downloadService'
import request from '@/utils/request'

// 新增新文章
export function addArticle(data) {
  return request({
    url: '/content/article',
    method: 'post',
    data: data
  })
}

// 查詢文章列表 for 篩選
export function listArticle(query) {
  return request({
    url: '/content/article/list',
    method: 'get',
    params: query
  })
}

// 刪除文章
export function delArticle(id) {
  return request({
    url: `/content/article/` + id,
    method: 'delete'
  })
}

// 獲取特定文章詳細
export function getArticle(id) {
  return request({
    url: '/content/article/' + id,
    method: 'get'
  })
}

// 編輯文章
export function updateArticle(data) {
  return request({
    url: '/content/article',
    method: 'put',
    data: data
  })
}

// 導出文章
export function exportArticle() {
  return downloadService({
    url: '/content/article/export',
    method: 'get'
  })
}
