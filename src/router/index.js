import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bmap',
    name: 'BMap',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "bmap" */ '../views/BMap.vue')
  },
  {
    path: '/bmap2',
    name: 'BMap2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "bmap2" */ '../views/BMap2.vue')
  },
  {
    path: '/liquidfill',
    name: 'LiquidFill',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "liquidfill" */ '../views/LiquidFill.vue')
  },
  {
    path: '/wordcloud',
    name: 'WordCloud',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "wordcloud" */ '../views/WordCloud.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
