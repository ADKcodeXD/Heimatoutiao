import request from '@/utils/request'


// 获取新闻列表
// Path： /app/v1_1/articles
// Method： GET
export const getChannelById = params => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params
    })
}

// 获取新闻详情
// Path： /app/v1_0/articles/:article_id
// Method： GET
export const getArticleById = articleId => {
    return request({
        method: 'GET',
        url: `/app/v1_0/articles/${articleId}`
    })
}

// 收藏文章
// Path： /app/v1_0/article/collections
// Method： POST
export const addCollect = articleId => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/collections',
        data: {
            target: articleId
        }
    })
}

// 取消收藏
// Path： /app/v1_0/article/collections/:target
// Method： DELETE
export const deleteCollect = articleId => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/collections/${articleId}`
    })
}

// 对文章点赞
// Path： /app/v1_0/article/likings
// Method： POST
export const userLike = articleId => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/likings',
        data:{
            target:articleId
        }
    })
}

// 取消点赞
// Path： /app/v1_0/article/likings/:target
// Method： DELETE
export const userCancelLike = articleId => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/likings/${articleId}`
    })
}


// 获取用户收藏文章列表
// Path： /app/v1_0/article/collections
// Method： GET
export const getUserCollect = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/article/collections',
        params
    })
}