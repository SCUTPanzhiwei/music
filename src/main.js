import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import fastClick from 'fastclick'
import '@/assets/styles/reset.css'
import '@/assets/styles/border.css'
import '@/assets/styles/screen.css'
import axios from 'axios'
import VueAxios from 'vue-axios' // axios模块
import VueLazyLoad from 'vue-lazyload'
import AlloyFinger from 'alloyfinger'
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger_vue'

// 对axios做规定
axios.defaults.baseURL = '/api' // 采用代理的形式 api代表 localhost:3000
axios.defaults.timeout = 8000
/* 回应拦截 */
axios.interceptors.response.use((response) => {
  /* let path = location.hash // 路径为当前hash */
  if (response.status == 200 ||response.status == 304) {
    let res = response.data
    return res
  }
})

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAxios, axios)
// 懒加载使用
Vue.use(VueLazyLoad,{
  loading: require('../public/loading-spin.svg')
}),
Vue.use(AlloyFingerPlugin,{
  AlloyFinger
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
