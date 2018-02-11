import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Restaurant from '@/view/restaurant/edit.vue'
import RestaurantList from '@/view/restaurant/list.vue'
import Topic from '@/view/topic/list.vue'
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
      path: '/restaurant/list',
      name: 'RestaurantList',
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
    }
  ]
})
