import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import store from './store';

// 自动设置rem基准值
import 'amfe-flexible'

import Vant from 'vant';
import 'vant/lib/index.css';
import '@/styles/index.less';
import '@/utils/dayjs'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')