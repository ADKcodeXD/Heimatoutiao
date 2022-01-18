import request from '@/utils/request'

// 获取联想建议
// Path： /app/v1_0/suggestion
// Method： GET
export const getSuggestion = q => {
    return request({
        method: 'GET',
        url: '/app/v1_0/suggestion',
        params: {
            q
        }
    })
}

// 获取搜索结果
// Path： /app/v1_0/search
// Method： GET
/**
 * Query

    参数名称	是否必须	示例	备注
    page	否	1	页数，不传默认为1
    per_page	否	10	每页数量，不传每页数量由后端决定
    q	是		搜索关键词
 * @param  params 
 * @returns 
 */
export const getSearchResult = params => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search',
        params
    })
}

// 获取用户搜索历史
// Path： /app/v1_0/search/histories
// Method： GET
export const getUserHistory = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search/histories'
    })
}

// 删除用户搜索历史
// Path： /app/v1_0/search/histories
// Method： DELETE
export const deleteUserHistory = () => {
    return request({
        method: 'DELETE',
        url: '/app/v1_0/search/histories'
    })
}