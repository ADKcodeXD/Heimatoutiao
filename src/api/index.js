import request from '@/utils/request'

import store from '@/store/'
// 登录注册验证
// Path： /v1_0/authorizations
// Method： POST
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}

// 发送验证码
// path: /v1_0/sms/codes/:mobile
// Method:GET
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`
    })
}

// 获取用户的信息
// Path：  /v1_0/user
// Method： GET
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user'
    })
}

// 获取所有频道
// Path： /v1_0/channels
// Method： GET
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })
}

// 获取用户频道列表
// Path： /v1_0/user/channels
// Method： GET
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}

// 修改用户的频道列表 重置式
// Path： /v1_0/user/channels
// Method： PUT
export const resetUserChannels = data => {
    return request({
        method: 'PUT',
        url: '/v1_0/user/channels',
        data
    })
}

// 修改用户的频道列表 部分覆盖
// Path： /v1_0/user/channels
// Method： Patch
export const addUserChannels = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/channels',
        data
    })
}

// 删除指定用户频道
// Path： /v1_0/user/channels/:target
// Method： DELETE
export const deleteUserChannels = channel_id => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/channels/${channel_id}`
    })
}