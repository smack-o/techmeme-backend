import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Restaurant from '@/view/restaurant/edit.vue'
import RestaurantList from '@/view/restaurant/list.vue'
import Topic from '@/view/topic/list.vue'
import Recommend from '@/view/recommend/recommend.vue'
import RecommendEdit from '@/view/recommend/edit.vue'
import Login from '@/view/Login'
import store from '@/store'
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      beforeEnter (to, from, next) {
        // auth.logout()
        store.dispatch('user/logout').then(() => {
          store.dispatch('user/getUser')
        })
        next('/login')
      }
    },
    {
      path: '/restaurant/list',
      name: 'Restaurants',
      component: RestaurantList
    },
    {
      path: '/restaurant/:id',
      name: 'Restaurant',
      component: Restaurant
    },
    {
      path: '/topic',
      name: 'Topic',
      component: Topic
    },
    {
      path: '/recommend',
      name: 'Recommends',
      component: Recommend
    },
    {
      path: '/recommend/:id',
      name: 'Recommend',
      component: RecommendEdit
    }
  ]
})

// login auth
router.beforeEach(async (to, from, next) => {
  if (to.path === '/login' || to.path === '/logout') {
    // 登陆页面
    next()
    return
  }
  const { state, dispatch } = store
  const { user: { isLoaded, isLogin } } = state
  if (isLoaded) {
    if (!isLogin) {
      Message.error('未登录或登录失效')
      return next('/login')
    }
    return next()
  }
  dispatch('user/getUser').then((success) => {
    if (!success) {
      return next('/login')
    }
    return next()
  })
})

export default router
