import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../../src/view/recommend/recommend.vue'
import Singer from '../../src/view/singer/singer.vue'
import Rank from '../../src/view/rank/rank.vue'
import Search from '../../src/view/search/search.vue'
import SingerDetail from '../../src/view/singer/singer-detail.vue'
import Disc from '../../src/components/disc/disc'
import TopList from '../components/top-list/top-live.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/recommend'
  }, {
    path: '/recommend',
    component: Recommend,
    children: [{
      path: ':id',
      component: Disc
    }]
  }, {
    path: '/singer',
    component: Singer,
    children: [{
      path: ':id',
      component: SingerDetail
    }]
  }, {
    path: '/rank',
    component: Rank,
    children: [{
      path: ':id',
      component: TopList
    }]
  }, {
    path: '/search',
    component: Search,
    children: [{
      path: ':id',
      component: SingerDetail
    }]
  }]
})
