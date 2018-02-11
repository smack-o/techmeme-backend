import request from '../utils/request'

export const getTopics = () => request({
  url: '/topic/list',
  method: 'get'
})

export const removeTopic = data => request({
  url: '/topic/:id',
  method: 'delete',
  data
})

export const getRestaurant = data => request({
  url: '/restaurant/:id',
  method: 'get',
  data
})

export const getRestaurantList = data => request({
  url: '/restaurant/list',
  method: 'get',
  data
})

export const updateRestaurant = data => request({
  url: '/restaurant/:id',
  method: 'put',
  data
})
