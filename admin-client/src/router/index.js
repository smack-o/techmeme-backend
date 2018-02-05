import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import RestaurantEdit from '@/view/restaurant/edit.vue'
import RestaurantList from '@/view/restaurant/list.vue'
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
    },
    {
      path: '/restaurant/list',
      name: 'RestaurantList',
      component: RestaurantList
    }
  ]
})
