import axios from 'axios'


// 天气api
const weatherApi = axios.create({
    baseURL: 'http://api.k780.com',
    timeout: 5000
})

export default weatherApi;