import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: '/',
    path: '',
    component: () => import('@/pages/home/Home.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
