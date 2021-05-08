import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '@/components/Recommend.vue'
import RecommendList from '@/pages/RecommendList.vue'
import Singer from '@/components/Singer.vue'
import SingerDetail from '@/pages/SingerDetail.vue'
import Rank from '@/components/Rank.vue'
import RankList from '@/pages/RankList.vue'
import Search from '@/pages/Search.vue'
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

const router = new VueRouter({
  routes
})

export default router
