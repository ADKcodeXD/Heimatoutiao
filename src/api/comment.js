import request from '@/utils/request'
// 获取评论
// Path： /app/v1_0/comments
// Method： GET
export const getCommentList = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/comments',
        params
    })
}

// 对评论点赞
// Path： /app/v1_0/comment/likings
// Method： POST
export const likeComment = commentId => {
    return request({
        method: 'POST',
        url: '/app/v1_0/comment/likings',
        data: {
            target: commentId
        }
    })
}
// 取消对评论点赞
// Path： /app/v1_0/comment/likings/:target
// Method： DELETE
export const delikeComment = commentId => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/comment/likings/${commentId}`
    })
}

// 添加评论或回复评论
// Path： /app/v1_0/comments
// Method： POST
export const addComment = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/comments',
        data
    })
}