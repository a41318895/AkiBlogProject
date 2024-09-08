import request from '@/utils/request'

// Sending article comments
export function sendComment(type,articleId,rootId,toCommentId,toCommentUserId,content) {
    return request({
        url: '/comment',
        method: 'post',
        data: {"articleId":articleId,"type":type,"rootId":rootId,"toCommentId":toCommentId,"toCommentUserId":toCommentUserId,"content":content}
    })
}

// Getting article comments
export function getArticleComment(query) {
    return request({
        url: '/comment/commentList',
        method: 'get',
        headers: {
          isToken: false
        },
        params: query
    })
}

// Getting comments under link page
export function getLinkComment(query) {
    return request({
        url: '/comment/linkCommentList',
        method: 'get',
        params: query
    })
}