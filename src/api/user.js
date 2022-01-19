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


//获取用户个人资料
// Path： /app/v1_0/user/profile
// Method： GET
export const getUserProfile = userId => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/profile'
    })
}

// 修改用户数据
// Path： /app/v1_0/user/profile
// Method： PATCH
export const updateUserProfile = data => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/profile',
        data
    })
}

// 编辑用户头像
// Path： /app/v1_0/user/photo
// Method： PATCH
export const updateUserPhoto = data => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/photo',
        data
    })
}