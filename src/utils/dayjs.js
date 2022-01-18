// 封装dayjs库
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import relativeTime  from 'dayjs/plugin/relativeTime'
import Vue from 'vue'
dayjs.extend(relativeTime)

// 使用中文语言包
dayjs.locale('zh-cn')

Vue.filter('xianduiTime',value=>{
    return dayjs(value).from(dayjs())
})

// 日期格式化 默认值YYYY-MM-DD HH:mm:ss
Vue.filter('dateTime',(value,format="MM-DD HH:mm")=>{
    return dayjs(value).format(format)
})