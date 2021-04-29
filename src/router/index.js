import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '@/components/Recommend.vue'
import Singer from '@/components/Singer.vue'
import Rank from '@/components/Rank.vue'
Vue.use(VueRouter)

const routes = [
  { 
    // 首页路由
    name: '/',
    path: '',
    component: () => import('@/pages/home/Home.vue'),
    redirect: '/index/recommend',
    children:[
      {
        path: '/index/recommend',
        component: Recommend
      },
      {
        path: '/index/singer',
        component: Singer
      },
      {
        path: '/index/rank',
        component: Rank
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
