import axios from 'axios'
import store from '@/store'
import {JSONbig} from 'json-bigint'

const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net',
    timeout: 5000
    // transformResponse:[function(data){
    //     try {
    //         return JSONbig.parse(data)
    //     } catch (error) {
    //         console.log("转换失败",error);
    //         return data
    //     }
    // }]
})


//请求拦截器  发请求之前，拦截器可以监测到
request.interceptors.request.use((config) => {
    //config 配置对象 
    const {user} = store.state
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
        
    }
    return config;
})



// 导出
export default request;