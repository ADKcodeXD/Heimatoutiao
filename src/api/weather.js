import weatherApi from '@/utils/weather'

// 获取天气信息
// Path： http://api.k780.com
// Method： get
export const getWeather = cityIp => {
    return weatherApi({
        method: 'GET',
        params: {
            cityIp:cityIp,
            appkey: '64033',
            sign: '7a878860ce209425c234c6967c312976',
            format: 'json',
            app: 'weather.realtime',
            ag:'today,futureDay,lifeIndex,futureHour'
        }
    })
}