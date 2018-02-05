import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import RestaurantEdit from '@/view/RestaurantEdit/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/restaurant',
      name: 'RestaurantEdit',
      component: RestaurantEdit
    }
  ]
})
