import request from '../utils/request'

export const addRecommend = data => request({
  url: '/recommend',
  method: 'post',
  data
})

export const removeRecommend = data => request({
  url: '/recommend/:id',
  method: 'delete',
  data
})

export const getRecommend = data => request({
  url: '/recommend/:id',
  method: 'get',
  data
})

export const getRecommendList = data => request({
  url: '/recommend/list',
  method: 'get',
  data
})

export const updateRecommend = data => request({
  url: '/recommend/:id',
  method: 'put',
  data
})
