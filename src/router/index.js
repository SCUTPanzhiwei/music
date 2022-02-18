import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '@/components/Recommend.vue'
import RecommendList from '@/pages/RecommendList.vue'
import Singer from '@/components/Singer.vue'
import SingerDetail from '@/pages/SingerDetail.vue'
import Rank from '@/components/Rank.vue'
import RankList from '@/pages/RankList.vue'
import Search from '@/pages/Search.vue'

/* VueRouter是一个插件，内部做了什么： 
1、实现并声明了两个全局注册的组件
  router-link和router-view
2、实现install： this.$router.push()
*/
Vue.use(VueRouter)

const routes = [
  {
    name: '/',
    path: '/',
    component: () => import('@/pages/home/Home.vue'),
    redirect: '/recommend',
    children: [
      {
        path: '/recommend',
        component: Recommend,
        children: [
          
        ]

      },
      {
        name: 'singer',
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
    name: 'recommendList',
    path: '/recommend/recommendList/:id',
    component: RecommendList
  },
  {
    name: 'rankList',
    path: '/rank/rankList/:id',
    component: RankList
  },
  {
    // 歌手详情页面
    name: 'singerDetail',
    path: '/singer/singerDetail/:id',
    component: SingerDetail
  },
  {
    // 
    name: 'search',
    path: '/search',
    component: Search
  }
]

/* 创建一个路由实例, 并导出*/
const router = new VueRouter({
  routes
})

export default router
