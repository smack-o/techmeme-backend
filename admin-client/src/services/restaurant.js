import request from '../utils/request'

export const addRestaurant = (data) => request({
  url: '/restaurant',
  method: 'post',
  data
})
