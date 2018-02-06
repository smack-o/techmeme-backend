import request from '../utils/request'

export const addRestaurant = data => request({
  url: '/restaurant',
  method: 'post',
  data
})

export const removeRestaurant = data => request({
  url: '/restaurant/:id',
  method: 'delete',
  data
})

export const getRestaurantList = data => request({
  url: '/restaurant/list',
  method: 'get',
  data
})
