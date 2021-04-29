import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import '@/assets/styles/reset.css'
import '@/assets/styles/border.css'
import axios from 'axios'
import VueAxios from 'vue-axios' // axios模块



// 对axios做统一封装
axios.defaults.baseURL = '/api' // 采用代理的形式 api代表 localhost:3000
axios.defaults.timeout = 8000
/* 回应拦截 */
axios.interceptors.response.use((response)=>{
  let path = location.hash // 路径为当前hash
  let res =response.data
  if(res.status==200){
    return res.data
  }
})

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAxios,axios)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
