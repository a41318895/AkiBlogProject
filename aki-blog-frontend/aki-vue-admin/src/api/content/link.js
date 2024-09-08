import request from '@/utils/request'
import downloadService from '@/utils/downloadService'

// 查詢友情連結列表
export function listLink(query) {
  return request({
    url: '/content/link/list',
    method: 'get',
    params: query
  })
}

// 獲取友情連結詳細
export function getLink(id) {
  return request({
    url: '/content/link/' + id,
    method: 'get'
  })
}

// 切換友情連結狀態
export function changeLinkStatus(id, newStatus) {
  return request({
    url: '/content/link/changeLinkStatus',
    method: 'put',
    data: {
      id: id,
      status: newStatus
    }
  })
}

// 新增友情連結
export function addLink(data) {
  return request({
    url: '/content/link',
    method: 'post',
    data: data
  })
}

// 編輯友情連結
export function updateLink(data) {
  return request({
    url: '/content/link',
    method: 'put',
    data: data
  })
}

// 刪除友情連結
export function delLink(id) {
  return request({
    url: '/content/link/' + id,
    method: 'delete'
  })
}

// 導出友情連結
export function exportLink() {
  return downloadService({
    url: '/content/link/export',
    method: 'get'
  })
}