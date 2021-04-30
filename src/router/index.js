import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '@/components/Recommend.vue'
import RecommendList from '@/components/RecommendList.vue'
import Singer from '@/components/Singer.vue'
import Rank from '@/components/Rank.vue'
Vue.use(VueRouter)

const routes = [
  { 
    // 首页路由
    name: '/',
    path: '/',
    component: () => import('@/pages/home/Home.vue'),
    redirect: '/recommend',
    children:[
      {
        path: '/recommend',
        component: Recommend
      },
      {
        path: '/singer',
        component: Singer
      },
      {
        path: '/rank',
        component: Rank
      },
    ]
  },
  { 
    name:'recommendList',
    path:'/recommend/recommendList/:id',
    component: RecommendList
  }
]

const router = new VueRouter({
  routes
})

export default router
