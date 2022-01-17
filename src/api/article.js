import request from '@/utils/request'


// 获取新闻列表
// Path： /v1_0/articles
// Method： GET
export const getChannelById = params => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })
}

// 获取新闻详情
// Path： /v1_0/articles/:article_id
// Method： GET