import request from '../utils/request'

export const addRecommend = data => request({
  url: '/recommend',
  method: 'post',
  data
})

export const removeRestaurant = data => request({
  url: '/restaurant/:id',
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
