import request from '@/utils/request'

// Selecting all reviewed and passed link list
export function getAllLink(query) {
    return request({
        url: '/link/getAllLink',
        method: 'get',
        headers: {
          isToken: false
        },
        params: query
    })
}

