import request from '@/utils/request'

// 关注用户
// Path： /app/v1_0/user/followings
// Method： POST
export const followUser = userId => {
    return request({
        method: 'POST',
        url: '/app/v1_0/user/followings',
        data: {
            target: userId
        }
    })
}

// 取消关注
// Path： /app/v1_0/user/followings/:target
// Method： DELETE
export const cancelFollowUser = userId => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/followings/${userId}`
    })
}